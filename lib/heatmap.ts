/** Helpers for on-demand Local Falcon heatmap viewing (shared Therman + Premier). */

export type HeatmapContext = {
  keyword: string | null;
  date: string | null;
  campaignName: string | null;
  locationLabel: string;
};

export function heatmapImageAlt(ctx: HeatmapContext): string {
  const keyword = ctx.keyword?.trim() || "unnamed keyword";
  const location = ctx.locationLabel.trim() || "location";
  const date = ctx.date?.trim();
  if (date) {
    return `Local Falcon heatmap for “${keyword}” at ${location} (${date})`;
  }
  return `Local Falcon heatmap for “${keyword}” at ${location}`;
}

/** True when URL looks like a Local Falcon static heatmap image (not invented hosts). */
export function isLocalFalconHeatmapUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  try {
    const u = new URL(url);
    return (
      (u.protocol === "https:" || u.protocol === "http:") &&
      u.hostname.endsWith("localfalcon.com") &&
      u.pathname.includes("heatmap")
    );
  } catch {
    return false;
  }
}
