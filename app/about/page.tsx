// Normal Next.js page - full React DX with proper rendering
import { CONTENT } from "@/lib/content";

export const metadata = {
  title: CONTENT.title,
  description: CONTENT.description,
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {CONTENT.title}
          </h1>
          <p className="text-xl text-muted-foreground">{CONTENT.description}</p>
        </header>

        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-3">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            {CONTENT.mission}
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">The Team</h2>
          <ul className="flex flex-wrap gap-2">
            {CONTENT.team.map((member) => (
              <li
                key={member}
                className="rounded-lg border bg-card px-4 py-2 text-sm text-card-foreground"
              >
                {member}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10">
          <div className="flex gap-8 rounded-xl border bg-card p-6">
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                Founded
              </div>
              <div className="text-lg font-medium">{CONTENT.founded}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                Team Size
              </div>
              <div className="text-lg font-medium">{CONTENT.team.length}</div>
            </div>
          </div>
        </section>

        <a
          href="mailto:hello@example.com"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Get in Touch
        </a>
      </div>
    </main>
  );
}
