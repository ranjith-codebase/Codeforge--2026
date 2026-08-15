import { Link, createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Page, PageHeader } from "@/components/site/page";
import { CATEGORIES, EVENTS } from "@/data/events";

const TITLE = "About UpskillOn — Technology Event Discovery";
const DESCRIPTION =
  "UpskillOn brings hackathons, workshops, AI labs and developer meetups together in one discovery platform.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  {
    title: "Discovery first",
    body: "Real-time search, category tracks and smart sorting so the right event surfaces in seconds.",
  },
  {
    title: "Built for learners",
    body: "Every listing carries the details that matter: level, mode, eligibility, prizes and deadlines.",
  },
  {
    title: "Your shortlist, your pace",
    body: "Save events, track registrations and pick up exactly where you left off on any device.",
  },
];

function AboutPage() {
  return (
    <Page>
      <PageHeader
        eyebrow="About"
        title="Where builders find their next challenge"
        description="UpskillOn curates technology events so students and early-career developers can learn, build and connect."
      />

      <dl className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat label="Curated events" value={`${EVENTS.length}+`} />
        <Stat label="Technology tracks" value={`${CATEGORIES.length}`} />
        <Stat label="Cities & online" value="Nationwide" />
      </dl>

      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {VALUES.map((value) => (
          <li key={value.title} className="surface-card animate-rise p-5">
            <h2 className="text-lg font-bold">{value.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{value.body}</p>
          </li>
        ))}
      </ul>

      <div className="surface-card mt-8 flex flex-col items-center px-6 py-12 text-center">
        <h2 className="text-2xl font-bold">Ready to find your next event?</h2>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Browse every track, save what excites you and register in a couple of taps.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button asChild>
            <Link to="/events">Explore Events</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/signup">Create an account</Link>
          </Button>
        </div>
      </div>
    </Page>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface-card p-5">
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-2xl font-bold">{value}</dd>
    </div>
  );
}
