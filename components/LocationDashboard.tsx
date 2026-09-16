"use client";

import { useMemo, useState } from "react";
import type { LfLocationDetail, LfScan } from "@/lib/lf";
import { KpiCard, formatMetric } from "@/components/Metric";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function avg(scans: LfScan[], key: "arp" | "atrp" | "solv") {
  const vals = scans
    .map((s) => s[key])
    .filter((v): v is number => typeof v === "number" && Number.isFinite(v));
  if (!vals.length) return null;
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}

function LinkPill({
  href,
  label,
  disabled,
}: {
  href: string | null;
  label: string;
  disabled?: boolean;
}) {
  if (!href || disabled) {
    return (
      <span className="inline-flex cursor-not-allowed rounded-md px-1.5 py-0.5 text-[11px] text-navy-300">
        {label}
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex rounded-md bg-navy-100 px-1.5 py-0.5 text-[11px] font-medium text-navy-800 hover:bg-navy-200/80 hover:text-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-1"
    >
      {label}
    </a>
  );
}

function solvClass(solv: number | null) {
  if (solv == null || !Number.isFinite(solv)) return "text-navy-800";
  if (solv >= 30) return "font-semibold text-emerald-700";
  if (solv >= 20) return "font-medium text-emerald-600";
  if (solv >= 10) return "text-navy-800";
  return "text-navy-500";
}

const selectClass =
  "rounded-lg border border-navy-200/80 bg-navy-50/90 px-2.5 py-1.5 text-sm font-normal normal-case text-navy-900 tabular-nums shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-1";

export function LocationDashboard({ data }: { data: LfLocationDetail }) {
  const years = useMemo(() => {
    const ys = new Set<number>();
    for (const s of data.scans) if (s.year) ys.add(s.year);
    return Array.from(ys).sort((a, b) => b - a);
  }, [data.scans]);

  const [year, setYear] = useState<number | "all">(years[0] ?? "all");
  const [month, setMonth] = useState<number | "all">("all");
  const [day, setDay] = useState<number | "all">("all");
  const [q, setQ] = useState("");

  const monthsAvailable = useMemo(() => {
    const ms = new Set<number>();
    for (const s of data.scans) {
      if (year !== "all" && s.year !== year) continue;
      if (s.month) ms.add(s.month);
    }
    return Array.from(ms).sort((a, b) => a - b);
  }, [data.scans, year]);

  const daysAvailable = useMemo(() => {
    const ds = new Set<number>();
    for (const s of data.scans) {
      if (year !== "all" && s.year !== year) continue;
      if (month !== "all" && s.month !== month) continue;
      if (s.day) ds.add(s.day);
    }
    return Array.from(ds).sort((a, b) => a - b);
  }, [data.scans, year, month]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return data.scans.filter((s) => {
      if (year !== "all" && s.year !== year) return false;
      if (month !== "all" && s.month !== month) return false;
      if (day !== "all" && s.day !== day) return false;
      if (needle) {
        const blob = `${s.keyword || ""} ${s.campaign_name || ""} ${s.type || ""}`.toLowerCase();
        if (!blob.includes(needle)) return false;
      }
      return true;
    });
  }, [data.scans, year, month, day, q]);

  const meanArp = avg(filtered, "arp");
  const meanAtrp = avg(filtered, "atrp");
  const meanSolv = avg(filtered, "solv");

  function onYearChange(v: string) {
    setYear(v === "all" ? "all" : Number(v));
    setMonth("all");
    setDay("all");
  }
  function onMonthChange(v: string) {
    setMonth(v === "all" ? "all" : Number(v));
    setDay("all");
  }

  const loc = data.location;

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-navy-700/40 bg-hero-navy px-5 py-6 text-white shadow-lg shadow-navy-900/15 sm:px-7 sm:py-7">
        <div
          className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/5 blur-2xl"
          aria-hidden
        />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-navy-100/80">
              Location dashboard
            </p>
            <h1 className="mt-1 truncate text-2xl font-semibold tracking-tight sm:text-3xl">
              {loc.city || loc.name}
            </h1>
            <p className="mt-1.5 text-sm text-navy-100/85">{loc.address}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              {loc.rating != null && loc.rating > 0 ? (
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-medium text-white ring-1 ring-white/20">
                  ★ {formatMetric(loc.rating, 1)} · {loc.reviews ?? 0} reviews
                </span>
              ) : null}
              {loc.primary_category ? (
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-navy-50 ring-1 ring-white/15">
                  {loc.primary_category}
                </span>
              ) : null}
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-[11px] text-navy-100/80 ring-1 ring-white/15">
                {loc.place_id}
              </span>
            </div>
          </div>
          {loc.url ? (
            <a
              href={loc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy-800"
            >
              Open GBP site ↗
            </a>
          ) : null}
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiCard
          label="Scans shown"
          value={filtered.length.toLocaleString()}
          hint={`of ${data.scan_count.toLocaleString()} total`}
        />
        <KpiCard
          label="Avg ARP"
          value={formatMetric(meanArp)}
          hint="Average rank position"
        />
        <KpiCard
          label="Avg ATRP"
          value={formatMetric(meanAtrp)}
          hint="Avg true rank position"
          tone="accent"
        />
        <KpiCard
          label="Avg SOLV"
          value={meanSolv == null ? "—" : `${formatMetric(meanSolv)}%`}
          hint="Share of local voice"
          tone={meanSolv != null && meanSolv >= 20 ? "good" : "default"}
        />
      </div>

      <div className="sticky top-[3.25rem] z-30 rounded-xl border border-navy-200/80 bg-navy-100/85 p-4 shadow-sm shadow-navy-900/[0.05] backdrop-blur-md">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-navy-900">Date filters</p>
            <p className="text-xs text-navy-600/80">
              From census{" "}
              <code className="rounded bg-navy-200/60 px-1 text-[11px] text-navy-800">
                date
              </code>{" "}
              field (US M/D/YYYY)
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <label className="flex flex-col gap-1 text-[11px] font-semibold uppercase tracking-wide text-navy-600">
              Year
              <select
                className={selectClass}
                value={year === "all" ? "all" : String(year)}
                onChange={(e) => onYearChange(e.target.value)}
              >
                <option value="all">All years</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-[11px] font-semibold uppercase tracking-wide text-navy-600">
              Month
              <select
                className={selectClass}
                value={month === "all" ? "all" : String(month)}
                onChange={(e) => onMonthChange(e.target.value)}
              >
                <option value="all">All months</option>
                {monthsAvailable.map((m) => (
                  <option key={m} value={m}>
                    {MONTHS[m - 1]}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-[11px] font-semibold uppercase tracking-wide text-navy-600">
              Day
              <select
                className={selectClass}
                value={day === "all" ? "all" : String(day)}
                onChange={(e) =>
                  setDay(e.target.value === "all" ? "all" : Number(e.target.value))
                }
              >
                <option value="all">All days</option>
                {daysAvailable.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex min-w-[12rem] flex-1 flex-col gap-1 text-[11px] font-semibold uppercase tracking-wide text-navy-600">
              Keyword
              <input
                type="search"
                placeholder="Filter keywords…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="rounded-lg border border-navy-200/80 bg-navy-50/90 px-2.5 py-1.5 text-sm font-normal normal-case text-navy-900 shadow-sm placeholder:text-navy-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-1"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-navy-200/80 bg-navy-50/80 shadow-sm shadow-navy-900/[0.04]">
        <div className="flex items-center justify-between border-b border-navy-200/70 bg-navy-100/60 px-4 py-3">
          <h2 className="text-sm font-semibold text-navy-900">Scan table</h2>
          <p className="text-xs tabular-nums text-navy-600">
            {filtered.length.toLocaleString()} row
            {filtered.length === 1 ? "" : "s"}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="mx-4 my-6 rounded-xl border border-dashed border-navy-300/70 bg-navy-100/50 px-4 py-14 text-center">
            <p className="text-sm font-semibold text-navy-800">No scans match</p>
            <p className="mt-1 text-sm text-navy-600/80">
              Try clearing month/day or the keyword filter.
            </p>
          </div>
        ) : (
          <div className="max-h-[70vh] overflow-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="sticky top-0 z-10 bg-navy-100/95 text-[11px] uppercase tracking-wider text-navy-600 backdrop-blur-sm">
                <tr className="border-b border-navy-200/80">
                  <th className="whitespace-nowrap px-3 py-2 font-semibold sm:px-4">
                    Date
                  </th>
                  <th className="px-3 py-2 font-semibold sm:px-4">Keyword</th>
                  <th className="whitespace-nowrap px-3 py-2 text-right font-semibold sm:px-4">
                    ARP
                  </th>
                  <th className="whitespace-nowrap px-3 py-2 text-right font-semibold sm:px-4">
                    ATRP
                  </th>
                  <th className="whitespace-nowrap px-3 py-2 text-right font-semibold sm:px-4">
                    SOLV
                  </th>
                  <th className="whitespace-nowrap px-3 py-2 text-right font-semibold sm:px-4">
                    Found
                  </th>
                  <th className="px-3 py-2 font-semibold sm:px-4">Links</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <tr
                    key={s.id}
                    className={`border-b border-navy-100/90 transition-colors hover:bg-navy-100/70 ${
                      i % 2 === 0 ? "bg-navy-50/40" : "bg-navy-100/35"
                    }`}
                  >
                    <td className="whitespace-nowrap px-3 py-2 tabular-nums text-navy-700 sm:px-4">
                      {s.date || "—"}
                    </td>
                    <td className="max-w-[18rem] px-3 py-2 sm:px-4">
                      <p className="truncate font-medium text-navy-900">
                        {s.keyword || "—"}
                      </p>
                      {s.campaign_name ? (
                        <p className="truncate text-xs text-navy-500/80">
                          {s.campaign_name}
                        </p>
                      ) : null}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 text-right tabular-nums text-navy-800 sm:px-4">
                      {formatMetric(s.arp)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 text-right tabular-nums text-accent-700 sm:px-4">
                      {formatMetric(s.atrp)}
                    </td>
                    <td
                      className={`whitespace-nowrap px-3 py-2 text-right tabular-nums sm:px-4 ${solvClass(s.solv)}`}
                    >
                      {s.solv == null ? "—" : `${formatMetric(s.solv)}%`}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 text-right tabular-nums text-navy-700 sm:px-4">
                      {s.found_in == null ? "—" : s.found_in}
                      {s.data_points != null ? (
                        <span className="text-navy-400">/{s.data_points}</span>
                      ) : null}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 sm:px-4">
                      <div className="flex flex-wrap gap-1">
                        <LinkPill href={s.heatmap} label="Heatmap" />
                        <LinkPill href={s.image} label="Image" />
                        <LinkPill href={s.pdf} label="PDF" />
                        <LinkPill href={s.public_url} label="Report" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
