
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileImage, Maximize2, Zap } from 'lucide-react';
import FormatConverter from '@/components/tools/FormatConverter';
import ImageResizer from '@/components/tools/ImageResizer';
import ImageCompressor from '@/components/tools/ImageCompressor';

const ImageTools = () => {
  const [activeTab, setActiveTab] = useState('convert');

  const tools = [
    {
      id: 'convert',
      label: 'Converter',
      icon: FileImage,
      component: <FormatConverter tool={{ id: 'image-converter' }} />,
      seo: {
        title: 'All-in-One Image Converter | Convert JPG, PNG, WEBP',
        description: 'A free online tool to convert images to and from JPG, PNG, and WEBP formats. Fast, secure, and high-quality conversion for all your needs.',
      },
    },
    {
      id: 'resize',
      label: 'Resizer',
      icon: Maximize2,
      component: <ImageResizer />,
      seo: {
        title: 'Image Resizer | Resize Photos Online for Free',
        description: 'Easily resize images by pixel or percentage. Maintain aspect ratio and download your resized photo instantly.',
      },
    },
    {
      id: 'compress',
      label: 'Compressor',
      icon: Zap,
      component: <ImageCompressor />,
      seo: {
        title: 'Image Compressor | Reduce Image File Size Online',
        description: 'Compress JPG, PNG, and WEBP images online to reduce their file size without significant quality loss. Fast, free, and secure.',
      },
    }
  ];

  const activeTool = tools.find(t => t.id === activeTab);

  return (
    <>
      <Helmet>
        <title>{activeTool.seo.title}</title>
        <meta name="description" content={activeTool.seo.description} />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Powerful Image Tools
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              All processing happens in your browser - your images never leave your device.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-white dark:bg-gray-800 p-1 rounded-lg shadow-inner">
              {tools.map((tool) => (
                <TabsTrigger
                  key={tool.id}
                  value={tool.id}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 rounded-md"
                >
                  <tool.icon className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">{tool.label}</span>
                  <span className="sm:hidden">{tool.label.split(' ')[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {tools.map(tool => (
              <TabsContent key={tool.id} value={tool.id} className="mt-0">
                {tool.component}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </motion.div>
    </>
  );
};

export default ImageTools;
