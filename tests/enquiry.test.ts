import { describe, expect, it } from 'vitest';
import { composeBrief, validateEnquiry, type Enquiry } from '../src/lib/enquiry';

const valid: Enquiry = {
  name: 'Ada Obi',
  business: 'Ada & Co.',
  email: 'ada@example.com',
  phone: '0803 000 0000',
  hasWebsite: 'yes',
  website: 'adaandco.ng',
  businessType: 'small-business',
  service: 'business-websites',
  package: 'business',
  platform: '',
  description: 'We need a website that explains our tailoring services and takes enquiries.',
  budget: '150k-300k',
  timeline: '1-3-months',
  references: '',
  consent: true,
};

describe('validateEnquiry', () => {
  it('accepts a complete enquiry', () => {
    expect(validateEnquiry(valid)).toEqual({});
  });

  it('requires name, email, description and consent', () => {
    const errors = validateEnquiry({
      ...valid,
      name: '',
      email: '',
      description: 'short',
      consent: false,
    });
    expect(Object.keys(errors)).toEqual(['name', 'email', 'description', 'consent']);
  });

  it('validates email, phone and website formats', () => {
    const errors = validateEnquiry({
      ...valid,
      email: 'ada@',
      phone: 'call me',
      website: 'not a url',
    });
    expect(errors.email).toMatch(/name@example.com/);
    expect(errors.phone).toBeDefined();
    expect(errors.website).toBeDefined();
  });

  it('ignores the website field when there is no website', () => {
    expect(validateEnquiry({ ...valid, hasWebsite: 'no', website: '???' })).toEqual({});
  });
});

describe('composeBrief', () => {
  it('includes provided fields and omits empty ones', () => {
    const brief = composeBrief(valid, {
      service: 'Custom Website Design & Development',
      budget: '₦150,000 – ₦300,000',
    });
    expect(brief).toContain('Name: Ada Obi');
    expect(brief).toContain('Current website: adaandco.ng');
    expect(brief).toContain('Service: Custom Website Design & Development');
    expect(brief).toContain('Budget: ₦150,000 – ₦300,000');
    expect(brief).not.toContain('Sells online via');
    expect(brief).not.toContain('References');
  });
});
