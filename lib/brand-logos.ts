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
 *
 * pearl-thompson: no official file yet — hub keeps "Logo unavailable" placeholder.
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
  "amos-perrick": {
    src: "/brands/amos-perrick/logo.svg",
    width: 350,
    height: 140.9,
    sha256: "9fc0f1a22119826f327523518a2e04aa4d0c5d2e174cb00c66bf1ce6ed550ca6",
    alt: "Amos Perrick logo",
  },
  "andy-callif": {
    src: "/brands/andy-callif/logo.webp",
    width: 426,
    height: 95,
    sha256: "ecd4760d1bd7aeeda72cfc162ba6c9bce6de6eb842609b2807dfea7963918b9e",
    alt: "Andy Callif Bail Bonds logo",
  },
  cmh: {
    src: "/brands/cmh/logo.png",
    width: 493,
    height: 157,
    sha256: "ed84373f19beba4326e0b98a5d3c8d0f9c380a85471f9a3df3d0b65cd85ba4df",
    alt: "Carlson Hayslett logo",
    inkOffsetPct: { x: 0.1, y: -7.6 },
  },
  "direct-legal-funding": {
    src: "/brands/direct-legal-funding/logo.webp",
    width: 676,
    height: 100,
    sha256: "d8c325b3e1931593baac1d8dec6a6ab09b3b9fe9184224af5fdec3dcc6debd1b",
    alt: "Direct Legal Funding logo",
  },
  facchetti: {
    src: "/brands/facchetti/logo.webp",
    width: 2048,
    height: 828,
    sha256: "df120342a767888b5b73d39d99718e86b9a0d59371e3bed400d933e6b67c5b3e",
    alt: "Adrianos Facchetti logo",
  },
  "farias-firm": {
    src: "/brands/farias-firm/logo.png",
    width: 450,
    height: 110,
    sha256: "bee723ab405009daa1f456fdeb68ecd79aa989d0eb54431a06e6e2e1df119747",
    alt: "Farias Firm logo",
  },
  "gold-dog": {
    src: "/brands/gold-dog/logo.png",
    width: 419,
    height: 87,
    sha256: "80285dc1ef6bcf689956e738233a3aceb81ce0565f2f95f7fe894ef1b44c3290",
    alt: "Gold Dog Injury Law logo",
  },
  "jones-swanson": {
    src: "/brands/jones-swanson/logo.webp",
    width: 718,
    height: 317,
    sha256: "2435a8cafb4d20610a8d776514c146a47876d074c826b21752afe3db8d950a02",
    alt: "Jones & Swanson logo",
    inkOffsetPct: { x: -0.6, y: 1.4 },
  },
  "kaplun-marx": {
    src: "/brands/kaplun-marx/logo.webp",
    width: 300,
    height: 59,
    sha256: "e411754b24e8c26183589b4d399e306d11f5535f198c57794db7f725a3a0e23c",
    alt: "KaplunMarx logo",
  },
  kunka: {
    src: "/brands/kunka/logo.png",
    width: 500,
    height: 200,
    sha256: "89d0025eaca66b0f64d2ab9d4cc86055ca6aa704751133d12c820b2c8302cb62",
    alt: "Kunka Law logo",
  },
  "leahy-cox": {
    src: "/brands/leahy-cox/logo.jpg",
    width: 447,
    height: 447,
    sha256: "107a7bf25ff050daab4af5471486929744b78341fc1c0b1f0c36262b53ca6d1d",
    alt: "Leahy Cox logo",
  },
  "mary-higgins": {
    src: "/brands/mary-higgins/logo.png",
    width: 800,
    height: 133,
    sha256: "449a764bf8b036e4fe89047a35ba041ebf2ffadd2bf41bf766be0bf55568c58c",
    alt: "Mary Higgins logo",
  },
  "michael-marr": {
    src: "/brands/michael-marr/logo.png",
    width: 447,
    height: 447,
    sha256: "7b759f5822d163780562ff6379a4386125855483243e0b5b368a26de618ea359",
    alt: "Michael Marr / Injury Attorneys logo",
  },
  milano: {
    src: "/brands/milano/logo.png",
    width: 348,
    height: 348,
    sha256: "7d541084398fa72ef99addd02a0abfc5c94208edaa86766c7c54dc1d12b5705f",
    alt: "Milano Legal Group logo",
  },
  "norden-leacox": {
    src: "/brands/norden-leacox/logo.jpg",
    width: 1440,
    height: 1440,
    sha256: "dfc2f629ee11f404b019b27a9b36a4ea26a395201d2a3c58a26aefb6099ce164",
    alt: "Norden Leacox logo",
  },
  omega: {
    src: "/brands/omega/logo.jpg",
    width: 447,
    height: 447,
    sha256: "df4e363f1a3c8b3c66b6a2d27ba3dfac262f5507ed654709daa4b90a6989a517",
    alt: "Omega Law Group logo",
  },
  premier: {
    src: "/brands/premier/logo.webp",
    width: 592,
    height: 191,
    sha256: "734214c3429876a55efb74f5db1744d5bd9265a90837c5bc59f36d00fb7f94ff",
    alt: "Premier Law Group logo",
  },
  rampart: {
    src: "/brands/rampart/logo.png",
    width: 2560,
    height: 1551,
    sha256: "52745433ff194ecd27a1d62f9e0682ecc1257d0ab891fd1265dcbdb35860ff8a",
    alt: "Rampart Injury Lawyers logo",
  },
  "shammas-law": {
    src: "/brands/shammas-law/logo.svg",
    width: 240,
    height: 116,
    sha256: "4de98fc7ec48532f1b369a9984f9b643caf06ee6f7be73d6d22e75e6b2cb383b",
    alt: "Shammas Law logo",
  },
  "tad-law": {
    src: "/brands/tad-law/logo.svg",
    width: 400,
    height: 78.049,
    sha256: "5c249938adb8d395c92b9a9151e9146acac7822e0aae32b5eadfb7aebf25bdff",
    alt: "Tad Law logo",
  },
  widrig: {
    src: "/brands/widrig/logo.png",
    width: 350,
    height: 82,
    sha256: "5934cc9de5a70f95cd7183d6fb0f9c22b35c89773e65ec9530cac86807ce8b75",
    alt: "Widrig Law logo",
  },
};

export function getFirmLogo(slug: string): BrandLogo | null {
  return FIRM_LOGOS[slug] ?? null;
}
