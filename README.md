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

### Build LF data

```bash
# Therman (writes data/lf/pilot-client.json + locations; also mirrored at clients/therman.json)
LF_ARCHIVE=/workspace/falcon-lf-archive npm run build:lf-pilot

# Premier (writes data/lf/clients/premier.json + Premier location JSON only)
LF_ARCHIVE=/workspace/falcon-lf-archive npm run build:lf-premier
```

### Dev

```bash
npm install
npm run build
npm run dev
```

Open `/clients/therman` or `/clients/premier`.

## WordPress ingest secondary

UI at `/wordpress`; jobs in `data/jobs`; ingest API under `/api/ingest`.
