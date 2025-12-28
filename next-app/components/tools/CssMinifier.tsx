"use client";

import React, { useState } from 'react';

const exampleCss = `/* General styles */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

h1 {
  color: #333;
  font-size: 24px;
}`;

function minifyCss(s: string) {
  return s
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s*([{};:,>+~])\s*/g, '$1')
    .replace(/;}/g, '}')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export default function CssMinifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  function handleMinify() {
    const min = minifyCss(input);
    setOutput(min);
    setMsg('Minified');
    setTimeout(() => setMsg(null), 1500);
  }

  async function copyOutput() {
    try {
      await navigator.clipboard.writeText(output);
      setMsg('Copied');
    } catch {
      setMsg('Copy failed');
    }
    setTimeout(() => setMsg(null), 1500);
  }

  function useExample() {
    setInput(exampleCss);
  }

  return (
    <div className="bg-white dark:bg-[#202124] rounded-xl p-6 border border-gray-200 dark:border-gray-800 space-y-4">
      <div>
        <label htmlFor="css-input" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">CSS Input</label>
        <div className="relative">
          <textarea id="css-input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste your CSS here..." className="w-full h-40 p-4 border border-gray-300 dark:border-gray-700 rounded-md font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white resize-none" />
          <button onClick={useExample} className="absolute bottom-2 right-2 text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400">Use example</button>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">{input.length} characters</div>
      </div>

      <div className="flex gap-3">
        <button onClick={handleMinify} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Minify CSS</button>
        <button onClick={() => { setInput(''); setOutput(''); }} className="px-4 py-2 rounded border">Clear</button>
      </div>

      {output && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Minified Output</label>
            <span className="text-xs text-green-600 dark:text-green-400">↓ {input.length - output.length} chars saved</span>
          </div>
          <div className="relative">
            <textarea value={output} readOnly className="w-full h-40 p-4 border border-gray-300 dark:border-gray-700 rounded-md font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white resize-none" />
            <div className="absolute top-2 right-2 flex gap-2">
              <button onClick={copyOutput} className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition">Copy</button>
            </div>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{output.length} characters</div>
        </div>
      )}

      {msg && <div role="status" className="text-sm text-gray-700 dark:text-gray-300">{msg}</div>}
    </div>
  );
}
