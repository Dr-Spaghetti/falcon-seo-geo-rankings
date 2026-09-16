import Link from "next/link";

/** Secondary WordPress tool — keeps its own compact chrome. */
export default function WordpressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-page-wash text-slate-900 antialiased">
      <header className="border-b border-navy-950 bg-navy-900 text-white shadow-md shadow-navy-950/30">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex min-w-0 items-center gap-4">
            <Link
              href="/clients/therman"
              className="rounded-md font-semibold tracking-tight text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
            >
              Falcon
            </Link>
            <span className="text-navy-300">/</span>
            <span className="truncate text-sm font-medium text-navy-50">WordPress ingest</span>
          </div>
          <nav className="flex flex-wrap items-center justify-end gap-3 text-sm">
            <Link
              href="/clients/therman"
              className="rounded-md px-2 py-1 font-medium text-navy-50 hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
            >
              Therman
            </Link>
            <Link
              href="/clients/premier"
              className="rounded-md px-2 py-1 font-medium text-navy-50 hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
            >
              Premier
            </Link>
            <span className="text-xs font-medium text-navy-100">secondary</span>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-10">{children}</main>
    </div>
  );
}
