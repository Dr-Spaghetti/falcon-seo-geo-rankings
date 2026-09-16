import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { LocationDashboard } from "@/components/LocationDashboard";
import { getClient, getLocationDetail, listClientPlaceIds } from "@/lib/lf";

export function generateStaticParams() {
  return listClientPlaceIds("facchetti").map((placeId) => ({ placeId }));
}

export function generateMetadata({
  params,
}: {
  params: { placeId: string };
}) {
  const detail = getLocationDetail(params.placeId);
  const city = detail?.location.city || detail?.location.name || params.placeId;
  return {
    title: city + " · Adrianos Facchetti · Falcon",
    description: "Local Falcon scans for " + city + " (Adrianos Facchetti)",
  };
}

export default function FacchettiLocationPage({
  params,
}: {
  params: { placeId: string };
}) {
  const client = getClient("facchetti");
  const detail = getLocationDetail(params.placeId);
  if (!client || !detail) notFound();

  const known = client.locations.some((l) => l.place_id === params.placeId);
  if (!known) notFound();

  return (
    <AppShell wide>
      <div className="mb-6">
        <Link
          href="/clients/facchetti"
          className="inline-flex items-center gap-1 rounded-md text-sm font-medium text-navy-700 hover:text-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
        >
          ← All Adrianos Facchetti locations
        </Link>
      </div>
      <LocationDashboard data={detail} />
    </AppShell>
  );
}
