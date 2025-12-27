import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEOHelmet({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  extra = [],
}) {
  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content="index, follow" />

      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:site_name" content="Convert Freely" />
      <meta property="og:type" content="website" />
      {canonical && <meta property="og:url" content={canonical} />}
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* Extra custom tags */}
      {extra.map((node, idx) => (
        <React.Fragment key={idx}>{node}</React.Fragment>
      ))}
    </Helmet>
  );
}
