import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { LocationDashboard } from "@/components/LocationDashboard";
import { getClient, getLocationDetail, listClientPlaceIds } from "@/lib/lf";

export function generateStaticParams() {
  return listClientPlaceIds("michael-marr").map((placeId) => ({ placeId }));
}

export function generateMetadata({
  params,
}: {
  params: { placeId: string };
}) {
  const detail = getLocationDetail(params.placeId);
  const city = detail?.location.city || detail?.location.name || params.placeId;
  return {
    title: city + " · Michael Marr · Falcon",
    description:
      "Local Falcon scans for " + city + " (Michael Marr / Injury Attorneys)",
  };
}

export default function MichaelMarrLocationPage({
  params,
}: {
  params: { placeId: string };
}) {
  const client = getClient("michael-marr");
  const detail = getLocationDetail(params.placeId);
  if (!client || !detail) notFound();

  const known = client.locations.some((l) => l.place_id === params.placeId);
  if (!known) notFound();

  return (
    <AppShell wide>
      <div className="mb-6">
        <Link
          href="/clients/michael-marr"
          className="inline-flex items-center gap-1 rounded-md text-sm font-medium text-hub-text hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        >
          ← All Michael Marr locations
        </Link>
      </div>
      <LocationDashboard data={detail} />
    </AppShell>
  );
}
