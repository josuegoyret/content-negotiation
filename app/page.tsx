import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Content Negotiation Demo</h1>

      <div className="space-y-6">
        <section className="p-6 border border-border rounded-lg bg-card">
          <h2 className="text-xl font-semibold mb-4">How It Works</h2>
          <p className="text-muted-foreground mb-4">
            The <code className="bg-muted px-2 py-1 rounded">/about</code> route serves different content based on who&apos;s
            requesting:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4">Requester</th>
                  <th className="text-left py-2 pr-4">Gets</th>
                  <th className="text-left py-2">Detection</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-2 pr-4">AI Agents (Claude, ChatGPT)</td>
                  <td className="py-2 pr-4">Raw Markdown</td>
                  <td className="py-2">User-Agent match</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 pr-4">Explicit markdown request</td>
                  <td className="py-2 pr-4">Raw Markdown</td>
                  <td className="py-2">
                    <code className="text-xs">Accept: text/markdown</code>
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 pr-4">Search bots (Google, Bing)</td>
                  <td className="py-2 pr-4">Branded HTML</td>
                  <td className="py-2">User-Agent match</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Human browsers</td>
                  <td className="py-2 pr-4">Branded HTML</td>
                  <td className="py-2">Default</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="p-6 border border-border rounded-lg bg-card">
          <h2 className="text-xl font-semibold mb-4">Try It Out</h2>

          <div className="space-y-4">
            <div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                Visit /about (HTML)
              </Link>
              <p className="text-sm text-muted-foreground mt-2">Opens in browser → serves HTML</p>
            </div>

            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm font-medium mb-2">Test with curl:</p>
              <code className="text-xs block mb-2"># Get HTML (default)</code>
              <pre className="text-xs bg-background p-2 rounded mb-3 overflow-x-auto">curl -i http://localhost:3000/about</pre>

              <code className="text-xs block mb-2"># Get Markdown (explicit Accept header)</code>
              <pre className="text-xs bg-background p-2 rounded mb-3 overflow-x-auto">
                curl -i -H &quot;Accept: text/markdown&quot; http://localhost:3000/about
              </pre>

              <code className="text-xs block mb-2"># Simulate AI agent</code>
              <pre className="text-xs bg-background p-2 rounded overflow-x-auto">
                curl -i -H &quot;User-Agent: ClaudeBot/1.0&quot; http://localhost:3000/about
              </pre>
            </div>
          </div>
        </section>

        <section className="p-6 border border-border rounded-lg bg-card">
          <h2 className="text-xl font-semibold mb-4">Key Implementation Details</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-foreground">1.</span>
              <span>
                <strong className="text-foreground">middleware.ts</strong> - Detects User-Agent and Accept headers, sets{" "}
                <code className="text-xs bg-muted px-1 rounded">x-content-preference</code> header
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-foreground">2.</span>
              <span>
                <strong className="text-foreground">app/about/route.ts</strong> - Route handler reads preference and serves
                appropriate content
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-foreground">3.</span>
              <span>
                <strong className="text-foreground">Vary header</strong> - Ensures CDN caches different versions for different
                requesters
              </span>
            </li>
          </ul>
        </section>
      </div>
    </main>
  )
}
