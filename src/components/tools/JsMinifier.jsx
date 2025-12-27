import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Download } from 'lucide-react';
import DownloadPopup from "@/components/shared/DownloadPopup";
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const minifyJs = (s) => {
  return s
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/{2}.*/gm, '$1')
    .replace(/\s{2,}/g, ' ')
    .replace(/\n+/g, '\n')
    .trim();
};

const exampleJs = `// This is a comment
function greet(name) {
  // Greeting logic
  console.log('Hello, ' + name);
}

greet('World');`;

const JsMinifier = () => {
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const performDownload = () => {
    if (!output) { toast({ title: 'Nothing to download', variant: 'destructive' }); return; }
    try {
      const blob = new Blob([output], { type: 'text/javascript;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'script.min.js';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => { try { URL.revokeObjectURL(url); } catch (e) {} }, 1500);
      toast({ title: 'Download started' });
    } catch (e) {
      toast({ title: 'Download failed', description: e.message, variant: 'destructive' });
    }
  }; 

  const handleMinify = () => {
    const minified = minifyJs(input);
    setOutput(minified);
    const saved = input.length - minified.length;
    toast({ title: 'JS Minified!', description: `Reduced by ${saved} characters (${Math.round(saved/input.length*100)}%)` });
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast({ title: 'Copied!', description: 'Minified JS copied' });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white dark:bg-[#202124] rounded-xl p-6 border border-gray-200 dark:border-gray-800 space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">JavaScript Input</label>
        <div className="relative">
          <textarea 
            className="w-full h-40 p-4 border border-gray-300 dark:border-gray-700 rounded-md font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white resize-none" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Paste your JavaScript here..." 
          />
          <button
            onClick={() => setInput(exampleJs)}
            className="absolute bottom-2 right-2 text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400"
          >
            Use example
          </button>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">{input.length} characters</div>
      </div>

      <div className="flex gap-3">
        <Button onClick={handleMinify} className="bg-red-500 hover:bg-red-600 text-white">Minify JavaScript</Button>
        <Button onClick={() => { setInput(''); setOutput(''); }} variant="outline">Clear</Button>
      </div>

      {output && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Minified Output</label>
            <span className="text-xs text-green-600 dark:text-green-400">↓ {input.length - output.length} chars saved</span>
          </div>
          <div className="relative">
            <textarea 
              className="w-full h-40 p-4 border border-gray-300 dark:border-gray-700 rounded-md font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white resize-none" 
              value={output} 
              readOnly 
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <button onClick={() => setShowPopup(true)} className="p-2 rounded bg-green-600 text-white hover:bg-green-700">
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={copyOutput}
                className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                <Copy className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          </div>
          {typeof window !== 'undefined' && (
            <DownloadPopup isOpen={showPopup} onClose={() => setShowPopup(false)} fileCount={1} onDownload={() => { performDownload(); setShowPopup(false); }} toolId="js-minifier" />
          )}
          <div className="text-xs text-gray-500 dark:text-gray-400">{output.length} characters</div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default JsMinifier;
