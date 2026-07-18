"use client";

import React, { useState, useEffect, useRef } from "react";
import LenisDiv from "@/components/LenisDiv";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import {
  Shield,
  Activity,
  Flame,
  UserX,
  Target,
  ArrowRight,
  IndianRupee,
  Building2,
  Stethoscope,
  GraduationCap,
  PackageSearch,
  Briefcase,
  Home,
  CheckCircle2,
  ChevronDown,
  LineChart,
  Headset
} from "lucide-react";
import Image from "next/image";

// ==========================================
// 1. Hero Section
import { AIIcon } from "./icons";

// ==========================================
// HERO SECTION
// ==========================================
const HeroSection = () => {
  return (
    <section className="relative flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden bg-[#F6F6F6] font-sans text-black pt-32 pb-24">
      
      <main className="container mx-auto flex w-full flex-col items-center px-6 text-center z-10 relative">
        
        {/* Subtle grid background for the hero */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none -z-10 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

        {/* Headline - Marklab inspired mixed typography */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 max-w-5xl text-balance text-6xl font-medium tracking-tight text-slate-900 md:text-7xl lg:text-[6rem] leading-[1.05]"
        >
          Sell Smarter Security. <br className="hidden sm:block" />
          <span className="text-slate-500">Keep Earning</span> Tomorrow.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-12 max-w-[650px] text-balance text-lg leading-relaxed text-slate-600 md:text-xl"
        >
          All partnerships here are designed to deliver impact—not just impressions. Earn 20% on every installation, plus recurring revenue.
        </motion.p>

        {/* Call to Actions - Marklab style pill buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link 
            href="/contact" 
            className="group flex h-14 w-full sm:w-auto items-center justify-between gap-4 rounded-full bg-black pl-8 pr-2 text-[15px] font-medium text-white transition-all hover:bg-slate-800 active:scale-[0.98]"
          >
            Become a Partner
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:scale-[1.05]">
              <ArrowRight className="h-4 w-4 -rotate-45 transition-transform group-hover:rotate-0" />
            </div>
          </Link>
          

        </motion.div>

      </main>
    </section>
  );
};

const BadgeItem = ({ icon, line1, line2 }: { icon: React.ReactNode; line1: string; line2: string }) => (
  <div className="flex items-center gap-2">
    {/* Left Laurel from PNG */}
    <div className="relative w-[28px] h-[70px] overflow-hidden flex-shrink-0">
      <Image
        src="/images/laurel-badge.png"
        alt="Left Laurel"
        fill
        className="object-cover object-left"
        unoptimized
      />
    </div>

    <div className="flex flex-col items-center gap-1 text-center min-w-[70px]">
      <div className="text-[#9CA3AF]">{icon}</div>
      <p className="text-[12px] font-semibold text-[#9CA3AF] leading-tight">{line1}</p>
      <p className="text-[12px] font-semibold text-[#9CA3AF] leading-tight">{line2}</p>
    </div>

    {/* Right Laurel from PNG */}
    <div className="relative w-[28px] h-[70px] overflow-hidden flex-shrink-0">
      <Image
        src="/images/laurel-badge.png"
        alt="Right Laurel"
        fill
        className="object-cover object-right"
        unoptimized
      />
    </div>
  </div>
);

import { Marquee } from "./ui/marquee";

const MarqueeSection = () => {
  return (
    <section className="py-20 bg-white border-b border-slate-100 overflow-hidden">
      <div className="container mx-auto px-6 mb-10 text-center">
        <p className="text-sm font-semibold text-slate-500 tracking-widest uppercase">
          Be part of the 100+ businesses transforming their digital presence.
        </p>
      </div>
      
      <div className="relative w-full overflow-hidden">
        {/* Left and Right fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white z-10"></div>
        
        <Marquee className="[--duration:30s] flex items-center" repeat={6}>
          <span className="text-3xl font-black tracking-tighter text-slate-300 mx-8 opacity-70">HIKVISION</span>
          <span className="text-3xl font-bold tracking-tight text-slate-300 mx-8 opacity-70" style={{ fontVariant: "small-caps" }}>dahua</span>
          <span className="text-3xl font-bold tracking-widest uppercase text-slate-300 mx-8 opacity-70">Bosch</span>
          <span className="text-3xl font-extrabold tracking-tight uppercase text-slate-300 mx-8 opacity-70">CP PLUS</span>
        </Marquee>
      </div>
    </section>
  );
};

// ==========================================
// 2. Earning Model (Ultra Premium Design)
// ==========================================
const EarningModelSection = () => {
  return (
    <section id="earning-model" className="py-32 bg-[#FDFDFD] text-slate-900 relative overflow-hidden">
      {/* Subtle ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] bg-gradient-to-b from-slate-100/50 to-transparent blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left Side - Editorial Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 w-full flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 border border-slate-200/80 bg-white/50 backdrop-blur-sm px-4 py-1.5 rounded-full text-slate-500 text-[11px] font-bold tracking-[0.2em] uppercase mb-8 shadow-sm self-start">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900 animate-pulse" />
              Partner Economics
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold font-syne tracking-tight text-slate-900 leading-[1.05] mb-6">
              One Install. <br/>
              <span className="text-slate-400">Endless Returns.</span>
            </h2>
            
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg font-medium">
              Transform single transactions into a compounding portfolio. Earn a robust upfront margin, then secure your future with ongoing monthly revenue.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link 
                href="/contact" 
                className="group relative flex h-14 w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-slate-900 px-8 text-[15px] font-medium text-white transition-all hover:bg-slate-800 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] active:scale-[0.98] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span>Become a Partner</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Premium Metrics List */}
            <div className="grid sm:grid-cols-2 gap-8 border-t border-slate-200/60 pt-10">
              <div>
                <div className="text-3xl font-bold font-syne text-slate-900 mb-1">20%</div>
                <div className="text-sm font-medium text-slate-500 uppercase tracking-widest">Upfront Margin</div>
              </div>
              <div>
                <div className="text-3xl font-bold font-syne text-slate-900 mb-1">Recurring</div>
                <div className="text-sm font-medium text-slate-500 uppercase tracking-widest">Monthly Revenue</div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Premium Visual Stack */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 w-full relative"
          >
            {/* Soft decorative background element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square bg-gradient-to-tr from-slate-100 to-slate-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

            <div className="relative w-full aspect-square max-w-[500px] mx-auto">
              
              {/* Card 1: Direct Commission (Back/Top) */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 w-[85%] aspect-[4/3] bg-white rounded-3xl border border-slate-200/60 shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-8 flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[5rem] md:text-[7rem] font-black font-syne text-slate-100 leading-none select-none pointer-events-none w-full text-center scale-x-110 -rotate-2">
                  20%
                </div>
                
                <div className="relative z-10 flex justify-between items-start w-full">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 shadow-sm">
                    <IndianRupee className="w-5 h-5 text-slate-900" />
                  </div>
                  <div className="bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-emerald-100/50">
                    Paid Instantly
                  </div>
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold font-syne text-slate-900 tracking-tight mb-1">Direct</h3>
                  <p className="text-slate-500 font-medium">Hardware Commission</p>
                </div>
              </motion.div>

              {/* Card 2: Recurring (Front/Bottom) */}
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-0 left-0 w-[85%] aspect-[4/3] bg-slate-900 rounded-3xl border border-slate-800 shadow-[0_30px_80px_rgba(0,0,0,0.15)] p-8 flex flex-col justify-between overflow-hidden"
              >
                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />
                
                <div className="relative z-10 flex justify-between items-start w-full">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/5 shadow-inner">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                      <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9m-9 9a9 9 0 0 1 9-9" />
                    </svg>
                  </div>
                  <div className="flex gap-1.5">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className={`w-1.5 rounded-full bg-white/20 animate-pulse`} style={{ height: `${12 + i * 4}px`, animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </div>
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold font-syne text-white tracking-tight mb-1">Recurring</h3>
                  <p className="text-slate-400 font-medium">Software Subscriptions</p>
                </div>
              </motion.div>
              
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

// ==========================================
// 3. How You Earn
// ==========================================
const HowYouEarnSection = () => {
  const steps = [
    { num: "01", title: "Find the Right Customer", desc: "Introduce KAIROS to businesses, industries, hospitals, educational institutions, commercial spaces, and other eligible customers." },
    { num: "02", title: "Install KAIROS", desc: "Complete a successful eligible installation and earn 20% commission on the applicable installation value." },
    { num: "03", title: "Customer Activates a Subscription", desc: "The customer selects an eligible KAIROS subscription plan based on their requirements." },
    { num: "04", title: "Keep Earning", desc: "As eligible customer subscriptions remain active, continue earning recurring commission according to the applicable partner structure." },
  ];

  return (
    <section className="py-24 bg-slate-50 text-slate-900">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-16">
          <div className="text-slate-900 text-sm font-bold tracking-widest uppercase mb-4">YOUR EARNING JOURNEY</div>
          <h2 className="text-4xl font-bold font-syne">From One Introduction to Long-Term Opportunity</h2>
        </div>

        <div className="relative">
          {/* Glowing Line */}
          <div className="absolute top-12 left-0 w-full h-[2px] bg-slate-200 hidden md:block">
            <motion.div
              className="h-full bg-slate-900 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              viewport={{ once: true, margin: "-100px" }}
            />
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative pt-8 md:pt-0 group"
              >
                <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 shadow-sm flex items-center justify-center font-syne font-bold text-slate-400 mb-6 md:mt-6 relative z-10 group-hover:border-slate-500 group-hover:text-slate-900 transition-colors">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-600 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-xl md:text-2xl font-syne font-medium text-slate-500">
            <span className="text-slate-900">One customer.</span> Two revenue opportunities. <span className="text-slate-900">Long-term growth potential.</span>
          </p>
        </div>
      </div>
    </section>
  );
};



// ==========================================
// 5. Why KAIROS (Marklab Service Grid Style)
// ==========================================
const WhyKairosSection = () => {
  const services = [
    {
      title: "Fire & Smoke Detection",
      desc: "Identify potential fire events and smoke patterns before they escalate using advanced visual recognition.",
      icon: <Flame className="w-5 h-5 text-slate-700" strokeWidth={1.5} />,
      image: "/images/Fire & Smoke Detection.png"
    },
    {
      title: "FootFall Detection",
      desc: "Automatically detect human falls in real-time, enabling rapid medical response for workplace and healthcare safety.",
      icon: <Activity className="w-5 h-5 text-slate-700" strokeWidth={1.5} />,
      image: "/images/FootFall Detection.png"
    },
    {
      title: "Intrusion Detection",
      desc: "Secure restricted areas by instantly flagging unauthorized human or vehicular entry in real-time.",
      icon: <UserX className="w-5 h-5 text-slate-700" strokeWidth={1.5} />,
      image: "/images/Intrusion Detection.png"
    },
    {
      title: "Weapon Detection",
      desc: "Proactively identify visible weapons to preemptively secure high-risk commercial and educational zones.",
      icon: <Target className="w-5 h-5 text-slate-700" strokeWidth={1.5} />,
      image: "/images/Weapon Detection.png"
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-white text-slate-900 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold font-syne tracking-tight leading-[1.1] mb-6">
              Smart <span className="text-slate-500">Service</span> <br/>
              That Real <span className="text-slate-500">Impact.</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              An AI Edge Box that processes video streams locally in real-time, transforming passive CCTV into a proactive threat detection system.
            </p>
          </div>
          <div>
            <Link 
              href="/contact" 
              className="group flex h-14 w-full sm:w-auto items-center justify-between gap-4 rounded-full bg-black pl-8 pr-2 text-[15px] font-medium text-white transition-all hover:bg-slate-800 active:scale-[0.98]"
            >
              Learn More
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:scale-[1.05]">
                <ArrowRight className="h-4 w-4 -rotate-45 transition-transform group-hover:rotate-0" />
              </div>
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group bg-[#F6F6F6] border border-slate-100 rounded-[2rem] p-3 hover:bg-slate-50 hover:border-slate-200 transition-all duration-300 flex flex-col overflow-hidden"
            >
              <div className="w-full aspect-[4/3] relative rounded-3xl overflow-hidden mb-6 bg-white border border-slate-100">
                <Image src={service.image} alt={service.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 left-4 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm border border-slate-100/50">
                  {service.icon}
                </div>
              </div>
              <div className="px-4 pb-6 mt-auto">
                <h4 className="text-xl font-bold font-syne text-slate-900 mb-2 mt-auto">
                  {service.title}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 6. Vendor Benefits (Bento Grid)
// ==========================================
const BenefitsSection = () => {
  return (
    <section className="py-24 md:py-32 bg-[#fafbfc] relative overflow-hidden">
      {/* Soft Background Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-50/50 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        <div className="mb-16 md:mb-24 text-center">
          <div className="inline-block border border-slate-200 bg-white/60 backdrop-blur-md px-5 py-2 rounded-full text-slate-500 text-[11px] font-bold tracking-[0.2em] uppercase mb-8 shadow-sm">
            Built for Partner Success
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-syne text-slate-900 tracking-tight">
            More Than a Product. <br className="hidden md:block" />
            <span className="text-slate-400">A Partnership Built for Growth.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6 auto-rows-[minmax(220px,auto)] md:auto-rows-[240px]">
          {/* Large Card 1 */}
          <div className="md:col-span-2 md:row-span-2 bg-white border border-slate-100/80 rounded-[2rem] p-8 md:p-12 relative overflow-hidden group shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] transition-all duration-500">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-blue-100/40 to-indigo-100/40 rounded-full blur-[60px] group-hover:scale-110 group-hover:bg-blue-100/60 transition-transform duration-700 pointer-events-none" />
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="w-14 h-14 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center mb-8 border border-slate-200 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-sm">
                <IndianRupee className="w-7 h-7" />
              </div>
              <div className="max-w-xl">
                <h3 className="text-3xl md:text-4xl font-bold font-syne mb-4 text-slate-900 tracking-tight">20% Installation Commission</h3>
                <p className="text-slate-500 text-base md:text-lg leading-relaxed">Earn a generous 20% commission on every successful eligible KAIROS installation. Grow your revenue directly with every deployment.</p>
              </div>
            </div>
          </div>

          {/* Large Card 2 */}
          <div className="md:col-span-1 md:row-span-2 bg-white border border-slate-100/80 rounded-[2rem] p-8 md:p-10 relative overflow-hidden group shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] transition-all duration-500">
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-gradient-to-tl from-purple-100/40 to-pink-100/40 rounded-full blur-[60px] group-hover:scale-110 group-hover:bg-purple-100/60 transition-transform duration-700 pointer-events-none" />
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="w-14 h-14 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center mb-8 border border-slate-200 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm">
                <Activity className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold font-syne mb-4 text-slate-900 tracking-tight">Recurring Revenue Opportunity</h3>
                <p className="text-slate-500 text-base leading-relaxed">Unlock recurring commission potential through eligible active customer subscriptions.</p>
              </div>
            </div>
          </div>

          {/* Small Cards */}
          <div className="bg-white border border-slate-100/80 rounded-[2rem] p-8 flex flex-col justify-center group hover:shadow-[0_15px_40px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-3 text-slate-900 tracking-tight flex items-center gap-3">
                <span className="w-10 h-10 rounded-[12px] bg-slate-50 flex items-center justify-center border border-slate-200 text-slate-700 shrink-0 group-hover:bg-slate-100 group-hover:text-slate-900 group-hover:border-slate-300 transition-colors"><LineChart className="w-5 h-5" /></span>
                Sales & Marketing
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">Access brochures, presentations, and high-quality promotional creatives.</p>
            </div>
          </div>

          <div className="bg-white border border-slate-100/80 rounded-[2rem] p-8 flex flex-col justify-center group hover:shadow-[0_15px_40px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-3 text-slate-900 tracking-tight flex items-center gap-3">
                <span className="w-10 h-10 rounded-[12px] bg-slate-50 flex items-center justify-center border border-slate-200 text-slate-700 shrink-0 group-hover:bg-slate-100 group-hover:text-slate-900 group-hover:border-slate-300 transition-colors"><GraduationCap className="w-5 h-5" /></span>
                Product Training
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">Get structured onboarding to confidently present and sell KAIROS.</p>
            </div>
          </div>

          <div className="bg-white border border-slate-100/80 rounded-[2rem] p-8 flex flex-col justify-center group hover:shadow-[0_15px_40px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-3 text-slate-900 tracking-tight flex items-center gap-3">
                <span className="w-10 h-10 rounded-[12px] bg-slate-50 flex items-center justify-center border border-slate-200 text-slate-700 shrink-0 group-hover:bg-slate-100 group-hover:text-slate-900 group-hover:border-slate-300 transition-colors"><Headset className="w-5 h-5" /></span>
                Technical Assistance
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">Receive priority guidance for product understanding and deployment.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};



// ==========================================
// 7. & 8. Who Can Join & Industries
// ==========================================
const AudienceAndIndustriesSection = () => {
  const partners = [
    "CCTV Dealers & Installers",
    "Security Solution Providers",
    "System Integrators",
    "IT & Networking Companies",
    "Electronics & Surveillance Distributors",
    "Independent Sales Partners & Agencies"
  ];

  const industries = [
    { title: "Factories & Industrial", icon: Building2, desc: "Enhance monitoring for fire, intrusion, restricted areas, and workplace safety." },
    { title: "Hospitals & Healthcare", icon: Stethoscope, desc: "Support intelligent monitoring and potential fall detection in critical environments." },
    { title: "Schools & Colleges", icon: GraduationCap, desc: "Enhance campus surveillance with intelligent detection capabilities." },
    { title: "Warehouses & Logistics", icon: PackageSearch, desc: "Monitor potential fire risks, intrusion, and operational safety events." },
    { title: "Offices & Commercial", icon: Briefcase, desc: "Transform compatible existing CCTV infrastructure into smarter systems." },
    { title: "Residential Properties", icon: Home, desc: "Bring intelligent monitoring capabilities to suitable homes and communities." }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#fafbfc] relative overflow-hidden text-slate-900">
      {/* Soft Ambient Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        {/* Who Can Join */}
        <div className="mb-24 md:mb-32">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block border border-slate-200 bg-white/60 backdrop-blur-md px-5 py-2 rounded-full text-slate-500 text-[11px] font-bold tracking-[0.2em] uppercase mb-8 shadow-sm">
              Built for Ambitious Partners
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-syne max-w-4xl mx-auto tracking-tight leading-tight">
              If You Understand Security, Technology, or Sales—<br className="hidden md:block" />
              <span className="text-slate-500">There&apos;s an Opportunity to Grow.</span>
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-5xl mx-auto">
            {partners.map((p, i) => (
              <div key={i} className="px-5 py-3 md:px-6 md:py-3.5 bg-white/90 backdrop-blur-sm border border-slate-100/80 shadow-[0_4px_15px_rgba(0,0,0,0.02)] rounded-full text-slate-700 text-sm font-medium hover:border-slate-200 hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                {p}
              </div>
            ))}
          </div>
        </div>

        {/* Industries */}
        <div>
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-block border border-slate-200 bg-white/60 backdrop-blur-md px-5 py-2 rounded-full text-slate-500 text-[11px] font-bold tracking-[0.2em] uppercase mb-8 shadow-sm">
              One Product. Multiple Markets.
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-syne tracking-tight">Take Intelligent Security <span className="text-slate-500">Across Industries.</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {industries.map((ind, i) => (
              <div key={i} className="group relative bg-white/80 backdrop-blur-xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-[2rem] p-8 md:p-10 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 overflow-hidden">
                <div className="absolute -right-8 -bottom-8 opacity-[0.02] group-hover:opacity-[0.04] group-hover:rotate-12 group-hover:scale-110 transition-all duration-700 pointer-events-none">
                  <ind.icon className="w-40 h-40" />
                </div>

                <div className="w-14 h-14 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center mb-8 border border-slate-200 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-sm relative z-10">
                  <ind.icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-slate-900 font-syne tracking-tight relative z-10">{ind.title}</h3>
                <p className="text-sm md:text-base text-slate-500 relative z-10 leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


// ==========================================
// 12. FAQs
// ==========================================
const FaqSection = () => {
  const faqs = [
    { q: "Who can become a KavachX Vendor Partner?", a: "CCTV dealers, security providers, system integrators, IT companies, distributors, agencies, and other eligible businesses interested in offering AI-powered security solutions can apply." },
    { q: "How much can I earn from a KAIROS installation?", a: "Eligible Vendor Partners can earn a 20% commission on applicable successful KAIROS installations, subject to the Vendor Partner Program terms." },
    { q: "Can I earn every month after installing KAIROS?", a: "Eligible partners may earn recurring commission when qualifying customers attributed to them maintain eligible active KAIROS subscription plans, according to the applicable commission structure and partner terms." },
    { q: "Do I need AI expertise to become a partner?", a: "No deep AI expertise is required. KavachX provides product onboarding and training to help eligible partners understand and present KAIROS effectively." },
    { q: "Does KAIROS work with existing CCTV systems?", a: "KAIROS is designed to enhance compatible existing CCTV infrastructure. Compatibility depends on the cameras, network, video streams, deployment environment, and technical configuration." },
    { q: "How do I get started?", a: "Complete the Vendor Partner application form. The KavachX team will review your details and contact you regarding the next steps." },
  ];

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white text-slate-900">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-syne">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between font-semibold text-left focus:outline-none"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-200 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 13. Final CTA (Marklab Style)
// ==========================================
const CtaSection = () => {
  return (
    <div className="relative bg-white pb-6 md:pb-8">
      <section className="py-24 md:py-32 px-6 relative overflow-hidden bg-[#F6F6F6] rounded-[3rem] mx-2 md:mx-4 border border-slate-200 shadow-sm">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <p className="text-sm font-semibold text-slate-500 tracking-widest uppercase mb-6">
            Ready to Partner With Us?
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-[4.5rem] font-bold font-syne mb-8 text-slate-900 tracking-tight leading-[1.05]">
            One Installation Can Start <br />
            <span className="text-slate-500">Something Bigger.</span>
          </h2>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Earn <strong>20% commission</strong> on eligible KAIROS installations and unlock recurring commission through qualifying active subscriptions.
          </p>
          
          <div className="flex justify-center">
            <Link 
              href="/contact" 
              className="group flex h-16 items-center justify-between gap-6 rounded-full bg-black pl-10 pr-2 text-[17px] font-medium text-white transition-all hover:bg-slate-800 active:scale-[0.98]"
            >
              Become a Vendor Partner
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:scale-[1.05]">
                <ArrowRight className="h-5 w-5 -rotate-45 transition-transform group-hover:rotate-0" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};


// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
export default function VendorPageClient() {
  return (
    <LenisDiv>
      <div className="min-h-screen bg-[#F6F6F6] font-sans">
        <HeroSection />
        <MarqueeSection />
        <EarningModelSection />
        <HowYouEarnSection />
        <WhyKairosSection />
        <BenefitsSection />
        <AudienceAndIndustriesSection />
        <FaqSection />
        <CtaSection />
      </div>
    </LenisDiv>
  );
}
