import { describe, it, expect } from 'vitest';
import { generateFaqSchema } from '../seo/generateFaqSchema';

describe('generateFaqSchema', () => {
  it('returns null for undefined or empty list', () => {
    expect(generateFaqSchema(undefined)).toBeNull();
    expect(generateFaqSchema([])).toBeNull();
  });

  it('generates valid FAQ JSON-LD for non-empty list', () => {
    const faq = [
      { question: 'Q1?', answer: 'A1' },
      { question: 'Q2?', answer: 'A2' },
    ];

    const json = generateFaqSchema(faq, 'Test Tool');
    expect(typeof json).toBe('string');

    const parsed = JSON.parse(json as string);
    expect(parsed['@context']).toBe('https://schema.org');
    expect(parsed['@type']).toBe('FAQPage');
    expect(Array.isArray(parsed.mainEntity)).toBe(true);
    expect(parsed.mainEntity.length).toBe(2);
    expect(parsed.mainEntity[0].name).toBe('Q1?');
    expect(parsed.mainEntity[0].acceptedAnswer.text).toBe('A1');
  });
});
