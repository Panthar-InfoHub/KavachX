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

export default function Home() {
  const heroTrackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroTrackRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(heroScrollProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // On Mobile: 5 cards stack vertically in 1 column (~2350px height), requiring a ~ -76% shift to reveal all cards.
  // On Desktop: cards form 2 rows (~1300px height), requiring a ~ -55% shift to reveal all cards.
  const bentoShift = isMobile ? "-76%" : "-55%";
  const bentoY = useTransform(smoothProgress, [0, 0.45, 1.0], ["0%", bentoShift, bentoShift]);
  const videoScale = useTransform(smoothProgress, [0, 0.3], [1, 1.05]);
  const textY = useTransform(smoothProgress, [0, 0.3], [0, -50]);
  const textOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);

  return (
    <LenisDiv>
      <div className="relative min-h-screen bg-black overflow-x-clip font-sans z-0">

        {/* Noise Overlay */}
        <div className="noise-overlay" />

        {/* ── HERO TRACK CONTAINER: h-[480vh] mobile / h-[320vh] desktop ── */}
        <div ref={heroTrackRef} className={`relative w-full z-0 ${isMobile ? "h-[480vh]" : "h-[320vh]"}`}>
          {/* Sticky Pinned Viewport Container (z-0) */}
          <div className="sticky top-0 h-screen w-full overflow-hidden z-0 flex flex-col items-center px-4 md:px-[5%] pt-16 md:pt-32">

            {/* Background Video */}
            <motion.video
              autoPlay
              loop
              muted
              playsInline
              style={{ scale: videoScale }}
              className="absolute inset-0 w-full h-full object-cover z-[-2] opacity-30"
            >
              <source src="https://res.cloudinary.com/dfr2qixlq/video/upload/q_auto/f_auto/v1778064275/video_loiyzj.mp4" type="video/mp4" />
            </motion.video>

            <div className="absolute inset-0 z-[-1] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0.9)_100%)]" />

            {/* Scrollable Group containing Hero Title + Cosmic Bento Grid */}
            <motion.div style={{ y: bentoY }} className="w-full flex flex-col items-center">
              {/* Hero Content */}
              <motion.div
                style={{ y: textY, opacity: textOpacity }}
                className="relative z-10 px-6 text-center mb-12 md:mb-16"
              >
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-medium mb-6 tracking-tight leading-tight text-white font-syne">
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
              <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-6 items-stretch auto-rows-[minmax(250px,auto)] pb-24">

                {/* ── Real-Time Monitoring (Large) ── */}
                <BentoCard
                  title="System Performance"
                  description="Real-time company metrics and infrastructure health monitoring across all global zones."
                  icon={<MonitoringIcon className="w-8 h-8 text-blue-500" animate />}
                  gridSpan="md:col-span-4 md:row-span-2"
                  delay={100}
                  nebulaColor="blue"
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

                {/* ── Speed (Tall Right) ── */}
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

      {/* ── WHITE ECOSYSTEM SHEET (SLIDES UP OVER HERO TRACK & ANIMATES SPLIT ON SCROLL) ── */}
      <div className="relative z-20 w-full bg-[#fdfdfd] text-black rounded-t-[3.5rem] shadow-[0_-30px_70px_rgba(0,0,0,0.85)] border-t border-slate-200/80 -mt-[100vh]">
        <EcosystemSection />
      </div>

    </div>
  </LenisDiv>
);
}