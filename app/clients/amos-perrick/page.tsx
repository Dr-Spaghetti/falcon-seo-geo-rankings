import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ClientHub } from "@/components/ClientHub";
import { getClient } from "@/lib/lf";

export const metadata = {
  title: "Amos Perrick · Local Falcon · Falcon",
  description:
    "Amos Perrick — firm-level Local Falcon dashboard with nested GA locations",
};

export default function AmosPerrickClientPage() {
  const client = getClient("amos-perrick");
  if (!client) notFound();

  return (
    <AppShell wide>
      <ClientHub client={client} badge="Firm hub" />
    </AppShell>
  );
}
