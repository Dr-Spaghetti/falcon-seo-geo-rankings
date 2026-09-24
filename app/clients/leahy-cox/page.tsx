import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ClientHub } from "@/components/ClientHub";
import { getClient } from "@/lib/lf";

export const metadata = {
  title: "Leahy Cox · Local Falcon · Falcon",
  description:
    "Leahy Cox — firm-level Local Falcon dashboard with nested GA locations",
};

export default function LeahyCoxClientPage() {
  const client = getClient("leahy-cox");
  if (!client) notFound();

  return (
    <AppShell wide>
      <ClientHub client={client} />
    </AppShell>
  );
}
