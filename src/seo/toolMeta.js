
// // Auto-generated toolMeta helper
// import { toolsData } from '@/lib/toolsData';

// export function getMetaForTool(id){
//   const tool = toolsData.find(t => t.id === id);
//   if(!tool) return null;
//   const seo = tool.seo || {};
//   return {
//     title: seo.title || tool.title + ' | Convert Freely',
//     description: seo.description || tool.description || '',
//     keywords: (seo.keywords || []).join(', '),
//     canonical: seo.canonical || `https://convertfreely.com/${tool.id}`,
//     // ogImage: tool.ogImage || "https://yourdomain.com/media/social/default.png"
//   };
// }

// export const homeMeta = {
//   title: 'Convert Freely - Free Online Image, PDF & Text Tools',
//   description: 'Convert Freely offers 100% free online tools to convert, resize, compress, and manage images, PDFs, and text. Use fast browser-based converters for JPG, PNG, WEBP, PDF, and more - no signup needed.',
//   keywords: 'convert freely,convertfreely, image converter, pdf merger, jpg to png, png to jpg, webp converter, image resizer, image compressor, text converter, qr code generator, json formatter, password generator, online tools, convert free',
//   canonical: 'https://convertfreely.com',
//   // ogImage: tool.ogImage || "https://yourdomain.com/media/social/default.png"
// };


import { toolsData } from '@/lib/toolsData';

export function getMetaForTool(id){
  const tool = toolsData.find(t => t.id === id);
  if (!tool) return null;

  const seo = tool.seo || {};

  return {
    title: seo.title || `${tool.title} | Convert Freely`,
    description: seo.description || tool.description || '',
    keywords: (seo.keywords || []).join(', '),
    canonical: seo.canonical || `https://convertfreely.com/${tool.id}`,
    ogImage: tool.ogImage 
      ? tool.ogImage 
      : "https://convertfreely.com/media/social/convertfreely.webp",
  };
}

export const homeMeta = {
  
  title: 'Convert Freely | Free Online Image, PDF Converter Tools',
  description:
    'Convert Freely offers 100% free online tools to convert, resize, compress, and manage images, PDFs, and text. Use fast browser-based converters for JPG, PNG, WEBP, PDF, and more - no signup needed.',
  keywords:
    'convert freely,convertfreely, image converter, pdf merger, jpg to png, png to jpg, webp converter, image resizer, image compressor, text converter, qr code generator, json formatter, password generator, online tools, convert free',
  canonical: 'https://convertfreely.com',

  // ⭐ OG IMAGE FOR HOME PAGE
  ogImage: "https://convertfreely.com/media/social/convertfreely.webp",
};
