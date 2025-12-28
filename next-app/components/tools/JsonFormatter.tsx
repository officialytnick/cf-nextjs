"use client";

import React, { useState } from 'react';

export default function JsonFormatter() {
  const [json, setJson] = useState('{"name": "John Doe", "age":30, "cars":["Ford", "BMW", "Fiat"]}');
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  function showTempMessage(m: string) {
    setMsg(m);
    setTimeout(() => setMsg(null), 1500);
  }

  function handleFormat() {
    try {
      const parsed = JSON.parse(json);
      setJson(JSON.stringify(parsed, null, 2));
      setError(null);
      showTempMessage('Formatted');
    } catch (e: any) {
      setError(e?.message || 'Invalid JSON');
    }
  }

  function handleMinify() {
    try {
      const parsed = JSON.parse(json);
      setJson(JSON.stringify(parsed));
      setError(null);
      showTempMessage('Minified');
    } catch (e: any) {
      setError(e?.message || 'Invalid JSON');
    }
  }

  async function copyToClipboard() {
    if (!json) return showTempMessage('Nothing to copy');
    try {
      await navigator.clipboard.writeText(json);
      showTempMessage('Copied');
    } catch {
      showTempMessage('Copy failed');
    }
  }

  return (
    <div className="bg-white dark:bg-[#202124] rounded-xl p-6 border border-gray-200 dark:border-gray-800 space-y-4">
      <div className="relative">
        <textarea
          id="json-input"
          value={json}
          onChange={(e) => { setJson(e.target.value); setError(null); }}
          className={`w-full h-80 p-4 border rounded-md resize-y font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
          placeholder="Paste your JSON here..."
        />
        <button onClick={copyToClipboard} aria-label="copy-json" className="absolute top-2 right-2 p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition">Copy</button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex gap-4">
        <button onClick={handleFormat} className="px-4 py-2 rounded bg-red-500 text-white">Beautify / Format</button>
        <button onClick={handleMinify} className="px-4 py-2 rounded border">Minify / Compress</button>
      </div>
      {msg && <div role="status" className="text-sm text-gray-700 dark:text-gray-300">{msg}</div>}
    </div>
  );
}
