import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ClientHub } from "@/components/ClientHub";
import { getClient } from "@/lib/lf";

export const metadata = {
  title: "Michael Marr · Local Falcon · Falcon",
  description:
    "Michael Marr / Injury Attorneys — firm-level Local Falcon dashboard with nested locations",
};

export default function MichaelMarrClientPage() {
  const client = getClient("michael-marr");
  if (!client) notFound();

  return (
    <AppShell wide>
      <ClientHub client={client} badge="Firm hub" />
    </AppShell>
  );
}
