import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Highlights } from "@/components/site/highlights";
import { CategoriesSection } from "@/components/site/categories-section";
import { EventsSection } from "@/components/site/events-section";
import { FavoritesSection } from "@/components/site/favorites-section";
import { RegistrationSection } from "@/components/site/registration-section";
import { CommunitySection } from "@/components/site/community-section";
import { BrandLockup } from "@/components/site/brand";
import { useTheme } from "@/hooks/use-theme";
import { useFavorites } from "@/hooks/use-favorites";
import { EventDetailsDialog } from "@/components/site/event-details-dialog";
import type { EventCategory, TechEvent } from "@/data/events";
import { ALL_CATEGORIES, DEFAULT_SORT, type SortKey } from "@/lib/event-filters";

const TITLE = "UpskillOn — Discover Tech Events, Hackathons & Workshops";
const DESCRIPTION =
  "UpskillOn helps students discover, save and register for hackathons, AI labs, workshops, CTFs and other technology events.";

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

const FOOTER_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#events", label: "Events" },
  { href: "#categories", label: "Categories" },
  { href: "#favorites", label: "Favorites" },
  { href: "#register", label: "Register" },
];

function Index() {
  const { theme, toggleTheme } = useTheme();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(ALL_CATEGORIES);
  const [sort, setSort] = useState<SortKey>(DEFAULT_SORT);

  const [selectedEventId, setSelectedEventId] = useState("");
  const [detailsEvent, setDetailsEvent] = useState<TechEvent | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const formRef = useRef<HTMLFormElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const goToEvents = () => {
    scrollTo("events");
    window.setTimeout(() => searchRef.current?.focus({ preventScroll: true }), 400);
  };

  const goToRegistration = (event?: TechEvent) => {
    if (event) setSelectedEventId(event.id);
    window.setTimeout(() => {
      scrollTo("register");
      nameRef.current?.focus({ preventScroll: true });
    }, 60);
  };

  const selectCategory = (next: EventCategory) => {
    setCategory(next);
    setQuery("");
    window.setTimeout(() => scrollTo("events"), 40);
  };

  const clearFilters = () => {
    setQuery("");
    setCategory(ALL_CATEGORIES);
    setSort(DEFAULT_SORT);
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
        onExploreClick={goToEvents}
      />

      <main>
        <Hero onExploreClick={goToEvents} />
        <Highlights onViewDetails={openDetails} />
        <CategoriesSection onSelectCategory={selectCategory} />
        <EventsSection
          query={query}
          onQueryChange={setQuery}
          category={category}
          onCategoryChange={setCategory}
          sort={sort}
          onSortChange={setSort}
          onClearFilters={clearFilters}
          searchRef={searchRef}
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

      <footer className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-start">
          <div className="min-w-0">
            <BrandLockup />
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Discover technology events that help you learn, build and grow. Frontend-only student
              project — no accounts, no backend.
            </p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-4 text-sm text-muted-foreground md:justify-end">
            {FOOTER_LINKS.map((link) => (
              <a key={link.href} className="transition-colors hover:text-foreground" href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <p className="mx-auto max-w-6xl px-4 pb-8 text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} UpskillOn. Built for the CodeForge WebSprint 2026 assignment.
        </p>
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
