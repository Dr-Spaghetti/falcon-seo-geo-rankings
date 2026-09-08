import type { Job, PageRecord } from "./types";

function csvEscape(val: string): string {
  if (/[",\n\r]/.test(val)) return `"${val.replace(/"/g, '""')}"`;
  return val;
}

function headingsFlat(p: PageRecord): string {
  return p.headings.map((h) => `H${h.level}:${h.text}`).join(" | ");
}

function imagesFlat(p: PageRecord): string {
  return p.images.map((i) => `${i.src} [alt=${i.alt}]`).join(" | ");
}

function linksFlat(links: { href: string; text: string }[]): string {
  return links.map((l) => `${l.href} (${l.text})`).join(" | ");
}

export function toCsv(job: Job): string {
  const headers = [
    "url",
    "canonical",
    "page_type",
    "status",
    "title",
    "meta_description",
    "h1",
    "headings",
    "main_content",
    "word_count",
    "internal_links",
    "external_links",
    "images",
    "robots",
    "schema_present",
    "published_at",
    "modified_at",
    "crawled_at",
    "error",
  ];
  const rows = job.pages.map((p) =>
    [
      p.url,
      p.canonical || "",
      p.pageType,
      String(p.status),
      p.title || "",
      p.metaDescription || "",
      p.h1 || "",
      headingsFlat(p),
      p.mainContent,
      String(p.wordCount),
      linksFlat(p.internalLinks),
      linksFlat(p.externalLinks),
      imagesFlat(p),
      p.robots || "",
      String(p.schemaPresent),
      p.publishedAt || "",
      p.modifiedAt || "",
      p.crawledAt,
      p.error || "",
    ]
      .map((c) => csvEscape(c))
      .join(",")
  );
  return [headers.join(","), ...rows].join("\n");
}

export function toJson(job: Job): string {
  return JSON.stringify(
    {
      jobId: job.id,
      url: job.url,
      status: job.status,
      wpSignals: job.wpSignals,
      createdAt: job.createdAt,
      updatedAt: job.updatedAt,
      pageCount: job.pages.length,
      pages: job.pages,
    },
    null,
    2
  );
}

export function toMarkdown(job: Job): string {
  const lines: string[] = [
    `# WordPress crawl export`,
    ``,
    `- **Job:** \`${job.id}\``,
    `- **Site:** ${job.url}`,
    `- **Status:** ${job.status}`,
    `- **Pages:** ${job.pages.length}`,
    `- **WP signals:** ${(job.wpSignals || []).join(", ") || "n/a"}`,
    `- **Exported:** ${new Date().toISOString()}`,
    ``,
  ];

  for (const p of job.pages) {
    lines.push(`## ${p.title || p.url}`);
    lines.push(``);
    lines.push(`- **URL:** ${p.url}`);
    if (p.canonical) lines.push(`- **Canonical:** ${p.canonical}`);
    lines.push(`- **Type:** ${p.pageType}`);
    lines.push(`- **Status:** ${p.status}`);
    if (p.metaDescription) lines.push(`- **Meta description:** ${p.metaDescription}`);
    if (p.h1) lines.push(`- **H1:** ${p.h1}`);
    lines.push(`- **Word count:** ${p.wordCount}`);
    lines.push(`- **Robots:** ${p.robots || "n/a"}`);
    lines.push(`- **Schema:** ${p.schemaPresent ? "yes" : "no"}`);
    if (p.publishedAt) lines.push(`- **Published:** ${p.publishedAt}`);
    if (p.modifiedAt) lines.push(`- **Modified:** ${p.modifiedAt}`);
    lines.push(`- **Crawled:** ${p.crawledAt}`);
    if (p.error) lines.push(`- **Error:** ${p.error}`);
    lines.push(``);
    if (p.headings.length) {
      lines.push(`### Headings`);
      for (const h of p.headings) lines.push(`${"#".repeat(Math.min(h.level, 6))} ${h.text}`);
      lines.push(``);
    }
    if (p.mainContent) {
      lines.push(`### Main content`);
      lines.push(``);
      lines.push(p.mainContent.slice(0, 5000));
      lines.push(``);
    }
    if (p.images.length) {
      lines.push(`### Images`);
      for (const img of p.images.slice(0, 30)) {
        lines.push(`- ${img.src} — alt: ${img.alt || "(empty)"}`);
      }
      lines.push(``);
    }
    lines.push(`---`);
    lines.push(``);
  }

  return lines.join("\n");
}
