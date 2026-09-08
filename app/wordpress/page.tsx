import { WordpressIngestClient } from "./IngestClient";

export default function WordpressPage() {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-wide text-brand-600">
          Free SEO audit starter
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Pull your WordPress content into a clean export
        </h1>
        <p className="max-w-2xl text-lg text-slate-600">
          Paste a public WordPress URL. We detect WP signals, crawl up to 50 pages
          (robots.txt respected, rate-limited), then let you download CSV, JSON, or
          Markdown for audits — and later, chatbot grounding.
        </p>
        <ul className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
          <li className="rounded-lg border border-slate-200 bg-white px-3 py-2">
            ✓ Titles, meta, H1s, headings, main copy
          </li>
          <li className="rounded-lg border border-slate-200 bg-white px-3 py-2">
            ✓ Internal/external links + image alts
          </li>
          <li className="rounded-lg border border-slate-200 bg-white px-3 py-2">
            ✓ Robots meta, schema flag, dates
          </li>
          <li className="rounded-lg border border-slate-200 bg-white px-3 py-2">
            ✓ No login bypass — public pages only
          </li>
        </ul>
      </section>

      <WordpressIngestClient />

      <section className="rounded-xl border border-dashed border-slate-300 bg-white/60 p-5 text-sm text-slate-500">
        <p className="font-medium text-slate-700">Coming soon</p>
        <p className="mt-1">
          Plugin sync API and chatbot stubs live at{" "}
          <code className="rounded bg-slate-100 px-1">/api/sites/[siteId]/pages</code>.
          Mount this app at <code className="rounded bg-slate-100 px-1">justifycode.com/wordpress</code>.
        </p>
      </section>
    </div>
  );
}
