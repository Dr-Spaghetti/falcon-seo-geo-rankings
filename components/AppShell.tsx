"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LF_CLIENT_NAV } from "@/lib/lf-nav";

function navActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

const navBase =
  "rounded-md px-2.5 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900";

export function AppShell({
  children,
  wide = false,
}: {
  children: React.ReactNode;
  wide?: boolean;
}) {
  const pathname = usePathname() || "";
  const activeClient = LF_CLIENT_NAV.find((c) => navActive(pathname, c.href));
  const wordpressActive = pathname.startsWith("/wordpress");

  return (
    <div className="min-h-screen bg-page-wash text-slate-900 antialiased">
      <header className="sticky top-0 z-40 border-b border-navy-950 bg-navy-900 text-white shadow-md shadow-navy-950/30">
        <div
          className={`mx-auto flex items-center justify-between gap-4 px-4 py-3 sm:px-6 ${
            wide ? "max-w-7xl" : "max-w-5xl"
          }`}
        >
          <div className="flex min-w-0 items-center gap-6">
            <Link
              href={activeClient?.href ?? "/clients/therman"}
              className="shrink-0 rounded-md font-semibold tracking-tight text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
            >
              Falcon{" "}
              <span className="font-normal text-navy-300">/</span>{" "}
              <span className="font-medium text-white">Local Falcon</span>
            </Link>
            <nav
              className="hidden items-center gap-1 text-sm sm:flex"
              aria-label="Primary"
            >
              {LF_CLIENT_NAV.map((c) => {
                const active = navActive(pathname, c.href);
                return (
                  <Link
                    key={c.slug}
                    href={c.href}
                    aria-current={active ? "page" : undefined}
                    className={
                      active
                        ? `${navBase} bg-white font-semibold text-navy-900`
                        : `${navBase} text-navy-50 hover:bg-white/15 hover:text-white`
                    }
                  >
                    {c.label}
                  </Link>
                );
              })}
              <Link
                href="/wordpress"
                aria-current={wordpressActive ? "page" : undefined}
                className={
                  wordpressActive
                    ? `${navBase} bg-white font-semibold text-navy-900`
                    : `${navBase} text-navy-50 hover:bg-white/15 hover:text-white`
                }
              >
                WordPress
              </Link>
            </nav>
          </div>
          <p className="truncate text-xs font-medium text-navy-50">
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
