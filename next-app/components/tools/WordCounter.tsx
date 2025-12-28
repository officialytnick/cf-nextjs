"use client";

import React, { useMemo, useState } from 'react';

export default function WordCounter() {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const words = text.match(/\b\S+\b/g)?.length || 0;
    const characters = text.length;
    const sentences = text.match(/[^.!?]+[.!?]+/g)?.length || 0;
    const paragraphs = text.split(/\n+/).filter((p) => p.trim() !== '').length || 0;
    return { words, characters, sentences, paragraphs };
  }, [text]);

  return (
    <div className="bg-white dark:bg-[#202124] rounded-xl p-6 border border-gray-200 dark:border-gray-800">
      <label htmlFor="wordcounter-input" className="sr-only">Input</label>
      <textarea
        id="wordcounter-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-64 p-4 border rounded-md resize-y bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white border-gray-300 dark:border-gray-700"
        placeholder="Start typing or paste your text here..."
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-center">
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <p className="text-2xl font-bold text-red-500">{stats.words}</p>
          <p className="text-sm capitalize text-gray-500 dark:text-gray-400">words</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <p className="text-2xl font-bold text-red-500">{stats.characters}</p>
          <p className="text-sm capitalize text-gray-500 dark:text-gray-400">characters</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <p className="text-2xl font-bold text-red-500">{stats.sentences}</p>
          <p className="text-sm capitalize text-gray-500 dark:text-gray-400">sentences</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <p className="text-2xl font-bold text-red-500">{stats.paragraphs}</p>
          <p className="text-sm capitalize text-gray-500 dark:text-gray-400">paragraphs</p>
        </div>
      </div>
    </div>
  );
}
