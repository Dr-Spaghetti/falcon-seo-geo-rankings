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
  /**
   * Metal / frame accent for premium hub chrome.
   * Per-firm — never stamp DJ gold onto every firm.
   */
  accent: string;
  /** Dark hub body surface (premium dark template) */
  surface: string;
  /** Optional exact metal light (HTML SoT goldLight) */
  metalLight?: string;
  /** Optional exact metal dark (HTML SoT goldDark) */
  metalDark?: string;
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
  accent: "#8fa3bc",
  surface: "#131820",
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
 * - dj-law: DLC crest / site — forest green + charcoal + metal gold (NOT Bootstrap #0d6efd)
 * - mary-higgins: letsbelegal.com --color-prime #b32227
 * - shammas-law: shammas-law.com practice-area cards #001159
 * - farias-firm: fariastriallaw.com dark ink #112337
 * - pearl-thompson: pearlandthompsonlaw.com dark ink #112337
 * - direct-legal-funding: directlegalfunding.com orange #ea5800
 */
export const LF_BRAND_BY_SLUG: Record<string, LfBrandTheme> = {
  therman: buildTheme("#011633", {
    soft: "#1a3a66",
    ring: "#2a5080",
    border: "#000d1f",
    muted: "#c5d3e4",
    hero: "linear-gradient(135deg, #011633 0%, #0a2448 48%, #143a66 100%)",
    accent: "#C5A059",
    surface: "#060d18",
    source:
      "choosecharlie.com theme CSS header-nav/hero #011633 + Therman gold accent #C5A059 (logo cream/gold; NOT DJ forest)",
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
    accent: "#d0b56d",
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
    hero: "linear-gradient(135deg, #2a0a0b 0%, #4a0c0e 48%, #640d0f 100%)",
    accent: "#066a94",
    surface: "#1a0c0d",
    source:
      "andycallifbailbonds.com homepage inline CSS / 24 Hour Help mark burgundy #640d0f (CTA blue #066a94 supporting accent — not DJ gold)",
  }),
  "amos-perrick": buildTheme("#2b2b51", {
    soft: "#454575",
    ring: "#555588",
    border: "#1a1a38",
    muted: "#d0d0e0",
    hero: "linear-gradient(135deg, #2b2b51 0%, #353568 48%, #454575 100%)",
    accent: "#E2C675",
    source:
      "apmdlaw.com header/footer logo SVG navy #2b2b51 (gold #E2C675 accent secondary)",
  }),
  "gold-dog": buildTheme("#375d6a", {
    soft: "#4a7585",
    ring: "#5a8898",
    border: "#264552",
    muted: "#d0e0e4",
    hero: "linear-gradient(135deg, #375d6a 0%, #426e7c 48%, #4a7585 100%)",
    accent: "#ECB52A",
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
  "dj-law": {
    primary: "#0d131f",
    onPrimary: "#ffffff",
    soft: "#101726",
    ring: "#f6e27a",
    border: "#090d14",
    muted: "#cbd5e1",
    hero: "radial-gradient(circle at 50% 30%, rgba(20,28,38,0.95), rgba(11,15,23,0.98))",
    accent: "#d4af37",
    surface: "#0b0f17",
    metalLight: "#f6e27a",
    metalDark: "#997d25",
    source:
      "Nick HTML SoT 2026-09-24 — header #0d131f, page #090d14, circuit #0b0f17, gold #d4af37 / #f6e27a / #997d25, green #00d68f",
  },
  "mary-higgins": buildTheme("#b32227", {
    soft: "#c93a3f",
    ring: "#d44a4f",
    border: "#8a1a1e",
    muted: "#f0d0d1",
    hero: "linear-gradient(135deg, #b32227 0%, #c02e33 48%, #c93a3f 100%)",
    source:
      "letsbelegal.com homepage inline CSS --color-prime:#b32227 (teal #048282 secondary)",
  }),
  "shammas-law": buildTheme("#001159", {
    soft: "#1a2e75",
    ring: "#2a4088",
    border: "#000c3b",
    muted: "#c5cce4",
    hero: "linear-gradient(135deg, #001159 0%, #0a1f6a 48%, #1a2e75 100%)",
    source:
      "shammas-law.com practice-area cards #001159 (alternating navy #000c3b)",
  }),
  "farias-firm": buildTheme("#112337", {
    soft: "#2a3f55",
    ring: "#3a5570",
    border: "#0a1828",
    muted: "#d0d6dc",
    hero: "linear-gradient(135deg, #112337 0%, #1a3048 48%, #2a3f55 100%)",
    accent: "#d4a437",
    source:
      "fariastriallaw.com dark ink/primary #112337 (gold #d4a437 accent secondary)",
  }),
  "pearl-thompson": buildTheme("#112337", {
    soft: "#2a3f55",
    ring: "#3a5570",
    border: "#0a1828",
    muted: "#d0d6dc",
    hero: "linear-gradient(135deg, #112337 0%, #1a3048 48%, #2a3f55 100%)",
    source:
      "pearlandthompsonlaw.com dark ink/primary theme token #112337",
  }),
  "direct-legal-funding": buildTheme("#051750", {
    soft: "#1a2a6a",
    ring: "#f59045",
    border: "#030d30",
    muted: "#fde8d4",
    hero: "linear-gradient(135deg, #051750 0%, #0a2260 48%, #1a2a6a 100%)",
    accent: "#ea5800",
    surface: "#060b1c",
    source:
      "directlegalfunding.com deep navy #051750 primary shell + orange #ea5800 metal accent (not DJ gold)",
  }),
};

function buildTheme(
  primary: string,
  extras: Omit<LfBrandTheme, "primary" | "onPrimary" | "accent" | "surface"> & {
    accent?: string;
    surface?: string;
  }
): LfBrandTheme {
  const { accent, surface, ...rest } = extras;
  return {
    primary,
    onPrimary: contrastOnPrimary(primary),
    accent: accent ?? defaultAccent(primary),
    surface: surface ?? defaultSurface(primary),
    ...rest,
  };
}

/** Per-primary metal accent — silver/steel lift, NOT fixed DJ gold. */
function defaultAccent(primary: string): string {
  const [r, g, b] = hexToRgb(primary);
  const mix = 0.55;
  const nr = Math.round(r * (1 - mix) + 190 * mix);
  const ng = Math.round(g * (1 - mix) + 198 * mix);
  const nb = Math.round(b * (1 - mix) + 210 * mix);
  return rgbToHex(nr, ng, nb);
}

/** Dark hub body derived from primary. */
function defaultSurface(primary: string): string {
  const [r, g, b] = hexToRgb(primary);
  return rgbToHex(
    Math.max(8, Math.round(r * 0.35)),
    Math.max(10, Math.round(g * 0.35)),
    Math.max(14, Math.round(b * 0.4))
  );
}

function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (n: number) => Math.max(0, Math.min(255, n));
  return (
    "#" +
    [clamp(r), clamp(g), clamp(b)]
      .map((n) => n.toString(16).padStart(2, "0"))
      .join("")
  );
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
    "--brand-accent": theme.accent,
    "--brand-surface": theme.surface,
    "--hub-metal": theme.accent,
    "--hub-header": theme.primary,
    "--hub-circuit": theme.surface,
    "--hub-card": theme.soft,
    ...(theme.metalLight ? { "--hub-metal-light": theme.metalLight } : {}),
    ...(theme.metalDark ? { "--hub-metal-dark": theme.metalDark } : {}),
  };
}
