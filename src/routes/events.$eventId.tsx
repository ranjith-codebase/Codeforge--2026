import { useEffect } from "react";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  GraduationCap,
  Heart,
  MapPin,
  Share2,
  Signal,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/site/event-card";
import { Page } from "@/components/site/page";
import { formatEventDate } from "@/data/events";
import { useApp } from "@/hooks/use-app";
import {
  daysUntilDeadline,
  formatDate,
  getEvent,
  registrationDeadline,
  relatedEvents,
} from "@/lib/event-utils";
import { shareEvent } from "@/lib/share";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/events/$eventId")({
  loader: ({ params }) => {
    const event = getEvent(params.eventId);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Event unavailable — UpskillOn" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.event.name} — UpskillOn`;
    const description = loaderData.event.description;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: EventDetailsPage,
  notFoundComponent: EventNotFound,
});

function EventNotFound() {
  return (
    <Page>
      <div className="surface-card flex flex-col items-center px-6 py-16 text-center">
        <h1 className="text-2xl font-bold">That event could not be found.</h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          It may have been removed or the link is incorrect.
        </p>
        <Button className="mt-6" asChild>
          <Link to="/events">Explore Events</Link>
        </Button>
      </div>
    </Page>
  );
}

function EventDetailsPage() {
  const { event } = Route.useLoaderData();
  const { isFavorite, toggleFavorite, isRegistered, markViewed } = useApp();
  const saved = isFavorite(event.id);
  const registered = isRegistered(event.id);
  const related = relatedEvents(event);
  const daysLeft = daysUntilDeadline(event);

  useEffect(() => {
    markViewed(event.id);
  }, [event.id, markViewed]);

  const facts = [
    { icon: CalendarDays, label: "Date", value: formatEventDate(event.date) },
    { icon: Clock, label: "Duration", value: event.duration },
    { icon: MapPin, label: "Location", value: `${event.location} · ${event.mode}` },
    { icon: Signal, label: "Difficulty", value: event.difficulty },
    { icon: GraduationCap, label: "Eligibility", value: event.eligibility },
    { icon: Users, label: "Seats", value: `${event.seats} seats` },
  ];

  return (
    <Page>
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link to="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link to="/events" className="transition-colors hover:text-foreground">
              Events
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="truncate font-medium text-foreground">{event.name}</li>
        </ol>
      </nav>

      <header className="surface-card mt-6 p-6 sm:p-8">
        <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {event.category}
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{event.name}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {event.description}
        </p>

        {daysLeft !== null && daysLeft > 0 && (
          <p className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-warning/15 px-3 py-1.5 text-sm font-medium text-foreground">
            <Clock className="size-4" aria-hidden />
            Registration closes in {daysLeft} {daysLeft === 1 ? "day" : "days"} (
            {formatDate(registrationDeadline(event))})
          </p>
        )}

        <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex min-w-0 items-start gap-2.5">
              <Icon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <div className="min-w-0">
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
                <dd className="text-sm font-medium">{value}</dd>
              </div>
            </div>
          ))}
        </dl>

        <ul className="mt-6 flex flex-wrap gap-2">
          {event.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground"
            >
              #{tag}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap gap-2">
          {registered ? (
            <Button asChild>
              <Link to="/my-registrations">
                <CheckCircle2 className="size-4" aria-hidden />
                Registered — View My Registrations
              </Link>
            </Button>
          ) : (
            <Button size="lg" asChild>
              <Link to="/registration/$eventId" params={{ eventId: event.id }}>
                Register Now
              </Link>
            </Button>
          )}
          <Button
            size="lg"
            variant="outline"
            onClick={() => {
              const nowSaved = toggleFavorite(event.id);
              toast.success(nowSaved ? "Saved to your events" : "Removed from saved events");
            }}
            aria-pressed={saved}
          >
            <Heart className={cn("size-4", saved && "fill-current text-destructive")} aria-hidden />
            {saved ? "Saved" : "Save Event"}
          </Button>
          <Button
            size="lg"
            variant="ghost"
            onClick={() => shareEvent(event, { success: toast.success, error: toast.error })}
          >
            <Share2 className="size-4" aria-hidden />
            Share
          </Button>
        </div>
      </header>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <Detail title="About the Event">
          <p>{event.description}</p>
          <p>
            Expect a focused, hands-on format with guided support throughout. Come with curiosity — the
            rest is provided on the day.
          </p>
        </Detail>
        <Detail title="Who Can Participate">
          <p>{event.eligibility}</p>
          <p>Recommended level: {event.difficulty}.</p>
        </Detail>
        <Detail title="What You'll Experience">
          <ul className="list-disc space-y-1.5 pl-5">
            <li>Practical work on {event.category.toLowerCase()} problems</li>
            <li>Guidance from organisers and peers</li>
            <li>Feedback on what you build or present</li>
            <li>A portfolio-ready outcome to take with you</li>
          </ul>
        </Detail>
        <Detail title="Important Dates">
          <ul className="space-y-1.5">
            <li>Registration closes: {formatDate(registrationDeadline(event))}</li>
            <li>Event begins: {formatEventDate(event.date)}</li>
            <li>Duration: {event.duration}</li>
          </ul>
        </Detail>
        <Detail title="Event Format">
          <p>
            {event.mode} · {event.location}
          </p>
          <p>Capacity is limited to {event.seats} participants.</p>
        </Detail>
        <Detail title="Organizer">
          <p>{event.organizer}</p>
          <p>Reach the organising team through the event desk once you're registered.</p>
        </Detail>
      </div>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold">Related events</h2>
          <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <li key={item.id}>
                <EventCard event={item} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </Page>
  );
}

function Detail({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="surface-card p-6">
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}
