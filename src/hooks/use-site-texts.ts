import { useQuery } from "@tanstack/react-query";
import { getSiteTexts } from "@/lib/site-texts.functions";
import { EDITABLE_TEXT_DEFAULTS, type SiteTexts } from "@/lib/site-text-fields";

export const SITE_TEXTS_QUERY_KEY = ["site-texts"] as const;

/**
 * Returns the current text-override map, merged over the built-in defaults, so every
 * key defined in EDITABLE_TEXT_DEFAULTS always resolves to a string. Components can read
 * `texts.some_key` directly instead of juggling fallbacks everywhere.
 */
export function useSiteTexts(): SiteTexts {
  const { data } = useQuery({
    queryKey: SITE_TEXTS_QUERY_KEY,
    queryFn: () => getSiteTexts(),
    staleTime: 60_000,
  });
  if (!data) return EDITABLE_TEXT_DEFAULTS;
  const merged: SiteTexts = { ...EDITABLE_TEXT_DEFAULTS };
  for (const key of Object.keys(EDITABLE_TEXT_DEFAULTS) as (keyof SiteTexts)[]) {
    const override = data[key];
    if (override) merged[key] = override;
  }
  return merged;
}
