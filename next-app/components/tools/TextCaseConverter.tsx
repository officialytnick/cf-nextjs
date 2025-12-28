"use client";

import React, { useState } from 'react';

export default function TextCaseConverter() {
  const [text, setText] = useState('Hello World! This is a test.');
  const [msg, setMsg] = useState<string | null>(null);

  async function copyText() {
    try {
      await navigator.clipboard.writeText(text);
      setMsg('Copied');
    } catch {
      setMsg('Copy failed');
    }
    setTimeout(() => setMsg(null), 1500);
  }

  function toSentenceCase() {
    setText((t) => t.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()));
  }

  function toLowerCase() {
    setText((t) => t.toLowerCase());
  }

  function toUpperCase() {
    setText((t) => t.toUpperCase());
  }

  function toTitleCase() {
    setText((t) =>
      t
        .toLowerCase()
        .split(' ')
        .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1) : ''))
        .join(' ')
    );
  }

  return (
    <div className="bg-white dark:bg-[#202124] rounded-xl p-6 border border-gray-200 dark:border-gray-800 space-y-4">
      <label htmlFor="textcase-input" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
        Input
      </label>
      <div className="relative">
        <textarea
          id="textcase-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-48 p-4 border rounded-md resize-y bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white border-gray-300 dark:border-gray-700"
          placeholder="Paste your text here..."
        />
        <button
          onClick={copyText}
          aria-label="copy-text"
          className="inline-flex items-center justify-center rounded-md text-sm h-10 w-10 absolute top-2 right-2 text-gray-500 dark:text-gray-400 bg-white/70 dark:bg-black/20"
        >
          Copy
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button onClick={toSentenceCase} className="px-4 py-2 rounded border">Sentence case</button>
        <button onClick={toLowerCase} className="px-4 py-2 rounded border">lowercase</button>
        <button onClick={toUpperCase} className="px-4 py-2 rounded border">UPPERCASE</button>
        <button onClick={toTitleCase} className="px-4 py-2 rounded border">Title Case</button>
      </div>

      {msg && <div role="status" className="text-sm text-gray-700 dark:text-gray-300">{msg}</div>}
    </div>
  );
}
