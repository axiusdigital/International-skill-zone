import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { ResultsShowcase } from "@/components/site/ResultsShowcase";
import { WhyChoose } from "@/components/site/WhyChoose";
import { DemoClass } from "@/components/site/DemoClass";
import { SecretFormula } from "@/components/site/SecretFormula";
import { Roadmap } from "@/components/site/Roadmap";
import { Achievements } from "@/components/site/Achievements";
import { Testimonials } from "@/components/site/Testimonials";
import { LiveFeedback } from "@/components/site/LiveFeedback";
import { PracticeQuote } from "@/components/site/PracticeQuote";
import { Comparison } from "@/components/site/Comparison";
import { CoursePlans } from "@/components/site/CoursePlans";
import { RegistrationForm } from "@/components/site/RegistrationForm";
import { Footer } from "@/components/site/Footer";
import { getPublishedTestimonials } from "@/lib/testimonials.functions";

export const Route = createFileRoute("/")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData({
      queryKey: ["testimonials", "published"],
      queryFn: () => getPublishedTestimonials(),
    }),
  head: () => ({
    meta: [
      { title: "International Skill Zone — PTE & IELTS Coaching with Prof. Umar" },
      {
        name: "description",
        content:
          "Master PTE & IELTS with Prof. Umar's expert guidance. Flexible online classes, proven 90/90 strategies, spoken English and interview preparation at International Skill Zone, Lahore.",
      },
      { property: "og:title", content: "International Skill Zone — PTE & IELTS Coaching with Prof. Umar" },
      {
        property: "og:description",
        content:
          "Flexible online PTE/IELTS coaching, spoken English and interview preparation. 1,500+ students trained across 25+ countries.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl font-bold">Something went wrong</h1>
        <p className="text-muted-foreground mt-2 text-sm">{error.message}</p>
        <Link
          to="/"
          className="bg-primary text-primary-foreground mt-6 inline-flex rounded-full px-5 py-2.5 text-sm font-semibold"
        >
          Reload home
        </Link>
      </div>
    </div>
  ),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-display text-xl font-bold">Page not found</h1>
        <Link
          to="/"
          className="bg-primary text-primary-foreground mt-6 inline-flex rounded-full px-5 py-2.5 text-sm font-semibold"
        >
          Go home
        </Link>
      </div>
    </div>
  ),
});

function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ResultsShowcase />
        <Achievements />
        <WhyChoose />
        <DemoClass />
        <SecretFormula />
        <Roadmap />
        <Testimonials />
        <LiveFeedback />
        <PracticeQuote />
        <Comparison />
        <CoursePlans />
        <RegistrationForm />
      </main>
      <Footer />
    </div>
  );
}
