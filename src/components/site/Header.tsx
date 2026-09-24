import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, MessageCircle, X } from "lucide-react";
import { HEADER_NAV_LINKS } from "@/lib/content";
import { useSiteTexts } from "@/hooks/use-site-texts";
import { cn } from "@/lib/utils";
import logo from "@/assets/Logo.png";

export function Header() {
  const texts = useSiteTexts();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      setScrolled(window.scrollY > 24);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass-strong shadow-soft border-b" : "bg-transparent",
      )}
    >
      <div
        className={cn(
          "mx-auto grid max-w-7xl grid-cols-2 items-center px-4 transition-all duration-300 sm:px-6 lg:grid-cols-[auto_1fr_auto] lg:px-8",
          scrolled ? "py-3" : "py-5",
        )}
      >
        <a href="#first-step" className="flex items-center">
          <img src={logo} alt={texts.site_name} className="h-12 w-auto object-contain sm:h-14" />
        </a>

        <nav className="hidden items-center justify-center gap-8 lg:flex">
          {HEADER_NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-foreground/80 relative text-sm font-medium whitespace-nowrap transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <a
            href={texts.whatsapp_url}
            target="_blank"
            rel="noreferrer"
            className="bg-accent text-accent-foreground shadow-gold hover:shadow-glow hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 lg:inline-flex"
          >
            <MessageCircle className="h-4 w-4" />
            Contact Us Now
          </a>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="text-foreground flex h-10 w-10 items-center justify-center rounded-xl lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="glass-strong overflow-hidden border-b lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {HEADER_NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-foreground hover:bg-accent/10 hover:text-accent rounded-lg px-3 py-3 text-sm font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={texts.whatsapp_url}
                target="_blank"
                rel="noreferrer"
                className="bg-accent text-accent-foreground shadow-gold mt-2 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
              >
                <MessageCircle className="h-4 w-4" />
                Contact Us Now
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
