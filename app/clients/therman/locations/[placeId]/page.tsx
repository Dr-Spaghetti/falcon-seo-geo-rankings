import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { LocationDashboard } from "@/components/LocationDashboard";
import { getLocationDetail, getPilotClient, listPilotPlaceIds } from "@/lib/lf";

export function generateStaticParams() {
  return listPilotPlaceIds().map((placeId) => ({ placeId }));
}

export function generateMetadata({
  params,
}: {
  params: { placeId: string };
}) {
  const detail = getLocationDetail(params.placeId);
  const city = detail?.location.city || detail?.location.name || params.placeId;
  return {
    title: city + " · Therman · Falcon",
    description: "Local Falcon scans for " + city,
  };
}

export default function LocationPage({
  params,
}: {
  params: { placeId: string };
}) {
  const pilot = getPilotClient();
  const detail = getLocationDetail(params.placeId);
  if (!pilot || !detail) notFound();

  const known = pilot.locations.some((l) => l.place_id === params.placeId);
  if (!known) notFound();

  return (
    <AppShell wide>
      <div className="mb-6">
        <Link
          href="/clients/therman"
          className="text-sm font-medium text-navy-700 hover:text-navy-900"
        >
          ← All Therman locations
        </Link>
      </div>
      <LocationDashboard data={detail} />
    </AppShell>
  );
}

