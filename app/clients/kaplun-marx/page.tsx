import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ClientHub } from "@/components/ClientHub";
import { getClient } from "@/lib/lf";

export const metadata = {
  title: "KaplunMarx · Local Falcon · Falcon",
  description:
    "KaplunMarx — firm-level Local Falcon dashboard with nested PA/NJ locations",
};

export default function KaplunMarxClientPage() {
  const client = getClient("kaplun-marx");
  if (!client) notFound();

  return (
    <AppShell wide>
      <ClientHub client={client} badge="Firm hub" />
    </AppShell>
  );
}
