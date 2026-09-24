export type Testimonial = {
  id: string;
  student_name: string;
  course: string;
  quote: string;
  rating: number;
  is_published: boolean;
  display_order: number;
  created_at: string;
};

export type TestimonialInput = {
  student_name: string;
  course: string;
  quote: string;
  rating: number;
  is_published: boolean;
};

export type Result = {
  id: string;
  image_url: string;
  storage_path: string | null;
  alt_text: string;
  display_order: number;
  is_published: boolean;
  created_at: string;
};

export type SiteTextEntry = {
  key: string;
  value: string;
};

export type Registration = {
  id: string;
  name: string;
  profession: string | null;
  city: string | null;
  desired_score: string | null;
  age: number | null;
  course: string;
  phone: string;
  extra_remarks: string | null;
  created_at: string;
};
