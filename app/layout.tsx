import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Falcon — SEO & GEO Rankings",
    template: "%s · Falcon",
  },
  description:
    "Local Falcon rankings dashboard and WordPress content ingest for JustifyCode clients.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
