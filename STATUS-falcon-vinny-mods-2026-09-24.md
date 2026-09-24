# STATUS_V1 — Falcon Local Falcon dashboards (Nick DJ hub SoT exact)

| Field | Value |
|-------|--------|
| **goal_id** | falcon-dj-hub-sot-exact / Band D feat PR #1 |
| **state** | ready_for_design (Eng retip after HARD FAIL 616687b — awaiting Design re-PASS) |
| **evidence_uri** | https://github.com/Dr-Spaghetti/falcon-seo-geo-rankings/pull/1 |
| **blocker** | Design HARD re-PASS pending on DJ hub vs SoT; Band D HOLD (NO merge / NO prod) |
| **branch** | `feat/falcon-ui-premier-2026-09-16` @ `9491bf0` |
| **tip_sha** | `9491bf0ff9aa5f6f5d636b6ebfec7285834431dc` |
| **updated_at** | 2026-09-24 1:32 PM ET |

## Evidence links

| Kind | Link / note |
|------|-------------|
| PR #1 | https://github.com/Dr-Spaghetti/falcon-seo-geo-rankings/pull/1 |
| Tip SHA | `9491bf0ff9aa5f6f5d636b6ebfec7285834431dc` |
| Preview (Band C gitless) | https://justifycode-wordpress-dashboard-bw6l3s0n8.vercel.app |
| Preview `/clients/dj-law` | https://justifycode-wordpress-dashboard-bw6l3s0n8.vercel.app/clients/dj-law |
| Preview `/clients/therman` | https://justifycode-wordpress-dashboard-bw6l3s0n8.vercel.app/clients/therman |
| Inspect | https://vercel.com/nicks-projects-2d0579a1/justifycode-wordpress-dashboard/zKC6VUvYePiNq1Uit74nhZA48GKt |
| Prod alias (UNTOUCHED) | https://justifycode-wordpress-dashboard.vercel.app |
| Vercel project | justifycode-wordpress-dashboard |

## SoT lock

| Kind | Path / note |
|------|-------------|
| **Canonical SoT** | `_shots/sot-2026-09-24/dj-law-hub-sot.png` (Nick attach) |
| Therman | Template clone of DJ SoT — crest = `public/brands/therman/logo.webp` |
| Nick live punch | `_shots/nick-feedback-2026-09-24/PUNCH.txt` |

## Eng retip vs HARD FAIL 616687b + Nick live punch

| # | Punch | Eng action | Status |
|---|-------|------------|--------|
| 1 | KILL flat SVG frame/columns/seal | Cropped photoreal chrome FROM SoT → `public/brands/_hub/hero-chrome-plate.png` (+ columns, seal-ring, meander-frame) | CLOSED (Eng) |
| 2 | Map thumbs → satellite | `map-sat-thumb.png` cropped from SoT (dark sat + teal pin); quieter OL size | CLOSED (Eng) |
| 3 | Denser watermark | `watermark-ground.png` from SoT ground @ opacity 0.32 | CLOSED (Eng) |
| 4 | AppShell exact / drop firm-select | Visible `<select>` → `sr-only`; search + Keyword Scans/Reports · justify mark · NY clock · profile/gear/bell+5 | CLOSED (Eng) |
| 5 | Re-tip Band C | Eng settle shots v3 — NOT claiming Design DONE | CLOSED (Eng) |
| N1 | TWO GREEN ARROWS (Nick) | `justify-mark.png` cropped from SoT header — people-icon SVG retired | CLOSED (Eng) |
| N2 | Hero gold KEEP direction | Photoreal SoT plate kept | CLOSED (Eng) |
| N3 | OL lower half too busy | Simplified: plain gold heading, lighter cards, text scan count, link CTA, quieter sat thumbs | CLOSED (Eng) |

## Verify

| # | Check | Result | Evidence |
|---|-------|--------|----------|
| 1 | `npm test` + `tsc --noEmit` + `npm run build` | **GREEN** | 24/24; tsc 0; build 101 routes |
| 2 | DJ / Therman settle shots | **ENG SETTLE** (Design re-PASS pending) | `_shots/verify-2026-09-24/verify-dj-hub-v3.png`, `verify-therman-hub-v3.png`, `sot-vs-dj-v3-top.png` |

## How assets were cropped

From `_shots/sot-2026-09-24/dj-law-hub-sot.png` via PIL:
- `hero-chrome-plate.png` — hero band crop; content well cleared for dynamic type; right Ionic columns + seal ring kept; seal center transparent for firm crest
- `column-left.png` / `column-right.png` — Ionic column crops
- `seal-ring.png` — ornate gold ring, center punched transparent
- `meander-frame.png` — frame-only transparent interior
- `map-sat-thumb.png` — Burbank card satellite thumb + teal pin
- `watermark-ground.png` — ground band (scales/columns/circuit), card region patched
- `justify-mark.png` — header-center white wordmark + two green arrows

## Band D HOLD

- **NO** merge to `master`
- **NO** promote to prod alias `justifycode-wordpress-dashboard.vercel.app`
- **NOT** claiming Design DONE — Eng settle only; Design HARD re-PASS required
