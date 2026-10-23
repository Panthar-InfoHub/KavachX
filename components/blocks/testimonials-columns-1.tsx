"use client";
import React from "react";
import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: any;
  duration?: number;
}) => {
  // Convert duration (15s, 17s, 19s) to smooth pixel speed (approx 35-45 px/sec)
  const speed = props.duration ? Math.round(650 / props.duration) : 40;

  return (
    <div className={cn("relative h-[740px] overflow-hidden", props.className)}>
      <Marquee
        vertical
        pauseOnHover
        speed={speed}
        className="[--gap:1.5rem] h-full"
      >
        {props.testimonials.map(({ text, image, name, role }: any, i: any) => (
          <div
            className="p-8 rounded-3xl border border-gray-100 bg-white shadow-xl shadow-black/5 max-w-xs w-full transition-shadow duration-200 hover:shadow-2xl hover:border-gray-200 select-none"
            key={i}
          >
            <div className="text-gray-700 leading-relaxed text-sm">{text}</div>
            <div className="flex items-center gap-3 mt-6">
              {image && (
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-gray-100">
                  <Image src={image} alt={name || "User avatar"} fill className="object-cover" unoptimized />
                </div>
              )}
              <div className="flex flex-col">
                <div className="font-semibold tracking-tight leading-5 text-gray-900">{name}</div>
                {role && <div className="text-sm text-gray-500 mt-1">{role}</div>}
              </div>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};