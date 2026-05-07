"use client";

import { motion } from "motion/react";
import {
  Plus,
  Search,
  Command,
  ShieldCheck,
  Cloud,
  Globe,
  Cpu,
  Zap,
  Activity,
  Lock
} from "lucide-react";

export function PerformanceGraph() {
  return (
    <div className="relative w-full h-48 mt-4 overflow-hidden group">
      {/* 🏁 Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <svg viewBox="0 0 800 200" className="w-full h-full preserve-3d" preserveAspectRatio="none">
        <defs>
          <linearGradient id="area-grad-main" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="area-grad-sub" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 📊 Sub Data Stream (Blue) */}
        <motion.path
          d="M0 150 Q 100 140, 200 160 T 400 130 T 600 150 T 800 120"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="1"
          strokeOpacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* 📉 Main Area (Pink) */}
        <motion.path
          d="M0 120 Q 150 100, 300 130 T 500 80 T 800 110 V 200 H 0 Z"
          fill="url(#area-grad-main)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* ✨ Main Line (Blue) */}
        <motion.path
          d="M0 120 Q 150 100, 300 130 T 500 80 T 800 110"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />

        {/* 🕯️ Scanning Line */}
        <motion.line
          x1="0" y1="0" x2="0" y2="200"
          stroke="#3b82f6"
          strokeWidth="1"
          strokeOpacity="0.5"
          animate={{ x: [0, 800] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* 🏷️ Floating Data Labels */}
      <div className="absolute top-0 left-0 w-full flex justify-between px-4 opacity-40">
        <span className="text-[10px] text-white/50 font-mono">LATENCY: 12ms</span>
        <span className="text-[10px] text-white/50 font-mono">LOAD: 42%</span>
        <span className="text-[10px] text-white/50 font-mono opacity-0">NODES: 12.4K</span>
      </div>
    </div>
  );
}

export function SecurityGlobe() {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* 🔮 Core Glow */}
      <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-[60px] animate-pulse" />

      {/* 🪐 Orbital Rings */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          animate={{ rotate: 360 }}
          transition={{ duration: 10 + i * 5, repeat: Infinity, ease: "linear" }}
          className="absolute border border-white/10 rounded-full"
          style={{ width: `${60 + i * 20}%`, height: `${60 + i * 20}%` }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-400/50 shadow-[0_0_10px_#60a5fa]"
          />
        </motion.div>
      ))}

      {/* 🛡️ Central Icon */}
      <div className="relative p-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-2xl">
        <ShieldCheck className="w-12 h-12 text-white/80" strokeWidth={1.5} />
      </div>
    </div>
  );
}

export function SearchBarAsset() {
  return (
    <div className="w-full max-w-md relative group">
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-500 group-hover:border-white/20">
        <Search className="w-4 h-4 text-white/40" />
        <span className="text-sm text-white/20 font-light">Search logs, events, nodes...</span>
        <div className="ml-auto flex items-center gap-1.5 px-1.5 py-1 rounded-md bg-white/5 border border-white/10">
          <Command className="w-3 h-3 text-white/40" />
          <span className="text-[10px] text-white/40 font-medium">K</span>
        </div>
      </div>
      {/* 🕯️ Underglow Line */}
      <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-[90%] h-0.5 bg-linear-to-r from-transparent via-cyan-500/50 to-transparent blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}

export function IntegrationIcons() {
  const icons = [Cpu, Zap, Activity, Lock, Globe];
  return (
    <div className="flex items-center gap-6">
      {icons.map((Icon, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.2, scale: 0.8 }}
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scale: [0.9, 1.1, 0.9],
            y: [0, -10, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
          className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
        >
          <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
        </motion.div>
      ))}
    </div>
  );
}

export function UptimeCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col gap-2 w-40"
    >
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6] animate-pulse" />
        <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Uptime</span>
      </div>
      <p className="text-2xl font-medium text-white tracking-tighter">99.97%</p>
      <div className="flex gap-1 h-1 mt-1">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`flex-1 rounded-full ${i < 11 ? 'bg-blue-500/50' : 'bg-white/10'}`} />
        ))}
      </div>
    </motion.div>
  );
}

export function CloudAsset() {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* ☁️ Main Cloud Body */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10"
      >
        <svg width="120" height="80" viewBox="0 0 120 80" fill="none" className="drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">
          <path
            d="M35 30C35 18.9543 43.9543 10 55 10C63.149 10 70.0818 14.8692 73.0475 21.8491C75.2155 20.6558 77.7126 20 80.3704 20C88.4502 20 95 26.5498 95 34.6296C95 35.1523 94.9726 35.6685 94.9192 36.1764C103.498 38.3184 110 46.0152 110 55.2222C110 66.145 101.145 75 90.2222 75H35C21.1929 75 10 63.8071 10 50C10 37.4042 19.349 27.0003 31.4925 25.2632C32.4287 25.0883 33.3912 25 34.3704 25C34.5826 25 34.7925 25.0042 35.001 25.0125C35.0003 25.0084 35 25.0042 35 25V30Z"
            fill="url(#cloud-grad)"
            className="opacity-90"
          />
          <defs>
            <linearGradient id="cloud-grad" x1="60" y1="10" x2="60" y2="75" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" stopOpacity="0.2" />
              <stop offset="1" stopColor="white" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* 🛰️ Orbital Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-full h-full border border-white/5 rounded-full"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 rounded-full bg-blue-500/20 border border-blue-500/40 backdrop-blur-md">
          <Lock className="w-4 h-4 text-white" />
        </div>
      </motion.div>

      <div className="absolute inset-0 bg-blue-500/10 blur-[80px] rounded-full" />
    </div>
  );
}

export function SonarRadar() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none overflow-hidden">
      <div className="relative w-80 h-80">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.5, opacity: 0.5 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1.3,
              ease: "linear",
            }}
            className="absolute inset-0 border border-blue-500 rounded-full"
          />
        ))}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-linear-to-tr from-blue-500/20 to-transparent rounded-full"
          style={{ transformOrigin: 'center' }}
        />
      </div>
    </div>
  );
}
