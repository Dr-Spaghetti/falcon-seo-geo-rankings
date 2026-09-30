import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ClientHub } from "@/components/ClientHub";
import { getClient } from "@/lib/lf";

export const metadata = {
  title: "DJ Law Corp · Local Falcon · Falcon",
  description:
    "DJ Law Corp — local search rankings for every office location",
};

export default function DjLawClientPage() {
  const client = getClient("dj-law");
  if (!client) notFound();

  return (
    <AppShell wide>
      <ClientHub client={client} />
    </AppShell>
  );
}
