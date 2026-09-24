import fs from "node:fs";
import path from "node:path";

const LOGO_EXTS = ["png", "svg", "webp", "jpg", "jpeg"] as const;

/**
 * Resolve official firm logo under public/brands/{slug}/.
 * Returns a public URL path, or null when missing (hub shows placeholder text).
 * Never invents a mark. Server-only (Node fs).
 */
export function resolveBrandLogoUrl(slug: string): string | null {
  const dir = path.join(process.cwd(), "public", "brands", slug);
  if (!fs.existsSync(dir)) return null;
  for (const ext of LOGO_EXTS) {
    const file = path.join(dir, `logo.${ext}`);
    if (fs.existsSync(file)) return `/brands/${slug}/logo.${ext}`;
  }
  return null;
}
