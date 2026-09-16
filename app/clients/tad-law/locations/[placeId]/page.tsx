import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { LocationDashboard } from "@/components/LocationDashboard";
import { getClient, getLocationDetail, listClientPlaceIds } from "@/lib/lf";

export function generateStaticParams() {
  return listClientPlaceIds("tad-law").map((placeId) => ({ placeId }));
}

export function generateMetadata({
  params,
}: {
  params: { placeId: string };
}) {
  const detail = getLocationDetail(params.placeId);
  const city = detail?.location.city || detail?.location.name || params.placeId;
  return {
    title: city + " · Tad Law · Falcon",
    description:
      "Local Falcon scans for " + city + " (Tad Law)",
  };
}

export default function TadLawLocationPage({
  params,
}: {
  params: { placeId: string };
}) {
  const client = getClient("tad-law");
  const detail = getLocationDetail(params.placeId);
  if (!client || !detail) notFound();

  const known = client.locations.some((l) => l.place_id === params.placeId);
  if (!known) notFound();

  return (
    <AppShell wide>
      <div className="mb-6">
        <Link
          href="/clients/tad-law"
          className="inline-flex items-center gap-1 rounded-md text-sm font-medium text-navy-700 hover:text-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
        >
          ← All Tad Law locations
        </Link>
      </div>
      <LocationDashboard data={detail} />
    </AppShell>
  );
}
