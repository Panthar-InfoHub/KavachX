"use client";

import { useRef, useState } from "react";
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
  WifiOff
} from "lucide-react";
import LenisDiv from "@/components/LenisDiv";
import Link from "next/link";

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
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "business",
    label: "Business Owners",
    icon: Briefcase,
    headline: "Security that never sleeps.",
    body: "Keep your offices and corporate spaces secure 24/7. Detect distress gestures from employees working late and prevent unauthorized access with instant alerts delivered straight to your management team.",
    cta: "Secure Your Business",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "vendor",
    label: "Local Vendors",
    icon: Store,
    headline: "Keep your livelihood safe.",
    body: "Prevent theft and ensure the safety of your storefront. Kairos alerts you immediately if suspicious activity or a fire is detected after hours, so you can act before damage is done.",
    cta: "Protect Your Shop",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "home",
    label: "Homeowners",
    icon: Home,
    headline: "Peace of mind for your loved ones.",
    body: "Whether you're at work or on vacation, Kairos keeps a watchful eye on your home. Instantly detect break-ins, distress gestures, or smoke, ensuring your family is always protected.",
    cta: "Secure Your Home",
    image: "https://images.unsplash.com/photo-1558036117-15d82a90b968?auto=format&fit=crop&q=80&w=1200"
  }
];

export default function KairosPageClient() {
  const [activeAudience, setActiveAudience] = useState(audiences[0]);
  const heroRef = useRef<HTMLDivElement>(null);

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
              <button className="w-full sm:w-auto bg-black hover:bg-gray-900 text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)]">
                Secure Your Space Today
              </button>
              <button className="w-full sm:w-auto bg-white hover:bg-gray-50 border border-black/20 text-black px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300 shadow-sm">
                See How It Works
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

        {/* CORE FEATURES SECTION */}
        <section className="relative z-30 pt-32 md:pt-48 pb-24 px-6 bg-white border-y border-black/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold font-syne mb-4 text-black tracking-tight">The 3-5 Second Advantage</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg font-medium">Because in an emergency, every single second counts.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`p-8 rounded-[2rem] border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${feature.featured ? 'bg-black border-black shadow-xl' : 'bg-white border-black/10 shadow-sm'
                    }`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${feature.featured ? 'bg-white/10' : 'bg-gray-100'
                    }`}>
                    <feature.icon className={`w-7 h-7 ${feature.featured ? 'text-white' : 'text-black'}`} />
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${feature.featured ? 'text-white' : 'text-black'}`}>{feature.title}</h3>
                  <p className={`leading-relaxed text-sm font-medium ${feature.featured ? 'text-gray-400' : 'text-gray-600'}`}>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* USE CASES SECTION */}
        <section className="py-24 px-6 bg-gray-50 relative border-b border-black/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl md:text-5xl font-bold font-syne mb-6 text-black tracking-tight">Designed For Your Reality</h2>
              <p className="text-gray-600 max-w-2xl text-lg font-medium">Tailored intelligence that adapts to your specific environment and security needs.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
              {/* Tabs */}
              <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:w-1/3 pb-4 lg:pb-0 scrollbar-hide">
                {audiences.map((aud) => (
                  <button
                    key={aud.id}
                    onClick={() => setActiveAudience(aud)}
                    className={`flex items-center gap-4 p-5 rounded-[1.5rem] text-left transition-all duration-300 min-w-[200px] lg:min-w-0 ${activeAudience.id === aud.id
                        ? 'bg-black text-white shadow-xl'
                        : 'text-gray-500 hover:bg-gray-200 hover:text-black border border-transparent'
                      }`}
                  >
                    <div className={`p-3 rounded-xl transition-colors ${activeAudience.id === aud.id ? 'bg-white/10' : 'bg-white shadow-sm'}`}>
                      <aud.icon className={`w-6 h-6 ${activeAudience.id === aud.id ? 'text-white' : 'text-black'}`} />
                    </div>
                    <span className="font-bold text-lg tracking-wide">{aud.label}</span>
                  </button>
                ))}
              </div>

              {/* Content Panel */}
              <div className="lg:w-2/3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeAudience.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="relative rounded-[2.5rem] overflow-hidden group min-h-[400px] flex items-end shadow-2xl bg-black"
                  >
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={activeAudience.image}
                        alt={activeAudience.label}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 mix-blend-luminosity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                    </div>

                    <div className="relative z-10 p-8 md:p-12 text-white">
                      <h3 className="text-3xl md:text-4xl font-bold font-syne mb-4 tracking-tight">{activeAudience.headline}</h3>
                      <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl font-medium">
                        {activeAudience.body}
                      </p>
                      <button className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-200 transition-colors shadow-lg">
                        {activeAudience.cta}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST SECTION */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold font-syne mb-6 text-black tracking-tight">Built for Reliability. Trusted by Thousands.</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-16 font-medium">
              Safety is too important to leave to chance. Kairos operates continuously, ensuring your data is private and your alerts are delivered when you need them most.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Lock, title: "End-to-End Encryption", desc: "Your data stays yours." },
                { icon: CheckCircle2, title: "99.9% Uptime", desc: "Always online, always watching." },
                { icon: WifiOff, title: "Offline Capabilities", desc: "Local processing power." }
              ].map((badge, i) => (
                <div key={i} className="flex flex-col items-center p-8 rounded-[2rem] bg-white border border-black/10 shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-6">
                    <badge.icon className="w-8 h-8 text-black" />
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-black">{badge.title}</h4>
                  <p className="text-gray-500 font-medium">{badge.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-32 px-6 relative overflow-hidden bg-black rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.05] mix-blend-overlay" />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold font-syne mb-6 text-white tracking-tighter">Don't wait for an emergency.</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-medium">
              Upgrade your security today. Get KAIROS- AI edge box and experience the peace of mind that comes with 3-second response times.
            </p>
            <Link href="/contact" className="bg-white text-black px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              Pre-order KAIROS Today
            </Link>
          </div>
        </section>
      </div>
    </LenisDiv>
  );
}
