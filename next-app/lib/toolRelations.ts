import { toolsData } from './toolsData';

export const TOOL_RELATIONS: Record<string, string[]> = {
  'image-resizer': ['image-compressor', 'image-converter', 'image-to-pdf'],
  'image-compressor': ['image-resizer', 'image-converter', 'image-to-pdf'],
  'image-converter': ['image-compressor', 'image-resizer', 'image-to-pdf'],
  'rotate-image': ['image-resizer', 'flip-image', 'image-compressor'],
  'flip-image': ['image-resizer', 'rotate-image', 'image-compressor'],
  'image-to-pdf': ['image-compressor', 'image-converter'],
  'color-picker': ['image-converter', 'image-resizer'],
  'word-counter': ['text-case', 'duplicate-line-remover'],
  'text-case': ['word-counter', 'duplicate-line-remover'],
  'duplicate-line-remover': ['word-counter', 'text-case'],
  'merge-pdf': ['image-to-pdf'],
  'json-formatter': ['word-counter', 'text-case'],
  'password-generator': ['qr-code-generator'],
  'qr-code-generator': ['password-generator'],
  'bulk-file-rename': ['image-resizer', 'image-compressor', 'image-converter'],
};

export function getRelatedTools(currentTool: any) {
  if (!currentTool) return [];

  const explicitIds = TOOL_RELATIONS[currentTool.id];
  const baseList = toolsData.filter((t) => t.id !== currentTool.id);

  let result: any[] = [];

  if (explicitIds && explicitIds.length) {
    const fromMapping = explicitIds
      .map((id) => baseList.find((t) => t.id === id))
      .filter(Boolean) as any[];
    result = [...fromMapping];
  }

  const already = new Set(result.map((t) => t.id));
  const fallback = baseList.filter((t) => t.category === currentTool.category && !already.has(t.id));

  result = [...result, ...fallback].slice(0, 5);
  return result;
}
