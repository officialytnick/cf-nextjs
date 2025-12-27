
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Copy } from 'lucide-react';

const JsonFormatter = () => {
  const [jsonInput, setJsonInput] = useState('{"name": "John Doe", "age":30, "cars":["Ford", "BMW", "Fiat"]}');
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed, null, 2));
      setError('');
      toast({ title: 'JSON formatted successfully!' });
    } catch (e) {
      setError(`Invalid JSON: ${e.message}`);
      toast({ title: 'Invalid JSON', description: e.message, variant: 'destructive' });
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed));
      setError('');
      toast({ title: 'JSON minified successfully!' });
    } catch (e) {
      setError(`Invalid JSON: ${e.message}`);
      toast({ title: 'Invalid JSON', description: e.message, variant: 'destructive' });
    }
  };

  const copyToClipboard = () => {
    if(!jsonInput) {
        toast({ title: 'Nothing to copy!', variant: 'destructive' });
        return;
    }
    navigator.clipboard.writeText(jsonInput);
    toast({ title: 'Copied to clipboard!' });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white dark:bg-[#202124] rounded-xl p-6 border border-gray-200 dark:border-gray-800 space-y-4">
      <div className="relative">
        <textarea
          value={jsonInput}
          onChange={(e) => { setJsonInput(e.target.value); setError('') }}
          className={`w-full h-80 p-4 border rounded-md resize-y font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
          placeholder="Paste your JSON here..."
        />
        <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-gray-500 dark:text-gray-400" onClick={copyToClipboard}>
          <Copy className="w-5 h-5" />
        </Button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex gap-4">
        <Button onClick={handleFormat} className="bg-red-500 hover:bg-red-600 text-white">Beautify / Format</Button>
        <Button onClick={handleMinify} variant="outline">Minify / Compress</Button>
      </div>
    </motion.div>
  );
};

export default JsonFormatter;
