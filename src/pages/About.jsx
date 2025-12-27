import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About ConvertFreely</title>
        <meta
          name="description"
          content="ConvertFreely offers fast, secure, browser-based tools including PDF to Image, Image Converter, JPG/PNG/WEBP converters, Image Compressor, Resizer, Merge PDF, QR Generator, and more, all 100% private."
        />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12"
      >
       <div className="max-w-3xl mx-auto bg-white dark:bg-[#202124] rounded-xl p-8 md:p-12 border border-gray-200 dark:border-gray-800">
  
  {/* Title */}
  <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">
    About ConvertFreely
  </h1>

  {/* Section 1 - Mission */}
  <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800 dark:text-white">
    Our Mission
  </h2>
  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
    ConvertFreely was created with a simple goal: to make file conversion,
    comparison, and digital utilities accessible to everyone. We believe
    essential tools should be fast, easy to use, and free - without forcing
    users to create accounts, upload sensitive files, or deal with complex menus.
  </p>

  {/* Section 2 - Technology */}
  <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800 dark:text-white">
    Privacy-First Technology
  </h2>
  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
    All tools on ConvertFreely run entirely in your browser using
    <strong> client-side processing</strong>. This means your files never leave
    your device - ever. No uploads, no servers, no storage. Your data stays
    fully under your control, ensuring maximum privacy, security, and speed.
  </p>
  <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
    Thanks to modern web technologies like WebAssembly and optimized browser APIs,
    ConvertFreely delivers desktop-level performance without compromising security.
  </p>

  {/* Section 3 - Vision / Promise */}
  <h2 className="text-2xl font-semibold mt-8 mb-3 text-gray-800 dark:text-white">
    Our Promise
  </h2>
  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
    ConvertFreely is, and will always remain, free to use. We continuously update
    our tools, improve the user experience, and develop new utilities based on
    community feedback. Our commitment is to stay transparent, privacy-focused,
    and user-first - always.
  </p>

  <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
    Thank you for trusting ConvertFreely as your go-to toolkit for simple, fast,
    and secure file operations.
  </p>
</div>

      </motion.div>
    </>
  );
}
