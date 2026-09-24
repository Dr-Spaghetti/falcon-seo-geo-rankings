import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ClientHub } from "@/components/ClientHub";
import { getClient } from "@/lib/lf";

export const metadata = {
  title: "Carlson Hayslett / CMH · Local Falcon · Falcon",
  description:
    "Carlson Hayslett, P.A. — local search rankings for every office location",
};

export default function CmhClientPage() {
  const client = getClient("cmh");
  if (!client) notFound();

  return (
    <AppShell wide>
      <ClientHub client={client} />
    </AppShell>
  );
}
