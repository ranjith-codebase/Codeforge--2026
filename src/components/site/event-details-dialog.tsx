import { CalendarDays, Clock, GraduationCap, Heart, MapPin, Share2, Signal, Users } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatEventDate, type TechEvent } from "@/data/events";
import { shareEvent } from "@/lib/share";
import { cn } from "@/lib/utils";

type Props = {
  event: TechEvent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onRegister: (event: TechEvent) => void;
};

export function EventDetailsDialog({
  event,
  open,
  onOpenChange,
  isFavorite,
  onToggleFavorite,
  onRegister,
}: Props) {
  if (!event) return null;

  const meta = [
    { icon: CalendarDays, label: "Date", value: formatEventDate(event.date) },
    { icon: Clock, label: "Duration", value: event.duration },
    { icon: MapPin, label: "Venue", value: `${event.location} · ${event.mode}` },
    { icon: Users, label: "Seats", value: `${event.seats} available` },
    { icon: Signal, label: "Level", value: event.difficulty },
    { icon: GraduationCap, label: "Eligibility", value: event.eligibility },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <span className="w-fit rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold">
            {event.category}
          </span>
          <DialogTitle className="text-left text-2xl">{event.name}</DialogTitle>
          <DialogDescription className="text-left">Organised by {event.organizer}</DialogDescription>
        </DialogHeader>

        <p className="text-sm leading-relaxed text-muted-foreground">{event.description}</p>

        <dl className="grid gap-3 sm:grid-cols-2">
          {meta.map((item) => (
            <div key={item.label} className="flex min-w-0 items-start gap-2 rounded-lg bg-secondary p-3">
              <item.icon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <div className="min-w-0">
                <dt className="text-xs text-muted-foreground">{item.label}</dt>
                <dd className="text-sm font-medium">{item.value}</dd>
              </div>
            </div>
          ))}
        </dl>

        <ul className="flex flex-wrap gap-2">
          {event.tags.map((tag) => (
            <li key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
              {tag}
            </li>
          ))}
        </ul>

        <DialogFooter className="gap-2 sm:justify-start">
          <Button
            onClick={() => {
              onRegister(event);
              onOpenChange(false);
            }}
          >
            Register
          </Button>
          <Button variant="outline" onClick={() => onToggleFavorite(event.id)} aria-pressed={isFavorite}>
            <Heart className={cn("size-4", isFavorite && "fill-current text-destructive")} aria-hidden />
            {isFavorite ? "Saved" : "Save"}
          </Button>
          <Button variant="ghost" onClick={() => shareEvent(event, toast)}>
            <Share2 className="size-4" aria-hidden />
            Share Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
