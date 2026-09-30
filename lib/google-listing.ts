/**
 * Location "listing" links for the location dashboard.
 * A Google place ID (ChIJ…) links to the real Google Maps business listing
 * (official Maps URLs API: /maps/search/?api=1&query=…&query_place_id=…).
 * The `url` field is the firm WEBSITE: never label it as the Google listing.
 */
const PLACE_ID_RE = /^(ChIJ|GhIJ|Ei)[A-Za-z0-9_-]{10,}$/;

export function isGooglePlaceId(id: string | null | undefined): id is string {
  return typeof id === "string" && PLACE_ID_RE.test(id);
}

export function googleListingUrl(
  placeId: string | null | undefined,
  name?: string | null,
): string | null {
  if (!isGooglePlaceId(placeId)) return null;
  const q = encodeURIComponent((name && name.trim()) || "business");
  return `https://www.google.com/maps/search/?api=1&query=${q}&query_place_id=${placeId}`;
}

export type ListingLink = { href: string; label: "Open Google listing" | "Open website"; kind: "google" | "website" };

/** Primary + optional secondary link for a location: Google listing first, website second. */
export function locationLinks(loc: {
  place_id?: string | null;
  name?: string | null;
  url?: string | null;
}): ListingLink[] {
  const out: ListingLink[] = [];
  const g = googleListingUrl(loc.place_id, loc.name);
  if (g) out.push({ href: g, label: "Open Google listing", kind: "google" });
  if (loc.url && /^https?:\/\//i.test(loc.url)) out.push({ href: loc.url, label: "Open website", kind: "website" });
  return out;
}
