"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { TestimonialStrip } from "./testimonial-strip";

export function AiEdgeBoxSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section 
      ref={containerRef}
      className="w-full bg-linear-to-b from-[#fdfdfd] via-[#f4f7fc] to-[#eef4ff] text-black pt-32 pb-0 font-syne relative overflow-hidden flex flex-col items-center"
    >
      {/* Header Container */}
      <div className="max-w-4xl mx-auto text-center mb-16 px-6 z-20 flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
          AI Edge Box
        </h2>
        <p className="text-sm md:text-base text-gray-600 mb-8 max-w-2xl font-medium leading-relaxed">
          Distance may challenge connections, but with the Kavach Edge Box for CCTV, you can keep an eye on your loved ones and favorite spots effortlessly. Our technology ensures you stay linked, no matter the miles.
        </p>
        <button className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-black/20 text-xs font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300 group">
          Check More
          <svg className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

      {/* Product Image Stage and Animated Background Text */}
      <div className="relative w-full max-w-7xl mx-auto h-[350px] md:h-[500px] flex justify-center items-center mt-10">
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 flex justify-center items-center pointer-events-none z-0 px-4"
        >
          <span className="text-[10vw] md:text-[11vw] font-black text-transparent bg-clip-text bg-linear-to-b from-[#e6e6e6] to-[#ffffff00] leading-none m-0 p-0 text-center translate-y-[-20%] select-none tracking-tight whitespace-nowrap">
            Launching Soon
          </span>
        </motion.div>

        {/* The Edge Box Image */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative z-10 w-full max-w-2xl h-[280px] md:h-[400px] flex flex-col items-center justify-center text-center p-8 drop-shadow-2xl"
        >
          <Image 
            src="/images/edgebox.png"
            alt="Kavach Edge Box"
            fill
            className="object-contain"
            priority
          />
        </motion.div>
      </div>

        {/* Floating Testimonials at the bottom */}
        {/* <div className="w-full pb-20">
          <TestimonialStrip />
        </div> */}
    </section>
  );
}
