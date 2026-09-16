import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ClientHub } from "@/components/ClientHub";
import { getClient } from "@/lib/lf";

export const metadata = {
  title: "Farias Firm · Local Falcon · Falcon",
  description:
    "Farias Firm — firm-level Local Falcon dashboard with nested GA locations",
};

export default function FariasFirmClientPage() {
  const client = getClient("farias-firm");
  if (!client) notFound();

  return (
    <AppShell wide>
      <ClientHub client={client} badge="Firm hub" />
    </AppShell>
  );
}
