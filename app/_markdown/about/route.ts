// Route handler for markdown content - serves raw markdown to AI agents
import { NextResponse } from "next/server";
import { CONTENT, generateMarkdown } from "@/lib/content";

export async function GET() {
  const markdown = generateMarkdown(CONTENT);

  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept, User-Agent",
      "X-Served-To": "ai-agent",
    },
  });
}
