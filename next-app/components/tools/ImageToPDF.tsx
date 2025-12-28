"use client";

import React, { useRef, useState } from 'react';
import { saveAs } from 'file-saver';
import { PDFDocument } from 'pdf-lib';

export default function ImageToPDF() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const list = e.target.files;
    if (!list) return;
    setFiles(Array.from(list));
  }

  async function convert() {
    if (files.length === 0) return;
    const pdfDoc = await PDFDocument.create();

    for (const f of files) {
      const arrayBuffer = await f.arrayBuffer();
      // embed image into pdf
      const img = await pdfDoc.embedJpg(new Uint8Array(arrayBuffer)).catch(async () => {
        // try png
        return pdfDoc.embedPng(new Uint8Array(arrayBuffer));
      });

      const page = pdfDoc.addPage([img.width, img.height]);
      page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
    }

    const pdfBytes = await pdfDoc.save();
    const bytes = pdfBytes instanceof Uint8Array ? pdfBytes : new Uint8Array(pdfBytes as any);
    const blob = new Blob([bytes.buffer], { type: 'application/pdf' });
    saveAs(blob, 'images.pdf');
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="image-to-pdf-input" className="block text-sm font-medium">Choose images</label>
        <input id="image-to-pdf-input" ref={inputRef} type="file" accept="image/*" multiple onChange={onFiles} />
      </div>

      <div>
        <p className="text-sm text-gray-500">Selected files: {files.length}</p>
      </div>

      <div>
        <button className="px-4 py-2 rounded bg-blue-600 text-white" onClick={convert}>Convert to PDF</button>
      </div>
    </div>
  );
}
