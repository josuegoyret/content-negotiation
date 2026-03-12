// Route handler for markdown content — serves raw markdown to AI agents.
//
// This route is public (no _ prefix) so Next.js doesn't disable it, but we
// don't want users accessing /markdown/about directly in their browser.
// The proxy stamps an "x-content-negotiation" header on rewritten requests;
// if that header is missing, it means someone navigated here directly, so
// we return a 404 to keep the route effectively hidden.
import { NextRequest, NextResponse } from "next/server";
import { notFound } from "next/navigation";
import { CONTENT, generateMarkdown } from "@/lib/content";

export async function GET(request: NextRequest) {
  // Only serve markdown when the request was rewritten through the proxy.
  // Direct access to /markdown/about will not have this header.
  if (!request.headers.get("x-content-negotiation")) {
    notFound();
  }

  const markdown = generateMarkdown(CONTENT);

  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept, User-Agent",
      "X-Served-To": "ai-agent",
    },
  });
}
