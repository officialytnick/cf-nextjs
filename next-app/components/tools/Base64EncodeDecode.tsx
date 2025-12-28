"use client";

import React, { useEffect, useState } from 'react';

/* UTF-8 Safe Base64 Helpers */
function encodeStr(str: string): string | null {
  try {
    return btoa(
      new TextEncoder()
        .encode(str)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
  } catch {
    return null;
  }
}

function decodeStr(str: string): string | null {
  try {
    const binary = atob(str);
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}

export default function Base64EncodeDecode() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(() => setMsg(null), 2000);
    return () => clearTimeout(t);
  }, [msg]);

  function handleEncode() {
    const v = encodeStr(input);
    if (!v) {
      setMsg('Encode failed');
      return;
    }
    setOutput(v);
    setMsg('Encoded');
  }

  function handleDecode() {
    const v = decodeStr(input);
    if (!v) {
      setMsg('Invalid Base64');
      return;
    }
    setOutput(v);
    setMsg('Decoded');
  }

  async function copyOutput() {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setMsg('Copied');
    } catch {
      setMsg('Copy failed');
    }
  }

  function swap() {
    if (!output) return;
    setInput(output);
    setOutput('');
  }

  function clearAll() {
    setInput('');
    setOutput('');
  }

  function downloadOutput() {
    if (!output) return;
    try {
      const blob = new Blob([output], { type: 'text/plain;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'output.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1500);
      setMsg('Download started');
    } catch (e: any) {
      setMsg(e?.message || 'Download failed');
    }
  }

  return (
    <div className="bg-white dark:bg-[#202124] rounded-xl p-6 border border-gray-200 dark:border-gray-800 space-y-4">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Input */}
        <div>
          <label htmlFor="base64-input" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Input
          </label>
          <textarea
            id="base64-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Text to encode or Base64 to decode..."
            className="w-full h-40 p-4 border border-gray-300 dark:border-gray-700 rounded-md font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white resize-none"
          />
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">{input.length} characters</div>
        </div>

        {/* Output */}
        <div>
          <label htmlFor="base64-output" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Output
          </label>
          <div className="relative">
            <textarea
              id="base64-output"
              value={output}
              readOnly
              placeholder="Output will appear here..."
              className="w-full h-40 p-4 border border-gray-300 dark:border-gray-700 rounded-md font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white resize-none"
            />
            {output && (
              <button
                onClick={copyOutput}
                aria-label="copy-output"
                className="absolute top-2 right-2 p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                Copy
              </button>
            )}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">{output.length} characters</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3">
        <button onClick={handleEncode} disabled={!input.trim()} className="px-4 py-2 rounded bg-red-500 text-white disabled:opacity-50">
          Encode to Base64
        </button>

        <button onClick={handleDecode} disabled={!input.trim()} className="px-4 py-2 rounded border">
          Decode from Base64
        </button>

        <button onClick={swap} disabled={!output} className="px-3 py-1 rounded border">
          Swap
        </button>

        <button onClick={clearAll} className="px-3 py-1 rounded border">
          Clear
        </button>

        <button onClick={downloadOutput} disabled={!output} className="px-3 py-1 rounded bg-green-600 text-white disabled:opacity-50">
          Download Output
        </button>
      </div>

      {msg && <div role="status" className="text-sm text-gray-700 dark:text-gray-300">{msg}</div>}
    </div>
  );
}
