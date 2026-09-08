import Link from "next/link";

/** Secondary WordPress tool — keeps its own compact chrome. */
export default function WordpressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-4 min-w-0">
            <Link
              href="/clients/therman"
              className="font-semibold tracking-tight text-slate-900"
            >
              Falcon
            </Link>
            <span className="text-slate-300">/</span>
            <span className="truncate text-sm text-slate-600">WordPress ingest</span>
          </div>
          <nav className="flex items-center gap-3 text-sm">
            <Link
              href="/clients/therman"
              className="font-medium text-navy-700 hover:text-navy-900"
            >
              Therman dashboard
            </Link>
            <span className="text-xs text-slate-400">secondary</span>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-10">{children}</main>
    </div>
  );
}
