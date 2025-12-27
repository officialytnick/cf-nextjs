
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const DuplicateLineRemover = () => {
  const [text, setText] = useState('Apple\nBanana\nApple\nOrange\n\nBanana');
  const [removeEmpty, setRemoveEmpty] = useState(false);
  const { toast } = useToast();

  const handleRemove = () => {
    let lines = text.split('\n');
    if (removeEmpty) {
      lines = lines.filter(line => line.trim() !== '');
    }
    const uniqueLines = [...new Set(lines)];
    setText(uniqueLines.join('\n'));
  };

  const copyToClipboard = () => {
    if(!text) {
        toast({ title: 'Nothing to copy!', variant: 'destructive' });
        return;
    }
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied to clipboard!' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-[#202124] rounded-xl p-6 border border-gray-200 dark:border-gray-800 space-y-4"
    >
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-64 p-4 border rounded-md resize-y bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white border-gray-300 dark:border-gray-700"
          placeholder="Paste your list here..."
        />
        <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-gray-500 dark:text-gray-400" onClick={copyToClipboard}>
          <Copy className="w-5 h-5" />
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
            <Checkbox id="remove-empty" checked={removeEmpty} onCheckedChange={setRemoveEmpty} />
            <Label htmlFor="remove-empty">Remove empty lines</Label>
        </div>
        <Button onClick={handleRemove} className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white">Remove Duplicate Lines</Button>
      </div>
    </motion.div>
  );
};

export default DuplicateLineRemover;
