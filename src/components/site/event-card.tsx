import { Link } from "@tanstack/react-router";
import { CalendarDays, CheckCircle2, Heart, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatEventDate, type TechEvent } from "@/data/events";
import { useApp } from "@/hooks/use-app";
import { cn } from "@/lib/utils";

export function EventCard({ event }: { event: TechEvent }) {
  const { isFavorite, toggleFavorite, isRegistered } = useApp();
  const saved = isFavorite(event.id);
  const registered = isRegistered(event.id);

  return (
    <article className="surface-card group flex h-full flex-col p-5 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-pop)]">
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {event.category}
        </span>
        <button
          type="button"
          onClick={() => toggleFavorite(event.id)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${event.name} from saved events` : `Save ${event.name}`}
          className={cn(
            "inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-lg px-2 text-xs font-semibold transition-all hover:bg-secondary active:scale-95",
            saved ? "text-destructive" : "text-muted-foreground",
          )}
        >
          <Heart
            className={cn("size-4 transition-transform duration-200", saved && "scale-110 fill-current")}
            aria-hidden
          />
          {saved ? "Saved" : "Save"}
        </button>
      </div>

      <h3 className="mt-4 text-lg font-bold sm:text-xl">
        <Link
          to="/events/$eventId"
          params={{ eventId: event.id }}
          className="rounded outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
        >
          {event.name}
        </Link>
      </h3>

      <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <dt className="sr-only">Date</dt>
          <CalendarDays className="size-4 shrink-0" aria-hidden />
          <dd>{formatEventDate(event.date)}</dd>
        </div>
        <div className="flex min-w-0 items-center gap-1.5">
          <dt className="sr-only">Mode</dt>
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

      {registered && (
        <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-success">
          <CheckCircle2 className="size-4" aria-hidden />
          Registered
        </p>
      )}

      <div className="mt-5 grid grid-cols-2 gap-2">
        {registered ? (
          <Button asChild>
            <Link to="/my-registrations">My Registrations</Link>
          </Button>
        ) : (
          <Button asChild>
            <Link to="/registration/$eventId" params={{ eventId: event.id }}>
              Register
            </Link>
          </Button>
        )}
        <Button variant="outline" asChild>
          <Link to="/events/$eventId" params={{ eventId: event.id }}>
            View Details
          </Link>
        </Button>
      </div>
    </article>
  );
}

export function EventGrid({ events }: { events: readonly TechEvent[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <li key={event.id} className="animate-rise">
          <EventCard event={event} />
        </li>
      ))}
    </ul>
  );
}
