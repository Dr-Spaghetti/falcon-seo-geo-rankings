import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ClientHub } from "@/components/ClientHub";
import { getClient } from "@/lib/lf";

export const metadata = {
  title: "Shammas Law · Local Falcon · Falcon",
  description:
    "Shammas Law — local search rankings for every office location",
};

export default function ShammasLawClientPage() {
  const client = getClient("shammas-law");
  if (!client) notFound();

  return (
    <AppShell wide>
      <ClientHub client={client} />
    </AppShell>
  );
}
