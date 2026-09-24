"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  brandCssVars,
  brandSlugFromPathname,
  getBrandTheme,
} from "@/lib/lf-brand";
import { LF_CLIENT_NAV } from "@/lib/lf-nav";
import { JustifyMark, LegalCircuitWatermark } from "@/components/hub/HubDecor";
import { LiveClock } from "@/components/hub/LiveClock";

function navActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

/**
 * AppShell — Nick DJ hub SoT chrome for LF clients:
 * Left: search + "Keyword Scans/Reports" (NO visible firm-select — Design punch)
 * Center: justify mark (two green arrows, never people icons)
 * Right: live NY clock + profile / gear / bell(+5)
 * Firm switch: URL /clients/{slug} only (sr-only select for a11y).
 * Non-LF routes keep the prior light wash layout.
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
      className="relative min-h-screen text-slate-100 antialiased"
      style={{
        ...brandStyle,
        backgroundColor: "var(--brand-surface)",
      }}
    >
      {/* Full-viewport soft-fade watermark — no hard rectangular cut-off */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden
        style={{
          maskImage:
            "radial-gradient(ellipse 95% 75% at 50% 28%, #000 0%, #000 42%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 95% 75% at 50% 28%, #000 0%, #000 42%, transparent 78%)",
        }}
      >
        <LegalCircuitWatermark className="h-full w-full object-cover object-top opacity-[0.45]" />
      </div>
      <header
        className="sticky top-0 z-40 border-b shadow-lg shadow-black/40"
        style={{
          borderColor: "color-mix(in srgb, var(--brand) 60%, #000)",
          backgroundImage:
            "linear-gradient(90deg, color-mix(in srgb, var(--brand) 92%, #0a120e) 0%, var(--brand) 35%, color-mix(in srgb, var(--brand) 55%, #050a08) 100%)",
          backgroundColor: "var(--brand)",
        }}
      >
        {/* faint circuit/network texture on header */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.22]"
          aria-hidden
          preserveAspectRatio="xMaxYMid slice"
          viewBox="0 0 900 56"
        >
          <g stroke="#85d9b6" strokeWidth="0.9" fill="none">
            <path d="M380 30 H500 V16 H580 V36 H660" />
            <path d="M520 42 H700 V28 H780 V40 H860" />
            <path d="M600 8 H720 V22" />
            <circle cx="500" cy="30" r="2.2" fill="#85d9b6" />
            <circle cx="580" cy="16" r="2.2" fill="#85d9b6" />
            <circle cx="660" cy="36" r="2.2" fill="#85d9b6" />
            <circle cx="700" cy="42" r="2.2" fill="#85d9b6" />
            <circle cx="780" cy="28" r="2.2" fill="#85d9b6" />
            <circle cx="860" cy="40" r="2.2" fill="#85d9b6" />
            <circle cx="720" cy="22" r="2.2" fill="#85d9b6" />
          </g>
        </svg>

        <div
          className={`relative mx-auto grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-3 py-2.5 sm:gap-4 sm:px-6 ${maxW}`}
        >
          {/* Left: search + Keyword Scans/Reports — firm select sr-only (Design punch) */}
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

          {/* Center: justify mark */}
          <div className="flex justify-center">
            <JustifyMark className="h-8 w-auto object-contain sm:h-9" />
          </div>

          {/* Right: clock + profile pill */}
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            <LiveClock className="hidden font-serif text-xs tracking-tight text-white sm:inline md:text-sm" />
            <div className="flex items-center gap-1 rounded-full border border-white/15 bg-black/35 px-2 py-1 shadow-inner sm:gap-1.5 sm:px-2.5">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/90"
                title="Profile"
                aria-hidden
              >
                <UserIcon className="h-4 w-4" />
              </span>
              <details className="relative">
                <summary
                  className="flex h-7 w-7 cursor-pointer list-none items-center justify-center rounded-full text-white/85 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  aria-label="Settings"
                >
                  <GearIcon className="h-4 w-4" />
                </summary>
                <div className="absolute right-0 z-50 mt-2 min-w-[10rem] rounded-md border border-white/15 bg-[#14161c] py-1 text-sm shadow-xl">
                  <Link
                    href="/wordpress"
                    className="block px-3 py-1.5 text-white/85 hover:bg-white/10"
                  >
                    WordPress
                  </Link>
                </div>
              </details>
              <span
                className="relative flex h-7 w-7 items-center justify-center rounded-full text-white/85"
                title="Notifications"
                aria-label="Notifications"
              >
                <BellIcon className="h-4 w-4" />
                <span className="absolute -right-0.5 -top-0.5 flex h-3.5 min-w-[0.875rem] items-center justify-center rounded-full bg-red-600 px-0.5 text-[9px] font-bold leading-none text-white">
                  5
                </span>
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className={`relative z-[1] mx-auto px-3 pt-0 pb-8 sm:px-5 ${maxW}`}>
        {children}
      </main>
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

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="12" cy="9" r="3.5" />
      <path d="M5 19.5 C5 16.5 8 14.5 12 14.5 S19 16.5 19 19.5" />
    </svg>
  );
}

function GearIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.4 13a7.7 7.7 0 0 0 .05-1 7.7 7.7 0 0 0-.05-1l2-1.55a.5.5 0 0 0 .12-.64l-1.9-3.28a.5.5 0 0 0-.6-.22l-2.35.94a7.3 7.3 0 0 0-1.73-1L14.5 2.7a.5.5 0 0 0-.5-.4h-3.8a.5.5 0 0 0-.5.4l-.44 2.5a7.3 7.3 0 0 0-1.73 1l-2.35-.94a.5.5 0 0 0-.6.22L2.38 8.8a.5.5 0 0 0 .12.64L4.5 11a7.7 7.7 0 0 0-.05 1 7.7 7.7 0 0 0 .05 1l-2 1.55a.5.5 0 0 0-.12.64l1.9 3.28a.5.5 0 0 0 .6.22l2.35-.94c.53.4 1.11.74 1.73 1l.44 2.5a.5.5 0 0 0 .5.4h3.8a.5.5 0 0 0 .5-.4l.44-2.5c.62-.26 1.2-.6 1.73-1l2.35.94a.5.5 0 0 0 .6-.22l1.9-3.28a.5.5 0 0 0-.12-.64L19.4 13zM12 15.5A3.5 3.5 0 1 1 12 8.5a3.5 3.5 0 0 1 0 7z" />
    </svg>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 16 V11 A6 6 0 0 1 18 11 V16 L20 18 H4 Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M10 18 A2 2 0 0 0 14 18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
