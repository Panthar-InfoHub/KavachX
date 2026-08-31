"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface FeaturedBlogCardProps {
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: string;
  publishedAt?: string | Date | null;
  category?: string;
}

export function FeaturedBlogCard({
  title,
  slug,
  excerpt,
  coverImage,
  publishedAt,
  category = "FEATURED STORY",
}: FeaturedBlogCardProps) {
  const [imageError, setImageError] = useState(false);

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <Link
      href={`/blogs/${slug}`}
      className="group relative block rounded-[2.5rem] bg-white p-6 md:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-black/5 hover:border-black/15 transition-all duration-300 overflow-hidden font-syne"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Cover Image Container */}
        <div className="relative lg:col-span-7 aspect-[16/10] w-full min-h-[260px] sm:min-h-[340px] rounded-3xl overflow-hidden bg-gray-100 border border-black/5 flex items-center justify-center">
          {coverImage && !imageError ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 space-y-3 p-8 bg-gray-100">
              <div className="w-16 h-16 rounded-2xl bg-white border border-black/5 flex items-center justify-center text-black shadow-xs">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25"
                  />
                </svg>
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500 font-sans">
                Featured Publication
              </span>
            </div>
          )}

          {/* Badge Overlay */}
          <div className="absolute top-4 left-4">
            <span className="inline-block px-4 py-1.5 bg-black text-white rounded-full text-[10px] font-bold uppercase tracking-widest font-sans shadow-md">
              Featured Story
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="inline-block px-3.5 py-1 bg-gray-100/90 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-600 font-sans border border-black/5">
                {category}
              </span>
              {formattedDate && (
                <span className="text-xs font-mono text-gray-500 font-medium">
                  {formattedDate}
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-black group-hover:text-slate-700 transition-colors leading-tight tracking-tight">
              {title}
            </h2>

            {excerpt && (
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-4 font-jakarta font-medium">
                {excerpt}
              </p>
            )}
          </div>

          <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
            <div className="group/btn inline-flex h-14 items-center justify-between gap-4 rounded-full bg-black pl-7 pr-2 text-sm font-medium text-white transition-all hover:bg-slate-800 active:scale-[0.98]">
              <span>Read Full Article</span>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform group-hover/btn:scale-105">
                <ArrowRight className="h-4 w-4 -rotate-45 transition-transform group-hover/btn:rotate-0" />
              </div>
            </div>
            <span className="text-xs font-mono text-gray-500 font-medium">5 min read</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
