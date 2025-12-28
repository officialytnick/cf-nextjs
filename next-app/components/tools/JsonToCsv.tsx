"use client";

import React, { useState } from 'react';

function jsonToCsv(data: any[]) {
  if (!Array.isArray(data)) throw new Error('JSON must be an array of objects');
  const keys = Array.from(new Set(data.flatMap((row) => Object.keys(row))));
  const lines = [keys.join(',')];
  for (const row of data) {
    const values = keys.map((key) => {
      let value = row[key] ?? '';
      if (typeof value === 'object') value = JSON.stringify(value);
      const escaped = String(value).replace(/"/g, '""');
      return `"${escaped}"`;
    });
    lines.push(values.join(','));
  }
  return lines.join('\n');
}

const DEFAULT_JSON = `[
  { "name": "John", "age": 30, "city": "New York" },
  { "name": "Alice", "age": 25, "city": "London" }
]`;

export default function JsonToCsv() {
  const [input, setInput] = useState(DEFAULT_JSON);
  const [output, setOutput] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  async function handleConvert() {
    try {
      const parsed = JSON.parse(input);
      const csv = jsonToCsv(parsed);
      setOutput(csv);
      setMsg('Converted');
      setTimeout(() => setMsg(null), 1500);
    } catch (e: any) {
      setMsg('Invalid JSON');
      setTimeout(() => setMsg(null), 1500);
    }
  }

  async function copyCsv() {
    try {
      await navigator.clipboard.writeText(output);
      setMsg('Copied');
    } catch {
      setMsg('Copy failed');
    }
    setTimeout(() => setMsg(null), 1500);
  }

  function downloadCsv() {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1500);
    setMsg('Download started');
    setTimeout(() => setMsg(null), 1500);
  }

  return (
    <div className="bg-white dark:bg-[#202124] rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-800 space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">JSON → CSV</h3>

      <textarea
        id="json-to-csv-input"
        className="w-full h-44 border border-gray-300 dark:border-gray-700 rounded-md p-3 text-sm font-mono bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white resize-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste JSON array of objects here"
      />

      <div className="flex flex-wrap gap-2 sm:gap-3">
        <button onClick={handleConvert} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Convert</button>
        <button onClick={copyCsv} disabled={!output} className="px-3 py-1 rounded border">Copy CSV</button>
        <button onClick={downloadCsv} disabled={!output} className="bg-green-600 px-3 py-1 rounded text-white">Download CSV</button>
      </div>

      <textarea id="json-to-csv-output" className="w-full h-40 border border-gray-300 dark:border-gray-700 rounded-md p-3 text-sm font-mono bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white resize-none" value={output} readOnly placeholder="CSV output will appear here..." />

      {msg && <div role="status" className="text-sm text-gray-700 dark:text-gray-300">{msg}</div>}
    </div>
  );
}
