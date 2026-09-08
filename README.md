# Falcon SEO and GEO Rankings

Next.js (App Router) + TypeScript + Tailwind.

## Local Falcon pilot (Therman)

One-client template for Charlie Therman Injury & Accident Lawyers, P.C. (group: Therman Law Group).

- slash redirects to /clients/therman
- /clients/therman location picker
- /clients/therman/locations/PLACE_ID location dashboard
- /wordpress WordPress ingest secondary

### Build pilot data

Set LF_ARCHIVE then run build:lf-pilot script.

Writes data/lf/pilot-client.json and per-place location JSON.
Date filters derive from census date field (US M/D/YYYY), not GCS folders.

### Dev

Run build:lf-pilot, then next build, then next dev.
Open localhost:3000/clients/therman

## WordPress ingest secondary

UI at /wordpress; jobs in data/jobs; ingest API under /api/ingest.

