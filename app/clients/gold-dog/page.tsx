import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ClientHub } from "@/components/ClientHub";
import { getClient } from "@/lib/lf";

export const metadata = {
  title: "Gold Dog Injury Law · Local Falcon · Falcon",
  description:
    "Gold Dog Injury Law — local search rankings for every office location",
};

export default function GoldDogClientPage() {
  const client = getClient("gold-dog");
  if (!client) notFound();

  return (
    <AppShell wide>
      <ClientHub client={client} />
    </AppShell>
  );
}
