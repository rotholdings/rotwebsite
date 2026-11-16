CREATE TABLE public.enquiry_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT ALL ON public.enquiry_submissions TO service_role;

ALTER TABLE public.enquiry_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_full_access"
  ON public.enquiry_submissions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);