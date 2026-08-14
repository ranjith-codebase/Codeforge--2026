import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/site/event-card";
import { Reveal, SectionHeading } from "@/components/site/section";
import { EVENTS, type TechEvent } from "@/data/events";

type Props = {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onRegister: (event: TechEvent) => void;
  onViewDetails: (event: TechEvent) => void;
};

export function FavoritesSection({ favorites, onToggleFavorite, onRegister, onViewDetails }: Props) {
  const saved = EVENTS.filter((event) => favorites.includes(event.id));

  return (
    <section id="favorites" className="border-b border-border bg-elevated">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Your shortlist"
            title="Saved events"
            description="Favorites are stored on this device, so your shortlist survives a refresh."
          />
        </Reveal>

        {saved.length > 0 ? (
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {saved.map((event) => (
              <li key={event.id} className="animate-rise">
                <EventCard
                  event={event}
                  isFavorite
                  onToggleFavorite={onToggleFavorite}
                  onRegister={onRegister}
                  onViewDetails={onViewDetails}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="surface-card mt-8 flex flex-col items-center px-6 py-14 text-center">
            <span className="grid size-12 place-items-center rounded-full bg-secondary">
              <Heart className="size-5 text-muted-foreground" aria-hidden />
            </span>
            <h3 className="mt-4 text-lg font-bold">No saved events yet.</h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Tap Save on any event card to build your personal shortlist.
            </p>
            <Button className="mt-5" asChild>
              <a href="#events">Explore Events</a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
