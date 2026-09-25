import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ClientHub } from "@/components/ClientHub";
import { getClient } from "@/lib/lf";

export const metadata = {
  title: "Milano Legal Group · Local Falcon · Falcon",
  description:
    "Milano Legal Group — local search rankings for every office location",
};

export default function MilanoClientPage() {
  const client = getClient("milano");
  if (!client) notFound();

  return (
    <AppShell wide>
      <ClientHub client={client} />
    </AppShell>
  );
}
