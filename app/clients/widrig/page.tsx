import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ClientHub } from "@/components/ClientHub";
import { getClient } from "@/lib/lf";

export const metadata = {
  title: "Widrig Law · Local Falcon · Falcon",
  description:
    "Widrig Law — local search rankings for every office location",
};

export default function WidrigClientPage() {
  const client = getClient("widrig");
  if (!client) notFound();

  return (
    <AppShell wide>
      <ClientHub client={client} />
    </AppShell>
  );
}
