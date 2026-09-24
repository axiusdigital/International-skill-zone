import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { STATS } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { FadeIn } from "./motion-primitives";

function CountUp({ value, suffix }: { value: number; suffix: string }) {
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
    <span ref={ref} className="font-display text-gradient-gold text-3xl font-extrabold tabular-nums sm:text-4xl">
      {display.toLocaleString()}
      <span>{suffix}</span>
    </span>
  );
}

export function StatsStrip() {
  return (
    <section id="our-journey" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Journey"
          title="The Numbers Behind The Results"
          description="Over a decade of coaching students to the scores that unlock their future."
        />
        <FadeIn>
          <dl className="glass-strong shadow-lift mx-auto grid max-w-5xl grid-cols-2 gap-6 rounded-3xl p-6 sm:p-8 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <CountUp value={stat.value} suffix={stat.suffix} />
                  <p className="text-muted-foreground mt-1.5 text-xs font-semibold tracking-wide uppercase sm:text-sm">
                    {stat.label}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </FadeIn>
      </div>
    </section>
  );
}
