import {
  Upload, Settings, Download, FileImage, Combine, FileText, Code, Minimize,
  Maximize, RotateCw, FlipHorizontal, FilePlus2, Pipette, Trash2, QrCode,
  KeyRound, FileJson, CaseSensitive, Zap, ShieldCheck, Heart, Globe, Image, Wand2, FolderSync
} from 'lucide-react';


const defaultFeatures = [
  { icon: Zap, title: 'Lightning Fast', description: 'Our tool is optimized for speed, delivering results in seconds.' },
  { icon: ShieldCheck, title: 'Privacy Guaranteed', description: 'Your files are processed in your browser and never uploaded to our servers.' },
  { icon: Heart, title: 'Completely Free', description: 'Enjoy full access to our tools without any cost or hidden fees.' },
  { icon: Globe, title: 'Works Anywhere', description: 'Access our tools from any device with a modern web browser.' },
  { icon: Image, title: 'High-Quality Output', description: 'We ensure the highest quality for all your converted files.' },
  { icon: Wand2, title: 'Easy To Use', description: 'A simple, intuitive interface makes our tools accessible to everyone.' },
];

export const toolsData = [

/* =======================================================
   IMAGE TOOLS (POPULAR FIRST)
======================================================= */

// ---------- POPULAR IMAGE TOOLS ----------
{
  id: 'image-converter',
  title: 'Image Converter',
  description: 'Convert images to JPG, PNG, WEBP, and more.',
  icon: 'FileImage',
  color: 'blue',
  category: 'IMAGE',
  isNew: true,
  popular: true,
  rating: { value: 4.9, reviews: 12500 },
  steps: [
    { icon: Upload, title: 'Upload Images', description: 'Click the "Choose Files" button to upload your images.' },
    { icon: Settings, title: 'Select Format', description: 'Choose a target format from the "Convert To" dropdown list.' },
    { icon: Download, title: 'Convert & Download', description: 'Click "Convert" to get your new, high-quality images.' },
  ],
  features: defaultFeatures,
  seo: {
    title: 'Image Converter | Free Online Image Converter - Fast & No Signup',
    description: 'Convert images online to JPG, PNG, WEBP and more instantly. Free, browser-based image converter with batch support, no signup, and high-quality output optimized for web and social media.',
    keywords: [
      'webp to png',
      'webp to jpg',
      'jpg to png',
      'png to jpg',
      'image converter online',
      'convert image to jpg png webp',
      'free image converter no signup',
      'batch image converter',
      'online image conversion high quality',
      'convert photos for web',
      'browser based image converter',
      'fast image converter'
    ],
    canonical: 'https://convertfreely.com/image-converter'
  },
  faq: [
    { question: 'What formats can I convert to?', answer: 'Convert to JPG, PNG, WEBP and more - our Image Converter supports common web formats and preserves quality for social and web use.' },
    { question: 'Is this converter free?', answer: 'Yes - it is completely free and browser-based with no signup required. Convert images instantly without uploading them to any server.' },
    { question: 'Can I convert multiple images at once?', answer: 'Yes - batch conversion is supported so you can convert many images in a single operation for faster workflows.' }
  ]
},

{
  id: 'jpg-to-webp',
  title: 'JPG to WEBP',
  description: 'Convert JPG images to next-gen WEBP format.',
  icon: 'FileImage',
  color: 'green',
  popular: true,
  category: 'IMAGE',
  rating: { value: 4.92, reviews: 5139 },
  steps: [
    { icon: Upload, title: 'Upload JPG', description: 'Select your JPG image file.' },
    { icon: Settings, title: 'Auto-Convert', description: 'The tool automatically converts your file to WEBP.' },
    { icon: Download, title: 'Download WEBP', description: 'Download your new, optimized WEBP image.' },
  ],
  features: defaultFeatures,
  seo: {
    title: 'JPG to WEBP Converter | Free Online WEBP Converter - Faster Pages',
    description: 'Convert JPG to WEBP online for improved compression and faster websites. Free, secure, and lossless/near-lossless options available - perfect for modern web optimization with no signup.',
    keywords: [
       'jpg to webp',
      'jpg to webp converter',
      'convert jpg to webp online',
      'webp image converter free',
      'optimize images for web webp',
      'image compression webp converter',
      'convert photos to webp no signup'
    ],
    canonical: 'https://convertfreely.com/jpg-to-webp'
  },
  faq: [
    { question: 'How to convert JPG to WEBP?', answer: 'Upload your JPG, hit Convert, and download the WEBP. Choose quality settings for maximum compression or quality retention.' },
    { question: 'Why use WEBP format?', answer: 'WEBP provides better compression and often smaller file sizes versus JPG and PNG, improving page speed and bandwidth usage.' }
  ]
},

{
  id: 'image-compressor',
  title: 'Image Compressor',
  description: 'Reduce the file size of your images.',
  icon: 'Minimize',
  color: 'purple',
  category: 'IMAGE',
  popular: true,
  rating: { value: 4.95, reviews: 10234 },
  steps: [
    { icon: Upload, title: 'Upload Image', description: 'Select one or more images to compress.' },
    { icon: Settings, title: 'Adjust Quality', description: 'Use the slider to choose the perfect compression level.' },
    { icon: Download, title: 'Download', description: 'Download your optimized, smaller images instantly.' },
  ],
  features: defaultFeatures,
  seo: {
    title: 'Image Compressor | Free Online Image Compression - Reduce Size Fast',
    description: 'Compress JPG, PNG, and WEBP online to reduce file size without significant quality loss. Free, privacy-first, and instant - ideal for web performance, emails, and faster uploads.',
    keywords: [
      'image compressor online',
      'compress images for web',
      'reduce image file size',
      'jpg png compressor',
      'online image compression no signup',
      'compress photo without losing quality'
    ],
    canonical: 'https://convertfreely.com/image-compressor'
  },
  faq: [
    { question: 'How does image compression work?', answer: 'We use efficient compression algorithms to reduce file size while keeping visual quality high - choose the quality slider to tune results.' },
    { question: 'Is it safe to use?', answer: 'Yes - all compression runs in your browser, so your images never leave your device.' }
  ]
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
  rating: { value: 4.97, reviews: 8421 },
  features: defaultFeatures,
  steps: [
    { 
      icon: Upload, 
      title: 'Upload Files', 
      description: 'Drag & drop or select files of any type to begin renaming.' 
    },
    { 
      icon: Settings, 
      title: 'Choose Rename Pattern', 
      description: 'Select automatic patterns or create your own custom prefix and counter.' 
    },
    { 
      icon: Download, 
      title: 'Download ZIP', 
      description: 'Export all renamed files as a ZIP archive with updated filenames.' 
    }
  ],
  seo: {
    title: 'Bulk File Rename | Rename Multiple Files Instantly Online - Free',
    description: 'Rename hundreds of files at once using custom prefixes, counters, and patterns. Free online bulk file renamer with ZIP export and local processing - no upload or signup required.',
    keywords: [
      'bulk file rename',
      'batch file rename online',
      'rename multiple files',
      'file renamer tool',
      'rename files and download zip'
    ],
    canonical: 'https://convertfreely.com/bulk-file-rename'
  },
  faq: [
    { question: 'Does this tool support all file types?', answer: 'Yes - images, documents, code, archives and more are supported. The tool preserves extensions while renaming filenames.' },
    { question: 'How are the renamed files downloaded?', answer: 'All renamed files are packaged into a ZIP archive available for instant download.' },
    { question: 'Are my files uploaded to a server?', answer: 'No - renaming and packaging can be done locally in your browser to protect your privacy.' }
  ]
},


// ---------- NON-POPULAR IMAGE TOOLS ----------
{
  id: 'webp-to-png',
  title: 'WEBP to PNG',
  description: 'Convert WEBP images to high-quality PNG format instantly.',
  icon: 'FileImage',
  color: 'blue',
  category: 'IMAGE',
  rating: { value: 4.92, reviews: 5402 },
  steps: [
    { icon: Upload, title: 'Upload WEBP', description: 'Select your WEBP image file.' },
    { icon: Settings, title: 'Auto-Convert', description: 'The tool automatically converts WEBP to PNG.' },
    { icon: Download, title: 'Download PNG', description: 'Download your new PNG image in high quality.' }
  ],
  features: defaultFeatures,
  seo: {
    title: 'WEBP to PNG Converter | Free Online WEBP to PNG Tool',
    description: 'Convert WEBP to PNG instantly online. High-quality, fast, and secure WEBP to PNG converter - no signup required.',
    keywords: [
      'webp to png',
      'webp to png converter',
      'convert webp to png',
      'online webp to png',
      'free webp to png tool',
      'high quality webp to png',
      'image converter webp to png'
    ],
    canonical: 'https://convertfreely.com/webp-to-png'
  },
  faq: [
    { question: 'How do I convert WEBP to PNG?', answer: 'Upload your WEBP file and the tool automatically converts it to PNG. Download instantly - no signup required.' },
    { question: 'Does PNG improve image quality?', answer: 'PNG keeps full quality and supports transparency, but it cannot increase quality beyond the original WEBP image.' }
  ]
},

{
  id: 'png-to-webp',
  title: 'PNG to WEBP',
  description: 'Convert PNG images to modern WEBP format.',
  icon: 'FileImage',
  color: 'blue',
  category: 'IMAGE',
  rating: { value: 4.94, reviews: 7201 },
  steps: [
    { icon: Upload, title: 'Upload PNG', description: 'Select your PNG image file.' },
    { icon: Settings, title: 'Auto-Convert', description: 'The tool automatically converts PNG to WEBP.' },
    { icon: Download, title: 'Download WEBP', description: 'Download your WEBP file with smaller size & great quality.' }
  ],
  features: defaultFeatures,
  seo: {
    title: 'PNG to WEBP Converter | Free Online PNG to WEBP Tool',
    description: 'Convert PNG to WEBP online instantly. Reduce image size while maintaining quality - fast, free & secure.',
    keywords: [
      'png to webp converter',
      'convert png to webp',
      'online png to webp',
      'reduce image size webp',
      'free png to webp tool',
      'png image to webp'
    ],
    canonical: 'https://convertfreely.com/png-to-webp'
  },
  faq: [
    { question: 'Does WEBP reduce file size?', answer: 'Yes, WEBP significantly reduces file size while keeping excellent image quality - ideal for websites and apps.' },
    { question: 'Is converting PNG to WEBP lossless?', answer: 'WEBP supports both lossy and lossless compression. Our converter uses high-quality compression for best results.' }
  ]
},

{
  id: 'jpg-to-png',
  title: 'JPG to PNG',
  description: 'Convert JPG images to transparent PNG format.',
  icon: 'FileImage',
  color: 'blue',
  category: 'IMAGE',
  rating: { value: 4.91, reviews: 6204 },
  steps: [
    { icon: Upload, title: 'Upload JPG', description: 'Select your JPG image file.' },
    { icon: Settings, title: 'Auto-Convert', description: 'The tool automatically converts your file to PNG.' },
    { icon: Download, title: 'Download PNG', description: 'Download your new high-quality PNG with transparency.' },
  ],
  features: defaultFeatures,
  seo: {
    title: 'JPG to PNG Converter | Free Online JPG to PNG (Transparent PNG)',
    description: 'Convert JPG to PNG online instantly. Free, fast, and secure JPG to transparent PNG converter with no signup - perfect for editing, design, and web use.',
    keywords: [
      'jpg to png converter',
      'convert jpg to png online',
      'transparent png converter',
      'free jpg to png',
      'jpg to png no signup',
      'convert photo to png',
      'online image converter jpg to png'
    ],
    canonical: 'https://convertfreely.com/jpg-to-png'
  },
  faq: [
    { question: 'How to convert JPG to PNG?', answer: 'Upload your JPG, choose PNG output and click Convert - download the PNG instantly. No signup needed.' },
    { question: 'Will transparency be preserved?', answer: 'JPG does not support transparency. Converting JPG to PNG retains image quality but transparency can only be added if the original has alpha data.' }
  ]
},

{
  id: 'png-to-jpg',
  title: 'PNG to JPG',
  description: 'Convert PNG images to standard JPG format.',
  icon: 'FileImage',
  color: 'blue',
  category: 'IMAGE',
  rating: { value: 4.89, reviews: 7123 },
  steps: [
    { icon: Upload, title: 'Upload PNG', description: 'Select your PNG image file.' },
    { icon: Settings, title: 'Auto-Convert', description: 'The tool automatically converts your file to JPG.' },
    { icon: Download, title: 'Download JPG', description: 'Download your new, smaller JPG file.' },
  ],
  features: defaultFeatures,
  seo: {
    title: 'PNG to JPG Converter | Free Online PNG to JPG - Reduce File Size',
    description: 'Convert PNG to JPG online for faster loading and smaller files. Free, instant PNG to JPG converter with high-quality output and no signup - ideal for websites and sharing.',
    keywords: [
      'png to jpg converter',
      'convert png to jpg online',
      'png to jpeg converter free',
      'reduce image file size png to jpg',
      'online png to jpg no signup',
      'convert transparent png to jpg'
    ],
    canonical: 'https://convertfreely.com/png-to-jpg'
  },
  faq: [
    { question: 'Why convert PNG to JPG?', answer: 'Converting PNG to JPG reduces file size for faster uploading and web performance. Use the tool to balance quality vs size with adjustable compression.' },
    { question: 'Will I lose transparency?', answer: 'Yes - JPG does not support transparency. Transparent areas will be flattened, typically to white or a chosen background color.' }
  ]
},

{
  id: 'webp-to-jpg',
  title: 'WEBP to JPG',
  description: 'Convert modern WEBP images to universal JPG.',
  icon: 'FileImage',
  color: 'green',
  category: 'IMAGE',
  rating: { value: 4.88, reviews: 4890 },
  steps: [
    { icon: Upload, title: 'Upload WEBP', description: 'Select your WEBP image file.' },
    { icon: Settings, title: 'Auto-Convert', description: 'The tool automatically converts your file to JPG.' },
    { icon: Download, title: 'Download JPG', description: 'Download your new, universally compatible JPG image.' },
  ],
  features: defaultFeatures,
  seo: {
    title: 'WEBP to JPG Converter | Free Online WEBP to JPG - Compatible Output',
    description: 'Convert WEBP to JPG online instantly. Free, high-quality conversion for compatibility with older devices and software - no signup required and processed in your browser.',
    keywords: [
      'webp to jpg converter',
      'convert webp to jpg online',
      'webp to jpeg free',
      'convert webp images for compatibility',
      'online webp to jpg no signup'
    ],
    canonical: 'https://convertfreely.com/webp-to-jpg'
  },
  faq: [
    { question: 'Can I convert WEBP to JPG?', answer: 'Yes - upload your WEBP and convert it to a widely-supported JPG format in seconds, perfect for older devices or non-WEBP apps.' },
    { question: 'Will conversion reduce quality?', answer: 'The tool offers quality settings to balance size vs quality - choose higher quality to keep visual fidelity.' }
  ]
},

{
  id: 'image-resizer',
  title: 'Image Resizer',
  description: 'Resize your images to specific dimensions.',
  icon: 'Maximize',
  color: 'purple',
  category: 'IMAGE',
  rating: { value: 4.93, reviews: 8456 },
  steps: [
    { icon: Upload, title: 'Upload Image', description: 'Select the image you want to resize.' },
    { icon: Settings, title: 'Enter Dimensions', description: 'Input your desired width and height in pixels.' },
    { icon: Download, title: 'Download Resized Image', description: 'Click "Resize" and download your perfectly sized photo.' },
  ],
  features: defaultFeatures,
  seo: {
    title: 'Image Resizer | Free Online Image Resizer - Resize Photos Instantly',
    description: 'Resize images by pixel or percentage instantly online. Free, precise resizing for social media, web, and print - maintain aspect ratio or set custom dimensions with no signup.',
    keywords: [
      'image resizer online',
      'resize image to specific dimensions',
      'resize photo for instagram',
      'free image resizer no signup',
      'resize image without losing quality'
    ],
    canonical: 'https://convertfreely.com/image-resizer'
  },
  faq: [
    { question: 'How do I resize an image?', answer: 'Upload your image, set desired width/height or percentage, lock aspect ratio if needed, then resize and download instantly.' },
    { question: 'What is aspect ratio?', answer: 'Aspect ratio is the proportional relationship between width and height - lock it to prevent the image from stretching.' }
  ]
},

{
  id: 'rotate-image',
  title: 'Rotate Image',
  description: 'Rotate images by 90, 180, or 270 degrees.',
  icon: 'RotateCw',
  color: 'indigo',
  category: 'IMAGE',
  rating: { value: 4.87, reviews: 4321 },
  steps: [
    { icon: Upload, title: 'Upload Image', description: 'Select the image you want to rotate.' },
    { icon: Settings, title: 'Choose Rotation', description: 'Click the buttons to rotate left or right.' },
    { icon: Download, title: 'Download Rotated Image', description: 'Download your image in its new orientation.' },
  ],
  features: defaultFeatures,
  seo: {
    title: 'Rotate Image | Free Online Image Rotator - Rotate Photos Instantly',
    description: 'Rotate images left or right by 90, 180, or any angle quickly online. Free, no signup required, with lossless rotation options for best quality.',
    keywords: [
      'rotate image online',
      'rotate photo left right',
      'image rotator free',
      'rotate picture without quality loss',
      'rotate image tool'
    ],
    canonical: 'https://convertfreely.com/rotate-image'
  },
  faq: [
    { question: 'How do I rotate my image?', answer: 'Upload the image, use the rotate controls to set the desired angle, then download the rotated image instantly.' },
    { question: 'Does this tool reduce quality?', answer: 'No - rotation is performed with minimal or no quality loss depending on output settings.' }
  ]
},

{
  id: 'flip-image',
  title: 'Flip Image',
  description: 'Flip images horizontally or vertically.',
  icon: 'FlipHorizontal',
  color: 'indigo',
  category: 'IMAGE',
  rating: { value: 4.86, reviews: 4102 },
  steps: [
    { icon: Upload, title: 'Upload Image', description: 'Select the image you want to flip.' },
    { icon: Settings, title: 'Choose Flip Direction', description: 'Click to flip horizontally or vertically.' },
    { icon: Download, title: 'Download Flipped Image', description: 'Download your mirrored image instantly.' },
  ],
  features: defaultFeatures,
  seo: {
    title: 'Flip Image | Free Online Image Flipper - Mirror Pictures',
    description: 'Flip images horizontally or vertically with a single click. Free, instant, privacy-first image flipping for selfies, photos, and graphics - no signup required.',
    keywords: [
      'flip image online',
      'mirror image tool',
      'flip photo horizontally',
      'flip picture vertically',
      'online image flipper'
    ],
    canonical: 'https://convertfreely.com/flip-image'
  },
  faq: [
    { question: 'What is a horizontal flip?', answer: 'A horizontal flip mirrors the image left to right, like reflecting it in a vertical mirror - great for selfies and design adjustments.' },
    { question: 'Is this secure?', answer: 'Yes - all image processing is performed in your browser; your files are never uploaded to our servers.' }
  ]
},

{
  id: 'color-picker',
  title: 'Color Picker',
  description: 'Pick colors from an image and get HEX/RGB codes.',
  icon: 'Pipette',
  color: 'pink',
  category: 'IMAGE',
  rating: { value: 4.98, reviews: 3451 },
  steps: [
    { icon: Upload, title: 'Upload Image', description: 'Choose an image from your device.' },
    { icon: Settings, title: 'Pick Color', description: 'Click anywhere on the image to select a color.' },
    { icon: Download, title: 'Copy Code', description: 'Instantly copy the HEX, RGB, or HSL color code.' },
  ],
  features: defaultFeatures,
  seo: {
    title: 'Online Color Picker | Get HEX & RGB Codes - Free & Instant',
    description: 'Upload images and instantly pick any color to get HEX, RGB, and HSL codes. Free, accurate color picker for designers, developers, and social posts - no signup required.',
    keywords: [
      'color picker online',
      'get hex code from image',
      'pick color from photo',
      'rgb hex color picker',
      'extract color from image online'
    ],
    canonical: 'https://convertfreely.com/color-picker'
  },
  faq: [
    { question: 'How do I pick a color?', answer: 'Upload your image and click the pixel you want - the tool returns HEX, RGB, and HSL instantly for copying.' },
    { question: 'Which color formats are provided?', answer: 'We provide HEX, RGB and HSL values for immediate use in design and development.' }
  ]
},
/* =======================================================
   PDF TOOLS (POPULAR FIRST)
======================================================= */

/* ---------- POPULAR PDF TOOLS ---------- */
{
  id: 'merge-pdf',
  title: 'Merge PDF',
  description: 'Combine and merge multiple PDF into one PDF.',
  icon: 'Combine',
  color: 'red',
  category: 'PDF',
  popular: true,
  rating: { value: 4.92, reviews: 12840 },

  steps: [
    { icon: Upload, title: 'Upload PDFs', description: 'Choose or drag in two or more PDF files.' },
    { icon: Combine, title: 'Reorder & Merge', description: 'Drag to reorder PDFs, then click Merge.' },
    { icon: Download, title: 'Download Output', description: 'Download your final merged PDF instantly.' }
  ],

  features: defaultFeatures,

  seo: {
    title: 'Merge PDF Online | Free PDF Merger - Reorder & Combine PDFs Fast',
    description:
      'Merge PDF files online for free. Drag-and-drop to reorder PDFs, combine multiple documents, and download a single merged PDF instantly. 100% secure - works locally in your browser.',
    keywords: [
      'merge pdf',
      'merge pdf online',
      'pdf merger',
      'combine pdf files',
      'reorder pdf pages',
      'drag reorder pdf',
      'merge multiple pdfs',
      'free pdf combiner',
      'secure pdf merger',
      'merge pdf no upload'
    ],
    canonical: 'https://convertfreely.com/merge-pdf'
  },

  faq: [
    {
      question: 'Can I reorder PDFs before merging?',
      answer:
        'Yes - simply drag the PDF file cards up or down to set the exact order you want before merging.'
    },
    {
      question: 'Does this tool upload my PDFs to a server?',
      answer:
        'No. All merging is processed locally in your browser for maximum privacy and security.'
    },
    {
      question: 'Is there a limit to how many PDFs I can merge?',
      answer:
        'You can merge many PDFs at once. The tool is optimized for high performance with large files.'
    },
    {
      question: 'Will merging reduce PDF quality?',
      answer:
        'No - the merged output preserves the original resolution and quality of your files.'
    }
  ]
},

{
  id: "pdf-to-image",
  title: "PDF to Image",
  description: "Extract pages from PDF as PNG/JPG images",
  icon: 'Combine',
  color: 'red',
  category: 'PDF',
  isNew: true,
  popular: true,
  rating: { value: 4.92, reviews: 12840 },

  steps: [
    { icon: Upload, title: 'Upload PDFs', description: 'Select the PDF file you want to convert.' },
    { icon: Combine, title: 'Choose Format', description: 'Select JPG or PNG as your output image format.' },
    { icon: Download, title: 'Download Images', description: 'Download each page as a separate, high-quality image.' }
  ],
  features: defaultFeatures,
  seo: {
    title: 'Convert PDF to Images Online | Free PDF to JPG/PNG Converter',
    description: 'Convert PDF to images instantly. Fast, secure, and free PDF to JPG or PNG. No signup required for easy PDF to Image conversion.',
    keywords: ['pdf to image', 'pdf to jpg', 'pdf to png', 'convert pdf'],
    canonical: 'https://convertfreely.com/pdf-to-image'
  },

  faq: [
    {question: 'How do I convert a PDF to images?',answer:'Upload your PDF, choose an output format (JPG or PNG), and our tool will convert each page into an image.'},
    {question: 'Can I convert a large PDF?',answer:'Yes, but processing may take longer for PDFs with many pages. All processing is done in your browser.'}
  ]
},
{
  id: 'image-to-pdf',
  title: 'Image to PDF Converter',
  description: 'Combine multiple images into a single PDF file.',
  icon: 'FilePlus2',
  color: 'red',
  category: 'PDF',
  isNew: true,
  rating: { value: 4.90, reviews: 7812 },
  steps: [
    {
      icon: Upload,
      title: 'Upload Images',
      description: 'Select one or more images (JPG, PNG, WEBP).'
    },
    {
      icon: Settings,
      title: 'Arrange & Convert',
      description: 'Drag to reorder images, choose margin, and convert.'
    },
    {
      icon: Download,
      title: 'Download PDF',
      description: 'Download the merged PDF or ZIP file.'
    }
  ],
  features: defaultFeatures,
  seo: {
    title: 'Image to PDF Converter | Free Online JPG to PDF',
    description:
      'Convert images JPG, PNG, WEBP to a single PDF online for free. Fast, secure, browser-based - reorder pages, adjust margins, merge into one PDF, and download instantly.',
    keywords: [
      'image to pdf converter',
      'jpg to pdf online',
      'combine images to pdf',
      'convert photos to pdf',
      'image to pdf free',
      'jpg to pdf no signup',
      'png to pdf merge'
    ],
    canonical: 'https://convertfreely.com/image-to-pdf'
  },
  faq: [
    {
      question: 'Can I add multiple images?',
      answer:
        'Yes, upload up to 20 images, reorder them, adjust margins, and combine them into one PDF instantly.'
    },
    {
      question: 'Is the conversion secure?',
      answer:
        'Yes. All processing happens locally in your browser. No files are uploaded to any server.'
    }
  ]
},


  /* =======================================================
   DOCUMENT & TEXT TOOLS (POPULAR FIRST)
======================================================= */

/* ---------- POPULAR DOCUMENT & TEXT TOOLS ---------- */
{
  id: 'word-counter',
  title: 'Word Counter',
  description: 'Count words and characters in your text.',
  icon: 'FileText',
  color: 'orange',
  category: 'DOCUMENT & TEXT',
  rating: { value: 4.99, reviews: 15234 },

  steps: [
    { icon: FileText, title: 'Paste Text', description: 'Paste your text into the text area.' },
    { icon: Settings, title: 'View Stats', description: 'Instantly see word, character, and sentence counts.' },
    { icon: Download, title: 'Analyze', description: 'Everything is calculated in real-time as you type.' },
  ],

  features: defaultFeatures,

  seo: {
    title: 'Word Counter | Free Online Word & Character Count Tool - Instant',
    description: 'Count words, characters, sentences and paragraphs quickly. Free online word counter with live updates, ideal for writers, students, and SEO - no signup required.',
    keywords: [
      'word counter online',
      'character count tool',
      'count words online free',
      'text statistics tool',
      'live word count'
    ],
    canonical: 'https://convertfreely.com/word-counter'
  },

  faq: [
    { question: 'How does it work?', answer: 'Paste or type your text into the box and the tool instantly shows word, character, sentence and paragraph counts.' },
    { question: 'Is there a limit?', answer: 'There is no practical limit - paste large texts and the counter will process them in your browser.' }
  ]
},


/* ---------- NON-POPULAR DOCUMENT & TEXT TOOLS ---------- */
{
  id: 'text-case-converter',
  title: 'Text Case Converter',
  description: 'Convert text to UPPERCASE, lowercase, etc.',
  icon: 'CaseSensitive',
  color: 'orange',
  category: 'DOCUMENT & TEXT',
  rating: { value: 4.94, reviews: 8123 },

  steps: [
    { icon: FileText, title: 'Paste Text', description: 'Paste your text into the input area.' },
    { icon: Settings, title: 'Choose Case', description: 'Click the button for the case you want to convert to.' },
    { icon: Download, title: 'Copy Result', description: 'Your text is transformed instantly and ready to copy.' },
  ],

  features: defaultFeatures,

  seo: {
    title: 'Text Case Converter | Free Online Case Converter - UPPER & lowercase',
    description: 'Convert text between UPPERCASE, lowercase, Title Case, Sentence case and more. Free, instant, and privacy-first - perfect for editing, posts, and formatting without signup.',
    keywords: [
      'text case converter',
      'uppercase lowercase converter',
      'convert text to title case',
      'sentence case converter',
      'online case converter free'
    ],
    canonical: 'https://convertfreely.com/text-case-converter'
  },

  faq: [
    { question: 'What is Title Case?', answer: 'Title Case capitalizes the first letter of major words and is commonly used for headlines and titles.' },
    { question: 'How do I use it?', answer: 'Paste your text, select the desired case transformation, and copy the transformed text instantly.' }
  ]
},

{
  id: 'duplicate-line-remover',
  title: 'Duplicate Line Remover',
  description: 'Remove duplicate lines from a block of text.',
  icon: 'Trash2',
  color: 'orange',
  category: 'DOCUMENT & TEXT',
  rating: { value: 4.92, reviews: 7654 },

  steps: [
    { icon: FileText, title: 'Paste Text', description: 'Paste your list or text into the input area.' },
    { icon: Settings, title: 'Choose Options', description: 'Select options like case sensitivity if needed.' },
    { icon: Download, title: 'Get Clean Text', description: 'Your text is cleaned instantly, ready to be copied.' },
  ],

  features: defaultFeatures,

  seo: {
    title: 'Duplicate Line Remover | Free Online Remove Duplicate Lines - Fast',
    description: 'Remove duplicate lines or entries from text quickly and accurately. Free online duplicate remover with options for case sensitivity and trimming - perfect for lists and CSV cleanup.',
    keywords: [
      'remove duplicate lines',
      'duplicate line remover online',
      'remove duplicates from list',
      'text dedupe tool',
      'online list cleaner'
    ],
    canonical: 'https://convertfreely.com/duplicate-line-remover'
  },

  faq: [
    { question: 'Does it remove empty lines?', answer: 'You can choose to keep one empty line or remove all empty lines - options are provided for flexible cleanup.' },
    { question: 'Is my data safe?', answer: 'Yes - all processing happens in your browser so your text never leaves your device.' }
  ]
},
/* =======================================================
   UTILITY TOOLS (POPULAR FIRST)
======================================================= */

/* ---------- POPULAR UTILITY TOOLS ---------- */
{
  id: 'password-generator',
  title: 'Password Generator',
  description: 'Create strong, secure, and random passwords.',
  icon: 'KeyRound',
  color: 'teal',
  popular: true,
  category: 'UTILITY',
  rating: { value: 4.97, reviews: 9876 },

  steps: [
    { icon: Settings, title: 'Set Options', description: 'Choose the length and character types for your password.' },
    { icon: Wand2, title: 'Generate Password', description: 'A strong, random password is created automatically.' },
    { icon: Download, title: 'Copy Password', description: 'Click the copy button to securely copy your new password.' },
  ],

  features: defaultFeatures,

  seo: {
    title: 'Password Generator | Free Strong Password Generator - Secure & Random',
    description: 'Generate cryptographically strong passwords with customizable length and character sets. Free, instant, and offline - perfect for accounts, passwords managers and secure logins.',
    keywords: [
      'password generator',
      'generate secure password',
      'random password generator',
      'strong password online',
      'create password generator'
    ],
    canonical: 'https://convertfreely.com/password-generator'
  },

  faq: [
    { question: 'How secure are these passwords?', answer: 'Passwords are generated locally using secure random functions to ensure unpredictability and strength.' },
    { question: 'What makes a password strong?', answer: 'Long length plus a mix of uppercase, lowercase, numbers and symbols creates a secure password.' }
  ]
},


/* ---------- NON-POPULAR UTILITY TOOLS ---------- */
{
  id: 'qr-code-generator',
  title: 'QR Code Generator',
  description: 'Create custom QR codes for URLs, text, and more.',
  icon: 'QrCode',
  color: 'teal',
  isNew: true,
  category: 'UTILITY',
  rating: { value: 4.96, reviews: 6789 },

  steps: [
    { icon: FileText, title: 'Enter Data', description: 'Type or paste the URL, text, or data for your QR code.' },
    { icon: Settings, title: 'Generate QR Code', description: 'The QR code will appear instantly as you type.' },
    { icon: Download, title: 'Download', description: 'Download your high-resolution QR code as a PNG file.' },
  ],

  features: defaultFeatures,

  seo: {
    title: 'QR Code Generator | Free Online QR Codes - Create & Download',
    description: 'Generate free QR codes for URLs, text, Wi-Fi, vCards and more. Customize color and size, download high-resolution PNG without signup - static QR codes that work forever.',
    keywords: [
      'qr code generator free',
      'create qr code online',
      'download qr code png',
      'generate wifi qr code',
      'vcard qr code generator'
    ],
    canonical: 'https://convertfreely.com/qr-code-generator'
  },

  faq: [
    { question: 'Are the QR codes permanent?', answer: 'Yes - our QR codes are static and will continue to work indefinitely after you download them.' },
    { question: 'Can I add a logo?', answer: 'Logo embedding is currently not available but planned for future updates - you can customize color and size now.' }
  ]
},



// -------------------------
// NEW UTIL TOOLS (SEO READY)
// -------------------------

{
  id: 'ip-address-finder',
  title: 'IP Address Finder',
  description: 'Find your public IP address instantly with location.',
  icon: 'Globe',
  color: 'teal',
  category: 'UTILITY',
  rating: { value: 4.8, reviews: 1200 },
  steps: [
    { icon: Upload, title: 'Click Find IP', description: 'Click the button to detect your public IP address.' },
    { icon: Globe, title: 'View IP Details', description: 'See IP version, ISP, and approximate location.' },
  ],
  features: defaultFeatures,
  seo: {
    title: 'IP Address Finder – Check Your Public IP Instantly',
    description: 'Find your public IPv4 or IPv6 address instantly. No signup, fast, private, and browser-based IP lookup.',
    keywords: [
      'ip address finder',
      'what is my ip',
      'check my ip address',
      'public ip address lookup',
      'ip address checker'
    ],
    canonical: 'https://convertfreely.com/ip-address-finder'
  },
  
  faq: [
    { question: 'What is a public IP address?', answer: 'A public IP address is the unique address assigned to your network by your ISP that is visible on the internet.' },
    { question: 'Is my IP stored?', answer: 'No. We do not store or log IP addresses. Everything runs in real time.' },
    { question: 'Does this work on mobile?', answer: 'Yes, the tool works on desktop and mobile devices.' }
  ]
},
{
  id: 'json-formatter',
  title: 'JSON Formatter',
  description: 'Beautify or minify your JSON data.',
  icon: 'FileJson',
  color: 'cyan',
  category: 'DEVELOPER',
  rating: { value: 4.95, reviews: 11234 },

  steps: [
    { icon: Code, title: 'Paste JSON', description: 'Paste your raw JSON data into the editor.' },
    { icon: Settings, title: 'Format', description: 'Click "Beautify" to make it readable or "Minify" to compress it.' },
    { icon: Download, title: 'Copy Formatted JSON', description: 'Copy the perfectly formatted JSON to your clipboard.' },
  ],

  features: defaultFeatures,

  seo: {
    title: 'JSON Formatter | Free JSON Beautifier & Validator',
    description: 'Format, beautify, validate, and minify JSON online. Fast browser-based JSON formatter.',
    keywords: [
      'json formatter',
      'json beautifier',
      'json validator',
      'minify json',
      'format json online'
    ],
    canonical: 'https://convertfreely.com/json-formatter'
  },

  faq: [
    { question: 'What is "beautifying" JSON?', answer: 'Beautifying adds indentation and line breaks to make JSON readable and easier to debug.' },
    { question: 'Does it validate my JSON?', answer: 'Yes - invalid JSON is detected and highlighted, with helpful error messages indicating the problem line.' }
  ]
},


{
  id: 'json-to-csv',
  title: 'JSON to CSV Converter',
  description: 'Convert JSON data into CSV format instantly.',
  icon: 'FileJson',
  color: 'cyan',
  category: 'DEVELOPER',
  rating: { value: 4.7, reviews: 430 },
  steps: [
    { icon: Upload, title: 'Paste JSON', description: 'Paste a valid JSON array of objects.' },
    { icon: Settings, title: 'Convert to CSV', description: 'Click convert to generate CSV output.' },
    { icon: Download, title: 'Download CSV', description: 'Copy or download the converted CSV file.' },
  ],
  features: defaultFeatures,
  
  seo: {
    title: 'JSON to CSV Converter | Convert JSON to CSV Online',
    description: 'Convert JSON to CSV for Excel and Google Sheets. Fast, free, and private.',
    keywords: [
      'json to csv',
      'convert json to csv',
      'json csv converter',
      'json to excel',
      'json to csv online'
    ],
    canonical: 'https://convertfreely.com/json-to-csv'
  },
  faq: [
    { question: 'What JSON format is supported?', answer: 'The tool supports JSON arrays containing objects with consistent keys.' },
    { question: 'Is my data uploaded to a server?', answer: 'No. All conversions happen directly in your browser.' },
    { question: 'Can I use large JSON files?', answer: 'Yes, but performance depends on your device and browser.' }
  ]
},

{
  id: 'html-minifier',
  title: 'HTML Minifier',
  description: 'Minify HTML by removing unnecessary whitespace.',
  icon: 'FileText',
  color: 'purple',
  category: 'DEVELOPER',
    rating: { value: 4.92, reviews: 1654 },
  steps: [
    { icon: Upload, title: 'Paste HTML Code', description: 'Paste your raw HTML markup.' },
    { icon: Settings, title: 'Minify HTML', description: 'Remove comments and extra whitespace.' },
    { icon: Download, title: 'Copy Minified HTML', description: 'Copy the optimized HTML output.' },
  ],
  features: defaultFeatures,
  seo: {
    title: 'HTML Minifier | Compress HTML Online',
    description: 'Minify HTML online to reduce file size and improve site speed.',
    keywords: [
      'html minifier',
      'minify html',
      'html compressor',
      'compress html',
      'html optimization'
    ],
    canonical: 'https://convertfreely.com/html-minifier'
  },
  faq: [
    { question: 'Does minifying HTML break my code?', answer: 'No. The structure remains the same while unnecessary characters are removed.' },
    { question: 'Is this safe for production?', answer: 'Yes, minified HTML is commonly used in production environments.' }
  ]
},

{
  id: 'css-minifier',
  title: 'CSS Minifier',
  description: 'Minify CSS code to reduce file size and improve load speed.',
  icon: 'FileText',
  color: 'indigo',
  category: 'DEVELOPER',
  steps: [
    { icon: Upload, title: 'Paste CSS', description: 'Paste your CSS code.' },
    { icon: Settings, title: 'Minify CSS', description: 'Remove comments and compress whitespace.' },
    { icon: Download, title: 'Copy Output', description: 'Copy the minified CSS.' },
  ],
  features: defaultFeatures,
  seo: {
    title: 'CSS Minifier | Compress CSS Online',
    description: 'Minify CSS online to improve website performance.',
    keywords: [
      'css minifier',
      'minify css',
      'css compressor',
      'optimize css',
      'reduce css size'
    ],
    canonical: 'https://convertfreely.com/css-minifier'
  },
  faq: [
    { question: 'Will this change CSS behavior?', answer: 'No. Only formatting is changed, not functionality.' },
    { question: 'Can I minify multiple CSS files?', answer: 'You can combine them manually before minifying.' }
  ]
},

{
  id: 'js-minifier',
  title: 'JavaScript Minifier',
  description: 'Minify JavaScript by removing extra whitespace.',
  icon: 'Code',
  color: 'orange',
  category: 'DEVELOPER',
  rating: { value: 4.92, reviews: 4654 },
  steps: [
    { icon: Upload, title: 'Paste JavaScript', description: 'Paste your JavaScript code.' },
    { icon: Settings, title: 'Minify JS', description: 'Compress code and remove comments.' },
    { icon: Download, title: 'Copy Minified JS', description: 'Copy the optimized output.' },
  ],
  features: defaultFeatures,
  seo: {
    title: 'JavaScript Minifier | Compress JS Online',
    description: 'Minify JavaScript to improve performance and load speed.',
    keywords: [
      'javascript minifier',
      'minify js',
      'js compressor',
      'compress javascript',
      'optimize javascript'
    ],
    canonical: 'https://convertfreely.com/js-minifier'
  },
  faq: [
    { question: 'Is this suitable for production?', answer: 'Yes, for basic minification. Advanced builds may use bundlers.' },
    { question: 'Does it obfuscate code?', answer: 'No, it only removes comments and whitespace.' }
  ]
},

{
  id: 'base64-encode-decode',
  title: 'Base64 Encode / Decode',
  description: 'Encode or decode Base64 text with Unicode support.',
  icon: 'FilePlus2',
  color: 'teal',
  category: 'DEVELOPER',
  rating: { value: 4.82, reviews: 7654 },
  steps: [
    { icon: Upload, title: 'Paste Text', description: 'Paste text to encode or decode.' },
    { icon: Settings, title: 'Encode or Decode', description: 'Choose Base64 encode or decode.' },
    { icon: Download, title: 'Copy or Download Output', description: 'Copy the result or download it as a text file.' },
  ],
  features: defaultFeatures,
  seo: {
    title: 'Base64 Encode Decode | Free Online Base64 Tool',
    description: 'Encode or decode Base64 text instantly with Unicode support.',
    keywords: [
      'base64 encode',
      'base64 decode',
      'base64 converter',
      'base64 encoder decoder',
      'base64 online'
    ],
    canonical: 'https://convertfreely.com/base64-encode-decode'
  },
  faq: [
    { question: 'What is Base64 used for?', answer: 'Base64 is used to safely transmit binary data as text.' },
    { question: 'Is my data stored?', answer: 'No. All processing happens locally in your browser.' }
  ]
},

{
  id: 'url-encoder-decoder',
  title: 'URL Encode / Decode',
  description: 'Encode or decode URLs and query strings.',
  icon: 'Globe',
  color: 'cyan',
  category: 'DEVELOPER',
  rating: { value: 4.42, reviews: 5454 },
  steps: [
    { icon: Upload, title: 'Paste URL or Text', description: 'Paste the URL or string you want to process.' },
    { icon: Settings, title: 'Encode or Decode', description: 'Choose URL encoding or decoding.' },
    { icon: Download, title: 'Copy or Download Output', description: 'Copy the result or download it as a file.' },
  ],
  features: defaultFeatures,
  seo: {
    title: 'URL Encode Decode | Online URL Encoder',
    description: 'Encode or decode URLs and query strings for safe web transmission.',
    keywords: [
      'url encode',
      'url decode',
      'url encoder',
      'decode url',
      'query string encoder'
    ],
    canonical: 'https://convertfreely.com/url-encoder-decoder'
  },
  faq: [
    { question: 'Why should I encode URLs?', answer: 'Encoding ensures special characters are safely transmitted in URLs.' },
    { question: 'Does this support query strings?', answer: 'Yes, full URLs and query parameters are supported.' }
  ]
},


];


const _BASE_URL = 'https://convertfreely.com';
toolsData.forEach((t) => {
  try {
    t.ogImage = t.ogImage || `${_BASE_URL}/media/tool-images/${t.id}.webp`;
    t.image = t.image || t.ogImage;
  } catch (e) {
    // ignore
  }
});


// toolsData.forEach((t) => {
//   try {
//     t.ogImage = t.ogImage || `/media/tool-images/${t.id}.webp`;
//     t.image = t.image || t.ogImage;
//   } catch (e) {}
// });