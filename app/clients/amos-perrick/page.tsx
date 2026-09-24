import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ClientHub } from "@/components/ClientHub";
import { getClient } from "@/lib/lf";

export const metadata = {
  title: "Amos Perrick · Local Falcon · Falcon",
  description:
    "Amos Perrick — local search rankings for every office location",
};

export default function AmosPerrickClientPage() {
  const client = getClient("amos-perrick");
  if (!client) notFound();

  return (
    <AppShell wide>
      <ClientHub client={client} />
    </AppShell>
  );
}
