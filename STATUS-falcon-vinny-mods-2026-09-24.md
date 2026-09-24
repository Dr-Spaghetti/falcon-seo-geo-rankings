# STATUS_V1 — Falcon Local Falcon dashboards (Vinny mods)

| Field | Value |
|-------|--------|
| **goal_id** | falcon-vinny-mods / Band D feat PR #1 |
| **state** | done |
| **evidence_uri** | https://github.com/Dr-Spaghetti/falcon-seo-geo-rankings/pull/1 |
| **blocker** | none (Band D HOLD: NO merge to master, NO prod promote) |
| **branch** | `feat/falcon-ui-premier-2026-09-16` @ `1ecda61` |
| **tip_sha** | `1ecda61441347b2b3a202c24316386e2e6a42963` |
| **updated_at** | 2026-09-24 12:55 PM ET |

## Evidence links

| Kind | Link / note |
|------|-------------|
| PR #1 | https://github.com/Dr-Spaghetti/falcon-seo-geo-rankings/pull/1 |
| Commit | `1ecda61` — feat(lf): premium dark ClientHub + remove scan Heatmap/Image pills |
| Vercel project | justifycode-wordpress-dashboard (git-linked) |
| Preview (Ready) | https://justifycode-wordpress-dashboard-g7dbbnc9v.vercel.app |
| Preview git alias | https://justifycode-wordpress-dashbo-git-84b3e6-nicks-projects-2d0579a1.vercel.app |
| Prod alias (UNTOUCHED) | https://justifycode-wordpress-dashboard.vercel.app → still dpl from 2026-09-08 |
| Nick DJ mock SoT | `_shots/nick-dj-hub-mock.png` (on box; used as layout SoT) |

## Mod 2 — Scan table action pills (DONE)

- `LocationDashboard`: removed Heatmap button + HeatmapViewer modal path + Image LinkPill.
- Kept PDF + Report LinkPills only.
- Dead code: deleted `components/HeatmapViewer.tsx`. Kept `lib/heatmap.ts` + `__tests__/heatmap.test.ts` (URL helpers still tested against census data).
- DOM evidence (`_shots/verify-2026-09-24/dom-grep-scan-actions.txt`): action labels = `PDF`, `Report` only; Heatmap=0, Image=0.

## Mod 1 — Shared premium dark branded hub (DONE)

- Shared template in `components/ClientHub.tsx` matching Nick DJ mock:
  - Framed hero (metal `--brand-accent` border)
  - Justify Local mark (`public/brands/_justify/logo.png`)
  - Firm name + CLIENT DASHBOARD + location/scan counts + helper line
  - Firm logo on RIGHT from `public/brands/{slug}/logo.*` as-is (no CSS recolor/filter/tint); missing → placeholder text
  - Dark body + Office Locations cards (city, scan badge, address, Open dashboard)
- Theme tokens via `lib/lf-brand.ts`: added `accent` + `surface`; AppShell dark surface on LF hubs.
- **dj-law**: replaced wrong Bootstrap `#0d6efd` with crest/site tokens — forest green `#1b3e2a` + charcoal hero + metal gold accent `#d0a854`.
- Applied across all ~24 `LF_CLIENT_NAV` hubs (same template, different tokens).

### Logos sourced vs placeholder

| Slug | Logo |
|------|------|
| **dj-law** | **Sourced** — official DLC crest PNG via Google favicon cache of djlawcorp.com (`public/brands/dj-law/logo.png`, sha256 `b037e334…`); firm site SiteGround-captcha blocked direct fetch. Stored unmodified. Provenance in `public/brands/dj-law/SOURCE.txt`. |
| **_justify** | Product mark copied from `/workspace/justifylocal/JustifyLogo.png` (hub chrome, not a firm crest). |
| All other ~23 firms | **Placeholder text** (no official binary under `public/brands/{slug}/`). |

## Verify checklist

| # | Check | Result | Evidence |
|---|-------|--------|----------|
| 1 | `npm test` + `tsc --noEmit` + `npm run build` | **GREEN** | 22/22 tests; tsc exit 0; build 101 routes |
| 2 | dj-law hub dark framed hero + logo as-is + location cards | **PASS** | `_shots/verify-2026-09-24/verify-dj-hub.png` |
| 3 | Non-gold firm uses own accent (andy-callif `#066a94`, not DJ gold) | **PASS** | `_shots/verify-2026-09-24/verify-andy-callif-hub.png` (+ direct-legal `#ea5800` shot) |
| 4 | Scan table: only PDF + Report; no Heatmap/Image | **PASS** | `_shots/verify-2026-09-24/verify-dj-scan-table.png` + DOM grep |
| 5 | Logo binary unchanged / no recolor filter | **PASS** | sha256 match; `filter: none` only; no hue-rotate/brightness |
| 6 | Preview URL + commit SHA | **PASS** | Preview Ready @ g7dbbnc9v; tip `1ecda61` |

## Band D HOLD

- **NO** merge to `master`
- **NO** promote to prod alias `justifycode-wordpress-dashboard.vercel.app`
- Ship is feat-branch / PR #1 preview only

## Notes

- Mock image **was** on box (`_shots/nick-dj-hub-mock.png`) — used as Mod 1 layout SoT.
- Firm crest must remain official DLC mark (not redrawn from mock) — complied.
- Location dashboard interiors still use existing light scan-table chrome (Mod 2 scope = action pills only).
