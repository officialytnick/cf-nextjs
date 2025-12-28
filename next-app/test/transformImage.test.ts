import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { transformImage, convertImageFormat } from '../lib/imageUtils';

// Minimal DOM canvas and Image/FileReader mocks for jsdom
function installCanvasMocks() {
  // Mock getContext to provide drawing functions and toBlob
  const origGetContext = HTMLCanvasElement.prototype.getContext;

  HTMLCanvasElement.prototype.getContext = function () {
    return {
      translate: () => {},
      rotate: () => {},
      scale: () => {},
      drawImage: () => {},
      save: () => {},
      restore: () => {},
    } as any;
  };

  // Mock toBlob implementation
  // @ts-ignore
  HTMLCanvasElement.prototype.toBlob = function (cb: any) {
    // return a tiny blob
    cb(new Blob(['x'], { type: 'image/png' }));
  };

  return () => {
    HTMLCanvasElement.prototype.getContext = origGetContext;
    // @ts-ignore
    delete HTMLCanvasElement.prototype.toBlob;
  };
}

function installImageMock() {
  const OriginalImage = (global as any).Image;

  function MockImage(this: any) {
    const img: any = this;
    img.width = 10;
    img.height = 10;
    Object.defineProperty(img, 'src', {
      set(v) {
        // simulate async load
        setTimeout(() => {
          if (typeof img.onload === 'function') img.onload();
        }, 0);
      },
    });
  }

  (global as any).Image = MockImage;

  return () => {
    (global as any).Image = OriginalImage;
  };
}

function installFileReaderMock(dataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAQAAQABAPan1eQAAAAASUVORK5CYII=') {
  const OriginalFileReader = (global as any).FileReader;

  function MockFileReader(this: any) {
    this.readAsDataURL = function (file: any) {
      setTimeout(() => {
        if (typeof this.onload === 'function') this.onload({ target: { result: dataUrl } });
      }, 0);
    };
    this.addEventListener = (name: string, cb: any) => {
      if (name === 'load') this.onload = cb;
    };
  }

  (global as any).FileReader = MockFileReader;

  return () => {
    (global as any).FileReader = OriginalFileReader;
  };
}

describe('imageUtils DOM-dependent functions', () => {
  let restoreCanvas: () => void;
  let restoreImage: () => void;
  let restoreFileReader: () => void;

  beforeEach(() => {
    restoreCanvas = installCanvasMocks();
    restoreImage = installImageMock();
    restoreFileReader = installFileReaderMock();
  });

  afterEach(() => {
    restoreCanvas();
    restoreImage();
    restoreFileReader();
    vi.restoreAllMocks();
  });

  it('transformImage returns blob and url for a valid file', async () => {
    const file = new File([new Uint8Array([0xff])], 'test.png', { type: 'image/png' });

    const res = await transformImage(file, 0, { horizontal: false, vertical: false });
    expect(res).toHaveProperty('blob');
    expect(res).toHaveProperty('url');
    expect(res.blob).toBeInstanceOf(Blob);
    expect(typeof res.url).toBe('string');
  });

  it('convertImageFormat returns blob for conversion', async () => {
    const file = new File([new Uint8Array([0xff])], 'test.png', { type: 'image/png' });

    const res = await convertImageFormat(file, 'jpeg');
    expect(res).toHaveProperty('blob');
    expect(res.blob).toBeInstanceOf(Blob);
  });
});
