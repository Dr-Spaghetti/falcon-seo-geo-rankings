import Link from "next/link";
import type { LfClient } from "@/lib/lf";
import { resolveBrandLogoUrl } from "@/lib/lf-logo";
import {
  HeroChromePlate,
  MapThumbPlaceholder,
} from "@/components/hub/HubDecor";

/**
 * Shared premium dark branded hub — Nick DJ Law hub SoT is the master template.
 * Photoreal chrome cropped from SoT PNG (not flat SVG gold).
 * Per-firm: crest/logo, name, counts, --brand-* tokens only.
 */
export function ClientHub({ client }: { client: LfClient }) {
  const base = `/clients/${client.slug}`;
  const logoUrl = resolveBrandLogoUrl(client.slug);
  const countsLine = `${client.location_count} locations | ${client.scan_count.toLocaleString()} Total scans`;
  // Long firm names (e.g. Therman) — keep clear of seal; prefer natural wrap
  const isLongName = client.name.length > 34;

  return (
    <div className="relative space-y-5 text-slate-100">
      {/* Framed hero — clean composite chrome; type/crest/logo live in DOM */}
      <section
        className="relative z-[1] overflow-hidden rounded-[16px] shadow-2xl shadow-black/55"
        style={{ backgroundColor: "#141618" }}
        aria-label={`${client.name} client dashboard`}
      >
        <div className="relative w-full" style={{ aspectRatio: "996 / 218" }}>
          {/* CLEAN composite plate: frame/cols/gold-ring + empty field (no baked glyphs) */}
          <HeroChromePlate className="pointer-events-none absolute inset-0 z-[1] h-full w-full object-fill" />


          {/* Crest locked to photoreal seal hole (~84.5% x) */}
          <div
            className="pointer-events-none absolute z-[4] flex items-center justify-center overflow-hidden rounded-full"
            style={{
              left: "84.5%",
              top: "51.5%",
              transform: "translate(-50%, -50%)",
              width: "11.2%",
              height: "51%",
              backgroundColor: "color-mix(in srgb, var(--brand) 82%, #050805)",
              boxShadow: "inset 0 0 10px rgba(0,0,0,0.5)",
            }}
          >
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoUrl}
                alt={`${client.name} logo`}
                width={150}
                height={150}
                className="pointer-events-auto h-[88%] w-[88%] object-contain"
              />
            ) : (
              <span className="px-1 text-center text-[8px] font-medium uppercase tracking-wider text-white/50">
                Crest unavailable
              </span>
            )}
          </div>

          <div className="relative z-[3] flex h-full items-center gap-3 px-[4%] py-[3%]">
            {/* Left: justify local mark */}
            <div className="flex w-[14%] shrink-0 justify-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brands/_justify/logo.png"
                alt="justify local"
                width={150}
                height={66}
                className="h-auto w-full max-w-[9.5rem] object-contain"
              />
            </div>

            {/* Center stack — live firm typography (wraps; clears seal) */}
            <div className="min-w-0 flex-1 space-y-0.5 px-1 pr-[24%] text-center sm:pr-[26%]">
              <h1
                className={
                  isLongName
                    ? "mx-auto max-w-[36ch] font-serif text-[clamp(0.7rem,1.55vw,1.45rem)] font-semibold leading-[1.15] tracking-tight break-words"
                    : "font-serif text-[clamp(0.9rem,2.2vw,2.1rem)] font-semibold leading-[1.12] tracking-tight break-words"
                }
                style={{ color: "var(--brand-accent)" }}
              >
                {client.name}
              </h1>
              <p
                className="text-[clamp(9px,1.1vw,12px)] font-semibold uppercase tracking-[0.22em]"
                style={{ color: "var(--brand-accent)" }}
              >
                CLIENT DASHBOARD
              </p>
              <p
                className="text-[clamp(0.85rem,1.5vw,1.15rem)] font-medium tabular-nums"
                style={{ color: "var(--brand-accent)" }}
              >
                {countsLine}
              </p>
              <p
                className="mx-auto max-w-xl text-[clamp(0.7rem,1.1vw,0.875rem)] italic leading-snug"
                style={{
                  color:
                    "color-mix(in srgb, var(--brand-accent) 55%, #ffffff)",
                }}
              >
                Select a location to review rankings, filters, and scan reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations — simplified density (Nick punch: too busy for older clients) */}
      <section aria-label="Office Locations" className="relative z-[1] space-y-3">
        <h2
          className="font-serif text-base font-semibold tracking-tight sm:text-lg"
          style={{ color: "var(--brand-accent)" }}
        >
          Office Locations
        </h2>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {client.locations.map((loc) => (
            <article
              key={loc.place_id}
              className="flex flex-col rounded-lg bg-[#1a1c22]/90 p-4"
              style={{
                boxShadow:
                  "0 0 0 1px color-mix(in srgb, var(--brand-accent) 35%, transparent)",
              }}
            >
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-serif text-lg font-bold text-white">
                  {loc.city || loc.name}
                </h3>
                <span className="shrink-0 text-xs tabular-nums text-white/45">
                  {loc.scan_count.toLocaleString()} scans
                </span>
              </div>

              <div className="mt-2 flex items-start gap-3">
                <p className="min-w-0 flex-1 text-sm leading-snug text-white/75">
                  {loc.address || "Address unavailable"}
                </p>
                <MapThumbPlaceholder
                  className="h-10 w-11 shrink-0 rounded object-cover opacity-90"
                  label={loc.city || loc.name}
                />
              </div>

              <div className="mt-4 flex justify-end">
                <Link
                  href={`${base}/locations/${loc.place_id}`}
                  className="text-sm font-medium text-white/90 underline-offset-2 transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-accent)]"
                  style={{ color: "var(--brand-accent)" }}
                >
                  Open dashboard →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {client.locations.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/20 bg-white/5 px-6 py-16 text-center">
            <p className="text-sm font-medium text-white/90">
              No locations in this firm hub
            </p>
            <p className="mt-1 text-sm text-white/55">
              Rebuild client data from the Local Falcon census archive.
            </p>
          </div>
        ) : null}
      </section>
    </div>
  );
}
