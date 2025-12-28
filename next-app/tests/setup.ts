import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Polyfill DOMMatrix for pdfjs in jsdom environment
;(globalThis as any).DOMMatrix = class DOMMatrix {
  constructor() {}
};

// Mock Next.js app router functions used by components
vi.mock('next/navigation', () => {
  return {
    useRouter: () => ({ push: vi.fn() }),
    useSearchParams: () => ({ get: (key: string) => null }),
  };
});
