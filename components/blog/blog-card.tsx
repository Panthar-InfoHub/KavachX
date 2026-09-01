"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: string;
  publishedAt?: string | Date | null;
  category?: string;
}

export function BlogCard({
  title,
  slug,
  excerpt,
  coverImage,
  publishedAt,
  category = "AI & ROBOTICS",
}: BlogCardProps) {
  const [imageError, setImageError] = useState(false);

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <Link
      href={`/blogs/${slug}`}
      className="group relative flex flex-col justify-between rounded-3xl bg-white p-6 md:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-black/5 hover:border-black/15 transition-all duration-300 overflow-hidden hover:-translate-y-1 font-syne"
    >
      <div className="space-y-4">
        {/* Cover Image Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gray-100 border border-black/5 flex items-center justify-center">
          {coverImage && !imageError ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400 space-y-2 p-6 text-center">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 border border-black/5 flex items-center justify-center text-black shadow-xs">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 font-sans">
                KavachX Article
              </span>
            </div>
          )}

          {/* Category Pill Overlay */}
          <div className="absolute top-3 left-3">
            <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-md border border-black/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-700 font-sans shadow-xs">
              {category}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="space-y-3">
          {formattedDate && (
            <div className="text-[11px] font-mono text-gray-500 font-medium">
              {formattedDate}
            </div>
          )}

          <h3 className="text-xl font-bold text-black group-hover:text-slate-700 transition-colors line-clamp-2 leading-snug tracking-tight">
            {title}
          </h3>

          {excerpt && (
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed font-jakarta font-medium">
              {excerpt}
            </p>
          )}
        </div>
      </div>

      {/* Signature KavachX Button Action */}
      <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
        <div className="group/btn inline-flex h-11 items-center justify-between gap-3 rounded-full bg-black pl-5 pr-1.5 text-xs font-medium text-white transition-all hover:bg-slate-800 active:scale-[0.98]">
          <span>Read Article</span>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform group-hover/btn:scale-110">
            <ArrowRight className="h-3.5 w-3.5 -rotate-45 transition-transform group-hover/btn:rotate-0" />
          </div>
        </div>
      </div>
    </Link>
  );
}
