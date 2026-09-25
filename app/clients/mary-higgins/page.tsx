import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ClientHub } from "@/components/ClientHub";
import { getClient } from "@/lib/lf";

export const metadata = {
  title: "Mary Higgins · Local Falcon · Falcon",
  description:
    "Mary Higgins — local search rankings for every office location",
};

export default function MaryHigginsClientPage() {
  const client = getClient("mary-higgins");
  if (!client) notFound();

  return (
    <AppShell wide>
      <ClientHub client={client} />
    </AppShell>
  );
}
