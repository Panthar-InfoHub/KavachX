"use client";

import { motion } from "framer-motion";
import type { Easing } from "framer-motion";
import Image from "next/image";
import {
  Shield,
  BrainCircuit,
  Zap,
  Clock,
  CheckCircle2,
  Cpu,
  Lock,
  Activity,
  Building2,
  Factory,
  Warehouse,
  Store,
  GraduationCap,
  MoreHorizontal,
  Flame,
  UserX,
  PersonStanding,
  Crosshair,
  TimerReset,
  Users,
  Cctv,
  ShieldCheck,
  Check
} from "lucide-react";
import { KairosLogo } from "./kairos-logo";

const EASE: Easing = "easeOut";
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: EASE, delay },
});

// A simple wave for the Brand Hero card
function ParticleWave() {
  return (
    <svg viewBox="0 0 400 150" className="w-full h-full opacity-30" preserveAspectRatio="none">
      <path d="M0 100 Q 100 50, 200 100 T 400 100" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
      <path d="M0 120 Q 100 70, 200 120 T 400 120" fill="none" stroke="white" strokeWidth="0.5" />
    </svg>
  );
}

// Custom Target Graphic for AI Detection
function TargetGraphic() {
  return (
    <div className="relative w-full h-full flex items-center justify-center opacity-60 pointer-events-none">
      {/* Concentric Circles */}
      <div className="absolute inset-0 border border-black/5 rounded-full animate-[ping_3s_linear_infinite]" />
      <div className="absolute inset-[15%] border border-black/5 rounded-full" />
      <div className="absolute inset-[30%] border border-black/10 rounded-full" />
      {/* Crosshairs */}
      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-black/10 -translate-x-1/2" />
      <div className="absolute left-0 right-0 top-1/2 h-px bg-black/10 -translate-y-1/2" />
      {/* Center Dot */}
      <div className="absolute w-[30%] h-[30%] bg-[#09090b] rounded-full flex items-center justify-center shadow-xl">
        <span className="text-white font-bold tracking-wider text-[12px]">AI</span>
      </div>
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black/40" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black/40" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black/40" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black/40" />
    </div>
  );
}

export function KairosBentoGrid() {
  return (
    <section className="w-full bg-[#F8F9FA] rounded-t-[3rem] py-24 md:py-32 px-4 sm:px-6 lg:px-8 font-syne relative overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.05)] z-20">
      <div className="max-w-[1100px] mx-auto relative z-10 px-4 md:px-8">

        {/* Minimalist Intro Text */}
        <div className="flex flex-col items-center text-center mb-24 relative z-10 pt-8">
          {/* Subtle Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 border border-slate-200 bg-white px-4 py-1.5 rounded-full text-slate-500 text-xs font-bold tracking-widest uppercase mb-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
          >
            Core Technology
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-5xl md:text-[5.5rem] lg:text-[6.5rem] font-bold tracking-tighter mb-8 leading-[1.05] text-slate-900"
          >
            Powerful Features <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-black to-slate-400">at the Edge.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-600 text-lg md:text-xl font-medium max-w-2xl leading-relaxed"
          >
            Discover what makes KAIROS the ultimate intelligent security solution. Built for maximum speed, privacy, and absolute reliability.
          </motion.p>
        </div>

        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-12 auto-rows-auto">

          {/* ==================== ROW 1 ==================== */}

          {/* 1. Brand Hero */}
          <motion.div
            {...fadeUp(0.02)}
            className="col-span-1 md:col-span-2 lg:col-span-4 lg:row-span-2 bg-slate-950 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-white/5 p-8 flex flex-col justify-between relative overflow-hidden min-h-[400px]"
          >
            <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-0">
              <ParticleWave />
            </div>

            <div className="relative z-10">
              <KairosLogo inverted showTagline={false} className="w-64 mb-6" />
              <h2 className="text-white text-4xl leading-tight font-semibold mb-6">
                Secure today,<br />safe tomorrow.
              </h2>
              <div className="w-8 h-px bg-white/20 mb-6" />
              <p className="text-white/60 text-sm leading-relaxed max-w-[240px]">
                AI-powered security for a smarter, safer tomorrow.
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 mt-auto pt-8">
              {[
                { icon: Shield, text: "Enterprise\nGrade Security" },
                { icon: BrainCircuit, text: "AI-Powered\nIntelligence" },
                { icon: Zap, text: "Real-Time\nProtection" },
                { icon: Clock, text: "Always On,\nAlways Protecting" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-white/80" strokeWidth={1.5} />
                  </div>
                  <span className="text-white/50 text-[10px] leading-tight whitespace-pre-line">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 2. Main Product */}
          <motion.div
            {...fadeUp(0.04)}
            className="col-span-1 md:col-span-2 lg:col-span-5 lg:row-span-2 bg-white rounded-[2.5rem] border border-slate-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] pt-8 px-8 flex flex-col relative overflow-hidden min-h-[400px]"
          >
            <div className="relative z-20 mb-4">
              <h3 className="text-3xl font-bold text-black mb-2">The Kairos Edge AI Box</h3>
              <p className="text-black/60 text-sm">Powerful AI. Compact form. Maximum protection.</p>
            </div>

            {/* Middle Empty Section Filler */}
            <div className="flex-1 relative w-full flex items-center justify-center min-h-[120px] pointer-events-none mt-2 mb-4">
               {/* Aesthetic concentric lines */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] md:w-[280px] md:h-[280px] border border-black/[0.03] rounded-full" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] md:w-[200px] md:h-[200px] border border-black/[0.05] rounded-full" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] md:w-[120px] md:h-[120px] border border-black/[0.08] rounded-full bg-black/[0.01]" />
               
               {/* Tech Badges */}
               <motion.div 
                 initial={{ y: 10, opacity: 0 }}
                 whileInView={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.3, duration: 0.5 }}
                 className="absolute top-[15%] left-[5%] md:left-[10%] bg-white border border-black/[0.06] px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.05)] z-20"
               >
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-[pulse_2s_ease-in-out_infinite]" />
                 <span className="text-[9px] font-bold tracking-widest uppercase text-black/80">Edge NPU</span>
               </motion.div>
               
               <motion.div 
                 initial={{ y: -10, opacity: 0 }}
                 whileInView={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.4, duration: 0.5 }}
                 className="absolute bottom-[10%] right-[0%] md:right-[5%] bg-white border border-black/[0.06] px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.05)] z-20"
               >
                 <Cpu className="w-3 h-3 text-black/60" />
                 <span className="text-[9px] font-bold tracking-widest uppercase text-black/80">Local Compute</span>
               </motion.div>
            </div>
            
            <div className="relative w-full h-[180px] md:h-full min-h-[160px] md:min-h-[200px] mt-auto">
              <Image
                src="/images/edgebox.png"
                alt="Kairos Edge AI Box"
                fill
                className="object-contain object-bottom drop-shadow-2xl scale-110 origin-bottom relative z-10"
              />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-8 bg-black/10 blur-xl rounded-full z-0" />
            </div>
          </motion.div>

          {/* 3. AI Detection */}
          <motion.div
            {...fadeUp(0.06)}
            className="col-span-1 lg:col-span-3 bg-white rounded-[2.5rem] border border-slate-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] pt-8 px-8 flex flex-col relative overflow-hidden min-h-[220px]"
          >
            <div className="absolute top-6 right-6 flex items-center gap-2 z-20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[8px] tracking-widest text-black/50 font-bold uppercase">KAIROS</span>
            </div>

            <div className="relative z-20 mb-4">
              <h4 className="font-bold text-lg text-black mb-3 leading-tight">AI-Powered<br />Detection</h4>
              <p className="text-black/60 text-[11px] leading-relaxed max-w-[150px]">
                Detects threats in real time with advanced AI models running on the edge.
              </p>
            </div>
            
            <div className="relative w-full h-[110px] mt-auto flex items-end justify-end -mr-6 -mb-4 overflow-hidden">
               <div className="relative w-[160px] h-[160px]">
                 <TargetGraphic />
               </div>
            </div>
          </motion.div>

          {/* 4. Real-Time Alerts */}
          <motion.div
            {...fadeUp(0.08)}
            className="col-span-1 lg:col-span-3 bg-slate-950 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-white/5 pt-8 px-8 flex flex-col relative overflow-hidden min-h-[220px]"
          >
            <div className="relative z-10 mb-6">
              <h4 className="font-bold text-lg text-white mb-3 leading-tight">Real-Time<br />Alerts</h4>
              <p className="text-white/60 text-[11px] leading-relaxed max-w-[150px]">
                Instant notifications for critical events.
              </p>
            </div>
            {/* Mock UI */}
            <div className="w-[120%] -ml-[10%] bg-black border border-white/10 rounded-t-3xl p-4 flex flex-col gap-2 mt-auto relative z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
              <div className="flex justify-between items-center mb-1 px-1">
                <div className="w-4 h-4 rounded-full bg-white/10" />
                <span className="text-[8px] tracking-widest text-white/50">KAIROS</span>
              </div>
              {[
                { icon: Flame, title: "Fire Detected", sub: "Warehouse 1", time: "10:24 AM", color: "text-red-500" },
                { icon: UserX, title: "Intrusion Detected", sub: "Gate Entrance", time: "10:24 AM", color: "text-orange-500" },
              ].map((alert, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
                  <alert.icon className={`w-3 h-3 ${alert.color}`} />
                  <div className="flex-1">
                    <p className="text-[8px] text-white font-medium">{alert.title}</p>
                    <p className="text-[7px] text-white/40">{alert.sub}</p>
                  </div>
                  <span className="text-[7px] text-white/30">{alert.time}</span>
                </div>
              ))}
            </div>
          </motion.div>


          {/* ==================== ROW 2 ==================== */}

          {/* 5. Existing Cameras */}
          <motion.div
            {...fadeUp(0.1)}
            className="col-span-1 md:col-span-2 lg:col-span-3 bg-white rounded-[2.5rem] border border-slate-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 flex flex-col min-h-[220px] justify-between"
          >
            <div className="flex flex-col gap-3">
              <Cctv className="w-6 h-6 text-black/80" />
              <h4 className="font-bold text-[16px] leading-tight text-black">Works with Your<br />Existing Cameras</h4>
            </div>
            <div>
              <p className="text-black/60 text-[12px] leading-relaxed mb-2">
                Seamlessly integrates with your current IP cameras.
              </p>
              <p className="text-black/60 text-[12px] leading-relaxed">
                No new cameras required.
              </p>
            </div>
          </motion.div>

          {/* 6. Detection Capabilities */}
          <motion.div
            {...fadeUp(0.12)}
            className="col-span-1 md:col-span-2 lg:col-span-3 bg-white rounded-[2.5rem] border border-slate-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 flex flex-col min-h-[220px]"
          >
            <div className="flex flex-col gap-3 mb-4">
              <BrainCircuit className="w-6 h-6 text-black/80" />
              <h4 className="font-bold text-[16px] leading-tight text-black">AI Detection<br />Capabilities</h4>
            </div>
            <div className="grid grid-cols-2 gap-x-1 gap-y-2.5">
              {[
                "Fire Detection", "Intrusion", "Falls",
                "Weapons", "Loitering", "Crowds"
              ].map((cap, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500/70 shrink-0" />
                  <span className="text-[10px] text-black/70 font-medium">{cap}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 7. Edge AI Processing */}
          <motion.div {...fadeUp(0.14)} className="col-span-1 md:col-span-2 lg:col-span-3 bg-white rounded-[2.5rem] border border-slate-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 flex flex-col min-h-[220px] relative overflow-hidden justify-between">
            <div className="absolute bottom-[-20px] right-[-20px] w-32 h-32 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_0%,transparent_70%)] pointer-events-none z-0" />
            <div className="relative z-10 flex flex-col gap-3">
              <div className="w-10 h-10 rounded-full bg-[#f4f4f5] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-black" />
              </div>
              <h4 className="font-bold text-[16px] leading-tight text-black">Edge AI<br />Processing</h4>
            </div>
            <p className="text-black/60 text-[12px] leading-relaxed relative z-10">
              All processing happens on the device itself. Your data stays private and secure.
            </p>
          </motion.div>

          {/* 8. Privacy by Design */}
          <motion.div {...fadeUp(0.16)} className="col-span-1 md:col-span-2 lg:col-span-3 bg-white rounded-[2.5rem] border border-slate-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 flex flex-col min-h-[220px] justify-between">
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-full bg-[#f4f4f5] flex items-center justify-center">
                <Lock className="w-5 h-5 text-black" />
              </div>
              <h4 className="font-bold text-[16px] leading-tight text-black">Privacy by<br />Design</h4>
            </div>
            <p className="text-black/60 text-[12px] leading-relaxed">
              No video leaves your premises. No cloud dependency. Complete data privacy.
            </p>
          </motion.div>


          {/* ==================== ROW 3 ==================== */}

          {/* 9. 24/7 Monitoring */}
          <motion.div {...fadeUp(0.18)} className="col-span-1 md:col-span-2 lg:col-span-3 bg-white rounded-[2.5rem] border border-slate-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 flex flex-col min-h-[240px] justify-between">
            <div className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-full bg-[#f4f4f5] flex items-center justify-center">
                <Clock className="w-5 h-5 text-black" />
              </div>
              <h4 className="font-bold text-[16px] leading-tight text-black">24/7<br />Monitoring</h4>
            </div>
            <p className="text-black/60 text-[12px] leading-relaxed">
              Always on. Always vigilant. Built for uninterrupted protection.
            </p>
          </motion.div>

          {/* 10. Plug & Protect */}
          <motion.div
            {...fadeUp(0.20)}
            className="col-span-1 md:col-span-2 lg:col-span-5 bg-slate-950 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-white/5 pt-6 px-6 flex flex-col relative overflow-hidden min-h-[240px]"
          >
            <div className="relative z-20 flex flex-col mb-4">
              <h4 className="font-bold text-[20px] text-white mb-1 leading-tight">Plug & Protect</h4>
              <p className="text-white/50 text-[12px] mb-4">Simple to set up. Hard to stop.</p>
              <div className="flex flex-wrap gap-3">
                {["Plug in Power", "Connect to Network", "Start Protecting"].map((step, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-[11px] text-white/90 font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative w-full h-[100px] mt-auto pb-4">
              <Image
                src="/images/edgebox.png"
                alt="Edgebox top view"
                fill
                className="object-contain object-bottom scale-100 origin-bottom"
              />
            </div>
          </motion.div>

          {/* 11. Environments */}
          <motion.div
            {...fadeUp(0.22)}
            className="col-span-1 lg:col-span-4 bg-slate-950 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-white/5 p-6 flex flex-col min-h-[240px] relative overflow-hidden"
          >
            <div className="relative z-10 flex flex-col mb-4">
              <h4 className="font-bold text-[16px] text-white mb-1">Built for Every Environment</h4>
              <p className="text-white/50 text-[11px] max-w-[220px]">Adaptable AI that seamlessly integrates into any architectural space.</p>
            </div>

            {/* Ambient Background Graphic */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_50%)] pointer-events-none z-0" />

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-3 w-full mt-auto relative z-10">
              {[
                { icon: Building2, label: "Offices" },
                { icon: Factory, label: "Factories" },
                { icon: Warehouse, label: "Warehouses" },
                { icon: Store, label: "Retail" },
                { icon: GraduationCap, label: "Campuses" },
                { icon: MoreHorizontal, label: "And more" },
              ].map((env, i) => (
                <div key={i} className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-[14px] bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.08] transition-colors cursor-default">
                  <env.icon className="w-4 h-4 text-white/70" strokeWidth={1.5} />
                  <span className="text-[9px] text-white/70 font-medium text-center">{env.label}</span>
                </div>
              ))}
            </div>
          </motion.div>


          {/* ==================== ROW 4 ==================== */}

          {/* 12. Dimensions */}
          <motion.div
            {...fadeUp(0.24)}
            className="col-span-1 lg:col-span-5 bg-white rounded-[2.5rem] border border-slate-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] pt-6 px-6 flex flex-col relative overflow-hidden min-h-[240px]"
          >
            <div className="relative z-20 flex flex-col mb-4">
              <h4 className="font-bold text-[16px] text-black leading-tight mb-3">
                Compact. Powerful. Uncompromising.
              </h4>
              <div className="grid grid-cols-3 gap-x-4 gap-y-3">
                <div>
                  <p className="text-[10px] text-black/40 uppercase font-bold tracking-wider mb-1">Dimensions</p>
                  <p className="text-[12px] text-black font-semibold">120 x 45 mm</p>
                </div>
                <div>
                  <p className="text-[10px] text-black/40 uppercase font-bold tracking-wider mb-1">Weight</p>
                  <p className="text-[12px] text-black font-semibold">335 gms</p>
                </div>
                <div>
                  <p className="text-[10px] text-black/40 uppercase font-bold tracking-wider mb-1">Build</p>
                  <p className="text-[12px] text-black font-semibold">Premium Aluminum</p>
                </div>
              </div>
            </div>
            
            <div className="relative w-full h-[120px] mt-auto">
              <Image
                src="/images/edgebox.png"
                alt="Edgebox side"
                fill
                className="object-contain object-bottom scale-[1.2] origin-bottom"
              />
            </div>
          </motion.div>

          {/* 13. Future-Ready */}
          <motion.div
            {...fadeUp(0.26)}
            className="col-span-1 md:col-span-2 lg:col-span-3 bg-slate-950 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-white/5 pt-6 px-6 flex flex-col relative overflow-hidden min-h-[240px]"
          >
            <div className="relative z-10 mb-4">
              <h4 className="font-bold text-[16px] text-white leading-tight mb-3">
                Secure. Reliable.<br />Future-Ready.
              </h4>
              <p className="text-white/60 text-[12px] leading-relaxed">
                Regular updates.<br />New features.<br />Stronger protection.
              </p>
            </div>
            
            <div className="relative w-full h-[100px] mt-auto flex items-center justify-center opacity-20">
              <div className="absolute inset-0 border border-white rounded-full scale-[0.6]" />
              <div className="absolute inset-0 border border-white rounded-full scale-[0.85]" />
              <ShieldCheck className="w-12 h-12 text-white relative z-10" />
            </div>
          </motion.div>

          {/* 14. Blend In */}
          <motion.div
            {...fadeUp(0.28)}
            className="col-span-1 lg:col-span-4 bg-white rounded-[2.5rem] border border-slate-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] pt-6 px-6 pb-2 flex flex-col relative overflow-hidden min-h-[240px]"
          >
            <div className="relative z-20 flex flex-col mb-4">
              <h4 className="font-bold text-[16px] text-black leading-tight mb-3">
                Designed to Blend In.<br />Built to Stand Out.
              </h4>
              <p className="text-black/60 text-[12px] leading-relaxed max-w-[200px]">
                Premium aluminum body with a minimalist design that fits anywhere.
              </p>
            </div>
            
            <div className="relative w-full h-[100px] mt-auto">
              <Image
                src="/images/edgebox.png"
                alt="Edgebox grille detail"
                fill
                className="object-contain object-bottom scale-100 origin-bottom"
              />
            </div>
          </motion.div>


          {/* ==================== FINAL BANNER ==================== */}

          {/* 15. Final Banner */}
          <motion.div
            {...fadeUp(0.30)}
            className="col-span-1 lg:col-span-12 bg-black rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-6">
              <KairosLogo inverted showTagline={false} className="w-32 shrink-0" />
              <div className="h-12 w-px bg-white/20 hidden md:block" />
              <p className="text-white/50 text-[10px] font-bold tracking-widest uppercase">
                AI-POWERED SECURITY. REAL-TIME PROTECTION. COMPLETE PEACE OF MIND.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
