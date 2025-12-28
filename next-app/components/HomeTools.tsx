"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Tool, toolsData } from '../lib/toolsData';
import ToolCard from './ToolCard';

export default function HomeTools() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const q = searchParams?.get('q') || '';
    const cat = searchParams?.get('category') || 'All';
    setSearchTerm(q);
    setActiveCategory(cat);
  }, [searchParams]);

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredTools = useMemo(() => {
    return toolsData.filter((tool) => {
      const haystack = (tool.title + ' ' + (tool.description || '') + ' ' + (tool.id || '')).toLowerCase();
      const matchesSearch = normalizedSearch ? haystack.includes(normalizedSearch) : true;
      const matchesCategory = !normalizedSearch && (activeCategory === 'All' || tool.category === activeCategory);
      return normalizedSearch ? matchesSearch : matchesCategory && matchesSearch;
    });
  }, [normalizedSearch, activeCategory]);

  useEffect(() => {
    if (normalizedSearch && filteredTools.length === 1) {
      router.push(`/${filteredTools[0].id}`);
    }
  }, [normalizedSearch, filteredTools, router]);

  return (
    <section id="toolsSection" role="region" aria-label="tools list" className="container mx-auto px-4 py-8 text-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredTools.map((tool: Tool) => (
          <ToolCard key={tool.id} {...tool} />
        ))}
      </div>

      {filteredTools.length === 0 && (
        <p className="mt-8 text-gray-500">No tools found for your search. Try a different keyword.</p>
      )}
    </section>
  );
}
