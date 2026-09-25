import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ClientHub } from "@/components/ClientHub";
import { getClient } from "@/lib/lf";

export const metadata = {
  title: "Jones & Swanson · Local Falcon · Falcon",
  description:
    "Jones & Swanson — local search rankings for every office location",
};

export default function JonesSwansonClientPage() {
  const client = getClient("jones-swanson");
  if (!client) notFound();

  return (
    <AppShell wide>
      <ClientHub client={client} />
    </AppShell>
  );
}
