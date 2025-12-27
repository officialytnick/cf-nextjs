import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

export default function Cookies() {
  return (
    <>
      <Helmet>
        <title>Cookie Policy | ConvertFreely</title>
        <meta
          name="description"
          content="Understand how ConvertFreely uses cookies, advertising technologies, and privacy-safe tracking in compliance with global standards."
        />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12"
      >

        <div className="
  mx-auto 
  bg-white dark:bg-[#202124] 
  rounded-xl p-8 md:p-12 
  border border-gray-200 dark:border-gray-800
">
  <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-white">
    Cookie Policy
  </h1>

  <p className="text-gray-600 dark:text-gray-300 mb-6">
    <strong>Effective Date:</strong> 1 December 2025
  </p>

  <div className="space-y-10 text-gray-700 dark:text-gray-300 leading-relaxed">

    {/* Section 1 - What Are Cookies */}
    <section>
      <h2 className="text-2xl font-semibold mb-3 dark:text-white">
        1. What Are Cookies?
      </h2>
      <p>
        Cookies are small text files stored on your device when you visit a website.
        They help improve your experience, remember preferences, and support analytics
        and advertising.
      </p>
    </section>

    {/* Section 2 - How We Use Cookies */}
    <section>
      <h2 className="text-2xl font-semibold mb-3 dark:text-white">
        2. How ConvertFreely Uses Cookies
      </h2>
      <p>We may use cookies for the following purposes:</p>

      <ul className="list-disc ml-6 mt-3 space-y-2">
        <li>Essential website functionality</li>
        <li>Usage analytics (anonymous)</li>
        <li>Advertising (Google AdSense)</li>
        <li>Cookie consent management</li>
      </ul>
    </section>

    {/* Section 3 - Types of Cookies */}
    <section>
      <h2 className="text-2xl font-semibold mb-3 dark:text-white">
        3. Types of Cookies We Use
      </h2>

      <p className="font-semibold mt-3">3.1 Essential Cookies</p>
      <p>Required for the Site to function properly.</p>

      <p className="font-semibold mt-6">3.2 Analytics Cookies</p>
      <p>Help us understand how users interact with the Site.</p>

      <p className="font-semibold mt-6">3.3 Advertising Cookies</p>
      <p>
        Used by Google AdSense and other ad networks to show personalised or
        non-personalised ads. These may include Google’s DoubleClick cookie.
      </p>
    </section>

    {/* Section 4 - Google AdSense Cookies */}
    <section>
      <h2 className="text-2xl font-semibold mb-3 dark:text-white">
        4. Google AdSense & DoubleClick DART Cookies
      </h2>
      <p>
        Google uses cookies to deliver ads, measure performance, and personalise content.
        Users may opt out of personalised advertising at:
      </p>
      <a
        href="https://adssettings.google.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 underline"
      >
        https://adssettings.google.com
      </a>
    </section>

    {/* Section 5 - Managing Cookies */}
    <section>
      <h2 className="text-2xl font-semibold mb-3 dark:text-white">
        5. How to Manage or Disable Cookies
      </h2>
      <p>
        You can disable cookies in your browser settings. Please note that disabling
        essential cookies may affect Site functionality.
      </p>
    </section>

    {/* Section 6 - GDPR & CCPA Rights */}
    <section>
      <h2 className="text-2xl font-semibold mb-3 dark:text-white">
        6. GDPR & CCPA Cookie Rights
      </h2>
      <p>You may have the right to:</p>
      <ul className="list-disc ml-6 mt-3 space-y-2">
        <li>Withdraw consent for non-essential cookies</li>
        <li>Request deletion of cookie-based data</li>
        <li>Opt out of personalised advertising</li>
      </ul>
    </section>

    {/* Section 7 - Updates */}
    <section>
      <h2 className="text-2xl font-semibold mb-3 dark:text-white">
        7. Changes to This Cookie Policy
      </h2>
      <p>
        We may update this Cookie Policy occasionally. Changes will be posted on 
        this page with a new effective date.
      </p>
    </section>

    {/* Section 8 - Contact */}
    <section>
      <h2 className="text-2xl font-semibold mb-3 dark:text-white">
        8. Contact Us
      </h2>
      <p>
        If you have questions about our Cookie Policy, contact us:
      </p>
      <p className="mt-3"><strong>Email:</strong> contact@convertfreely.com</p>
      <p><strong>Address:</strong> India</p>
    </section>

  </div>

  <p className="mt-10 text-gray-600 dark:text-gray-400">
    Thank you for using ConvertFreely.
  </p>
</div>


      </motion.div>
    </>
  );
}
