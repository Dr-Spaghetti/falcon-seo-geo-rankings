# STATUS_V1 — Falcon Local Falcon dashboards (Nick HTML SoT v7)

| Field | Value |
|-------|--------|
| **goal_id** | falcon-dj-hub-html-sot / Band D feat PR #1 |
| **state** | ready_for_design (Eng v7 retip — awaiting Design re-PASS) |
| **evidence_uri** | https://github.com/Dr-Spaghetti/falcon-seo-geo-rankings/pull/1 |
| **blocker** | Design HARD re-PASS pending; Band D HOLD |
| **branch** | `feat/falcon-ui-premier-2026-09-16` @ `69ae63a` |
| **tip_sha** | `69ae63aca4926d0a21666412f9b43b048f94cdef` |
| **updated_at** | 2026-09-24 2:25 PM ET |

## Evidence links

| Kind | Link / note |
|------|-------------|
| PR #1 | https://github.com/Dr-Spaghetti/falcon-seo-geo-rankings/pull/1 |
| Tip SHA | `69ae63aca4926d0a21666412f9b43b048f94cdef` |
| Preview (Band C gitless) | https://justifycode-wordpress-dashboard-hrk1w3ouu.vercel.app |
| Preview `/clients/dj-law` | https://justifycode-wordpress-dashboard-hrk1w3ouu.vercel.app/clients/dj-law |
| Preview `/clients/therman` | https://justifycode-wordpress-dashboard-hrk1w3ouu.vercel.app/clients/therman |
| Inspect | https://vercel.com/nicks-projects-2d0579a1/justifycode-wordpress-dashboard/Ex4TvugyrDpseFCbunj4VocFkxGz |
| Prod alias (UNTOUCHED) | https://justifycode-wordpress-dashboard.vercel.app |

## Eng v7 vs Nick HTML SoT review

| # | Punch | Eng action | Status |
|---|-------|------------|--------|
| 1 | Hero N1 arrows | Cropped two green diagonal arrows from justify-mark.png at ~cap height | CLOSED (Eng) |
| 2 | Page width | LF `max-w-7xl` + `px-6`; hero gold x=104..1335 matches SoT | CLOSED (Eng) |
| 3 | Header clock | Inter `font-sans` sentence case; live ET | CLOSED (Eng) |
| 4 | Therman | metalLight/Dark gold badges; sealBg navy; name `line-clamp-2` | CLOSED (Eng) |

## Verify

| # | Check | Result |
|---|-------|--------|
| 1 | npm test / tsc / build | GREEN |
| 2 | Logo sha256 before=after | MATCH (DJ + Therman) |
| 3 | v7 shots | `sot-html-vs-dj-v7.png`, `crop-*-v7-*`, `verify-*-hub-v7-*` |

## Band D HOLD
NO merge / NO prod / NO alias. NOT Design DONE.
