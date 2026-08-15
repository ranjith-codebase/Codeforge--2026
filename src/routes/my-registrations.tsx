import { Link, createFileRoute } from "@tanstack/react-router";
import { CalendarDays, CheckCircle2, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState, Page, PageHeader } from "@/components/site/page";
import { RequireAuth } from "@/components/site/require-auth";
import { formatEventDate } from "@/data/events";
import { useApp } from "@/hooks/use-app";
import { getEvent } from "@/lib/event-utils";

const TITLE = "My Registrations — UpskillOn";
const DESCRIPTION = "Track every UpskillOn event you've registered for in one place.";

export const Route = createFileRoute("/my-registrations")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: () => (
    <RequireAuth title="My Registrations">
      <RegistrationsPage />
    </RequireAuth>
  ),
});

function RegistrationsPage() {
  const { registrations } = useApp();
  const rows = registrations
    .map((registration) => ({ registration, event: getEvent(registration.eventId) }))
    .filter((row) => row.event);

  return (
    <Page>
      <PageHeader
        eyebrow="Your journey"
        title="My Registrations"
        description="Everything you've signed up for on UpskillOn."
      />

      <div className="mt-8">
        {rows.length > 0 ? (
          <ul className="grid gap-4">
            {rows.map(({ registration, event }) => (
              <li
                key={registration.id}
                className="surface-card animate-rise flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {event!.category}
                  </span>
                  <h2 className="mt-2 text-lg font-bold">{event!.name}</h2>
                  <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-4" aria-hidden />
                      {formatEventDate(event!.date)}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-semibold text-success">
                      <CheckCircle2 className="size-4" aria-hidden />
                      {registration.status}
                    </span>
                  </p>
                </div>
                <Button variant="outline" asChild>
                  <Link to="/events/$eventId" params={{ eventId: event!.id }}>
                    View Event
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            icon={<Ticket className="size-5 text-muted-foreground" aria-hidden />}
            title="No registrations yet."
            description="Once you register for an event it will show up here."
          />
        )}
      </div>
    </Page>
  );
}
