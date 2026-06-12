import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  email?: string
  company?: string
  message?: string
}

const Email = ({ name, email, company, message }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New contact form submission from {name || 'a visitor'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>New contact submission</Heading>
        <Text style={subtext}>
          A new message was submitted through the website contact form.
        </Text>

        <Hr style={hr} />

        <Section>
          <Text style={label}>Name</Text>
          <Text style={value}>{name || '—'}</Text>

          <Text style={label}>Email</Text>
          <Text style={value}>{email || '—'}</Text>

          <Text style={label}>Company</Text>
          <Text style={value}>{company || '—'}</Text>

          <Text style={label}>Message</Text>
          <Text style={value}>{message || '—'}</Text>
        </Section>

        <Hr style={hr} />

        <Text style={footer}>
          Sent automatically from the website contact form.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (data: Props) =>
    `New contact submission${data?.name ? ` from ${data.name}` : ''}`,
  displayName: 'Contact Submission',
  to: 'Info@verzatv.com',
  previewData: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    company: 'Acme Studios',
    message: 'I would love to learn more about your platform.',
  },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '32px 28px',
  maxWidth: '560px',
}

const heading = {
  fontSize: '22px',
  fontWeight: '600',
  color: '#0a0a0a',
  margin: '0 0 8px',
}

const subtext = {
  fontSize: '14px',
  color: '#666666',
  margin: '0',
}

const label = {
  fontSize: '12px',
  fontWeight: '600',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.04em',
  color: '#888888',
  margin: '16px 0 2px',
}

const value = {
  fontSize: '15px',
  color: '#1a1a1a',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
}

const hr = {
  borderColor: '#eaeaea',
  margin: '24px 0',
}

const footer = {
  fontSize: '12px',
  color: '#999999',
  margin: '0',
}
