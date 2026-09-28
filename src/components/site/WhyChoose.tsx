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

          <div className="border-primary/10 shadow-lift overflow-hidden rounded-2xl border-2 bg-white">
            <StaggerGroup className="divide-primary/10 divide-y">
              {WHY_CHOOSE.map((item) => (
                <StaggerItem key={item.title}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="flex items-center gap-4 px-5 py-5 sm:px-7"
                  >
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white shadow-md ${item.color}`}
                    >
                      <item.icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="font-display text-primary text-base font-bold sm:text-lg">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground mt-0.5 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
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
