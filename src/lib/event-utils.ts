import { EVENTS, type TechEvent } from "@/data/events";

export function getEvent(id: string): TechEvent | undefined {
  return EVENTS.find((event) => event.id === id);
}

export function getEvents(ids: readonly string[]): TechEvent[] {
  return ids.map((id) => getEvent(id)).filter((event): event is TechEvent => Boolean(event));
}

/** Registration closes one week before the event begins. */
export function registrationDeadline(event: TechEvent): Date {
  const date = new Date(`${event.date}T00:00:00`);
  date.setDate(date.getDate() - 7);
  return date;
}

export function formatDate(value: Date | string) {
  const date = typeof value === "string" ? new Date(`${value}T00:00:00`) : value;
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function daysUntilDeadline(event: TechEvent): number | null {
  const deadline = registrationDeadline(event);
  const diff = Math.ceil((deadline.getTime() - Date.now()) / 86_400_000);
  return Number.isFinite(diff) ? diff : null;
}

export function relatedEvents(event: TechEvent, limit = 3): TechEvent[] {
  const sameCategory = EVENTS.filter((e) => e.id !== event.id && e.category === event.category);
  const rest = EVENTS.filter(
    (e) => e.id !== event.id && e.category !== event.category && e.tags.some((t) => event.tags.includes(t)),
  );
  return [...sameCategory, ...rest].slice(0, limit);
}

export function recommendedEvents(interests: readonly string[], limit = 3): TechEvent[] {
  if (interests.length === 0) return [];
  return EVENTS.filter((event) =>
    interests.some(
      (interest) =>
        event.category.toLowerCase().includes(interest.toLowerCase()) ||
        interest.toLowerCase().includes(event.category.toLowerCase()) ||
        event.tags.some((tag) => tag.toLowerCase() === interest.toLowerCase()),
    ),
  ).slice(0, limit);
}

export const INTEREST_OPTIONS = [
  "AI / Machine Learning",
  "Web Development",
  "Cybersecurity",
  "Data Science",
  "Cloud Computing",
  "Hackathons",
  "UI/UX & Design",
  "App Development",
] as const;
