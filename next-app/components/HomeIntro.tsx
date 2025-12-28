"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from './ui/button';

const categories = ['All', 'IMAGE', 'PDF', 'DOCUMENT & TEXT', 'UTILITY', 'DEVELOPER'];

export default function HomeIntro() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    setQ(searchParams?.get('q') || '');
    setActiveCategory(searchParams?.get('category') || 'All');
  }, [searchParams]);

  function applySearch(e?: React.FormEvent) {
    e?.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set('q', q.trim());
    if (activeCategory && activeCategory !== 'All') params.set('category', activeCategory);
    router.push('/?' + params.toString());
  }

  return (
    <section className="container mx-auto px-4 py-12 text-center">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 dark:text-white mb-4">
        The Ultimate Suite of Free Online Tools
      </h2>

      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Convert, compress, and optimize your files with our powerful collection of image, PDF, and text utilities.
      </p>

      <form onSubmit={applySearch} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'destructive' : 'outline'}
              className="rounded-full capitalize"
              onClick={() => {
                setActiveCategory(category);
                // apply immediately
                const params = new URLSearchParams();
                if (q.trim()) params.set('q', q.trim());
                if (category !== 'All') params.set('category', category);
                router.push('/?' + params.toString());
              }}
            >
              {category.toLowerCase().replace(' & ', '/')}
            </Button>
          ))}
        </div>

        <div className="w-full md:w-72">
          <input
            type="text"
            className="w-full rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#202124] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Search tools (e.g. JPG to WEBP)"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </form>
    </section>
  );
}
