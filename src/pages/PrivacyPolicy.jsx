import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | ConvertFreely</title>
        <meta
          name="description"
          content="ConvertFreely ensures your privacy with 100% client-side file processing. No file uploads, no storage, and secure browser-based PDF, image, and text tools."
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
    Privacy Policy
  </h1>

  <p className="text-gray-600 dark:text-gray-300 mb-6">
    <strong>Effective Date:</strong> 1 December 2025
  </p>

  <div className="space-y-10 text-gray-700 dark:text-gray-300 leading-relaxed">

    {/* Section 1 - Consent */}
    <section>
      <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">
        1. Consent
      </h2>
      <p>
        By using ConvertFreely (the “Site”), you consent to our Privacy Policy
        and agree to its terms. If we update the Policy, we will revise the
        effective date above.
      </p>
    </section>

    {/* Section 2 - No File Upload */}
    <section>
      <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">
        2. No Upload & No Storage of Your Files
      </h2>
      <p>
        ConvertFreely processes all files client-side, directly in your browser.
        Your files are <strong>not</strong> uploaded, transmitted, stored, viewed,
        or accessed by us. All file processing happens locally on your device.
      </p>
      <p className="mt-3">
        When you close or leave the page, your files are removed according to
        your browser’s temporary storage rules.
      </p>
      <p className="mt-3">
        If we ever introduce tools that use server-based processing, we will 
        clearly notify you beforehand.
      </p>
    </section>

    {/* Section 3 - Information We Collect */}
    <section>
      <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">
        3. Information We Collect
      </h2>

      <p className="font-semibold mt-3">3.1 Information You Provide Voluntarily</p>
      <p>
        We collect information only if you contact us directly, such as via email.
        We do not collect personal data through the tools or file-processing features.
      </p>

      <p className="font-semibold mt-6">3.2 Automatically Collected Data</p>
      <p>
        We may collect non-personal technical data through analytics or advertising services.
      </p>

      <ul className="list-disc ml-6 mt-3 space-y-2">
        <li>Browser type and version</li>
        <li>Device type and operating system</li>
        <li>Pages visited and time spent</li>
        <li>General usage statistics</li>
        <li>Cookie identifiers</li>
        <li>Advertising identifiers</li>
      </ul>

      <p className="mt-3">
        This information does not identify you personally and is not connected
        to your files or any content you process using our tools.
      </p>
    </section>

    {/* Section 4 - How We Use Your Information */}
    <section>
      <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">
        4. How We Use Your Information
      </h2>
      <p>We may use analytics or cookie-based data to:</p>
      <ul className="list-disc ml-6 mt-3 space-y-2">
        <li>Improve website functionality and performance</li>
        <li>Understand how users interact with our Site</li>
        <li>Show personalised or non-personalised ads</li>
        <li>Maintain security and prevent misuse</li>
        <li>Comply with legal requirements</li>
      </ul>
    </section>

    {/* Section 5 - Log Files */}
    <section>
      <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">
        5. Log Files
      </h2>
      <p>
        ConvertFreely follows standard log file procedures. These logs may include:
      </p>
      <ul className="list-disc ml-6 mt-3 space-y-2">
        <li>IP address (may be anonymized by analytics services)</li>
        <li>Browser type</li>
        <li>Internet Service Provider</li>
        <li>Date/time stamps</li>
        <li>Referring and exit pages</li>
        <li>Click data</li>
      </ul>
      <p className="mt-3">
        This data is not linked to any identifying information.
      </p>
    </section>

    {/* Section 6 - Cookies & Web Beacons */}
    <section>
      <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">
        6. Cookies & Web Beacons
      </h2>
      <p>
        ConvertFreely uses cookies for analytics, advertising, and improving user
        experience. Users can disable cookies through browser settings at any time.
      </p>
    </section>

    {/* Section 7 - Google AdSense & DART */}
    <section>
      <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">
        7. Google AdSense & DoubleClick DART Cookie
      </h2>
      <p>
        Google uses the DART cookie to show ads based on your visit to our Site
        and other sites on the internet. You may opt out of DART cookie usage at:
      </p>
      <a
        href="https://policies.google.com/technologies/ads"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 underline"
      >
        https://policies.google.com/technologies/ads
      </a>
      <p className="mt-3">
        Google may collect non-personal identifiers for ad personalisation and measurement.
      </p>
    </section>

    {/* Section 8 - Advertising Partners */}
    <section>
      <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">
        8. Advertising Partners Privacy Policies
      </h2>
      <p>
        Our advertising partners (such as Google AdSense) may use cookies,
        JavaScript, or web beacons. Each partner has its own privacy policy.
      </p>
    </section>

    {/* Section 9 - Third Party Policies */}
    <section>
      <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">
        9. Third-Party Privacy Policies
      </h2>
      <p>
        This Privacy Policy does not apply to other websites or advertisers.
        We recommend reviewing the privacy policies of any external sites you visit.
      </p>
    </section>

    {/* Section 10 - CCPA */}
    <section>
      <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">
        10. CCPA Privacy Rights
      </h2>
      <p>
        Under the California Consumer Privacy Act, California residents may request:
      </p>
      <ul className="list-disc ml-6 mt-3 space-y-2">
        <li>The categories of personal data collected</li>
        <li>Deletion of personal data</li>
        <li>Opt-out of sale of personal data</li>
      </ul>
      <p className="mt-3">
        ConvertFreely does <strong>not</strong> sell personal information.
      </p>
    </section>

    {/* Section 11 - GDPR */}
    <section>
      <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">
        11. GDPR Data Protection Rights
      </h2>
      <p>Users in the EU/EEA have the right to:</p>
      <ul className="list-disc ml-6 mt-3 space-y-2">
        <li>Access their personal data</li>
        <li>Correct inaccuracies</li>
        <li>Request deletion</li>
        <li>Restrict processing</li>
        <li>Object to processing</li>
        <li>Data portability</li>
      </ul>
      <p className="mt-3">
        Since we collect only minimal analytics data, GDPR rights apply mainly to cookie identifiers.
      </p>
    </section>

    {/* Section 12 - DPDP India */}
    <section>
      <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">
        12. India DPDP Act Compliance
      </h2>
      <p>
        Under India’s Digital Personal Data Protection Act, you have the right to 
        know what data is collected, request correction or deletion, and withdraw consent.
      </p>
    </section>

    {/* Section 13 - International Transfers */}
    <section>
      <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">
        13. International Data Transfers
      </h2>
      <p>
        Analytics and advertising partners (such as Google) may process data in 
        multiple countries. By using the Site, you consent to such processing.
      </p>
    </section>

    {/* Section 14 - Children's Privacy */}
    <section>
      <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">
        14. Children’s Information
      </h2>
      <p>
        ConvertFreely does not knowingly collect personal information from children 
        under 13. If you believe a child has provided any data, please contact us 
        immediately for removal.
      </p>
    </section>

    {/* Section 15 - Data Security */}
    <section>
      <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">
        15. Data Security
      </h2>
      <p>
        We use reasonable security measures to protect non-personal analytics data.
        Because files are processed locally and not uploaded, your file privacy 
        risk is extremely low.
      </p>
    </section>

    {/* Section 16 - Policy Changes */}
    <section>
      <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">
        16. Changes to This Policy
      </h2>
      <p>
        We may update this Privacy Policy in the future. The updated version will be
        posted on this page with a new effective date.
      </p>
    </section>

    {/* Section 17 - Contact */}
    <section>
      <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">
        17. Contact Us
      </h2>
      <p>If you have any questions about this Privacy Policy, contact us:</p>

      <p className="mt-3">
        <strong>Email:</strong> 
        <span className="text-gray-800 dark:text-gray-200"> contact@convertfreely.com</span>
      </p>

      <p className="mt-1">
        <strong>Address:</strong> India
      </p>
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
