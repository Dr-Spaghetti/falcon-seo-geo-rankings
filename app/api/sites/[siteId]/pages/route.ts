import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Stub for future JustifyCode WordPress plugin sync.
 * Will return indexed pages for a registered site once the plugin lands.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: { siteId: string } }
) {
  return NextResponse.json(
    {
      stub: true,
      siteId: params.siteId,
      message:
        "Future plugin API: list crawled/synced pages for a registered site. Not implemented yet.",
      pages: [],
    },
    { status: 501 }
  );
}
