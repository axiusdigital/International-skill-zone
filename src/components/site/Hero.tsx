import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { HERO_FEATURE_BAR, HERO_HIGHLIGHTS } from "@/lib/content";
import { useSiteTexts } from "@/hooks/use-site-texts";
import { FadeIn } from "./motion-primitives";
import heroBackground from "@/assets/hero-background.jpeg";
import heroBackground2 from "@/assets/hero-background-2.jpeg";
import heroBackground3 from "@/assets/hero-background-3.jpeg";

const HERO_BACKGROUNDS = [heroBackground, heroBackground2, heroBackground3];
const SLIDE_INTERVAL_MS = 6000;

function HeroBackgroundSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_BACKGROUNDS.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <AnimatePresence>
        <motion.img
          key={index}
          src={HERO_BACKGROUNDS[index]}
          alt=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full object-cover object-[68%_center] sm:object-[62%_center] lg:object-right"
        />
      </AnimatePresence>
      <div className="from-background via-background/90 sm:via-background/75 absolute inset-0 bg-gradient-to-r to-transparent" />
      <div className="from-background absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t to-transparent" />

      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-7">
        {HERO_BACKGROUNDS.map((bg, i) => (
          <button
            key={bg}
            type="button"
            aria-label={`Show background ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "bg-accent w-6" : "bg-primary-foreground/40 hover:bg-primary-foreground/60 w-1.5"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const texts = useSiteTexts();

  return (
    <section
      id="first-step"
      className="relative min-h-[640px] overflow-hidden pt-32 pb-16 sm:pt-36 lg:pt-40 lg:pb-20"
    >
      <HeroBackgroundSlider />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl lg:max-w-2xl">
          <FadeIn>
            <h1 className="font-display text-4xl leading-[1.15] font-black text-balance sm:text-5xl lg:text-6xl">
              <span className="text-foreground block">{texts.hero_headline_1}</span>
              <span className="text-gradient-gold block pb-1">{texts.hero_headline_2}</span>
              <span className="text-foreground block">{texts.hero_headline_3}</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-muted-foreground mt-5 max-w-md text-base sm:text-lg">
              {texts.hero_subheadline}
            </p>
          </FadeIn>

          <FadeIn delay={0.18}>
            <div className="bg-primary text-primary-foreground mt-6 inline-flex flex-wrap items-center gap-1.5 rounded-full px-5 py-3 text-sm font-bold sm:text-base">
              <span>{texts.hero_badge_primary}</span>
              <span className="font-normal opacity-70">{texts.hero_badge_secondary}</span>
              <span className="text-accent">{texts.hero_badge_highlight}</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.26}>
            <div className="divide-border mt-8 grid max-w-md grid-cols-3 divide-x">
              {HERO_HIGHLIGHTS.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center gap-2 px-2 text-center first:pl-0"
                >
                  <span className="bg-primary text-accent flex h-12 w-12 items-center justify-center rounded-full">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <p className="text-foreground text-xs font-semibold sm:text-sm">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.34}>
            <a
              href="#enroll"
              className="bg-accent text-accent-foreground shadow-gold hover:shadow-glow group mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 sm:text-base"
            >
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              Start Your Journey
            </a>
          </FadeIn>
        </div>

        {/* Bottom feature bar */}
        <FadeIn delay={0.2} className="mt-20 lg:mt-24">
          <div className="bg-primary shadow-lift grid grid-cols-2 gap-px overflow-hidden rounded-2xl sm:grid-cols-4">
            {HERO_FEATURE_BAR.map((feature) => (
              <div key={feature.title} className="flex items-center gap-3 px-5 py-5">
                <span className="text-accent flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <feature.icon className="h-4.5 w-4.5" />
                </span>
                <div>
                  <p className="text-primary-foreground text-sm font-bold">{feature.title}</p>
                  <p className="text-primary-foreground/60 text-xs">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
