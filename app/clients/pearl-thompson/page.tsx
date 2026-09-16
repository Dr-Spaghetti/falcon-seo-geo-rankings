import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ClientHub } from "@/components/ClientHub";
import { getClient } from "@/lib/lf";

export const metadata = {
  title: "Pearl & Thompson · Local Falcon · Falcon",
  description:
    "Pearl & Thompson — firm-level Local Falcon dashboard with nested GA locations",
};

export default function PearlThompsonClientPage() {
  const client = getClient("pearl-thompson");
  if (!client) notFound();

  return (
    <AppShell wide>
      <ClientHub client={client} badge="Firm hub" />
    </AppShell>
  );
}
