import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { formatMetric } from "@/components/Metric";
import { getPilotClient } from "@/lib/lf";

export const metadata = {
  title: "Therman · Local Falcon · Falcon",
  description:
    "Charlie Therman Injury & Accident Lawyers — Local Falcon location picker",
};

export default function ThermanClientPage() {
  const pilot = getPilotClient();
  if (!pilot) notFound();

  return (
    <AppShell wide>
      <div className="space-y-8">
        <section className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-wider text-navy-600">
            Client dashboard
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {pilot.name}
          </h1>
          <p className="max-w-2xl text-slate-600">
            {pilot.group} · {pilot.location_count} locations ·{" "}
            {pilot.scan_count.toLocaleString()} Local Falcon scans. Select a
            location to review rankings, filters, and scan reports.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
              {pilot.location_count} locations
            </span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium tabular-nums text-slate-600 ring-1 ring-slate-200">
              {pilot.scan_count.toLocaleString()} scans
            </span>
            <span className="rounded-full bg-navy-50 px-3 py-1 text-xs font-medium text-navy-800 ring-1 ring-navy-100">
              Pilot template
            </span>
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pilot.locations.map((loc) => (
            <Link
              key={loc.place_id}
              href={"/clients/therman/locations/" + loc.place_id}
              className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-navy-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="truncate text-lg font-semibold text-slate-900 group-hover:text-navy-800">
                    {loc.city || loc.name}
                  </h2>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                    {loc.address}
                  </p>
                </div>
                <span className="shrink-0 rounded-md bg-slate-50 px-2 py-1 text-xs font-medium tabular-nums text-slate-600 ring-1 ring-slate-200">
                  {loc.scan_count.toLocaleString()}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                {loc.rating != null ? (
                  <span>
                    ★ {formatMetric(loc.rating, 1)}
                    {loc.reviews != null ? " · " + loc.reviews : ""}
                  </span>
                ) : null}
                {loc.latest_date ? (
                  <span className="tabular-nums">Latest {loc.latest_date}</span>
                ) : null}
              </div>
              <p className="mt-4 text-sm font-medium text-navy-700 opacity-0 transition group-hover:opacity-100">
                Open dashboard →
              </p>
            </Link>
          ))}
        </section>

        {null}
      </div>
    </AppShell>
  );
}

