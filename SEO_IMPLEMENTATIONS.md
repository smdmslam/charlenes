# SEO & Technical Implementations Tracker

This document tracks the SEO optimizations and technical enhancements implemented for the **Curzon House** project.

## 1. Technical SEO Infrastructure
Standard files added to the `app/` directory to manage search engine crawling and indexing.

- **`app/robots.ts`**: Controls crawler behavior (allows all except `/private/`).
- **`app/sitemap.ts`**: Generates a dynamic `sitemap.xml` including the Homepage and Digital Brochure.
- **`app/manifest.ts`**: Provides manifest data for Progressive Web App (PWA) features and better mobile browser discovery.

## 2. Advanced Metadata (Next.js Metadata API)
Enhanced metadata in `app/layout.tsx` for professional search results and social sharing.

- **Title Templates**: Implemented `%s | Curzon House` to ensure subpages are correctly branded.
- **Open Graph (OG)**: Added rich OG tags including high-resolution visuals (`/images/hero-entrance.jpg`) and locale (`en_GB`).
- **Twitter Cards**: Configured `summary_large_image` for cinematic previews on Twitter/X.
- **Canonical URLs**: Added `alternates.canonical` to prevent SEO dilution from duplicate paths.
- **Favicon & Apple Icons**: Unified icon handling for various platforms and devices.

## 3. Semantic & Structural Enhancements
Improvements to the HTML structure for better machine readability.

- **Primary H1**: Corrected the `Navigation` component to wrap the brand logo in a persistent `<h1>` tag.
- **Heading Hygiene**: Converted the `IntroOverlay` title from `h1` to `div` to ensure only one primary heading exists per page load.
- **JSON-LD Structured Data**: Injected a Schema.org script into the `RootLayout` defining Curzon House as an **Organization** in Mayfair, London.

## 4. On-Page & Asset Optimization
- **Image SEO**: Enhanced `Image` components in `components/slide-section.tsx` with descriptive, keyword-rich `alt` tags (e.g., *"[Section Title] at Curzon House - Private Members Club Mayfair"*).
- **Digital Brochure SEO**: Updated `app/brochure/layout.tsx` to enable search indexing and added specific metadata for the digital brochure page.

## 5. Ongoing Tasks
- [ ] Submit `sitemap.xml` to Google Search Console.
- [ ] Monitor Core Web Vitals via Vercel Analytics.
- [ ] Test OG image rendering using [OpenGraph.xyz](https://www.opengraph.xyz).

---
*Last Updated: February 5, 2026*
