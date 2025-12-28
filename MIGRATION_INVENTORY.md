# Migration Inventory — cf-nextjs

> Auto-generated inventory to guide migration to a standalone Next.js (App Router + TypeScript) project.

## Summary
- Project type: Vite + React (JSX), TailwindCSS, client-heavy tools.
- User preferences: **App Router** + **TypeScript**. Main focus: **SEO** and long-term professional structure.
- Approach: Create a new Next.js project (TypeScript, App Router), copy functionality (not code) and implement components/tools with proper `use client` boundaries, server components, and Next.js metadata APIs.

---

## Key files & responsibilities

### Pages (SPA routes)
- `src/pages/HomePage.jsx` — Home page with search, category filters, popular tools, and FAQ. Uses `react-helmet-async` for meta tags via `SEOHelmet` and `generateFaqSchema`.
- `src/pages/ToolPage.jsx` — Tool detail page (dynamic by tool id). Uses `react-router-dom` for params; renders Tool components from a mapping and embeds structured data (FAQ + Rating) via `Helmet`.
- `src/pages/About.jsx`, `Contact.jsx`, `Cookies.jsx`, `PrivacyPolicy.jsx`, `TermsConditions.jsx` — Static informational pages. All are client-side components.

**Migration notes:** convert `ToolPage` to Next.js dynamic route (app/[toolId]/page.tsx) and use Next.js metadata and server components for SEO; embed JSON-LD using new `Head`/metadata or `script` in server components.

### Top-level app
- `src/App.jsx` and `src/main.jsx` — Client SPA entry. Will be replaced by Next.js `app/` directory and `_app`/layout patterns.

### Components (UI & layout)
- `src/components/Header.jsx`, `Footer.jsx`, `HeroSection.jsx`, `ToolCard.jsx`, `CallToAction.jsx`, `NextToolActions.jsx`, `WelcomeMessage.jsx`, `ScrollToTop.jsx`.
- `src/components/shared/*` — `FileUploadZone.jsx`, `DownloadPopup.jsx`, `FloatingShare.jsx`, `FormatSelector.jsx`, `sortablejs.jsx`.

**Migration notes:** Many components depend on `window`, `localStorage`, `File` API → mark as `"use client"` in App Router where necessary. Header/Footer layouts go into `app/layout.tsx` as server/client boundary components.

### Tools (23 tool components)
All under `src/components/tools/`:
- `Base64EncodeDecode.jsx`
- `BulkFileRename.jsx`
- `ColorPicker.jsx`
- `CssMinifier.jsx`
- `DuplicateLineRemover.jsx`
- `FlipImage.jsx`
- `FormatConverter.jsx`
- `HtmlMinifier.jsx`
- `ImageCompressor.jsx`
- `ImageResizer.jsx`
- `ImageToPDF.jsx`
- `IpAddressFinder.jsx`
- `JsMinifier.jsx`
- `JsonFormatter.jsx`
- `JsonToCsv.jsx`
- `MergePdf.jsx`
- `PasswordGenerator.jsx`
- `PdfToImage.jsx`
- `PlaceholderTool.jsx`
- `QrCodeGenerator.jsx`
- `RotateImage.jsx`
- `TextCaseConverter.jsx`
- `UrlEncoderDecoder.jsx`
- `WordCounter.jsx`

**Notes & risks:**
- These components are highly browser-dependent: File API, canvas, PDF libraries (pdf-lib, pdfjs-dist, jspdf), jszip, file-saver, qrcode, browser-image-compression.
- Porting strategy: keep these as client components. Where heavy processing or library size is large consider dynamic import and splitting to improve initial load and SEO.
- Add unit and e2e tests for each tool flow and compatibility fallbacks for SSR environments.

### UI primitives (Radix/Tailwind)
- `src/components/ui/*` contains button, input, select, toast, dialog, etc. Many reference Radix UI and are reusable; these should be migrated to TypeScript and adjusted to Next.js patterns.

### Lib & SEO helpers
- `src/lib/toolsData.js` — Central tool metadata, SEO titles/descriptions, canonical URLs, features, steps, and FAQ content. Contains rich metadata and should be ported to TypeScript and used as canonical data for route metadata generation.
  - **Risk:** Contains canonical URLs pointing to `convertfreely.com` — must be updated to new domain and/or turned into environment-configurable base URLs.
- `src/lib/toolRelations.js` — Related tools mapping and helper `getRelatedTools()`.
- `src/lib/imageUtils.js`, `src/lib/utils.js` — utility functions used by tools; move to `lib/` (server-safe vs client-only separation to be determined).

### SEO & structured data
- `src/seo/generateFaqSchema.js`, `src/seo/HelmetConfig.jsx`, `src/seo/toolMeta.js` — Helpers for generating JSON-LD and `<Helmet>` tags.

**Migration notes:** Replace `react-helmet(-async)` with Next.js metadata APIs and provide per-route metadata using App Router `generateMetadata` or static `metadata` export in `page.tsx`/`layout.tsx`.

### Global styles & tooling
- `index.css` (src) — Tailwind entrypoint; `tailwind.config.js` present with custom theming.
- `postcss.config.js` — PostCSS setup.
- `vite.config.js` — Not used in Next.js, remove from new project.

---

## Dependencies (high level)
- Browser libs important to keep:
  - `browser-image-compression`, `file-saver`, `jspdf`, `jszip`, `pdf-lib`, `pdfjs-dist`, `qrcode` — used by tools.
- UI libraries: `framer-motion`, `lucide-react`, `react-icons`, `radix-ui` components.
- To remove/replace: `react-router-dom` (Next.js routing), `react-helmet-async` (Next metadata), `vite` dev tooling.

## Migration risk matrix (high level)
- High risk:
  - Tool components using PDFs and large libs (`MergePdf`, `PdfToImage`, `ImageToPDF`) — need careful bundling and possibly dynamic imports to avoid large client bundles.
  - SEO canonical links in `toolsData.js` pointing external domain — must sanitize.
  - Client-only code must be kept in `use client` components; be careful to keep server components pure where possible for performance.

- Medium risk:
  - Accessibility and Lighthouse scores — require work on image optimization, preconnect, and critical CSS usage.
  - Tests coverage absent — add e2e and unit tests.

- Low risk:
  - Tailwind config and PostCSS — straightforward to port.

---

## Immediate next steps (recommended)
1. Convert the `toolsData.js` and `toolRelations.js` to TypeScript (`.ts`) and validate data shapes with types.
2. Scaffold a fresh Next.js project (TypeScript + App Router) with Tailwind/PostCSS and ESLint/Prettier configured.
3. Create `app/layout.tsx` with global metadata defaults and `app/page.tsx` for Home. Implement dynamic `app/[tool]/page.tsx` that uses `generateMetadata` to pull SEO info from `toolsData` (server-side). Render tool UI components as client components.
4. Add tests: Playwright e2e for each tool and unit tests for library functions.
5. Audit bundle sizes and add dynamic imports for heavy tools/libraries.

---

## Notes & Recommendations
- Use TypeScript for strong typing and future maintainability (user preference confirmed).
- Use App Router's `generateMetadata` for per-tool metadata and to serve JSON-LD from server components for best SEO.
- Use environment-configurable `SITE_URL` for canonical links and open graph images.
- Add automated sitemap and robots generation during build.

---

If you'd like, I can now:
- start the architecture doc (folder structure, TypeScript types, routing plan, metadata strategy), or
- scaffold the new Next.js repo and implement the `toolsData` TypeScript translation and a sample `app/[toolId]/page.tsx` to prove the flow.

Which would you prefer as the next step?