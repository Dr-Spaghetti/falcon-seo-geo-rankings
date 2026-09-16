# STATUS_V1 — Falcon Local Falcon dashboard ASAP

| Field | Value |
|-------|--------|
| **goal_id** | falcon-dashboard-asap / premier-p0 + UI polish + **inline heatmaps** |
| **state** | done |
| **evidence_uri** | https://github.com/Dr-Spaghetti/falcon-seo-geo-rankings/pull/1 |
| **blocker** | none (Band D: PR unmerged by design — no master merge / no prod promote) |
| **branch** | `feat/falcon-ui-premier-2026-09-16` @ `0a40649` (feature `6a984aa`) |
| **updated_at** | 2026-09-16 11:17 AM ET |

## Evidence links

| Kind | Link / note |
|------|-------------|
| PR | https://github.com/Dr-Spaghetti/falcon-seo-geo-rankings/pull/1 |
| Vercel project | justifycode-wordpress-dashboard → Dr-Spaghetti/falcon-seo-geo-rankings |
| Live prod (unchanged; Band D) | https://justifycode-wordpress-dashboard.vercel.app/clients/therman |
| Vercel preview (Ready) | https://justifycode-wordpress-dashbo-git-84b3e6-nicks-projects-2d0579a1.vercel.app |
| Local verify | `npm test` 12/12 pass; `npx tsc --noEmit` clean; `npm run build` 18 routes |

## Requirement correction (Nick + CoS + Projects Manager) — inline heatmaps

**Must:** Heatmaps render **inline** in the shared LocationDashboard when selected — not a bare browser image/tab as the primary action.

**Implemented (shared Therman + Premier clone template):**

- Primary **Heatmap** control is a semantic **button** (navy high-contrast) that opens an on-demand **modal dialog** (`HeatmapViewer`) inside the tool.
- Viewer shows **keyword**, **scan date**, **campaign**, and **location** context in a navy header matching the dashboard hero style.
- **Close** controls: ×, footer Close, backdrop click, **Escape**; focus returns to the Heatmap button; focus-visible rings; `role="dialog"` / `aria-modal`.
- Responsive max dimensions (`max-h` / `max-w-5xl`); **loading skeleton**; **image error/fallback** with secondary open link.
- **Only the selected** heatmap `<img>` loads — no upfront prefetch of all heatmaps.
- Secondary **Open original ↗** kept inside the viewer; **Image / PDF / Report** remain external link pills.
- Heatmap URLs verified from census data (`lf-static-v2.localfalcon.com/heatmap-img/…`, `image/png`); helpers in `lib/heatmap.ts` + `__tests__/heatmap.test.ts`.

## Therman UI notes

Shared polish (benefits Therman + Premier):

- **AppShell**: multi-client nav (Therman + Premier + WordPress); active state from pathname; focus rings; solid navy high-contrast header.
- **ClientHub**: navy gradient hero panel; location cards with rating chips, scan-count badges, hover elevation.
- **LocationDashboard**: navy hero; sticky filters; scan table; **inline HeatmapViewer** (this pass).
- Therman routes: `/clients/therman`, `/clients/therman/locations/[placeId]`.

## Premier route

- **Firm hub**: `/clients/premier` — nested locations only.
- **Location**: `/clients/premier/locations/[placeId]` — same shared LocationDashboard + inline heatmaps.
- **Scan counts (census-verified)**: Bellevue 386 + Renton 385 + Federal Way 355 + Seattle 310 = **1,436**.

## Known bugs / follow-ups

1. Preview deployment protection may block agent content checks (403); human should spot-check preview after login.
2. `build:lf-pilot` still clears **all** files under `data/lf/locations/` before rewrite — re-running Therman builder without Premier rebuild would drop Premier location JSON.
3. Legacy `data/lf/pilot-client.json` retained; keep in sync if regenerating.
4. WordPress layout has its own chrome (not AppShell).
5. No merge to master / no prod promote (Band D) — waiting on Nick.
6. No React component test runner (node:test only) — UI behavior covered by helpers + manual/preview; build/tsc required.

## Verify commands run

```text
npm test          → 12 pass (url + heatmap helpers + census URL check)
npx tsc --noEmit  → exit 0
npm run build     → success; Therman + Premier location SSG paths
```
