import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/data/blogPosts";
import { SITE_CONFIG } from "@/data/siteData";
import { Calendar, User, Clock, ArrowLeft, Tag, ShoppingBag } from "lucide-react";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  const postUrl = `${SITE_CONFIG.url}/blog/${post.slug}`;
  const imageUrl = `${SITE_CONFIG.url}${post.image}`;

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    keywords: post.keywords.join(", "),
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      url: postUrl,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.seoDescription,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription,
    image: `${SITE_CONFIG.url}${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}/blog/${post.slug}`,
    },
    keywords: post.keywords.join(", "),
  };

  return (
    <div className="bg-slate-50 py-16 sm:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
        
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2.5 text-base font-extrabold text-slate-700 hover:text-pink-600 transition-colors bg-white px-5 py-2.5 rounded-xl border border-slate-200 shadow-sm"
        >
          <ArrowLeft className="w-5 h-5 text-pink-600" />
          <span>Back to Blog Articles</span>
        </Link>

        {/* Article Container */}
        <article className="glass-card rounded-3xl p-8 sm:p-16 space-y-10 max-w-6xl mx-auto shadow-2xl">
          
          {/* Header */}
          <div className="space-y-6">
            <span className="px-4 py-2 rounded-full bg-pink-100 text-pink-700 font-black text-xs uppercase tracking-wider">
              {post.category}
            </span>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm font-extrabold text-slate-400 pt-2 border-b border-slate-200/80 pb-6">
              <span className="flex items-center gap-2 text-slate-800">
                <User className="w-4 h-4 text-pink-600" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                {post.readTime}
              </span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative w-full h-80 sm:h-[450px] rounded-3xl overflow-hidden bg-slate-950 shadow-xl border border-slate-800">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Body Content */}
          <div
            className="prose prose-lg prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-relaxed prose-li:text-slate-700 space-y-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Keywords / Tags */}
          <div className="pt-8 border-t border-slate-200/80 space-y-4">
            <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-wider">
              <Tag className="w-4 h-4 text-pink-500" />
              <span>Related Keywords:</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {post.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-4 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200"
                >
                  #{kw}
                </span>
              ))}
            </div>
          </div>

          {/* Buy CTA Box */}
          <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-8 shadow-2xl accent-glow border border-slate-800">
            <div className="space-y-2 text-center sm:text-left">
              <h4 className="text-2xl font-black">Try Hear O Care Supplement Today</h4>
              <p className="text-slate-300 text-base font-normal">
                Support your inner ear nerve cells with our formula. Available on Amazon.
              </p>
            </div>
            <a
              href={SITE_CONFIG.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4.5 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-600 to-pink-600 text-white font-black text-base shadow-xl transition-all shrink-0 flex items-center gap-3 hover:scale-105"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Buy on Amazon</span>
            </a>
          </div>

        </article>

      </div>
    </div>
  );
}
