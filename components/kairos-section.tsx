"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TestimonialStrip } from "./testimonial-strip";

export function KairosSection() {
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
          KAIROS- AI edge box
        </h2>
        <p className="text-sm md:text-base text-gray-600 mb-8 max-w-2xl font-medium leading-relaxed">
          Distance may challenge connections, but with the Kavach Kairos for CCTV, you can keep an eye on your loved ones and favorite spots effortlessly. Our technology ensures you stay linked, no matter the miles.
        </p>
        <Link href="/kairos" className="group inline-flex h-14 w-full sm:w-auto items-center justify-between gap-4 rounded-full bg-black pl-8 pr-2 text-[15px] font-medium text-white transition-all hover:bg-slate-800 active:scale-[0.98]">
          Check More
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:scale-[1.05]">
            <ArrowRight className="h-4 w-4 -rotate-45 transition-transform group-hover:rotate-0" />
          </div>
        </Link>
      </div>

      {/* Product Image Stage and Animated Background Text */}
      <div className="relative w-full max-w-7xl mx-auto h-[350px] md:h-[500px] flex justify-center items-center mt-10">
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 flex justify-center items-center pointer-events-none z-0 px-4"
        >
          <span className="text-[7vw] md:text-[8vw] font-black text-transparent bg-clip-text bg-linear-to-b from-[#e6e6e6] to-[#ffffff00] leading-none m-0 p-0 text-center translate-y-[-20%] select-none tracking-tight whitespace-nowrap">
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
            alt="Kavach Kairos"
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
