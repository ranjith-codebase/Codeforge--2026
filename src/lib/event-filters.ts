import type { TechEvent } from "@/data/events";

export type SortKey = "date-asc" | "date-desc" | "name-asc" | "name-desc";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "date-asc", label: "Date: Soonest" },
  { value: "date-desc", label: "Date: Latest" },
  { value: "name-asc", label: "Name: A–Z" },
  { value: "name-desc", label: "Name: Z–A" },
];

export const ALL_CATEGORIES = "All Categories";

export function filterAndSortEvents(
  events: readonly TechEvent[],
  { query, category, sort }: { query: string; category: string; sort: SortKey },
): TechEvent[] {
  const q = query.trim().toLowerCase();

  const result = events.filter((event) => {
    const matchesQuery = q === "" || event.name.toLowerCase().includes(q);
    const matchesCategory = category === ALL_CATEGORIES || event.category === category;
    return matchesQuery && matchesCategory;
  });

  return result.sort((a, b) => {
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
