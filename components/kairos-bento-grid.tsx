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
    <section className="w-full bg-[#f4f4f5] rounded-t-[3rem] py-24 md:py-32 px-4 sm:px-6 lg:px-8 font-syne relative overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.2)] z-20">
      {/* Net / Grid Background Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      
      {/* Soft fade at the top of the grid */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#f4f4f5] to-transparent pointer-events-none z-0"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Premium Intro Text */}
        <div className="flex flex-col items-center text-center mb-24 relative z-10 pt-8">
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white border border-black/[0.06] shadow-sm mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/80">Core Technology</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-5xl md:text-[5.5rem] font-bold tracking-tighter mb-6 leading-[1.05]"
          >
            <span className="text-black">Powerful Features</span><br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">at the Edge</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl leading-relaxed"
          >
            Discover what makes KAIROS the ultimate intelligent security solution. Built for maximum speed, privacy, and absolute reliability.
          </motion.p>
        </div>

        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-12 auto-rows-auto">

          {/* ==================== ROW 1 ==================== */}

          {/* 1. Brand Hero */}
          <motion.div
            {...fadeUp(0.02)}
            className="col-span-1 md:col-span-2 lg:col-span-4 lg:row-span-2 bg-[#09090b] rounded-[32px] p-8 flex flex-col justify-between relative overflow-hidden min-h-[480px]"
          >
            <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none">
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

            <div className="relative z-10 grid grid-cols-4 gap-4 mt-12">
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
            className="col-span-1 md:col-span-2 lg:col-span-5 lg:row-span-2 bg-white rounded-[32px] p-8 flex flex-col relative overflow-hidden min-h-[480px]"
          >
            <div className="relative z-10 mb-8">
              <h3 className="text-3xl font-bold text-black mb-2">The Kairos Edge AI Box</h3>
              <p className="text-black/60 text-sm">Powerful AI. Compact form. Maximum protection.</p>
            </div>
            <div className="absolute inset-x-8 bottom-8 top-32 pointer-events-none">
              <div className="relative w-full h-full drop-shadow-2xl">
                <Image
                  src="/images/edgebox.png"
                  alt="Kairos Edge AI Box"
                  fill
                  className="object-contain object-center"
                />
              </div>
            </div>
          </motion.div>

          {/* 3. AI Detection */}
          <motion.div
            {...fadeUp(0.06)}
            className="col-span-1 lg:col-span-3 bg-white rounded-[32px] p-8 flex flex-col justify-between overflow-hidden relative min-h-[234px]"
          >
            <div className="relative z-10 max-w-[140px]">
              <h4 className="font-bold text-lg text-black mb-3 leading-tight">AI-Powered<br />Detection</h4>
              <p className="text-black/60 text-[11px] leading-relaxed">
                Detects threats in real time with advanced AI models running on the edge.
              </p>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-[180px] h-[180px]">
              <TargetGraphic />
            </div>

            <div className="absolute top-6 right-6 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[8px] tracking-widest text-black/50 font-bold uppercase">KAIROS</span>
            </div>
          </motion.div>

          {/* 4. Real-Time Alerts */}
          <motion.div
            {...fadeUp(0.08)}
            className="col-span-1 lg:col-span-3 bg-[#09090b] rounded-[32px] p-8 flex flex-col justify-between relative overflow-hidden min-h-[234px]"
          >
            <div className="relative z-10 max-w-[130px]">
              <h4 className="font-bold text-lg text-white mb-3 leading-tight">Real-Time<br />Alerts</h4>
              <p className="text-white/60 text-[11px] leading-relaxed">
                Instant notifications for critical events across all your connected devices.
              </p>
            </div>
            {/* Mock UI */}
            <div className="absolute right-[-20px] top-[10%] w-[160px] h-[120%] bg-black border border-white/10 rounded-l-3xl p-3 flex flex-col gap-2">
              <div className="flex justify-between items-center mb-2 px-1">
                <div className="w-4 h-4 rounded-full bg-white/10" />
                <span className="text-[8px] tracking-widest text-white/50">KAIROS</span>
              </div>
              {[
                { icon: Flame, title: "Fire Detected", sub: "Warehouse 1", time: "10:24 AM", color: "text-red-500" },
                { icon: UserX, title: "Intrusion Detected", sub: "Gate Entrance", time: "10:24 AM", color: "text-orange-500" },
                { icon: PersonStanding, title: "Fall Detected", sub: "Production Area", time: "10:24 AM", color: "text-yellow-500" },
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
            className="col-span-1 lg:col-span-2 bg-white rounded-[32px] p-6 flex flex-col min-h-[220px]"
          >
            <div className="flex items-center gap-3 mb-4">
              <Cctv className="w-6 h-6 text-black/80" />
              <h4 className="font-bold text-[14px] leading-tight text-black">Works with Your<br />Existing Cameras</h4>
            </div>
            <div className="pl-1">
              <p className="text-black/60 text-[11px] leading-relaxed mb-2">
                Seamlessly integrates with your current IP cameras.
              </p>
              <p className="text-black/60 text-[11px] leading-relaxed">
                No new cameras required.
              </p>
            </div>
          </motion.div>

          {/* 6. Detection Capabilities */}
          <motion.div
            {...fadeUp(0.12)}
            className="col-span-1 lg:col-span-2 bg-white rounded-[32px] p-6 flex flex-col min-h-[220px]"
          >
            <div className="flex items-center gap-3 mb-4">
              <BrainCircuit className="w-6 h-6 text-black/80" />
              <h4 className="font-bold text-[14px] leading-tight text-black">AI Detection<br />Capabilities</h4>
            </div>
            <div className="grid grid-cols-1 gap-2 pl-1">
              {[
                "Fire Detection", "Intrusion Detection", "Fall Detection",
                "Weapon Detection", "Loitering Detection", "Crowd Detection"
              ].map((cap, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-black/40" />
                  <span className="text-[11px] text-black/70 font-medium">{cap}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 7,8,9. Mini Features Group (Span 5) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Edge AI Processing */}
            <motion.div {...fadeUp(0.14)} className="bg-white rounded-[32px] p-6 flex flex-col min-h-[220px] relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4 z-10">
                <Cpu className="w-6 h-6 text-black/80" />
                <h4 className="font-bold text-[14px] leading-tight text-black">Edge AI<br />Processing</h4>
              </div>
              <p className="text-black/60 text-[11px] leading-relaxed z-10">
                All processing happens on the device itself. Your data stays private and secure.
              </p>
              <div className="absolute bottom-[-10px] right-[-10px] w-24 h-24 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.1)_0%,transparent_70%)]" />
            </motion.div>

            {/* Privacy by Design */}
            <motion.div {...fadeUp(0.16)} className="bg-white rounded-[32px] p-6 flex flex-col min-h-[220px]">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-black/80" />
                <h4 className="font-bold text-[14px] leading-tight text-black">Privacy by<br />Design</h4>
              </div>
              <p className="text-black/60 text-[11px] leading-relaxed">
                No video leaves your premises. No cloud dependency. Complete data privacy.
              </p>
            </motion.div>

            {/* 24/7 Monitoring */}
            <motion.div {...fadeUp(0.18)} className="bg-white rounded-[32px] p-6 flex flex-col min-h-[220px]">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-black/80" />
                <h4 className="font-bold text-[14px] leading-tight text-black">24/7 Monitoring</h4>
              </div>
              <p className="text-black/60 text-[11px] leading-relaxed">
                Always on. Always vigilant. Built for uninterrupted protection.
              </p>
            </motion.div>
          </div>

          {/* 10. Plug & Protect */}
          <motion.div
            {...fadeUp(0.20)}
            className="col-span-1 lg:col-span-3 bg-[#09090b] rounded-[32px] p-8 flex justify-between relative overflow-hidden min-h-[220px]"
          >
            <div className="relative z-10 flex flex-col justify-center">
              <h4 className="font-bold text-[22px] text-white mb-2 leading-tight">Plug & Protect</h4>
              <p className="text-white/50 text-[12px] mb-6">Simple to set up.<br />Hard to stop.</p>
              <div className="flex flex-col gap-2.5">
                {["Plug in Power", "Connect to Network", "Start Protecting"].map((step, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span className="text-[11px] text-white/80">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-[220px] h-[220px] opacity-90 pointer-events-none">
              <Image
                src="/images/edgebox.png"
                alt="Edgebox top view"
                fill
                className="object-contain object-right"
              />
            </div>
          </motion.div>


          {/* ==================== ROW 3 ==================== */}

          {/* 11. Environments */}
          <motion.div
            {...fadeUp(0.22)}
            className="col-span-1 md:col-span-2 lg:col-span-4 bg-[#09090b] rounded-[32px] p-8 flex flex-col justify-between min-h-[160px]"
          >
            <h4 className="font-bold text-[16px] text-white mb-6">Built for Every Environment</h4>
            <div className="flex items-center justify-between px-2">
              {[
                { icon: Building2, label: "Offices" },
                { icon: Factory, label: "Factories" },
                { icon: Warehouse, label: "Warehouses" },
                { icon: Store, label: "Retail" },
                { icon: GraduationCap, label: "Campuses" },
                { icon: MoreHorizontal, label: "And more" },
              ].map((env, i) => (
                <div key={i} className="flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
                  <env.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  <span className="text-[9px] text-white font-medium">{env.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 12. Dimensions */}
          <motion.div
            {...fadeUp(0.24)}
            className="col-span-1 lg:col-span-3 bg-white rounded-[32px] p-8 flex justify-between relative overflow-hidden min-h-[160px]"
          >
            <div className="relative z-10 flex flex-col justify-between">
              <h4 className="font-bold text-[15px] text-black leading-tight mb-4">
                Compact. Powerful.<br />Uncompromising.
              </h4>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                <div>
                  <p className="text-[8px] text-black/40 uppercase font-bold tracking-wider mb-0.5">Dimensions</p>
                  <p className="text-[10px] text-black font-semibold">120 x 45 mm</p>
                </div>
                <div>
                  <p className="text-[8px] text-black/40 uppercase font-bold tracking-wider mb-0.5">Weight</p>
                  <p className="text-[10px] text-black font-semibold">335 gms</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[8px] text-black/40 uppercase font-bold tracking-wider mb-0.5">Build</p>
                  <p className="text-[10px] text-black font-semibold">Aluminum Body</p>
                </div>
              </div>
            </div>

            <div className="absolute right-[-30px] bottom-[-20px] w-40 h-40">
              <Image
                src="/images/edgebox.png"
                alt="Edgebox side"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* 13. Future-Ready */}
          <motion.div
            {...fadeUp(0.26)}
            className="col-span-1 lg:col-span-2 bg-[#09090b] rounded-[32px] p-6 flex flex-col justify-between relative overflow-hidden min-h-[160px]"
          >
            <div className="relative z-10">
              <h4 className="font-bold text-[15px] text-white leading-tight mb-3">
                Secure. Reliable.<br />Future-Ready.
              </h4>
              <p className="text-white/60 text-[11px] leading-relaxed">
                Regular updates.<br />New features.<br />Stronger protection.
              </p>
            </div>

            <div className="absolute right-[-10px] bottom-[-10px] w-32 h-32 opacity-20 pointer-events-none flex items-center justify-center">
              <div className="absolute inset-0 border border-white rounded-full scale-50" />
              <div className="absolute inset-0 border border-white rounded-full scale-75" />
              <ShieldCheck className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          {/* 14. Blend In */}
          <motion.div
            {...fadeUp(0.28)}
            className="col-span-1 lg:col-span-3 bg-white rounded-[32px] p-8 flex justify-between relative overflow-hidden min-h-[160px]"
          >
            <div className="relative z-20 max-w-[170px] flex flex-col justify-center">
              <h4 className="font-bold text-[15px] text-black leading-tight mb-3">
                Designed to Blend In.<br />Built to Stand Out.
              </h4>
              <p className="text-black/60 text-[11px] leading-relaxed">
                Premium aluminum body with a minimalist design that fits anywhere.
              </p>
            </div>

            {/* Protective gradient for text legibility */}
            <div className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-white via-white/90 to-transparent z-10 pointer-events-none" />

            <div className="absolute right-[-90px] top-1/2 -translate-y-1/2 w-[220px] h-[220px] pointer-events-none">
              <Image
                src="/images/edgebox.png"
                alt="Edgebox grille detail"
                fill
                className="object-contain object-right scale-[1.3]"
              />
            </div>
          </motion.div>


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
