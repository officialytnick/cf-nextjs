import { toolsData } from "@/lib/toolsData";

/**
 * Explicit relationships between tools for "Next steps" flows.
 * Keys are tool ids, values are arrays of tool ids that are good follow‑up actions.
 */
export const TOOL_RELATIONS = {
  // IMAGE FLOW
  "image-resizer": ["image-compressor", "image-converter", "image-to-pdf"],
  "image-compressor": ["image-resizer", "image-converter", "image-to-pdf"],
  "image-converter": ["image-compressor", "image-resizer", "image-to-pdf"],
  "rotate-image": ["image-resizer", "flip-image", "image-compressor"],
  "flip-image": ["image-resizer", "rotate-image", "image-compressor"],
  "image-to-pdf": ["image-compressor", "image-converter"],
  "color-picker": ["image-converter", "image-resizer"],

  // DOCUMENT & TEXT FLOW
  "word-counter": ["text-case-converter", "duplicate-line-remover"],
  "text-case-converter": ["word-counter", "duplicate-line-remover"],
  "duplicate-line-remover": ["word-counter", "text-case-converter"],

  // PDF & CODE FLOW
  "merge-pdf": ["image-to-pdf"],
  "json-formatter": ["word-counter", "text-case-converter"],

  // UTILITY
  "password-generator": ["qr-code-generator"],
  "qr-code-generator": ["password-generator"],
  "bulk-file-rename": ["image-resizer", "image-compressor", "image-converter"],
};

/**
 * Resolve the ordered list of related tools for a given tool.
 * 1. Use explicit TOOL_RELATIONS mapping if present
 * 2. Otherwise fall back to same‑category tools from toolsData
 */
export function getRelatedTools(currentTool) {
  if (!currentTool) return [];

  const explicitIds = TOOL_RELATIONS[currentTool.id];
  const baseList = toolsData.filter((t) => t.id !== currentTool.id);

  let result = [];

  if (explicitIds && explicitIds.length) {
    const fromMapping = explicitIds
      .map((id) => baseList.find((t) => t.id === id))
      .filter(Boolean);
    result = [...fromMapping];
  }

  // Fill remaining slots (up to 5) with same‑category tools not already included
  const already = new Set(result.map((t) => t.id));
  const fallback = baseList.filter(
    (t) => t.category === currentTool.category && !already.has(t.id)
  );

  result = [...result, ...fallback].slice(0, 5);
  return result;
}
