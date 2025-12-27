import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

export default function TermsConditions() {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | ConvertFreely</title>
        <meta
          name="description"
          content="Review the Terms & Conditions governing the use of ConvertFreely - free, privacy-first tools for file conversion and digital utilities."
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
    Terms & Conditions
  </h1>

  <p className="text-gray-600 dark:text-gray-300 mb-6">
    <strong>Effective Date:</strong> 1 December 2025
  </p>

  <div className="space-y-10 text-gray-700 dark:text-gray-300 leading-relaxed">

    {/* Section 1 - Acceptance */}
    <section>
      <h2 className="text-2xl font-semibold mb-3 dark:text-white">
        1. Acceptance of Terms
      </h2>
      <p>
        By accessing or using ConvertFreely (the “Site”), you agree to be bound
        by these Terms & Conditions. If you do not agree, you may not use the Site.
      </p>
    </section>

    {/* Section 2 - Use of Site */}
    <section>
      <h2 className="text-2xl font-semibold mb-3 dark:text-white">
        2. Use of the Site
      </h2>
      <p>
        ConvertFreely provides online tools for converting and processing files.
        All file processing occurs locally on your device using client-side technology.
      </p>
      <p className="mt-3">
        You agree not to misuse the Site, including attempting unauthorized access,
        reverse engineering, distributing malware, or interfering with functionality.
      </p>
    </section>

    {/* Section 3 - No File Storage */}
    <section>
      <h2 className="text-2xl font-semibold mb-3 dark:text-white">
        3. No File Upload or Storage
      </h2>
      <p>
        Files you use with our tools are not uploaded, stored, or viewed by us.
        You are solely responsible for managing your files and ensuring backups.
      </p>
    </section>

    {/* Section 4 - Intellectual Property */}
    <section>
      <h2 className="text-2xl font-semibold mb-3 dark:text-white">
        4. Intellectual Property
      </h2>
      <p>
        All content, trademarks, logos, and code on the Site are owned by or
        licensed to ConvertFreely and protected under applicable laws.
      </p>
      <p className="mt-3">
        You may not copy, modify, distribute, or reproduce any part of the Site
        without prior written consent.
      </p>
    </section>

    {/* Section 5 - Advertising & Third Parties */}
    <section>
      <h2 className="text-2xl font-semibold mb-3 dark:text-white">
        5. Advertising & Third-Party Services
      </h2>
      <p>
        The Site may display advertisements from third-party providers including
        Google AdSense. These partners may use cookies or technologies for ad delivery.
      </p>
      <p className="mt-3">
        We are not responsible for the actions or content of third-party websites
        or services linked from the Site.
      </p>
    </section>

    {/* Section 6 - User Responsibilities */}
    <section>
      <h2 className="text-2xl font-semibold mb-3 dark:text-white">
        6. User Responsibilities
      </h2>
      <p>You agree not to use the Site to:</p>
      <ul className="list-disc ml-6 mt-3 space-y-2">
        <li>Violate any applicable laws</li>
        <li>Upload or process illegal or harmful content locally</li>
        <li>Interfere with Site operations</li>
        <li>Attempt unauthorized access to our systems</li>
      </ul>
    </section>

    {/* Section 7 - No Warranties */}
    <section>
      <h2 className="text-2xl font-semibold mb-3 dark:text-white">
        7. Disclaimer of Warranties
      </h2>
      <p>
        The Site is provided on an “as is” and “as available” basis. We make no
        warranties regarding availability, accuracy, or reliability.
      </p>
    </section>

    {/* Section 8 - Limitation of Liability */}
    <section>
      <h2 className="text-2xl font-semibold mb-3 dark:text-white">
        8. Limitation of Liability
      </h2>
      <p>
        ConvertFreely shall not be liable for any damages arising from your use
        of the Site, including loss of data, loss of files, or technical issues.
      </p>
    </section>

    {/* Section 9 - Changes to Terms */}
    <section>
      <h2 className="text-2xl font-semibold mb-3 dark:text-white">
        9. Changes to These Terms
      </h2>
      <p>
        We may update these Terms at any time. Continued use of the Site means
        you accept the revised Terms.
      </p>
    </section>

    {/* Section 10 - Contact */}
    <section>
      <h2 className="text-2xl font-semibold mb-3 dark:text-white">
        10. Contact Us
      </h2>
      <p>
        If you have questions about these Terms, contact us:
      </p>
      <p className="mt-3">
        <strong>Email:</strong> contact@convertfreely.com
      </p>
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
