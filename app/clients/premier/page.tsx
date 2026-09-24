import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ClientHub } from "@/components/ClientHub";
import { getClient } from "@/lib/lf";

export const metadata = {
  title: "Premier Law Group · Local Falcon · Falcon",
  description:
    "Premier Law Group — firm-level Local Falcon dashboard with nested WA locations",
};

export default function PremierClientPage() {
  const client = getClient("premier");
  if (!client) notFound();

  return (
    <AppShell wide>
      <ClientHub client={client} />
    </AppShell>
  );
}
