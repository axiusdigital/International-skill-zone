import { motion } from "motion/react";
import { WHY_CHOOSE } from "@/lib/content";
import { useSiteTexts } from "@/hooks/use-site-texts";
import { FadeIn, StaggerGroup, StaggerItem } from "./motion-primitives";
import whyChooseImage from "@/assets/why-choose-us.jpeg";

export function WhyChoose() {
  const texts = useSiteTexts();

  return (
    <section id="why-choose" className="bg-secondary/40 scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-12 text-center md:mb-16">
          <div className="bg-primary shadow-lift inline-block rounded-lg px-8 py-3 sm:px-12 sm:py-4">
            <p className="font-display text-primary-foreground text-xl font-black tracking-wide uppercase sm:text-2xl md:text-3xl">
              Why Choose
            </p>
          </div>
          <h2 className="font-display text-primary mt-6 text-2xl font-black sm:text-3xl lg:text-4xl">
            International Skill Zone
          </h2>
          <p className="text-primary mx-auto mt-3 max-w-2xl text-sm font-semibold sm:text-base">
            {texts.why_choose_subtitle}
          </p>
        </FadeIn>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,360px)_1fr] lg:items-start lg:gap-10 xl:gap-14">
          <div className="lg:sticky lg:top-28">
            <FadeIn>
              <div className="border-primary/10 shadow-lift relative overflow-hidden rounded-3xl border-2 bg-white">
                <img
                  src={whyChooseImage}
                  alt="Why choose International Skill Zone"
                  className="aspect-[4/5] w-full object-cover sm:aspect-[16/10] lg:aspect-[4/5]"
                  loading="lazy"
                />
              </div>
            </FadeIn>
          </div>

          <StaggerGroup className="grid gap-5 sm:grid-cols-2">
            {WHY_CHOOSE.map((item) => (
              <StaggerItem key={item.title}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="border-primary/15 hover:border-accent/40 flex h-full flex-col items-center rounded-2xl border-2 bg-white px-5 py-8 text-center shadow-card transition-all duration-300 hover:shadow-lift sm:px-6"
                >
                  <span className="bg-primary text-primary-foreground mb-5 flex h-14 w-14 items-center justify-center rounded-full shadow-md">
                    <item.icon className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                  <h3 className="font-display text-primary text-base font-bold sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        <FadeIn delay={0.1} className="mt-12 flex flex-col items-center gap-5 sm:mt-14 md:flex-row md:justify-between">
          <p
            className="text-primary text-xl sm:text-2xl"
            style={{ fontFamily: '"Dancing Script", cursive' }}
          >
            {texts.why_choose_tagline}
          </p>
          <span className="bg-primary text-primary-foreground font-display shrink-0 rounded-full px-6 py-3 text-xs font-bold tracking-wide uppercase shadow-md sm:text-sm">
            {texts.why_choose_badge}
          </span>
        </FadeIn>
      </div>
    </section>
  );
}
