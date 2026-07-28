# Hear O Care - Next.js & Cloudflare Pages Web Project

A high-performance, modern static website built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Lucide Icons** designed for instant global deployment on **Cloudflare Pages**.

Recreates 100% of the data, pages, blog articles, SEO metadata, images, and content from `https://hearocare.com/` with a next-level, modern design aesthetic.

---

## 🚀 Features

- **⚡ Cloudflare Pages Ready**: Configured with `output: 'export'` for zero-cold-start static CDN hosting.
- **📱 100% Responsive & Modern Aesthetic**: Glassmorphism cards, custom HSL color tokens, micro-interactions, mobile drawer menu, and animated badges.
- **🔍 Advanced SEO & Structured Data**: Built-in JSON-LD Schema (Organization, Product, WebSite, Breadcrumb), OpenGraph meta, Canonical tags, `sitemap.xml`, and `robots.txt`.
- **📦 Pages & Content Coverage**:
  - ` / ` : Hero, Active Ingredients (7 Nutrients), Hearing Loss Science, Supplement vs Hearing Aid Comparison, Testimonials Carousel, FAQ Preview.
  - ` /about-us ` : Company story, core principles, quality guarantees, and stats.
  - ` /blog ` & ` /blog/[slug] ` : Full blog archive & individual article pages with dynamic static route generation (`generateStaticParams`).
  - ` /reviews ` : Verified customer ratings & feedback gallery (4.9 / 5.0 score).
  - ` /contact-us ` : Interactive contact form with state handling & contact details sidebar.
  - ` /faq ` : Interactive expandable FAQ accordion.
  - ` /buy-now ` : Product landing showcase with Amazon buy link (`https://www.amazon.in/Hear-O-Care/dp/B07TC8FMGH`) & Catalogue PDF download.

---

## 🛠 Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Local Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Test Static Export Build**:
   ```bash
   npm run build
   ```
   This will compile the project into the static `out/` directory ready for Cloudflare Pages.

---

## ☁️ Deploying to Cloudflare Pages

### Option 1: Automatic Deployment via GitHub (Recommended)
1. Push this codebase to a repository on **GitHub**.
2. Log into the **Cloudflare Dashboard** -> **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
3. Select your GitHub repository.
4. Set Build Settings:
   - **Framework Preset**: `Next.js (Static HTML Export)`
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `out`
5. Click **Save and Deploy**. Your site will automatically build and publish to a `.pages.dev` domain with custom domain support.

### Option 2: Command Line Deployment via Wrangler
```bash
npm run build
npx wrangler pages deploy out --project-name=hearocare
```
