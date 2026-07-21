export type Program = {
  slug: string;
  set: string;
  title: string;
  audience: string;
  summary: string;
  focus: string[];
  duration: string;
};

export const programs: Program[] = [
  {
    slug: "mens-strength",
    set: "SET 01",
    title: "Men's Strength",
    audience: "Men",
    summary:
      "Progressive barbell and compound-lift programming built around the big four lifts, with structured deload weeks.",
    focus: ["Squat / bench / deadlift", "Hypertrophy blocks", "Mobility resets"],
    duration: "12-week cycles",
  },
  {
    slug: "womens-strength",
    set: "SET 02",
    title: "Women's Strength & Toning",
    audience: "Women",
    summary:
      "Full-body resistance training designed around real schedules  -  builds strength without a bulky, generic template.",
    focus: ["Glute & posterior chain", "Core stability", "Progressive overload"],
    duration: "8-week cycles",
  },
  {
    slug: "weight-loss",
    set: "SET 03",
    title: "Weight-Loss Reset",
    audience: "All adults",
    summary:
      "Metabolic conditioning paired with a food framework that fits a Nairobi kitchen, not a meal-kit fantasy.",
    focus: ["Conditioning circuits", "Habit-based nutrition", "Weekly check-ins"],
    duration: "6-week reset",
  },
  {
    slug: "youth-athletic",
    set: "SET 04",
    title: "Youth Athletic Development",
    audience: "Ages 13-18",
    summary:
      "Bodyweight-first strength and speed mechanics for teens preparing for school sport or club trials.",
    focus: ["Movement fundamentals", "Speed & agility", "Injury-proofing"],
    duration: "10-week terms",
  },
  {
    slug: "kids-active",
    set: "SET 05",
    title: "Active Kids",
    audience: "Ages 6-12",
    summary:
      "Games-based coordination and confidence building. No barbells  -  just movement literacy, done playfully.",
    focus: ["Coordination games", "Balance & agility", "Team play"],
    duration: "Ongoing, Sat sessions",
  },
];

export type Video = {
  slug: string;
  title: string;
  category: string;
  length: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All levels";
  description: string;
};

export const videos: Video[] = [
  {
    slug: "daily-mobility-flow",
    title: "10-Minute Daily Mobility Flow",
    category: "Recovery",
    length: "10:24",
    level: "All levels",
    description: "A joint-by-joint warm-up sequence to run before any session.",
  },
  {
    slug: "lower-body-strength",
    title: "Lower-Body Strength Foundations",
    category: "Strength",
    length: "24:10",
    level: "Beginner",
    description: "Squat and hinge patterning with bodyweight and dumbbell options.",
  },
  {
    slug: "hiit-fat-burn",
    title: "20-Minute HIIT Fat-Burn Circuit",
    category: "Weight loss",
    length: "20:00",
    level: "Intermediate",
    description: "Four rounds, no equipment, built for the living room.",
  },
  {
    slug: "core-stability",
    title: "Core & Spine Stability",
    category: "Strength",
    length: "15:40",
    level: "All levels",
    description: "Anti-rotation and bracing drills to protect the lower back.",
  },
  {
    slug: "teen-speed-mechanics",
    title: "Teen Speed & Agility Mechanics",
    category: "Youth",
    length: "18:15",
    level: "Intermediate",
    description: "Sprint drills and change-of-direction work for school athletes.",
  },
  {
    slug: "kids-obstacle-play",
    title: "Kids Obstacle & Balance Play",
    category: "Children",
    length: "12:30",
    level: "Beginner",
    description: "A living-room-safe obstacle circuit for ages 6-12.",
  },
];

export type Ebook = {
  slug: string;
  title: string;
  price: string;
  format: string;
  description: string;
  gumroadUrl: string;
  cover?: string;
  priceKes?: number; // set this to show a "Pay with M-Pesa" option
};

export const ebooks: Ebook[] = [
  {
    slug: "muscle-building-blueprint",
    title: "The Ultimate Muscle Building Blueprint",
    price: "$9.99",
    format: "PDF - 132 pages",
    description:
      "A complete muscle-building program covering training principles, nutrition strategy, and recovery, with a 12-week planner and printable progress trackers included.",
    gumroadUrl: "https://3593509157637.gumroad.com/l/uwzrtn",
    cover: "/images/ebooks/muscle-building-blueprint.jpg",
    priceKes: 1300,
  },
  {
    slug: "90-day-weight-loss-kit",
    title: "90-Day Weight Loss Transformation Kit",
    price: "$15",
    format: "PDF - Instant download",
    description:
      "A structured 90-day weight-loss program with step-by-step workouts, nutrition guidance, and printable trackers to stay consistent.",
    gumroadUrl: "https://3593509157637.gumroad.com/l/phvdq",
    cover: "/images/ebooks/90-day-weight-loss-kit.jpg",
    priceKes: 2000,
  },
  {
    slug: "home-workout-blueprint",
    title: "The Ultimate Home Workout Blueprint",
    price: "$9.99",
    format: "PDF - 150+ pages",
    description:
      "A complete 90-day home workout program covering bodyweight and resistance-band training, cardio, mobility, and recovery, with printable planners and trackers included.",
    gumroadUrl: "https://3593509157637.gumroad.com/l/ocmtqj",
    cover: "/images/ebooks/home-workout-blueprint.jpg",
    priceKes: 1300,
  },
  {
    slug: "healthy-meal-planning-blueprint",
    title: "The Ultimate Healthy Meal Planning Blueprint",
    price: "$9.99",
    format: "PDF - 135+ pages",
    description:
      "A practical guide to planning balanced meals, understanding portion sizes, and building sustainable healthy eating habits, with printable meal planners and trackers included.",
    gumroadUrl: "https://3593509157637.gumroad.com/l/avrgdu",
    cover: "/images/ebooks/healthy-meal-planning-blueprint.jpg",
    priceKes: 1300,
  },
  {
    slug: "basketball-conditioning-blueprint",
    title: "The Ultimate Basketball Conditioning Blueprint",
    price: "$9.99",
    format: "PDF - 126 pages",
    description:
      "A 90-day basketball-specific conditioning program covering strength, speed, vertical jump, endurance, and injury prevention, with printable training planners and trackers included.",
    gumroadUrl: "https://3593509157637.gumroad.com/l/dxbbx",
    cover: "/images/ebooks/basketball-conditioning-blueprint.jpg",
    priceKes: 1300,
  },
];

export type EquipmentItem = {
  slug: string;
  title: string;
  price: string;
  description: string;
  category: string;
};

export const equipment: EquipmentItem[] = [
  {
    slug: "resistance-band-set",
    title: "Resistance Band Set (5-piece)",
    price: "KES 2,800",
    description: "Graduated resistance bands for strength, mobility and rehab work.",
    category: "Bands",
  },
  {
    slug: "adjustable-dumbbells",
    title: "Adjustable Dumbbell Pair (2-20kg)",
    price: "KES 14,500",
    description: "Space-saving dumbbells that scale as your strength grows.",
    category: "Weights",
  },
  {
    slug: "yoga-mat-pro",
    title: "Pro Training Mat",
    price: "KES 3,200",
    description: "14mm cushioned mat for mobility, core work and youth sessions.",
    category: "Accessories",
  },
  {
    slug: "kettlebell-12kg",
    title: "Cast-Iron Kettlebell (12kg)",
    price: "KES 6,000",
    description: "A versatile single unit for conditioning and posterior-chain work.",
    category: "Weights",
  },
  {
    slug: "jump-rope",
    title: "Speed Jump Rope",
    price: "KES 1,400",
    description: "Ball-bearing rope for HIIT circuits and youth conditioning drills.",
    category: "Accessories",
  },
  {
    slug: "agility-ladder",
    title: "Agility Ladder + Cones",
    price: "KES 3,500",
    description: "Footwork ladder and 6 cones  -  built for the teen speed program.",
    category: "Youth",
  },
];

export const stats = [
  { value: "480+", label: "Clients coached" },
  { value: "12,600", label: "Sessions logged" },
  { value: "36", label: "Programs written" },
  { value: "9", label: "Years coaching" },
  { value: "6", label: "Age groups served" },
];

export const testimonials = [
  {
    quote:
      "I went from struggling with a flight of stairs to finishing my first 10K. The check-ins kept me honest.",
    name: "Wanjiru K.",
    program: "Weight-Loss Reset",
  },
  {
    quote:
      "My son looks forward to Saturday sessions more than anything else in his week. He's stronger and far more coordinated.",
    name: "David M.",
    program: "Active Kids parent",
  },
  {
    quote:
      "Twelve weeks in and my squat is up 30kg. The programming actually respects recovery, which most templates don't.",
    name: "Brian O.",
    program: "Men's Strength",
  },
];
