"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
        <button className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-black/20 text-xs font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300 group">
          Explore Features
          <svg className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

      {/* Bento Grid */}
      <div className="max-w-6xl mx-auto bg-[#f4f4f4] rounded-[2.5rem] p-4 md:p-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">

          {/* Card 1: Our Feature (col-span-3) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-50px" }}
            className="md:col-span-3 bg-white rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-black/5"
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
              <div className="flex flex-col gap-3 md:gap-4 text-[10px] font-bold uppercase tracking-wider text-gray-400 items-end justify-center font-sans mt-4 relative w-full md:w-auto pr-2">
                <div className="flex items-center gap-3 translate-x-[5px] md:translate-x-[10px]">
                  <span className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </span>
                  <span className="w-24 text-right">Offline Map</span>
                </div>
                <div className="flex items-center gap-3 translate-x-[-10px] md:translate-x-[-15px]">
                  <span className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                  </span>
                  <span className="w-24 text-right">Voice Command</span>
                </div>
                <div className="flex items-center gap-3 text-white translate-x-[-20px] md:translate-x-[-30px]">
                  <span className="w-10 h-10 rounded-full bg-black shadow-lg shadow-black/20 flex items-center justify-center text-white relative">
                    <span className="absolute -left-1 -top-1 w-3 h-3 bg-white rounded-full flex items-center justify-center"><div className="w-2 h-2 bg-black rounded-full" /></span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  </span>
                  <span className="w-24 text-right text-black">SOS Alert</span>
                </div>
                <div className="flex items-center gap-3 translate-x-[-10px] md:translate-x-[-15px]">
                  <span className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </span>
                  <span className="w-24 text-right">Drive Detection</span>
                </div>
                <div className="flex items-center gap-3 translate-x-[5px] md:translate-x-[10px]">
                  <span className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </span>
                  <span className="w-24 text-right">Crash Detection</span>
                </div>
              </div>
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
                src="/images/bento-map.svg"
                alt="Location Map"
                fill
                className="object-contain object-right"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
