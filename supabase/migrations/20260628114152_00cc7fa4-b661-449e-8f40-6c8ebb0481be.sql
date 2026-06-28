CREATE OR REPLACE FUNCTION public.get_ga_measurement_id()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT (config->>'measurementId')
  FROM public.integration_settings
  WHERE provider = 'google_analytics'
    AND enabled = true
  LIMIT 1
$$;

GRANT EXECUTE ON FUNCTION public.get_ga_measurement_id() TO anon, authenticated;