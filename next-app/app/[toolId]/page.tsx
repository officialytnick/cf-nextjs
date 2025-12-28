import React from 'react';
import { notFound } from 'next/navigation';
import { toolsData } from '../../lib/toolsData';
import type { Tool } from '../../lib/toolsData';
import type { Metadata } from 'next';
import ToolDetails from '../../components/ToolDetails';
import { getRelatedTools } from '../../lib/toolRelations';

interface Props {
  params: { toolId: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = toolsData.find((t) => t.id === params.toolId);
  if (!tool) return { title: 'Not found' };

  return {
    title: tool.seo?.title || tool.title,
    description: tool.seo?.description || tool.description,
    openGraph: {
      title: tool.seo?.title || tool.title,
      description: tool.seo?.description || tool.description,
      url: tool.seo?.canonical || `${process.env.SITE_URL}/${tool.id}`,
      images: tool.ogImage ? [{ url: tool.ogImage }] : undefined,
    },
  };
}

import dynamic from 'next/dynamic';

const DynamicFormatConverter = dynamic(() => import('../../components/tools/FormatConverter'), { ssr: false }) as React.ComponentType<{ tool: Tool }>;
const DynamicImageCompressor = dynamic(() => import('../../components/tools/ImageCompressor'), { ssr: false }) as React.ComponentType<{ tool: Tool }>;
const DynamicImageResizer = dynamic(() => import('../../components/tools/ImageResizer'), { ssr: false }) as React.ComponentType<{ tool: Tool }>;
const DynamicImageToPdf = dynamic(() => import('../../components/tools/ImageToPDF'), { ssr: false }) as React.ComponentType<{ tool: Tool }>;
const DynamicPdfToImage = dynamic(() => import('../../components/tools/PdfToImage'), { ssr: false }) as React.ComponentType<{ tool: Tool }>;
const DynamicFlipImage = dynamic(() => import('../../components/tools/FlipImage'), { ssr: false }) as React.ComponentType<{ tool: Tool }>;
const DynamicMergePdf = dynamic(() => import('../../components/tools/MergePdf'), { ssr: false }) as React.ComponentType<{ tool: Tool }>;
const DynamicBase64 = dynamic(() => import('../../components/tools/Base64EncodeDecode'), { ssr: false }) as React.ComponentType<{ tool: Tool }>;
const DynamicTextCase = dynamic(() => import('../../components/tools/TextCaseConverter'), { ssr: false }) as React.ComponentType<{ tool: Tool }>;
const DynamicUrlEncoder = dynamic(() => import('../../components/tools/UrlEncoderDecoder'), { ssr: false }) as React.ComponentType<{ tool: Tool }>;
const DynamicWordCounter = dynamic(() => import('../../components/tools/WordCounter'), { ssr: false }) as React.ComponentType<{ tool: Tool }>;
const DynamicJsonFormatter = dynamic(() => import('../../components/tools/JsonFormatter'), { ssr: false }) as React.ComponentType<{ tool: Tool }>;
const DynamicJsonToCsv = dynamic(() => import('../../components/tools/JsonToCsv'), { ssr: false }) as React.ComponentType<{ tool: Tool }>;
const DynamicJsMinifier = dynamic(() => import('../../components/tools/JsMinifier'), { ssr: false }) as React.ComponentType<{ tool: Tool }>;
const DynamicHtmlMinifier = dynamic(() => import('../../components/tools/HtmlMinifier'), { ssr: false }) as React.ComponentType<{ tool: Tool }>;
const DynamicCssMinifier = dynamic(() => import('../../components/tools/CssMinifier'), { ssr: false }) as React.ComponentType<{ tool: Tool }>;
const DynamicDuplicateLine = dynamic(() => import('../../components/tools/DuplicateLineRemover'), { ssr: false }) as React.ComponentType<{ tool: Tool }>;

export default function ToolPage({ params }: Props) {
  const tool = toolsData.find((t) => t.id === params.toolId);
  if (!tool) return notFound();

  const currentTool = tool as Tool;

  function renderToolUI(id: string | undefined) {
    switch (id) {
      case 'image-converter':
        return <DynamicFormatConverter tool={currentTool} />;
      case 'png-to-jpg':
      case 'jpg-to-png':
      case 'png-to-webp':
      case 'webp-to-png':
      case 'jpg-to-webp':
      case 'webp-to-jpg':
        return <DynamicFormatConverter tool={currentTool} />;
      case 'image-compressor':
        return <DynamicImageCompressor tool={currentTool} />;
      case 'image-resizer':
        return <DynamicImageResizer tool={currentTool} />;
      case 'image-to-pdf':
        return <DynamicImageToPdf tool={currentTool} />;
      case 'pdf-to-image':
        return <DynamicPdfToImage tool={currentTool} />;
      case 'merge-pdf':
        return <DynamicMergePdf tool={currentTool} />;
      case 'flip-image':
        return <DynamicFlipImage tool={currentTool} />;
      case 'base64':
        return <DynamicBase64 tool={currentTool} />;
      case 'word-counter':
        return <DynamicWordCounter tool={currentTool} />;
      case 'json-formatter':
        return <DynamicJsonFormatter tool={currentTool} />;
      case 'json-to-csv':
        return <DynamicJsonToCsv tool={currentTool} />;
      case 'js-minifier':
        return <DynamicJsMinifier tool={currentTool} />;
      case 'html-minifier':
        return <DynamicHtmlMinifier tool={currentTool} />;
      case 'css-minifier':
        return <DynamicCssMinifier tool={currentTool} />;
      case 'duplicate-line-remover':
        return <DynamicDuplicateLine tool={currentTool} />;
      case 'text-case':
        return <DynamicTextCase tool={currentTool} />;
      case 'url-encoder':
        return <DynamicUrlEncoder tool={currentTool} />;
      default:
        return <p className="text-sm text-gray-500">Tool UI will be available here soon.</p>;
    }
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">{tool.title}</h1>
      <p className="text-gray-600 mb-8">{tool.description}</p>

      <section className="rounded border p-6">
        {renderToolUI(tool.id)}
      </section>

      <ToolDetails tool={currentTool} relatedTools={getRelatedTools(currentTool)} />
    </main>
  );
}