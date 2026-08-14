import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORIES, EVENTS } from "@/data/events";

export function Hero({ onExploreClick }: { onExploreClick: () => void }) {
  const stats = [
    { value: `${EVENTS.length}+`, label: "Tech events" },
    { value: `${CATEGORIES.length}`, label: "Categories" },
    { value: "1000+", label: "Learners" },
    { value: "24/7", label: "Explore & learn" },
  ];

  return (
    <section id="home" className="hero-glow relative overflow-hidden border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="animate-rise max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-muted-foreground">
            <Sparkles className="size-3.5 text-primary" aria-hidden />
            UpskillOn · Technology event discovery for students
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl">
            Discover. Learn. Compete. <span className="text-primary">Upskill.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Find hackathons, workshops, competitions and tech events built to help you learn, build and
            grow — search, filter, save and register in under a minute.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" onClick={onExploreClick}>
              Explore Events
              <ArrowRight className="size-4" aria-hidden />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#categories">Browse Categories</a>
            </Button>
          </div>

          <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="min-w-0">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-2xl font-bold sm:text-3xl">{stat.value}</span>
                  <span className="mt-1 block text-xs text-muted-foreground sm:text-sm">{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-muted-foreground">Demo statistics for this student project.</p>
        </div>
      </div>
    </section>
  );
}
