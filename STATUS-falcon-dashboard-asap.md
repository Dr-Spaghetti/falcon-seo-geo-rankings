# STATUS_V1 — Falcon Local Falcon dashboard ASAP

| Field | Value |
|-------|--------|
| **goal_id** | falcon-dashboard-asap / premier-p0 + UI polish |
| **state** | done |
| **evidence_uri** | https://github.com/Dr-Spaghetti/falcon-seo-geo-rankings/pull/1 |
| **blocker** | none (Band D: PR unmerged by design — no master merge / no prod promote) |
| **branch** | `feat/falcon-ui-premier-2026-09-16` @ `ff5865d` |
| **updated_at** | 2026-09-16 10:52 AM ET |

## Evidence links

| Kind | Link / note |
|------|-------------|
| PR | https://github.com/Dr-Spaghetti/falcon-seo-geo-rankings/pull/1 |
| Vercel preview (Ready) | https://justifycode-wordpress-dashbo-git-84b3e6-nicks-projects-2d0579a1.vercel.app |
| Vercel project | justifycode-wordpress-dashboard → Dr-Spaghetti/falcon-seo-geo-rankings |
| Live prod (unchanged; Band D) | https://justifycode-wordpress-dashboard.vercel.app/clients/therman |
| Local verify | `npm test` 7/7 pass; `npx tsc --noEmit` clean; `npm run build` SSG 18 routes incl. Premier ×4 |

Preview note: Vercel bot marked deployment **Ready** (2026-09-16 ~10:50 AM ET). Agent HTTP fetch of preview returned deployment-protection **403**; could not content-verify `/clients/premier` remotely. Local production build did emit Premier hub + 4 location pages.

## Therman UI notes

Shared polish (benefits Therman + Premier):

- **AppShell**: multi-client nav (Therman + Premier + WordPress); active state from pathname (not hardcoded “Pilot · Therman”); focus rings; soft sticky header blur.
- **ClientHub**: navy gradient hero panel; location cards with rating chips, scan-count badges, hover elevation, always-visible “Open dashboard →” affordance; empty state.
- **LocationDashboard**: navy hero; clearer KPI cards; **sticky** filter bar with focus rings; scan table zebra/hover, sticky thead, denser padding; SOLV green tint when ≥20/≥30; clearer empty state.
- **Metric / globals.css**: KPI tone borders; selection color (navy tint); smooth scroll with reduced-motion respect; light theme kept.
- Therman routes still work: `/clients/therman`, `/clients/therman/locations/[placeId]` via `getClient('therman')` + shared `ClientHub`.

## Premier route

- **Firm hub**: `/clients/premier` — nested locations only (not top-level per place_id).
- **Location**: `/clients/premier/locations/[placeId]`
- **Data**: `data/lf/clients/premier.json`; builder `scripts/build-lf-premier.mjs` (census date fields).
- **Scan counts (census-verified)**:

| City | place_id | scans |
|------|----------|------:|
| Bellevue | ChIJh_RMvzttkFQRdXcAxoifX4Q | 386 |
| Renton | ChIJXTyBiIVnkFQRMKImYWD2Avg | 385 |
| Federal Way | ChIJze5Cu49XkFQRA8EB6HcIvy8 | 355 |
| Seattle | ChIJxw1Dv4VrkFQRa7UR5wKEPsg | 310 |
| **Total** | | **1436** |

Heatmaps remain link-only / on-demand later (no new chart libs).

## Known bugs / follow-ups

1. Preview deployment protection blocked agent content checks (403); human should spot-check preview after login.
2. `build:lf-pilot` still clears **all** files under `data/lf/locations/` before rewrite — re-running Therman builder without Premier rebuild would drop Premier location JSON. Prefer `build:lf-premier` after pilot, or generalize builders later.
3. Legacy `data/lf/pilot-client.json` retained; `clients/therman.json` is the preferred mirror — keep in sync if regenerating.
4. WordPress layout has its own chrome (not AppShell); links to Therman + Premier added only.
5. No merge to master / no prod promote (Band D) — waiting on Nick.

## Verify commands run

```text
npm test          → 7 pass
npx tsc --noEmit  → exit 0
npm run build     → success; /clients/premier + 4 location SSG paths
```
