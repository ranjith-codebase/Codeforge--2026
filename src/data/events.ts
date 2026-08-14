export type EventCategory =
  | "Hackathon"
  | "AI / ML"
  | "Cybersecurity"
  | "Web Development"
  | "Data Science"
  | "Cloud Computing";

export type TechEvent = {
  id: string;
  name: string;
  date: string; // ISO date
  category: EventCategory;
  description: string;
  duration: string;
  location: string;
  mode: "On-campus" | "Online" | "Hybrid";
  organizer: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  seats: number;
  tags: string[];
  highlight?: boolean;
};

export const CATEGORIES: EventCategory[] = [
  "Hackathon",
  "AI / ML",
  "Cybersecurity",
  "Web Development",
  "Data Science",
  "Cloud Computing",
];

export const EVENTS: readonly TechEvent[] = [
  {
    id: "codesprint-2026",
    name: "CodeSprint 2026",
    date: "2026-09-12",
    category: "Hackathon",
    description:
      "A 36-hour flagship hackathon where student teams ship a working product from scratch. Mentors from product companies review your build every six hours and the top three teams pitch on the main stage.",
    duration: "36 hours",
    location: "Innovation Block, Main Campus",
    mode: "On-campus",
    organizer: "CodeForge Student Chapter",
    difficulty: "Intermediate",
    seats: 240,
    tags: ["Team of 4", "Mentors", "Prize pool"],
    highlight: true,
  },
  {
    id: "ai-nexus",
    name: "AI Nexus",
    date: "2026-09-26",
    category: "AI / ML",
    description:
      "A hands-on applied machine learning summit covering transformers, retrieval pipelines and model evaluation. You leave with a deployed mini-project and a reviewed notebook you can put on your resume.",
    duration: "2 days",
    location: "Auditorium 2 + Lab 4",
    mode: "Hybrid",
    organizer: "Department of CSE (AI)",
    difficulty: "Intermediate",
    seats: 180,
    tags: ["Workshop", "Notebooks", "Certificate"],
    highlight: true,
  },
  {
    id: "cybershield",
    name: "CyberShield",
    date: "2026-10-08",
    category: "Cybersecurity",
    description:
      "A capture-the-flag arena with live web exploitation, forensics and reverse engineering tracks. Beginners get a guided warm-up round before the scoreboard opens for the main competition.",
    duration: "8 hours",
    location: "Security Lab, Block C",
    mode: "On-campus",
    organizer: "NullByte Security Club",
    difficulty: "Advanced",
    seats: 120,
    tags: ["CTF", "Live scoreboard", "Solo or duo"],
    highlight: true,
  },
  {
    id: "webforge",
    name: "WebForge",
    date: "2026-10-22",
    category: "Web Development",
    description:
      "Build and ship a production-grade responsive interface in a single day. Sessions cover design systems, accessibility, performance budgets and deploying to the edge with a real domain.",
    duration: "1 day",
    location: "Design Studio, Block A",
    mode: "On-campus",
    organizer: "CodeForge WebSprint",
    difficulty: "Beginner",
    seats: 200,
    tags: ["Accessibility", "Design systems", "Deploy"],
  },
  {
    id: "dataquest",
    name: "DataQuest",
    date: "2026-11-05",
    category: "Data Science",
    description:
      "A data storytelling challenge on real civic datasets. Clean, model and visualise messy data, then defend your insight in a five-minute panel review judged by analytics professionals.",
    duration: "10 hours",
    location: "Analytics Lab, Block B",
    mode: "Hybrid",
    organizer: "Data Circle",
    difficulty: "Intermediate",
    seats: 150,
    tags: ["Datasets", "Visualisation", "Panel review"],
  },
  {
    id: "cloudnext",
    name: "CloudNext",
    date: "2026-11-19",
    category: "Cloud Computing",
    description:
      "A practical cloud engineering bootcamp on containers, CI/CD pipelines and cost-aware architecture. Every attendee provisions and tears down a full deployment on a sandbox account.",
    duration: "2 days",
    location: "Online + Lab 7",
    mode: "Online",
    organizer: "CloudOps Guild",
    difficulty: "Intermediate",
    seats: 300,
    tags: ["Containers", "CI/CD", "Sandbox"],
  },
];

export function formatEventDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
