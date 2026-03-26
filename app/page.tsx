"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";

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

  // Animation values based on scroll progress
  // We use h-[300vh] so total scroll distance is 200vh.
  // 0.0 -> 0.1 (first 20vh): Fast text fade out and video zoom.
  const videoScale = useTransform(scrollYProgress, [0, 0.1], [1, 1.05]);
  const textY = useTransform(scrollYProgress, [0, 0.1], [0, -100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const textDisplay = useTransform(scrollYProgress, (pos) => pos > 0.15 ? "none" : "flex");
  const indicatorY = useTransform(scrollYProgress, [0, 0.1], [0, -50]);

  // 0.05 -> 0.25 (Very fast slide! 20% of scroll, just a flick of the wheel)
  const overlayOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0.4, 0]);
  
  const leftPanelX = useTransform(scrollYProgress, [0.05, 0.25], isMobile ? ["0%", "0%"] : ["-100%", "0%"]);
  const leftPanelY = useTransform(scrollYProgress, [0.05, 0.25], isMobile ? ["-100%", "0%"] : ["0%", "0%"]);
  
  const rightPanelX = useTransform(scrollYProgress, [0.05, 0.25], isMobile ? ["0%", "0%"] : ["100%", "0%"]);
  const rightPanelY = useTransform(scrollYProgress, [0.05, 0.25], isMobile ? ["100%", "0%"] : ["0%", "0%"]);

  // 0.15 -> 0.25: Text fades in concurrently WITH the end of the slide): Text bursts into 100% visibility.
  // 0.4 -> 1.0 (remaining 120vh): Pure reading time natively sticky, no further animation!
  const panelContentOpacity = useTransform(scrollYProgress, [0.38, 0.4], [0, 1]);
  const panelContentY = useTransform(scrollYProgress, [0.38, 0.4], [10, 0]);

  return (
    <div className="relative min-h-screen">
      {/* 🎬 Hero & Side Panels Scroll Sequence */}
      <section ref={containerRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">

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

          {/* ✅ Dark Overlay for Readability (Fades as panels appear) */}
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-black z-1"
          />

          {/* ✅ Hero Content */}
          <motion.div
            style={{ y: textY, opacity: textOpacity, display: textDisplay }}
            className="relative z-10 container mx-auto px-6 text-center max-w-4xl flex-col items-center justify-center h-full pt-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight font-syne">
              Building the Future of <span className="text-white">Intelligent Safety</span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Empowering your personal safety through intuitive technology and strong security.
            </p>
          </motion.div>

          {/* ✅ Left Black Panel */}
          <motion.div 
            style={{ x: leftPanelX, y: leftPanelY }}
            className="absolute top-0 left-0 h-1/2 md:h-full w-full md:w-[32vw] bg-black z-20 flex flex-col justify-start pt-32 px-10 md:px-14 border-b md:border-b-0 md:border-r border-white/5 shadow-2xl"
          >
            <motion.div style={{ opacity: panelContentOpacity, y: panelContentY }}>
              <h2 className="text-3xl md:text-4xl font-syne text-white mb-6 font-light tracking-wide">
                Suraksha Kavach
              </h2>
              <p className="text-sm text-white/90 mb-8 leading-relaxed max-w-sm font-light">
                We focus on providing features like drive and crash detection, in-app SOS, and voice commands to enhance your safety.
              </p>
              <a href="#" className="text-xs uppercase tracking-[0.15em] text-white font-medium hover:text-white/70 transition-colors pb-1 border-b border-transparent hover:border-white/50">
                Know More
              </a>
            </motion.div>
          </motion.div>

          {/* ✅ Right Black Panel */}
          <motion.div 
            style={{ x: rightPanelX, y: rightPanelY }}
            className="absolute bottom-0 md:top-0 right-0 h-1/2 md:h-full w-full md:w-[32vw] bg-black z-20 flex flex-col justify-end pb-32 px-10 md:px-14 border-t md:border-t-0 md:border-l border-white/5 shadow-2xl"
          >
            <motion.div style={{ opacity: panelContentOpacity, y: panelContentY }}>
              <h2 className="text-3xl md:text-4xl font-syne text-white mb-6 font-light tracking-wide">
                AI Edge Box
              </h2>
              <p className="text-sm text-white/90 mb-8 leading-relaxed max-w-sm font-light">
                We focus on providing features like drive and crash detection, in-app SOS, and voice commands to enhance your safety.
              </p>
              <a href="#" className="text-xs uppercase tracking-[0.15em] text-white font-medium hover:text-white/70 transition-colors pb-1 border-b border-transparent hover:border-white/50">
                Know More
              </a>
            </motion.div>
          </motion.div>

          {/* ✅ Scroll Indicator */}
          <motion.div
            style={{ opacity: textOpacity, y: indicatorY, display: textDisplay }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-white/50">Scroll to explore</span>
            <div className="w-px h-12 bg-linear-to-b from-white to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* 🚀 Feature Section */}
      <section className="relative z-10 bg-black py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Advanced Protection <br />
                <span className="text-white/40">Powered by Intelligence</span>
              </h2>
              <p className="text-lg text-white/60 mb-10 leading-relaxed">
                Kavach X uses state-of-the-art AI technology to predict, detect, and respond to emergencies in real-time. Our ecosystem ensures you're never alone.
              </p>

              <div className="space-y-6">
                {[
                  { title: "Real-time Detection", desc: "Instantly identifies crashes and unusual driving patterns." },
                  { title: "Smart SOS", desc: "One-tap emergency response with location sharing." },
                  { title: "Family Connectivity", desc: "Keep your loved ones updated and safe automatically." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative aspect-square rounded-3xl overflow-hidden group"
            >
              {/* <Image 
                src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1000" 
                alt="Technology Visualization"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              /> */}
              <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-60" />

              <div className="absolute bottom-8 left-8 right-8 p-6 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20">
                <p className="text-white font-medium italic">"The most advanced safety companion we've ever built."</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider">Product Vision</p>
                    <p className="text-[10px] text-white/50">Kavach X Engineering Team</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 📦 Call to Action */}
      <section className="bg-white text-black py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 italic tracking-tighter">Ready for Peace of Mind?</h2>
          <button className="px-10 py-5 bg-black text-white rounded-full font-bold hover:bg-neutral-800 transition-all text-xl uppercase tracking-widest">
            Explore The Kavach X Store
          </button>
        </div>
      </section>
    </div>
  );
}