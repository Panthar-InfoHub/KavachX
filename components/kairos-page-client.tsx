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
  ArrowRight
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
    title: "Fire & Smoke Alert",
    description: "Early-warning detection spots fire and smoke instantly, potentially saving lives and minimizing property damage.",
    icon: Flame,
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
    image: "/images/sector-industrial.jpg"
  },
  {
    id: "business",
    label: "Business Owners",
    icon: Briefcase,
    headline: "Security that never sleeps.",
    body: "Keep your offices and corporate spaces secure 24/7. Detect distress gestures from employees working late and prevent unauthorized access with instant alerts delivered straight to your management team.",
    cta: "Secure Your Business",
    image: "/images/sector-business.jpg"
  },
  {
    id: "vendor",
    label: "Local Vendors",
    icon: Store,
    headline: "Keep your livelihood safe.",
    body: "Prevent theft and ensure the safety of your storefront. Kairos alerts you immediately if suspicious activity or a fire is detected after hours, so you can act before damage is done.",
    cta: "Protect Your Shop",
    image: "/images/sector-vendors.jpg"
  },
  {
    id: "home",
    label: "Homeowners",
    icon: Home,
    headline: "Peace of mind for your loved ones.",
    body: "Whether you're at work or on vacation, Kairos keeps a watchful eye on your home. Instantly detect break-ins, distress gestures, or smoke, ensuring your family is always protected.",
    cta: "Secure Your Home",
    image: "/images/sector-home.jpg"
  }
];

export default function KairosPageClient() {
  const [activeAudience, setActiveAudience] = useState(audiences[0]);
  const heroRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <LenisDiv>
      <div className="bg-white text-black font-sans overflow-x-hidden selection:bg-black selection:text-white">
        {/* HERO SECTION */}
        <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-start pt-32 px-6 overflow-hidden">
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

          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center mt-12 mb-16"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6 leading-tight font-syne text-black"
            >
              KAIROS- AI edge box<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-500">Empowering Your Security</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 max-w-3xl mb-12 leading-relaxed font-medium"
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
          </motion.div>

          {/* Product Image Stage */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="relative w-full max-w-4xl mx-auto pointer-events-none z-20 mt-auto"
          >
            <div className="relative w-full aspect-video">
              <Image
                src="/images/edgebox.png"
                alt="Kavach KAIROS- AI edge box"
                fill
                className="object-contain drop-shadow-[0_-10px_50px_rgba(0,0,0,0.1)]"
                priority
              />
            </div>
          </motion.div>
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {/* Top Row: First 3 features */}
              {features.slice(0, 3).map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="col-span-1 bg-white border border-black/[0.06] rounded-[2rem] p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="w-12 h-12 rounded-[18px] bg-black/[0.04] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-black group-hover:text-white transition-all duration-300">
                    <feature.icon className="w-5 h-5 text-black group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-black tracking-tight">{feature.title}</h3>
                  <p className="leading-relaxed text-[15px] font-medium text-black/60">{feature.description}</p>
                </motion.div>
              ))}

              {/* Bottom Row: 4th Featured Item (Full Width) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="col-span-1 md:col-span-3 bg-[#09090b] rounded-[2rem] p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 group"
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
                    {features[3].title}
                  </h3>
                  <p className="leading-relaxed text-lg font-medium text-white/60">
                    {features[3].description}
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
                      {(() => {
                        const Icon = features[3].icon;
                        return <Icon className="w-10 h-10 text-black" strokeWidth={1.5} />;
                      })()}
                    </div>
                  </div>
                </div>
              </motion.div>
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
                <Image src={audiences[0].image} alt={audiences[0].label} fill className="object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/60 pointer-events-none transition-opacity duration-500 group-hover:opacity-70" />
                <div className="relative z-10 p-8 flex flex-col justify-between h-full text-white">
                  <h3 className="text-3xl md:text-4xl font-medium leading-tight max-w-[200px]">{audiences[0].label}</h3>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm font-medium text-white/70">{audiences[0].cta}</span>
                    <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </div>
              </div>

              {/* Middle Column */}
              <div className="flex-1 flex flex-col gap-4">
                {/* Top: Business Owners */}
                <div className="flex-1 relative rounded-[32px] overflow-hidden group cursor-pointer bg-[#e5e5e5]">
                  <Image src={audiences[1].image} alt={audiences[1].label} fill className="object-cover opacity-40 mix-blend-multiply group-hover:scale-105 transition-all duration-700" />
                  <div className="relative z-10 p-8 flex flex-col justify-between h-full text-black">
                    <h3 className="text-2xl md:text-3xl font-medium leading-tight max-w-[180px]">{audiences[1].label}</h3>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-sm font-medium text-black/70">{audiences[1].cta}</span>
                      <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                  </div>
                </div>

                {/* Bottom: Local Vendors */}
                <div className="flex-1 relative rounded-[32px] overflow-hidden group cursor-pointer bg-[#1c1c1e]">
                  <div className="relative z-10 p-8 flex flex-col justify-between h-full text-white">
                    <h3 className="text-2xl md:text-3xl font-medium leading-tight max-w-[180px]">{audiences[2].label}</h3>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-sm font-medium text-white/70">{audiences[2].cta}</span>
                      <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Residential */}
              <div className="flex-1 relative rounded-[32px] overflow-hidden group cursor-pointer bg-black">
                <Image src={audiences[3].image} alt={audiences[3].label} fill className="object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/60 pointer-events-none transition-opacity duration-500 group-hover:opacity-70" />
                <div className="relative z-10 p-8 flex flex-col justify-between h-full text-white">
                  <h3 className="text-3xl md:text-4xl font-medium leading-tight max-w-[200px]">{audiences[3].label}</h3>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm font-medium text-white/70">{audiences[3].cta}</span>
                    <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST SECTION */}
        <section className="py-32 md:py-48 px-6 bg-white relative overflow-hidden rounded-[3rem] mx-2 md:mx-4 my-12 border border-black/[0.02] shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
          {/* Subtle Mesh Gradient Background */}
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-100/50 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-emerald-100/40 rounded-full blur-[140px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-32 items-center lg:items-start relative z-10">
            
            {/* Left: Sticky Headline */}
            <div className="lg:w-1/2 lg:sticky lg:top-40">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-black/5 text-black/80 text-[11px] font-bold tracking-[0.25em] uppercase mb-10 shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
                Enterprise Grade
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-[5rem] font-bold font-syne mb-8 tracking-tighter leading-[1.05]"
              >
                <span className="text-black">Built for Reliability.</span><br/>
                <span className="text-gray-400">Trusted by Thousands.</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.2 }}
                className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed max-w-lg"
              >
                Safety is too important to leave to chance. Kairos operates continuously, ensuring your data is private and your alerts are delivered when you need them most.
              </motion.p>
            </div>

            {/* Right: Feature Cards Unified Panel */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="lg:w-1/2 flex flex-col w-full bg-white/60 backdrop-blur-2xl border border-black/[0.04] rounded-[2.5rem] shadow-[0_20px_80px_rgba(0,0,0,0.03)] overflow-hidden relative"
            >
              {[
                { 
                  icon: Lock, 
                  title: "End-to-End Encryption", 
                  desc: "Your data stays yours. Military-grade encryption secures your feeds from the edge to your device.",
                  glowColor: "hover:bg-blue-50/40",
                  iconGlow: "text-blue-500 bg-blue-500/10 group-hover:bg-blue-500/20 border-blue-500/10"
                },
                { 
                  icon: CheckCircle2, 
                  title: "99.9% Uptime", 
                  desc: "Always online, always watching. Redundant failover systems ensure round-the-clock reliability.",
                  glowColor: "hover:bg-emerald-50/40",
                  iconGlow: "text-emerald-500 bg-emerald-500/10 group-hover:bg-emerald-500/20 border-emerald-500/10"
                },
                { 
                  icon: WifiOff, 
                  title: "Offline Capabilities", 
                  desc: "Local edge processing means critical threats are detected instantly, even if your internet goes down.",
                  glowColor: "hover:bg-orange-50/40",
                  iconGlow: "text-orange-500 bg-orange-500/10 group-hover:bg-orange-500/20 border-orange-500/10"
                }
              ].map((badge, i) => (
                <div 
                  key={i} 
                  className={`group flex flex-col sm:flex-row gap-8 items-start p-10 md:p-12 ${i !== 2 ? 'border-b border-black/[0.04]' : ''} ${badge.glowColor} transition-colors duration-500 cursor-pointer`}
                >
                  <div className={`relative w-16 h-16 rounded-[1.25rem] border flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-110 ${badge.iconGlow}`}>
                    <badge.icon className="w-7 h-7" strokeWidth={1.5} />
                  </div>
                  
                  <div className="relative pt-1">
                    <h4 className="text-[22px] font-bold mb-3 text-black tracking-tight">{badge.title}</h4>
                    <p className="text-gray-500 text-[16px] leading-[1.7]">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

          </div>
        </section>

        {/* FINAL CTA */}
        <div className="px-4 md:px-6 pb-12 md:pb-16 bg-white">
          <section className="py-24 md:py-32 px-6 relative overflow-hidden bg-black rounded-[3rem] shadow-2xl">
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
