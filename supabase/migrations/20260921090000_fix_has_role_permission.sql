-- The `has_role()` function is called inside RLS policies below, but an earlier migration
-- revoked EXECUTE on it from `anon`/`authenticated` (to stop it being called directly as a
-- public RPC endpoint). That also silently breaks every policy that calls it via RLS, since
-- policy checks run with the privileges of the querying role. Fix: replace those policy
-- checks with an inline EXISTS against user_roles (same logic, no function call needed).

DROP POLICY IF EXISTS "Admins can read all testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admins can add testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admins can update testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admins can delete testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admins can view registrations" ON public.registrations;

CREATE POLICY "Admins can read all testimonials" ON public.testimonials FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can add testimonials" ON public.testimonials FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can update testimonials" ON public.testimonials FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can delete testimonials" ON public.testimonials FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can view registrations" ON public.registrations FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));
