CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  course TEXT NOT NULL,
  quote TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  is_published BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT ON public.testimonials TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read published testimonials" ON public.testimonials FOR SELECT TO anon, authenticated USING (is_published = true);
CREATE POLICY "Admin can read all testimonials" ON public.testimonials FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin can add testimonials" ON public.testimonials FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin can update testimonials" ON public.testimonials FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin can delete testimonials" ON public.testimonials FOR DELETE TO authenticated USING (true);

CREATE TABLE public.registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  profession TEXT,
  city TEXT,
  desired_score TEXT,
  age INTEGER,
  course TEXT NOT NULL,
  phone TEXT NOT NULL,
  extra_remarks TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT INSERT ON public.registrations TO anon;
GRANT SELECT ON public.registrations TO authenticated;
GRANT ALL ON public.registrations TO service_role;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a registration" ON public.registrations FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admin can view registrations" ON public.registrations FOR SELECT TO authenticated USING (true);

INSERT INTO public.testimonials (student_name, course, quote, rating, is_published, display_order) VALUES
('Ahmed Raza', 'PTE Preparation', 'I scored 79+ in my first attempt. Prof. Umar''s templates and real exam techniques made all the difference. Highly recommended for anyone serious about PTE.', 5, true, 1),
('Fatima Khan', 'IELTS Preparation', 'The personalized feedback on my writing tasks was incredible. I went from band 6.0 to 7.5 in just six weeks of coaching.', 5, true, 2),
('Bilal Hussain', 'PTE Preparation', 'Pehle mujhe speaking module bohat mushkil lagta tha, lekin Sir Umar ki guidance ke baad mera confidence bilkul badal gaya. 83 overall score kiya!', 5, true, 3),
('Sara Malik', 'Spoken English', 'I joined to improve my spoken English for job interviews. The daily exercises and one-on-one sessions transformed my fluency completely.', 5, true, 4),
('Usman Tariq', 'Interview Preparation', 'Cleared my embassy interview on the first try. The mock sessions felt exactly like the real thing. Worth every rupee.', 5, true, 5),
('Ayesha Siddiqui', 'PTE Preparation', 'Bohat hi zabardast teaching method hai. Weak areas identify kar ke customized plan mila, aur result ke saamne kuch kehna nahi. 90 in writing!', 5, true, 6),
('Hamza Sheikh', 'IELTS Preparation', 'Flexible online timings made it possible to prepare alongside my job. Got overall band 8.0 and my Australia visa file is now in process.', 4, true, 7),
('Maryam Nawaz', 'Communication Skill', 'Sirf 20 din mein meri communication skills mein wazeh farq aa gaya. Ab main confidently presentations de sakti hoon. Thank you Skill Zone!', 5, true, 8);