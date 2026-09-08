"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";

type JobSummary = {
  id: string;
  url: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  progress: { crawled: number; queued: number; maxPages: number };
  error?: string;
  errorCode?: string;
  wpSignals?: string[];
  pageCount: number;
};

export function WordpressIngestClient() {
  const [url, setUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [job, setJob] = useState<JobSummary | null>(null);

  const poll = useCallback(async (jobId: string) => {
    const res = await fetch(`/api/ingest/${jobId}`);
    const data = await res.json();
    if (res.ok && data.job) setJob(data.job);
  }, []);

  useEffect(() => {
    if (!job) return;
    if (job.status === "complete" || job.status === "failed") return;
    const t = setInterval(() => {
      void poll(job.id);
    }, 1500);
    return () => clearInterval(t);
  }, [job, poll]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/ingest", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.code === "duplicate_in_progress" && data.jobId) {
          setFormError(data.error || "Crawl already in progress");
          await poll(data.jobId);
        } else {
          setFormError(data.error || "Could not start ingest");
        }
        return;
      }
      setJob(data.job);
    } catch {
      setFormError("Network error — try again");
    } finally {
      setSubmitting(false);
    }
  }

  const ready =
    job && (job.status === "complete" || (job.status === "failed" && job.pageCount > 0));
  const pct = job
    ? Math.min(
        100,
        Math.round((job.progress.crawled / Math.max(job.progress.maxPages, 1)) * 100)
      )
    : 0;

  return (
    <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">WordPress site URL</span>
          <input
            type="url"
            required
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 shadow-sm outline-none ring-brand-500 focus:ring-2"
          />
        </label>
        {formError && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{formError}</p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
        >
          {submitting ? "Starting…" : "Start crawl"}
        </button>
      </form>

      {job && (
        <div className="space-y-4 border-t border-slate-100 pt-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm font-medium text-slate-800">Job {job.id.slice(0, 8)}…</p>
              <p className="text-xs text-slate-500">{job.url}</p>
            </div>
            <StatusBadge status={job.status} />
          </div>

          <div>
            <div className="mb-1 flex justify-between text-xs text-slate-500">
              <span>
                {job.progress.crawled} / {job.progress.maxPages} pages
                {job.progress.queued > 0 ? ` · ${job.progress.queued} queued` : ""}
              </span>
              <span>{pct}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-brand-500 transition-all"
                style={{ width: `${job.status === "complete" ? 100 : pct}%` }}
              />
            </div>
          </div>

          {job.wpSignals && job.wpSignals.length > 0 && (
            <p className="text-xs text-slate-500">
              WP signals: {job.wpSignals.join(", ")}
            </p>
          )}

          {job.error && (
            <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
              {job.error}
              {job.errorCode ? ` (${job.errorCode})` : ""}
            </p>
          )}

          {ready && (
            <div className="flex flex-wrap gap-2">
              {(["csv", "json", "md"] as const).map((format) => (
                <a
                  key={format}
                  href={`/api/ingest/${job.id}/export?format=${format}`}
                  className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100"
                >
                  Download .{format === "md" ? "md" : format}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    queued: "bg-slate-100 text-slate-700",
    detecting: "bg-sky-100 text-sky-800",
    crawling: "bg-indigo-100 text-indigo-800",
    complete: "bg-emerald-100 text-emerald-800",
    failed: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
        colors[status] || colors.queued
      }`}
    >
      {status}
    </span>
  );
}
