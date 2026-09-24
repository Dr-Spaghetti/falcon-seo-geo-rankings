# STATUS_V1 — Falcon Local Falcon dashboards (Nick DJ hub SoT exact)

| Field | Value |
|-------|--------|
| **goal_id** | falcon-dj-hub-sot-exact / Band D feat PR #1 |
| **state** | ready_for_design (DJ Eng settle — awaiting Design HARD PASS) |
| **evidence_uri** | https://github.com/Dr-Spaghetti/falcon-seo-geo-rankings/pull/1 |
| **blocker** | Design HARD PASS pending on DJ hub vs SoT; Band D HOLD (NO merge / NO prod) |
| **branch** | `feat/falcon-ui-premier-2026-09-16` |
| **updated_at** | 2026-09-24 1:09 PM ET |

## SoT lock

| Kind | Path / note |
|------|-------------|
| **Canonical SoT** | `_shots/sot-2026-09-24/dj-law-hub-sot.png` (Nick attach) |
| Also | `_shots/nick-dj-hub-mock.png` (same bytes) |
| Therman | Template clone of DJ SoT — no separate mock; crest = `public/brands/therman/logo.webp` |

## Eng verify (DJ first)

| # | Check | Result | Evidence |
|---|-------|--------|----------|
| 1 | `npm test` + `tsc --noEmit` + `npm run build` | **GREEN** | 24/24 tests; tsc 0; build 101 routes |
| 2 | DJ hub vs SoT — frame / columns / AppShell / OL | **ENG SETTLE** (Design HARD PASS pending) | `_shots/verify-2026-09-24/verify-dj-hub-v2.png` + `sot-vs-dj-v2-top.png` |
| 3 | DOM: DJ DLC crest `<img`; no Firm hub chip | **PASS** | `/brands/dj-law/logo.png`; Firm hub=0 |
| 4 | Therman template clone + logo.webp (no placeholder) | **PASS** (clone; not claiming Design DONE) | `_shots/verify-2026-09-24/verify-therman-hub-v2.png` |
| 5 | Preview URL + tip SHA | *filled after push/deploy* | see Evidence links below |

## Mock gaps closed (vs prior FAIL `verify-dj-hub.png`)

- [x] AppShell: search + “Keyword Scans/Reports” · center justify mark · live NY clock · profile/gear/bell(+5)
- [x] Subtle firm switcher (does not dominate mock chrome); WordPress under gear menu
- [x] Dark legal ground + scales/columns/circuit watermark
- [x] Thick ornate gold Greek-meander frame (SVG overlay) — not thin 3px border
- [x] Ionic columns flanking ornate seal + firm crest `object-contain` as-is
- [x] justify local left; firm name gold serif; CLIENT DASHBOARD; counts; italic instruction
- [x] Removed `badge="Firm hub"` from all hub pages
- [x] Office Locations: gold tab + black serif underline (SoT), not prior wrong treatment alone
- [x] Location cards: city serif, grey scan pill, address, map thumb+pin, gold-border Open dashboard; no ★ ratings
- [x] Therman accent `#C5A059` on Choose Charlie navy (not DJ forest stamped)

## Residual diffs vs photoreal SoT (honest)

- Frame/columns are SVG metallic gradients — not the SoT’s photoreal 3D gold render
- Map thumb is styled dark SVG (no Mapbox key) — not real satellite imagery
- Header circuit texture is SVG line art, lighter than SoT emboss
- Firm `<select>` is an accessibility/usability addition under the left label (not in mock)

## Band D HOLD

- **NO** merge to `master`
- **NO** promote to prod alias `justifycode-wordpress-dashboard.vercel.app`
