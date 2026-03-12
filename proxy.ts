import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// AI agent patterns to detect
const AI_AGENT_PATTERNS = [
  /claudebot/i,
  /chatgpt-user/i,
  /gptbot/i,
  /anthropic-ai/i,
  /perplexitybot/i,
  /cohere-ai/i,
];

// Search engine bots that need HTML for SEO
const SEO_BOT_PATTERNS = [
  /googlebot/i,
  /bingbot/i,
  /yandexbot/i,
  /duckduckbot/i,
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get("user-agent") || "";
  const acceptHeader = request.headers.get("accept") || "";

  // Check if it's an AI agent
  const isAIAgent = AI_AGENT_PATTERNS.some((pattern) =>
    pattern.test(userAgent)
  );

  // Check if explicitly requesting markdown via Accept header
  const wantsMarkdown = acceptHeader.includes("text/markdown");

  // Check if it's a search engine bot (they need HTML for indexing)
  const isSEOBot = SEO_BOT_PATTERNS.some((pattern) => pattern.test(userAgent));

  // If AI agent or explicit markdown request (and not SEO bot), rewrite to markdown route
  if ((isAIAgent || wantsMarkdown) && !isSEOBot) {
    const url = request.nextUrl.clone();
    url.pathname = `/markdown${pathname}`;

    // Stamp a custom header so the markdown route handler can verify the
    // request came through the proxy. Without this, anyone could hit
    // /markdown/about directly in their browser and bypass negotiation.
    // The route handler checks for this header and returns 404 if missing.
    const headers = new Headers(request.headers);
    headers.set("x-content-negotiation", "1");

    return NextResponse.rewrite(url, { request: { headers } });
  }

  // Default: serve HTML page normally
  return NextResponse.next();
}

export const config = {
  // Match routes that have content negotiation
  matcher: ["/about"],
};
