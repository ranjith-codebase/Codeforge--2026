import type { TechEvent } from "@/data/events";

export type SortKey = "date-asc" | "date-desc" | "name-asc" | "name-desc";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "date-asc", label: "Date — Soonest" },
  { value: "date-desc", label: "Date — Latest" },
  { value: "name-asc", label: "Name — A–Z" },
  { value: "name-desc", label: "Name — Z–A" },
];

export const ALL_CATEGORIES = "All Categories";
export const ALL_MODES = "All Modes";
export const MODES = ["On-campus", "Online", "Hybrid"] as const;
export const DEFAULT_SORT: SortKey = "date-asc";

function matchesQuery(event: TechEvent, q: string) {
  if (q === "") return true;
  return (
    event.name.toLowerCase().includes(q) ||
    event.description.toLowerCase().includes(q) ||
    event.category.toLowerCase().includes(q) ||
    event.tags.some((tag) => tag.toLowerCase().includes(q))
  );
}

export function filterAndSortEvents(
  events: readonly TechEvent[],
  {
    query,
    category,
    sort,
    mode = ALL_MODES,
  }: { query: string; category: string; sort: SortKey; mode?: string },
): TechEvent[] {
  const q = query.trim().toLowerCase();

  const result = events.filter(
    (event) =>
      matchesQuery(event, q) &&
      (category === ALL_CATEGORIES || event.category === category) &&
      (mode === ALL_MODES || event.mode === mode),
  );

  return [...result].sort((a, b) => {
    switch (sort) {
      case "date-desc":
        return b.date.localeCompare(a.date);
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return a.date.localeCompare(b.date);
    }
  });
}
