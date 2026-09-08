import { redirect } from "next/navigation";

/** Root lands on the Therman pilot client dashboard. */
export default function Home() {
  redirect("/clients/therman");
}
