import {
  ADDRESS,
  DEMO_CLASS_DESCRIPTION,
  DEMO_CLASS_RIBBON,
  HERO_BADGE,
  HERO_HEADLINE_LINES,
  HERO_SUBHEADLINE,
  LIVE_FEEDBACK_DESCRIPTION,
  LIVE_FEEDBACK_EYEBROW,
  LIVE_FEEDBACK_TITLE,
  PHONE_DISPLAY,
  PRACTICE_QUOTE,
  ROADMAP_CTA_LINE,
  ROADMAP_PRIORITY_LINE,
  ROADMAP_TAGLINE,
  ROADMAP_YEARS,
  SITE_NAME,
  WHATSAPP_URL,
  WHY_CHOOSE_BADGE,
  WHY_CHOOSE_SUBTITLE,
  WHY_CHOOSE_TAGLINE,
} from "./content";

export type EditableTextField = {
  key: string;
  label: string;
  defaultValue: string;
  multiline?: boolean;
};

export type EditableTextSection = {
  id: string;
  title: string;
  fields: EditableTextField[];
};

/**
 * Curated list of simple, plain-text homepage strings that clients can override from the
 * admin dashboard. Anything left blank falls back to the default copy shown here.
 * (Icon-based lists like Why Choose cards, Roadmap items, and Comparison rows are intentionally
 * out of scope for this simple text editor.)
 */
export const EDITABLE_TEXT_SECTIONS: EditableTextSection[] = [
  {
    id: "brand",
    title: "Brand & Contact",
    fields: [
      { key: "site_name", label: "Site name", defaultValue: SITE_NAME },
      { key: "phone_display", label: "Phone number (displayed)", defaultValue: PHONE_DISPLAY },
      { key: "whatsapp_url", label: "WhatsApp link", defaultValue: WHATSAPP_URL },
      { key: "address", label: "Address", defaultValue: ADDRESS },
    ],
  },
  {
    id: "hero",
    title: "Hero Section",
    fields: [
      { key: "hero_headline_1", label: "Headline — line 1", defaultValue: HERO_HEADLINE_LINES[0] },
      { key: "hero_headline_2", label: "Headline — line 2", defaultValue: HERO_HEADLINE_LINES[1] },
      { key: "hero_headline_3", label: "Headline — line 3", defaultValue: HERO_HEADLINE_LINES[2] },
      { key: "hero_subheadline", label: "Subheadline", defaultValue: HERO_SUBHEADLINE },
      { key: "hero_badge_primary", label: "Badge — primary text", defaultValue: HERO_BADGE.primary },
      { key: "hero_badge_secondary", label: "Badge — secondary text", defaultValue: HERO_BADGE.secondary },
      { key: "hero_badge_highlight", label: "Badge — highlight text", defaultValue: HERO_BADGE.highlight },
    ],
  },
  {
    id: "demo-class",
    title: "Free Demo Class Section",
    fields: [
      { key: "demo_class_ribbon", label: "Ribbon text", defaultValue: DEMO_CLASS_RIBBON },
      {
        key: "demo_class_description",
        label: "Description",
        defaultValue: DEMO_CLASS_DESCRIPTION,
        multiline: true,
      },
    ],
  },
  {
    id: "why-choose",
    title: "Why Choose Us Section",
    fields: [
      { key: "why_choose_subtitle", label: "Subtitle", defaultValue: WHY_CHOOSE_SUBTITLE },
      { key: "why_choose_tagline", label: "Tagline", defaultValue: WHY_CHOOSE_TAGLINE },
      { key: "why_choose_badge", label: "Badge", defaultValue: WHY_CHOOSE_BADGE },
    ],
  },
  {
    id: "roadmap",
    title: "Roadmap Section",
    fields: [
      { key: "roadmap_years", label: "Years banner", defaultValue: ROADMAP_YEARS },
      { key: "roadmap_tagline", label: "Tagline", defaultValue: ROADMAP_TAGLINE },
      { key: "roadmap_priority_line", label: "Priority line", defaultValue: ROADMAP_PRIORITY_LINE },
      { key: "roadmap_cta_line", label: "CTA line", defaultValue: ROADMAP_CTA_LINE },
    ],
  },
  {
    id: "live-feedback",
    title: "Live Student Feedback Section",
    fields: [
      { key: "live_feedback_eyebrow", label: "Eyebrow", defaultValue: LIVE_FEEDBACK_EYEBROW },
      { key: "live_feedback_title", label: "Title", defaultValue: LIVE_FEEDBACK_TITLE },
      {
        key: "live_feedback_description",
        label: "Description",
        defaultValue: LIVE_FEEDBACK_DESCRIPTION,
        multiline: true,
      },
    ],
  },
  {
    id: "practice-quote",
    title: "Practice Quote Section",
    fields: [
      { key: "quote_line1", label: "Line 1", defaultValue: PRACTICE_QUOTE.line1 },
      { key: "quote_highlight", label: "Highlighted phrase", defaultValue: PRACTICE_QUOTE.highlight },
      { key: "quote_line3", label: "Line 3", defaultValue: PRACTICE_QUOTE.line3 },
      { key: "quote_author", label: "Author name", defaultValue: PRACTICE_QUOTE.author },
      { key: "quote_role", label: "Author role", defaultValue: PRACTICE_QUOTE.role },
      { key: "quote_specialty", label: "Author specialty", defaultValue: PRACTICE_QUOTE.specialty },
    ],
  },
];

export interface SiteTexts {
  site_name: string;
  phone_display: string;
  whatsapp_url: string;
  address: string;
  hero_headline_1: string;
  hero_headline_2: string;
  hero_headline_3: string;
  hero_subheadline: string;
  hero_badge_primary: string;
  hero_badge_secondary: string;
  hero_badge_highlight: string;
  demo_class_ribbon: string;
  demo_class_description: string;
  why_choose_subtitle: string;
  why_choose_tagline: string;
  why_choose_badge: string;
  roadmap_years: string;
  roadmap_tagline: string;
  roadmap_priority_line: string;
  roadmap_cta_line: string;
  live_feedback_eyebrow: string;
  live_feedback_title: string;
  live_feedback_description: string;
  quote_line1: string;
  quote_highlight: string;
  quote_line3: string;
  quote_author: string;
  quote_role: string;
  quote_specialty: string;
}

export const EDITABLE_TEXT_DEFAULTS: SiteTexts = {
  site_name: SITE_NAME,
  phone_display: PHONE_DISPLAY,
  whatsapp_url: WHATSAPP_URL,
  address: ADDRESS,
  hero_headline_1: HERO_HEADLINE_LINES[0],
  hero_headline_2: HERO_HEADLINE_LINES[1],
  hero_headline_3: HERO_HEADLINE_LINES[2],
  hero_subheadline: HERO_SUBHEADLINE,
  hero_badge_primary: HERO_BADGE.primary,
  hero_badge_secondary: HERO_BADGE.secondary,
  hero_badge_highlight: HERO_BADGE.highlight,
  demo_class_ribbon: DEMO_CLASS_RIBBON,
  demo_class_description: DEMO_CLASS_DESCRIPTION,
  why_choose_subtitle: WHY_CHOOSE_SUBTITLE,
  why_choose_tagline: WHY_CHOOSE_TAGLINE,
  why_choose_badge: WHY_CHOOSE_BADGE,
  roadmap_years: ROADMAP_YEARS,
  roadmap_tagline: ROADMAP_TAGLINE,
  roadmap_priority_line: ROADMAP_PRIORITY_LINE,
  roadmap_cta_line: ROADMAP_CTA_LINE,
  live_feedback_eyebrow: LIVE_FEEDBACK_EYEBROW,
  live_feedback_title: LIVE_FEEDBACK_TITLE,
  live_feedback_description: LIVE_FEEDBACK_DESCRIPTION,
  quote_line1: PRACTICE_QUOTE.line1,
  quote_highlight: PRACTICE_QUOTE.highlight,
  quote_line3: PRACTICE_QUOTE.line3,
  quote_author: PRACTICE_QUOTE.author,
  quote_role: PRACTICE_QUOTE.role,
  quote_specialty: PRACTICE_QUOTE.specialty,
};

export type SiteTextKey = keyof SiteTexts;
