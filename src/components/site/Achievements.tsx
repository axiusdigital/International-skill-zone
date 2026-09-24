import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { Star, Trophy } from "lucide-react";
import { ACHIEVEMENT_HIGHLIGHTS, ACHIEVEMENT_STATS } from "@/lib/content";
import { FadeIn, StaggerGroup, StaggerItem } from "./motion-primitives";
import { cn } from "@/lib/utils";

function CountUp({
  value,
  suffix,
  className,
}: {
  value: number;
  suffix: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className={cn("font-display text-2xl font-extrabold tabular-nums sm:text-3xl", className)}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

export function Achievements() {
  return (
    <section id="achievements" className="bg-secondary/40 relative scroll-mt-24 overflow-hidden py-20 md:py-28">
      {/* Subtle wave background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-primary/[0.04] to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-1/2 h-72 w-[140%] -translate-x-1/2 rounded-[100%] bg-primary/[0.03]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <FadeIn className="relative mb-12 text-center md:mb-16">
          <div className="absolute top-0 right-0 hidden lg:block">
            <div className="relative flex h-28 w-28 items-center justify-center">
              <div className="border-accent/30 absolute inset-0 rounded-full border-2 border-dashed" />
              <div className="bg-accent/15 flex h-20 w-20 items-center justify-center rounded-full">
                <Trophy className="text-accent h-10 w-10" />
              </div>
            </div>
          </div>

          <h2 className="font-display text-primary text-3xl font-black tracking-wide uppercase sm:text-4xl md:text-5xl">
            Our Achievements
          </h2>
          <p
            className="text-primary mt-1 text-3xl sm:text-4xl md:text-5xl"
            style={{ fontFamily: '"Dancing Script", cursive' }}
          >
            &amp; Experiences
          </p>
          <div className="mt-4 flex items-center justify-center gap-1.5">
            {[1, 2, 3].map((i) => (
              <Star key={i} className="fill-accent text-accent h-4 w-4 sm:h-5 sm:w-5" />
            ))}
          </div>
        </FadeIn>

        {/* Stat cards */}
        <StaggerGroup className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-6">
          {ACHIEVEMENT_STATS.map((stat) => (
            <StaggerItem key={stat.label}>
              <article className="glass shadow-card group relative flex h-full flex-col overflow-hidden rounded-2xl transition-shadow duration-300 hover:shadow-lift">
                <div className="flex flex-1 flex-col items-center px-4 pt-6 pb-5 text-center">
                  <span
                    className={cn(
                      "mb-4 flex h-14 w-14 items-center justify-center rounded-full",
                      stat.iconBg,
                    )}
                  >
                    <stat.icon className="h-7 w-7" strokeWidth={1.75} />
                  </span>
                  <CountUp value={stat.value} suffix={stat.suffix} className={stat.color} />
                  <p className="text-foreground/80 mt-3 text-xs leading-snug font-medium sm:text-sm">
                    {stat.label}
                  </p>
                </div>
                <div className={cn("h-1.5 w-full", stat.bar)} />
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Feature bar */}
        <FadeIn delay={0.15} className="mt-10 md:mt-14">
          <div className="bg-primary shadow-lift grid grid-cols-1 divide-y divide-white/10 overflow-hidden rounded-2xl sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {ACHIEVEMENT_HIGHLIGHTS.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-center gap-3 px-6 py-5 text-center sm:py-6"
              >
                <span className="text-accent flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <item.icon className="h-5 w-5" />
                </span>
                <p className="text-primary-foreground text-sm font-bold sm:text-base">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* PTE badge */}
        <FadeIn delay={0.25} className="mt-10 flex justify-end md:mt-12">
          <div className="border-accent bg-primary relative flex h-28 w-28 flex-col items-center justify-center rounded-full border-4 text-center shadow-lg sm:h-32 sm:w-32">
            <div
              aria-hidden
              className="border-accent/40 absolute inset-1 rounded-full border border-dashed"
            />
            <p className="text-accent font-display text-[10px] font-bold tracking-wider uppercase sm:text-xs">
              PTE
            </p>
            <p className="text-primary-foreground font-display text-xl font-black sm:text-2xl">
              90/90
            </p>
            <p className="text-primary-foreground/80 text-[9px] font-semibold tracking-wide uppercase sm:text-[10px]">
              Expert
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
