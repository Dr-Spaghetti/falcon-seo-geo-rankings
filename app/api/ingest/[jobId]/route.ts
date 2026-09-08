import { NextRequest, NextResponse } from "next/server";
import { getJob, jobSummary } from "@/lib/jobs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: { jobId: string } }
) {
  const job = getJob(params.jobId);
  if (!job) {
    return NextResponse.json(
      { error: "Job not found", code: "not_found" },
      { status: 404 }
    );
  }
  return NextResponse.json({ job: jobSummary(job) });
}
