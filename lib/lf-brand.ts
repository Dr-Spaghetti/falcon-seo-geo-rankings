import { LF_CLIENT_NAV } from "@/lib/lf-nav";

/** Per-client brand tokens for header / hero / active nav accents. */
export type LfBrandTheme = {
  /** Header & primary surface */
  primary: string;
  /** Text/icons on primary (WCAG-ish auto pick) */
  onPrimary: string;
  /** Soft tint for subtle fills / glows */
  soft: string;
  /** Focus ring accent on light surfaces */
  ring: string;
  /** Border against primary surfaces */
  border: string;
  /** Muted text on primary (hex with implied opacity via CSS) */
  muted: string;
  /** Hero background image (linear-gradient) */
  hero: string;
  /** Human-readable provenance for commits / audits */
  source: string;
};

const FALLBACK_PRIMARY = "#122033";

/**
 * Falcon default navy — WordPress, unknown routes, and missing slugs.
 * Matches existing tailwind navy-900 / hero-navy scale.
 */
export const LF_BRAND_FALLBACK: LfBrandTheme = {
  primary: FALLBACK_PRIMARY,
  onPrimary: "#ffffff",
  soft: "#3d5a80",
  ring: "#2f4a6e",
  border: "#0a1420",
  muted: "#e4ebf3",
  hero: "linear-gradient(135deg, #122033 0%, #1b2d45 48%, #243a58 100%)",
  source: "Falcon default navy (tailwind navy-900 / hero-navy)",
};

/**
 * Firm brand primaries researched from public sites (header-nav CSS).
 * - therman: choosecharlie.com `.header-nav` / `.header-main-wrap` / `.internal-hero-wrap`
 * - premier: plg-pllc redesign `.header-nav` (premierlawgroup.com)
 * - michael-marr: atlantainjuryattorneys.com marrlaw `.header-main-wrap` / `.header-nav`
 * - kaplun-marx: kaplunmarx.com Elementor header (elementor-24 / --e-global-color-2a1465e)
 * - cmh: carlsonmeissner.com inline CSS primary #06243d (carlsonhayslett.com redirects)
 * - jones-swanson: awjlaw.com theme jones-swanson-rebuild main.min.css #0c859c
 * - norden-leacox: nordenleacox.com --primaryColor #002a54 (color-scheme-1)
 * - omega: omegalaw.com omega-rebuild main.min.css navy #22374b
 * - widrig: widriglaw.com styles/variables.css --color-primary #233C55
 * - facchetti: facchettilaw.com Elementor --e-global-color-primary #013f4e
 * - leahy-cox: emeraldlaw.com --color-prime #2d7372
 * - andy-callif: andycallifbailbonds.com burgundy #640d0f
 * - amos-perrick: apmdlaw.com logo SVG navy #2b2b51
 * - gold-dog: golddoglaw.com logo SVG slate teal #375d6a
 * - kunka: kunkalaw.com Elementor --e-global-color-primary #0b3752
 * - rampart: rampartinjurylawyers.com Elementor --e-global-color-primary #333544
 * - milano: milanoaccidentlawyers.com WordPress theme primary #0073e5
 * - tad-law: tadlaw.com homepage critical CSS #cb6326
 */
export const LF_BRAND_BY_SLUG: Record<string, LfBrandTheme> = {
  therman: buildTheme("#011633", {
    soft: "#1a3a66",
    ring: "#2a5080",
    border: "#000d1f",
    muted: "#c5d3e4",
    hero: "linear-gradient(135deg, #011633 0%, #0a2448 48%, #143a66 100%)",
    source:
      "choosecharlie.com theme CSS header-nav/hero #011633 (Charlie Therman / Choose Charlie)",
  }),
  premier: buildTheme("#142452", {
    soft: "#243660",
    ring: "#3a5080",
    border: "#0c1838",
    muted: "#c5d0e8",
    hero: "linear-gradient(135deg, #142452 0%, #1a3168 48%, #244080 100%)",
    source:
      "premierlawgroup.com / plg-pllc redesign CSS .header-nav background-color #142452",
  }),
  "michael-marr": buildTheme("#212e51", {
    soft: "#3a4a72",
    ring: "#4a5f8a",
    border: "#141c38",
    muted: "#d0d6e4",
    hero: "linear-gradient(135deg, #212e51 0%, #2a3a62 48%, #3a4a72 100%)",
    source:
      "atlantainjuryattorneys.com marrlaw theme CSS .header-main-wrap / .header-nav background-color #212e51",
  }),
  "kaplun-marx": buildTheme("#092241", {
    soft: "#1a3a5a",
    ring: "#2a5080",
    border: "#061828",
    muted: "#c5d3e4",
    hero: "linear-gradient(135deg, #092241 0%, #0f3058 48%, #1a3a5a 100%)",
    source:
      "kaplunmarx.com Elementor header (elementor-24) background-color var(--e-global-color-2a1465e) #092241",
  }),
  cmh: buildTheme("#06243d", {
    soft: "#1a3a5a",
    ring: "#2a5080",
    border: "#041828",
    muted: "#c5d3e4",
    hero: "linear-gradient(135deg, #06243d 0%, #0c3558 48%, #1a3a5a 100%)",
    source:
      "carlsonmeissner.com homepage inline CSS primary #06243d (carlsonhayslett.com redirects; ~120× buttons/header/body)",
  }),
  "jones-swanson": buildTheme("#0c859c", {
    soft: "#1a9fb5",
    ring: "#2aa8bc",
    border: "#086a7a",
    muted: "#e0f4f7",
    hero: "linear-gradient(135deg, #0c859c 0%, #0f9bb0 48%, #1a9fb5 100%)",
    source:
      "awjlaw.com theme jones-swanson-rebuild assets/app/css/main.min.css #0c859c (~49× btn-global/header__top-box/CTAs)",
  }),
  "norden-leacox": buildTheme("#002a54", {
    soft: "#1a4a7a",
    ring: "#2a6090",
    border: "#001a38",
    muted: "#c5d3e4",
    hero: "linear-gradient(135deg, #002a54 0%, #0a3a6a 48%, #1a4a7a 100%)",
    source:
      "nordenleacox.com theme --primaryColor:#002a54 (body[data-color-scheme=color-scheme-1]; not secondary red #d10b0c)",
  }),
  omega: buildTheme("#22374b", {
    soft: "#3a5570",
    ring: "#4a6885",
    border: "#152838",
    muted: "#d0d8e0",
    hero: "linear-gradient(135deg, #22374b 0%, #2a4560 48%, #3a5570 100%)",
    source:
      "omegalaw.com theme omega-rebuild assets/app/css/main.min.css navy #22374b (~66× button hover/fill + scroll-to-top; gold #d0b56d accent secondary)",
  }),
  widrig: buildTheme("#233C55", {
    soft: "#3a5575",
    ring: "#4a6888",
    border: "#162838",
    muted: "#d0d8e0",
    hero: "linear-gradient(135deg, #233C55 0%, #2a4a68 48%, #3a5575 100%)",
    source:
      "widriglaw.com styles/variables.css --color-primary:#233C55 (also --cta-phone-color; red --color-accent:#DC0418 secondary; not legacy #06357a)",
  }),
  facchetti: buildTheme("#013f4e", {
    soft: "#1a5a6e",
    ring: "#2a7088",
    border: "#012a36",
    muted: "#c5d8de",
    hero: "linear-gradient(135deg, #013f4e 0%, #0a5568 48%, #1a5a6e 100%)",
    source:
      "facchettilaw.com Elementor kit --e-global-color-primary:#013f4e (teal navy; accent coral #ff6a67 secondary)",
  }),
  "leahy-cox": buildTheme("#2d7372", {
    soft: "#3a8a88",
    ring: "#4a9a98",
    border: "#1e5554",
    muted: "#d0e8e7",
    hero: "linear-gradient(135deg, #2d7372 0%, #358582 48%, #3a8a88 100%)",
    source:
      "emeraldlaw.com homepage inline theme CSS --color-prime:#2d7372 (also --color-link; navy #0b244e --color-second secondary)",
  }),
  "andy-callif": buildTheme("#640d0f", {
    soft: "#8a2426",
    ring: "#9a3032",
    border: "#4a090a",
    muted: "#e8d0d1",
    hero: "linear-gradient(135deg, #640d0f 0%, #7a181a 48%, #8a2426 100%)",
    source:
      "andycallifbailbonds.com homepage inline CSS / 24 Hour Help mark burgundy #640d0f (CTA blue #066a94 supporting accent)",
  }),
  "amos-perrick": buildTheme("#2b2b51", {
    soft: "#454575",
    ring: "#555588",
    border: "#1a1a38",
    muted: "#d0d0e0",
    hero: "linear-gradient(135deg, #2b2b51 0%, #353568 48%, #454575 100%)",
    source:
      "apmdlaw.com header/footer logo SVG navy #2b2b51 (gold #E2C675 accent secondary)",
  }),
  "gold-dog": buildTheme("#375d6a", {
    soft: "#4a7585",
    ring: "#5a8898",
    border: "#264552",
    muted: "#d0e0e4",
    hero: "linear-gradient(135deg, #375d6a 0%, #426e7c 48%, #4a7585 100%)",
    source:
      "golddoglaw.com homepage/logo SVG slate teal #375d6a (gold #ECB52A accent secondary)",
  }),
  kunka: buildTheme("#0b3752", {
    soft: "#1a4a66",
    ring: "#2a6080",
    border: "#07283c",
    muted: "#c5d6e0",
    hero: "linear-gradient(135deg, #0b3752 0%, #134868 48%, #1a5a7a 100%)",
    source:
      "kunkalaw.com Elementor kit --e-global-color-primary #0b3752 (peach #FFBC7D accent secondary)",
  }),
  rampart: buildTheme("#333544", {
    soft: "#4a4c5c",
    ring: "#5a5c70",
    border: "#222330",
    muted: "#d4d4dc",
    hero: "linear-gradient(135deg, #333544 0%, #3e4054 48%, #4a4c5c 100%)",
    source:
      "rampartinjurylawyers.com Elementor kit --e-global-color-primary #333544 (bronze #A96F44 accent secondary)",
  }),
  milano: buildTheme("#0073e5", {
    soft: "#1f8af0",
    ring: "#3d9cf5",
    border: "#005bb8",
    muted: "#cce4fa",
    hero: "linear-gradient(135deg, #0073e5 0%, #1a85eb 48%, #3397f0 100%)",
    source:
      "milanoaccidentlawyers.com WordPress theme primary/secondary #0073e5 (navy #0C2340 also in site CSS)",
  }),
  "tad-law": buildTheme("#cb6326", {
    soft: "#db7a3f",
    ring: "#e08a52",
    border: "#9a4a1c",
    muted: "#f0ddd0",
    hero: "linear-gradient(135deg, #cb6326 0%, #d57235 48%, #db7a3f 100%)",
    source:
      "tadlaw.com homepage critical CSS #cb6326 (dark #252422 supporting neutral)",
  }),
};

function buildTheme(
  primary: string,
  extras: Omit<LfBrandTheme, "primary" | "onPrimary">
): LfBrandTheme {
  return {
    primary,
    onPrimary: contrastOnPrimary(primary),
    ...extras,
  };
}

/** Relative luminance (sRGB) for WCAG-ish contrast decisions. */
export function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Pick white vs near-black foreground for text on `primary`.
 * Threshold ~0.4 keeps dark brand navies on white text.
 */
export function contrastOnPrimary(hex: string): "#ffffff" | "#0a0a0a" {
  return relativeLuminance(hex) > 0.4 ? "#0a0a0a" : "#ffffff";
}

export function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "").trim();
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) {
    return [18, 32, 51]; // fallback navy
  }
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

export function getBrandTheme(slug: string | null | undefined): LfBrandTheme {
  if (!slug) return LF_BRAND_FALLBACK;
  return LF_BRAND_BY_SLUG[slug] ?? LF_BRAND_FALLBACK;
}

/** Resolve active LF client slug from pathname using LF_CLIENT_NAV. */
export function brandSlugFromPathname(pathname: string): string | null {
  const hit = LF_CLIENT_NAV.find(
    (c) => pathname === c.href || pathname.startsWith(c.href + "/")
  );
  return hit?.slug ?? null;
}

/** CSS custom properties applied on AppShell (and inherited by heroes). */
export function brandCssVars(
  theme: LfBrandTheme
): Record<string, string> {
  return {
    "--brand": theme.primary,
    "--brand-fg": theme.onPrimary,
    "--brand-muted": theme.muted,
    "--brand-soft": theme.soft,
    "--brand-ring": theme.ring,
    "--brand-border": theme.border,
    "--brand-hero": theme.hero,
  };
}
