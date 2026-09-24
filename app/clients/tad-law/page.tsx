import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ClientHub } from "@/components/ClientHub";
import { getClient } from "@/lib/lf";

export const metadata = {
  title: "Tad Law · Local Falcon · Falcon",
  description:
    "Tad Law — firm-level Local Falcon dashboard with nested GA locations",
};

export default function TadLawClientPage() {
  const client = getClient("tad-law");
  if (!client) notFound();

  return (
    <AppShell wide>
      <ClientHub client={client} />
    </AppShell>
  );
}
