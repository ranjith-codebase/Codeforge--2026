import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventGrid } from "@/components/site/event-card";
import { Page } from "@/components/site/page";
import { SectionHeading } from "@/components/site/section";
import { CATEGORIES, EVENTS } from "@/data/events";
import { useApp } from "@/hooks/use-app";
import { getEvents, recommendedEvents } from "@/lib/event-utils";

const TITLE = "UpskillOn — Discover Tech Events, Hackathons & Workshops";
const DESCRIPTION =
  "UpskillOn helps you discover, save and register for hackathons, AI labs, workshops, CTFs and other technology events.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const { user, recentlyViewed } = useApp();
  const featured = [...EVENTS].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3);
  const recent = getEvents(recentlyViewed).slice(0, 3);
  const recommended = recommendedEvents(user?.interests ?? [], 3);

  return (
    <Page>
      <section className="surface-card overflow-hidden px-6 py-14 text-center sm:px-10 sm:py-20">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Sparkles className="size-3.5" aria-hidden />
          {EVENTS.length} live opportunities
        </span>
        <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
          Discover the tech events that level you up
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
          Hackathons, AI labs, workshops and CTFs across {CATEGORIES.length} technology tracks — search,
          save and register in seconds.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button size="lg" asChild>
            <Link to="/events">
              Explore Events
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/categories">Browse Categories</Link>
          </Button>
        </div>
        <dl className="mx-auto mt-10 grid max-w-lg grid-cols-3 gap-4 text-left">
          <Stat label="Events" value={`${EVENTS.length}`} />
          <Stat label="Tracks" value={`${CATEGORIES.length}`} />
          <Stat label="Modes" value="3" />
        </dl>
      </section>

      <section className="mt-14">
        <SectionHeading
          eyebrow="Featured"
          title="Happening soon"
          description="The next events on the calendar."
        />
        <div className="mt-6">
          <EventGrid events={featured} />
        </div>
      </section>

      {recommended.length > 0 && (
        <section className="mt-14">
          <SectionHeading
            eyebrow="For you"
            title="Recommended For You"
            description="Matched to the interests on your profile."
          />
          <div className="mt-6">
            <EventGrid events={recommended} />
          </div>
        </section>
      )}

      {recent.length > 0 && (
        <section className="mt-14">
          <SectionHeading
            eyebrow="Pick up again"
            title="Recently Viewed"
            description="Events you looked at recently."
          />
          <div className="mt-6">
            <EventGrid events={recent} />
          </div>
        </section>
      )}

      <section className="mt-14">
        <SectionHeading
          eyebrow="Explore by track"
          title="Categories"
          description="Jump straight into the space you care about."
        />
        <ul className="mt-6 flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <li key={category}>
              <Link
                to="/events"
                search={{ category }}
                className="inline-flex rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Page>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border px-4 py-3">
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="text-2xl font-bold">{value}</dd>
    </div>
  );
}
