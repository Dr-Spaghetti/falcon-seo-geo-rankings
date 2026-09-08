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
      <span className="inline-flex cursor-not-allowed rounded-md px-1.5 py-0.5 text-[11px] text-slate-300">
        {label}
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex rounded-md bg-slate-100 px-1.5 py-0.5 text-[11px] font-medium text-navy-800 hover:bg-navy-50 hover:text-navy-900"
    >
      {label}
    </a>
  );
}

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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-navy-600">
            Location dashboard
          </p>
          <h1 className="mt-1 truncate text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {loc.city || loc.name}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{loc.address}</p>
          <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
            {loc.rating != null ? (
              <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">
                ★ {formatMetric(loc.rating, 1)} · {loc.reviews ?? 0} reviews
              </span>
            ) : null}
            {loc.primary_category ? (
              <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-slate-200">
                {loc.primary_category}
              </span>
            ) : null}
            <span className="rounded-full bg-white px-2 py-0.5 font-mono text-[11px] ring-1 ring-slate-200">
              {loc.place_id}
            </span>
          </div>
        </div>
        {loc.url ? (
          <a
            href={loc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-navy-800 shadow-sm hover:bg-slate-50"
          >
            Open GBP site ↗
          </a>
        ) : null}
      </div>

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
        />
        <KpiCard
          label="Avg SOLV"
          value={meanSolv == null ? "—" : `${formatMetric(meanSolv)}%`}
          hint="Share of local voice"
          tone={meanSolv != null && meanSolv >= 20 ? "good" : "default"}
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-800">Date filters</p>
            <p className="text-xs text-slate-500">
              From census <code className="text-[11px]">date</code> field (US M/D/YYYY)
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <label className="flex flex-col gap-1 text-[11px] font-medium uppercase tracking-wide text-slate-500">
              Year
              <select
                className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-sm font-normal normal-case text-slate-800 tabular-nums"
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
            <label className="flex flex-col gap-1 text-[11px] font-medium uppercase tracking-wide text-slate-500">
              Month
              <select
                className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-sm font-normal normal-case text-slate-800"
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
            <label className="flex flex-col gap-1 text-[11px] font-medium uppercase tracking-wide text-slate-500">
              Day
              <select
                className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-sm font-normal normal-case text-slate-800 tabular-nums"
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
            <label className="flex min-w-[12rem] flex-1 flex-col gap-1 text-[11px] font-medium uppercase tracking-wide text-slate-500">
              Keyword
              <input
                type="search"
                placeholder="Filter keywords…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-sm font-normal normal-case text-slate-800 placeholder:text-slate-400"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-slate-800">Scan table</h2>
          <p className="text-xs tabular-nums text-slate-500">
            {filtered.length.toLocaleString()} row
            {filtered.length === 1 ? "" : "s"}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="px-4 py-16 text-center">
            <p className="text-sm font-medium text-slate-700">No scans match</p>
            <p className="mt-1 text-sm text-slate-500">
              Try clearing month/day or the keyword filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2.5 font-medium">Date</th>
                  <th className="px-4 py-2.5 font-medium">Keyword</th>
                  <th className="whitespace-nowrap px-4 py-2.5 font-medium text-right">
                    ARP
                  </th>
                  <th className="whitespace-nowrap px-4 py-2.5 font-medium text-right">
                    ATRP
                  </th>
                  <th className="whitespace-nowrap px-4 py-2.5 font-medium text-right">
                    SOLV
                  </th>
                  <th className="whitespace-nowrap px-4 py-2.5 font-medium text-right">
                    Found
                  </th>
                  <th className="px-4 py-2.5 font-medium">Links</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/80">
                    <td className="whitespace-nowrap px-4 py-2.5 tabular-nums text-slate-600">
                      {s.date || "—"}
                    </td>
                    <td className="max-w-[18rem] px-4 py-2.5">
                      <p className="truncate font-medium text-slate-800">
                        {s.keyword || "—"}
                      </p>
                      {s.campaign_name ? (
                        <p className="truncate text-xs text-slate-400">
                          {s.campaign_name}
                        </p>
                      ) : null}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-right tabular-nums text-slate-800">
                      {formatMetric(s.arp)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-right tabular-nums text-slate-800">
                      {formatMetric(s.atrp)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-right tabular-nums text-slate-800">
                      {s.solv == null ? "—" : `${formatMetric(s.solv)}%`}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-right tabular-nums text-slate-600">
                      {s.found_in == null ? "—" : s.found_in}
                      {s.data_points != null ? (
                        <span className="text-slate-400">/{s.data_points}</span>
                      ) : null}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2.5">
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
