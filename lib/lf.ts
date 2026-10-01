import fs from "node:fs";
import path from "node:path";
import { countScanKinds } from "@/lib/lf-scan-kind";

const DATA_DIR = path.join(process.cwd(), "data", "lf");
const CLIENTS_DIR = path.join(DATA_DIR, "clients");

export type LfLocationSummary = {
  place_id: string;
  name: string;
  address: string | null;
  city: string | null;
  rating: number | null;
  reviews: number | null;
  phone: string | null;
  url: string | null;
  primary_category: string | null;
  groups: string[];
  scan_count: number;
  latest_date: string | null;
  latest_iso: string | null;
  /** Google / Maps scans — derived from scan.platform === "google" */
  seo_scan_count?: number;
  /** LLM / geo-grid scans — derived from scan.platform in gaio|gemini|chatgpt|aimode */
  geo_scan_count?: number;
};

export type LfClient = {
  slug: string;
  name: string;
  group: string;
  brand_match: string;
  generated_at: string;
  source_archive: string;
  location_count: number;
  scan_count: number;
  locations: LfLocationSummary[];
};

/** @deprecated Prefer LfClient — alias kept for existing imports */
export type LfPilotClient = LfClient;

export type LfScan = {
  id: string;
  report_key: string | null;
  date: string | null;
  year: number | null;
  month: number | null;
  day: number | null;
  isoDate: string | null;
  type: string | null;
  campaign_name: string | null;
  platform: string | null;
  keyword: string | null;
  grid_size: number | null;
  radius: number | null;
  measurement: string | null;
  data_points: number | null;
  found_in: number | null;
  arp: number | null;
  atrp: number | null;
  solv: number | null;
  image: string | null;
  heatmap: string | null;
  pdf: string | null;
  public_url: string | null;
};

export type LfLocationDetail = {
  place_id: string;
  location: {
    place_id: string;
    name: string;
    address: string | null;
    city: string | null;
    lat: number | null;
    lng: number | null;
    rating: number | null;
    reviews: number | null;
    phone: string | null;
    url: string | null;
    primary_category: string | null;
    groups: string[];
  };
  scan_count: number;
  years: number[];
  scans: LfScan[];
};

function readJson<T>(filePath: string): T | null {
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

function isSafeSlug(slug: string): boolean {
  return Boolean(slug) && /^[a-z0-9-]+$/.test(slug);
}

/** Attach seo_scan_count / geo_scan_count from location detail files (platform field). */
function enrichLocationKindCounts(client: LfClient): LfClient {
  const locations = client.locations.map((loc) => {
    if (typeof loc.seo_scan_count === "number" && typeof loc.geo_scan_count === "number") {
      return loc;
    }
    const detail = getLocationDetail(loc.place_id);
    if (!detail) {
      return { ...loc, seo_scan_count: loc.seo_scan_count ?? 0, geo_scan_count: loc.geo_scan_count ?? 0 };
    }
    const counts = countScanKinds(detail.scans);
    return {
      ...loc,
      seo_scan_count: counts.seo,
      geo_scan_count: counts.geo,
    };
  });
  return { ...client, locations };
}

/**
 * Load a firm-level client by slug.
 * Prefer data/lf/clients/{slug}.json; Therman also falls back to legacy pilot-client.json.
 */
export function getClient(slug: string): LfClient | null {
  if (!isSafeSlug(slug)) return null;
  const fromClients = readJson<LfClient>(path.join(CLIENTS_DIR, `${slug}.json`));
  if (fromClients) return enrichLocationKindCounts(fromClients);
  if (slug === "therman") {
    const legacy = readJson<LfClient>(path.join(DATA_DIR, "pilot-client.json"));
    return legacy ? enrichLocationKindCounts(legacy) : null;
  }
  return null;
}

export function getPilotClient(): LfClient | null {
  return getClient("therman");
}

export function getLocationDetail(placeId: string): LfLocationDetail | null {
  // placeIds are alphanumeric; reject path traversal
  if (!placeId || /[^A-Za-z0-9_-]/.test(placeId)) return null;
  return readJson<LfLocationDetail>(
    path.join(DATA_DIR, "locations", `${placeId}.json`)
  );
}

export function listClientPlaceIds(slug: string): string[] {
  const client = getClient(slug);
  return client?.locations.map((l) => l.place_id) ?? [];
}

export function listPilotPlaceIds(): string[] {
  return listClientPlaceIds("therman");
}

export function avgMetric(
  scans: LfScan[],
  key: "arp" | "atrp" | "solv"
): number | null {
  const vals = scans
    .map((s) => s[key])
    .filter((v): v is number => typeof v === "number" && Number.isFinite(v));
  if (!vals.length) return null;
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}
