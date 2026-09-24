"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  brandCssVars,
  brandSlugFromPathname,
  getBrandTheme,
} from "@/lib/lf-brand";
import { LF_CLIENT_NAV } from "@/lib/lf-nav";
import { OfficialLogo } from "@/components/hub/OfficialLogo";
import { JUSTIFY_LOCAL_LOGO } from "@/lib/brand-logos";
import { LiveClock } from "@/components/hub/LiveClock";

function navActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

/**
 * AppShell — Nick HTML SoT chrome for LF clients (2026-09-24):
 * Header #0d131f (via --hub-header): Keyword Scans/Reports left, official Justify Local logo center, live ET clock right.
 * No fake account / settings / notifications / "5" badge.
 * Body: .circuit-bg (CSS grid), no photoreal watermark plate.
 * Footer: Justify Local Platform · Client Portal & Geo-Grid Rank Intelligence
 */
export function AppShell({
  children,
  wide = false,
}: {
  children: React.ReactNode;
  wide?: boolean;
}) {
  const pathname = usePathname() || "";
  const router = useRouter();
  const activeClient = LF_CLIENT_NAV.find((c) => navActive(pathname, c.href));
  const wordpressActive = pathname.startsWith("/wordpress");
  const brand = getBrandTheme(brandSlugFromPathname(pathname));
  const brandStyle = brandCssVars(brand) as React.CSSProperties;
  const isLfClient = Boolean(activeClient);
  // HTML SoT: main max-w-7xl mx-auto px-6 — same gutters on header/main/footer.
  const maxW = isLfClient ? "max-w-7xl" : wide ? "max-w-[1600px]" : "max-w-5xl";
  const padX = isLfClient ? "px-6" : "px-3 sm:px-5";

  if (!isLfClient) {
    return (
      <div
        className="min-h-screen bg-page-wash text-slate-900 antialiased"
        style={brandStyle}
      >
        <header className="sticky top-0 z-40 border-b border-[color:var(--brand-border)] bg-[var(--brand)] text-[var(--brand-fg)] shadow-md shadow-black/25">
          <div
            className={`mx-auto flex items-center justify-between gap-3 px-4 py-3 sm:px-6 ${maxW}`}
          >
            <Link
              href="/clients/therman"
              className="shrink-0 font-semibold tracking-tight text-[var(--brand-fg)]"
            >
              LocalFalcon Keyword Scans/Reports
            </Link>
            <Link
              href="/wordpress"
              aria-current={wordpressActive ? "page" : undefined}
              className={
                wordpressActive
                  ? "rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-[var(--brand)]"
                  : "rounded-md px-2.5 py-1.5 text-sm text-[color:var(--brand-muted)] hover:bg-white/15"
              }
            >
              WordPress
            </Link>
          </div>
        </header>
        <main className={`mx-auto px-4 py-8 sm:px-6 ${maxW}`}>{children}</main>
      </div>
    );
  }

  return (
    <div
      className="circuit-bg relative flex min-h-screen flex-col text-slate-100 antialiased"
      style={brandStyle}
    >
      <header
        className="sticky top-0 z-40 border-b border-slate-800/80 shadow-lg shadow-black/40"
        style={{ backgroundColor: "var(--hub-header, #0d131f)" }}
      >
        <div
          className={`relative mx-auto grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 py-2.5 sm:gap-4 ${padX} ${maxW}`}
        >
          {/* Left: search-style Keyword Scans/Reports (HTML SoT look; no fake actions) */}
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            {/* <640px: compact 32px search icon button; sm+: full pill */}
            <Link
              href={activeClient?.href ?? "/clients/dj-law"}
              aria-label="Keyword Scans/Reports"
              title="Keyword Scans/Reports"
              className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-slate-700/60 bg-[#131b2b] text-xs font-medium text-hub-text transition-colors hover:border-emerald-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 sm:h-auto sm:w-full sm:min-w-0 sm:max-w-64 sm:shrink sm:justify-start sm:py-1.5 sm:pl-9 sm:pr-3"
            >
              <SearchIcon className="pointer-events-none h-4 w-4 text-emerald-400 sm:absolute sm:left-3 sm:top-1/2 sm:-translate-y-1/2" />
              <span className="hidden truncate sm:inline">Keyword Scans/Reports</span>
            </Link>
            <label htmlFor="lf-client-switcher" className="sr-only">
              Switch client firm
            </label>
            <select
              id="lf-client-switcher"
              aria-label="Switch client firm"
              value={activeClient?.href ?? ""}
              onChange={(e) => {
                const next = e.target.value;
                if (next) router.push(next);
              }}
              className="sr-only"
            >
              {LF_CLIENT_NAV.map((c) => (
                <option
                  key={c.slug}
                  value={c.href}
                  className="bg-slate-900 text-white"
                >
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Center: OFFICIAL Justify Local logo file, untouched (no retrace/text rebuild) */}
          <div
            data-logo-slot="header-justify"
            className="flex items-center justify-center self-stretch"
          >
            <OfficialLogo
              logo={JUSTIFY_LOCAL_LOGO}
              slot="header-justify"
              priority
              className="h-10 w-auto sm:h-[46px]"
            />
          </div>

          {/* Right: live ET clock only — no fake account/settings/bell */}
          <div className="flex min-w-0 items-center justify-end gap-2 sm:gap-3">
            <LiveClock className="min-w-0 sm:min-w-[11.5rem] text-right leading-tight font-sans text-xs font-normal normal-case tracking-normal text-hub-text sm:text-sm" />
          </div>
        </div>
      </header>

      <main
        className={`relative z-[1] mx-auto w-full flex-1 pt-6 pb-8 ${padX} ${maxW}`}
      >
        {children}
      </main>

      <footer className="relative z-[1] border-t border-slate-800/60 py-3">
        <div
          className={`mx-auto text-center text-xs font-sans tracking-wide text-hub-text ${padX} ${maxW}`}
        >
          Justify Local Platform · Client Portal &amp; Geo-Grid Rank Intelligence
        </div>
      </footer>
    </div>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M16.5 16.5 L20 20"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}
