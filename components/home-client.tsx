"use client";

import LenisDiv from "@/components/LenisDiv";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import BentoCard from "./bento-card";
import {
  MonitoringIcon,
  AIIcon,
  ScaleIcon,
  ShieldIcon,
  SpeedIcon,
} from "./icons";
import {
  SonarRadar,
  PerformanceGraph,
  UptimeCard,
  CloudAsset,
  SearchBarAsset,
  IntegrationIcons
} from "./bento-assets";
import FadeIn from "./FadeIn";
import Link from "next/link";

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

  const videoScale = useTransform(smoothProgress, [0, 0.4], [1, 1.05]);
  const textY = useTransform(smoothProgress, [0, 0.4], [0, -50]);
  const textOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);

  return (
    <LenisDiv>
      <div className="relative min-h-screen bg-black overflow-hidden font-sans">

        {/* Noise Overlay */}
        <div className="noise-overlay" />

        {/* Invisible scroll driver */}
        <div ref={containerRef} className="h-[200vh] w-full absolute top-0 left-0 pointer-events-none" />

        <section className="relative z-10 min-h-screen flex flex-col items-center px-4 md:px-[5%] pt-56 pb-24 overflow-hidden">

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

          {/* Hero Content */}
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="relative z-10  px-6 text-center mb-20"
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-medium mb-6 tracking-tight leading-tight text-white">
              Safety Infrastructure for Organizations<br />
              <span className="text-white/40">That Can't Afford Failure</span>
            </h1>

            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed font-light">
              KavachX delivers real-time monitoring, automated alerts, and emergency response systems that keep your operations protected around the clock.
            </p>
          </motion.div>

          {/* ──── COSMIC BENTO GRID ──── */}
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-6 items-stretch auto-rows-[minmax(250px,auto)]">

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
              title="Cloud Protection"
              description="Your infrastructure is safely shielded in the cosmic cloud—always up-to-date, always resilient."
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
              title="All-in-One Search"
              description="Find incidents, logs, and nodes instantly. One search bar to navigate your entire infrastructure."
              icon={<AIIcon className="w-8 h-8 text-blue-400" animate />}
              gridSpan="md:col-span-2 md:row-span-1"
              delay={200}
              nebulaColor="blue"
            >
              <div className="mt-10">
                <SearchBarAsset />
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

        </section>



        <section className="flex flex-col md:flex-row justify-between items-stretch bg-transparent min-h-screen relative overflow-hidden p-0">
          {/* Left Column */}
          <FadeIn direction="left" className="w-full md:w-[35%] px-6 md:px-[4%] flex flex-col justify-start md:pt-[15vh] bg-black py-12 md:py-0 self-center md:self-stretch">
            <h2 className="font-syne text-[28px] md:text-[clamp(28px,3.5vw,42px)] font-medium mb-6 text-white tracking-[1px]">Suraksha Kavach</h2>
            <p className="font-inter text-[14px] md:text-[15px] leading-[1.8] text-[#e0e0e0] mb-8 font-normal">
              Your Personal Safety Shield. A smart safety app designed for India.
              Instant SOS alerts, automatic crash detection, real-time location sharing,
              and voice commands that work even when you're offline.
              Because safety can't wait for a signal.
            </p>
            <Link href="/suraksha-kavach" className="text-[14px] font-normal underline text-white capitalize hover:text-[#aaaaaa] transition-colors duration-300">Know More</Link>
          </FadeIn>

          {/* Right Column */}
          <FadeIn direction="right" delay={400} className="w-full md:w-[35%] px-6 md:px-[4%] flex flex-col justify-center bg-black py-12 md:py-0 self-center md:self-stretch">
            <h2 className="font-syne text-[28px] md:text-[clamp(28px,3.5vw,42px)] font-medium mb-6 text-white tracking-[1px]">AI Edge Box</h2>
            <p className="font-inter text-[14px] md:text-[15px] leading-[1.8] text-[#e0e0e0] mb-8 font-normal">
              Intelligent Home Security. Monitor your home, family, and spaces from
              anywhere in the world. The Kavach AI Edge Box brings AI-driven CCTV
              analytics and real-time intelligence directly to your front door.
            </p>
            <Link href="/ai-edge-box" className="text-[14px] font-normal underline text-white capitalize hover:text-[#aaaaaa] transition-colors duration-300">Know More</Link>
          </FadeIn>
        </section>
      </div>
    </LenisDiv>
  );
}