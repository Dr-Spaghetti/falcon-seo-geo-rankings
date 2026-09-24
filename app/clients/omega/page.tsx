import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ClientHub } from "@/components/ClientHub";
import { getClient } from "@/lib/lf";

export const metadata = {
  title: "Omega Law Group · Local Falcon · Falcon",
  description:
    "Omega Law Group — firm-level Local Falcon dashboard with nested GA locations",
};

export default function OmegaClientPage() {
  const client = getClient("omega");
  if (!client) notFound();

  return (
    <AppShell wide>
      <ClientHub client={client} />
    </AppShell>
  );
}
