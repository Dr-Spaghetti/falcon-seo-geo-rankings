import * as cheerio from "cheerio";
import { fetch as undiciFetch } from "undici";
import robotsParser from "robots-parser";
import {
  appendPage,
  getJob,
  setStatus,
  updateJob,
} from "./jobs";
import type { ImageInfo, LinkInfo, PageRecord, PageType } from "./types";
import { DEFAULT_DELAY_MS } from "./types";
import { absolutize, isSameOrigin } from "./url";

const UA =
  "JustifyCodeWPBot/0.1 (+https://justifycode.com/wordpress; SEO audit crawler)";

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchText(
  url: string,
  opts?: { timeoutMs?: number; redirect?: "follow" | "manual" }
): Promise<{ status: number; headers: Headers; body: string; finalUrl: string }> {
  const timeoutMs = opts?.timeoutMs ?? 20000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await undiciFetch(url, {
      signal: controller.signal,
      redirect: opts?.redirect ?? "follow",
      headers: {
        "user-agent": UA,
        accept: "text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8",
      },
    });
    const body = await res.text();
    return {
      status: res.status,
      headers: res.headers as unknown as Headers,
      body,
      finalUrl: res.url || url,
    };
  } finally {
    clearTimeout(timer);
  }
}

export async function detectWordPress(
  siteUrl: string
): Promise<{ isWp: boolean; signals: string[]; error?: string; errorCode?: string }> {
  const signals: string[] = [];
  const origin = new URL(siteUrl).origin;

  // 1) wp-json
  try {
    const r = await fetchText(`${origin}/wp-json/`, { timeoutMs: 12000 });
    if (r.status >= 200 && r.status < 400) {
      const looksJson =
        r.body.includes("namespaces") ||
        r.body.includes("wp/v2") ||
        r.headers.get?.("content-type")?.includes("json");
      if (looksJson || r.body.includes("WordPress")) {
        signals.push("wp-json");
      }
    }
  } catch {
    // ignore — site may block API
  }

  // 2) homepage heuristics
  let homeBody = "";
  try {
    const home = await fetchText(siteUrl, { timeoutMs: 15000 });
    if (home.status >= 400) {
      return {
        isWp: false,
        signals,
        error: `Site returned HTTP ${home.status}`,
        errorCode: home.status === 403 ? "blocked" : "unreachable",
      };
    }
    homeBody = home.body;
  } catch (e) {
    return {
      isWp: false,
      signals,
      error: e instanceof Error ? e.message : "Unreachable",
      errorCode: "unreachable",
    };
  }

  const $ = cheerio.load(homeBody);
  const generator = $('meta[name="generator"]').attr("content") || "";
  if (/wordpress/i.test(generator)) signals.push("generator-meta");
  if (homeBody.includes("wp-content/") || homeBody.includes("/wp-includes/")) {
    signals.push("wp-content");
  }
  if ($('link[rel="https://api.w.org/"]').length) signals.push("api.w.org-link");
  if ($('link[rel="EditURI"]').attr("href")?.includes("xmlrpc.php")) {
    signals.push("xmlrpc-rsd");
  }

  if (signals.length === 0) {
    return {
      isWp: false,
      signals,
      error: "No WordPress signals found (wp-json, generator, wp-content)",
      errorCode: "not_wp",
    };
  }

  return { isWp: true, signals };
}

async function loadRobots(origin: string) {
  try {
    const r = await fetchText(`${origin}/robots.txt`, { timeoutMs: 8000 });
    if (r.status >= 200 && r.status < 300) {
      return robotsParser(`${origin}/robots.txt`, r.body);
    }
  } catch {
    // treat as allow-all
  }
  return robotsParser(`${origin}/robots.txt`, "");
}

function guessPageType(url: string, $: cheerio.CheerioAPI): PageType {
  const path = new URL(url).pathname;
  if (path === "/" || path === "") return "home";
  if (/\/category\//i.test(path) || $('body').hasClass("category")) return "category";
  if (/\/tag\//i.test(path) || $('body').hasClass("tag")) return "tag";
  if (/\/author\//i.test(path) || $('body').hasClass("author")) return "author";
  if ($("body").hasClass("single-post") || /\/\d{4}\/\d{2}\//.test(path)) return "post";
  if ($("body").hasClass("page") || $("body").hasClass("page-template")) return "page";
  if ($("body").hasClass("archive")) return "archive";
  return "other";
}

function extractMainContent($: cheerio.CheerioAPI): string {
  const candidates = [
    "article .entry-content",
    ".entry-content",
    "main article",
    "main",
    "article",
    "#content",
    ".post-content",
    ".content",
  ];
  for (const sel of candidates) {
    const el = $(sel).first();
    if (el.length) {
      el.find("script, style, nav, aside, .sidebar, .comments").remove();
      const text = el.text().replace(/\s+/g, " ").trim();
      if (text.length > 40) return text.slice(0, 20000);
    }
  }
  $("script, style, nav, header, footer, aside").remove();
  return $("body").text().replace(/\s+/g, " ").trim().slice(0, 20000);
}

function parsePage(url: string, status: number, html: string): PageRecord {
  const $ = cheerio.load(html);
  const origin = new URL(url).origin;

  const title = $("title").first().text().trim() || null;
  const metaDescription =
    $('meta[name="description"]').attr("content")?.trim() || null;
  const canonical =
    $('link[rel="canonical"]').attr("href")?.trim() ||
    $('meta[property="og:url"]').attr("content")?.trim() ||
    null;
  const h1 = $("h1").first().text().replace(/\s+/g, " ").trim() || null;
  const robots =
    $('meta[name="robots"]').attr("content")?.trim() || null;

  const headings: { level: number; text: string }[] = [];
  $("h1, h2, h3, h4").each((_, el) => {
    const tag = (el as { tagName?: string; name?: string }).tagName ||
      (el as { name?: string }).name ||
      "";
    const level = parseInt(String(tag).replace(/\D/g, ""), 10) || 0;
    const text = $(el).text().replace(/\s+/g, " ").trim();
    if (text) headings.push({ level, text: text.slice(0, 300) });
  });

  const images: ImageInfo[] = [];
  $("img").each((_, el) => {
    const src = $(el).attr("src") || $(el).attr("data-src") || "";
    const abs = absolutize(src, url);
    if (abs) images.push({ src: abs, alt: ($(el).attr("alt") || "").trim() });
  });

  const internalLinks: LinkInfo[] = [];
  const externalLinks: LinkInfo[] = [];
  const seen = new Set<string>();
  $("a[href]").each((_, el) => {
    const href = $(el).attr("href");
    if (!href) return;
    const abs = absolutize(href, url);
    if (!abs || seen.has(abs)) return;
    seen.add(abs);
    const text = $(el).text().replace(/\s+/g, " ").trim().slice(0, 200);
    if (isSameOrigin(abs, origin)) {
      internalLinks.push({ href: abs, text });
    } else {
      externalLinks.push({ href: abs, text });
    }
  });

  const mainContent = extractMainContent($);
  const wordCount = mainContent
    ? mainContent.split(/\s+/).filter(Boolean).length
    : 0;

  const schemaPresent =
    $('script[type="application/ld+json"]').length > 0 ||
    $("[itemtype]").length > 0;

  const publishedAt =
    $('meta[property="article:published_time"]').attr("content") ||
    $("time[datetime]").first().attr("datetime") ||
    null;
  const modifiedAt =
    $('meta[property="article:modified_time"]').attr("content") || null;

  return {
    url,
    canonical: canonical ? absolutize(canonical, url) : null,
    pageType: guessPageType(url, $),
    status,
    title,
    metaDescription,
    h1,
    headings: headings.slice(0, 50),
    mainContent,
    wordCount,
    internalLinks: internalLinks.slice(0, 200),
    externalLinks: externalLinks.slice(0, 100),
    images: images.slice(0, 100),
    robots,
    schemaPresent,
    publishedAt,
    modifiedAt,
    crawledAt: new Date().toISOString(),
  };
}

function collectInternalUrls(
  page: PageRecord,
  origin: string,
  baseUrl: string
): string[] {
  const out: string[] = [];
  for (const l of page.internalLinks) {
    try {
      const u = new URL(l.href);
      if (u.origin !== origin) continue;
      // Skip common non-content
      if (/\.(jpg|jpeg|png|gif|webp|svg|pdf|zip|css|js)$/i.test(u.pathname))
        continue;
      if (u.pathname.includes("/wp-admin") || u.pathname.includes("/wp-login"))
        continue;
      u.hash = "";
      u.search = "";
      out.push(u.href);
    } catch {
      /* skip */
    }
  }
  // Always seed with base
  void baseUrl;
  return out;
}

export async function runCrawl(jobId: string): Promise<void> {
  const job = getJob(jobId);
  if (!job) return;

  try {
    setStatus(jobId, "detecting");
    const detection = await detectWordPress(job.url);
    updateJob(jobId, { wpSignals: detection.signals });

    if (!detection.isWp) {
      setStatus(jobId, "failed", {
        error: detection.error || "Not a WordPress site",
        errorCode: detection.errorCode || "not_wp",
      });
      return;
    }

    setStatus(jobId, "crawling");
    const origin = new URL(job.url).origin;
    const robots = await loadRobots(origin);
    const maxPages = job.progress.maxPages;
    const queue: string[] = [job.url];
    const seen = new Set<string>();
    let delay = DEFAULT_DELAY_MS;

    while (queue.length > 0) {
      const current = getJob(jobId);
      if (!current || current.status === "failed") return;
      if (current.pages.length >= maxPages) break;

      const next = queue.shift()!;
      const normalized = next.replace(/\/$/, "") || next;
      const key = normalized.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);

      if (robots.isDisallowed(next, UA) || robots.isDisallowed(next, "*")) {
        appendPage(jobId, {
          url: next,
          canonical: null,
          pageType: "other",
          status: 0,
          title: null,
          metaDescription: null,
          h1: null,
          headings: [],
          mainContent: "",
          wordCount: 0,
          internalLinks: [],
          externalLinks: [],
          images: [],
          robots: "disallowed-by-robots.txt",
          schemaPresent: false,
          publishedAt: null,
          modifiedAt: null,
          crawledAt: new Date().toISOString(),
          error: "Blocked by robots.txt",
        });
        updateJob(jobId, {
          progress: {
            crawled: (getJob(jobId)?.pages.length ?? 0),
            queued: queue.length,
            maxPages,
          },
        });
        continue;
      }

      try {
        const res = await fetchText(next);
        if (res.status === 429) {
          delay = Math.min(delay * 2, 5000);
          queue.unshift(next);
          seen.delete(key);
          await sleep(delay);
          continue;
        }

        const contentType = res.headers.get?.("content-type") || "";
        if (!contentType.includes("html") && res.status < 400) {
          // skip non-html
        } else {
          const page = parsePage(res.finalUrl || next, res.status, res.body);
          appendPage(jobId, page);

          if (res.status < 400 && current.pages.length + 1 < maxPages) {
            for (const u of collectInternalUrls(page, origin, job.url)) {
              const k = u.replace(/\/$/, "").toLowerCase();
              if (!seen.has(k) && !queue.some((q) => q.replace(/\/$/, "").toLowerCase() === k)) {
                queue.push(u);
              }
            }
          }
        }
      } catch (e) {
        appendPage(jobId, {
          url: next,
          canonical: null,
          pageType: "other",
          status: 0,
          title: null,
          metaDescription: null,
          h1: null,
          headings: [],
          mainContent: "",
          wordCount: 0,
          internalLinks: [],
          externalLinks: [],
          images: [],
          robots: null,
          schemaPresent: false,
          publishedAt: null,
          modifiedAt: null,
          crawledAt: new Date().toISOString(),
          error: e instanceof Error ? e.message : "Fetch failed",
        });
      }

      const latest = getJob(jobId);
      updateJob(jobId, {
        progress: {
          crawled: latest?.pages.length ?? 0,
          queued: queue.length,
          maxPages,
        },
      });

      await sleep(delay);
    }

    setStatus(jobId, "complete");
  } catch (e) {
    setStatus(jobId, "failed", {
      error: e instanceof Error ? e.message : "Crawl failed",
      errorCode: "crawl_error",
    });
  }
}

