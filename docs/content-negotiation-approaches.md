# Content Negotiation in Next.js — Edge Proxy with URL Rewriting

How this project implements content negotiation: serving markdown to AI agents and HTML to browsers from the same URL, using Next.js proxy-level request interception and transparent URL rewriting.

---

## Architecture

Next.js proxy runs at the edge before any route is resolved, making it the natural interception point for content negotiation. A `proxy.ts` file at the project root inspects incoming request headers — `User-Agent` and `Accept` — and transparently rewrites the request to a different internal route based on what the client needs. The visitor's URL never changes.

```
Request: GET /about
        │
        ▼
┌─────────────────────────┐
│   proxy.ts              │  ← Runs at the edge (before routing)
│  Inspect headers:       │
│  • User-Agent           │
│  • Accept               │
└────────┬────────────────┘
         │
    ┌────┴─────┐
    │          │
    ▼          ▼
 Browser    AI Agent / Accept: text/markdown
    │          │
    ▼          ▼
 /about       /_markdown/about
 (page.tsx)   (route.ts → raw markdown)
```

Both routes import content from a **single source of truth** (`lib/content.ts`). The React page renders it as styled HTML; the route handler serializes it as plain markdown. Updating content in one place updates both representations.

## Code

```ts
// proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AI_AGENT_PATTERNS = [
  /claudebot/i,
  /chatgpt-user/i,
  /gptbot/i,
  /anthropic-ai/i,
  /perplexitybot/i,
  /cohere-ai/i,
];

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

  const isAIAgent = AI_AGENT_PATTERNS.some((p) => p.test(userAgent));
  const wantsMarkdown = acceptHeader.includes("text/markdown");
  const isSEOBot = SEO_BOT_PATTERNS.some((p) => p.test(userAgent));

  // Rewrite AI agents (but not search crawlers) to the markdown route
  if ((isAIAgent || wantsMarkdown) && !isSEOBot) {
    const url = request.nextUrl.clone();
    url.pathname = `/_markdown${pathname}`;

    const response = NextResponse.rewrite(url);
    response.headers.set("Vary", "Accept, User-Agent");
    return response;
  }

  // Everyone else gets the normal HTML page
  const response = NextResponse.next();
  response.headers.set("Vary", "Accept, User-Agent");
  return response;
}

export const config = {
  matcher: ["/about"],
};
```

## Key Details

### Request Detection

The proxy checks two signals:

1. **User-Agent matching** — regex patterns for known AI agents (ClaudeBot, ChatGPT-User, GPTBot, Anthropic-AI, PerplexityBot, Cohere-AI). Search engine bots (Googlebot, Bingbot, Yandex, DuckDuckBot) are explicitly excluded so they always receive HTML for SEO indexing.
2. **Accept header** — clients can explicitly request `text/markdown` regardless of their User-Agent.

### URL Rewriting

When an AI agent or markdown request is detected, `NextResponse.rewrite()` internally routes from `/about` to `/_markdown/about`. The rewrite is invisible to the client — the URL stays `/about`.

### Dual Content Paths

- **`app/about/page.tsx`** — Full React server component with metadata, layouts, Tailwind styling, and all Next.js page features. Served to browsers and search engines.
- **`app/_markdown/about/route.ts`** — Next.js route handler returning raw markdown with `Content-Type: text/markdown`. Sets `X-Served-To: ai-agent` for debugging.

Both derive content from `lib/content.ts`, ensuring consistency.

### CDN Caching via `Vary` Headers

The `Vary: Accept, User-Agent` header tells CDN edge nodes that the response for `/about` differs depending on these request headers. A CDN stores **separate cached entries** for the same URL: one for browsers and another for markdown clients.

Note: `Vary: User-Agent` creates many cache variants since every distinct UA string is a new entry. Teams at scale may narrow to `Vary: Accept` alone and rely solely on the Accept header for negotiation.

## Pros

- **Edge execution, low latency.** Proxy runs at the CDN edge before the request reaches the origin, adding near-zero overhead.
- **Clean URLs.** The client always sees `/about` — the rewrite to `/_markdown/about` is invisible.
- **Full Next.js features preserved.** The HTML path uses `page.tsx` with RSC, streaming, layouts, metadata, and all page conventions.
- **CDN-friendly.** Both HTML and markdown responses are independently cacheable at the same URL.
- **Built-in Next.js primitive.** No custom server, no external proxy, no additional infrastructure.
- **Single source of truth.** Content lives in one shared module; the proxy only controls routing.

## Cons

- **Restricted runtime.** Edge proxy uses the Web API subset (no `fs`, no native Node.js modules). Complex detection logic or database lookups are impractical.
- **Debugging difficulty.** Edge functions lack rich logging and breakpoints. Reproducing header-based branching locally requires crafting requests with curl.
- **`Vary: User-Agent` cache fragmentation.** Can balloon CDN cache variants and reduce hit rates.
- **Regex maintenance.** The AI agent detection list is static and must be manually updated as new bots emerge.
