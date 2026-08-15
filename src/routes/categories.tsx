import { Link, createFileRoute } from "@tanstack/react-router";
import { Page, PageHeader } from "@/components/site/page";
import { CATEGORIES, EVENTS } from "@/data/events";

const TITLE = "Browse Categories — UpskillOn";
const DESCRIPTION =
  "Browse hackathons, AI labs, workshops, CTFs and more across every technology category on UpskillOn.";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <Page>
      <PageHeader
        eyebrow="Explore by track"
        title="Categories"
        description="Pick a track and jump straight into the matching events."
      />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((category) => {
          const count = EVENTS.filter((e) => e.category === category).length;
          return (
            <li key={category} className="animate-rise">
              <Link
                to="/events"
                search={{ category }}
                className="surface-card flex h-full flex-col justify-between p-5 transition-transform hover:-translate-y-1"
              >
                <h2 className="text-lg font-bold">{category}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {count} {count === 1 ? "event" : "events"}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </Page>
  );
}
