import Link from "next/link";
import type { LfClient } from "@/lib/lf";
import { formatMetric } from "@/components/Metric";

export function ClientHub({
  client,
  badge,
}: {
  client: LfClient;
  /** Optional chip under the hero (e.g. "Pilot template" / "Firm hub") */
  badge?: string;
}) {
  const base = `/clients/${client.slug}`;

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-2xl border border-navy-200/60 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 px-6 py-7 text-white shadow-lg shadow-navy-900/20 sm:px-8 sm:py-9">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/5 blur-2xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-navy-500/30 blur-3xl"
          aria-hidden
        />
        <div className="relative space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-100/80">
            Client dashboard
          </p>
          <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            {client.name}
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-navy-100/90 sm:text-base">
            {client.group} · {client.location_count} locations ·{" "}
            {client.scan_count.toLocaleString()} Local Falcon scans. Select a
            location to review rankings, filters, and scan reports.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/20 backdrop-blur-sm">
              {client.location_count} locations
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium tabular-nums text-white ring-1 ring-white/20 backdrop-blur-sm">
              {client.scan_count.toLocaleString()} scans
            </span>
            {badge ? (
              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-100 ring-1 ring-emerald-300/30">
                {badge}
              </span>
            ) : null}
          </div>
        </div>
      </section>

      <section aria-label="Locations">
        <div className="mb-3 flex items-end justify-between gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Locations
          </h2>
          <p className="text-xs tabular-nums text-slate-400">
            {client.locations.length} nested under firm
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {client.locations.map((loc) => (
            <Link
              key={loc.place_id}
              href={`${base}/locations/${loc.place_id}`}
              className="group flex flex-col rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm shadow-slate-900/[0.03] transition duration-150 hover:-translate-y-0.5 hover:border-navy-200 hover:shadow-md hover:shadow-navy-900/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate text-lg font-semibold text-slate-900 group-hover:text-navy-800">
                    {loc.city || loc.name}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-slate-500">
                    {loc.address}
                  </p>
                </div>
                <span
                  className="shrink-0 rounded-full bg-navy-50 px-2.5 py-1 text-xs font-semibold tabular-nums text-navy-800 ring-1 ring-navy-100"
                  title="Scan count"
                >
                  {loc.scan_count.toLocaleString()} scans
                </span>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {loc.rating != null && loc.rating > 0 ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-900 ring-1 ring-amber-100">
                    ★ {formatMetric(loc.rating, 1)}
                    {loc.reviews != null ? (
                      <span className="font-normal text-amber-700/80">
                        · {loc.reviews}
                      </span>
                    ) : null}
                  </span>
                ) : (
                  <span className="inline-flex rounded-full bg-slate-50 px-2 py-0.5 text-xs text-slate-400 ring-1 ring-slate-100">
                    No rating yet
                  </span>
                )}
                {loc.latest_iso || loc.latest_date ? (
                  <span className="inline-flex rounded-full bg-slate-50 px-2 py-0.5 text-xs tabular-nums text-slate-500 ring-1 ring-slate-100">
                    Latest {loc.latest_iso || loc.latest_date}
                  </span>
                ) : null}
              </div>
              <p className="mt-5 flex items-center gap-1 text-sm font-medium text-navy-700">
                Open dashboard
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </p>
            </Link>
          ))}
        </div>
        {client.locations.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
            <p className="text-sm font-medium text-slate-700">
              No locations in this firm hub
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Rebuild client data from the Local Falcon census archive.
            </p>
          </div>
        ) : null}
      </section>
    </div>
  );
}
