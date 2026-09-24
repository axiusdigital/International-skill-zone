import { motion } from "motion/react";
import { SERVICES } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { StaggerGroup, StaggerItem } from "./motion-primitives";

export function Services() {
  return (
    <section id="services" className="bg-secondary/40 scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What We Offer"
          title="Our Services"
          description="Everything you need to prepare with confidence — from your first class to your final score report."
        />

        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <StaggerItem key={service.title}>
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="glass hover:shadow-glow hover:border-accent/30 flex h-full items-start gap-4 rounded-2xl p-6 transition-all duration-300"
              >
                <div className="bg-accent/15 border-accent/25 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border">
                  <service.icon className="text-accent h-5.5 w-5.5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold">{service.title}</h3>
                  <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
