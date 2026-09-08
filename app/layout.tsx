import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JustifyCode — WordPress Content Ingest",
  description:
    "Crawl a WordPress site and export page content as CSV, JSON, or Markdown for SEO audits.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
              <a href="/wordpress" className="font-semibold tracking-tight text-brand-700">
                JustifyCode <span className="text-slate-400 font-normal">/</span> WordPress
              </a>
              <span className="text-xs text-slate-500">SEO content ingest</span>
            </div>
          </header>
          <main className="mx-auto max-w-4xl px-4 py-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
