// Browser-only utilities for images and zips
import JSZip from 'jszip';
import imageCompression from 'browser-image-compression';

export const convertImageFormat = (file: File, format: string): Promise<{ blob: Blob }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('Canvas context error');

        // PNG → JPG must add white background
        if (format === 'jpeg' && file.type === 'image/png') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0);

        const mime = format === 'jpeg' ? 'image/jpeg' : `image/${format}`;

        canvas.toBlob(
          (blob) => {
            if (!blob) return reject('Failed to convert image');
            resolve({ blob });
          },
          mime,
          0.95
        );
      };

      img.onerror = () => reject('Image load error');
      img.src = e.target.result;
    };

    reader.onerror = () => reject('File read error');
    reader.readAsDataURL(file);
  });
};

export const compressImage = async (file: File, quality = 0.75) => {
  const originalSize = file.size;
  const fileType = file.type;

  // Skip unsupported files
  if (!fileType.startsWith('image/')) {
    return {
      blob: file,
      size: originalSize,
      url: URL.createObjectURL(file),
    };
  }

  const options = {
    initialQuality: quality,
    useWebWorker: true,
    preserveExif: false,
    maxWidthOrHeight: 3000,
    maxSizeMB: undefined,
  } as any;

  let compressedBlob;

  try {
    compressedBlob = await imageCompression(file as any, options);
  } catch (e) {
    console.warn('Compression failed, returning original', e);
    return {
      blob: file,
      size: originalSize,
      url: URL.createObjectURL(file),
    };
  }

  // NEVER allow bigger output
  if ((compressedBlob as Blob).size >= originalSize) {
    return {
      blob: file,
      size: originalSize,
      url: URL.createObjectURL(file),
    };
  }

  return {
    blob: compressedBlob as Blob,
    size: (compressedBlob as Blob).size,
    url: URL.createObjectURL(compressedBlob as Blob),
  };
};

export const downloadZip = async (files: Array<{ name: string; blob: Blob }>, name = 'download.zip') => {
  const zip = new JSZip();
  files.forEach((f) => zip.file(f.name, f.blob));
  const blob = await zip.generateAsync({ type: 'blob' });

  const a = document.createElement('a');
  const url = URL.createObjectURL(blob);
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => {
    try {
      URL.revokeObjectURL(url);
    } catch (e) {}
  }, 2000);
};

export const transformImage = (file: File | null, rotation = 0, flip = { horizontal: false, vertical: false }) => {
  return new Promise<{ blob?: Blob; url?: string }>(async (resolve, reject) => {
    try {
      if (!file) {
        return resolve({});
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          const angle = (rotation * Math.PI) / 180;
          const sin = Math.sin(angle);
          const cos = Math.cos(angle);

          const newW = Math.abs(img.width * cos) + Math.abs(img.height * sin);
          const newH = Math.abs(img.width * sin) + Math.abs(img.height * cos);

          const canvas = document.createElement('canvas');
          canvas.width = newW;
          canvas.height = newH;

          const ctx = canvas.getContext('2d');
          if (!ctx) return reject(new Error('Canvas context error'));

          ctx.translate(newW / 2, newH / 2);
          ctx.rotate(angle);
          ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
          ctx.drawImage(img, -img.width / 2, -img.height / 2);

          canvas.toBlob((blob) => {
            if (!blob) return reject(new Error('Transform failed'));
            const url = URL.createObjectURL(blob);
            resolve({ blob, url });
          });
        };
        img.onerror = () => reject(new Error('Image load error'));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('File read error'));
      reader.readAsDataURL(file);
    } catch (e) {
      reject(e);
    }
  });
};
