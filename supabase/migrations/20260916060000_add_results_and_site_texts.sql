-- Results gallery (homepage "Results That Speak For Themselves" carousel)
CREATE TABLE public.results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  storage_path TEXT,
  alt_text TEXT NOT NULL DEFAULT '',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT ON public.results TO anon;
GRANT SELECT ON public.results TO authenticated;
GRANT ALL ON public.results TO service_role;
ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read published results" ON public.results FOR SELECT TO anon, authenticated USING (is_published = true);

-- Site texts (key/value overrides for editable homepage copy)
CREATE TABLE public.site_texts (
  key TEXT NOT NULL PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_texts TO anon;
GRANT SELECT ON public.site_texts TO authenticated;
GRANT ALL ON public.site_texts TO service_role;
ALTER TABLE public.site_texts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read site texts" ON public.site_texts FOR SELECT TO anon, authenticated USING (true);

-- Storage bucket for result screenshot uploads (public read via CDN URL; writes go through
-- the service-role admin server functions only, so no client-side storage RLS is required).
INSERT INTO storage.buckets (id, name, public)
VALUES ('results', 'results', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can view result images" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'results');
