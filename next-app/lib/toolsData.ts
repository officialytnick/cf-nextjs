export type Tool = {
  id: string;
  title: string;
  description: string;
  category?: string;
  popular?: boolean;
  isNew?: boolean;
  icon?: string;
  color?: string;
  seo?: {
    title?: string;
    description?: string;
    canonical?: string;
    keywords?: string[];
  };
  ogImage?: string;
  features?: { title: string; description: string }[];
  steps?: { title: string; description: string }[];
  faq?: { question: string; answer: string }[];
};


const defaultFeatures = [
  { title: 'Lightning Fast', description: 'Optimized for speed — get results in seconds.' },
  { title: 'Privacy First', description: 'All processing happens in your browser; nothing uploaded.' },
  { title: 'Completely Free', description: 'No hidden fees or signup required.' },
  { title: 'Works Anywhere', description: 'Use on desktop or mobile with modern browsers.' },
  { title: 'High-Quality Output', description: 'We preserve the best possible quality during conversions.' },
  { title: 'Easy to Use', description: 'Simple interface that gets the job done quickly.' },
];

export const toolsData: Tool[] = [
  {
    id: 'image-converter',
    title: 'Image Converter',
    description: 'Convert images to JPG, PNG, WEBP and more.',
    icon: 'FileImage',
    color: 'blue',
    isNew: true,
    category: 'IMAGE',
    popular: true,
    features: defaultFeatures,
    steps: [
      { title: 'Upload Images', description: 'Drag & drop or choose one or more images from your device.' },
      { title: 'Choose Format', description: 'Select a target format (JPG, PNG, WEBP) or let the tool auto-detect.' },
      { title: 'Convert & Download', description: 'Convert and download single files or a ZIP for multiple images.' },
    ],
    faq: [
      { question: 'Which formats are supported?', answer: 'We support common web formats such as JPG, PNG and WEBP.' },
      { question: 'Are my files uploaded to a server?', answer: 'No — conversion happens in your browser and files are not uploaded.' },
    ],
    seo: {
      title: 'Image Converter | Convert Freely',
      description: 'Convert images online quickly and privately.',
      canonical: 'https://convertfreely.com/image-converter',
    },
    ogImage: '/media/social/convertfreely.webp',
  },
  {
    id: 'jpg-to-webp',
    title: 'JPG to WEBP',
    description: 'Convert JPG images to next-gen WEBP format.',
    icon: 'FileImage',
    color: 'green',
    popular: true,
    category: 'IMAGE',
    seo: {
      title: 'JPG to WEBP | Convert Freely',
      description: 'Convert JPG to WEBP quickly and privately.',
      canonical: 'https://convertfreely.com/jpg-to-webp',
    },
  },
  {
    id: 'png-to-jpg',
    title: 'PNG to JPG',
    description: 'Convert PNG images to JPG format.',
    icon: 'FileImage',
    color: 'orange',
    category: 'IMAGE',
    seo: {
      title: 'PNG to JPG | Convert Freely',
      description: 'Convert PNG to JPG in your browser quickly and privately.',
      canonical: 'https://convertfreely.com/png-to-jpg',
    },
  },
  {
    id: 'jpg-to-png',
    title: 'JPG to PNG',
    description: 'Convert JPG images to PNG format.',
    icon: 'FileImage',
    color: 'teal',
    category: 'IMAGE',
    seo: {
      title: 'JPG to PNG | Convert Freely',
      description: 'Convert JPG to PNG quickly and privately.',
      canonical: 'https://convertfreely.com/jpg-to-png',
    },
  },
  {
    id: 'png-to-webp',
    title: 'PNG to WEBP',
    description: 'Convert PNG images to WEBP for better compression.',
    icon: 'FileImage',
    color: 'blue',
    category: 'IMAGE',
    seo: {
      title: 'PNG to WEBP | Convert Freely',
      description: 'Convert PNG to WEBP in your browser.',
      canonical: 'https://convertfreely.com/png-to-webp',
    },
  },
  {
    id: 'webp-to-png',
    title: 'WEBP to PNG',
    description: 'Convert WEBP images to PNG format.',
    icon: 'FileImage',
    color: 'gray',
    category: 'IMAGE',
    seo: {
      title: 'WEBP to PNG | Convert Freely',
      description: 'Convert WEBP to PNG quickly and privately.',
      canonical: 'https://convertfreely.com/webp-to-png',
    },
  },
  {
    id: 'webp-to-jpg',
    title: 'WEBP to JPG',
    description: 'Convert WEBP images to JPG format.',
    icon: 'FileImage',
    color: 'pink',
    category: 'IMAGE',
    seo: {
      title: 'WEBP to JPG | Convert Freely',
      description: 'Convert WEBP to JPG quickly and privately.',
      canonical: 'https://convertfreely.com/webp-to-jpg',
    },
  },
  {
    id: 'image-compressor',
    title: 'Image Compressor',
    description: 'Reduce the file size of your images without losing quality.',
    icon: 'Minimize',
    color: 'purple',
    category: 'IMAGE',
    popular: true,
    features: defaultFeatures,
    steps: [
      { title: 'Upload Images', description: 'Select one or more images to compress.' },
      { title: 'Adjust Quality', description: 'Use the quality slider to balance size and quality.' },
      { title: 'Compress & Download', description: 'Compress and download single files or a ZIP.' },
    ],
    faq: [
      { question: 'Will compression reduce image quality?', answer: 'Compression reduces file size with minimal quality loss; you can adjust the quality slider.' },
      { question: 'Is compression secure?', answer: 'Yes — compression runs in your browser only.' },
    ],
    seo: {
      title: 'Image Compressor | Convert Freely',
      description: 'Compress images in your browser for faster pages.',
      canonical: 'https://convertfreely.com/image-compressor',
    },
  },
  {
    id: 'bulk-file-rename',
    title: 'Bulk File Rename',
    description: 'Quickly rename many files with custom prefixes.',
    icon: 'FolderSync',
    color: 'red',
    category: 'IMAGE',
    popular: true,
    isNew: true,
    seo: {
      title: 'Bulk File Rename | Convert Freely',
      description: 'Rename multiple files quickly and download as a ZIP.',
      canonical: 'https://convertfreely.com/bulk-file-rename',
    },
  },
  {
    id: 'image-resizer',
    title: 'Image Resizer',
    description: 'Resize your images to specific dimensions.',
    category: 'IMAGE',
    features: defaultFeatures,
    steps: [
      { title: 'Upload Image', description: 'Upload the image you want to resize.' },
      { title: 'Specify Size', description: 'Enter width and height or choose preset sizes.' },
      { title: 'Resize & Download', description: 'Resize and download your image.' },
    ],
    faq: [
      { question: 'Can I keep aspect ratio?', answer: 'Yes, the tool provides an option to lock aspect ratio while resizing.' },
    ],
    seo: {
      title: 'Image Resizer | Convert Freely',
      description: 'Resize images by width and height right in your browser.',
      canonical: 'https://convertfreely.com/image-resizer',
    },
  },
  {
    id: 'image-to-pdf',
    title: 'Image to PDF',
    description: 'Convert multiple images into a single PDF file.',
    category: 'PDF',
    features: defaultFeatures,
    steps: [
      { title: 'Upload Images', description: 'Select one or more images to combine.' },
      { title: 'Arrange & Options', description: 'Re-order images and choose page size or orientation.' },
      { title: 'Generate PDF', description: 'Create and download a single PDF file.' },
    ],
    faq: [
      { question: 'Can I reorder images?', answer: 'Yes — reorder images before generating the PDF.' },
    ],
    seo: {
      title: 'Image to PDF | Convert Freely',
      description: 'Merge images into a single PDF in the browser.',
      canonical: 'https://convertfreely.com/image-to-pdf',
    },
  },
  {
    id: 'flip-image',
    title: 'Flip Image',
    description: 'Flip images horizontally or vertically.',
    category: 'IMAGE',
    icon: 'RotateCw',
    color: 'indigo',
    seo: {
      title: 'Flip Image | Convert Freely',
      description: 'Flip images horizontally or vertically right in your browser.',
      canonical: 'https://convertfreely.com/flip-image',
    },
  },
  {
    id: 'pdf-to-image',
    title: 'PDF to Image',
    description: 'Extract images from PDF or convert PDF pages to images.',
    category: 'PDF',
    features: defaultFeatures,
    steps: [
      { title: 'Upload PDF', description: 'Choose a PDF file from your device.' },
      { title: 'Select Pages', description: 'Pick pages or extract all pages as images.' },
      { title: 'Convert & Download', description: 'Download individual images or a ZIP of all pages.' },
    ],
    faq: [
      { question: 'What image formats are supported?', answer: 'You can export pages to PNG or JPG formats.' },
    ],
    seo: {
      title: 'PDF to Image | Convert Freely',
      description: 'Convert PDF pages to images in your browser.',
      canonical: 'https://convertfreely.com/pdf-to-image',
    },
  },
  {
    id: 'merge-pdf',
    title: 'Merge PDF',
    description: 'Combine multiple PDF files into one PDF document.',
    category: 'PDF',
    features: defaultFeatures,
    steps: [
      { title: 'Upload PDFs', description: 'Select multiple PDF files from your device.' },
      { title: 'Reorder & Merge', description: 'Arrange PDFs and merge into a single document.' },
      { title: 'Download', description: 'Download the merged PDF file to your device.' },
    ],
    faq: [
      { question: 'Do the PDFs stay private?', answer: 'Yes — merging happens locally in your browser.' },
    ],
    seo: {
      title: 'Merge PDF | Convert Freely',
      description: 'Merge many PDFs into a single file locally in the browser.',
      canonical: 'https://convertfreely.com/merge-pdf',
    },
  },
  {
    id: 'base64',
    title: 'Base64 Encode / Decode',
    description: 'Encode text to Base64 or decode Base64 back to text.',
    category: 'TEXT',
    seo: {
      title: 'Base64 Encode / Decode | Convert Freely',
      description: 'Encode and decode Base64 strings securely in your browser.',
      canonical: 'https://convertfreely.com/base64',
    },
  },
  {
    id: 'text-case',
    title: 'Text Case Converter',
    description: 'Convert text between sentence case, lowercase, uppercase, and title case.',
    category: 'TEXT',
    seo: {
      title: 'Text Case Converter | Convert Freely',
      description: 'Convert text casing directly in your browser.',
      canonical: 'https://convertfreely.com/text-case',
    },
  },
  {
    id: 'url-encoder',
    title: 'URL Encoder / Decoder',
    description: 'Encode or decode URLs and text using URL encoding.',
    category: 'TEXT',
    seo: {
      title: 'URL Encoder / Decoder | Convert Freely',
      description: 'Encode and decode URLs safely in your browser.',
      canonical: 'https://convertfreely.com/url-encoder',
    },
  },
  {
    id: 'word-counter',
    title: 'Word Counter',
    description: 'Count words, characters, sentences and paragraphs in your text.',
    category: 'TEXT',
    seo: {
      title: 'Word Counter | Convert Freely',
      description: 'Quickly count words and characters in any text.',
      canonical: 'https://convertfreely.com/word-counter',
    },
  },
  {
    id: 'json-formatter',
    title: 'JSON Formatter',
    description: 'Format, minify and validate JSON content.',
    category: 'TEXT',
    seo: {
      title: 'JSON Formatter | Convert Freely',
      description: 'Beautify and minify JSON directly in the browser.',
      canonical: 'https://convertfreely.com/json-formatter',
    },
  },
  {
    id: 'json-to-csv',
    title: 'JSON to CSV',
    description: 'Convert JSON arrays to CSV files.',
    category: 'TEXT',
    seo: {
      title: 'JSON to CSV | Convert Freely',
      description: 'Convert JSON arrays to CSV in the browser.',
      canonical: 'https://convertfreely.com/json-to-csv',
    },
  },
  {
    id: 'js-minifier',
    title: 'JavaScript Minifier',
    description: 'Minify JavaScript by removing comments and extra whitespace.',
    category: 'TEXT',
    seo: {
      title: 'JavaScript Minifier | Convert Freely',
      description: 'Minify JS locally in your browser.',
      canonical: 'https://convertfreely.com/js-minifier',
    },
  },
  {
    id: 'html-minifier',
    title: 'HTML Minifier',
    description: 'Minify HTML by removing comments and unnecessary whitespace.',
    category: 'TEXT',
    seo: {
      title: 'HTML Minifier | Convert Freely',
      description: 'Minify HTML locally in your browser.',
      canonical: 'https://convertfreely.com/html-minifier',
    },
  },
  {
    id: 'css-minifier',
    title: 'CSS Minifier',
    description: 'Minify CSS by removing comments and compressing whitespace.',
    category: 'TEXT',
    seo: {
      title: 'CSS Minifier | Convert Freely',
      description: 'Minify CSS locally in your browser.',
      canonical: 'https://convertfreely.com/css-minifier',
    },
  },
  {
    id: 'duplicate-line-remover',
    title: 'Duplicate Line Remover',
    description: 'Remove duplicate lines from lists and optionally remove empty lines.',
    category: 'TEXT',
    seo: {
      title: 'Duplicate Line Remover | Convert Freely',
      description: 'Remove duplicate lines and optional empty lines locally.',
      canonical: 'https://convertfreely.com/duplicate-line-remover',
    },
  },
];