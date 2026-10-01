/**
 * Map Local Falcon scan `platform` → client-facing GEO vs SEO labels.
 *
 * Do not invent scan types. Existing census fields:
 *   - `type` = campaign | manual | auto  (execution mode — NOT GEO/SEO)
 *   - `platform` = google | gaio | gemini | chatgpt | aimode  (source)
 *
 * Nick labels (2026-10-01):
 *   GEO = LLM / geo grid  → gaio, gemini, chatgpt, aimode
 *   SEO = Google / Maps   → google
 */

export type ScanKind = "geo" | "seo";
export type ScanKindFilter = "all" | ScanKind;

/** LLM / geo-grid platforms in Local Falcon export */
export const GEO_PLATFORMS = ["gaio", "gemini", "chatgpt", "aimode"] as const;

/** Google Maps / classic keyword-grid platform */
export const SEO_PLATFORMS = ["google"] as const;

const GEO_SET = new Set<string>(GEO_PLATFORMS);
const SEO_SET = new Set<string>(SEO_PLATFORMS);

export const SCAN_KIND_LABEL: Record<ScanKind, { short: string; detail: string }> = {
  geo: { short: "GEO", detail: "LLM / geo grid" },
  seo: { short: "SEO", detail: "Google / Maps" },
};

export function scanKindFromPlatform(
  platform: string | null | undefined,
): ScanKind | null {
  if (!platform) return null;
  const p = platform.trim().toLowerCase();
  if (SEO_SET.has(p)) return "seo";
  if (GEO_SET.has(p)) return "geo";
  return null;
}

export function scanMatchesKindFilter(
  platform: string | null | undefined,
  filter: ScanKindFilter,
): boolean {
  if (filter === "all") return true;
  return scanKindFromPlatform(platform) === filter;
}

export type ScanKindCounts = {
  seo: number;
  geo: number;
  unknown: number;
};

export function countScanKinds(
  scans: { platform?: string | null }[],
): ScanKindCounts {
  const counts: ScanKindCounts = { seo: 0, geo: 0, unknown: 0 };
  for (const s of scans) {
    const kind = scanKindFromPlatform(s.platform);
    if (kind === "seo") counts.seo += 1;
    else if (kind === "geo") counts.geo += 1;
    else counts.unknown += 1;
  }
  return counts;
}
