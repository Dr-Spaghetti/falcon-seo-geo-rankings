# Falcon SEO and GEO Rankings

Next.js (App Router) + TypeScript + Tailwind.

## Local Falcon dashboards

Firm-level hubs with nested location dashboards (not one top-level client per place_id).

| Client | Route | Notes |
|--------|-------|-------|
| Therman | `/clients/therman` | Pilot template (7 IL locations) |
| Premier Law Group | `/clients/premier` | Firm hub (Bellevue, Renton, Federal Way, Seattle) |

- `/` redirects to `/clients/therman`
- `/clients/{slug}/locations/{placeId}` — location dashboard (filters + scan table)
- `/wordpress` — WordPress ingest (secondary)

Date filters derive from census `date` field (US M/D/YYYY), not GCS folders.

### Build LF data (client-scoped — safe)

Builders update **one client at a time**. They overwrite that client's `clients/{slug}.json` and that client's location files only. They do **not** `rm -rf data/lf` or clear the whole `locations/` directory.

```bash
# Preferred: rebuild one client
LF_ARCHIVE=/workspace/falcon-lf-archive npm run build:lf -- --client=therman
LF_ARCHIVE=/workspace/falcon-lf-archive npm run build:lf -- --client=premier

# Aliases (same safe behavior)
LF_ARCHIVE=/workspace/falcon-lf-archive npm run build:lf-pilot
LF_ARCHIVE=/workspace/falcon-lf-archive npm run build:lf-premier

# Optional dry-run (no disk writes)
LF_ARCHIVE=/workspace/falcon-lf-archive npm run build:lf -- --client=therman --dry-run
```

Therman also mirrors to legacy `data/lf/pilot-client.json`.

### Dev

```bash
npm install
npm run build
npm run dev
```

Open `/clients/therman` or `/clients/premier`.

## WordPress ingest secondary

UI at `/wordpress`; jobs in `data/jobs`; ingest API under `/api/ingest`.
