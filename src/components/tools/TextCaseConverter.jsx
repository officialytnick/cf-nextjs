import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { Copy } from 'lucide-react';

const TextCaseConverter = () => {
  const [text, setText] = useState('Hello World! This is a test.');
  const { toast } = useToast();

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Text copied to clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        variant: "destructive"
      });
    }
  };

  const toSentenceCase = () => {
    setText(text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase()));
  };
  const toLowerCase = () => setText(text.toLowerCase());
  const toUpperCase = () => setText(text.toUpperCase());
  const toTitleCase = () => {
    setText(
      text
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    );
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
          className="w-full h-48 p-4 border rounded-md resize-y bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white border-gray-300 dark:border-gray-700"
          placeholder="Paste your text here..."
        />

        {/* Copy Button */}
        <button
          onClick={copyText}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none
          disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 absolute top-2 right-2
          text-gray-500 dark:text-gray-400 bg-white/70 dark:bg-black/20"
        >
          <Copy className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button onClick={toSentenceCase} variant="outline">Sentence case</Button>
        <Button onClick={toLowerCase} variant="outline">lowercase</Button>
        <Button onClick={toUpperCase} variant="outline">UPPERCASE</Button>
        <Button onClick={toTitleCase} variant="outline">Title Case</Button>
      </div>
    </motion.div>
  );
};

export default TextCaseConverter;
