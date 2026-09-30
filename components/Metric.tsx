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
  tone?: "default" | "good" | "warn" | "accent";
}) {
  const toneClass =
    tone === "good"
      ? "text-emerald-700"
      : tone === "warn"
        ? "text-amber-700"
        : tone === "accent"
          ? "text-accent-700"
          : "text-navy-900";
  const borderTone =
    tone === "good"
      ? "border-emerald-200/90 bg-emerald-50 ring-1 ring-emerald-100/80"
      : tone === "warn"
        ? "border-amber-200/90 bg-amber-50 ring-1 ring-amber-100/80"
        : tone === "accent"
          ? "border-accent-200/80 bg-accent-50 ring-1 ring-accent-100/70"
          : "border-navy-200/70 bg-navy-50 ring-1 ring-navy-100/60";
  return (
    <div
      className={`rounded-xl border px-4 py-3.5 shadow-sm shadow-navy-900/[0.04] ${borderTone}`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-wider text-navy-700">
        {label}
      </p>
      <p
        className={`mt-1.5 text-2xl font-semibold tabular-nums tracking-tight ${toneClass}`}
      >
        {value}
      </p>
      {hint ? (
        <p className="mt-1 text-xs leading-snug text-navy-700">{hint}</p>
      ) : null}
    </div>
  );
}
