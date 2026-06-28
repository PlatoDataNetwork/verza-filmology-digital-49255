UPDATE public.integration_settings
SET config = jsonb_set(config, '{siteUrl}', '"https://verzatv.io/"'),
    updated_at = now()
WHERE provider = 'google_search_console';