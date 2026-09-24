import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ClientHub } from "@/components/ClientHub";
import { getClient } from "@/lib/lf";

export const metadata = {
  title: "Norden Leacox · Local Falcon · Falcon",
  description:
    "Norden Leacox — firm-level Local Falcon dashboard with nested GA locations",
};

export default function NordenLeacoxClientPage() {
  const client = getClient("norden-leacox");
  if (!client) notFound();

  return (
    <AppShell wide>
      <ClientHub client={client} />
    </AppShell>
  );
}
