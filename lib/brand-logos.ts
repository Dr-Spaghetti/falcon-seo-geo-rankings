/**
 * Official logo manifest — every logo the hub renders, with natural size + sha256.
 *
 * RULE (Nick, 2026-09-24): logos are rendered UNTOUCHED as <img> of the official
 * file. No retrace, recolor, crop, CSS filter, mask, ring, disc or plate, and no
 * rebuilding as text + arrows. Aspect ratio is locked to width/height below.
 * next/image is intentionally NOT used (its optimizer re-encodes pixels).
 *
 * __tests__/brand-logos.test.ts enforces that sha256 + dimensions match the
 * bytes in public/ and that every public/brands/<slug>/logo.* has an entry.
 * Provenance: public/brands/<slug>/SOURCE.txt
 */
export type BrandLogo = {
  src: string;
  width: number;
  height: number;
  sha256: string;
  alt: string;
  /**
   * Optical centering: offset (as % of the rendered box) of the visible-ink
   * bbox centre from the file's canvas centre, caused by the file's own
   * asymmetric transparent padding. <OfficialLogo> translates the box by the
   * negative of this so the visible logo sits centred in its slot WITHOUT
   * cropping the file. Measured from the alpha channel (alpha > 12).
   */
  inkOffsetPct?: { x: number; y: number };
};

/** Justify Local — Drive "JL Logo Files/Logo w/o Shade Effect/logo-white-without-shadow.png". */
export const JUSTIFY_LOCAL_LOGO: BrandLogo = {
  src: "/brands/_justify/logo-white-without-shadow.png",
  width: 3125,
  height: 1562,
  sha256: "e3b4eb2037babfc09d6d95585fe64ae07eeb41e700ad73063eeee127b45bfc69",
  alt: "Justify Local",
  // ink rows 152..1469 of 1562 (top pad 152, bottom pad 92) => ink centre +1.9% low.
  inkOffsetPct: { x: 0, y: 1.9 },
};

/** Firm logos keyed by client slug. */
export const FIRM_LOGOS: Record<string, BrandLogo> = {
  "dj-law": {
    src: "/brands/dj-law/logo.webp",
    width: 150,
    height: 150,
    sha256: "cd8094f2b290d763a1810828d2fce4153a757b98bb2084df936af87c555b5716",
    alt: "Djougourian Law Corp logo",
  },
  therman: {
    src: "/brands/therman/logo.webp",
    width: 300,
    height: 73,
    sha256: "9152e17c6ac98521c1a03b84abf78fdc98c05a723dfdb82491f4c37f32c18e06",
    alt: "Charlie Therman Injury & Accident Lawyers logo",
  },
};

export function getFirmLogo(slug: string): BrandLogo | null {
  return FIRM_LOGOS[slug] ?? null;
}
