import { useState, type FormEvent } from "react";
import { CheckCircle2, Share2 } from "lucide-react";
import { toast } from "sonner";
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
import { Reveal, SectionHeading } from "@/components/site/section";
import { EVENTS } from "@/data/events";
import { STORAGE_KEYS, readStorage, writeStorage } from "@/lib/storage";
import { shareEvent } from "@/lib/share";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<"name" | "email" | "college" | "eventId", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: { name: string; email: string; college: string; eventId: string }): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your full name.";
  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = "Enter a valid email, e.g. you@college.edu.";
  if (!values.college.trim()) errors.college = "Please enter your college or institution.";
  if (!values.eventId) errors.eventId = "Please choose an event.";
  return errors;
}

type Props = {
  selectedEventId: string;
  onSelectedEventChange: (id: string) => void;
  formRef: React.RefObject<HTMLFormElement | null>;
  nameRef: React.RefObject<HTMLInputElement | null>;
};

export function RegistrationSection({
  selectedEventId,
  onSelectedEventChange,
  formRef,
  nameRef,
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [registeredEvent, setRegisteredEvent] = useState<string | null>(null);

  const selectedEvent = EVENTS.find((event) => event.id === selectedEventId) ?? null;
  const successEvent = EVENTS.find((event) => event.id === registeredEvent) ?? null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = { name, email, college, eventId: selectedEventId };
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    setSubmitting(true);
    window.setTimeout(() => {
      const stored = readStorage<unknown[]>(STORAGE_KEYS.registrations, []);
      const history = Array.isArray(stored) ? stored : [];
      writeStorage(STORAGE_KEYS.registrations, [
        ...history,
        { eventId: selectedEventId, at: new Date().toISOString() },
      ]);
      setRegisteredEvent(selectedEventId);
      setSubmitting(false);
      setName("");
      setEmail("");
      setCollege("");
    }, 450);
  };

  const resetForm = () => {
    setRegisteredEvent(null);
    setErrors({});
    onSelectedEventChange("");
  };

  return (
    <section id="register" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
          <Reveal>
            <SectionHeading
              eyebrow="Registration"
              title="Grab your seat"
              description="Fill in four details and you're in. This is a frontend demo — nothing is sent to a server."
            />
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              {[
                "Pick any event from the catalogue or your shortlist.",
                "Instant inline validation, no surprise errors.",
                "Your confirmation stays on this device only.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="surface-card p-5 sm:p-7">
            {successEvent ? (
              <div className="animate-rise text-center">
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-success/15">
                  <CheckCircle2 className="size-7 text-success" aria-hidden />
                </span>
                <h3 className="mt-4 text-2xl font-bold">Registration Successful</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  You're registered for {successEvent.name}.
                </p>
                <p className="mt-4 text-sm font-medium">Know someone who'd love this event?</p>
                <div className="mt-4 flex flex-col justify-center gap-2 sm:flex-row">
                  <Button asChild onClick={resetForm}>
                    <a href="#events">Explore More Events</a>
                  </Button>
                  <Button variant="outline" onClick={() => shareEvent(successEvent, toast)}>
                    <Share2 className="size-4" aria-hidden />
                    Share Event
                  </Button>
                </div>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
                <Field id="reg-name" label="Full Name" error={errors.name}>
                  <Input
                    id="reg-name"
                    ref={nameRef}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Aarav Sharma"
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "reg-name-error" : undefined}
                    className={cn("h-11", errors.name && "border-destructive")}
                  />
                </Field>

                <Field id="reg-email" label="Email" error={errors.email}>
                  <Input
                    id="reg-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@college.edu"
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "reg-email-error" : undefined}
                    className={cn("h-11", errors.email && "border-destructive")}
                  />
                </Field>

                <Field id="reg-college" label="College / Institution" error={errors.college}>
                  <Input
                    id="reg-college"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="MG University, Kottayam"
                    autoComplete="organization"
                    aria-invalid={Boolean(errors.college)}
                    aria-describedby={errors.college ? "reg-college-error" : undefined}
                    className={cn("h-11", errors.college && "border-destructive")}
                  />
                </Field>

                <Field id="reg-event" label="Event Selection" error={errors.eventId}>
                  <Select value={selectedEventId} onValueChange={onSelectedEventChange}>
                    <SelectTrigger
                      id="reg-event"
                      aria-invalid={Boolean(errors.eventId)}
                      aria-describedby={errors.eventId ? "reg-event-error" : undefined}
                      className={cn("h-11 w-full", errors.eventId && "border-destructive")}
                    >
                      <SelectValue placeholder="Choose an event" />
                    </SelectTrigger>
                    <SelectContent>
                      {EVENTS.map((event) => (
                        <SelectItem key={event.id} value={event.id}>
                          {event.name} · {event.category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                  {submitting ? "Confirming…" : "Complete Registration"}
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  {selectedEvent
                    ? `You're registering for ${selectedEvent.name}.`
                    : "Frontend demo — no data leaves your browser."}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id} className="mb-1.5">
        {label}
      </Label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
