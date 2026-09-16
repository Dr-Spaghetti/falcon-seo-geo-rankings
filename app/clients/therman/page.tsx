import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ClientHub } from "@/components/ClientHub";
import { getClient } from "@/lib/lf";

export const metadata = {
  title: "Therman · Local Falcon · Falcon",
  description:
    "Charlie Therman Injury & Accident Lawyers — Local Falcon location picker",
};

export default function ThermanClientPage() {
  const client = getClient("therman");
  if (!client) notFound();

  return (
    <AppShell wide>
      <ClientHub client={client} />
    </AppShell>
  );
}
