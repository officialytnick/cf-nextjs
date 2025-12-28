import React from 'react';
import { Zap, ShieldCheck, Heart, Globe, Image, Wand2 } from 'lucide-react';

const features = [
  { Icon: Zap, title: 'Lightning Fast', desc: 'Optimized for speed — get results in seconds.' },
  { Icon: ShieldCheck, title: 'Privacy First', desc: 'All processing happens in your browser; nothing uploaded.' },
  { Icon: Heart, title: 'Completely Free', desc: 'No hidden fees or signup required.' },
  { Icon: Globe, title: 'Works Anywhere', desc: 'Use on desktop or mobile with modern browsers.' },
  { Icon: Image, title: 'High-Quality Output', desc: 'We preserve the best possible quality during conversions.' },
  { Icon: Wand2, title: 'Easy to Use', desc: 'Simple interface that gets the job done quickly.' },
];

export default function Features() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {features.map(({ Icon, title, desc }) => (
          <div key={title} className="flex gap-4 items-start bg-white dark:bg-[#0b1220] p-4 rounded shadow-sm">
            <div className="p-3 rounded-md bg-gray-100 dark:bg-gray-800">
              <Icon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </div>
            <div>
              <h4 className="font-semibold mb-1 text-gray-900 dark:text-white">{title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
