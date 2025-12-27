
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const WordCounter = () => {
  const [text, setText] = useState('');

  const stats = {
    words: text.match(/\b\S+\b/g)?.length || 0,
    characters: text.length,
    sentences: text.match(/[^.!?]+[.!?]+/g)?.length || 0,
    paragraphs: text.split(/\n+/).filter(p => p.trim() !== '').length || 0,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-[#202124] rounded-xl p-6 border border-gray-200 dark:border-gray-800"
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-64 p-4 border rounded-md resize-y bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white border-gray-300 dark:border-gray-700"
        placeholder="Start typing or paste your text here..."
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-center">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-2xl font-bold text-red-500">{value}</p>
            <p className="text-sm capitalize text-gray-500 dark:text-gray-400">{key}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default WordCounter;
