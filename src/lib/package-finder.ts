/**
 * "Which package fits me?" (owner-approved 23 Nov 2026 via the delegated recommendation).
 * Recommends one of the four approved packages from three short answers. Reasons quote only
 * the approved `typically` inclusions in src/data/packages.ts; nothing else is promised.
 */
export type Goal = 'present' | 'sell' | 'system';
export type Pages = 'few' | 'more' | 'unsure';
export type SelfEdit = 'yes' | 'no' | 'unsure';

export interface FinderAnswers {
  goal?: Goal;
  pages?: Pages;
  selfEdit?: SelfEdit;
}

export interface Recommendation {
  packageId: 'starter' | 'business' | 'store' | 'custom';
  reasons: string[];
}

/** Which questions to ask, in order, for the answers so far. */
export function questionsFor(answers: FinderAnswers): ('goal' | 'pages' | 'selfEdit')[] {
  return answers.goal === 'present' ? ['goal', 'pages', 'selfEdit'] : ['goal'];
}

export function isComplete(answers: FinderAnswers): boolean {
  return questionsFor(answers).every((q) => answers[q] !== undefined);
}

export function recommend(answers: FinderAnswers): Recommendation | null {
  if (!isComplete(answers)) return null;
  if (answers.goal === 'sell') {
    return {
      packageId: 'store',
      reasons: [
        'You want to sell online, so you need product and category pages.',
        'Online Store includes a shopping cart, checkout and payment integration.',
      ],
    };
  }
  if (answers.goal === 'system') {
    return {
      packageId: 'custom',
      reasons: [
        'Bookings, records, portals and dashboards go beyond a website.',
        'Custom Software starts with a discovery conversation, then a quote for your system.',
      ],
    };
  }
  if (answers.pages === 'more' || answers.selfEdit === 'yes') {
    const reasons: string[] = [];
    if (answers.pages === 'more')
      reasons.push('You need more than 5 pages, with room for services and portfolio sections.');
    if (answers.selfEdit === 'yes')
      reasons.push(
        'Business includes content management (CMS), so you can update content yourself.',
      );
    return { packageId: 'business', reasons };
  }
  const reasons = ['Up to 5 pages is enough to explain what you do and how to reach you.'];
  if (answers.pages === 'unsure')
    reasons.push(
      'Not sure about pages? Start small; moving up to Business later is an extension, not a restart.',
    );
  reasons.push('Starter includes contact and WhatsApp enquiry on a mobile-friendly design.');
  return { packageId: 'starter', reasons };
}
