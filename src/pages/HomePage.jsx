import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import SEOHelmet from '@/seo/HelmetConfig';
import { homeMeta } from '@/seo/toolMeta';
import { toolsData } from '@/lib/toolsData';
import ToolCard from '@/components/ToolCard';
import { Button } from '@/components/ui/button';
import HeroSection from '../components/HeroSection';
import { generateFaqSchema } from '@/seo/generateFaqSchema';
import { useLocation, useNavigate } from 'react-router-dom';

// const categories = ['All', 'IMAGE', 'PDF', 'DOCUMENT & TEXT', 'UTILITY'];
const categories = ['All', 'IMAGE', 'PDF', 'DOCUMENT & TEXT', 'UTILITY', 'DEVELOPER'];

const homeFaq = [
  {
    question: 'Is Convert Freely really free to use?',
    answer:
      'Yes. All tools on Convert Freely are 100% free with no hidden charges or required sign up.',
  },
  {
    question: 'Do you store or access my uploaded files?',
    answer:
      'Most operations run directly in your browser. Files are not permanently stored on our servers, and we do not access your private content.',
  },
  {
    question: 'Are there any limits on file size or number of conversions?',
    answer:
      'For best performance, we recommend reasonable file sizes, but you can use the tools as many times as you like with no strict daily limits.',
  },
  {
    question: 'Do I need to install any software?',
    answer:
      'No installation is required. Convert Freely works entirely in the browser on desktop, tablet, and mobile devices.',
  },
];

function useQuerySearchParam() {
  const location = useLocation();
  const [param, setParam] = useState('');

  useEffect(() => {
    try {
      const search = new URLSearchParams(location.search);
      const q = search.get('q') || '';
      setParam(q);
    } catch {
      setParam('');
    }
  }, [location.search]);

  return param;
}

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  // const [recentTools, setRecentTools] = useState([]);

  const querySearch = useQuerySearchParam();
  const navigate = useNavigate();

  // Sync query param into searchTerm (e.g. from mobile search in header)
  useEffect(() => {
    if (querySearch && querySearch !== searchTerm) {
      setSearchTerm(querySearch);
      // When searching globally, we can keep activeCategory as-is,
      // but search will ignore it (see filter logic).
    }
  }, [querySearch]);

  // Load recently used tools from localStorage
  // useEffect(() => {
  //   try {
  //     const stored = JSON.parse(localStorage.getItem('recentTools') || '[]');
  //     if (Array.isArray(stored) && stored.length > 0) {
  //       setRecentTools(stored);
  //     }
  //   } catch {
  //     // ignore
  //   }
  // }, []);

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredTools = toolsData.filter((tool) => {
    const haystack = (
      tool.title +
      ' ' +
      (tool.description || '') +
      ' ' +
      (tool.id || '')
    ).toLowerCase();

    const matchesSearch = normalizedSearch
      ? haystack.includes(normalizedSearch)
      : true;

    // If there is a search term, we want to search across ALL categories,
    // so category filter only applies when search is empty.
    const matchesCategory =
      !normalizedSearch &&
      (activeCategory === 'All' || tool.category === activeCategory);

    return normalizedSearch ? matchesSearch : matchesCategory && matchesSearch;
  });

  const popularTools = toolsData.filter((tool) => tool.popular === true);

  // If user typed a clear query and it uniquely matches one tool, redirect
  useEffect(() => {
    if (normalizedSearch && filteredTools.length === 1) {
      try {
        navigate(`/${filteredTools[0].id}`);
      } catch (e) {
        // ignore navigation errors in SSR or tests
      }
    }
  }, [normalizedSearch, filteredTools, navigate]);

  // const recentToolObjects = recentTools
  //   .map((id) => toolsData.find((t) => t.id === id))
  //   .filter(Boolean);

  const faqSchemaJson = generateFaqSchema(homeFaq, 'Convert Freely');

  return (
    <>
      <SEOHelmet {...homeMeta} />
      <Helmet>
        {faqSchemaJson && (
          <script type="application/ld+json">{faqSchemaJson}</script>
        )}
      </Helmet>

      {/* Off-screen home image for crawlers */}
      <div style={{ position: 'absolute', left: -9999, top: -9999, width: 1, height: 1, overflow: 'hidden' }} aria-hidden="true">
        <img 
          src={homeMeta.ogImage} 
          alt="Convert Freely" 
          width="1200" 
          height="630" 
          onError={(e) => { e.target.src = 'https://convertfreely.com/media/social/convertfreely.webp'; }}
        />
      </div>

      <div className="flex flex-col">
        {/* HERO */}
        <HeroSection />

        {/* ALL TOOLS SECTION */}
        <section
          id="toolsSection"
          className="container mx-auto px-4 py-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 dark:text-white mb-4">
              The Ultimate Suite of Free Online Tools
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Convert, compress, and optimize your files with our powerful
              collection of image, PDF, and text utilities.
            </p>
          </motion.div>

          {/* Search + category filters */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? 'destructive' : 'outline'}
                  className="rounded-full capitalize"
                  onClick={() => setActiveCategory(category)}
                  disabled={!!normalizedSearch} // when searching, disable category buttons
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Tools grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          >
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} {...tool} />
            ))}
          </motion.div>

          {filteredTools.length === 0 && (
            <p className="mt-8 text-gray-500 dark:text-gray-400">
              No tools found for your search. Try a different keyword.
            </p>
          )}
        </section>

        {/* RECENTLY USED TOOLS */}
        {/* {recentToolObjects.length > 0 && (
          <section className="container mx-auto px-4 pb-12 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Recently used tools
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {recentToolObjects.map((tool) => (
                <ToolCard key={tool.id} {...tool} />
              ))}
            </motion.div>
          </section>
        )} */}

        {/* POPULAR TOOLS */}
        {popularTools.length > 0 && (
          <section className="container mx-auto px-4 pb-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Popular tools
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            >
              {popularTools.map((tool) => (
                <ToolCard key={tool.id} {...tool} />
              ))}
            </motion.div>
          </section>
        )}

        {/* HOME FAQ - redesigned */}
        <section className="container mx-auto px-4 pb-16 ">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center"
          >
            Frequently asked questions
          </motion.h2>

          <div className="mb-12 rounded-xl bg-white dark:bg-[#202124] p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            {homeFaq.map((item, index) => (
              <details
                key={index}
                className="group py-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
              >
                <summary className="flex justify-between items-center cursor-pointer text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {item.question}
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>

                <p className="mt-3 text-gray-600 dark:text-gray-400">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
