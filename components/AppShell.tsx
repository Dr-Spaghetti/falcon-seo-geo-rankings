"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  brandCssVars,
  brandSlugFromPathname,
  getBrandTheme,
} from "@/lib/lf-brand";
import { LF_CLIENT_NAV } from "@/lib/lf-nav";

function navActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

const navBase =
  "rounded-md px-2.5 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand)]";

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

  return (
    <div
      className="min-h-screen bg-page-wash text-slate-900 antialiased"
      style={brandStyle}
    >
      <header className="sticky top-0 z-40 border-b border-[color:var(--brand-border)] bg-[var(--brand)] text-[var(--brand-fg)] shadow-md shadow-black/25">
        <div
          className={`mx-auto flex items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 ${
            wide ? "max-w-7xl" : "max-w-5xl"
          }`}
        >
          <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-5">
            <Link
              href={activeClient?.href ?? "/clients/therman"}
              className="shrink-0 rounded-md font-semibold tracking-tight text-[var(--brand-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand)]"
            >
              <span className="hidden sm:inline">
                LocalFalcon Keyword Scans/Reports
              </span>
              <span className="sm:hidden">LocalFalcon</span>
            </Link>
            <nav
              className="flex min-w-0 flex-1 items-center gap-2 text-sm sm:gap-3"
              aria-label="Primary"
            >
              <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
                <label
                  htmlFor="lf-client-switcher"
                  className="shrink-0 text-xs font-medium text-[color:var(--brand-muted)]"
                >
                  Firm
                </label>
                <select
                  id="lf-client-switcher"
                  aria-label="Switch client firm"
                  value={activeClient?.href ?? ""}
                  onChange={(e) => {
                    const next = e.target.value;
                    if (next) router.push(next);
                  }}
                  className="max-w-[11rem] truncate rounded-md border border-white/25 bg-white/10 px-2 py-1.5 text-sm font-semibold text-[var(--brand-fg)] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--brand)] sm:max-w-[16rem]"
                >
                  {!activeClient ? (
                    <option value="" disabled>
                      Select firm…
                    </option>
                  ) : null}
                  {LF_CLIENT_NAV.map((c) => (
                    <option
                      key={c.slug}
                      value={c.href}
                      className="bg-white text-slate-900"
                    >
                      {c.label}
                    </option>
                  ))}
                </select>
                {activeClient ? (
                  <span className="sr-only" aria-live="polite">
                    Active firm: {activeClient.label}
                  </span>
                ) : null}
              </div>
              <Link
                href="/wordpress"
                aria-current={wordpressActive ? "page" : undefined}
                className={
                  wordpressActive
                    ? `${navBase} shrink-0 bg-white font-semibold text-[var(--brand)]`
                    : `${navBase} shrink-0 text-[color:var(--brand-muted)] hover:bg-white/15 hover:text-[var(--brand-fg)]`
                }
              >
                WordPress
              </Link>
            </nav>
          </div>
          <p className="hidden truncate text-xs font-medium text-[color:var(--brand-muted)] sm:block sm:max-w-[14rem]">
            {activeClient
              ? `${activeClient.label} · Local Falcon`
              : wordpressActive
                ? "WordPress ingest"
                : "Local Falcon"}
          </p>
        </div>
      </header>
      <main
        className={`mx-auto px-4 py-8 sm:px-6 ${
          wide ? "max-w-7xl" : "max-w-5xl"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
