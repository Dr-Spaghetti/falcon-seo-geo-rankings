import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ClientHub } from "@/components/ClientHub";
import { getClient } from "@/lib/lf";

export const metadata = {
  title: "Adrianos Facchetti · Local Falcon · Falcon",
  description:
    "Adrianos Facchetti — local search rankings for every office location",
};

export default function FacchettiClientPage() {
  const client = getClient("facchetti");
  if (!client) notFound();

  return (
    <AppShell wide>
      <ClientHub client={client} />
    </AppShell>
  );
}
