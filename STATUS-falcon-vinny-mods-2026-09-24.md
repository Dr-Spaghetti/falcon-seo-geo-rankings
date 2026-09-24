# STATUS_V1 — Falcon Local Falcon dashboards (Nick DJ hub SoT exact)

| Field | Value |
|-------|--------|
| **goal_id** | falcon-dj-hub-sot-exact / Band D feat PR #1 |
| **state** | ready_for_design (Eng retip after HARD FAIL 49120da — awaiting Design re-PASS) |
| **evidence_uri** | https://github.com/Dr-Spaghetti/falcon-seo-geo-rankings/pull/1 |
| **blocker** | Design HARD re-PASS pending on DJ hub vs SoT; Band D HOLD (NO merge / NO prod) |
| **branch** | `feat/falcon-ui-premier-2026-09-16` @ `6df9087` |
| **tip_sha** | `6df90871cc6eea9a59376df96405fc07128eb168` |
| **updated_at** | 2026-09-24 1:55 PM ET |

## Evidence links

| Kind | Link / note |
|------|-------------|
| PR #1 | https://github.com/Dr-Spaghetti/falcon-seo-geo-rankings/pull/1 |
| Tip SHA | `6df90871cc6eea9a59376df96405fc07128eb168` |
| Preview (Band C gitless) | https://justifycode-wordpress-dashboard-4jqi3frur.vercel.app |
| Preview `/clients/dj-law` | https://justifycode-wordpress-dashboard-4jqi3frur.vercel.app/clients/dj-law |
| Preview `/clients/therman` | https://justifycode-wordpress-dashboard-4jqi3frur.vercel.app/clients/therman |
| Inspect | https://vercel.com/nicks-projects-2d0579a1/justifycode-wordpress-dashboard/GhWpWoV2jY2jWRqenxDZ2UyKwkh7 |
| Prod alias (UNTOUCHED) | https://justifycode-wordpress-dashboard.vercel.app |
| Vercel project | justifycode-wordpress-dashboard |

## SoT lock

| Kind | Path / note |
|------|-------------|
| **Canonical SoT** | `_shots/sot-2026-09-24/dj-law-hub-sot.png` (Nick attach) |
| Therman | Template clone of DJ SoT — crest = `public/brands/therman/logo.webp` |
| Design HARD FAIL 49120da | `_shots/verify-2026-09-24/qa-49120da/VERDICT.txt` |

## Eng retip vs HARD FAIL 49120da (hero dark plate + ghost type)

| # | Punch | Eng action | Status |
|---|-------|------------|--------|
| 1 | KILL hero opaque dark fill plate + ghosted title / “Select a location…” | Regenerated `hero-chrome-plate.png`: inpainted SoT firm type + baked logo out of center/left; **no flat slate card** (old center std=0 → textured field std≈11); seal hole transparent; toned title `textShadow` (removed dark 10px halo) | CLOSED (Eng) — Design re-PASS pending |
| 2 | Soft seal/crest nudge | Crest `top` 52%→51.5%, size 9.8/45→10.2/47 | CLOSED (Eng soft) |
| 3 | Soft denser watermark | Opacity 0.32→0.42; stacking `-z-10`→`z-0` (was painted under AppShell bg) | CLOSED (Eng soft) |
| 4 | Re-tip Band C | Eng settle shots v4 + gitless preview — NOT claiming Design DONE | CLOSED (Eng) |

## CLOSED (do not regress)

| # | Item | Status |
|---|------|--------|
| Prior | Flat-SVG gold killer | CLOSED |
| N1 | Two green arrows justify mark | PASS |
| N2 | Photoreal gold direction | PASS |
| N3 | OL simplify for older clients | PASS |

## Verify

| # | Check | Result | Evidence |
|---|-------|--------|----------|
| 1 | `npm test` + `tsc --noEmit` + `npm run build` | **GREEN** | 24/24; tsc 0; build 101 routes |
| 2 | DJ / Therman settle shots | **ENG SETTLE v4** (Design re-PASS pending) | `_shots/verify-2026-09-24/verify-dj-hub-v4.png`, `verify-therman-hub-v4.png`, `sot-vs-dj-v4-top.png` |
| 3 | Quant plate gate | **0** ultra-flat (std&lt;0.5) dark windows in hero interior | vs FAIL tip flat center std=0 |

## Band D HOLD

- **NO** merge to `master`
- **NO** promote to prod alias `justifycode-wordpress-dashboard.vercel.app`
- **NOT** claiming Design DONE — Eng settle only; Design HARD re-PASS required
