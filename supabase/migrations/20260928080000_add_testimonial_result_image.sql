-- Optional result/score-card image attached to a testimonial.
-- Reuses the existing public "results" storage bucket; writes still go through
-- service-role admin server functions only, so no extra storage policy is needed.
ALTER TABLE public.testimonials
  ADD COLUMN IF NOT EXISTS result_image_url TEXT,
  ADD COLUMN IF NOT EXISTS result_storage_path TEXT;
