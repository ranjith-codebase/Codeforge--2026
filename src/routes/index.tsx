import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Highlights } from "@/components/site/highlights";
import { EventsSection } from "@/components/site/events-section";
import { FavoritesSection } from "@/components/site/favorites-section";
import { RegistrationSection } from "@/components/site/registration-section";
import { CommunitySection } from "@/components/site/community-section";
import { useTheme } from "@/hooks/use-theme";
import { useFavorites } from "@/hooks/use-favorites";
import { EventDetailsDialog } from "@/components/site/event-details-dialog";
import type { TechEvent } from "@/data/events";

const TITLE = "CodeForge WebSprint 2026 — Campus Tech Event Portal";
const DESCRIPTION =
  "Discover, save and register for campus hackathons, AI labs, CTFs and cloud bootcamps at CodeForge WebSprint 2026.";

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
  component: Index,
});

function Index() {
  const { theme, toggleTheme } = useTheme();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const [selectedEventId, setSelectedEventId] = useState("");
  const [detailsEvent, setDetailsEvent] = useState<TechEvent | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const formRef = useRef<HTMLFormElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);

  const goToRegistration = (event?: TechEvent) => {
    if (event) setSelectedEventId(event.id);
    window.setTimeout(() => {
      document.getElementById("register")?.scrollIntoView({ behavior: "smooth", block: "start" });
      nameRef.current?.focus({ preventScroll: true });
    }, 60);
  };

  const openDetails = (event: TechEvent) => {
    setDetailsEvent(event);
    setDetailsOpen(true);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground transition-colors duration-300">
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        favoritesCount={favorites.length}
        onRegisterClick={() => goToRegistration()}
      />

      <main>
        <Hero onRegisterClick={() => goToRegistration()} />
        <Highlights onViewDetails={openDetails} />
        <EventsSection
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          onRegister={goToRegistration}
          onViewDetails={openDetails}
        />
        <FavoritesSection
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onRegister={goToRegistration}
          onViewDetails={openDetails}
        />
        <RegistrationSection
          selectedEventId={selectedEventId}
          onSelectedEventChange={setSelectedEventId}
          formRef={formRef}
          nameRef={nameRef}
        />
        <CommunitySection />
      </main>

      <footer className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="min-w-0">
            <p className="font-display text-sm font-bold">CodeForge WebSprint 2026</p>
            <p className="mt-1 text-sm text-muted-foreground">
              A frontend-only student event portal. No accounts, no backend.
            </p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <a className="transition-colors hover:text-foreground" href="#home">
              Home
            </a>
            <a className="transition-colors hover:text-foreground" href="#events">
              Events
            </a>
            <a className="transition-colors hover:text-foreground" href="#favorites">
              Favorites
            </a>
            <a className="transition-colors hover:text-foreground" href="#register">
              Register
            </a>
          </nav>
        </div>
      </footer>

      <EventDetailsDialog
        event={detailsEvent}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        isFavorite={detailsEvent ? isFavorite(detailsEvent.id) : false}
        onToggleFavorite={toggleFavorite}
        onRegister={goToRegistration}
      />
      <Toaster />
    </div>
  );
}
