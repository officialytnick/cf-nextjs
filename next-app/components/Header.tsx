"use client";

"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { Pencil, ChevronDown, Image as ImageIcon, FileText, Wrench, Menu, X, ImageDown } from 'lucide-react';

import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel } from './ui/dropdown-menu';
import { toolsData } from '../lib/toolsData';

const headerItemClass =
  'h-10 px-3 flex items-center gap-2 text-sm font-medium ' +
  'text-gray-700 hover:text-red-500 hover:bg-gray-100 ' +
  'dark:hover:bg-gray-800 rounded-md transition';

const getColorClass = (color?: string) => {
  const map: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600',
    red: 'bg-red-100 text-red-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    orange: 'bg-orange-100 text-orange-600',
    pink: 'bg-pink-100 text-pink-600',
    teal: 'bg-teal-100 text-teal-600',
    cyan: 'bg-cyan-100 text-cyan-600',
    default: 'bg-gray-100 text-gray-600',
  };
  return (color && map[color]) || map.default;
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMenuOpen]);

  const imageTools = toolsData.filter((t) => t.category === 'IMAGE');
  const pdfTools = toolsData.filter((t) => t.category === 'PDF');
  const docTools = toolsData.filter((t) => t.category === 'DOCUMENT & TEXT');
  const utilityTools = toolsData.filter((t) => t.category === 'UTILITY');
  const developerTools = toolsData.filter((t) => t.category === 'DEVELOPER');

  const quickLinks = [
    { title: 'Image Converter', path: '/image-converter', icon: ImageIcon },
    { title: 'Image Compressor', path: '/image-compressor', icon: ImageDown },
  ];

  const toggleCategory = (title: string) => setOpenCategory(openCategory === title ? null : title);

  const renderToolCard = (tool: any) => {
    const Icon = (LucideIcons as any)[tool.icon] || LucideIcons.Zap;
    return (
      <Link key={tool.id} href={`/${tool.id}`} className="flex items-center gap-2 p-2 rounded-lg border hover:bg-gray-50 hover:border-gray-200 transition">
        <div className={`h-7 w-7 flex items-center justify-center rounded-md ${getColorClass(tool.color)}`}>
          <Icon className="h-4 w-4" />
        </div>
        <span className="text-sm font-medium">{tool.title}</span>
        {tool.isNew && <span className="ml-auto text-[10px] px-1 py-0.5 rounded bg-red-500 text-white">New</span>}
      </Link>
    );
  };

  return (
    <>
      <motion.header initial={{ y: -80 }} animate={{ y: 0 }} className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Pencil className="h-6 w-6 text-red-500" />
            <span className="text-lg font-semibold">Convert<span className="text-red-500">Freely</span></span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {quickLinks.map((l) => (
              <Link key={l.title} href={l.path} className={headerItemClass}>
                <l.icon className="h-4 w-4" />
                {l.title}
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={headerItemClass} aria-haspopup="menu" aria-expanded={openCategory === 'Image Tools'}>
                  <ImageIcon className="h-4 w-4" /> Image Tools <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[520px] grid grid-cols-2 gap-2 p-3" role="menu" aria-label="Image tools">
                {imageTools.map(renderToolCard)}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={headerItemClass}>
                  <FileText className="h-4 w-4" /> PDF Tools <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[360px] grid grid-cols-2 gap-2 p-3">
                {pdfTools.map(renderToolCard)}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={headerItemClass}>
                  <Wrench className="h-4 w-4" /> More Tools <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-[720px] p-4 space-y-5">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <DropdownMenuLabel>Document &amp; Text</DropdownMenuLabel>
                    <div className="grid grid-cols-1 gap-2 mt-2">{docTools.map(renderToolCard)}</div>
                  </div>

                  <div>
                    <DropdownMenuLabel>Utilities</DropdownMenuLabel>
                    <div className="grid grid-cols-1 gap-2 mt-2">{utilityTools.map(renderToolCard)}</div>
                  </div>
                </div>

                <div>
                  <DropdownMenuLabel>Developer Tools</DropdownMenuLabel>
                  <div className="grid grid-cols-2 gap-2 mt-2">{developerTools.map(renderToolCard)}</div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMenuOpen(true)}>
            <Menu />
          </Button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />

            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.3 }} className="fixed right-0 top-0 bottom-0 z-50 w-4/5 max-w-sm bg-white p-5 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Pencil className="h-6 w-6 text-red-500" />
                  <span className="text-lg font-semibold">Convert<span className="text-red-500">Freely</span></span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}><X /></Button>
              </div>

              <div className="mb-6">
                <h2 className="font-semibold mb-3">Quick Tools</h2>
                <div className="grid gap-2">{quickLinks.map((l) => (<Link key={l.title} href={l.path} className={headerItemClass}>{<l.icon className="h-5 w-5" />} {l.title}</Link>))}</div>
              </div>

              {[{title:'Image Tools', tools: imageTools}, {title:'PDF Tools', tools: pdfTools}, {title:'Document & Text', tools: docTools}, {title:'Utilities', tools: utilityTools}, {title:'Developer Tools', tools: developerTools}].map((cat) => (
                <div key={cat.title} className="border-b pb-3 mb-3">
                  <button onClick={() => toggleCategory(cat.title as string)} className="w-full flex justify-between font-semibold">{cat.title}<ChevronDown className={`h-4 w-4 transition ${openCategory === cat.title ? 'rotate-180' : ''}`} /></button>
                  {openCategory === cat.title && <div className="grid gap-2 mt-2">{(cat.tools as any[]).map(renderToolCard)}</div>}
                </div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
