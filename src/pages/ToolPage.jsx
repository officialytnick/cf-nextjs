import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toolsData } from "@/lib/toolsData";
import NextToolActions from "@/components/NextToolActions";
import { getRelatedTools } from "@/lib/toolRelations";
import ToolCard from "@/components/ToolCard";
import { Star } from "lucide-react";
import FloatingShare from "@/components/shared/FloatingShare";



// Import tool components
import PlaceholderTool from "@/components/tools/PlaceholderTool";
import FormatConverter from "@/components/tools/FormatConverter";
import ImageResizer from "@/components/tools/ImageResizer";
import ImageCompressor from "@/components/tools/ImageCompressor";
import ColorPicker from "@/components/tools/ColorPicker";
import ImageToPDF from "@/components/tools/ImageToPDF";
import RotateImage from "@/components/tools/RotateImage";
import FlipImage from "@/components/tools/FlipImage";
import WordCounter from "@/components/tools/WordCounter";
import TextCaseConverter from "@/components/tools/TextCaseConverter";
import DuplicateLineRemover from "@/components/tools/DuplicateLineRemover";
import QrCodeGenerator from "@/components/tools/QrCodeGenerator";
import PasswordGenerator from "@/components/tools/PasswordGenerator";
import JsonFormatter from "@/components/tools/JsonFormatter";
import MergePdf from "@/components/tools/MergePdf";
import BulkFileRename from "@/components/tools/BulkFileRename";
import PdfToImage from "@/components/tools/PdfToImage";
import IpAddressFinder from "@/components/tools/IpAddressFinder";
import JsonToCsv from "@/components/tools/JsonToCsv";
import HtmlMinifier from "@/components/tools/HtmlMinifier";
import CssMinifier from "@/components/tools/CssMinifier";
import JsMinifier from "@/components/tools/JsMinifier";
import Base64EncodeDecode from "@/components/tools/Base64EncodeDecode";
import UrlEncoderDecoder from "@/components/tools/UrlEncoderDecoder";
// PDF tools removed per user request

const toolComponentMap = {
  "image-converter": FormatConverter,
  "jpg-to-png": FormatConverter,
  "png-to-jpg": FormatConverter,
  "jpg-to-webp": FormatConverter,
  "webp-to-jpg": FormatConverter,
  "png-to-webp": FormatConverter,
  "webp-to-png": FormatConverter,
  "image-compressor": ImageCompressor,
  "image-resizer": ImageResizer,
  "color-picker": ColorPicker,
  "image-to-pdf": ImageToPDF,
  "pdf-to-image": PdfToImage,
  "rotate-image": RotateImage,
  "flip-image": FlipImage,
  "word-counter": WordCounter,
  "text-case-converter": TextCaseConverter,
  "duplicate-line-remover": DuplicateLineRemover,
  "qr-code-generator": QrCodeGenerator,
  "password-generator": PasswordGenerator,
  "json-formatter": JsonFormatter,
  "merge-pdf": MergePdf,
  "bulk-file-rename": BulkFileRename,
  "ip-address-finder": IpAddressFinder,
  "json-to-csv": JsonToCsv,
  "html-minifier": HtmlMinifier,
  "css-minifier": CssMinifier,
  "js-minifier": JsMinifier,
  "base64-encode-decode": Base64EncodeDecode,
  "url-encoder-decoder": UrlEncoderDecoder,
  
};

// ---------------------------
// SEO BLOCK WITH FAQ + RATING SCHEMA
// ---------------------------
const SEOBlock = ({ tool }) => {
  const seo = tool.seo || {};
  const rating = tool.rating || { value: 5, reviews: 0 };
  const faqList = tool.faq || [];

  const canonical = seo.canonical || `https://convertfreely.com/${tool.id}`;

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: tool.title,
    description: seo.description || tool.description,
    url: canonical,
    image: tool.ogImage || tool.image,
  };

  const toolSchema =
    rating.reviews > 0
      ? {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: tool.title,
          operatingSystem: "Web",
          applicationCategory: "Utility",
          description: seo.description || tool.description,
          url: canonical,
          image: tool.ogImage || tool.image,
          isAccessibleForFree: true,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: rating.value,
            reviewCount: rating.reviews,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : null;

  const faqSchema =
    faqList.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqList.map((q) => ({
            "@type": "Question",
            name: q.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: q.answer,
            },
          })),
        }
      : null;

  return (
    <Helmet>
      <title>{seo.title || `${tool.title} | Convert Freely`}</title>
      <meta name="description" content={seo.description || tool.description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={seo.title || `${tool.title} | Convert Freely`} />
      <meta property="og:description" content={seo.description || tool.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      {tool.ogImage && <meta property="og:image" content={tool.ogImage} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title || `${tool.title} | Convert Freely`} />
      <meta name="twitter:description" content={seo.description || tool.description} />
      {tool.ogImage && <meta name="twitter:image" content={tool.ogImage} />}

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
      {toolSchema && (
        <script type="application/ld+json">{JSON.stringify(toolSchema)}</script>
      )}
      {faqSchema && (
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      )}
    </Helmet>
  );
};

// ---------------------------
// MAIN TOOL PAGE
// ---------------------------
const ToolPage = () => {
  const { toolId } = useParams();
  const tool = toolsData.find((t) => t.id === toolId);

  useEffect(() => {
    // Scroll to top on tool change
    window.scrollTo(0, 0);
  }, [toolId]);


  if (!tool) return <Navigate to="/" replace />;

  const ToolComponent = toolComponentMap[toolId] || PlaceholderTool;
  const rating = tool.rating || { value: 5, reviews: 0 };
  const steps = tool.steps || [];
  const features = tool.features || [];
  const faq = tool.faq || [];

  const colsClass =
    steps.length === 2
      ? "md:grid-cols-2"
      : steps.length === 3
      ? "md:grid-cols-3"
      : steps.length >= 4
      ? "md:grid-cols-4"
      : "md:grid-cols-1";

  const relatedTools = getRelatedTools(tool);

  return (
    <>
      <SEOBlock tool={tool} />

      {/* Off-screen, crawlable image for Google Images and crawlers.
          Positioned off-screen (not display:none) so crawlers can index it
          while users won't see it on the page. */}
      <div style={{ position: 'absolute', left: -9999, top: -9999, width: 1, height: 1, overflow: 'hidden' }} aria-hidden="true">
        <img 
          src={tool.ogImage || tool.image} 
          alt={tool.title} 
          width="1200" 
          height="630" 
          onError={(e) => { e.target.src = 'https://convertfreely.com/media/social/convertfreely.webp'; }}
        />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {tool.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {tool.description}
            </p>
          </div>

          {/* Rating */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-2 text-yellow-500 mb-8"
          >
            <Star className="w-5 h-5 fill-current" />
            <span className="font-bold text-gray-700 dark:text-gray-300">
              {rating.value} / 5
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              ({rating.reviews.toLocaleString()} reviews)
            </span>
          </motion.div>

          {/* Tool UI */}
          <div className="mb-12">
            <ToolComponent tool={tool} />
            <NextToolActions tool={tool} />
          </div>

          {/* Steps */}
          {steps.length > 0 && (
            <section className="mb-16 rounded-xl border bg-white dark:bg-[#202124] px-6 md:px-10 py-14">
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="text-2xl md:text-3xl font-bold text-center mb-14 text-gray-900 dark:text-white"
              >
                How It Works
              </motion.h2>

              <div className={`grid gap-10 ${colsClass}`}>
                {steps.map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.12 }}
                      className="group text-center"
                    >
                      {/* Step Icon */}
                      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 dark:bg-[#1b1c1d] text-red-500 shadow-sm transition-all duration-300 group-hover:bg-red-500 group-hover:text-white group-hover:scale-110">
                        {Icon && <Icon className="w-7 h-7" />}
                      </div>

                      {/* Step Number */}
                      <span className="block text-sm font-semibold text-gray-400 group-hover:text-red-500 mb-2 transition-colors">
                        Step {index + 1}
                      </span>

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs mx-auto">
                        {step.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Features */}
          {features.length > 0 && (
            <section className="mb-12 rounded-xl bg-white dark:bg-[#202124] p-8 border border-gray-200 dark:border-gray-800">
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="text-2xl font-bold text-center mb-10 text-gray-900 dark:text-white"
              >
                Why Use This Tool?
              </motion.h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#181a1b] p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
                    >
                      {/* Animated top bar */}
                      <span className="absolute inset-x-0 top-0 h-1 bg-red-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />

                      {/* Icon */}
                      {Icon && (
                        <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400 transition-transform duration-300 group-hover:scale-110">
                          <Icon className="w-6 h-6" />
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors group-hover:text-red-500">
                        {feature.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </section>

          )}

          {/* FAQ */}
          {faq.length > 0 && (
            <section className="mb-12 rounded-xl bg-white dark:bg-[#202124] p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
              <h2 className="text-2xl font-bold text-left mb-6 text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h2>

              <div className="w-full">
                {faq.map((item, index) => (
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
          )}

          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <section className="mb-4">
              <h2 className="text-2xl font-bold text-left mb-6 text-gray-900 dark:text-white">
                You Might Also Like
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedTools.map((t) => (
                  <ToolCard key={t.id} {...t} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
      <FloatingShare title={tool?.title}/>

    </>
    
  );
};
export default ToolPage;