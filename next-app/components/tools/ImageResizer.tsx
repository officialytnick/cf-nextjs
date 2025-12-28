"use client";

import React, { useRef, useState } from 'react';

export default function ImageResizer() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [srcUrl, setSrcUrl] = useState<string | null>(null);
  const [width, setWidth] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setSrcUrl(URL.createObjectURL(f));

    // set defaults based on image
    const img = new Image();
    img.src = URL.createObjectURL(f);
    img.onload = () => {
      setWidth(img.naturalWidth);
      setHeight(img.naturalHeight);
    };
  }

  function resize() {
    if (!srcUrl || !width || !height) return;
    const img = new Image();
    img.src = srcUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = Number(width);
      canvas.height = Number(height);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `resized.jpg`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      }, 'image/jpeg', 0.95);
    };
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="image-resizer-input" className="block text-sm font-medium">Choose Image</label>
        <input id="image-resizer-input" ref={inputRef} type="file" accept="image/*" onChange={handleFile} />
      </div>

      {srcUrl && (
        <div className="flex gap-4 items-start">
          <div>
            <label htmlFor="image-resizer-width" className="text-sm">Width</label>
            <input id="image-resizer-width" type="number" value={width as any} onChange={(e) => setWidth(e.target.value === '' ? '' : Number(e.target.value))} className="border rounded px-2 py-1 w-32" />
          </div>
          <div>
            <label htmlFor="image-resizer-height" className="text-sm">Height</label>
            <input id="image-resizer-height" type="number" value={height as any} onChange={(e) => setHeight(e.target.value === '' ? '' : Number(e.target.value))} className="border rounded px-2 py-1 w-32" />
          </div>
          <div>
            <button onClick={resize} className="px-3 py-1 rounded bg-blue-600 text-white">Resize & Download</button>
          </div>
        </div>
      )}
    </div>
  );
}
