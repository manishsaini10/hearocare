import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "@/data/blogPosts";
import { BookOpen, Calendar, User, Clock, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Blog & Hearing Health Guides",
  description: "Read expert articles on sensorineural hearing loss, natural antioxidants, tinnitus relief, and auditory wellness tips.",
};

export default function BlogPage() {
  return (
    <div className="bg-slate-50 py-20 sm:py-28">
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 space-y-20">
        
        {/* Page Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-pink-100 text-pink-700 font-extrabold text-xs uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-pink-600" />
            <span>Health Insights & Articles</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
            Hear O Care <span className="gradient-text">Blog & Guides</span>
          </h1>
          <p className="text-slate-600 text-lg sm:text-xl font-medium">
            Informative articles on inner ear nutrition, sensorineural hearing health, and high-potency antioxidants.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between group hover:scale-[1.03] transition-all duration-300"
            >
              <div>
                {/* Featured Image */}
                <div className="relative w-full h-64 bg-slate-900 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-pink-600 text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-4">
                  {/* Meta Details */}
                  <div className="flex items-center gap-5 text-xs font-extrabold text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-400" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-black text-slate-900 group-hover:text-pink-600 transition-colors leading-snug line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-slate-600 text-base line-clamp-3 leading-relaxed font-normal">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="px-8 pb-8 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-pink-600" />
                  {post.author}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-pink-600 font-extrabold text-base flex items-center gap-2 group-hover:translate-x-1.5 transition-transform"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
