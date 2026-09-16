export function formatMetric(value: number | null | undefined, digits = 2) {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return value.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function KpiCard({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "default" | "good" | "warn";
}) {
  const toneClass =
    tone === "good"
      ? "text-emerald-700"
      : tone === "warn"
        ? "text-amber-700"
        : "text-slate-900";
  const borderTone =
    tone === "good"
      ? "border-emerald-200/80 ring-1 ring-emerald-50"
      : tone === "warn"
        ? "border-amber-200/80 ring-1 ring-amber-50"
        : "border-slate-200/90";
  return (
    <div
      className={`rounded-xl border bg-white px-4 py-3.5 shadow-sm shadow-slate-900/[0.03] ${borderTone}`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p
        className={`mt-1.5 text-2xl font-semibold tabular-nums tracking-tight ${toneClass}`}
      >
        {value}
      </p>
      {hint ? (
        <p className="mt-1 text-xs leading-snug text-slate-400">{hint}</p>
      ) : null}
    </div>
  );
}
