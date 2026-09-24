import { motion } from "motion/react";
import { ArrowRight, Target } from "lucide-react";
import { ROADMAP_HIGHLIGHTS, ROADMAP_ITEMS } from "@/lib/content";
import { useSiteTexts } from "@/hooks/use-site-texts";
import { FadeIn, StaggerGroup, StaggerItem } from "./motion-primitives";
import { cn } from "@/lib/utils";

export function Roadmap() {
  const texts = useSiteTexts();

  return (
    <section id="roadmap" className="bg-secondary/40 scroll-mt-24 overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Title banner */}
        <FadeIn className="text-center">
          <div className="bg-primary shadow-lift relative mx-auto inline-flex items-center gap-3 rounded-xl px-6 py-4 sm:gap-4 sm:px-10 sm:py-5">
            <span className="bg-accent/20 text-accent flex h-10 w-10 shrink-0 items-center justify-center rounded-full sm:h-12 sm:w-12">
              <Target className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.75} />
            </span>
            <p className="font-display text-primary-foreground text-left text-lg leading-tight font-black uppercase sm:text-xl md:text-2xl">
              PTE Success Roadmap
              <span className="text-accent block text-base sm:text-lg md:text-xl">
                {texts.roadmap_years}
              </span>
            </p>
          </div>
          <p className="text-primary mt-5 text-sm font-semibold italic sm:text-base">
            {texts.roadmap_tagline}
          </p>
        </FadeIn>

        {/* Section pill */}
        <FadeIn delay={0.05} className="mt-10 text-center md:mt-14">
          <span className="bg-primary text-primary-foreground font-display inline-block rounded-full px-8 py-3 text-base font-black sm:text-lg">
            Our Program <span className="text-accent">Includes</span>
          </span>
        </FadeIn>

        {/* Items grid */}
        <StaggerGroup className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-12">
          {ROADMAP_ITEMS.map((item, i) => (
            <StaggerItem key={item.title}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="border-primary/10 hover:border-accent/40 shadow-card hover:shadow-lift flex items-start gap-4 rounded-2xl border-2 bg-white p-5 transition-all duration-300 sm:p-6"
              >
                <div className="relative shrink-0">
                  <span
                    className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-full text-white shadow-md",
                      item.iconBg,
                    )}
                  >
                    <item.icon className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                  <span className="bg-primary text-primary-foreground absolute -top-1.5 -left-1.5 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold shadow-md">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-primary text-base font-bold sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  <span aria-hidden className="bg-accent mt-2.5 block h-0.5 w-8 rounded-full" />
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Priority + CTA banner */}
        <FadeIn delay={0.1} className="mt-12 md:mt-16">
          <div className="bg-primary shadow-lift flex flex-col items-center gap-5 rounded-2xl px-6 py-7 text-center sm:px-10 md:flex-row md:justify-between md:text-left">
            <p
              className="text-accent text-xl leading-none sm:text-2xl"
              style={{ fontFamily: '"Dancing Script", cursive' }}
            >
              {texts.roadmap_priority_line}
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
              <span className="bg-primary/40 text-primary-foreground flex h-11 w-11 shrink-0 items-center justify-center rounded-full">
                <Target className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <p className="text-primary-foreground text-sm font-semibold sm:text-base">
                {texts.roadmap_cta_line}{" "}
                <a
                  href="#fees-packages"
                  className="text-accent inline-flex items-center gap-1.5 font-bold underline-offset-4 hover:underline"
                >
                  PTE success today!
                  <ArrowRight className="h-4 w-4" />
                </a>
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Feature bar */}
        <FadeIn delay={0.15} className="mt-6">
          <div className="border-primary/10 bg-white shadow-card flex flex-col items-center justify-center gap-6 rounded-2xl border-2 px-6 py-6 sm:flex-row sm:gap-10">
            {ROADMAP_HIGHLIGHTS.map((item) => (
              <div key={item.label} className="flex items-center gap-2.5">
                <span className="bg-primary/10 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
                  <item.icon className="h-4.5 w-4.5" strokeWidth={1.75} />
                </span>
                <p className="text-foreground text-sm font-bold sm:text-base">{item.label}</p>
              </div>
            ))}
            <p
              className="text-primary text-xl leading-none sm:text-2xl"
              style={{ fontFamily: '"Dancing Script", cursive' }}
            >
              Let&apos;s Do It!
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
