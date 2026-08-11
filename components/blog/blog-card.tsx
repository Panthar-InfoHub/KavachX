"use client";

import { useState } from "react";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: string;
  publishedAt?: string | Date | null;
}

export function BlogCard({
  title,
  slug,
  excerpt,
  coverImage,
  publishedAt,
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
      className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden hover:border-violet-500/40 transition-all duration-300 shadow-xl hover:shadow-violet-600/10 hover:-translate-y-1"
    >
      {/* Cover Image Container */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/40 border-b border-white/10 flex items-center justify-center">
        {coverImage && !imageError ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-white/30 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <span className="text-[11px] font-mono uppercase tracking-wider">KavachX Article</span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 p-6 space-y-3">
        {formattedDate && (
          <div className="text-[11px] font-mono text-violet-400 uppercase tracking-wider">
            {formattedDate}
          </div>
        )}

        <h3 className="text-lg font-bold text-white font-syne group-hover:text-violet-300 transition-colors line-clamp-2 leading-snug">
          {title}
        </h3>

        {excerpt && (
          <p className="text-xs text-white/60 line-clamp-3 leading-relaxed flex-1">
            {excerpt}
          </p>
        )}

        <div className="pt-2 flex items-center text-xs font-semibold text-violet-400 group-hover:text-violet-300 transition-colors gap-1.5 mt-auto">
          <span>Read Article</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
