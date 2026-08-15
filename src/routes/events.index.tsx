import { useMemo } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
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
import { EventGrid } from "@/components/site/event-card";
import { EmptyState, Page, PageHeader } from "@/components/site/page";
import { CATEGORIES, EVENTS } from "@/data/events";
import {
  ALL_CATEGORIES,
  ALL_MODES,
  DEFAULT_SORT,
  MODES,
  SORT_OPTIONS,
  filterAndSortEvents,
  type SortKey,
} from "@/lib/event-filters";

const TITLE = "Explore Events — UpskillOn";
const DESCRIPTION =
  "Search, filter and sort hackathons, workshops, competitions and technology experiences on UpskillOn.";

type EventSearch = { q: string; category: string; mode: string; sort: SortKey };

export const Route = createFileRoute("/events/")({
  validateSearch: (search: Record<string, unknown>): EventSearch => ({
    q: typeof search["q"] === "string" ? search["q"] : "",
    category: typeof search["category"] === "string" ? search["category"] : ALL_CATEGORIES,
    mode: typeof search["mode"] === "string" ? search["mode"] : ALL_MODES,
    sort: SORT_OPTIONS.some((o) => o.value === search["sort"])
      ? (search["sort"] as SortKey)
      : DEFAULT_SORT,
  }),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  const { q, category, mode, sort } = Route.useSearch();
  const navigate = useNavigate({ from: "/events" });

  const setSearch = (patch: Partial<EventSearch>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true });

  const visible = useMemo(
    () => filterAndSortEvents(EVENTS, { query: q, category, sort, mode }),
    [q, category, sort, mode],
  );

  return (
    <Page>
      <PageHeader
        eyebrow="Discover"
        title="Explore Events"
        description="Find challenges, competitions, workshops and technology experiences worth your time."
      />

      <div className="surface-card mt-8 grid gap-4 p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_200px_170px_190px]">
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
              type="search"
              value={q}
              onChange={(e) => setSearch({ q: e.target.value })}
              placeholder="Search events, hackathons, workshops..."
              className="h-11 pl-9"
            />
          </div>
        </div>

        <div className="min-w-0">
          <Label htmlFor="event-category" className="mb-1.5 text-xs text-muted-foreground">
            Category
          </Label>
          <Select value={category} onValueChange={(v) => setSearch({ category: v })}>
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
          <Label htmlFor="event-mode" className="mb-1.5 text-xs text-muted-foreground">
            Mode
          </Label>
          <Select value={mode} onValueChange={(v) => setSearch({ mode: v })}>
            <SelectTrigger id="event-mode" className="h-11 w-full">
              <SelectValue placeholder={ALL_MODES} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_MODES}>{ALL_MODES}</SelectItem>
              {MODES.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="min-w-0">
          <Label htmlFor="event-sort" className="mb-1.5 text-xs text-muted-foreground">
            Sort by
          </Label>
          <Select value={sort} onValueChange={(v) => setSearch({ sort: v as SortKey })}>
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
          Showing {visible.length} of {EVENTS.length} events
          {category !== ALL_CATEGORIES && <> · {category}</>}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            setSearch({ q: "", category: ALL_CATEGORIES, mode: ALL_MODES, sort: DEFAULT_SORT })
          }
        >
          <SlidersHorizontal className="size-4" aria-hidden />
          Clear Filters
        </Button>
      </div>

      <div className="mt-6">
        {visible.length > 0 ? (
          <EventGrid events={visible} />
        ) : (
          <EmptyState
            title="No events found."
            description="Try another search term or adjust your filters."
            ctaLabel="Browse all events"
          />
        )}
      </div>
    </Page>
  );
}
