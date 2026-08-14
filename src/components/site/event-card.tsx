import { CalendarDays, Heart, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatEventDate, type TechEvent } from "@/data/events";
import { cn } from "@/lib/utils";

type Props = {
  event: TechEvent;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onRegister: (event: TechEvent) => void;
  onViewDetails: (event: TechEvent) => void;
};

export function EventCard({ event, isFavorite, onToggleFavorite, onRegister, onViewDetails }: Props) {
  return (
    <article className="surface-card group flex h-full flex-col p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-pop)]">
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
          {event.category}
        </span>
        <button
          type="button"
          onClick={() => onToggleFavorite(event.id)}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? `Remove ${event.name} from favorites` : `Save ${event.name} to favorites`}
          className={cn(
            "inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-lg px-2 text-xs font-semibold transition-all hover:bg-secondary active:scale-95",
            isFavorite ? "text-destructive" : "text-muted-foreground",
          )}
        >
          <Heart className={cn("size-4 transition-transform", isFavorite && "scale-110 fill-current")} aria-hidden />
          {isFavorite ? "Saved" : "Save"}
        </button>
      </div>

      <h3 className="mt-4 text-lg font-bold sm:text-xl">{event.name}</h3>

      <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <dt className="sr-only">Date</dt>
          <CalendarDays className="size-4 shrink-0" aria-hidden />
          <dd>{formatEventDate(event.date)}</dd>
        </div>
        <div className="flex min-w-0 items-center gap-1.5">
          <dt className="sr-only">Location</dt>
          <MapPin className="size-4 shrink-0" aria-hidden />
          <dd className="truncate">{event.mode}</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <dt className="sr-only">Seats</dt>
          <Users className="size-4 shrink-0" aria-hidden />
          <dd>{event.seats} seats</dd>
        </div>
      </dl>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{event.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        <Button className="flex-1" onClick={() => onRegister(event)}>
          Register
        </Button>
        <Button variant="outline" onClick={() => onViewDetails(event)}>
          View Details
        </Button>
      </div>
    </article>
  );
}
