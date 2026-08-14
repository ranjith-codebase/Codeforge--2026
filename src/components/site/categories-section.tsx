import {
  Blocks,
  Bot,
  Brain,
  CloudCog,
  Code2,
  Cpu,
  Database,
  Layers,
  PenTool,
  Shield,
  Smartphone,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { Reveal, SectionHeading } from "@/components/site/section";
import { CATEGORIES, EVENTS, type EventCategory } from "@/data/events";

const ICONS: Record<EventCategory, LucideIcon> = {
  Hackathons: Code2,
  "AI / Machine Learning": Brain,
  "Web Development": Layers,
  "App Development": Smartphone,
  Cybersecurity: Shield,
  "Data Science": Database,
  "Cloud Computing": CloudCog,
  "Competitive Programming": Trophy,
  "UI/UX & Design": PenTool,
  Robotics: Bot,
  "Blockchain & Web3": Blocks,
  Workshops: Cpu,
};

export function CategoriesSection({ onSelectCategory }: { onSelectCategory: (c: EventCategory) => void }) {
  return (
    <section id="categories" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Categories"
            title="Browse by technology track"
            description="Pick a track and we'll filter the event catalogue for you instantly."
          />
        </Reveal>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((category, index) => {
            const Icon = ICONS[category];
            const count = EVENTS.filter((event) => event.category === category).length;
            return (
              <li key={category}>
                <Reveal className={index % 2 === 1 ? "delay-100" : ""}>
                  <button
                    type="button"
                    onClick={() => onSelectCategory(category)}
                    className="surface-card group flex min-h-24 w-full flex-col items-start gap-2 p-4 text-left transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-pop)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.98]"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <span className="min-w-0 text-sm font-semibold">{category}</span>
                    <span className="text-xs text-muted-foreground">
                      {count} {count === 1 ? "event" : "events"}
                    </span>
                  </button>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
