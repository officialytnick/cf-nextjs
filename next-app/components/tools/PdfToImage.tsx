"use client";

import React, { useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import { saveAs } from 'file-saver';

// point to worker in node_modules
// @ts-ignore
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

export default function PdfToImage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [pages, setPages] = useState<number>(0);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const arrayBuffer = await f.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    setPages(pdf.numPages);
  }

  async function extractFirstPageAsImage() {
    const file = (inputRef.current?.files && inputRef.current.files[0]) as File | undefined;
    if (!file) return;
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    await page.render({ canvasContext: ctx, viewport }).promise;
    canvas.toBlob((blob) => {
      if (!blob) return;
      saveAs(blob, 'page1.png');
    });
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="pdf-to-image-input" className="block text-sm font-medium">Choose PDF</label>
        <input id="pdf-to-image-input" ref={inputRef} type="file" accept="application/pdf" onChange={onFile} />
      </div>

      <div>
        <p className="text-sm text-gray-500">Pages: {pages}</p>
      </div>

      <div>
        <button className="px-4 py-2 rounded bg-blue-600 text-white" onClick={extractFirstPageAsImage}>Extract First Page</button>
      </div>
    </div>
  );
}
