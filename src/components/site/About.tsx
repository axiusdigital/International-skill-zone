import { Eye, Rocket, CheckCircle2 } from "lucide-react";
import { COMMITMENTS } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { FadeIn, StaggerGroup, StaggerItem } from "./motion-primitives";

export function About() {
  return (
    <section
      id="about"
      className="from-primary via-primary to-background relative scroll-mt-24 overflow-hidden bg-gradient-to-br py-20 md:py-28"
    >
      {/* Decorative shapes */}
      <div
        aria-hidden
        className="animate-float bg-accent/15 absolute -top-32 -right-32 h-96 w-96 rounded-full blur-3xl"
      />
      <div
        aria-hidden
        className="animate-float bg-neon/10 absolute -bottom-40 -left-24 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ animationDelay: "-3.5s" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          dark
          eyebrow="Who We Are"
          title="About International Skill Zone"
          description="A coaching institute built around one promise: your target score, in the shortest honest time."
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FadeIn>
            <div className="glass hover:shadow-glow h-full rounded-2xl p-8 transition-all duration-300">
              <span className="bg-accent shadow-gold flex h-12 w-12 items-center justify-center rounded-xl">
                <Rocket className="text-accent-foreground h-6 w-6" />
              </span>
              <h3 className="font-display text-primary-foreground mt-5 text-xl font-bold">
                Our Mission
              </h3>
              <p className="text-primary-foreground/75 mt-3 leading-relaxed">
                To make world-class PTE, IELTS, and communication coaching accessible
                to every student in Pakistan and beyond — unlocking admissions, visas,
                and careers through English proficiency.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="glass hover:shadow-neon h-full rounded-2xl p-8 transition-all duration-300">
              <span className="bg-neon shadow-neon flex h-12 w-12 items-center justify-center rounded-xl">
                <Eye className="text-neon-foreground h-6 w-6" />
              </span>
              <h3 className="font-display text-primary-foreground mt-5 text-xl font-bold">
                Our Vision
              </h3>
              <p className="text-primary-foreground/75 mt-3 leading-relaxed">
                To be the most trusted name in test preparation — known not for
                promises, but for scorecards, visas, and students who recommend us to
                their families.
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn className="mt-14">
          <h3 className="font-display text-primary-foreground text-center text-2xl font-bold">
            Our Commitment to You
          </h3>
        </FadeIn>
        <StaggerGroup className="mx-auto mt-8 grid max-w-4xl gap-5 sm:grid-cols-3">
          {COMMITMENTS.map((c) => (
            <StaggerItem key={c.title}>
              <div className="glass hover:shadow-glow h-full rounded-2xl p-6 text-center transition-all duration-300">
                <CheckCircle2 className="text-accent mx-auto h-7 w-7" />
                <h4 className="font-display text-primary-foreground mt-3 text-base font-bold">
                  {c.title}
                </h4>
                <p className="text-primary-foreground/70 mt-2 text-sm leading-relaxed">
                  {c.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
