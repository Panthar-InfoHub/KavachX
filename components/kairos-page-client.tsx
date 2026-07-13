"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  ScanFace,
  Flame,
  Zap,
  Building2,
  Briefcase,
  Store,
  Home,
  CheckCircle2,
  Lock,
  WifiOff,
  ArrowRight,
  UserX,
  Activity,
  Target,
  Users,
  Clock,
  Plus
} from "lucide-react";
import LenisDiv from "@/components/LenisDiv";
import Link from "next/link";
import { KairosBentoGrid } from "@/components/kairos-bento-grid";

const features = [
  {
    title: "Threat Detection",
    description: "Intelligent AI continuously scans for unauthorized access and suspicious behavior, instantly flagging potential risks.",
    icon: ShieldAlert,
  },
  {
    title: "Gesture Detection",
    description: "Recognizes distress signals and abnormal movements, automatically triggering alerts even if no one can speak or access a phone.",
    icon: ScanFace,
  },
  {
    title: "Fire Detection",
    description: "Early-warning detection spots fire and smoke instantly, potentially saving lives and minimizing property damage.",
    icon: Flame,
  },
  {
    title: "Perimeter Security",
    description: "Monitors property boundaries to detect unauthorized access before intruders reach critical areas.",
    icon: ShieldAlert,
  },
  {
    title: "Fall Detection",
    description: "Detects falls instantly and alerts for quick response, crucial for safety monitoring of vulnerable individuals.",
    icon: Activity,
  },
  {
    title: "Weapon Detection",
    description: "Identifies weapons and dangerous objects in real time to prevent armed incidents and enhance security.",
    icon: Target,
  },
  {
    title: "Crowd Detection",
    description: "Monitors crowd density and alerts on unusual gatherings or potential stampedes for public safety.",
    icon: Users,
  },
  {
    title: "Intrusion Detection",
    description: "Identifies unauthorized access and potential intrusions into restricted areas with high accuracy.",
    icon: UserX,
    featuredGrid: true
  },
  {
    title: "3-5 Second Response",
    description: "Every second counts. From the moment an incident is detected, you and your emergency contacts are notified in under 5 seconds.",
    icon: Zap,
    featured: true
  }
];

const audiences = [
  {
    id: "industrial",
    label: "Industrial Facilities",
    icon: Building2,
    headline: "Protect your people and your assets.",
    body: "Monitor vast warehouse spaces effortlessly. From detecting unauthorized personnel in restricted zones to spotting early signs of fire near machinery, Kairos ensures your operations run safely and smoothly.",
    cta: "Explore Enterprise Solutions",
    image: "/images/factory.jpeg"
  },
  {
    id: "business",
    label: "Business Owners",
    icon: Briefcase,
    headline: "Security that never sleeps.",
    body: "Keep your offices and corporate spaces secure 24/7. Detect distress gestures from employees working late and prevent unauthorized access with instant alerts delivered straight to your management team.",
    cta: "Secure Your Business",
    image: "/images/Business Owners.jpeg"
  },
  {
    id: "vendor",
    label: "Local Vendors",
    icon: Store,
    headline: "Keep your livelihood safe.",
    body: "Prevent theft and ensure the safety of your storefront. Kairos alerts you immediately if suspicious activity or a fire is detected after hours, so you can act before damage is done.",
    cta: "Protect Your Shop",
    image: "/images/Local Vendor.jpeg"
  },
  {
    id: "home",
    label: "Homeowners",
    icon: Home,
    headline: "Peace of mind for your loved ones.",
    body: "Whether you're at work or on vacation, Kairos keeps a watchful eye on your home. Instantly detect break-ins, distress gestures, or smoke, ensuring your family is always protected.",
    cta: "Secure Your Home",
    image: "/images/home.jpeg"
  }
];

export default function KairosPageClient() {
  const [activeAudience, setActiveAudience] = useState(audiences[0]);
  const heroRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  return (
    <LenisDiv>
      <div className="bg-white text-black font-sans selection:bg-black selection:text-white relative z-0">
        {/* HERO SECTION - STATIC & STICKY FOR STACKING EFFECT */}
        <section ref={heroRef} className="sticky top-0 h-screen w-full flex flex-col items-center justify-start pt-32 px-6 overflow-hidden z-0">
          {/* Subtle Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_0%,transparent_60%)]" />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full border border-black/5"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full border border-black/5"
          />
          <div className="absolute inset-0 z-0 bg-black">
            <video
              key="/videos/Box.mp4"
              autoPlay={true}
              loop={true}
              muted={true}
              playsInline={true}
              className="absolute inset-0 w-full h-full object-cover opacity-70"
            >
              <source src="/videos/Box.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black pointer-events-none" />
          </div>

          <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center mt-12 mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-8 leading-[1.05] font-syne text-white drop-shadow-2xl"
            >
              KAIROS- AI edge box<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">Empowering Your Security</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed font-normal"
            >
              Stop threats before they escalate. With advanced threat, gesture, and fire detection, Kairos alerts you in just 3 to 5 seconds—giving you the critical time you need to react.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
            >
              <button
                onClick={() => router.push("/contact")}
                className="w-full sm:w-auto text-center bg-black hover:bg-gray-900 text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)]"
              >
                Secure Your Space Today
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("the-advantage");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="w-full sm:w-auto bg-white hover:bg-gray-50 border border-black/20 text-black px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300 shadow-sm"
              >
                Explore Feature
              </button>
            </motion.div>
          </div>


        </section>

        {/* KAIROS BENTO GRID SECTION */}
        <KairosBentoGrid />

        {/* CORE FEATURES SECTION */}
        <section id="the-advantage" className="relative z-30 pt-16 md:pt-24 pb-24 px-6 bg-white border-y border-black/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold font-syne mb-4 text-black tracking-tight">The 3-5 Second Advantage</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg font-medium">Because in an emergency, every single second counts.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {/* Feature Cards */}
              {features.filter(f => !f.featured).map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className={`col-span-1 rounded-[2rem] p-6 md:p-8 hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group flex flex-col justify-between ${feature.featuredGrid
                    ? "bg-[#09090b] border-transparent hover:shadow-black/20"
                    : "bg-white border border-black/[0.08] hover:shadow-black/5"
                    }`}
                >
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${feature.featuredGrid ? "bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.05)_0%,transparent_50%)]" : "bg-gradient-to-br from-gray-50/50 to-white"
                    }`} />

                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-[1rem] flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-sm group-hover:shadow-md ${feature.featuredGrid
                      ? "bg-white/10 group-hover:bg-white text-white group-hover:text-black"
                      : "bg-gray-100 group-hover:bg-black text-gray-700 group-hover:text-white"
                      }`}>
                      <feature.icon className="w-5 h-5 transition-colors duration-300" strokeWidth={1.5} />
                    </div>

                    <h3 className={`text-xl font-bold mb-3 tracking-tight transition-colors ${feature.featuredGrid ? "text-white" : "text-black group-hover:text-black"
                      }`}>{feature.title}</h3>
                    <p className={`leading-relaxed text-[15px] font-medium transition-colors ${feature.featuredGrid ? "text-white/60 group-hover:text-white/80" : "text-gray-500 group-hover:text-gray-700"
                      }`}>{feature.description}</p>
                  </div>

                  {/* Subtle decorative element */}
                  {!feature.featuredGrid && (
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gray-50 rounded-full blur-2xl group-hover:bg-gray-200/50 transition-colors duration-500 -z-0" />
                  )}
                  {feature.featuredGrid && (
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-500 -z-0" />
                  )}
                </motion.div>
              ))}

              {/* Bottom Row: Featured Item (Full Width) */}
              {(() => {
                const featuredItem = features.find(f => f.featured) || features[features.length - 1];
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="col-span-1 sm:col-span-2 lg:col-span-4 bg-[#09090b] rounded-[2rem] p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 group mt-2 md:mt-4"
                  >
                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
                    <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-700" />

                    <div className="relative z-10 md:w-1/2">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-white text-xs font-bold tracking-widest uppercase mb-6">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        Critical Response
                      </div>
                      <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight leading-tight">
                        {featuredItem.title}
                      </h3>
                      <p className="leading-relaxed text-lg font-medium text-white/60">
                        {featuredItem.description}
                      </p>
                    </div>

                    <div className="relative z-10 md:w-1/2 flex justify-center md:justify-end">
                      <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                        {/* Pulsing rings */}
                        <div className="absolute inset-0 rounded-full border border-white/20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
                        <div className="absolute inset-4 rounded-full border border-white/10 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_1s]" />
                        <div className="absolute inset-8 rounded-full border border-white/5 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_2s]" />

                        {/* Center Icon */}
                        <div className="relative w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform duration-500">
                          <featuredItem.icon className="w-10 h-10 text-black" strokeWidth={1.5} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </div>
          </div>
        </section>

        {/* USE CASES SECTION */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-gray-50 relative border-b border-black/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 md:mb-16">
              <h2 className="text-2xl md:text-5xl font-bold font-syne mb-4 text-black tracking-tight">Designed For Your Reality</h2>
              <p className="text-gray-600 max-w-2xl text-base md:text-lg font-medium">Tailored intelligence that adapts to your specific environment and security needs.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 h-auto min-h-[1200px] md:min-h-0 md:h-[600px]">
              {/* Left Column: Industrial */}
              <div className="flex-1 relative rounded-[32px] overflow-hidden group cursor-pointer bg-black">
                <Image src={audiences[0].image} alt={audiences[0].label} fill className="object-cover opacity-100 group-hover:scale-105 transition-all duration-700" />
                <div className="relative z-10 p-8 flex flex-col justify-between h-full text-white drop-shadow-md">
                  <h3 className="text-3xl md:text-4xl font-medium leading-tight max-w-[200px]">{audiences[0].label}</h3>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm font-medium text-white/90">{audiences[0].cta}</span>
                    <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </div>
              </div>

              {/* Middle Column */}
              <div className="flex-1 flex flex-col gap-4">
                {/* Top: Business Owners */}
                <div className="flex-1 relative rounded-[32px] overflow-hidden group cursor-pointer bg-black">
                  <Image src={audiences[1].image} alt={audiences[1].label} fill className="object-cover opacity-100 group-hover:scale-105 transition-all duration-700" />
                  <div className="relative z-10 p-8 flex flex-col justify-between h-full text-white drop-shadow-md">
                    <h3 className="text-2xl md:text-3xl font-medium leading-tight max-w-[180px]">{audiences[1].label}</h3>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-sm font-medium text-white/90">{audiences[1].cta}</span>
                      <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                  </div>
                </div>

                {/* Bottom: Local Vendors */}
                <div className="flex-1 relative rounded-[32px] overflow-hidden group cursor-pointer bg-[#1c1c1e]">
                  <Image src={audiences[2].image} alt={audiences[2].label} fill className="object-cover opacity-100 group-hover:scale-105 transition-all duration-700" />
                  <div className="relative z-10 p-8 flex flex-col justify-between h-full text-white drop-shadow-md">
                    <h3 className="text-2xl md:text-3xl font-medium leading-tight max-w-[180px]">{audiences[2].label}</h3>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-sm font-medium text-white/90">{audiences[2].cta}</span>
                      <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Residential */}
              <div className="flex-1 relative rounded-[32px] overflow-hidden group cursor-pointer bg-black">
                <Image src={audiences[3].image} alt={audiences[3].label} fill className="object-cover opacity-100 group-hover:scale-105 transition-all duration-700" />
                <div className="relative z-10 p-8 flex flex-col justify-between h-full text-white drop-shadow-md">
                  <h3 className="text-3xl md:text-4xl font-medium leading-tight max-w-[200px]">{audiences[3].label}</h3>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm font-medium text-white/90">{audiences[3].cta}</span>
                    <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTELLIGENCE ELEVATED SECTION */}
        <section className="relative overflow-hidden bg-[#07090e] border-y border-white/[0.05]">
          {/* Layered ambient glows for depth */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(59,130,246,0.07)_0%,transparent_100%)] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none" />
          {/* Subtle scanline noise for texture */}
          <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)' }} />

          {/* Full composition container */}
          <div className="relative w-full flex flex-col items-center">

            {/* ── Text block (top, z-10) ── */}
            <div className="relative z-10 flex flex-col items-center pt-14 pb-6 px-6 text-center">
              {/* KAIROS wordmark */}
              <div className="flex flex-col items-center mb-6">
                <Plus className="w-3.5 h-3.5 text-gray-600 mb-2" strokeWidth={1} />
                <span className="text-[10px] font-bold tracking-[0.55em] uppercase" style={{ color: 'rgba(160,160,170,0.7)' }}>Kairos</span>
              </div>

              {/* Messy metallic headline — no bg bloom */}
              <div className="relative mb-4">
                <h2
                  className="relative text-4xl md:text-5xl lg:text-[5.5rem] font-light tracking-tight leading-tight"
                  style={{
                    background: `linear-gradient(
                      to bottom,
                      #c8c8cc 0%,
                      #ffffff 10%,
                      #d0d0d8 22%,
                      #a8a8b2 35%,
                      #e0e0e8 44%,
                      #808090 58%,
                      #505060 72%,
                      #383848 85%,
                      #282838 100%
                    )`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Intelligence.{' '}
                  <span
                    style={{
                      fontWeight: 700,
                      background: `linear-gradient(
                        to bottom,
                        #d8d8e0 0%,
                        #ffffff 8%,
                        #e8e8f0 18%,
                        #b0b0be 30%,
                        #ffffff 40%,
                        #909098 54%,
                        #585868 68%,
                        #404050 82%,
                        #2c2c3c 100%
                      )`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Elevated.
                  </span>
                </h2>
              </div>

              <p className="text-sm md:text-[15px] mb-8 max-w-lg leading-relaxed" style={{ color: 'rgba(150,150,165,0.85)' }}>
                Premium technology for preventative, proactive security.
              </p>

              <div className="flex items-center gap-3">
                <button className="px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:bg-white/10"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'rgba(220,220,230,0.9)',
                    boxShadow: '0 0 0 1px rgba(255,255,255,0.04) inset'
                  }}>
                  Request Demo
                </button>
              </div>
            </div>

            {/* ── Product + Callouts composition ── */}
            <div className="relative w-full max-w-[1200px] mx-auto px-4 pb-0">
              {/* Inner relative container for absolute callout positioning */}
              <div className="relative flex items-end justify-center">

                {/* LEFT callouts column */}
                <div className="hidden md:flex flex-col justify-between absolute left-0 top-0 bottom-0 w-[200px] py-6 z-20">
                  {/* [01] */}
                  <div className="flex items-start gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] text-gray-500 font-mono">[01]</span>
                        <Plus className="w-2 h-2 text-gray-600" strokeWidth={1} />
                      </div>
                      <div className="border border-white/10 bg-black/40 backdrop-blur-sm px-3 py-2 relative">
                        <div className="absolute -top-px -left-px w-1 h-1 bg-white/20" />
                        <div className="absolute -bottom-px -right-px w-1 h-1 bg-white/20" />
                        <span className="text-[11px] text-gray-300 leading-snug">AI-Powered<br />Security Insights</span>
                      </div>
                    </div>
                    <div className="flex-1 mt-[26px] h-[1px] bg-gradient-to-r from-white/15 to-transparent relative">
                      <Plus className="w-2.5 h-2.5 text-gray-600 absolute -top-[5px] right-0" strokeWidth={1} />
                    </div>
                  </div>

                  {/* [03] */}
                  <div className="flex items-center gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] text-gray-500 font-mono">[03]</span>
                        <Plus className="w-2 h-2 text-gray-600" strokeWidth={1} />
                      </div>
                      <div className="border border-white/10 bg-black/40 backdrop-blur-sm px-3 py-2 relative">
                        <div className="absolute -top-px -left-px w-1 h-1 bg-white/20" />
                        <div className="absolute -bottom-px -right-px w-1 h-1 bg-white/20" />
                        <span className="text-[11px] text-gray-300 leading-snug">Real-time<br />Analytics</span>
                      </div>
                    </div>
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-white/15 to-transparent relative">
                      <Plus className="w-2.5 h-2.5 text-gray-600 absolute -top-[5px] right-0" strokeWidth={1} />
                    </div>
                  </div>

                  {/* [05] */}
                  <div className="flex items-end gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] text-gray-500 font-mono">[05]</span>
                        <Plus className="w-2 h-2 text-gray-600" strokeWidth={1} />
                      </div>
                      <div className="border border-white/10 bg-black/40 backdrop-blur-sm px-3 py-2 relative">
                        <div className="absolute -top-px -left-px w-1 h-1 bg-white/20" />
                        <div className="absolute -bottom-px -right-px w-1 h-1 bg-white/20" />
                        <span className="text-[11px] text-gray-300 leading-snug">Scalable<br />Architecture</span>
                      </div>
                    </div>
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-white/15 to-transparent relative">
                      <Plus className="w-2.5 h-2.5 text-gray-600 absolute -top-[5px] right-0" strokeWidth={1} />
                    </div>
                  </div>
                </div>

                {/* CENTER: Product Image */}
                <div className="relative w-[320px] h-[220px] md:w-[580px] md:h-[380px] z-10 mx-[210px]">
                  <Image
                    src="/images/edgebox.png"
                    alt="Kairos AI Edge Box"
                    fill
                    className="object-contain object-bottom drop-shadow-[0_-10px_80px_rgba(59,130,246,0.08)]"
                    priority
                  />
                </div>

                {/* RIGHT callouts column */}
                <div className="hidden md:flex flex-col justify-between absolute right-0 top-0 bottom-0 w-[200px] py-6 z-20">
                  {/* [02] */}
                  <div className="flex items-start gap-2 flex-row-reverse">
                    <div>
                      <div className="flex items-center justify-end gap-2 mb-1">
                        <Plus className="w-2 h-2 text-gray-600" strokeWidth={1} />
                        <span className="text-[9px] text-gray-500 font-mono">[02]</span>
                      </div>
                      <div className="border border-white/10 bg-black/40 backdrop-blur-sm px-3 py-2 relative text-right">
                        <div className="absolute -top-px -right-px w-1 h-1 bg-white/20" />
                        <div className="absolute -bottom-px -left-px w-1 h-1 bg-white/20" />
                        <span className="text-[11px] text-gray-300 leading-snug">Enterprise Grade<br />Security</span>
                      </div>
                    </div>
                    <div className="flex-1 mt-[26px] h-[1px] bg-gradient-to-l from-white/15 to-transparent relative">
                      <Plus className="w-2.5 h-2.5 text-gray-600 absolute -top-[5px] left-0" strokeWidth={1} />
                    </div>
                  </div>

                  {/* [04] */}
                  <div className="flex items-center gap-2 flex-row-reverse">
                    <div>
                      <div className="flex items-center justify-end gap-2 mb-1">
                        <Plus className="w-2 h-2 text-gray-600" strokeWidth={1} />
                        <span className="text-[9px] text-gray-500 font-mono">[04]</span>
                      </div>
                      <div className="border border-white/10 bg-black/40 backdrop-blur-sm px-3 py-2 relative text-right">
                        <div className="absolute -top-px -right-px w-1 h-1 bg-white/20" />
                        <div className="absolute -bottom-px -left-px w-1 h-1 bg-white/20" />
                        <span className="text-[11px] text-gray-300 leading-snug">Seamless<br />Integration</span>
                      </div>
                    </div>
                    <div className="flex-1 h-[1px] bg-gradient-to-l from-white/15 to-transparent relative">
                      <Plus className="w-2.5 h-2.5 text-gray-600 absolute -top-[5px] left-0" strokeWidth={1} />
                    </div>
                  </div>

                  {/* [06] */}
                  <div className="flex items-end gap-2 flex-row-reverse">
                    <div>
                      <div className="flex items-center justify-end gap-2 mb-1">
                        <Plus className="w-2 h-2 text-gray-600" strokeWidth={1} />
                        <span className="text-[9px] text-gray-500 font-mono">[06]</span>
                      </div>
                      <div className="border border-white/10 bg-black/40 backdrop-blur-sm px-3 py-2 relative text-right">
                        <div className="absolute -top-px -right-px w-1 h-1 bg-white/20" />
                        <div className="absolute -bottom-px -left-px w-1 h-1 bg-white/20" />
                        <span className="text-[11px] text-gray-300 leading-snug">Privacy by<br />Design</span>
                      </div>
                    </div>
                    <div className="flex-1 h-[1px] bg-gradient-to-l from-white/15 to-transparent relative">
                      <Plus className="w-2.5 h-2.5 text-gray-600 absolute -top-[5px] left-0" strokeWidth={1} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom footer strip */}
            <div className="relative z-10 flex items-center justify-center gap-8 py-5 border-t border-white/[0.04] w-full mt-2">
              <span className="text-[9px] font-bold tracking-[0.35em] text-gray-600 uppercase">Precision.</span>
              <span className="w-1 h-1 rounded-full bg-gray-700" />
              <span className="text-[9px] font-bold tracking-[0.35em] text-gray-600 uppercase">Privacy.</span>
              <span className="w-1 h-1 rounded-full bg-gray-700" />
              <span className="text-[9px] font-bold tracking-[0.35em] text-gray-600 uppercase">Prevention.</span>
            </div>
          </div>
        </section>

        {/* BLACK BACKGROUND WRAPPER FOR ALL BOTTOM SECTIONS */}
        <div className="bg-[#141414] w-full pt-20 pb-12 flex flex-col gap-12 md:gap-16 relative z-20">

          {/* PROMO CARDS SECTION */}
          <section className="px-4 md:px-6 mx-2 md:mx-4">
            <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">

              {/* Early Access Card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative rounded-[2rem] overflow-hidden group h-[520px] md:h-[580px] bg-[#0a0a0a] cursor-pointer"
                style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.06)' }}
              >
                <Image
                  src="/images/edgebox.png"
                  alt="Kairos AI Edge Box – Early Access"
                  fill
                  className="object-contain object-[center_25%] group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                  style={{ opacity: 0.9 }}
                />
                {/* Deep gradient from bottom */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, #000 0%, rgba(0,0,0,0.82) 28%, rgba(0,0,0,0.15) 60%, transparent 100%)' }}
                />
                {/* Left vignette */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.25) 0%, transparent 55%)' }}
                />

                <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full z-10">
                  <span className="block text-[10px] font-bold tracking-[0.4em] uppercase mb-4"
                    style={{ color: 'rgba(255,255,255,0.45)' }}>
                    New
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight tracking-tight">
                    Early Access
                  </h3>
                  <p className="text-[14px] leading-relaxed mb-7 max-w-[360px]"
                    style={{ color: 'rgba(255,255,255,0.55)' }}>
                    Get your hands on the Kairos AI edge box before anyone else. Limited spots available.
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      className="px-6 py-2.5 rounded-full text-white text-[13px] font-semibold transition-all duration-200 hover:brightness-110 active:scale-95"
                      style={{
                        background: 'linear-gradient(135deg, #00A3FF, #0082cc)',
                        boxShadow: '0 4px 20px rgba(0,163,255,0.35), 0 0 0 1px rgba(255,255,255,0.08) inset'
                      }}>
                      Pre-order now
                    </button>
                    <button
                      className="px-6 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-200 hover:bg-white/15 active:scale-95"
                      style={{
                        background: 'rgba(255,255,255,0.07)',
                        border: '1px solid rgba(255,255,255,0.14)',
                        color: 'rgba(255,255,255,0.85)',
                        backdropFilter: 'blur(12px)',
                      }}>
                      Learn more
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Become a Vendor Card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                className="relative rounded-[2rem] overflow-hidden group h-[520px] md:h-[580px] bg-[#0a0a0a] cursor-pointer"
                style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.06)' }}
              >
                <Image
                  src="/images/home.jpeg"
                  alt="Become a Vendor"
                  fill
                  className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                  style={{ opacity: 0.85 }}
                />
                {/* Deep gradient from bottom */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, #000 0%, rgba(0,0,0,0.82) 28%, rgba(0,0,0,0.15) 60%, transparent 100%)' }}
                />
                {/* Left vignette */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.25) 0%, transparent 55%)' }}
                />

                <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full z-10">
                  <span className="block text-[10px] font-bold tracking-[0.4em] uppercase mb-4"
                    style={{ color: 'rgba(255,255,255,0.45)' }}>
                    Partner
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight tracking-tight">
                    Become a Vendor
                  </h3>
                  <p className="text-[14px] leading-relaxed mb-7 max-w-[360px]"
                    style={{ color: 'rgba(255,255,255,0.55)' }}>
                    Partner with KavachX to distribute state-of-the-art security solutions and grow your business.
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <Link href="/vendor">
                      <button
                        // onClick={() => router.push("/vendor")}
                        className="px-6 py-2.5 rounded-full text-white text-[13px] font-semibold transition-all duration-200 hover:brightness-110 active:scale-95"
                        style={{
                        background: 'linear-gradient(135deg, #00A3FF, #0082cc)',
                        boxShadow: '0 4px 20px rgba(0,163,255,0.35), 0 0 0 1px rgba(255,255,255,0.08) inset'
                      }}>
                      Join now
                    </button>
                    </Link>
                    <button
                      className="px-6 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-200 hover:bg-white/15 active:scale-95"
                      style={{
                        background: 'rgba(255,255,255,0.07)',
                        border: '1px solid rgba(255,255,255,0.14)',
                        color: 'rgba(255,255,255,0.85)',
                        backdropFilter: 'blur(12px)',
                      }}>
                      Learn more
                    </button>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

          {/* LAUNCHING SOON SECTION */}
          <section className="py-24 md:py-32 px-6 bg-white relative overflow-hidden flex flex-col items-center justify-center text-center rounded-[3rem] mx-2 md:mx-4 shadow-[0_8px_40px_rgba(0,0,0,0.03)] border border-black/[0.03]">

            {/* Concentric Circles Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-black/[0.04] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-black/[0.04] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full border border-black/[0.04] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1500px] h-[1500px] rounded-full border border-black/[0.04] pointer-events-none" />

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-medium tracking-tight text-[#111] mb-6 z-10 font-syne leading-tight"
            >
              KAIROS- AI edge box <br />
              Launching <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-slate-700">Very Soon</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gray-500 max-w-2xl text-lg font-medium leading-relaxed mb-10 z-10"
            >
              The next generation of intelligent edge security is almost here. Prepare to secure your space with advanced AI detection, all processed locally in milliseconds.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center gap-4 z-10"
            >
              <button className="px-8 py-3.5 rounded-full bg-black text-white text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-gray-900 transition-colors shadow-lg">
                Join The Waitlist
              </button>
              <button className="px-8 py-3.5 rounded-full bg-white text-black border border-black/10 text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-gray-50 transition-colors shadow-sm">
                Get Notified
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="relative w-full max-w-6xl mx-auto h-[400px] md:h-[500px] lg:h-[600px] group z-10 mt-8 cursor-crosshair"
            >
              <div className="absolute inset-0 lg:inset-x-48 xl:inset-x-64">
                <Image
                  src="/images/edgebox.png"
                  alt="Kairos Edge Box"
                  fill
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] scale-110 md:scale-100 transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* 1. Fire Detection (Top Left) */}
              <div className="absolute top-[10%] left-0 xl:left-8 w-[240px] xl:w-[260px] hidden lg:flex flex-row-reverse items-start gap-4 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out delay-[50ms] -translate-x-4 group-hover:translate-x-0 text-right z-20">
                <div className="absolute top-7 left-[calc(100%-1.75rem)] w-[80px] xl:w-[120px] h-px bg-gray-300 -z-10" />
                <div className="absolute top-[1.6rem] left-[calc(100%-1.75rem+80px)] xl:left-[calc(100%-1.75rem+120px)] w-1.5 h-1.5 rounded-full bg-gray-400" />

                <div className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center justify-center shrink-0 z-10 border border-white relative">
                  <Flame className="w-6 h-6 text-[#111]" strokeWidth={1.5} />
                </div>
                <div className="py-2.5 px-3 z-10 bg-white/50 backdrop-blur-xl border border-white/60 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] group-hover:scale-105 transition-transform duration-700 ease-out origin-right">
                  <h5 className="text-[11.5px] font-bold text-[#111] uppercase tracking-wider mb-1">Fire Detection</h5>
                  <p className="text-[10.5px] text-gray-600 leading-relaxed font-medium">Detects smoke and fire incidents in real time.</p>
                </div>
              </div>

              {/* 2. Intrusion Detection (Middle Left) */}
              <div className="absolute top-[45%] left-0 xl:left-8 w-[240px] xl:w-[260px] hidden lg:flex flex-row-reverse items-start gap-4 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out delay-[100ms] -translate-x-4 group-hover:translate-x-0 text-right z-20">
                <div className="absolute top-7 left-[calc(100%-1.75rem)] w-[60px] xl:w-[100px] h-px bg-gray-300 -z-10" />
                <div className="absolute top-[1.6rem] left-[calc(100%-1.75rem+60px)] xl:left-[calc(100%-1.75rem+100px)] w-1.5 h-1.5 rounded-full bg-gray-400" />

                <div className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center justify-center shrink-0 z-10 border border-white relative">
                  <UserX className="w-6 h-6 text-[#111]" strokeWidth={1.5} />
                </div>
                <div className="py-2.5 px-3 z-10 bg-white/50 backdrop-blur-xl border border-white/60 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] group-hover:scale-105 transition-transform duration-700 ease-out origin-right">
                  <h5 className="text-[11.5px] font-bold text-[#111] uppercase tracking-wider mb-1">Intrusion Detection</h5>
                  <p className="text-[10.5px] text-gray-600 leading-relaxed font-medium">Identifies unauthorized access and potential intrusions.</p>
                </div>
              </div>

              {/* 3. Fall Detection (Bottom Left) */}
              <div className="absolute bottom-[10%] left-0 xl:left-8 w-[240px] xl:w-[260px] hidden lg:flex flex-row-reverse items-start gap-4 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out delay-[150ms] -translate-x-4 group-hover:translate-x-0 text-right z-20">
                <div className="absolute top-7 left-[calc(100%-1.75rem)] w-[80px] xl:w-[120px] h-px bg-gray-300 -z-10" />
                <div className="absolute top-[1.6rem] left-[calc(100%-1.75rem+80px)] xl:left-[calc(100%-1.75rem+120px)] w-1.5 h-1.5 rounded-full bg-gray-400" />

                <div className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center justify-center shrink-0 z-10 border border-white relative">
                  <Activity className="w-6 h-6 text-[#111]" strokeWidth={1.5} />
                </div>
                <div className="py-2.5 px-3 z-10 bg-white/50 backdrop-blur-xl border border-white/60 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] group-hover:scale-105 transition-transform duration-700 ease-out origin-right">
                  <h5 className="text-[11.5px] font-bold text-[#111] uppercase tracking-wider mb-1">Fall Detection</h5>
                  <p className="text-[10.5px] text-gray-600 leading-relaxed font-medium">Detects falls instantly and alerts for quick response.</p>
                </div>
              </div>

              {/* 4. Weapon Detection (Top Right) */}
              <div className="absolute top-[10%] right-0 xl:right-8 w-[240px] xl:w-[260px] hidden lg:flex items-start gap-4 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out delay-[50ms] translate-x-4 group-hover:translate-x-0 text-left z-20">
                <div className="absolute top-7 right-[calc(100%-1.75rem)] w-[80px] xl:w-[120px] h-px bg-gray-300 -z-10" />
                <div className="absolute top-[1.6rem] right-[calc(100%-1.75rem+80px)] xl:right-[calc(100%-1.75rem+120px)] w-1.5 h-1.5 rounded-full bg-gray-400" />

                <div className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center justify-center shrink-0 z-10 border border-white relative">
                  <Target className="w-6 h-6 text-[#111]" strokeWidth={1.5} />
                </div>
                <div className="py-2.5 px-3 z-10 bg-white/50 backdrop-blur-xl border border-white/60 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] group-hover:scale-105 transition-transform duration-700 ease-out origin-left">
                  <h5 className="text-[11.5px] font-bold text-[#111] uppercase tracking-wider mb-1">Weapon Detection</h5>
                  <p className="text-[10.5px] text-gray-600 leading-relaxed font-medium">Identifies weapons and dangerous objects in real time.</p>
                </div>
              </div>

              {/* 5. Crowd Detection (Middle Right) */}
              <div className="absolute top-[45%] right-0 xl:right-8 w-[240px] xl:w-[260px] hidden lg:flex items-start gap-4 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out delay-[100ms] translate-x-4 group-hover:translate-x-0 text-left z-20">
                <div className="absolute top-7 right-[calc(100%-1.75rem)] w-[60px] xl:w-[100px] h-px bg-gray-300 -z-10" />
                <div className="absolute top-[1.6rem] right-[calc(100%-1.75rem+60px)] xl:right-[calc(100%-1.75rem+100px)] w-1.5 h-1.5 rounded-full bg-gray-400" />

                <div className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center justify-center shrink-0 z-10 border border-white relative">
                  <Users className="w-6 h-6 text-[#111]" strokeWidth={1.5} />
                </div>
                <div className="py-2.5 px-3 z-10 bg-white/50 backdrop-blur-xl border border-white/60 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] group-hover:scale-105 transition-transform duration-700 ease-out origin-left">
                  <h5 className="text-[11.5px] font-bold text-[#111] uppercase tracking-wider mb-1">Crowd Detection</h5>
                  <p className="text-[10.5px] text-gray-600 leading-relaxed font-medium">Monitors crowd density and alerts on unusual gatherings.</p>
                </div>
              </div>

              {/* 6. Loitering Detection (Bottom Right) */}
              <div className="absolute bottom-[10%] right-0 xl:right-8 w-[240px] xl:w-[260px] hidden lg:flex items-start gap-4 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out delay-[150ms] translate-x-4 group-hover:translate-x-0 text-left z-20">
                <div className="absolute top-7 right-[calc(100%-1.75rem)] w-[80px] xl:w-[120px] h-px bg-gray-300 -z-10" />
                <div className="absolute top-[1.6rem] right-[calc(100%-1.75rem+80px)] xl:right-[calc(100%-1.75rem+120px)] w-1.5 h-1.5 rounded-full bg-gray-400" />

                <div className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center justify-center shrink-0 z-10 border border-white relative">
                  <Clock className="w-6 h-6 text-[#111]" strokeWidth={1.5} />
                </div>
                <div className="py-2.5 px-3 z-10 bg-white/50 backdrop-blur-xl border border-white/60 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] group-hover:scale-105 transition-transform duration-700 ease-out origin-left">
                  <h5 className="text-[11.5px] font-bold text-[#111] uppercase tracking-wider mb-1">Loitering Detection</h5>
                  <p className="text-[10.5px] text-gray-600 leading-relaxed font-medium">Detects suspicious loitering behavior in restricted areas.</p>
                </div>
              </div>

            </motion.div>
          </section>

          {/* FINAL CTA */}
          <section className="py-24 md:py-32 px-6 relative overflow-hidden bg-[#111] rounded-[3rem] mx-2 md:mx-4 border border-white/5 shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
            <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.05] mix-blend-overlay" />

            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-6xl font-bold font-syne mb-6 text-white tracking-tighter">Don't wait for an emergency.</h2>
              <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-medium">
                Upgrade your security today. Get KAIROS- AI edge box and experience the peace of mind that comes with 3-second response times.
              </p>
              <Link href="/contact" className="inline-block bg-white text-black px-6 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                Pre-order KAIROS Today
              </Link>
            </div>
          </section>
        </div>
      </div>
    </LenisDiv>
  );
}
