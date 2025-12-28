"use client";

import React, { useState } from 'react';

export default function DuplicateLineRemover() {
  const [text, setText] = useState('Apple\nBanana\nApple\nOrange\n\nBanana');
  const [removeEmpty, setRemoveEmpty] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  function handleRemove() {
    let lines = text.split('\n');
    if (removeEmpty) lines = lines.filter((l) => l.trim() !== '');
    const unique = [...new Set(lines)];
    setText(unique.join('\n'));
    setMsg('Removed');
    setTimeout(() => setMsg(null), 1500);
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(text);
      setMsg('Copied');
    } catch {
      setMsg('Copy failed');
    }
    setTimeout(() => setMsg(null), 1500);
  }

  return (
    <div className="bg-white dark:bg-[#202124] rounded-xl p-6 border border-gray-200 dark:border-gray-800 space-y-4">
      <div className="relative">
        <textarea id="dup-input" value={text} onChange={(e) => setText(e.target.value)} className="w-full h-64 p-4 border rounded-md resize-y bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white border-gray-300 dark:border-gray-700" placeholder="Paste your list here..." />
        <button onClick={copyToClipboard} aria-label="copy-text" className="absolute top-2 right-2 p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">Copy</button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <input id="remove-empty" type="checkbox" checked={removeEmpty} onChange={(e) => setRemoveEmpty(e.target.checked)} />
          <label htmlFor="remove-empty">Remove empty lines</label>
        </div>
        <button onClick={handleRemove} className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Remove Duplicate Lines</button>
      </div>

      {msg && <div role="status" className="text-sm text-gray-700 dark:text-gray-300">{msg}</div>}
    </div>
  );
}
