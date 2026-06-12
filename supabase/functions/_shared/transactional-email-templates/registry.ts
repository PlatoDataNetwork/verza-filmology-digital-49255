import type * as React from 'npm:react@18.3.1'

// A registered email template. `component` renders the email, `subject` is the
// email subject (string or a function of templateData). `to` optionally fixes a
// recipient (e.g. a site-owner notification address) overriding caller input.
export interface TemplateEntry {
  component: (props: any) => React.ReactElement
  subject: string | ((data: any) => string)
  displayName?: string
  previewData?: Record<string, unknown>
  to?: string
}

import { template as contactSubmission } from './contact-submission.tsx'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'contact-submission': contactSubmission,
}
