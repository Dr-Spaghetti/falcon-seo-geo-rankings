import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ClientHub } from "@/components/ClientHub";
import { getClient } from "@/lib/lf";

export const metadata = {
  title: "Shammas Law · Local Falcon · Falcon",
  description:
    "Shammas Law — firm-level Local Falcon dashboard with nested GA locations",
};

export default function ShammasLawClientPage() {
  const client = getClient("shammas-law");
  if (!client) notFound();

  return (
    <AppShell wide>
      <ClientHub client={client} badge="Firm hub" />
    </AppShell>
  );
}
