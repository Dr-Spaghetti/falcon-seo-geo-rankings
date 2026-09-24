# STATUS_V1 — Falcon Local Falcon dashboards (Nick HTML SoT)

| Field | Value |
|-------|--------|
| **goal_id** | falcon-dj-hub-html-sot / Band D feat PR #1 |
| **state** | ready_for_design (Eng HTML SoT port — awaiting Design re-PASS) |
| **evidence_uri** | https://github.com/Dr-Spaghetti/falcon-seo-geo-rankings/pull/1 |
| **blocker** | Design HARD re-PASS pending; Band D HOLD |
| **branch** | `feat/falcon-ui-premier-2026-09-16` @ `a78d39e` |
| **tip_sha** | `a78d39e51ee1639fc08269729bb7fd5b24c12598` |
| **updated_at** | 2026-09-24 2:20 PM ET |

## Evidence links

| Kind | Link / note |
|------|-------------|
| PR #1 | https://github.com/Dr-Spaghetti/falcon-seo-geo-rankings/pull/1 |
| Tip SHA | `a78d39e51ee1639fc08269729bb7fd5b24c12598` |
| Preview (Band C gitless) | https://justifycode-wordpress-dashboard-86kibv19t.vercel.app |
| Preview `/clients/dj-law` | https://justifycode-wordpress-dashboard-86kibv19t.vercel.app/clients/dj-law |
| Preview `/clients/therman` | https://justifycode-wordpress-dashboard-86kibv19t.vercel.app/clients/therman |
| Inspect | https://vercel.com/nicks-projects-2d0579a1/justifycode-wordpress-dashboard/2NUwQYwRnrsNND9PyWbQMANftpaR |
| Prod alias (UNTOUCHED) | https://justifycode-wordpress-dashboard.vercel.app |

## Eng HTML SoT port (supersedes PNG/photoreal plate)

| # | Punch | Eng action | Status |
|---|-------|------------|--------|
| 1 | STOP PNG plate; adopt HTML SoT | CSS `.gold-frame` + dashed inset-2, `.circuit-bg`, Cinzel/Inter via next/font, no CDN | CLOSED (Eng) |
| 2 | Official crest in ring | `public/brands/dj-law/logo.png` / Therman `logo.webp` unmodified; sha256 match | CLOSED (Eng) |
| 3 | HARD REJECTS | No Operational & Synced; no fake account/settings/bell+5; live ET clock; footer platform line only | CLOSED (Eng) |
| 4 | Shared template | Per-firm tokens via `lib/lf-brand.ts`; Therman own accent; Mod 2 + N1 kept | CLOSED (Eng) |
| 5 | Band C gitless | vercel build + deploy --prebuilt (preview) | CLOSED (Eng) |

## Verify

| # | Check | Result |
|---|-------|--------|
| 1 | npm test / tsc / build | GREEN |
| 2 | Logo sha256 before=after | `b037e334…e619` (DJ) / `9152e17c…8e06` (Therman) |
| 3 | v6 shots | `_shots/verify-2026-09-24/html-sot-*`, `*v6*`, `sot-html-vs-dj-v6.png` |

## Band D HOLD
NO merge / NO prod / NO alias. NOT Design DONE.
