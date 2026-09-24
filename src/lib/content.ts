import {
  Award,
  BarChart3,
  BookMarked,
  BookOpen,
  Bot,
  Briefcase,
  Building2,
  CalendarCheck,
  CircleDollarSign,
  CircleHelp,
  Clock,
  ClipboardCheck,
  ClipboardList,
  Crosshair,
  Ellipsis,
  Crown,
  FileText,
  Globe2,
  GraduationCap,
  Headphones,
  Home,
  HeartPulse,
  LibraryBig,
  Lightbulb,
  Mic,
  MessageCircle,
  MonitorSmartphone,
  PenLine,
  Plane,
  Presentation,
  Rocket,
  ScanSearch,
  School,
  Search,
  ShieldCheck,
  Star,
  Target,
  ThumbsUp,
  TrendingUp,
  Trophy,
  Video,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

export const SITE_NAME = "Skill Zone";
export const WHATSAPP_URL = "https://wa.me/923032223111";
export const PHONE_DISPLAY = "+92-303 222 3111";
export const ADDRESS = "Lahore, Pakistan";

/** Full site map — used in the footer. */
export const NAV_LINKS = [
  { label: "Achievements", href: "#achievements" },
  { label: "Why Choose Us", href: "#why-choose" },
  { label: "Road Map", href: "#roadmap" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "How We Differ", href: "#how-we-differ" },
  { label: "Fees & Packages", href: "#fees-packages" },
  { label: "Support", href: "#support" },
] as const;

/** Trimmed set shown in the header — only the essentials. */
export const HEADER_NAV_LINKS = [
  { label: "Why Choose Us", href: "#why-choose" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "How We Differ", href: "#how-we-differ" },
  { label: "Fees & Packages", href: "#fees-packages" },
  { label: "Support", href: "#support" },
] as const;

/** Replace with your PTE demo class YouTube video ID (the part after v= in the URL). */
export const YOUTUBE_DEMO_VIDEO_ID = "QXsOQPIQeIk";
/** Complete video guide in the Secret Formula section — use a different video from the demo class. */
export const YOUTUBE_GUIDE_VIDEO_ID = "Gw5T8FDGngw";
/** Live student feedback video shown below the Testimonials section. */
export const YOUTUBE_LIVE_FEEDBACK_VIDEO_ID = "axSYfO0O9Ok";
export const YOUTUBE_DEMO_WATCH_URL = "https://www.youtube.com/@internationalskillzone";

export const DEMO_CLASS_RIBBON = "See. Learn. Decide with Confidence.";
export const DEMO_CLASS_DESCRIPTION =
  "Before joining our course, we recommend you watch our FREE Demo Class on YouTube. Check our teaching style, content quality, and the way we help students achieve their goals.";

export type DemoClassFeature = {
  icon: LucideIcon;
  label: string;
  circle: string;
};

export const DEMO_CLASS_FEATURES: DemoClassFeature[] = [
  { icon: Presentation, label: "See Our Real Teaching Style", circle: "bg-emerald-500" },
  { icon: BookOpen, label: "Understand Our Explanation & Content Quality", circle: "bg-violet-500" },
  { icon: Target, label: "Exam-Oriented Strategies & Techniques", circle: "bg-orange-500" },
  { icon: Lightbulb, label: "Tips & Tricks for High Score", circle: "bg-rose-500" },
  { icon: MessageCircle, label: "Interactive Teaching Approach", circle: "bg-teal-500" },
  { icon: ThumbsUp, label: "Student Feedback & Success Stories", circle: "bg-amber-500" },
];

export type SecretFormulaLearnItem = {
  icon: LucideIcon;
  label: string;
  iconBg: string;
};

export const SECRET_FORMULA_LEARN_ITEMS: SecretFormulaLearnItem[] = [
  { icon: Target, label: "The 90/90 Secret Formula", iconBg: "bg-rose-500" },
  { icon: Presentation, label: "How We Teach & Train", iconBg: "bg-blue-600" },
  { icon: BookOpen, label: "Complete Course & Study Plan", iconBg: "bg-emerald-500" },
  { icon: CircleDollarSign, label: "Fees & Course Plans", iconBg: "bg-violet-500" },
  { icon: Clock, label: "Class Timings & Schedule", iconBg: "bg-orange-500" },
  { icon: Rocket, label: "How to Achieve Your Target Score", iconBg: "bg-blue-500" },
  { icon: CircleHelp, label: "Q&A — All Your Doubts Cleared", iconBg: "bg-rose-400" },
];

export type SecretFormulaStep = {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconBg: string;
};

export const SECRET_FORMULA_STEPS: SecretFormulaStep[] = [
  {
    step: "01",
    title: "Watch",
    description: "Our Complete Video Guide",
    icon: Presentation,
    iconBg: "bg-rose-500",
  },
  {
    step: "02",
    title: "Learn & Understand",
    description: "Our Strategy, Course, Fees, Time & More",
    icon: ClipboardCheck,
    iconBg: "bg-emerald-500",
  },
  {
    step: "03",
    title: "Plan & Achieve",
    description: "Your Desired PTE Score",
    icon: Target,
    iconBg: "bg-teal-500",
  },
];

export type SecretFormulaStat = {
  icon: LucideIcon;
  label: string;
  iconBg: string;
};

export const SECRET_FORMULA_STATS: SecretFormulaStat[] = [
  { icon: Users, label: "5,000+ Happy Students", iconBg: "bg-blue-600" },
  { icon: ShieldCheck, label: "Expert Trainers", iconBg: "bg-emerald-500" },
  { icon: Star, label: "Proven Strategies", iconBg: "bg-violet-500" },
  { icon: TrendingUp, label: "High Success Rate", iconBg: "bg-orange-500" },
  { icon: Headphones, label: "End to End Support", iconBg: "bg-rose-500" },
];

export const HERO_HEADLINE_LINES = ["Your", "Target Score.", "Your Future."] as const;

export const HERO_SUBHEADLINE = "We Build the Strategy. You Achieve the Score.";

export const HERO_BADGE = {
  primary: "PTE & IELTS",
  secondary: "Training",
  highlight: "with International Skill Zone",
};

export type HeroHighlight = {
  icon: LucideIcon;
  label: string;
};

export const HERO_HIGHLIGHTS: HeroHighlight[] = [
  { icon: Award, label: "Expert Guidance" },
  { icon: Lightbulb, label: "Smart Strategies" },
  { icon: UserCheck, label: "Personalised Training" },
];

export type HeroFeature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const HERO_FEATURE_BAR: HeroFeature[] = [
  { icon: Target, title: "Proven Methods", description: "Focused on Score Improvement" },
  { icon: TrendingUp, title: "Mock Tests", description: "Real Exam Simulation" },
  { icon: Headphones, title: "Expert Support", description: "Guidance at Every Step" },
  { icon: Globe2, title: "Global Success", description: "Study, Work & Settle Abroad" },
];

export const STATS = [
  { value: 12, suffix: "+", label: "Years of Experience" },
  { value: 25, suffix: "+", label: "Countries Reached" },
  { value: 1500, suffix: "+", label: "Students Trained" },
  { value: 95, suffix: "%", label: "Success Rate" },
] as const;

export type AchievementStat = {
  icon: LucideIcon;
  value: number;
  suffix: string;
  label: string;
  color: string;
  bar: string;
  iconBg: string;
};

export const ACHIEVEMENT_STATS: AchievementStat[] = [
  {
    icon: Users,
    value: 5149,
    suffix: "+",
    label: "Satisfied Students",
    color: "text-emerald-600",
    bar: "bg-emerald-500",
    iconBg: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Target,
    value: 150,
    suffix: "+",
    label: "Students Scored 8 Each for Immigration",
    color: "text-blue-700",
    bar: "bg-blue-600",
    iconBg: "bg-blue-50 text-blue-700",
  },
  {
    icon: GraduationCap,
    value: 1037,
    suffix: "+",
    label: "Students Scored 70+ for University Admission",
    color: "text-violet-600",
    bar: "bg-violet-500",
    iconBg: "bg-violet-50 text-violet-600",
  },
  {
    icon: HeartPulse,
    value: 200,
    suffix: "+",
    label: "Nursing Admissions",
    color: "text-rose-600",
    bar: "bg-rose-500",
    iconBg: "bg-rose-50 text-rose-600",
  },
  {
    icon: Building2,
    value: 100,
    suffix: "+",
    label: "Healthcare Placements",
    color: "text-teal-600",
    bar: "bg-teal-500",
    iconBg: "bg-teal-50 text-teal-600",
  },
  {
    icon: Star,
    value: 5,
    suffix: "+",
    label: "Years Teaching Experience",
    color: "text-orange-600",
    bar: "bg-orange-500",
    iconBg: "bg-orange-50 text-orange-600",
  },
];

export type AchievementHighlight = {
  icon: LucideIcon;
  label: string;
};

export const ACHIEVEMENT_HIGHLIGHTS: AchievementHighlight[] = [
  { icon: ShieldCheck, label: "Certified Trainers" },
  { icon: UserCheck, label: "Expert Guidance" },
  { icon: TrendingUp, label: "Proven Results" },
];

export type RoadmapItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBg: string;
};

export const ROADMAP_YEARS = "2026 - 2027";
export const ROADMAP_TAGLINE = "Right Strategy | Smart Practice | Guaranteed Progress";
export const ROADMAP_PRIORITY_LINE = "Your Dream Is Our Priority";
export const ROADMAP_CTA_LINE = "Start your journey towards";

export type RoadmapHighlight = {
  icon: LucideIcon;
  label: string;
};

export const ROADMAP_HIGHLIGHTS: RoadmapHighlight[] = [
  { icon: UserCheck, label: "Expert Trainers" },
  { icon: Globe2, label: "Global Opportunities" },
  { icon: Star, label: "Better Future" },
];

export const ROADMAP_ITEMS: RoadmapItem[] = [
  {
    icon: Target,
    title: "Real Exam Techniques",
    description: "Learn proven strategies and techniques used in the real exam to score higher.",
    iconBg: "bg-blue-500",
  },
  {
    icon: BookOpen,
    title: "Reading Shortcuts",
    description: "Master time-saving tricks and shortcuts for all reading question types.",
    iconBg: "bg-teal-500",
  },
  {
    icon: Bot,
    title: "AI Proof Templates",
    description: "Get advanced and AI-proof templates for writing and speaking sections.",
    iconBg: "bg-violet-500",
  },
  {
    icon: PenLine,
    title: "Effective Writing Skills",
    description: "Improve your grammar, structure and coherence for high scores in essays and summaries.",
    iconBg: "bg-orange-500",
  },
  {
    icon: Headphones,
    title: "Listening & Speaking Guidance",
    description: "Build confidence with focused listening practice and real-time speaking support.",
    iconBg: "bg-teal-600",
  },
  {
    icon: ScanSearch,
    title: "Weak Area Identification",
    description: "Find your weak areas with regular assessments and personalised feedback.",
    iconBg: "bg-pink-500",
  },
  {
    icon: ClipboardList,
    title: "Customized Practice Plan",
    description: "Get a study plan designed according to your current level and target score.",
    iconBg: "bg-blue-600",
  },
  {
    icon: LibraryBig,
    title: "Expert Study Materials",
    description: "Access updated and exam-focused materials prepared by experienced trainers.",
    iconBg: "bg-emerald-500",
  },
  {
    icon: Users,
    title: "Crack Human Involvement",
    description: "Get personal guidance, motivation and continuous support from our expert team.",
    iconBg: "bg-violet-600",
  },
  {
    icon: BarChart3,
    title: "Assessment & Mark Out Mistakes",
    description: "Take regular mock tests and get detailed analysis to correct your mistakes and improve faster.",
    iconBg: "bg-blue-700",
  },
];

export type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const SERVICES: Service[] = [
  {
    icon: MonitorSmartphone,
    title: "Flexible Online Classes",
    description: "Live interactive sessions scheduled around your job or studies.",
  },
  {
    icon: ClipboardCheck,
    title: "In-Depth Skill Assessments",
    description: "Pinpoint exactly where you stand across all four modules.",
  },
  {
    icon: UserCheck,
    title: "Personalized Coaching",
    description: "One-on-one feedback tailored to your weak areas.",
  },
  {
    icon: Trophy,
    title: "Proven Strategies for 90/90",
    description: "Exam-tested techniques and templates that target perfect scores.",
  },
  {
    icon: TrendingUp,
    title: "Regular Progress Updates",
    description: "Weekly score tracking so you always know you're improving.",
  },
  {
    icon: CalendarCheck,
    title: "Customized Study Plan & Daily Language Exercises",
    description: "A day-by-day plan built around your target score and deadline.",
  },
  {
    icon: BookMarked,
    title: "PTE/IELTS Materials and Guides",
    description: "Exclusive practice material, templates, and prediction files.",
  },
];

export type CoursePlan = {
  title: string;
  duration: string;
  tagline: string;
  icon: LucideIcon;
  popular?: boolean;
  features: string[];
};

export const COURSE_PLANS: CoursePlan[] = [
  {
    title: "PTE Preparation",
    duration: "1 Month",
    tagline: "Complete Training for Your Target Score",
    icon: GraduationCap,
    popular: true,
    features: [
      "5 classes per week",
      "Target-score based training",
      "Reading shortcut rules & smart techniques",
      "Unique AI-proof templates",
      "Expert trainer guidance",
      "24/7 student support",
    ],
  },
  {
    title: "IELTS Preparation",
    duration: "1.5 Months",
    tagline: "Complete Training for Your Desired Band Score",
    icon: Headphones,
    features: [
      "5 classes per week",
      "Band-score focused training",
      "Writing & speaking strategies",
      "Unique templates & material",
      "Expert trainer guidance",
      "24/7 student support",
    ],
  },
  {
    title: "Spoken English",
    duration: "1 Month",
    tagline: "Improve Fluency, Confidence & Speaking Skills",
    icon: MessageCircle,
    features: [
      "5 classes per week",
      "Advanced speaking material",
      "Daily practice sessions",
      "Pronunciation & fluency coaching",
      "Real-life conversation practice",
      "24/7 student support",
    ],
  },
  {
    title: "Interview Preparation",
    duration: "15 Days",
    tagline: "Get Ready for Job, Visa & Career Interviews",
    icon: Mic,
    features: [
      "Daily mock interviews",
      "Advanced Q&A material",
      "Personal feedback sessions",
      "Confidence-building techniques",
      "Visa & job interview prep",
      "24/7 student support",
    ],
  },
  {
    title: "Communication Skill",
    duration: "20 Days",
    tagline: "Learn Professional Communication Skills",
    icon: Users,
    features: [
      "5 classes per week",
      "Presentation skills training",
      "Body language coaching",
      "Professional email & writing",
      "Real-life conversation practice",
      "24/7 student support",
    ],
  },
];

export type PlanDifferentiator = {
  icon: LucideIcon;
  label: string;
  color: string;
};

export const PLAN_DIFFERENTIATORS: PlanDifferentiator[] = [
  { icon: Target, label: "Target-Score Focused Training", color: "bg-blue-600" },
  { icon: Users, label: "Certified & Experienced Trainers", color: "bg-violet-500" },
  { icon: ClipboardList, label: "Personalised Learning Plans", color: "bg-teal-500" },
  { icon: Bot, label: "AI-Proof Material", color: "bg-orange-500" },
  { icon: Headphones, label: "24/7 Student Support", color: "bg-rose-500" },
];

export const COURSE_OPTIONS = COURSE_PLANS.map((p) => p.title);

export const WHY_CHOOSE_SUBTITLE =
  "Your Global Education Partner — From Learning to Landing.";
export const WHY_CHOOSE_TAGLINE = "Learn Today | Prepare Tomorrow | Succeed Globally";
export const WHY_CHOOSE_BADGE = "PTE | IELTS | Study Abroad";

export type WhyChooseItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const WHY_CHOOSE: WhyChooseItem[] = [
  {
    icon: Globe2,
    title: "Global Presence",
    description:
      "Our classes are conducted across Europe, USA, Australia & New Zealand.",
  },
  {
    icon: Lightbulb,
    title: "Unique Tips & Tricks",
    description:
      "Smart strategies, shortcuts and insider tips to help you score higher, faster.",
  },
  {
    icon: LibraryBig,
    title: "Comprehensive Study Material",
    description:
      "Updated templates, practice files, real exam questions and latest updates.",
  },
  {
    icon: Trophy,
    title: "Proven Track Record",
    description:
      "Hundreds of students have achieved 79+ / 8-band targets and secured visas.",
  },
  {
    icon: CircleDollarSign,
    title: "Save Time & Money",
    description: "Get better results in less time — without extra costs.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Guidance whenever you need it — even on exam day.",
  },
  {
    icon: ShieldCheck,
    title: "Certified Trainers",
    description:
      "Trained and certified by Pearson for the highest teaching standards.",
  },
  {
    icon: UserCheck,
    title: "Personalized Attention",
    description: "Small batches and one-on-one feedback on every mock attempt.",
  },
  {
    icon: Target,
    title: "Higher Success Rate",
    description:
      "Proven methods, expert support and continuous practice to help you reach your goals.",
  },
];

export type ComparisonRow = {
  us: string;
  others: string;
  usIcon: LucideIcon;
  othersIcon: LucideIcon;
};

export const COMPARISON_US_LABEL = "International Skill Zone";
export const COMPARISON_OTHERS_LABEL = "Other Academies";
export const COMPARISON_OTHERS_SUBTITLE = "Only Classes. No Complete Support.";
export const COMPARISON_US_SUBTITLE = "PTE & IELTS Training — Complete Score System";

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    us: "Reading Shortcuts & Smart Rules",
    others: "General teaching methods",
    usIcon: Target,
    othersIcon: Presentation,
  },
  {
    us: "Unique AI-Proof Templates",
    others: "Limited reading strategies",
    usIcon: Bot,
    othersIcon: BookOpen,
  },
  {
    us: "Target-Score Strategy",
    others: "Generic templates",
    usIcon: Crosshair,
    othersIcon: FileText,
  },
  {
    us: "Personalised Level-Based Teaching",
    others: "Same method for every student",
    usIcon: UserCheck,
    othersIcon: Users,
  },
  {
    us: "Mistake Analysis + Solution",
    others: "No detailed mistake analysis",
    usIcon: ScanSearch,
    othersIcon: Search,
  },
  {
    us: "Daily Live Practice & Feedback",
    others: "Limited practice & feedback",
    usIcon: Video,
    othersIcon: MessageCircle,
  },
  {
    us: "Individual Mock Test Checking",
    others: "Basic mock test checking",
    usIcon: ClipboardList,
    othersIcon: ClipboardCheck,
  },
  {
    us: "Advanced & Updated Material",
    others: "Limited exam guidance",
    usIcon: BookMarked,
    othersIcon: PenLine,
  },
  {
    us: "Regular Testing & Progress Tracking",
    others: "Generic material",
    usIcon: BarChart3,
    othersIcon: LibraryBig,
  },
  {
    us: "24/7 Student Support",
    others: "Limited student support",
    usIcon: Headphones,
    othersIcon: Headphones,
  },
];

export type CompleteSystemStep = {
  label: string;
  icon: LucideIcon;
  color: string;
};

export const COMPLETE_SYSTEM_STEPS: CompleteSystemStep[] = [
  { label: "Assess", icon: ClipboardCheck, color: "bg-primary" },
  { label: "Identify Mistakes", icon: ScanSearch, color: "bg-orange-500" },
  { label: "Teach", icon: Presentation, color: "bg-violet-500" },
  { label: "Practise", icon: PenLine, color: "bg-emerald-500" },
  { label: "Analyse", icon: BarChart3, color: "bg-blue-500" },
  { label: "Improve", icon: TrendingUp, color: "bg-rose-500" },
  { label: "Achieve", icon: Trophy, color: "bg-amber-500" },
];

export const LIVE_FEEDBACK_EYEBROW = "Hear It From Our Students";
export const LIVE_FEEDBACK_TITLE = "Live Student Feedback";
export const LIVE_FEEDBACK_DESCRIPTION =
  "Real reactions, real results — watch our students share their honest experience with International Skill Zone.";

export const PRACTICE_QUOTE = {
  line1: "Practice does not make perfect.",
  highlight: "Only perfect",
  line3: "practice makes perfect.",
  author: "Prof. Umar",
  role: "CEO of International Skill Zone",
  specialty: "Specialized in English",
} as const;

export const REGISTRATION_DESIRED_SCORES = [
  "PTE 50+",
  "PTE 65+",
  "PTE 79+",
  "PTE 90",
  "IELTS 6.0",
  "IELTS 6.5",
  "IELTS 7.0",
  "IELTS 7.5",
  "IELTS 8.0",
] as const;

export const REGISTRATION_PURPOSES = [
  "Study Abroad",
  "Immigration / PR",
  "Work Visa",
  "Professional Registration",
  "University Admission",
  "Spouse / Dependent Visa",
  "Other",
] as const;

export type RegistrationTestForOption = {
  id: string;
  icon: LucideIcon;
};

export const REGISTRATION_TEST_FOR_OPTIONS: RegistrationTestForOption[] = [
  { id: "Study Visa", icon: GraduationCap },
  { id: "Tourist Visa", icon: Plane },
  { id: "Work Visa", icon: Briefcase },
  { id: "Immigration", icon: Users },
  { id: "TR (Temporary Resident)", icon: FileText },
  { id: "PR (Permanent Resident)", icon: Home },
  { id: "Other", icon: Ellipsis },
];

export const REGISTRATION_TRUST_ITEMS = [
  "Quick Response",
  "Expert Guidance",
  "Global Students",
] as const;

export const COMMITMENTS = [
  {
    title: "Results-Driven Approach",
    description:
      "Every lesson, mock, and exercise is aimed at one thing — the score you need.",
  },
  {
    title: "Expert Guidance",
    description:
      "Learn directly from a trainer who has coached students in 25+ countries.",
  },
  {
    title: "Personalized Coaching",
    description:
      "Your plan adapts to your weak areas, your schedule, and your deadline.",
  },
] as const;
