"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

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
      onClick={() => trackEvent({
        name: "select_content",
        params: {
          content_type: "article",
          item_id: slug,
          item_name: title,
        },
      })}
      className="group relative flex h-full w-full flex-col justify-between rounded-3xl bg-white p-6 md:p-8 shadow-sm border-0 transition-all duration-300 overflow-hidden hover:-translate-y-1 font-syne"
    >
      <div className="flex flex-col space-y-4 flex-1">
        {/* Cover Image Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#eaeff7] border-0 flex items-center justify-center shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverImage && !imageError ? coverImage : "/images/factory.jpeg"}
            alt={title}
            className="w-full h-full object-fit  group-hover:scale-[1.02] transition-transform duration-500 ease-out"
            onError={() => setImageError(true)}
          />
        </div>

        {/* Content Area */}
        <div className="flex flex-col space-y-3 flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-block px-3 py-1 bg-[#eaeff7] rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-600 font-sans">
              {category}
            </span>
            {formattedDate && (
              <span className="text-[11px] font-mono text-gray-500 font-medium">
                {formattedDate}
              </span>
            )}
          </div>

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
      <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between shrink-0">
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
