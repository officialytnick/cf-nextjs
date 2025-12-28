import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomeIntro from '../components/HomeIntro';
import HomeTools from '../components/HomeTools';
import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import dynamic from 'next/dynamic';
const ToolCard = dynamic(() => import('../components/ToolCard'), { ssr: false });
import { toolsData } from '../lib/toolsData';

export default function HomePage() {
  const popular = toolsData.filter((t) => t.popular).slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <HeroSection />

        <HomeIntro />

        <div className="container mx-auto px-4 py-4">
          <h2 className="text-2xl font-semibold mb-4">Popular tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {popular.map((t) => (
              <ToolCard key={t.id} {...t} />
            ))}
          </div>
        </div>

        <HomeTools />

        <Features />
      </main>

      <Footer />
    </div>
  );
}