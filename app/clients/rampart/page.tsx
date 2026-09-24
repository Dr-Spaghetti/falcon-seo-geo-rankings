import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ClientHub } from "@/components/ClientHub";
import { getClient } from "@/lib/lf";

export const metadata = {
  title: "Rampart Injury Lawyers · Local Falcon · Falcon",
  description:
    "Rampart Injury Lawyers — firm-level Local Falcon dashboard with nested GA locations",
};

export default function RampartClientPage() {
  const client = getClient("rampart");
  if (!client) notFound();

  return (
    <AppShell wide>
      <ClientHub client={client} />
    </AppShell>
  );
}
