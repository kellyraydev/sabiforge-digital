/** Project enquiry model, validation and brief composition (pure, unit-tested). */
export interface Enquiry {
  name: string;
  business: string;
  email: string;
  phone: string;
  hasWebsite: '' | 'yes' | 'no';
  website: string;
  businessType: string;
  service: string;
  package: string;
  platform: string;
  description: string;
  budget: string;
  timeline: string;
  references: string;
  consent: boolean;
}

export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s()-]{7,20}$/;

export function validateEnquiry(data: Enquiry): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (data.name.trim().length < 2) errors.name = 'Enter your name';
  if (!data.email.trim()) errors.email = 'Enter your email address';
  else if (!EMAIL.test(data.email.trim()))
    errors.email = 'Enter an email address like name@example.com';
  if (data.phone.trim() && !PHONE.test(data.phone.trim()))
    errors.phone = 'Enter a phone number using digits, for example 0803 000 0000';
  if (data.hasWebsite === 'yes' && data.website.trim()) {
    try {
      const url = new URL(
        /^https?:\/\//i.test(data.website.trim())
          ? data.website.trim()
          : `https://${data.website.trim()}`,
      );
      if (!url.hostname.includes('.')) throw new Error('no tld');
    } catch {
      errors.website = 'Enter a website address like example.com';
    }
  }
  if (data.description.trim().length < 20)
    errors.description = 'Tell us a little about the project (at least 20 characters)';
  if (!data.consent) errors.consent = 'Confirm how your brief will be sent';
  return errors;
}

type Labels = Partial<
  Record<'service' | 'package' | 'businessType' | 'budget' | 'timeline' | 'platform', string>
>;

/** Plain-text brief used for email, WhatsApp and clipboard. */
export function composeBrief(data: Enquiry, labels: Labels = {}): string {
  const line = (label: string, value?: string) =>
    value && value.trim() ? `${label}: ${value.trim()}` : null;
  const sections = [
    'NEW PROJECT ENQUIRY — SabiForge Digital',
    '',
    line('Name', data.name),
    line('Business', data.business),
    line('Email', data.email),
    line('WhatsApp / phone', data.phone),
    line('Business type', labels.businessType),
    line(
      'Current website',
      data.hasWebsite === 'yes'
        ? data.website || 'Yes'
        : data.hasWebsite === 'no'
          ? 'None yet'
          : '',
    ),
    line('Service', labels.service),
    line('Package', labels.package),
    line('Sells online via', labels.platform),
    line('Budget', labels.budget),
    line('Launch window', labels.timeline),
    '',
    'About the project:',
    data.description.trim(),
    data.references.trim() ? `\nReferences:\n${data.references.trim()}` : null,
  ];
  return sections.filter((s) => s !== null).join('\n');
}
