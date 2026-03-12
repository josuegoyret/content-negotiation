import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// AI agent patterns to detect
const AI_AGENT_PATTERNS = [
  /claudebot/i,
  /chatgpt-user/i,
  /gptbot/i,
  /anthropic-ai/i,
  /perplexitybot/i,
  /cohere-ai/i,
]

// Search engine bots that need HTML for SEO
const SEO_BOT_PATTERNS = [/googlebot/i, /bingbot/i, /yandexbot/i, /duckduckbot/i]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const userAgent = request.headers.get("user-agent") || ""
  const acceptHeader = request.headers.get("accept") || ""

  // Check if it's an AI agent
  const isAIAgent = AI_AGENT_PATTERNS.some((pattern) => pattern.test(userAgent))

  // Check if explicitly requesting markdown via Accept header
  const wantsMarkdown = acceptHeader.includes("text/markdown")

  // Check if it's a search engine bot (they need HTML for indexing)
  const isSEOBot = SEO_BOT_PATTERNS.some((pattern) => pattern.test(userAgent))

  // If AI agent or explicit markdown request (and not SEO bot), rewrite to markdown route
  if ((isAIAgent || wantsMarkdown) && !isSEOBot) {
    // Rewrite /about to /_markdown/about
    const url = request.nextUrl.clone()
    url.pathname = `/_markdown${pathname}`
    return NextResponse.rewrite(url)
  }

  // Default: serve HTML page normally
  return NextResponse.next()
}

export const config = {
  // Match routes that have content negotiation
  matcher: ["/about"],
}
