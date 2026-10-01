import { redirect } from "next/navigation";

/** Root lands on the client directory hub. */
export default function Home() {
  redirect("/clients");
}
