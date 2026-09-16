#!/usr/bin/env node
/**
 * Build Local Falcon firm-level data for Premier Law Group (4 WA locations).
 *
 * Env:
 *   LF_ARCHIVE  — path to archive dir (default /workspace/falcon-lf-archive)
 *
 * Writes:
 *   data/lf/clients/premier.json
 *   data/lf/locations/{placeId}.json  (Premier place IDs only; does not wipe others)
 */
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ARCHIVE = process.env.LF_ARCHIVE || "/workspace/falcon-lf-archive";
const OUT_DIR = path.join(ROOT, "data", "lf");
const CLIENTS_DIR = path.join(OUT_DIR, "clients");
const LOC_DIR = path.join(OUT_DIR, "locations");

const CLIENT_SLUG = "premier";
const CLIENT_NAME = "Premier Law Group";
const CLIENT_GROUP = "Premier Law Group";

/** Firm locations (census place_ids) — nested under firm hub, not top-level clients */
const PLACE_IDS = new Set([
  "ChIJh_RMvzttkFQRdXcAxoifX4Q", // Bellevue
  "ChIJXTyBiIVnkFQRMKImYWD2Avg", // Renton
  "ChIJze5Cu49XkFQRA8EB6HcIvy8", // Federal Way
  "ChIJxw1Dv4VrkFQRa7UR5wKEPsg", // Seattle
]);

/** Parse US `M/D/YYYY h:mm AM/PM` → { year, month, day, isoDate } or null */
export function parseCensusDate(dateStr) {
  if (!dateStr || typeof dateStr !== "string") return null;
  const m = dateStr.trim().match(
    /^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{2})\s*(AM|PM))?$/i
  );
  if (!m) return null;
  const month = Number(m[1]);
  const day = Number(m[2]);
  const year = Number(m[3]);
  if (!year || month < 1 || month > 12 || day < 1 || day > 31) return null;
  const isoDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  return { year, month, day, isoDate };
}

function numOrNull(v) {
  if (v === false || v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function compactScan(row) {
  const parsed = parseCensusDate(row.date);
  return {
    id: row.id || row.report_key,
    report_key: row.report_key || null,
    date: row.date || null,
    year: parsed?.year ?? null,
    month: parsed?.month ?? null,
    day: parsed?.day ?? null,
    isoDate: parsed?.isoDate ?? null,
    type: row.type || null,
    campaign_name: row.campaign_name || null,
    platform: row.platform || null,
    keyword: row.keyword || null,
    grid_size: numOrNull(row.grid_size),
    radius: numOrNull(row.radius),
    measurement: row.measurement || null,
    data_points: numOrNull(row.data_points),
    found_in: numOrNull(row.found_in),
    arp: numOrNull(row.arp),
    atrp: numOrNull(row.atrp),
    solv: numOrNull(row.solv),
    image: row.image || null,
    heatmap: row.heatmap || null,
    pdf: row.pdf || null,
    public_url: row.public_url || null,
  };
}

function readJsonl(filePath, onRow) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      reject(new Error(`Missing archive file: ${filePath}`));
      return;
    }
    const input = fs.createReadStream(filePath, { encoding: "utf8" });
    const rl = readline.createInterface({ input, crlfDelay: Infinity });
    rl.on("line", (line) => {
      const trimmed = line.trim();
      if (!trimmed) return;
      try {
        onRow(JSON.parse(trimmed));
      } catch {
        // skip bad lines
      }
    });
    rl.on("close", resolve);
    rl.on("error", reject);
    input.on("error", reject);
  });
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function cityFromAddress(address) {
  if (!address) return null;
  const parts = String(address).split(",").map((s) => s.trim());
  if (parts.length >= 2) return parts[parts.length - 2] || null;
  return null;
}

function seedFromRow(row, placeId) {
  const groups = Array.isArray(row.groups)
    ? row.groups.map((g) => (typeof g === "string" ? g : g?.name)).filter(Boolean)
    : [];
  let primary = null;
  if (row.categories && typeof row.categories === "object") {
    primary = Object.values(row.categories)[0] || null;
  }
  return {
    place_id: placeId,
    name: row.name || CLIENT_NAME,
    address: row.address || null,
    city: cityFromAddress(row.address),
    lat: row.lat ? Number(row.lat) : null,
    lng: row.lng ? Number(row.lng) : null,
    rating: numOrNull(row.rating),
    reviews: numOrNull(row.reviews),
    phone: row.phone || null,
    url: row.url || null,
    primary_category: primary,
    groups,
    scan_count: 0,
    latest_date: null,
    latest_iso: null,
  };
}

async function main() {
  console.log(`LF archive: ${ARCHIVE}`);
  console.log(`Output:     ${OUT_DIR}`);
  console.log(`Place IDs:  ${[...PLACE_IDS].join(", ")}`);

  const locationsById = new Map();

  await readJsonl(path.join(ARCHIVE, "locations-list.jsonl"), (row) => {
    const placeId = row.place_id || row.id;
    if (!placeId || !PLACE_IDS.has(placeId)) return;
    locationsById.set(placeId, seedFromRow(row, placeId));
  });

  const scansByPlace = new Map();

  await readJsonl(path.join(ARCHIVE, "reports-census.jsonl"), (row) => {
    const placeId = row.place_id || row.location?.place_id;
    if (!placeId || !PLACE_IDS.has(placeId)) return;

    if (!locationsById.has(placeId)) {
      const loc = row.location || {};
      const groups = Array.isArray(loc.group)
        ? loc.group.map((g) => (typeof g === "string" ? g : g?.name)).filter(Boolean)
        : [];
      locationsById.set(placeId, {
        place_id: placeId,
        name: loc.name || CLIENT_NAME,
        address: loc.address || null,
        city: cityFromAddress(loc.address),
        lat: loc.lat ? Number(loc.lat) : null,
        lng: loc.lng ? Number(loc.lng) : null,
        rating: numOrNull(loc.rating),
        reviews: numOrNull(loc.reviews),
        phone: loc.phone || null,
        url: loc.url || null,
        primary_category: loc.primary_category || null,
        groups,
        scan_count: 0,
        latest_date: null,
        latest_iso: null,
      });
    }

    const scan = compactScan(row);
    if (!scansByPlace.has(placeId)) scansByPlace.set(placeId, []);
    scansByPlace.get(placeId).push(scan);
  });

  for (const [placeId, scans] of scansByPlace) {
    scans.sort((a, b) => {
      const ai = a.isoDate || "";
      const bi = b.isoDate || "";
      if (ai !== bi) return bi.localeCompare(ai);
      return String(b.date || "").localeCompare(String(a.date || ""));
    });
    const loc = locationsById.get(placeId);
    if (loc) {
      loc.scan_count = scans.length;
      loc.latest_date = scans[0]?.date || null;
      loc.latest_iso = scans[0]?.isoDate || null;
    }
  }

  // Stable display order: Bellevue, Renton, Federal Way, Seattle
  const order = [...PLACE_IDS];
  const locations = order
    .map((id) => locationsById.get(id))
    .filter(Boolean)
    .filter((l) => (scansByPlace.get(l.place_id) || []).length > 0);

  if (locations.length !== PLACE_IDS.size) {
    const missing = [...PLACE_IDS].filter((id) => !locations.some((l) => l.place_id === id));
    console.warn("WARNING missing locations with scans:", missing);
  }

  ensureDir(CLIENTS_DIR);
  ensureDir(LOC_DIR);

  let totalScans = 0;
  for (const loc of locations) {
    const scans = scansByPlace.get(loc.place_id) || [];
    totalScans += scans.length;
    const years = [...new Set(scans.map((s) => s.year).filter(Boolean))].sort(
      (a, b) => b - a
    );
    const payload = {
      place_id: loc.place_id,
      location: {
        place_id: loc.place_id,
        name: loc.name,
        address: loc.address,
        city: loc.city,
        lat: loc.lat,
        lng: loc.lng,
        rating: loc.rating,
        reviews: loc.reviews,
        phone: loc.phone,
        url: loc.url,
        primary_category: loc.primary_category,
        groups: loc.groups,
      },
      scan_count: scans.length,
      years,
      scans,
    };
    const outPath = path.join(LOC_DIR, `${loc.place_id}.json`);
    fs.writeFileSync(outPath, JSON.stringify(payload));
    console.log(`  wrote locations/${loc.place_id}.json (${scans.length} scans)`);
  }

  const client = {
    slug: CLIENT_SLUG,
    name: CLIENT_NAME,
    group: CLIENT_GROUP,
    brand_match: "premier",
    generated_at: new Date().toISOString(),
    source_archive: ARCHIVE,
    location_count: locations.length,
    scan_count: totalScans,
    locations: locations.map((l) => ({
      place_id: l.place_id,
      name: l.name,
      address: l.address,
      city: l.city,
      rating: l.rating,
      reviews: l.reviews,
      phone: l.phone,
      url: l.url,
      primary_category: l.primary_category,
      groups: l.groups,
      scan_count: l.scan_count,
      latest_date: l.latest_date,
      latest_iso: l.latest_iso,
    })),
  };

  fs.writeFileSync(
    path.join(CLIENTS_DIR, "premier.json"),
    JSON.stringify(client, null, 2)
  );
  console.log(`\nClient: ${client.name}`);
  console.log(`Locations: ${client.location_count}`);
  console.log(`Scans: ${client.scan_count}`);
  console.log(`Wrote data/lf/clients/premier.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
