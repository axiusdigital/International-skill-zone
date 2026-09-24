import {
  Facebook,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import { NAV_LINKS } from "@/lib/content";
import { useSiteTexts } from "@/hooks/use-site-texts";
import logo from "@/assets/Logo-Footer.png";

const SOCIALS = [
  { label: "Instagram", icon: Instagram, href: "https://www.instagram.com/internationalskillzone" },
  { label: "Facebook", icon: Facebook, href: "https://www.facebook.com/profile.php?id=61576782430145" },
  { label: "YouTube", icon: Youtube, href: "https://www.youtube.com/@InternationalSkillZone" },
  { label: "X (Twitter)", icon: Twitter, href: "https://x.com/ISZinstitute" },
];

export function Footer() {
  const texts = useSiteTexts();

  return (
    <footer id="support" className="from-primary to-[oklch(0.2_0.05_259)] relative scroll-mt-24 bg-gradient-to-b">
      <div
        aria-hidden
        className="absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/60 to-transparent"
      />
      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center">
              <img src={logo} alt={texts.site_name} className="h-20 w-auto object-contain" />
            </div>
            <p className="text-primary-foreground/70 mt-5 text-sm leading-relaxed">
              Unlock your global dream with international skill zone! Study Abroad,
              Secure your future.
            </p>
          </div>

          {/* Useful links */}
          <div>
            <h3 className="font-display text-primary-foreground text-sm font-bold tracking-widest uppercase">
              Useful Links
            </h3>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-accent text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-primary-foreground text-sm font-bold tracking-widest uppercase">
              Contact
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="text-primary-foreground/70 flex items-center gap-2.5">
                <Phone className="text-accent h-4 w-4 shrink-0" />
                {texts.phone_display}
              </li>
              <li className="text-primary-foreground/70 flex items-center gap-2.5">
                <MapPin className="text-accent h-4 w-4 shrink-0" />
                {texts.address}
              </li>
            </ul>
            <a
              href={texts.whatsapp_url}
              target="_blank"
              rel="noreferrer"
              className="bg-accent text-accent-foreground shadow-gold hover:shadow-glow mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </a>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-display text-primary-foreground text-sm font-bold tracking-widest uppercase">
              Follow Us
            </h3>
            <div className="mt-5 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="border-primary-foreground/15 text-primary-foreground/70 hover:bg-accent hover:text-accent-foreground hover:border-accent hover:shadow-glow flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-0.5"
                >
                  <s.icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
            <p className="text-primary-foreground/50 mt-5 text-sm leading-relaxed">
              Tips, student results, and live class announcements.
            </p>
          </div>
        </div>

        <div className="border-primary-foreground/10 mt-14 flex flex-col items-center justify-between gap-3 border-t pt-6 sm:flex-row">
          <p className="text-primary-foreground/60 text-xs">
            © 2026 internationalskillzone.com — All rights reserved.
          </p>
          <p className="text-primary-foreground/40 text-xs">
            PTE · IELTS · Spoken English · Interview Prep · Communication Skills
          </p>
        </div>
      </div>
    </footer>
  );
}
