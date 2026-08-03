"use client";
import React from "react";
import { motion } from "motion/react";
import Image from "next/image";


export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: any;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-white"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }: any, i: any) => (
                <div className="p-8 rounded-3xl border border-gray-100 bg-white shadow-xl shadow-black/5 max-w-xs w-full" key={i}>
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
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

;