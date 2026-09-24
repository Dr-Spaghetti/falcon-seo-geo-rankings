"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  brandCssVars,
  brandSlugFromPathname,
  getBrandTheme,
} from "@/lib/lf-brand";
import { LF_CLIENT_NAV } from "@/lib/lf-nav";
import { JustifyMark } from "@/components/hub/HubDecor";
import { LiveClock } from "@/components/hub/LiveClock";

function navActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

/**
 * AppShell — Nick HTML SoT chrome for LF clients (2026-09-24):
 * Header #0d131f (via --hub-header): Keyword Scans/Reports left, justify center, live ET clock right.
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
  const maxW = wide ? "max-w-[1600px]" : "max-w-5xl";

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
          className={`relative mx-auto grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-3 py-2.5 sm:gap-4 sm:px-6 ${maxW}`}
        >
          {/* Left: Keyword Scans/Reports — firm select sr-only */}
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Link
              href={activeClient?.href ?? "/clients/dj-law"}
              className="flex min-w-0 items-center gap-2 rounded-md text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              <SearchIcon className="h-4 w-4 shrink-0 text-white/80" />
              <span className="truncate font-serif text-sm tracking-tight sm:text-[15px]">
                Keyword Scans/Reports
              </span>
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

          {/* Center: justify mark — two green arrows (N1) */}
          <div className="flex justify-center">
            <JustifyMark className="h-8 w-auto object-contain sm:h-9" />
          </div>

          {/* Right: live ET clock only — no fake account/settings/bell */}
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            <LiveClock className="font-serif text-xs tracking-tight text-slate-300 sm:text-sm" />
          </div>
        </div>
      </header>

      <main
        className={`relative z-[1] mx-auto w-full flex-1 px-3 pt-4 pb-8 sm:px-5 ${maxW}`}
      >
        {children}
      </main>

      <footer className="relative z-[1] border-t border-slate-800/60 py-4 text-center text-[11px] tracking-wide text-slate-500">
        Justify Local Platform · Client Portal &amp; Geo-Grid Rank Intelligence
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
