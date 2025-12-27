import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import DownloadPopup from '@/components/shared/DownloadPopup';

/* ===========================
   JSON → CSV Converter
=========================== */
function jsonToCsv(data) {
  if (!Array.isArray(data)) {
    throw new Error('JSON must be an array of objects');
  }

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

/* ===========================
   Dummy Default Data
=========================== */
const DEFAULT_JSON = `[
  { "name": "John", "age": 30, "city": "New York" },
  { "name": "Alice", "age": 25, "city": "London" }
]`;

const JsonToCsv = () => {
  const { toast } = useToast();
  const [input, setInput] = useState(DEFAULT_JSON);
  const [output, setOutput] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleConvert = () => {
    try {
      const parsed = JSON.parse(input);
      const csv = jsonToCsv(parsed);
      setOutput(csv);
      toast({ title: 'Converted successfully' });
    } catch (e) {
      toast({
        title: 'Invalid JSON',
        description: e.message,
        variant: 'destructive',
      });
    }
  };

  const copyCsv = async () => {
    try {
      await navigator.clipboard.writeText(output);
      toast({ title: 'Copied', description: 'CSV copied to clipboard' });
    } catch {
      toast({
        title: 'Copy failed',
        variant: 'destructive',
      });
    }
  };

  const performDownload = () => {
    try {
      const blob = new Blob([output], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1500);
      toast({ title: 'Download started' });
    } catch (e) {
      toast({
        title: 'Download failed',
        description: e.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="bg-white dark:bg-[#202124] rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-800 space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        JSON → CSV
      </h3>

      {/* Input */}
      <textarea
        className="w-full h-44 border border-gray-300 dark:border-gray-700 rounded-md p-3 text-sm font-mono bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white resize-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste JSON array of objects here"
      />

      {/* Controls */}
      <div className="flex flex-wrap gap-2 sm:gap-3">
        <Button
          onClick={handleConvert}
          className="bg-red-500 hover:bg-red-600 text-white"
        >
          Convert
        </Button>

        <Button onClick={copyCsv} disabled={!output} variant="outline">
          Copy CSV
        </Button>

        <Button
          onClick={() => output && setShowPopup(true)}
          disabled={!output}
          className="bg-green-600 text-white"
        >
          <Download className="w-4 h-4 mr-2" />
          Download CSV
        </Button>

        {typeof window !== 'undefined' && (
          <DownloadPopup
            isOpen={showPopup}
            onClose={() => setShowPopup(false)}
            fileCount={1}
            toolId="json-to-csv"
            onDownload={() => {
              performDownload();
              setShowPopup(false);
            }}
          />
        )}
      </div>

      {/* Output */}
      <textarea
        className="w-full h-40 border border-gray-300 dark:border-gray-700 rounded-md p-3 text-sm font-mono bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white resize-none"
        value={output}
        readOnly
        placeholder="CSV output will appear here..."
      />
    </div>
  );
};

export default JsonToCsv;
