import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ClientHub } from "@/components/ClientHub";
import { getClient } from "@/lib/lf";

export const metadata = {
  title: "Direct Legal Funding · Local Falcon · Falcon",
  description:
    "Direct Legal Funding — firm-level Local Falcon dashboard with nested GA locations",
};

export default function DirectLegalFundingClientPage() {
  const client = getClient("direct-legal-funding");
  if (!client) notFound();

  return (
    <AppShell wide>
      <ClientHub client={client} />
    </AppShell>
  );
}
