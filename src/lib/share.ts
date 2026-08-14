import type { TechEvent } from "@/data/events";

type Notify = { success: (msg: string) => void; error: (msg: string) => void };

export async function shareEvent(event: TechEvent, notify: Notify) {
  const url = `${window.location.origin}${window.location.pathname}#events`;
  const shareData = {
    title: `${event.name} — CodeForge WebSprint 2026`,
    text: `Check out ${event.name} (${event.category}) at CodeForge WebSprint 2026.`,
    url,
  };

  try {
    if (typeof navigator !== "undefined" && navigator.share) {
      await navigator.share(shareData);
      return;
    }
    await navigator.clipboard.writeText(`${shareData.text} ${url}`);
    notify.success("Link copied");
  } catch {
    notify.error("Could not share this event");
  }
}
