import { describe, it, expect } from 'vitest';
import { getRelatedTools } from '../lib/toolRelations';
import { toolsData } from '../lib/toolsData';

describe('getRelatedTools', () => {
  it('returns explicit mapped tools first for a tool with mapping', () => {
    const tool = toolsData.find((t) => t.id === 'image-resizer');
    expect(tool).toBeDefined();
    const related = getRelatedTools(tool as any);

    // mapping for image-resizer contains image-compressor and others
    const ids = related.map((t) => t.id);
    expect(ids).toContain('image-compressor');
  });

  it('does not include the current tool', () => {
    const tool = toolsData.find((t) => t.id === 'image-compressor');
    expect(tool).toBeDefined();
    const related = getRelatedTools(tool as any);
    const ids = related.map((t) => t.id);
    expect(ids).not.toContain(tool?.id);
  });

  it('falls back to same-category tools when mapping is absent', () => {
    const tool = toolsData.find((t) => t.id === 'jpg-to-webp');
    expect(tool).toBeDefined();
    const related = getRelatedTools(tool as any);
    expect(related.length).toBeGreaterThan(0);
    // all fallback items should be same category
    expect(related.every((r) => r.category === tool?.category)).toBe(true);
  });
});
