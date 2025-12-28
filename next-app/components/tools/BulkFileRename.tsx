"use client";

import React, { useCallback, useState } from 'react';
import JSZip from 'jszip';

export default function BulkFileRename() {
  const [files, setFiles] = useState<Array<{ id: string; file: File; newName: string }>>([]);
  const [renameMode, setRenameMode] = useState<'custom' | 'auto'>('custom');
  const [customPrefix, setCustomPrefix] = useState('file');
  const [counterStart, setCounterStart] = useState(1);
  const [msg, setMsg] = useState<string | null>(null);

  const onFiles = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    const selected = ev.target.files;
    if (!selected) return;
    const arr = Array.from(selected).map((f, i) => ({ id: `${Date.now()}-${i}`, file: f, newName: f.name }));
    setFiles((s) => [...s, ...arr]);
  }, []);

  const generateNewName = (file: File, index: number) => {
    const original = file.name;
    const ext = original.includes('.') ? original.split('.').pop() : '';
    const base = ext ? original.replace(/\.[^/.]+$/, '') : original;
    const counter = counterStart + index;
    if (renameMode === 'auto') return `${base}-${counter}${ext ? `.${ext}` : ''}`;
    const prefix = customPrefix.trim() || 'file';
    return `${prefix}-${counter}${ext ? `.${ext}` : ''}`;
  };

  const updatePreview = () => {
    setFiles((prev) => prev.map((f, i) => ({ ...f, newName: generateNewName(f.file, i) })));
  };

  React.useEffect(() => updatePreview(), [renameMode, customPrefix, counterStart, files.length]);

  const removeFile = (id: string) => setFiles((s) => s.filter((f) => f.id !== id));

  const handleDownload = async () => {
    if (files.length === 0) return setMsg('No files');

    const zip = new JSZip();
    files.forEach((f, i) => {
      const newName = generateNewName(f.file, i);
      zip.file(newName, f.file);
    });

    try {
      const blob = await zip.generateAsync({ type: 'blob' });
      // simple download implementation
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'renamed.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1500);
      setMsg('Download started');
    } catch (e: any) {
      setMsg('ZIP failed');
    }
  };

  return (
    <div className="bg-white dark:bg-[#202124] rounded-xl p-6 border border-gray-200 dark:border-gray-800 space-y-4">
      {files.length === 0 ? (
        <div>
          <label htmlFor="file-input" className="block text-sm font-medium mb-2">Choose files</label>
          <input id="file-input" data-testid="file-input" type="file" multiple onChange={onFiles} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {files.map((f) => (
              <div key={f.id} className="p-2 border rounded">
                <div className="text-sm break-all">Original: {f.file.name}</div>
                <div className="text-xs text-green-600">New: {f.newName}</div>
                <button onClick={() => removeFile(f.id)} className="text-red-500 mt-2">Remove</button>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium">Mode</label>
              <select value={renameMode} onChange={(e) => setRenameMode(e.target.value as any)} className="mt-2 p-2 rounded border">
                <option value="auto">Automatic</option>
                <option value="custom">Custom Prefix</option>
              </select>

              {renameMode === 'custom' && (
                <div className="mt-2">
                  <label className="block text-sm">Prefix</label>
                  <input value={customPrefix} onChange={(e) => setCustomPrefix(e.target.value)} className="w-full p-2 rounded border mt-1" />
                </div>
              )}

              <div className="mt-2">
                <label className="block text-sm">Start Counter</label>
                <input type="number" value={counterStart} onChange={(e) => setCounterStart(Number(e.target.value))} className="w-full p-2 rounded border mt-1" />
              </div>
            </div>

            <div className="self-end">
              <button onClick={handleDownload} className="w-full bg-green-600 text-white px-4 py-2 rounded">Download Renamed Files (ZIP)</button>
            </div>
          </div>
        </>
      )}

      {msg && <div role="status" className="text-sm text-gray-700">{msg}</div>}
    </div>
  );
}
