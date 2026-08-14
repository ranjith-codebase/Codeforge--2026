import { ArrowRight, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading } from "@/components/site/section";
import { EVENTS, formatEventDate, type TechEvent } from "@/data/events";

export function Highlights({ onViewDetails }: { onViewDetails: (event: TechEvent) => void }) {
  const highlights = EVENTS.filter((event) => event.featured).slice(0, 4);

  return (
    <section id="highlights" className="border-b border-border bg-elevated">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <SectionHeading
              eyebrow="Event highlights"
              title="Featured events on UpskillOn"
              description="Handpicked hackathons, labs and workshops. Browse the full catalogue below."
            />
            <Button variant="outline" asChild>
              <a href="#events">
                All events
                <ArrowRight className="size-4" aria-hidden />
              </a>
            </Button>
          </div>
        </Reveal>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((event, index) => (
            <li key={event.id} className="h-full">
              <Reveal
                className={`h-full ${index === 1 ? "delay-100" : index === 2 ? "delay-200" : index === 3 ? "delay-300" : ""}`}
              >
                <div className="surface-card flex h-full flex-col p-5 transition-transform duration-300 hover:-translate-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {event.category}
                  </span>
                  <h3 className="mt-2 text-lg font-bold">{event.name}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <CalendarDays className="size-4 shrink-0" aria-hidden />
                    {formatEventDate(event.date)} · {event.duration}
                  </p>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">
                    {event.description.split(", ")[0]}.
                  </p>
                  <Button variant="ghost" className="mt-4 justify-start px-0" onClick={() => onViewDetails(event)}>
                    View details
                    <ArrowRight className="size-4" aria-hidden />
                  </Button>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
