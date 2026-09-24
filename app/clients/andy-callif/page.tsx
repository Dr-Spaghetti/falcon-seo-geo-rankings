import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ClientHub } from "@/components/ClientHub";
import { getClient } from "@/lib/lf";

export const metadata = {
  title: "Andy Callif Bail Bonds · Local Falcon · Falcon",
  description:
    "Andy Callif Bail Bonds — firm-level Local Falcon dashboard with nested GA locations",
};

export default function AndyCallifClientPage() {
  const client = getClient("andy-callif");
  if (!client) notFound();

  return (
    <AppShell wide>
      <ClientHub client={client} />
    </AppShell>
  );
}
