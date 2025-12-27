import jsPDF from "jspdf";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
import * as pdfjsLib from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;
import imageCompression from "browser-image-compression";

// -------------------------
// PDF → IMAGES
// -------------------------
export const pdfThumbnails = async (file, options = {}) => {
  const { thumbScale = 0.4 } = options;

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  const thumbs = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: thumbScale });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: ctx, viewport }).promise;

    thumbs.push({
      pageNumber: pageNum,
      dataUrl: canvas.toDataURL("image/png"),
    });
  }

  return thumbs;
};

export const pdfToImages = async (file, options = {}) => {
  const { onlyPages = null, outputFormat = "png", scale = 2 } = options;

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  // Pages to convert
  let pagesToProcess = [];

  if (Array.isArray(onlyPages) && onlyPages.length > 0) {
    pagesToProcess = onlyPages.sort((a, b) => a - b);
  } else {
    pagesToProcess = Array.from({ length: pdf.numPages }, (_, i) => i + 1);
  }

  const results = [];

  for (const pageNum of pagesToProcess) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: ctx, viewport }).promise;

    const type = outputFormat === "jpg" ? "image/jpeg" : "image/png";

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, type, 0.95)
    );

    results.push({
      name: `${file.name.replace(".pdf", "")}_page-${pageNum}.${outputFormat}`,
      blob,
    });
  }

  return results;
};

/* --------------------------------------------------
   IMAGE FORMAT CONVERSION
--------------------------------------------------- */
export const convertImageFormat = (file, format) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");

        // PNG → JPG must add white background
        if (format === "jpeg" && file.type === "image/png") {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0);

        const mime = format === "jpeg" ? "image/jpeg" : `image/${format}`;

        canvas.toBlob(
          (blob) => {
            if (!blob) return reject("Failed to convert image");
            resolve({ blob });
          },
          mime,
          0.95
        );
      };

      img.onerror = () => reject("Image load error");
      img.src = e.target.result;
    };

    reader.onerror = () => reject("File read error");
    reader.readAsDataURL(file);
  });
};

/* --------------------------------------------------
   RESIZE IMAGE
--------------------------------------------------- */
export const resizeImage = (file, width, height) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) return reject("Resize failed");
            resolve({ blob });
          },
          file.type,
          1
        );
      };

      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  });
};

/* --------------------------------------------------
   COMPRESS IMAGE
--------------------------------------------------- */
// export const compressImage = (file, quality) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();

//     reader.onload = (e) => {
//       const img = new Image();

//       img.onload = () => {
//         const canvas = document.createElement("canvas");
//         canvas.width = img.width;
//         canvas.height = img.height;

//         const ctx = canvas.getContext("2d");
//         ctx.drawImage(img, 0, 0);

//         canvas.toBlob(
//           (blob) => {
//             if (!blob) return reject("Compression failed");
//             resolve({ url: URL.createObjectURL(blob), size: blob.size, blob });
//           },
//           "image/jpeg",
//           quality
//         );
//       };

//       img.src = e.target.result;
//     };

//     reader.readAsDataURL(file);
//   });
// };


export const compressImage = async (file, quality = 0.75) => {
  const originalSize = file.size;
  const fileType = file.type;

  // Skip unsupported files
  if (!fileType.startsWith("image/")) {
    return {
      blob: file,
      size: originalSize,
      url: URL.createObjectURL(file)
    };
  }

  const options = {
    initialQuality: quality,
    useWebWorker: true,
    preserveExif: false,

    // Allow smart resizing (VERY IMPORTANT)
    maxWidthOrHeight: 3000,

    // NEVER force target size
    maxSizeMB: undefined
  };

  let compressedBlob;

  try {
    compressedBlob = await imageCompression(file, options);
  } catch (e) {
    console.warn("Compression failed, returning original", e);
    return {
      blob: file,
      size: originalSize
    };
  }

  // 🛑 NEVER allow bigger output
  if (compressedBlob.size >= originalSize) {
    return {
      blob: file,
      size: originalSize
    };
  }

  return {
    blob: compressedBlob,
    size: compressedBlob.size
  };
};

/* --------------------------------------------------
   INTERNAL HELPER
--------------------------------------------------- */
const loadImageFromFile = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      // ensure image has valid dimensions
      if (!img.width || !img.height) {
        try { URL.revokeObjectURL(url); } catch (e) {}
        return reject(new Error("Loaded image has no dimension data"));
      }
      // attach blob url so caller can revoke after jsPDF consumes image data
      img.__blobUrl = url;
      resolve({ img, url });
    };
    img.onerror = () => {
      try { URL.revokeObjectURL(url); } catch (e) {}
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });
};

/* --------------------------------------------------
   IMAGE → SINGLE-PAGE PDF
--------------------------------------------------- */
const placeImageOnPdf = (doc, image, padding) => {
  // Basic validation: ensure image object has dimensions
  if (!image || typeof image.width !== "number" || typeof image.height !== "number" || image.width === 0 || image.height === 0) {
    throw new Error("Invalid image data: cannot determine image dimensions");
  }

  const page = doc.internal.pageSize;
  const pw = page.getWidth();
  const ph = page.getHeight();

  const maxW = pw - padding * 2;
  const maxH = ph - padding * 2;

  const ratio = image.width / image.height;

  let w = maxW;
  let h = w / ratio;

  if (h > maxH) {
    h = maxH;
    w = h * ratio;
  }

  const x = (pw - w) / 2;
  const y = (ph - h) / 2;

  try {
    doc.addImage(image, "JPEG", x, y, w, h);
  } catch (e) {
    throw new Error("Failed to add image to PDF: " + (e?.message || e));
  }
};

export const imageToPdf = async (file, padding = 0) => {
  const doc = new jsPDF();
  const { img, url } = await loadImageFromFile(file);
  try {
    placeImageOnPdf(doc, img, padding);
    return doc.output("blob");
  } finally {
    try { URL.revokeObjectURL(url); } catch (e) {}
  }
};

/* --------------------------------------------------
   MULTIPLE IMAGES → MULTI-PAGE PDF
--------------------------------------------------- */
export const imagesToPdf = async (files, padding = 0) => {
  const doc = new jsPDF();
  const urls = [];

  for (let i = 0; i < files.length; i++) {
    const { img, url } = await loadImageFromFile(files[i]);
    urls.push(url);
    if (i > 0) doc.addPage();
    placeImageOnPdf(doc, img, padding);
  }

  const blob = doc.output("blob");

  // Revoke all blob URLs after jsPDF has finished consuming the images
  setTimeout(() => {
    for (const u of urls) {
      try { URL.revokeObjectURL(u); } catch (e) {}
    }
  }, 1000);

  return blob;
};

/* --------------------------------------------------
   ROTATE / FLIP IMAGE
--------------------------------------------------- */
export const transformImage = (file, rotation = 0, flip = { horizontal: false, vertical: false }) => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        const angle = (rotation * Math.PI) / 180;

        const sin = Math.sin(angle);
        const cos = Math.cos(angle);

        const newW = Math.abs(img.width * cos) + Math.abs(img.height * sin);
        const newH = Math.abs(img.width * sin) + Math.abs(img.height * cos);

        const canvas = document.createElement("canvas");
        canvas.width = newW;
        canvas.height = newH;

        const ctx = canvas.getContext("2d");

        ctx.translate(newW / 2, newH / 2);
        ctx.rotate(angle);

        ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);

        ctx.drawImage(img, -img.width / 2, -img.height / 2);

        canvas.toBlob((blob) => {
          resolve({ blob });
        });
      };

      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  });
};

/* --------------------------------------------------
   MERGE PDF FILES
--------------------------------------------------- */
export const mergePdfs = async (files) => {
  const merged = await PDFDocument.create();

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(bytes);
    const pages = await merged.copyPages(pdf, pdf.getPageIndices());
    pages.forEach((p) => merged.addPage(p));
  }

  const mergedBytes = await merged.save();
  const blob = new Blob([mergedBytes], { type: "application/pdf" });
  return blob;
};

/* --------------------------------------------------
   ZIP DOWNLOAD
--------------------------------------------------- */
export const downloadZip = async (files, name) => {
  const zip = new JSZip();

  files.forEach((f) => {
    zip.file(f.name, f.blob);
  });

  const blob = await zip.generateAsync({ type: "blob" });

  const a = document.createElement("a");
  const url = URL.createObjectURL(blob);
  a.href = url;
  a.download = name;
  a.click();
  // Revoke URL shortly after click to free memory
  setTimeout(() => {
    try {
      URL.revokeObjectURL(url);
    } catch (e) {}
  }, 2000);
};
