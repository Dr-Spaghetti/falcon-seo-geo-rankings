"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LF_CLIENT_NAV } from "@/lib/lf-nav";

function navActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

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
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 shadow-sm shadow-slate-900/5 backdrop-blur-md">
        <div
          className={`mx-auto flex items-center justify-between gap-4 px-4 py-3 sm:px-6 ${
            wide ? "max-w-7xl" : "max-w-5xl"
          }`}
        >
          <div className="flex min-w-0 items-center gap-6">
            <Link
              href={activeClient?.href ?? "/clients/therman"}
              className="shrink-0 rounded-md font-semibold tracking-tight text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
            >
              Falcon{" "}
              <span className="font-normal text-slate-400">/</span>{" "}
              <span className="text-navy-700">Local Falcon</span>
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
                        ? "rounded-md bg-navy-50 px-2.5 py-1.5 font-medium text-navy-800 ring-1 ring-navy-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
                        : "rounded-md px-2.5 py-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
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
                    ? "rounded-md bg-navy-50 px-2.5 py-1.5 font-medium text-navy-800 ring-1 ring-navy-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
                    : "rounded-md px-2.5 py-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
                }
              >
                WordPress
              </Link>
            </nav>
          </div>
          <p className="truncate text-xs text-slate-500">
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
