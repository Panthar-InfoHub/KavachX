"use client";

import LenisDiv from "@/components/LenisDiv";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import BentoCard from "./bento-card";
import {
  MonitoringIcon,
  AIIcon,
  ScaleIcon,
  ShieldIcon,
} from "./icons";
import {
  SonarRadar,
  PerformanceGraph,
  UptimeCard,
  CloudAsset,
  RiskScannerAsset,
  IntegrationIcons
} from "./bento-assets";
import EcosystemSection from "./ecosystem-section";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DarkGradientBg } from "@/components/ui/elegant-dark-pattern";

// Cards ke neeche thoda gap, taaki last card screen ke bottom se chipka na rahe
const BOTTOM_GAP = 30;

export default function Home() {
  const heroTrackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // vh = sticky viewport ki real height, shift = content ko kitna px upar le jaana hai
  const [layout, setLayout] = useState({ vh: 900, shift: 0 });

  useEffect(() => {
    const measure = () => {
      const sticky = stickyRef.current;
      const content = contentRef.current;
      if (!sticky || !content) return;

      const vh = sticky.clientHeight;
      // offsetTop = sticky container ka top padding, offsetHeight = poora hero + bento grid
      const contentBottom = content.offsetTop + content.offsetHeight + BOTTOM_GAP;
      const shift = Math.max(0, Math.round(contentBottom - vh));

      setLayout((prev) =>
        prev.vh === vh && prev.shift === shift ? prev : { vh, shift }
      );
    };

    measure();

    const ro = new ResizeObserver(measure);
    if (stickyRef.current) ro.observe(stickyRef.current);
    if (contentRef.current) ro.observe(contentRef.current);
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);
    // fonts / images load hone ke baad height badal sakti hai
    window.addEventListener("load", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
      window.removeEventListener("load", measure);
    };
  }, []);

  const { vh, shift } = layout;

  // Track height calculation:
  // 1. scroll 0 → bentoEnd       : bento cards move up onto screen (hero pinned)
  // 2. scroll bentoEnd → holdEnd  : bento cards stay completely STILL & 100% VISIBLE (hold buffer = 50% vh)
  // 3. scroll holdEnd → 1.0      : white sheet slides up from bottom over pinned hero track (slide distance = 1.5 vh)
  const holdBuffer = Math.round(vh * 0.5);
  const slideDistance = Math.round(vh * 1.5);
  const trackHeight = shift + holdBuffer + slideDistance + vh;
  const totalActiveScroll = Math.max(1, shift + holdBuffer + slideDistance);
  const bentoEnd = Math.max(0.001, shift / totalActiveScroll);

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroTrackRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(heroScrollProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  const bentoY = useTransform(smoothProgress, [0, bentoEnd, 1], [0, -shift, -shift]);
  const textEnd = Math.max(0.001, Math.min(0.3, bentoEnd * 0.6));
  const videoScale = useTransform(smoothProgress, [0, 0.3], [1.2, 1.1]);
  const textY = useTransform(smoothProgress, [0, textEnd], [0, -50]);
  const textOpacity = useTransform(smoothProgress, [0, textEnd], [1, 0]);

  return (
    <LenisDiv>
      <div className="relative min-h-screen bg-black overflow-x-clip font-sans z-0">

        {/* Noise Overlay */}
        <div className="noise-overlay" />

        {/* ── HERO TRACK CONTAINER ── */}
        <div
          ref={heroTrackRef}
          className="relative w-full z-0"
          style={{ height: trackHeight }}
        >
          {/* Sticky Pinned Viewport Container */}
          <div
            ref={stickyRef}
            className="sticky top-0 h-[100svh] w-full overflow-hidden z-0 flex flex-col items-center px-4 md:px-[5%] pt-16 md:pt-20"
          >
            {/* Elegant Dark Pattern Background */}
            <DarkGradientBg className="absolute inset-0 z-[-3] h-full w-full pointer-events-none opacity-90" />

            {/* Background Video */}
            <motion.video
              autoPlay
              loop
              muted
              playsInline
              style={{ scale: videoScale }}
              className="absolute inset-0 w-full h-full object-cover z-[-2] opacity-25 mix-blend-screen"
            >
              <source src="https://res.cloudinary.com/dfr2qixlq/video/upload/q_auto/f_auto/v1778064275/video_loiyzj.mp4" type="video/mp4" />
            </motion.video>

            <div className="absolute inset-0 z-[-1] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.85)_100%)]" />

            {/* Scrollable Group: Hero Title + Cosmic Bento Grid */}
            <motion.div
              ref={contentRef}
              style={{ y: bentoY }}
              className="w-full flex flex-col items-center will-change-transform"
            >
              {/* Hero Content - Occupies full viewport height so Bento cards sit below the fold */}
              <motion.div
                style={{ y: textY, opacity: textOpacity }}
                className="relative z-10 px-6 text-center flex flex-col items-center justify-center min-h-[calc(100svh-4rem)] md:min-h-[calc(100svh-5rem)] pb-12 md:pb-16"
              >
                <h1 className="text-3xl mt-4 md:text-5xl lg:text-6xl font-medium mb-6 tracking-tight leading-tight text-white font-syne">
                  Safety Infrastructure for Organizations<br />
                  <span className="text-white/40">That Can't Afford Failure</span>
                </h1>

                <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed font-light mb-8">
                  KavachX delivers real-time monitoring, automated alerts, and emergency response systems that keep your operations protected around the clock.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
                  <Link
                    href="/kairos"
                    className="group inline-flex h-14 w-full sm:w-auto items-center justify-between gap-4 rounded-full bg-white pl-8 pr-2 text-[15px] font-medium text-black transition-all hover:bg-gray-100 active:scale-[0.98]"
                  >
                    Explore KavachX Platform
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white transition-transform group-hover:scale-[1.05]">
                      <ArrowRight className="h-4 w-4 -rotate-45 transition-transform group-hover:rotate-0" />
                    </div>
                  </Link>
                </div>
              </motion.div>

              {/* ──── COSMIC BENTO GRID ──── */}
              <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-6 items-stretch auto-rows-[minmax(250px,auto)] pt-4">

                {/* ── Real-Time Monitoring (Large) ── */}
                <BentoCard
                  title="System Performance"
                  description="Real-time company metrics and infrastructure health monitoring across all global zones."
                  icon={<MonitoringIcon className="w-8 h-8 text-blue-100" animate />}
                  gridSpan="md:col-span-4 md:row-span-2"
                  delay={100}
                >
                  <div className="absolute top-2 right-8 z-20 flex flex-col items-end gap-6 text-right">
                    <UptimeCard />
                  </div>

                  <div className="mt-16 flex flex-col gap-12 relative z-10">
                    <div className="max-w-full">
                      <PerformanceGraph />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="p-6 rounded-3xl bg-white/3 border border-white/5 backdrop-blur-2xl shadow-lg">
                        <p className="text-4xl font-medium text-white mb-1 tracking-tighter">99.9%</p>
                        <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Service Level</p>
                      </div>
                      <div className="p-6 rounded-3xl bg-white/3 border border-white/5 backdrop-blur-2xl shadow-lg">
                        <p className="text-4xl font-medium text-white mb-1 tracking-tighter">24/7</p>
                        <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Live Support</p>
                      </div>
                      <div className="p-6 rounded-3xl bg-white/3 border border-white/5 backdrop-blur-2xl shadow-lg col-span-2 md:col-span-1">
                        <p className="text-4xl font-medium text-white mb-1 tracking-tighter">1.2K+</p>
                        <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Daily Audits</p>
                      </div>
                    </div>
                  </div>

                  {/* 📡 Subtle Sonar in Background */}
                  <div className="absolute -bottom-20 -right-20 w-[120%] h-[120%] opacity-10 pointer-events-none">
                    <SonarRadar />
                  </div>
                </BentoCard>

                {/* ── Unified Incident View ── */}
                <BentoCard
                  title="Unified Incident View"
                  description="One dashboard. Every alert, inspection log, work order, and compliance report — searchable across all your facilities."
                  icon={<ShieldIcon className="w-8 h-8 text-cyan-500" animate />}
                  gridSpan="md:col-span-2 md:row-span-1"
                  delay={150}
                  nebulaColor="cyan"
                >
                  <div className="absolute -bottom-16 -right-16 opacity-80 scale-110 pointer-events-none">
                    <CloudAsset />
                  </div>
                </BentoCard>

                {/* ── AI Intelligence (Small) ── */}
                <BentoCard
                  title="Predictive Risk Engine"
                  description="AI-driven models continuously scan sensor data to flag structural anomalies, fire hazards, and evacuation risks before they escalate."
                  icon={<AIIcon className="w-8 h-8 text-blue-400" animate />}
                  gridSpan="md:col-span-2 md:row-span-1"
                  delay={200}
                  nebulaColor="blue"
                >
                  <div className="mt-6">
                    <RiskScannerAsset />
                  </div>
                </BentoCard>

                {/* ── Enterprise Security (Video) ── */}
                <BentoCard
                  title="Enterprise Security"
                  description="100% data privacy guaranteed with end-to-end encryption."
                  icon={<ShieldIcon className="w-8 h-8 text-white" />}
                  gridSpan="md:col-span-3 md:row-span-1"
                  delay={250}
                  backgroundContent="https://res.cloudinary.com/dfr2qixlq/video/upload/q_auto/f_auto/v1778124875/industry_tblujk.mp4"
                >
                  <div className="absolute inset-0 opacity-10">
                    <SonarRadar />
                  </div>
                </BentoCard>

                {/* ── Scalability (Wide) ── */}
                <BentoCard
                  title="Enterprise Scalability"
                  description="Seamlessly connect your favorite infrastructure tools."
                  icon={<ScaleIcon className="w-8 h-8 text-white/80" animate />}
                  gridSpan="md:col-span-3 md:row-span-1"
                  delay={300}
                  nebulaColor="cyan"
                >
                  <div className="mt-8">
                    <IntegrationIcons />
                  </div>
                </BentoCard>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ── WHITE ECOSYSTEM SHEET ──
            -mt = slideDistance, isliye sheet tab tak neeche rehti hai jab tak bento scroll aur hold buffer khatam na ho,
            fir hero pinned rehte hue uske upar slide hoti hai. */}
        <div
          className="relative z-20 w-full bg-[#fdfdfd] text-black rounded-t-[2rem] md:rounded-t-[3.5rem] shadow-[0_-30px_70px_rgba(0,0,0,0.85)] border-t border-slate-200/80"
          style={{ marginTop: -slideDistance }}
        >
          <EcosystemSection />
        </div>

      </div>
    </LenisDiv>
  );
}
