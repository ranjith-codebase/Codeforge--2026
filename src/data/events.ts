export type EventCategory =
  | "Hackathons"
  | "AI / Machine Learning"
  | "Web Development"
  | "App Development"
  | "Cybersecurity"
  | "Data Science"
  | "Cloud Computing"
  | "Competitive Programming"
  | "UI/UX & Design"
  | "Robotics"
  | "Blockchain & Web3"
  | "Workshops";

export type TechEvent = {
  id: string;
  name: string;
  date: string; // ISO date (machine readable)
  category: EventCategory;
  description: string;
  duration: string;
  location: string;
  mode: "On-campus" | "Online" | "Hybrid";
  organizer: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  eligibility: string;
  seats: number;
  tags: string[];
  featured?: boolean;
};

export const CATEGORIES: EventCategory[] = [
  "Hackathons",
  "AI / Machine Learning",
  "Web Development",
  "App Development",
  "Cybersecurity",
  "Data Science",
  "Cloud Computing",
  "Competitive Programming",
  "UI/UX & Design",
  "Robotics",
  "Blockchain & Web3",
  "Workshops",
];

export const EVENTS: readonly TechEvent[] = [
  {
    id: "codesprint-2026",
    name: "CodeSprint 2026",
    date: "2026-09-12",
    category: "Hackathons",
    description:
      "A fast-paced coding challenge where students build practical solutions to real-world problems, with mentor reviews and a final demo round.",
    duration: "36 hours",
    location: "Innovation Block, Main Campus",
    mode: "On-campus",
    organizer: "UpskillOn Community",
    difficulty: "Intermediate",
    eligibility: "Open to all undergraduate students · teams of up to 4",
    seats: 240,
    tags: ["hackathon", "teams", "prototype", "mentors"],
    featured: true,
  },
  {
    id: "ai-nexus",
    name: "AI Nexus",
    date: "2026-09-18",
    category: "AI / Machine Learning",
    description:
      "Explore practical AI and machine-learning concepts through challenges, demonstrations, and hands-on sessions with reviewed notebooks.",
    duration: "2 days",
    location: "Auditorium 2 + AI Lab",
    mode: "Hybrid",
    organizer: "UpskillOn Learning Labs",
    difficulty: "Intermediate",
    eligibility: "Basic Python knowledge recommended",
    seats: 180,
    tags: ["ai", "machine learning", "notebooks", "certificate"],
    featured: true,
  },
  {
    id: "cybershield",
    name: "CyberShield",
    date: "2026-09-27",
    category: "Cybersecurity",
    description:
      "Learn modern cybersecurity concepts and test your problem-solving skills through security-focused capture-the-flag challenges.",
    duration: "8 hours",
    location: "Security Lab, Block C",
    mode: "On-campus",
    organizer: "NullByte Security Circle",
    difficulty: "Advanced",
    eligibility: "Open to all students · solo or duo entries",
    seats: 120,
    tags: ["ctf", "security", "forensics", "scoreboard"],
    featured: true,
  },
  {
    id: "webforge",
    name: "WebForge",
    date: "2026-10-04",
    category: "Web Development",
    description:
      "Build modern web experiences using current frontend technologies, APIs, and responsive design principles, then deploy them live.",
    duration: "1 day",
    location: "Design Studio, Block A",
    mode: "On-campus",
    organizer: "UpskillOn Frontend Guild",
    difficulty: "Beginner",
    eligibility: "Beginner friendly · laptop required",
    seats: 200,
    tags: ["frontend", "responsive", "apis", "deploy"],
    featured: true,
  },
  {
    id: "dataquest",
    name: "DataQuest",
    date: "2026-10-11",
    category: "Data Science",
    description:
      "Analyze datasets, uncover meaningful patterns, and solve practical problems using data-driven thinking and clear storytelling.",
    duration: "10 hours",
    location: "Analytics Lab, Block B",
    mode: "Hybrid",
    organizer: "Data Circle",
    difficulty: "Intermediate",
    eligibility: "Familiarity with spreadsheets or Python helps",
    seats: 150,
    tags: ["datasets", "analytics", "visualisation", "insights"],
  },
  {
    id: "cloudnext",
    name: "CloudNext",
    date: "2026-10-17",
    category: "Cloud Computing",
    description:
      "Discover cloud architecture, deployment workflows, scalable applications, and modern cloud technologies in a sandbox environment.",
    duration: "2 days",
    location: "Online + Lab 7",
    mode: "Online",
    organizer: "CloudOps Guild",
    difficulty: "Intermediate",
    eligibility: "Open to all students · sandbox accounts provided",
    seats: 300,
    tags: ["cloud", "containers", "ci/cd", "devops"],
  },
  {
    id: "appcraft",
    name: "AppCraft",
    date: "2026-10-24",
    category: "App Development",
    description:
      "Design and build mobile application experiences while exploring modern development practices, navigation patterns, and app publishing.",
    duration: "1 day",
    location: "Mobile Lab, Block D",
    mode: "On-campus",
    organizer: "UpskillOn Mobile Guild",
    difficulty: "Beginner",
    eligibility: "Open to all students · Android or iOS device useful",
    seats: 160,
    tags: ["mobile", "android", "ios", "ui"],
  },
  {
    id: "algoarena",
    name: "AlgoArena",
    date: "2026-11-01",
    category: "Competitive Programming",
    description:
      "Challenge your algorithmic thinking with programming problems focused on logic, efficiency, and structured problem solving.",
    duration: "5 hours",
    location: "Online judge",
    mode: "Online",
    organizer: "AlgoSoc",
    difficulty: "Advanced",
    eligibility: "Individual participation · any language allowed",
    seats: 500,
    tags: ["algorithms", "contest", "dsa", "leaderboard"],
  },
  {
    id: "designpulse",
    name: "DesignPulse",
    date: "2026-11-08",
    category: "UI/UX & Design",
    description:
      "Explore user-centered design, interface systems, prototyping, accessibility, and product thinking through a guided design sprint.",
    duration: "1 day",
    location: "Design Studio, Block A",
    mode: "Hybrid",
    organizer: "UpskillOn Design Collective",
    difficulty: "Beginner",
    eligibility: "No design background required",
    seats: 140,
    tags: ["ux", "prototyping", "accessibility", "design systems"],
  },
  {
    id: "roborise",
    name: "RoboRise",
    date: "2026-11-15",
    category: "Robotics",
    description:
      "Explore robotics concepts and solve engineering challenges involving automation, sensors, and intelligent control systems.",
    duration: "2 days",
    location: "Robotics Workshop, Block E",
    mode: "On-campus",
    organizer: "Automation Society",
    difficulty: "Intermediate",
    eligibility: "Teams of 3 · kits provided on site",
    seats: 90,
    tags: ["robotics", "automation", "sensors", "hardware"],
  },
  {
    id: "chainx",
    name: "ChainX",
    date: "2026-11-21",
    category: "Blockchain & Web3",
    description:
      "Explore decentralized technologies, blockchain fundamentals, smart-contract concepts, and practical Web3 application patterns.",
    duration: "1 day",
    location: "Online",
    mode: "Online",
    organizer: "Web3 Builders Chapter",
    difficulty: "Intermediate",
    eligibility: "Basic programming experience recommended",
    seats: 220,
    tags: ["blockchain", "web3", "smart contracts", "decentralised"],
  },
  {
    id: "techlab-live",
    name: "TechLab Live",
    date: "2026-11-28",
    category: "Workshops",
    description:
      "A practical technology workshop series designed to help students learn by building and experimenting with guided instructors.",
    duration: "4 hours weekly",
    location: "Learning Commons",
    mode: "Hybrid",
    organizer: "UpskillOn Learning Labs",
    difficulty: "Beginner",
    eligibility: "Open to every student · walk-ins welcome",
    seats: 350,
    tags: ["workshop", "hands-on", "beginner", "series"],
  },
  {
    id: "devops-runway",
    name: "DevOps Runway",
    date: "2026-12-05",
    category: "Cloud Computing",
    description:
      "Ship a service end to end with pipelines, monitoring, and infrastructure automation while learning reliable release practices.",
    duration: "1 day",
    location: "Online + Lab 7",
    mode: "Hybrid",
    organizer: "CloudOps Guild",
    difficulty: "Advanced",
    eligibility: "Comfortable with Git and the command line",
    seats: 110,
    tags: ["devops", "pipelines", "monitoring", "automation"],
  },
  {
    id: "visionhack",
    name: "VisionHack",
    date: "2026-12-12",
    category: "Hackathons",
    description:
      "A themed computer-vision hackathon where teams build applications that see, interpret, and respond to the world around them.",
    duration: "24 hours",
    location: "Innovation Block, Main Campus",
    mode: "On-campus",
    organizer: "UpskillOn Community",
    difficulty: "Advanced",
    eligibility: "Teams of 2 to 4 · open to all departments",
    seats: 130,
    tags: ["hackathon", "computer vision", "ai", "teams"],
  },
  {
    id: "promptcraft",
    name: "PromptCraft Studio",
    date: "2026-12-19",
    category: "AI / Machine Learning",
    description:
      "A hands-on studio on building useful applications with language models, covering prompting, evaluation, and responsible use.",
    duration: "6 hours",
    location: "Online",
    mode: "Online",
    organizer: "UpskillOn Learning Labs",
    difficulty: "Beginner",
    eligibility: "No prior AI experience needed",
    seats: 400,
    tags: ["llm", "prompting", "ai", "workshop"],
  },
];

export function formatEventDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
