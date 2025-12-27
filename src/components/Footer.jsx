import React from "react";
import { Link } from "react-router-dom";
import { Pencil, Linkedin, Youtube, Mail, Instagram } from "lucide-react";

const Footer = () => {
  // 📄 ALL Static Pages (Bottom Footer)
  const staticPages = [
    { path: "/about", title: "About Us" },
    { path: "/contact", title: "Contact" },
    { path: "/privacy-policy", title: "Privacy Policy" },
    { path: "/terms-and-conditions", title: "Terms & Conditions" },
    { path: "/cookies", title: "Cookies" },
  ];

  // 🎯 Footer Sections (NO Pages here)
  const footerSections = [
    {
      title: "Popular Tools",
      links: [
        { title: "Image Converter", path: "/image-converter" },
        { title: "Image Compressor", path: "/image-compressor" },
        { title: "Image Resizer", path: "/image-resizer" },
        { title: "Bulk File Renamer", path: "/bulk-file-rename" },
        // { title: "Rotate Image", path: "/rotate-image" },
        { title: "Image to PDF", path: "/image-to-pdf" },
        { title: "PDF to Image", path: "/pdf-to-image" },
      ],
    },
    {
      title: "Image Tools",
      links: [
        { title: "JPG to PNG", path: "/jpg-to-png" },
        { title: "PNG to JPG", path: "/png-to-jpg" },
        { title: "PNG to WEBP", path: "/png-to-webp" },
        { title: "JPG to WEBP", path: "/jpg-to-webp" },
        { title: "WEBP to JPG", path: "/webp-to-jpg" },
        { title: "WEBP to PNG", path: "/webp-to-png" },
      ],
    },
    {
      title: "More Tools",
      links: [
        { title: "Word Counter", path: "/word-counter" },
        { title: "Duplicate Line Remover", path: "/duplicate-line-remover" },
        { title: "Text Case Converter", path: "/text-case-converter" },
        { title: "Password Generator", path: "/password-generator" },
        { title: "QR Code Generator", path: "/qr-code-generator" },
        { title: "JSON Formatter", path: "/json-formatter" },
      ],
    },
    {
      title: "Developer Tools",
      links: [
        { title: "HTML Minifier", path: "/html-minifier" },
        { title: "CSS Minifier", path: "/css-minifier" },
        { title: "JavaScript Minifier", path: "/js-minifier" },
        { title: "JSON Formatter", path: "/json-formatter" },
        { title: "JSON to CSV", path: "/json-to-csv" },
        { title: "Base64 Encode / Decode", path: "/base64-encode-decode" },
        // { title: "URL Encode / Decode", path: "/url-encoder-decoder" },
          ],
        },
  ];

  // 🌐 Social Media Links
  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/convertfreely",
      label: "LinkedIn",
    },
    {
    icon: Instagram,
    href: "https://www.instagram.com/convertfreely",
    label: "Instagram",
  },
    {
      icon: Youtube,
      href: "https://www.youtube.com/@convertfreely",
      label: "YouTube",
    },
    {
      icon: Mail,
      href: "mailto:contact@convertfreely.com",
      label: "Email",
    },
  ];

  return (
    <footer className="bg-white dark:bg-[#181a1b] border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* BRAND */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Pencil className="w-7 h-7 text-red-500" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Convert<span className="text-red-500">Freely</span>
              </span>
            </Link>

            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
              The ultimate suite of free online tools.
            </p>
          </div>

          {/* LINKS */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-white mb-4">
                  {section.title}
                </h4>

                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-500 transition"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

       {/* BOTTOM BAR */}
<div
  className="
    mt-14 pt-6 border-t border-gray-200 dark:border-gray-800
    flex flex-col gap-6
    md:flex-row md:items-center md:justify-between
  "
>
  {/* SOCIAL (1st on mobile, last on desktop) */}
  <div className="order-1 md:order-3 flex justify-center md:justify-end gap-3">
    {socialLinks.map((item, i) => {
      const Icon = item.icon;
      return (
        <a
          key={i}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          className="
            w-9 h-9 rounded-full flex items-center justify-center
            bg-gray-100 dark:bg-gray-800
            text-gray-600 dark:text-gray-400
            hover:bg-red-500 hover:text-white
            transition
          "
        >
          <Icon className="w-4 h-4" />
        </a>
      );
    })}
  </div>

  {/* LEGAL LINKS (2nd on mobile) */}
  <div className="order-2 md:order-2 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs">
    {staticPages.map((page) => (
      <Link
        key={page.path}
        to={page.path}
        className="text-gray-500 dark:text-gray-400 hover:text-red-500 transition"
      >
        {page.title}
      </Link>
    ))}
  </div>

  {/* COPYRIGHT (last on mobile, first on desktop) */}
  <p className="order-3 md:order-1 text-xs text-gray-500 dark:text-gray-400 text-center md:text-left">
    © {new Date().getFullYear()} ConvertFreely. All rights reserved.
  </p>
</div>

      </div>
    </footer>
  );
};

export default Footer;
