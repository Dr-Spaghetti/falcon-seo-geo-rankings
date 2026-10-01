import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { OfficialLogo } from "@/components/hub/OfficialLogo";
import { getFirmLogo } from "@/lib/brand-logos";
import { LF_CLIENT_NAV } from "@/lib/lf-nav";

export const metadata = {
  title: "Clients · Falcon",
  description:
    "Justify Local client directory — open any firm hub for locations and geo-grid rankings.",
};

export default function ClientsDirectoryPage() {
  return (
    <AppShell wide>
      <div className="relative flex flex-col gap-6 text-slate-100">
        <section
          className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-[color-mix(in_srgb,var(--hub-card)_92%,#000)] p-6 shadow-xl"
          aria-label="Client directory"
        >
          <div className="relative z-10 flex flex-col gap-2">
            <h1 className="font-serif text-2xl font-bold uppercase tracking-widest text-[#f0d481] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] md:text-3xl">
              Clients
            </h1>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-hub-text">
              Client Directory
            </p>
            <p className="max-w-2xl text-sm text-hub-text">
              Select a firm to open its hub — locations, keyword scans, and
              geo-grid rank intelligence.
            </p>
          </div>
        </section>

        <section aria-label="Firm list">
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {LF_CLIENT_NAV.map((client) => {
              const logo = getFirmLogo(client.slug);
              return (
                <li key={client.slug}>
                  <Link
                    href={client.href}
                    className="group flex h-full min-h-[5.5rem] items-center gap-4 rounded-xl border border-slate-700/50 bg-[color-mix(in_srgb,var(--hub-card)_88%,#000)] px-4 py-3 shadow-md transition-colors hover:border-emerald-500/40 hover:bg-[color-mix(in_srgb,var(--hub-card)_75%,#000)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70"
                  >
                    <div className="flex h-14 w-[7.5rem] shrink-0 items-center justify-center">
                      {logo ? (
                        <OfficialLogo
                          logo={logo}
                          slot={`dir-${client.slug}`}
                          className="h-auto max-h-12 w-auto max-w-[7.5rem]"
                          style={{
                            width: `min(7.5rem, calc(3rem * ${logo.width} / ${logo.height}))`,
                            maxHeight: "3rem",
                          }}
                        />
                      ) : (
                        <span className="px-1 text-center text-[10px] font-semibold uppercase tracking-wider text-hub-text">
                          {client.label}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-slate-100 group-hover:text-white">
                        {client.label}
                      </span>
                      <span className="mt-0.5 block truncate text-[11px] text-hub-text">
                        Open hub
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </AppShell>
  );
}
