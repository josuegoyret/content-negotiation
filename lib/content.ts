// Single source of truth for the about page content
// Both markdown and HTML renderers use this

export interface ContentData {
  title: string
  description: string
  mission: string
  founded: string
  team: string[]
}

export const CONTENT: ContentData = {
  title: "About Our Company",
  description: "We build amazing products that help people do incredible things.",
  mission: "Our mission is to make technology accessible to everyone.",
  founded: "2024",
  team: ["Alice (CEO)", "Bob (CTO)", "Charlie (Design Lead)"],
}

// Markdown version for AI agents
export function generateMarkdown(content: ContentData): string {
  return `# ${content.title}

${content.description}

## Mission

${content.mission}

## Company Info

- **Founded:** ${content.founded}
- **Team:** ${content.team.join(", ")}

## Contact

For more information, visit our website or reach out to hello@example.com
`
}
