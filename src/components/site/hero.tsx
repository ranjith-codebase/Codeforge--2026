import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const STATS = [
  { value: "6+", label: "Flagship events" },
  { value: "1,190", label: "Student seats" },
  { value: "24", label: "Industry mentors" },
];

export function Hero({ onRegisterClick }: { onRegisterClick: () => void }) {
  return (
    <section id="home" className="hero-glow relative overflow-hidden border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="animate-rise max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-muted-foreground">
            <Sparkles className="size-3.5 text-primary" aria-hidden />
            CodeForge WebSprint 2026 · Registrations open
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl">
            Every campus tech event, <span className="text-primary">one clean portal.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Discover hackathons, AI labs, CTFs and cloud bootcamps happening this semester. Search, save
            what matters and register in under a minute — no accounts, no clutter.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <a href="#events">
                Explore Events
                <ArrowRight className="size-4" aria-hidden />
              </a>
            </Button>
            <Button size="lg" variant="outline" onClick={onRegisterClick}>
              Register for an event
            </Button>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="min-w-0">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-2xl font-bold sm:text-3xl">{stat.value}</span>
                  <span className="mt-1 block text-xs text-muted-foreground sm:text-sm">{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
