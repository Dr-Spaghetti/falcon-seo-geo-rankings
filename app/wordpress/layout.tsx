import Link from "next/link";

/** Secondary WordPress tool — keeps its own compact chrome. */
export default function WordpressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-page-wash text-slate-900 antialiased">
      <header className="border-b border-navy-200/70 bg-navy-50/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex min-w-0 items-center gap-4">
            <Link
              href="/clients/therman"
              className="rounded-md font-semibold tracking-tight text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
            >
              Falcon
            </Link>
            <span className="text-slate-300">/</span>
            <span className="truncate text-sm text-slate-600">WordPress ingest</span>
          </div>
          <nav className="flex flex-wrap items-center justify-end gap-3 text-sm">
            <Link
              href="/clients/therman"
              className="font-medium text-navy-700 hover:text-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
            >
              Therman
            </Link>
            <Link
              href="/clients/premier"
              className="font-medium text-navy-700 hover:text-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
            >
              Premier
            </Link>
            <span className="text-xs text-slate-400">secondary</span>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-10">{children}</main>
    </div>
  );
}
