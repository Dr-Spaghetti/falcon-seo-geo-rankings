import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ClientHub } from "@/components/ClientHub";
import { getClient } from "@/lib/lf";

export const metadata = {
  title: "Kunka Law · Local Falcon · Falcon",
  description:
    "Kunka Law — local search rankings for every office location",
};

export default function KunkaClientPage() {
  const client = getClient("kunka");
  if (!client) notFound();

  return (
    <AppShell wide>
      <ClientHub client={client} />
    </AppShell>
  );
}
