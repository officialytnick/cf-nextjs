import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { compressImage, downloadZip } from '../lib/imageUtils';

// Mock the browser-image-compression package
vi.mock('browser-image-compression', () => {
  return vi.fn();
});

// Mock JSZip
vi.mock('jszip', () => {
  return vi.fn().mockImplementation(() => ({
    file: vi.fn(),
    generateAsync: vi.fn().mockResolvedValue(new Blob(['zip-binary'], { type: 'application/zip' })),
  }));
});

describe('imageUtils', () => {
  let originalCreateObjectURL: any;
  let originalRevokeObjectURL: any;

  beforeEach(() => {
    originalCreateObjectURL = URL.createObjectURL;
    originalRevokeObjectURL = URL.revokeObjectURL;
    URL.createObjectURL = vi.fn().mockReturnValue('blob:test');
    URL.revokeObjectURL = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
    URL.createObjectURL = originalCreateObjectURL;
    URL.revokeObjectURL = originalRevokeObjectURL;
  });

  it('compressImage returns compressed blob when compression succeeds and smaller', async () => {
    const imageCompression = (await import('browser-image-compression')).default as any;

    // Simulate compression returning a small blob
    imageCompression.mockResolvedValue(new Blob(['small'], { type: 'image/png' }));

    const orig = new File([new Uint8Array(2000)], 'large.png', { type: 'image/png' });

    const res = await compressImage(orig, 0.5);
    expect(res.blob).toBeInstanceOf(Blob);
    expect(res.size).toBeLessThan(orig.size);
    expect(res.url).toBe('blob:test');
  });

  it('compressImage returns original when compression throws or increases size', async () => {
    const imageCompression = (await import('browser-image-compression')).default as any;

    // Throw on compression
    imageCompression.mockRejectedValue(new Error('fail'));

    const orig = new File([new Uint8Array(1000)], 'orig.png', { type: 'image/png' });

    const res = await compressImage(orig, 0.5);
    expect(res.blob).toBe(orig);
    expect(res.size).toBe(orig.size);
  });

  it('downloadZip calls JSZip and triggers a download', async () => {
    const JSZip = (await import('jszip')).default as any;
    const spyClick = vi.spyOn(HTMLAnchorElement.prototype, 'click');

    const files = [{ name: 'a.txt', blob: new Blob(['a']) }, { name: 'b.txt', blob: new Blob(['b']) }];

    await downloadZip(files, 'my.zip');

    // Assert JSZip was constructed and file/generateAsync were called
    expect(JSZip).toHaveBeenCalled();
    const instance = JSZip.mock.results[0].value;
    expect(instance.file).toHaveBeenCalledTimes(files.length);
    expect(instance.generateAsync).toHaveBeenCalled();
    expect(URL.createObjectURL).toHaveBeenCalled();
    expect(spyClick).toHaveBeenCalled();

    spyClick.mockRestore();
  });
});
