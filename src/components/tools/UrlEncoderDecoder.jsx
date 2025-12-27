import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Copy, ArrowRightLeft, Download } from 'lucide-react';
import DownloadPopup from '@/components/shared/DownloadPopup';
import { motion } from 'framer-motion';

const UrlEncoderDecoder = () => {
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  /* ===========================
     Actions
  =========================== */
  const handleEncode = () => {
    try {
      const encoded = encodeURIComponent(input);
      setOutput(encoded);
      toast({
        title: 'Encoded!',
        description: `${input.length} → ${encoded.length} characters`,
      });
    } catch (e) {
      toast({
        title: 'Encode failed',
        description: e.message,
        variant: 'destructive',
      });
    }
  };

  const handleDecode = () => {
    try {
      const decoded = decodeURIComponent(input);
      setOutput(decoded);
      toast({
        title: 'Decoded!',
        description: `${input.length} → ${decoded.length} characters`,
      });
    } catch (e) {
      toast({
        title: 'Invalid encoded URL',
        description: e.message,
        variant: 'destructive',
      });
    }
  };

  const copyOutput = async () => {
    try {
      await navigator.clipboard.writeText(output);
      toast({ title: 'Copied!', description: 'Output copied to clipboard' });
    } catch {
      toast({
        title: 'Copy failed',
        description: 'Clipboard permission denied',
        variant: 'destructive',
      });
    }
  };

  const swapInputOutput = () => {
    if (!output) return;
    setInput(output);
    setOutput(input);
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
  };

  const performDownload = () => {
    try {
      const blob = new Blob([output], {
        type: 'text/plain;charset=utf-8;',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'output.txt';
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

  /* ===========================
     Render
  =========================== */
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-[#202124] rounded-xl p-6 border border-gray-200 dark:border-gray-800 space-y-4"
    >
      <div className="grid md:grid-cols-2 gap-6">
        {/* Input */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Input
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Text or URL to encode / decode..."
            className="w-full h-40 p-4 border border-gray-300 dark:border-gray-700 rounded-md font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white resize-none"
          />
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {input.length} characters
          </div>
        </div>

        {/* Output */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Output
          </label>
          <div className="relative">
            <textarea
              value={output}
              readOnly
              placeholder="Output will appear here..."
              className="w-full h-40 p-4 border border-gray-300 dark:border-gray-700 rounded-md font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white resize-none"
            />
            {output && (
              <button
                onClick={copyOutput}
                className="absolute top-2 right-2 p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                <Copy className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </button>
            )}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {output.length} characters
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={handleEncode}
          disabled={!input.trim()}
          className="bg-red-500 hover:bg-red-600 text-white disabled:opacity-50"
        >
          URL Encode
        </Button>

        <Button
          onClick={handleDecode}
          disabled={!input.trim()}
          variant="outline"
        >
          URL Decode
        </Button>

        <Button
          onClick={swapInputOutput}
          disabled={!output}
          variant="outline"
          size="icon"
          title="Swap"
        >
          <ArrowRightLeft className="w-4 h-4" />
        </Button>

        <Button onClick={clearAll} variant="outline">
          Clear
        </Button>

        <Button
          onClick={() => output && setShowPopup(true)}
          disabled={!output}
          className="bg-green-600 text-white disabled:opacity-50"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Output
        </Button>

        {typeof window !== 'undefined' && (
          <DownloadPopup
            isOpen={showPopup}
            onClose={() => setShowPopup(false)}
            fileCount={1}
            toolId="url-encoder-decoder"
            onDownload={() => {
              performDownload();
              setShowPopup(false);
            }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default UrlEncoderDecoder;
