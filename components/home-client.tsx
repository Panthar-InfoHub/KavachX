"use client";

import { AiEdgeBoxSection } from "@/components/ai-edge-box-section";
import LenisDiv from "@/components/LenisDiv";
import { SurakshaKavachSection } from "@/components/suraksha-kavach-section";
import Testimonial from "@/components/testimonial";
import Faq from "@/components/faq";
import CTA from "@/components/cta";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Animation values based on scroll progress
  // Reduce total scroll height so we don't have empty scrolling gaps.
  const videoScale = useTransform(smoothProgress, [0, 0.4], [1, 1.05]);
  const textY = useTransform(smoothProgress, [0, 0.4], [0, -50]);
  const textOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);
  const textDisplay = useTransform(smoothProgress, (pos) => pos > 0.45 ? "none" : "flex");
  const indicatorY = useTransform(smoothProgress, [0, 0.3], [0, -50]);

  // Panels slide in quickly over the first part of the scroll
  const overlayOpacity = useTransform(smoothProgress, [0.1, 0.4], [0.4, 0]);

  const leftPanelX = useTransform(smoothProgress, [0.1, 0.4], isMobile ? ["0%", "0%"] : ["-100%", "0%"]);
  const leftPanelY = useTransform(smoothProgress, [0.1, 0.4], isMobile ? ["-100%", "0%"] : ["0%", "0%"]);

  const rightPanelX = useTransform(smoothProgress, [0.1, 0.4], isMobile ? ["0%", "0%"] : ["100%", "0%"]);
  const rightPanelY = useTransform(smoothProgress, [0.1, 0.4], isMobile ? ["100%", "0%"] : ["0%", "0%"]);

  return (
    <LenisDiv>
      <div className="relative min-h-screen bg-black overflow-hidden font-syne">

        {/* Invisible scroll driver to power the mapped animations */}
        <div ref={containerRef} className="h-[300vh] w-full absolute top-0 left-0 pointer-events-none" />

        {/* 🎬 Hero & Side Panels Scroll Sequence (FIXED in background) */}
        <section className="fixed top-0 left-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center z-0">
          {/* ✅ Background Video */}
          <motion.video
            autoPlay
            loop
            muted
            playsInline
            style={{ scale: videoScale }}
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </motion.video>

          {/* ✅ Dark Overlay for Readability */}
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-black z-1"
          />

          {/* Hero Content */}
          <motion.div
            style={{ y: textY, opacity: textOpacity, display: textDisplay }}
            className="relative z-10 container mx-auto px-6 text-center max-w-4xl flex-col items-center justify-center h-full pt-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
              Building the Future of <span className="text-white">Intelligent Safety</span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Empowering your personal safety through intuitive technology and strong security.
            </p>
          </motion.div>

          {/* ✅ Left Black Panel */}
          <motion.div
            style={{ x: leftPanelX, y: leftPanelY }}
            className="absolute top-0 left-0 h-1/2 md:h-full w-full md:w-[32vw] bg-black z-20 flex flex-col justify-start pt-32 px-10 md:px-14 border-b md:border-b-0 md:border-r border-white/5"
          >
            <div>
              <h2 className="text-3xl md:text-4xl text-white mb-6 font-light tracking-wide">
                Suraksha Kavach
              </h2>
              <p className="text-sm text-white/90 mb-8 leading-relaxed max-w-sm font-light font-sans">
                We focus on providing features like drive and crash detection, in-app SOS, and voice commands to enhance your safety.
              </p>
              <a href="#" className="text-xs uppercase tracking-[0.15em] text-white font-medium hover:text-white/70 transition-colors pb-1 border-b border-white/20 hover:border-white/50">
                Know More
              </a>
            </div>
          </motion.div>

          {/* ✅ Right Black Panel */}
          <motion.div
            style={{ x: rightPanelX, y: rightPanelY }}
            className="absolute bottom-0 md:top-0 right-0 h-1/2 md:h-full w-full md:w-[32vw] bg-black z-20 flex flex-col justify-end pb-32 px-10 md:px-14 border-t md:border-t-0 md:border-l border-white/5"
          >
            <div>
              <h2 className="text-3xl md:text-4xl text-white mb-6 font-light tracking-wide">
                AI Edge Box
              </h2>
              <p className="text-sm text-white/90 mb-8 leading-relaxed max-w-sm font-light font-sans">
                We focus on providing features like drive and crash detection, in-app SOS, and voice commands to enhance your safety.
              </p>
              <a href="#" className="text-xs uppercase tracking-[0.15em] text-white font-medium hover:text-white/70 transition-colors pb-1 border-b border-white/20 hover:border-white/50">
                Know More
              </a>
            </div>
          </motion.div>

          {/* ✅ Scroll Indicator */}
          <motion.div
            style={{ opacity: textOpacity, y: indicatorY, display: textDisplay }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-white/50">Scroll to explore</span>
            <div className="w-px h-12 bg-linear-to-b from-white to-transparent" />
          </motion.div>
        </section>

        {/* Premium Sections (These naturally scroll AFTER the 300vh spacer, gliding smoothly over the fixed hero) */}
        <div className="relative z-10 mt-[300vh] bg-[#fdfdfd] pt-12 md:pt-6 rounded-t-[3rem] w-full shadow-[0_-1px_0_rgba(255,255,255,0.1)]">
          <SurakshaKavachSection />
          <AiEdgeBoxSection />
          <Testimonial />
          <Faq />
          <CTA />
        </div>
      </div>
    </LenisDiv>
  );
}