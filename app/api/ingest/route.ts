import { NextRequest, NextResponse } from "next/server";
import { createJob, jobSummary } from "@/lib/jobs";
import { runCrawl } from "@/lib/crawler";
import { normalizeUrl, UrlError } from "@/lib/url";
import { DEFAULT_MAX_PAGES } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const rawUrl = typeof body.url === "string" ? body.url : "";
    const maxPages =
      typeof body.maxPages === "number" && body.maxPages > 0
        ? Math.min(Math.floor(body.maxPages), 100)
        : DEFAULT_MAX_PAGES;

    let url: string;
    try {
      url = normalizeUrl(rawUrl);
    } catch (e) {
      if (e instanceof UrlError) {
        return NextResponse.json(
          { error: e.message, code: e.code },
          { status: 400 }
        );
      }
      throw e;
    }

    let job;
    try {
      job = createJob(url, maxPages);
    } catch (e) {
      const err = e as Error & { code?: string; jobId?: string };
      if (err.code === "duplicate_in_progress") {
        return NextResponse.json(
          {
            error: err.message,
            code: "duplicate_in_progress",
            jobId: err.jobId,
          },
          { status: 409 }
        );
      }
      throw e;
    }

    // Fire-and-forget crawl (in-process). Fine for single-instance / vertical slice.
    void runCrawl(job.id);

    return NextResponse.json({ job: jobSummary(job) }, { status: 202 });
  } catch (e) {
    return NextResponse.json(
      {
        error: e instanceof Error ? e.message : "Failed to start ingest",
        code: "server_error",
      },
      { status: 500 }
    );
  }
}
