import { useEffect, useState, type FormEvent } from "react";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { toast } from "sonner";
import { CalendarDays, CheckCircle2, PartyPopper, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Page } from "@/components/site/page";
import { RequireAuth } from "@/components/site/require-auth";
import { formatEventDate } from "@/data/events";
import { useApp } from "@/hooks/use-app";
import { getEvent } from "@/lib/event-utils";
import { shareEvent } from "@/lib/share";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const Route = createFileRoute("/registration/$eventId")({
  loader: ({ params }) => {
    const event = getEvent(params.eventId);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Registration unavailable — UpskillOn" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `Register for ${loaderData.event.name} — UpskillOn`;
    const description = `Confirm your place at ${loaderData.event.name} on UpskillOn.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: RegistrationRoute,
  notFoundComponent: () => (
    <Page>
      <div className="surface-card flex flex-col items-center px-6 py-16 text-center">
        <h1 className="text-2xl font-bold">That event could not be found.</h1>
        <Button className="mt-6" asChild>
          <Link to="/events">Explore Events</Link>
        </Button>
      </div>
    </Page>
  ),
});

function RegistrationRoute() {
  const { event } = Route.useLoaderData();
  return (
    <RequireAuth title={`Register for ${event.name}`}>
      <RegistrationPage />
    </RequireAuth>
  );
}

function RegistrationPage() {
  const { event } = Route.useLoaderData();
  const { user, registerForEvent, isRegistered } = useApp();
  const alreadyRegistered = isRegistered(event.id);

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [college, setCollege] = useState(user?.college ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setEmail(user.email);
    setCollege(user.college);
  }, [user]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!name.trim()) next["name"] = "Please enter your full name.";
    if (!email.trim()) next["email"] = "Please enter your email address.";
    else if (!EMAIL_RE.test(email.trim())) next["email"] = "Enter a valid email address.";
    if (!college.trim()) next["college"] = "Please enter your college or institution.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const result = registerForEvent(event.id);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    setDone(true);
    toast.success(`Registered for ${event.name}`);
  };

  if (done) {
    return (
      <Page className="max-w-2xl">
        <div className="surface-card flex flex-col items-center px-6 py-14 text-center">
          <span className="grid size-14 place-items-center rounded-full bg-success/15 text-success">
            <PartyPopper className="size-7" aria-hidden />
          </span>
          <h1 className="mt-5 text-3xl font-bold">You're in! 🎉</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            You're registered for <span className="font-semibold text-foreground">{event.name}</span>.
          </p>
          <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-3">
            <Summary label="Event" value={event.name} />
            <Summary label="Category" value={event.category} />
            <Summary label="Date" value={formatEventDate(event.date)} />
          </dl>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <Button asChild>
              <Link to="/my-registrations">View My Registrations</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/events/$eventId" params={{ eventId: event.id }}>
                View Event
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/events">Explore More Events</Link>
            </Button>
            <Button
              variant="ghost"
              onClick={() => shareEvent(event, { success: toast.success, error: toast.error })}
            >
              <Share2 className="size-4" aria-hidden />
              Share Event
            </Button>
          </div>
        </div>
      </Page>
    );
  }

  if (alreadyRegistered) {
    return (
      <Page className="max-w-2xl">
        <div className="surface-card flex flex-col items-center px-6 py-14 text-center">
          <CheckCircle2 className="size-10 text-success" aria-hidden />
          <h1 className="mt-4 text-2xl font-bold">You're already registered</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your place at {event.name} is confirmed.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button asChild>
              <Link to="/my-registrations">View My Registrations</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/events/$eventId" params={{ eventId: event.id }}>
                View Event
              </Link>
            </Button>
          </div>
        </div>
      </Page>
    );
  }

  return (
    <Page className="max-w-2xl">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <Link to="/events/$eventId" params={{ eventId: event.id }} className="hover:text-foreground">
          ← Back to {event.name}
        </Link>
      </nav>

      <div className="surface-card mt-5 p-6">
        <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {event.category}
        </span>
        <h1 className="mt-3 text-2xl font-bold">{event.name}</h1>
        <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <CalendarDays className="size-4" aria-hidden />
          {formatEventDate(event.date)} · {event.mode}
        </p>
      </div>

      <form onSubmit={onSubmit} noValidate className="surface-card mt-5 space-y-4 p-6">
        <h2 className="text-lg font-bold">Confirm your details</h2>
        <div>
          <Label htmlFor="reg-name" className="mb-1.5">
            Full name
          </Label>
          <Input
            id="reg-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={Boolean(errors["name"])}
            className="h-11"
          />
          {errors["name"] && (
            <p role="alert" className="mt-1.5 text-sm font-medium text-destructive">
              {errors["name"]}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="reg-email" className="mb-1.5">
            Email
          </Label>
          <Input
            id="reg-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(errors["email"])}
            className="h-11"
          />
          {errors["email"] && (
            <p role="alert" className="mt-1.5 text-sm font-medium text-destructive">
              {errors["email"]}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="reg-college" className="mb-1.5">
            College / Institution
          </Label>
          <Input
            id="reg-college"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            aria-invalid={Boolean(errors["college"])}
            className="h-11"
          />
          {errors["college"] && (
            <p role="alert" className="mt-1.5 text-sm font-medium text-destructive">
              {errors["college"]}
            </p>
          )}
        </div>

        <Button type="submit" size="lg" className="w-full">
          Confirm Registration
        </Button>
      </form>
    </Page>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border px-4 py-3">
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 font-medium">{value}</dd>
    </div>
  );
}
