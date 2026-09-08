/**
 * URL normalize + validate helpers for WordPress ingest.
 */

export class UrlError extends Error {
  code: string;
  constructor(message: string, code: string) {
    super(message);
    this.code = code;
    this.name = "UrlError";
  }
}

/** Normalize a user-supplied site URL to a canonical origin+path form. */
export function normalizeUrl(input: string): string {
  const raw = (input || "").trim();
  if (!raw) {
    throw new UrlError("URL is required", "invalid_url");
  }

  let withProtocol = raw;
  if (!/^https?:\/\//i.test(raw)) {
    withProtocol = `https://${raw}`;
  }

  let parsed: URL;
  try {
    parsed = new URL(withProtocol);
  } catch {
    throw new UrlError("Invalid URL format", "invalid_url");
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new UrlError("Only http and https URLs are supported", "invalid_url");
  }

  if (!parsed.hostname || !parsed.hostname.includes(".")) {
    // Allow localhost for local testing
    if (parsed.hostname !== "localhost" && parsed.hostname !== "127.0.0.1") {
      throw new UrlError("Invalid hostname", "invalid_url");
    }
  }

  // Strip hash/query for site root; keep pathname if meaningful
  parsed.hash = "";
  parsed.search = "";

  // Normalize trailing slash on root only
  let href = parsed.href;
  if (parsed.pathname === "/") {
    href = `${parsed.origin}/`;
  } else {
    href = href.replace(/\/+$/, "");
  }

  return href;
}

/** Site key for duplicate-job detection (origin, lowercased host). */
export function siteKey(url: string): string {
  const u = new URL(normalizeUrl(url));
  return u.origin.toLowerCase();
}

export function isSameOrigin(a: string, b: string): boolean {
  try {
    return new URL(a).origin === new URL(b).origin;
  } catch {
    return false;
  }
}

export function absolutize(href: string, base: string): string | null {
  try {
    const u = new URL(href, base);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    u.hash = "";
    return u.href;
  } catch {
    return null;
  }
}
