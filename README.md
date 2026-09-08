# JustifyCode WordPress Content Ingest Dashboard

Next.js (App Router) + TypeScript + Tailwind dashboard that crawls a **public** WordPress site and exports CSV / JSON / Markdown for SEO audits.
Job state: JSON files under `data/jobs/`.

> **Not the WP plugin** — stub for future plugin: `GET /api/sites/[siteId]/pages`

## For Ben — mount at justifycode.com/wordpress

- UI route: `/wordpress` (root `/` redirects there)
- Reverse-proxy `justifycode.com/wordpress` plus `/api/ingest*` and `/api/sites*` to this Next app, or merge routes into the main host
- Persist `data/jobs/` across deploys; crawler is in-process (single Node instance)

## Quick start

```bash
cd /workspace/justifycode-wordpress-dashboard
npm install
npm run dev
```

Open http://localhost:3000/wordpress (or the next free port if 3000 is taken).

```bash
npm test
npm run build && npm start
```

## API

- `POST /api/ingest` `{ url, maxPages? }` → 202 + job; starts crawl
- `GET /api/ingest/[jobId]` poll status
- `GET /api/ingest/[jobId]/export?format=csv|json|md`
- `GET /api/sites/[siteId]/pages` stub (501)

Errors: `invalid_url`, `unreachable`, `blocked`, `not_wp`, `duplicate_in_progress`, `not_found`, `not_ready`

## Real vs stubbed

**Real:** URL normalize/validate, WP heuristics, robots.txt, rate limit, max 50 pages, undici+cheerio crawl, job JSON store, poll UI, CSV/JSON/MD exports.
**Stub:** plugin/chatbot `sites/.../pages` API; no auth; JSON files (not SQLite).

## Export fields

URL, canonical, page type, status, title, meta description, H1, headings, main content, word count, internal/external links, images+alt, robots, schema present, dates, crawl date.
