import Link from "next/link";

export function AppShell({
  children,
  wide = false,
}: {
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div
          className={`mx-auto flex items-center justify-between gap-4 px-4 py-3 sm:px-6 ${
            wide ? "max-w-7xl" : "max-w-5xl"
          }`}
        >
          <div className="flex items-center gap-6 min-w-0">
            <Link
              href="/clients/therman"
              className="shrink-0 font-semibold tracking-tight text-slate-900"
            >
              Falcon{" "}
              <span className="font-normal text-slate-400">/</span>{" "}
              <span className="text-navy-700">Local Falcon</span>
            </Link>
            <nav className="hidden items-center gap-1 text-sm sm:flex">
              <Link
                href="/clients/therman"
                className="rounded-md px-2.5 py-1.5 font-medium text-navy-800 bg-navy-50 ring-1 ring-navy-100"
              >
                Therman
              </Link>
              <Link
                href="/wordpress"
                className="rounded-md px-2.5 py-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              >
                WordPress
              </Link>
            </nav>
          </div>
          <p className="truncate text-xs text-slate-500">
            Pilot · Therman Law Group
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
