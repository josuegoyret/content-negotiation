import Link from "next/link"
import {
  ArrowRight,
  Globe,
  Bot,
  FileText,
  Search,
  User,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Kbd } from "@/components/ui/kbd"
import { CopyButton } from "@/components/copy-button"

function getBaseUrl() {
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return "http://localhost:3000"
}

export default function Home() {
  const baseUrl = getBaseUrl()

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-6 py-16 space-y-10">
        {/* Hero */}
        <div className="text-center space-y-4">
          <Badge
            variant="secondary"
            className="animate-in fade-in slide-in-from-bottom-2 duration-500"
          >
            Next.js Content Negotiation
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight animate-in fade-in slide-in-from-bottom-3 duration-500 fill-mode-both delay-100">
            Content Negotiation Demo
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-3 duration-500 fill-mode-both delay-200">
            Serve different content formats from the same URL based on
            who&apos;s requesting. AI agents get clean markdown. Browsers get
            branded HTML.
          </p>
        </div>

        {/* How It Works */}
        <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both delay-300">
          <CardHeader>
            <CardTitle className="text-xl">How It Works</CardTitle>
            <CardDescription>
              The{" "}
              <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
                /about
              </code>{" "}
              route serves different content based on the requester
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-start gap-3 rounded-lg border p-4 transition-all duration-200 hover:bg-muted/50 hover:shadow-sm">
                <Bot className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium">AI Agents</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Claude, ChatGPT, Perplexity
                  </p>
                  <Badge variant="secondary" className="mt-2 text-[10px]">
                    Raw Markdown
                  </Badge>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border p-4 transition-all duration-200 hover:bg-muted/50 hover:shadow-sm">
                <FileText className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium">Accept Header</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Accept: text/markdown
                  </p>
                  <Badge variant="secondary" className="mt-2 text-[10px]">
                    Raw Markdown
                  </Badge>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border p-4 transition-all duration-200 hover:bg-muted/50 hover:shadow-sm">
                <Search className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium">Search Engines</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Google, Bing, Yandex
                  </p>
                  <Badge className="mt-2 text-[10px]">Branded HTML</Badge>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border p-4 transition-all duration-200 hover:bg-muted/50 hover:shadow-sm">
                <User className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium">Human Browsers</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Chrome, Firefox, Safari
                  </p>
                  <Badge className="mt-2 text-[10px]">Branded HTML</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Try It Out — Two Columns */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Browser Column */}
          <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both delay-[400ms]">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="size-5 text-primary" />
                <CardTitle>Try with Browser</CardTitle>
              </div>
              <CardDescription>
                Visit the page directly to see the styled HTML version
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Click below to open{" "}
                <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">
                  /about
                </code>{" "}
                in your browser. Your browser sends a standard{" "}
                <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">
                  Accept: text/html
                </code>{" "}
                header, so the proxy serves the full React-rendered HTML page.
              </p>
              <Button
                asChild
                className="w-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Link href="/about">
                  Visit /about
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <div className="rounded-lg bg-muted/50 border p-4 space-y-2">
                <p className="text-xs font-medium">What to expect:</p>
                <ul className="text-xs text-muted-foreground space-y-1.5">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">&bull;</span>
                    Full styled HTML page with company branding
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">&bull;</span>
                    React server-rendered content with Tailwind CSS
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">&bull;</span>
                    Same URL, different format than what agents see
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Agent Simulation Column */}
          <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both delay-500">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bot className="size-5 text-primary" />
                <CardTitle>Simulate Agent Bot</CardTitle>
              </div>
              <CardDescription>
                Use curl to see how AI agents receive markdown content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="macos">
                <TabsList className="w-full">
                  <TabsTrigger value="macos" className="flex-1 gap-1.5">
                    macOS / Linux
                  </TabsTrigger>
                  <TabsTrigger value="windows" className="flex-1 gap-1.5">
                    Windows
                  </TabsTrigger>
                </TabsList>

                {/* macOS / Linux */}
                <TabsContent value="macos" className="space-y-4 mt-3">
                  <div className="space-y-4">
                    <Step number={1} title="Open Terminal">
                      Press <Kbd>&#8984;</Kbd> + <Kbd>Space</Kbd>, type
                      &quot;Terminal&quot;, press Enter
                    </Step>

                    <Step
                      number={2}
                      title="Request markdown via Accept header"
                    >
                      <CodeSnippet
                        code={`curl -i -H "Accept: text/markdown" \\\n  ${baseUrl}/about`}
                        copyText={`curl -i -H "Accept: text/markdown" ${baseUrl}/about`}
                      />
                    </Step>

                    <Step number={3} title="What to expect">
                      You&apos;ll see raw markdown content with a{" "}
                      <code className="bg-muted px-1 py-0.5 rounded text-[10px] font-mono">
                        Content-Type: text/markdown
                      </code>{" "}
                      response header and an{" "}
                      <code className="bg-muted px-1 py-0.5 rounded text-[10px] font-mono">
                        X-Served-To: ai-agent
                      </code>{" "}
                      debug header
                    </Step>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Or simulate a specific AI agent:
                    </p>
                    <CodeSnippet
                      code={`curl -i -H "User-Agent: ClaudeBot/1.0" \\\n  ${baseUrl}/about`}
                      copyText={`curl -i -H "User-Agent: ClaudeBot/1.0" ${baseUrl}/about`}
                    />
                  </div>
                </TabsContent>

                {/* Windows */}
                <TabsContent value="windows" className="space-y-4 mt-3">
                  <div className="space-y-4">
                    <Step number={1} title="Open PowerShell">
                      Press <Kbd>Win</Kbd> + <Kbd>X</Kbd>, then select
                      &quot;Terminal&quot; or &quot;PowerShell&quot;
                    </Step>

                    <Step
                      number={2}
                      title="Request markdown via Accept header"
                    >
                      <CodeSnippet
                        code={`curl.exe -i -H "Accept: text/markdown" \`\n  ${baseUrl}/about`}
                        copyText={`curl.exe -i -H "Accept: text/markdown" ${baseUrl}/about`}
                      />
                      <p className="text-[10px] text-muted-foreground mt-1.5">
                        Use{" "}
                        <code className="bg-muted px-1 rounded">curl.exe</code>{" "}
                        in PowerShell &mdash;{" "}
                        <code className="bg-muted px-1 rounded">curl</code> is
                        an alias for{" "}
                        <code className="bg-muted px-1 rounded">
                          Invoke-WebRequest
                        </code>
                      </p>
                    </Step>

                    <Step number={3} title="What to expect">
                      You&apos;ll see raw markdown content with a{" "}
                      <code className="bg-muted px-1 py-0.5 rounded text-[10px] font-mono">
                        Content-Type: text/markdown
                      </code>{" "}
                      response header and an{" "}
                      <code className="bg-muted px-1 py-0.5 rounded text-[10px] font-mono">
                        X-Served-To: ai-agent
                      </code>{" "}
                      debug header
                    </Step>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Or simulate a specific AI agent:
                    </p>
                    <CodeSnippet
                      code={`curl.exe -i -H "User-Agent: ClaudeBot/1.0" \`\n  ${baseUrl}/about`}
                      copyText={`curl.exe -i -H "User-Agent: ClaudeBot/1.0" ${baseUrl}/about`}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Implementation Details */}
        <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both delay-[600ms]">
          <CardHeader>
            <CardTitle className="text-xl">
              Key Implementation Details
            </CardTitle>
            <CardDescription>
              How content negotiation works under the hood
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              <Detail
                number={1}
                title="proxy.ts — Request Interception"
                description={
                  <>
                    A proxy function intercepts incoming requests to matched
                    routes (e.g.,{" "}
                    <code className="bg-muted px-1 rounded text-xs font-mono">
                      /about
                    </code>
                    ). It checks the{" "}
                    <code className="bg-muted px-1 rounded text-xs font-mono">
                      User-Agent
                    </code>{" "}
                    header against known AI agent patterns (ClaudeBot,
                    ChatGPT-User, GPTBot, PerplexityBot, Cohere-AI) and the{" "}
                    <code className="bg-muted px-1 rounded text-xs font-mono">
                      Accept
                    </code>{" "}
                    header for explicit{" "}
                    <code className="bg-muted px-1 rounded text-xs font-mono">
                      text/markdown
                    </code>{" "}
                    requests.
                  </>
                }
              />
              <Detail
                number={2}
                title="NextResponse.rewrite() — Transparent URL Rewriting"
                description={
                  <>
                    When an AI agent or markdown request is detected, the proxy
                    rewrites{" "}
                    <code className="bg-muted px-1 rounded text-xs font-mono">
                      /about
                    </code>{" "}
                    to{" "}
                    <code className="bg-muted px-1 rounded text-xs font-mono">
                      /_markdown/about
                    </code>{" "}
                    internally. The client-facing URL stays the same &mdash; the
                    rewrite is invisible.
                  </>
                }
              />
              <Detail
                number={3}
                title="Dual Content Paths — Single Source of Truth"
                description={
                  <>
                    <code className="bg-muted px-1 rounded text-xs font-mono">
                      app/about/page.tsx
                    </code>{" "}
                    serves the React-rendered HTML page.{" "}
                    <code className="bg-muted px-1 rounded text-xs font-mono">
                      app/_markdown/about/route.ts
                    </code>{" "}
                    is a route handler returning raw markdown with{" "}
                    <code className="bg-muted px-1 rounded text-xs font-mono">
                      Content-Type: text/markdown
                    </code>
                    . Both derive content from{" "}
                    <code className="bg-muted px-1 rounded text-xs font-mono">
                      lib/content.ts
                    </code>
                    .
                  </>
                }
              />
              <Detail
                number={4}
                title="SEO Protection & CDN Caching"
                description={
                  <>
                    Search engine bots (Googlebot, Bingbot, Yandex, DuckDuckBot)
                    are explicitly excluded from markdown rewriting to preserve
                    SEO indexing. The markdown route sets{" "}
                    <code className="bg-muted px-1 rounded text-xs font-mono">
                      Vary: Accept, User-Agent
                    </code>{" "}
                    so CDNs correctly cache different versions for different
                    request types.
                  </>
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

function Step({
  number,
  title,
  children,
}: {
  number: number
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-3">
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
        {number}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{title}</p>
        <div className="text-xs text-muted-foreground mt-1">{children}</div>
      </div>
    </div>
  )
}

function CodeSnippet({
  code,
  copyText,
}: {
  code: string
  copyText: string
}) {
  return (
    <div className="relative group mt-1.5">
      <pre className="text-[11px] leading-relaxed bg-muted/50 border rounded-lg p-3 pr-10 overflow-x-auto font-mono whitespace-pre-wrap break-all">
        {code}
      </pre>
      <CopyButton text={copyText} className="absolute top-2 right-2" />
    </div>
  )
}

function Detail({
  number,
  title,
  description,
}: {
  number: number
  title: string
  description: React.ReactNode
}) {
  return (
    <div className="flex gap-3">
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
        {number}
      </span>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}
