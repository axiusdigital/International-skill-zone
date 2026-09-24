import { motion } from "motion/react";
import { ArrowRight, Calendar, Check, Crown } from "lucide-react";
import { COURSE_PLANS, PLAN_DIFFERENTIATORS } from "@/lib/content";
import { FadeIn, StaggerGroup, StaggerItem } from "./motion-primitives";
import { cn } from "@/lib/utils";

export function CoursePlans() {
  return (
    <section
      id="fees-packages"
      className="scroll-mt-24 bg-gradient-to-b from-secondary/60 to-background py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-10 text-center md:mb-14">
          <h2 className="font-display text-primary text-3xl font-black sm:text-4xl lg:text-5xl">
            Choose Your Perfect Plan
          </h2>
          <p className="text-primary mt-3 text-sm font-semibold sm:text-base">
            Flexible Plans &nbsp;|&nbsp; Expert Training &nbsp;|&nbsp; Guaranteed Support
          </p>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-base leading-relaxed">
            Each plan is designed to give you focused training, personalised guidance, and the
            right support to achieve your target score.
          </p>
        </FadeIn>

        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {COURSE_PLANS.map((plan) => (
            <StaggerItem key={plan.title} className="h-full">
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className={cn(
                  "relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-shadow duration-300 hover:shadow-lift",
                  plan.popular ? "border-accent ring-accent/30 border-2 ring-2" : "border-primary/10 border",
                )}
              >
                {plan.popular && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-accent text-accent-foreground inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase shadow-md">
                      <Crown className="h-3 w-3" />
                      Most Popular
                    </span>
                  </div>
                )}

                {plan.popular ? (
                  <div className="from-primary to-primary-light bg-gradient-to-br px-5 pb-5 pt-10 text-center">
                    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                      <plan.icon className="text-primary-foreground h-6 w-6" />
                    </span>
                    <h3 className="font-display text-primary-foreground mt-4 text-lg font-bold">
                      {plan.title}
                    </h3>
                    <p className="text-primary-foreground/75 mt-1 text-xs leading-snug">
                      {plan.tagline}
                    </p>
                    <span className="bg-primary/40 text-primary-foreground mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold tracking-wide uppercase">
                      <Calendar className="h-3 w-3" />
                      {plan.duration}
                    </span>
                  </div>
                ) : (
                  <div className="px-5 pt-8 pb-4 text-center">
                    <span className="bg-primary/10 text-primary mx-auto flex h-14 w-14 items-center justify-center rounded-full">
                      <plan.icon className="h-6 w-6" />
                    </span>
                    <h3 className="font-display text-primary mt-4 text-lg font-bold">{plan.title}</h3>
                    <p className="text-muted-foreground mt-1 text-xs leading-snug">{plan.tagline}</p>
                    <span className="bg-primary/5 text-primary mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold tracking-wide uppercase">
                      <Calendar className="h-3 w-3" />
                      {plan.duration}
                    </span>
                  </div>
                )}

                <ul className={cn("flex-1 space-y-2.5 px-5 py-5", plan.popular && "bg-white")}>
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-xs">
                      <Check className="text-primary mt-0.5 h-3.5 w-3.5 shrink-0 stroke-[3]" />
                      <span className="text-foreground/80 leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="px-5 pb-5">
                  <a
                    href="#enroll"
                    className={cn(
                      "inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold transition-all duration-300 hover:-translate-y-0.5",
                      plan.popular
                        ? "bg-primary text-primary-foreground shadow-soft hover:shadow-lift"
                        : "border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground border-2",
                    )}
                  >
                    Enroll Now
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* What Makes Us Different */}
        <FadeIn delay={0.1} className="mt-14 md:mt-16">
          <h3 className="font-display text-primary text-lg font-black sm:text-xl">
            What Makes Us Different?
          </h3>
          <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {PLAN_DIFFERENTIATORS.map((item) => (
              <div key={item.label} className="flex flex-col items-center text-center">
                <span
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-full text-white shadow-md",
                    item.color,
                  )}
                >
                  <item.icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <p className="text-foreground mt-3 text-xs font-semibold leading-snug sm:text-sm">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Bottom CTA banner */}
        <FadeIn delay={0.15} className="mt-12">
          <div className="bg-primary shadow-lift flex flex-col items-center gap-5 rounded-2xl px-6 py-8 text-center sm:px-10 md:flex-row md:justify-between md:text-left">
            <p
              className="text-primary-foreground text-xl sm:text-2xl"
              style={{ fontFamily: '"Dancing Script", cursive' }}
            >
              Better Preparation, Brighter Future
            </p>
            <a
              href="#enroll"
              className="bg-accent text-accent-foreground shadow-gold hover:shadow-glow inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5"
            >
              Start Your Journey Today
              <ArrowRight className="h-4 w-4" />
            </a>
            <p className="text-primary-foreground/60 hidden text-xs font-bold tracking-[0.2em] uppercase md:block">
              Learn · Practise · Improve · Achieve
            </p>
          </div>
          <p className="text-muted-foreground mt-4 text-center text-xs font-bold tracking-[0.2em] uppercase md:hidden">
            Learn · Practise · Improve · Achieve
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
