import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "lf");

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
};

export type LfPilotClient = {
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

export function getPilotClient(): LfPilotClient | null {
  return readJson<LfPilotClient>(path.join(DATA_DIR, "pilot-client.json"));
}

export function getLocationDetail(placeId: string): LfLocationDetail | null {
  // placeIds are alphanumeric; reject path traversal
  if (!placeId || /[^A-Za-z0-9_-]/.test(placeId)) return null;
  return readJson<LfLocationDetail>(
    path.join(DATA_DIR, "locations", `${placeId}.json`)
  );
}

export function listPilotPlaceIds(): string[] {
  const pilot = getPilotClient();
  return pilot?.locations.map((l) => l.place_id) ?? [];
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
