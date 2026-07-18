"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SurakshaKavachSection() {
  return (
    <section className="w-full bg-[#fdfdfd] text-black font-syne relative z-20 pb-20 rounded-t-[3rem] overflow-hidden">

      {/* Header Container */}
      <div className="max-w-4xl mx-auto text-center mb-16 flex flex-col items-center pt-24 relative z-10 px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
          Suraksha Kavach
        </h2>
        <p className="text-sm md:text-base text-gray-600 mb-8 max-w-2xl font-medium leading-relaxed">
          Suraksha Kavach is a smart safety tool that protects users in emergencies. A single tap alerts trusted contacts, shares your location, and activates safety features for a quick response and peace of mind.
        </p>
        <Link href="/suraksha-kavach" className="group inline-flex h-14 w-full sm:w-auto items-center justify-between gap-4 rounded-full bg-black pl-8 pr-2 text-[15px] font-medium text-white transition-all hover:bg-slate-800 active:scale-[0.98]">
          Explore Features
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform group-hover:scale-[1.05]">
            <ArrowRight className="h-4 w-4 -rotate-45 transition-transform group-hover:rotate-0" />
          </div>
        </Link>
      </div>

      {/* Bento Grid */}
      <div className="max-w-6xl mx-auto bg-[#f4f4f4] rounded-[2.5rem] p-4 md:p-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">

          {/* Card 1: Our Feature (col-span-3) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-50px" }}
            className="relative md:col-span-3 bg-white rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-black/5"
          >
            <div className="flex flex-col md:flex-row justify-between items-start mb-8 md:mb-12 h-full gap-8">
              <div className="flex flex-col h-full w-full md:w-auto">
                <span className="inline-block px-4 py-1.5 bg-gray-100/80 w-max rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-6 font-sans">
                  Our Feature
                </span>
                <h3 className="text-2xl md:text-[32px] font-bold leading-tight max-w-[220px] tracking-tight">
                  Discover our amazing and Innovative top feature!
                </h3>
              </div>

              {/* Feature List (Half-circular dial positioning) */}
              <ul className="list-none p-0 m-0 flex flex-col justify-center gap-4 relative md:absolute md:right-[-20px] md:top-1/2 md:-translate-y-1/2 items-start md:items-stretch pl-0 md:pl-0">
                {[
                  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 0 1 0 9Z" /><line x1="2" y1="2" x2="22" y2="22" /></svg>, text: "Offline Mode", offset: "translate-x-0 md:translate-x-[45px]", style: "bg-[#bdbdbd] text-white w-14 h-14", active: false },
                  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="22" /></svg>, text: "Voice Commands", offset: "translate-x-0 md:translate-x-[25px]", style: "bg-[#bdbdbd] text-white w-14 h-14", active: false },
                  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>, text: "SOS Alert", offset: "translate-x-0 md:translate-x-0", style: "bg-black text-white w-[62px] h-[62px]", active: true },
                  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><path d="M19 17H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2Z" /><path d="M17 17v2a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-2" /><path d="M12 7V3" /><circle cx="12" cy="12" r="1" /></svg>, text: "Drive Detection", offset: "translate-x-0 md:translate-x-[25px]", style: "bg-[#bdbdbd] text-white w-14 h-14", active: false },
                  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24"><path d="M19 17H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2Z" /><path d="M17 17v2a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-2" /><circle cx="7.5" cy="14.5" r=".5" fill="currentColor" /><circle cx="16.5" cy="14.5" r=".5" fill="currentColor" /></svg>, text: "Crash Detection", offset: "translate-x-0 md:translate-x-[45px]", style: "bg-[#bdbdbd] text-white w-14 h-14", active: false },
                ].map((item, i) => (
                  <li key={i} className={`flex items-center gap-4 ${item.offset}`}>
                    <span className={`rounded-full flex items-center justify-center shrink-0 ${item.style} shadow-sm`}>
                      {item.icon}
                    </span>
                    <span className={`whitespace-normal md:whitespace-nowrap transition-all ${item.active ? 'text-black font-bold text-[18px]' : 'font-semibold text-[#777] text-[16px]'}`}>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Card 2: App SOS Alert (col-span-2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ margin: "-50px" }}
            className="md:col-span-2 bg-white rounded-3xl p-8 flex flex-col relative overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-black/5"
          >
            <h3 className="text-[22px] font-bold mb-2 tracking-tight">App SOS Alert</h3>
            <p className="text-[13px] text-gray-500 font-medium max-w-[220px] mb-8 font-sans">
              One tap to automated notification with real-time location sharing.
            </p>
            {/* Image Placeholder -> Use bento mockup */}
            <div className="relative w-full h-[220px] rounded-xl overflow-hidden flex items-end justify-center mt-auto">
              <Image
                src="/images/bento-mockup.svg"
                alt="App SOS Alert Mockup"
                width={300}
                height={220}
                className="object-contain object-bottom translate-y-4"
              />
            </div>
          </motion.div>

          {/* Card 3: AI Summarisation (col-span-2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ margin: "-50px" }}
            className="md:col-span-2 bg-white rounded-3xl p-8 flex flex-col shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-black/5 h-full"
          >
            <h3 className="text-[22px] font-bold mb-2 tracking-tight">AI Summarisation</h3>
            <p className="text-[13px] text-gray-500 font-medium max-w-[280px] font-sans">
              Receive instant alerts when as you monitor and share your location live.
            </p>
            <div className="flex-1 flex items-center justify-center mt-10">
              <Image
                src="/images/bento-svg.svg"
                alt="AI Summarisation Star"
                width={120}
                height={120}
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* Card 4: Real-Time Location Tracking (col-span-3) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ margin: "-50px" }}
            className="md:col-span-3 bg-white rounded-3xl p-8 flex flex-col relative overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-black/5"
          >
            <h3 className="text-[22px] font-bold mb-2 tracking-tight">Real-Time Location Tracking</h3>
            <p className="text-[13px] text-gray-500 font-medium max-w-[280px] mb-8 font-sans">
              Automated alerts with real-time location tracking and sharing.
            </p>
            <div className="relative w-full h-[180px] flex items-center justify-center mt-auto">
              <Image
                src="/images/map.png"
                alt="Location Map"
                fill
                className="object-contain object-center"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
