import { NextRequest, NextResponse } from "next/server";
import { getJob } from "@/lib/jobs";
import { toCsv, toJson, toMarkdown } from "@/lib/export";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { jobId: string } }
) {
  const job = getJob(params.jobId);
  if (!job) {
    return NextResponse.json(
      { error: "Job not found", code: "not_found" },
      { status: 404 }
    );
  }

  if (job.status !== "complete" && job.status !== "failed") {
    return NextResponse.json(
      {
        error: "Export available when job is complete (or failed with partial pages)",
        code: "not_ready",
        status: job.status,
      },
      { status: 409 }
    );
  }

  const format = (req.nextUrl.searchParams.get("format") || "json").toLowerCase();
  const base = `wp-crawl-${job.id.slice(0, 8)}`;

  if (format === "csv") {
    return new NextResponse(toCsv(job), {
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": `attachment; filename="${base}.csv"`,
      },
    });
  }
  if (format === "md" || format === "markdown") {
    return new NextResponse(toMarkdown(job), {
      headers: {
        "content-type": "text/markdown; charset=utf-8",
        "content-disposition": `attachment; filename="${base}.md"`,
      },
    });
  }
  if (format === "json") {
    return new NextResponse(toJson(job), {
      headers: {
        "content-type": "application/json; charset=utf-8",
        "content-disposition": `attachment; filename="${base}.json"`,
      },
    });
  }

  return NextResponse.json(
    { error: "format must be csv, json, or md", code: "invalid_format" },
    { status: 400 }
  );
}
