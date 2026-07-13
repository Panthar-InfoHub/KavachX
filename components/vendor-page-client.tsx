"use client";

import React, { useState, useEffect } from "react";
import LenisDiv from "@/components/LenisDiv";
import { motion, AnimatePresence } from "motion/react";
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
  ChevronDown
} from "lucide-react";
import Image from "next/image";

// ==========================================
// 1. Hero Section
// ==========================================
const HeroSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden bg-slate-50 pt-32 pb-24 min-h-[70vh]">

      {/* ── Net / Grid Background Effect ── */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      {/* Soft fade at the top and bottom of the grid */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-slate-50 to-transparent pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none z-0" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-6xl mx-auto flex flex-col items-center"
        >


          <h1 className="text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[5.5rem] font-bold leading-[1.05] mb-6 font-syne text-slate-900 tracking-tight whitespace-nowrap">
            Sell Smarter Security. <br />
            Keep Earning <span className="text-[#768294]">Tomorrow.</span>
          </h1>

          {/* ── Subtitle ── */}
          <p className="text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
            Join the KavachX Vendor Partner Network. Earn 20% on eligible KAIROS installations, plus recurring commission from active customer subscriptions.
          </p>

          {/* ── Standardized Global Button ── */}
          <div className="flex flex-col items-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto text-center bg-black hover:bg-gray-900 text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.25)] inline-flex items-center justify-center gap-2 active:scale-95"
            >
              Become a Vendor Partner
            </Link>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-400 text-base gap-0.5 leading-none">
                ★★★★★
              </div>
              <span className="text-[13px] font-medium text-slate-500">
                Trusted by security integrators globally
              </span>
            </div>
          </div>
        </motion.div>
      </div>
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

const SocialProofSection = () => {
  return (
    <section className="py-24 bg-white text-center flex flex-col items-center">
      <div className="container mx-auto px-6 max-w-4xl">
        <p className="text-sm font-semibold text-slate-500 mb-8 tracking-widest uppercase">Compatible with</p>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16" style={{ opacity: 0.55 }}>
          <span className="text-2xl md:text-3xl font-black tracking-tighter text-slate-800">HIKVISION</span>
          <span className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800" style={{ fontVariant: "small-caps" }}>dahua</span>
          <span className="text-2xl md:text-3xl font-bold tracking-widest uppercase text-slate-800">Bosch</span>
          <span className="text-2xl md:text-3xl font-extrabold tracking-tight uppercase text-slate-800">CP PLUS</span>
        </div>

        {/* Laurel badge row */}
        <div className="mt-24 flex flex-col sm:flex-row justify-center items-center gap-12 sm:gap-20">
          <BadgeItem
            icon={
              <svg className="w-5 h-5 mb-0.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C9.243 2 7 4.243 7 7v1H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V10a2 2 0 00-2-2h-2V7c0-2.757-2.243-5-5-5zm0 2c1.654 0 3 1.346 3 3v1H9V7c0-1.654 1.346-3 3-3zm0 10a2 2 0 110 4 2 2 0 010-4z"/>
              </svg>
            }
            line1="Enterprise"
            line2="Ready"
          />
          <BadgeItem
            icon={
              <svg className="w-5 h-5 mb-0.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L3 7v6c0 5 3.8 9.7 9 10.9C18.2 22.7 22 18 22 13V7L12 2zm-1 13.4l-3-3 1.4-1.4L11 12.6l5.6-5.6 1.4 1.4-7 7z"/>
              </svg>
            }
            line1="Trusted by"
            line2="Integrators"
          />
        </div>

        <h2 className="mt-16 text-4xl md:text-5xl lg:text-[3.5rem] font-bold font-syne text-[#0F172A] max-w-4xl mx-auto leading-[1.1] tracking-tight">
          Join hundreds of partners upgrading to intelligent security
        </h2>
      </div>
    </section>
  );
};

// ==========================================
// 2. Earning Model
// ==========================================
const EarningModelSection = () => {
  return (
    <section id="earning-model" className="py-24 bg-white text-slate-900 relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <div className="text-slate-900 text-sm font-bold tracking-widest uppercase mb-4">TWO WAYS TO EARN</div>
          <h2 className="text-4xl md:text-5xl font-bold font-syne mb-6">Earn Once. Keep Earning Every Month.</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            One KAIROS customer can create more than a one-time business opportunity. Earn through successful installations and continue unlocking recurring earning potential through eligible active subscriptions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 border border-slate-200 p-10 rounded-3xl relative overflow-hidden group hover:border-slate-300 transition-colors shadow-sm hover:shadow-md"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <div className="text-9xl font-bold text-slate-900">20%</div>
            </div>
            <h3 className="text-slate-900 text-sm font-bold tracking-widest uppercase mb-4 relative z-10">20% Installation Commission</h3>
            <h4 className="text-3xl font-bold font-syne mb-4 relative z-10">Earn 20% on Every Eligible Installation</h4>
            <p className="text-slate-600 relative z-10 mb-8">
              Successfully bring and install KAIROS for an eligible customer and earn a 20% commission on the applicable installation value. The more installations you complete, the greater your earning potential.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-slate-50 border border-slate-200 p-10 rounded-3xl relative overflow-hidden group hover:border-slate-300 transition-colors shadow-sm hover:shadow-md"
          >
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-48 h-48 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity flex items-center justify-center">
               <motion.div 
                 animate={{ rotate: 360 }} 
                 transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                 className="w-full h-full border-2 border-dashed border-slate-900 rounded-full"
               />
               <motion.div 
                 animate={{ rotate: -360 }} 
                 transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                 className="absolute w-3/4 h-3/4 border border-slate-900 rounded-full"
               />
            </div>
            <h3 className="text-slate-900 text-sm font-bold tracking-widest uppercase mb-4 relative z-10">Recurring Subscription Commission</h3>
            <h4 className="text-3xl font-bold font-syne mb-4 relative z-10">Your Customer Subscribes. You Keep Earning.</h4>
            <p className="text-slate-600 relative z-10">
              When an eligible customer acquired through you continues with a qualifying KAIROS subscription plan, you can earn recurring commission according to the applicable Vendor Partner Program terms.
            </p>
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
// 5. Why KAIROS
// ==========================================
const WhyKairosSection = () => {
  return (
    <section className="py-24 bg-slate-50 text-slate-900 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <div className="text-slate-900 text-sm font-bold tracking-widest uppercase mb-4">THE PRODUCT BEHIND THE OPPORTUNITY</div>
          <h2 className="text-4xl font-bold font-syne mb-6 max-w-3xl mx-auto">Your Customers Already Have Cameras. KAIROS Makes Them Smarter.</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Traditional CCTV systems primarily record what has already happened. KAIROS is an AI Edge Box designed to add intelligent, real-time detection capabilities to compatible existing CCTV infrastructure.
          </p>
        </div>

        <div className="relative h-[800px] flex items-center justify-center mt-12">
           {/* Center Product */}
           <div className="absolute z-20 w-64 h-64 flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image src="/images/edgebox.png" alt="KAIROS AI Edge Box" fill className="object-contain drop-shadow-2xl" />
              </div>
           </div>
           
           {/* Orbits */}
           <div className="absolute w-[450px] h-[450px] border border-slate-300 rounded-full animate-[spin_30s_linear_infinite]" />
           <div className="absolute w-[750px] h-[750px] border border-slate-200 rounded-full animate-[spin_40s_linear_infinite_reverse]" />

           {/* Features positioned on orbits logically */}
           <div className="absolute z-30 w-[750px] h-[750px] animate-[spin_40s_linear_infinite_reverse]">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_40s_linear_infinite]">
               <div className="bg-white border border-slate-200 p-4 rounded-xl flex items-center gap-4 w-64 shadow-xl">
                 <div className="bg-slate-100 p-3 rounded-lg"><Flame className="text-slate-700 w-6 h-6" /></div>
                 <div><h4 className="font-bold text-sm text-slate-900">Fire Detection</h4><p className="text-xs text-slate-500">Identify potential fire events</p></div>
               </div>
             </div>
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 animate-[spin_40s_linear_infinite]">
               <div className="bg-white border border-slate-200 p-4 rounded-xl flex items-center gap-4 w-64 shadow-xl">
                 <div className="bg-slate-100 p-3 rounded-lg"><UserX className="text-slate-700 w-6 h-6" /></div>
                 <div><h4 className="font-bold text-sm text-slate-900">Intrusion Detection</h4><p className="text-xs text-slate-500">Detect unauthorised entry</p></div>
               </div>
             </div>
           </div>

           <div className="absolute z-30 w-[450px] h-[450px] animate-[spin_30s_linear_infinite]">
             <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_30s_linear_infinite_reverse]">
               <div className="bg-white border border-slate-200 p-4 rounded-xl flex items-center gap-4 w-64 shadow-xl">
                 <div className="bg-amber-50 p-3 rounded-lg"><Activity className="text-amber-500 w-6 h-6" /></div>
                 <div><h4 className="font-bold text-sm text-slate-900">Fall Detection</h4><p className="text-xs text-slate-500">Identify potential fall incidents</p></div>
               </div>
             </div>
             <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 animate-[spin_30s_linear_infinite_reverse]">
               <div className="bg-white border border-slate-200 p-4 rounded-xl flex items-center gap-4 w-64 shadow-xl">
                 <div className="bg-purple-50 p-3 rounded-lg"><Target className="text-purple-500 w-6 h-6" /></div>
                 <div><h4 className="font-bold text-sm text-slate-900">Weapon Detection</h4><p className="text-xs text-slate-500">Detect potential visible threats</p></div>
               </div>
             </div>
           </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-2xl font-syne font-medium text-slate-600">CCTV Records the Past. <span className="text-slate-900 font-bold">KAIROS Reads the Present.</span></p>
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
    <section className="py-24 bg-white text-slate-900">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-16 text-center">
          <div className="text-slate-900 text-sm font-bold tracking-widest uppercase mb-4">BUILT FOR PARTNER SUCCESS</div>
          <h2 className="text-4xl font-bold font-syne">More Than a Product. A Partnership Built for Growth.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 auto-rows-[200px]">
          {/* Large Card 1 */}
          <div className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-3xl p-10 relative overflow-hidden group shadow-md hover:shadow-xl transition-shadow">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100 rounded-full blur-[80px] group-hover:bg-slate-200 transition-all duration-700 pointer-events-none" />
            <div className="relative z-10 h-full flex flex-col justify-end">
              <IndianRupee className="w-12 h-12 text-slate-900 mb-6" />
              <h3 className="text-3xl font-bold font-syne mb-4 text-slate-900">20% Installation Commission</h3>
              <p className="text-slate-600 text-lg max-w-md">Earn 20% commission on every successful eligible KAIROS installation.</p>
            </div>
          </div>

          {/* Large Card 2 */}
          <div className="md:col-span-1 md:row-span-2 bg-gradient-to-bl from-white to-slate-50 border border-slate-200 rounded-3xl p-10 relative overflow-hidden group shadow-md hover:shadow-xl transition-shadow">
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-slate-100 rounded-full blur-[80px] group-hover:bg-slate-200 transition-all duration-700 pointer-events-none" />
            <div className="relative z-10 h-full flex flex-col justify-end">
              <Activity className="w-10 h-10 text-slate-900 mb-6" />
              <h3 className="text-2xl font-bold font-syne mb-4 text-slate-900">Recurring Revenue Opportunity</h3>
              <p className="text-slate-600">Unlock recurring commission potential through eligible active customer subscriptions.</p>
            </div>
          </div>

          {/* Small Cards */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 flex flex-col justify-center hover:bg-white hover:shadow-md transition-all">
            <h3 className="text-lg font-bold mb-2 text-slate-900">Sales & Marketing Support</h3>
            <p className="text-sm text-slate-600">Access brochures, presentations, and promotional creatives.</p>
          </div>
          
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 flex flex-col justify-center hover:bg-white hover:shadow-md transition-all">
            <h3 className="text-lg font-bold mb-2 text-slate-900">Product Training</h3>
            <p className="text-sm text-slate-600">Get structured onboarding to confidently present KAIROS.</p>
          </div>
          
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 flex flex-col justify-center hover:bg-white hover:shadow-md transition-all">
            <h3 className="text-lg font-bold mb-2 text-slate-900">Technical Assistance</h3>
            <p className="text-sm text-slate-600">Receive guidance for product understanding and deployment.</p>
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
    <section className="py-24 bg-slate-50 text-slate-900">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Who Can Join */}
        <div className="mb-24">
           <div className="text-center mb-12">
             <div className="text-slate-900 text-sm font-bold tracking-widest uppercase mb-4">BUILT FOR AMBITIOUS PARTNERS</div>
             <h2 className="text-3xl md:text-4xl font-bold font-syne max-w-3xl mx-auto">If You Understand Security, Technology, or Sales—There&apos;s an Opportunity to Grow.</h2>
           </div>
           <div className="flex flex-wrap justify-center gap-4">
              {partners.map((p, i) => (
                <div key={i} className="px-6 py-3 bg-white border border-slate-200 shadow-sm rounded-full text-slate-700 font-medium hover:border-slate-300 hover:text-slate-900 transition-colors cursor-default">
                  {p}
                </div>
              ))}
           </div>
        </div>

        {/* Industries */}
        <div>
           <div className="text-center mb-12">
             <div className="text-slate-900 text-sm font-bold tracking-widest uppercase mb-4">ONE PRODUCT. MULTIPLE MARKETS.</div>
             <h2 className="text-3xl md:text-4xl font-bold font-syne">Take Intelligent Security Across Industries.</h2>
           </div>
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industries.map((ind, i) => (
                <div key={i} className="group relative bg-white border border-slate-200 shadow-sm rounded-2xl p-8 hover:shadow-lg transition-all overflow-hidden">
                   <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                      <ind.icon className="w-32 h-32" />
                   </div>
                   <ind.icon className="w-8 h-8 text-slate-900 mb-6" />
                   <h3 className="text-xl font-bold mb-3 text-slate-900">{ind.title}</h3>
                   <p className="text-sm text-slate-600 relative z-10">{ind.desc}</p>
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
// 13. Final CTA
// ==========================================
const CtaSection = () => {
  return (
    <div className="relative bg-slate-50 pb-6 md:pb-8">
      <section className="py-24 md:py-32 px-6 relative overflow-hidden bg-[#111] rounded-[3rem] mx-2 md:mx-4 border border-white/5 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.05] mix-blend-overlay" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold font-syne mb-6 text-white tracking-tighter">One Installation Can Start Something Bigger.</h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-medium">
            Earn <strong className="text-white">20% commission on eligible KAIROS installations</strong> and unlock the opportunity for recurring commission through qualifying active customer subscriptions.
          </p>
          <Link href="/contact" className="inline-block bg-white text-black px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            Become a Vendor Partner
          </Link>
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
      <div className="min-h-screen bg-slate-50 font-sans">
        <HeroSection />
        <SocialProofSection />
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
