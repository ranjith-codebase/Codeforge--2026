import { useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EventCard } from "@/components/site/event-card";
import { Reveal, SectionHeading } from "@/components/site/section";
import { CATEGORIES, EVENTS, type TechEvent } from "@/data/events";
import { ALL_CATEGORIES, SORT_OPTIONS, filterAndSortEvents, type SortKey } from "@/lib/event-filters";

type Props = {
  query: string;
  onQueryChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  sort: SortKey;
  onSortChange: (value: SortKey) => void;
  onClearFilters: () => void;
  searchRef: React.RefObject<HTMLInputElement | null>;
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
  onRegister: (event: TechEvent) => void;
  onViewDetails: (event: TechEvent) => void;
};

export function EventsSection({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  sort,
  onSortChange,
  onClearFilters,
  searchRef,
  isFavorite,
  onToggleFavorite,
  onRegister,
  onViewDetails,
}: Props) {
  const visibleEvents = useMemo(
    () => filterAndSortEvents(EVENTS, { query, category, sort }),
    [query, category, sort],
  );

  return (
    <section id="events" className="border-b border-border bg-elevated">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Explore events"
            title="Find your next tech event"
            description="Search by name, keyword or track, narrow by category and sort the results. Everything updates instantly."
          />
        </Reveal>

        <div className="surface-card mt-8 grid gap-4 p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_220px_180px]">
          <div className="min-w-0">
            <Label htmlFor="event-search" className="mb-1.5 text-xs text-muted-foreground">
              Search
            </Label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                id="event-search"
                ref={searchRef}
                type="search"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Search events, hackathons, workshops..."
                className="h-11 pl-9"
              />
            </div>
          </div>

          <div className="min-w-0">
            <Label htmlFor="event-category" className="mb-1.5 text-xs text-muted-foreground">
              Category
            </Label>
            <Select value={category} onValueChange={onCategoryChange}>
              <SelectTrigger id="event-category" className="h-11 w-full">
                <SelectValue placeholder={ALL_CATEGORIES} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_CATEGORIES}>{ALL_CATEGORIES}</SelectItem>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="min-w-0">
            <Label htmlFor="event-sort" className="mb-1.5 text-xs text-muted-foreground">
              Sort by
            </Label>
            <Select value={sort} onValueChange={(v) => onSortChange(v as SortKey)}>
              <SelectTrigger id="event-sort" className="h-11 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p aria-live="polite" className="text-sm text-muted-foreground">
            Showing {visibleEvents.length} of {EVENTS.length} events
            {category !== ALL_CATEGORIES && <> · {category}</>}
          </p>
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            <SlidersHorizontal className="size-4" aria-hidden />
            Clear Filters
          </Button>
        </div>

        {visibleEvents.length > 0 ? (
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleEvents.map((event) => (
              <li key={event.id} className="animate-rise">
                <EventCard
                  event={event}
                  isFavorite={isFavorite(event.id)}
                  onToggleFavorite={onToggleFavorite}
                  onRegister={onRegister}
                  onViewDetails={onViewDetails}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="surface-card mt-6 flex flex-col items-center px-6 py-14 text-center">
            <h3 className="text-lg font-bold">No events found</h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Try another search term or adjust your filters.
            </p>
            <Button className="mt-5" onClick={onClearFilters}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
