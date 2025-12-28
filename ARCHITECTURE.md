# Next.js Migration Architecture — Convert Freely

**Goal:** Migrate the existing Vite + React app into a standalone Next.js (App Router) project using **TypeScript**. Focus on SEO, long-term maintainability, performance, and a professional folder structure.

---

## High-level decisions
- Framework: **Next.js (App Router)**
- Language: **TypeScript (strict mode)**
- UI: Tailwind CSS, Radix primitives (where used), and small utility components
- Rendering strategy: Use **Server Components** by default; mark UI or browser-dependent parts with `"use client"`.
- Data model: Centralized `data/toolsData.ts` for all tool metadata and SEO content; canonical `SITE_URL` config.
- Hosting target: **Vercel** (recommended) — supports ISR, Edge functions, and large static hosting.

---

## Folder structure (recommended)

app/
- layout.tsx                 — Root layout, global metadata defaults
- globals.css                — Tailwind entry
- page.tsx                   — Home page (server component)
- (components)/              — Shared client components (Header, Footer, UI primitives)
- (tool)/                    — Tool-related UI (client components split into subfolders)
- [toolId]/                  — Dynamic tool route (server component)

components/                  — Reusable client UI components (Button, Input, ToolCard)
lib/
- toolsData.ts               — Canonical tool metadata & SEO content (exported types)
- toolRelations.ts           — Relations & helpers
- imageUtils.ts              — Shared image helpers (client utilities)

public/                      — Static images, social previews, robots.txt, favicon
scripts/                     — Build scripts, sitemap generator
types/                       — Shared TS types

tests/
- e2e/                       — Playwright or Cypress tests
- unit/                      — Jest / Vitest unit tests

---

## Metadata & SEO strategy
- Use App Router `generateMetadata` on `app/[toolId]/page.tsx` to return: title, description, openGraph, twitter, alternates, canonical, and structured data script tags (JSON-LD).
- Use server-side rendering for tool pages to ensure correct metadata for crawlers.
- Generate `sitemap.xml` and `robots.txt` at build time (use site URL from env var `SITE_URL`).
- Off-screen crawlers: for large images referenced in tools, add an off-screen <img> for crawlers where necessary, but prefer server-side OG images and proper `og:image` metadata.

---

## Type definitions
- Define a `Tool` interface in `types/tool.ts` with fields: id, title, description, seo (title, description, keywords, canonical, ogImage), category, steps, features, rating, faq, etc.
- Keep `toolsData.ts` strongly typed and add a `validateTools()` script (dev-only) to check required fields and canonical format.

---

## Migration priorities & phasing
1. **Scaffold** Next.js project + Tailwind + TypeScript + ESLint/Prettier + CI templates.
2. **Port data layer:** convert `toolsData.js` → `lib/toolsData.ts` with types and env-friendly canonicals.
3. **Home page:** implement `app/page.tsx` using server components, search and categories (client search input as client component). Add FAQ JSON-LD.
4. **Tools dynamic route:** implement `app/[toolId]/page.tsx` with `generateMetadata` and server components that render the tool shell and client `ToolUI` component.
5. **Port UI primitives** (Header, Footer, ToolCard) and shared components as client components; ensure accessibility.
6. **Port each tool** as dedicated client component; prefer dynamic imports for heavy libraries (pdf-lib, pdfjs-dist, jszip).
7. **SEO & performance**: add sitemap, preconnect hints, image optimization (`next/image`), critical CSS, and Lighthouse optimization.
8. **Testing & QA**: add Playwright e2e tests for key flows and unit tests for utils.

---

## Build & CI/CD
- Use GitHub Actions to run: lint, typecheck, tests, build. Deploy to Vercel (or preview deploy on PRs).
- Add incremental static regeneration (ISR) where appropriate for tool lists if external data source is used.

---

## Notes & recommendations
- Keep heavy tool logic in client components and lazy-load them: `const Comp = dynamic(() => import('../components/tools/HeavyTool'), { ssr: false });`
- Use environment variables for `SITE_URL`, analytics, and feature flags.
- Maintain a migration map documenting which old file corresponds to which new route/component (e.g., `src/pages/ToolPage.jsx` → `app/[toolId]/page.tsx`).

---

## Next actions (short term)
- Convert `toolsData.js` to `lib/toolsData.ts` and add `Tool` TypeScript type.
- Scaffold `app/layout.tsx`, `app/page.tsx`, `app/[toolId]/page.tsx` sample pages and a minimal header/footer.
- Port `SEO` helpers to use `generateMetadata` and server-side JSON-LD injection.

---

If this looks good, I will scaffold the Next.js skeleton with TypeScript, Tailwind, basic layout, and a sample dynamic tool page in `next-app/`.