"use client";

import React, { useRef, useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';

export default function MergePdf() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const list = e.target.files;
    if (!list) return;
    setFiles(Array.from(list));
  }

  async function merge() {
    if (files.length === 0) return;
    const outPdf = await PDFDocument.create();

    for (const f of files) {
      const arr = await f.arrayBuffer();
      const src = await PDFDocument.load(arr);
      const copied = await outPdf.copyPages(src, src.getPageIndices());
      copied.forEach((p) => outPdf.addPage(p));
    }

    const bytes = await outPdf.save();
    const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes as any);
    const blob = new Blob([arr.buffer], { type: 'application/pdf' });
    saveAs(blob, 'merged.pdf');
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="merge-pdf-input" className="block text-sm font-medium">Choose PDFs</label>
        <input id="merge-pdf-input" ref={inputRef} type="file" accept="application/pdf" multiple onChange={onFiles} />
      </div>

      <div>
        <p className="text-sm text-gray-500">Selected files: {files.length}</p>
      </div>

      <div>
        <button className="px-4 py-2 rounded bg-blue-600 text-white" onClick={merge}>Merge PDFs</button>
      </div>
    </div>
  );
}
