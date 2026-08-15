import { createFileRoute } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { EventGrid } from "@/components/site/event-card";
import { EmptyState, Page, PageHeader } from "@/components/site/page";
import { useApp } from "@/hooks/use-app";
import { getEvents } from "@/lib/event-utils";

const TITLE = "Saved Events — UpskillOn";
const DESCRIPTION = "Your shortlist of saved hackathons, workshops and technology events.";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { favorites } = useApp();
  const saved = getEvents(favorites);

  return (
    <Page>
      <PageHeader
        eyebrow="Your shortlist"
        title="Saved Events"
        description="Everything you've saved, ready when you are."
      />
      <div className="mt-8">
        {saved.length > 0 ? (
          <EventGrid events={saved} />
        ) : (
          <EmptyState
            icon={<Heart className="size-5 text-muted-foreground" aria-hidden />}
            title="No saved events yet."
            description="Tap Save on any event to build your personal shortlist."
          />
        )}
      </div>
    </Page>
  );
}
