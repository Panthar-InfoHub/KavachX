"use client";

import Image from "next/image";
import { ArrowRight, Clock, ChevronRight } from "lucide-react";
import LenisDiv from "@/components/LenisDiv";
import FadeIn from "@/components/FadeIn";
import CTA from "@/components/cta";

const featuredPost = {
  title: "Redefining Edge AI: How KAIROS Achieves Zero-Latency Processing",
  excerpt: "In the critical moments of an emergency, every millisecond counts. Discover how the engineering team at KavachX eliminated cloud latency to process massive video feeds directly on the edge.",
  category: "Engineering",
  date: "October 12, 2025",
  readTime: "8 min read",
  image: "/images/Business Owners.jpeg",
};

const recentPosts = [
  {
    id: 1,
    title: "The Architecture of Trust: Securing Personal Data in Suraksha Kavach",
    excerpt: "A deep dive into our end-to-end encryption protocols and how we guarantee user privacy while providing real-time location tracking.",
    category: "Security",
    date: "September 28, 2025",
    readTime: "6 min read",
    image: "/images/Intrusion Detection.png",
  },
  {
    id: 2,
    title: "Announcing Our $15M Series A to Expand Intelligent Safety Infrastructure",
    excerpt: "We are thrilled to announce our latest funding round led by top venture firms, accelerating our mission to protect millions of households.",
    category: "Company News",
    date: "September 15, 2025",
    readTime: "4 min read",
    image: "/images/Fire & Smoke Detection.png",
  },
  {
    id: 3,
    title: "Building Resilient IoT Systems for Unpredictable Environments",
    excerpt: "From extreme temperatures to inconsistent power supply, here's how we engineered the KAIROS box to survive and thrive anywhere.",
    category: "Engineering",
    date: "August 30, 2025",
    readTime: "10 min read",
    image: "/images/factory.jpeg",
  },
];

export default function BlogClient() {
  return (
    <LenisDiv>
      <div className="min-h-screen bg-[#FBFBFD] w-full overflow-hidden text-slate-900 pb-32">
        
        {/* Minimalist Hero (Light Theme) */}
        <section className="relative w-full pt-40 pb-20 px-4 md:px-[5%]">
          <div className="max-w-7xl mx-auto">
            <FadeIn direction="up">
              <div className="inline-flex items-center gap-2 mb-8">
                <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                <span className="text-sm font-semibold tracking-widest uppercase text-black">KavachX Journal</span>
              </div>
              <h1 className="font-syne text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-black mb-8 leading-[0.9]">
                Insights &amp; <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-br from-black to-slate-400">Intelligence</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-500 font-light max-w-3xl leading-relaxed">
                Engineering deep dives, security updates, and stories from the frontline of intelligent safety infrastructure.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Content Section (Full Light Theme Minimalist List) */}
        <div className="relative z-20 w-full">
          
          <div className="max-w-7xl mx-auto px-4 md:px-[5%]">
            
            {/* Featured Post (Massive Image Layout) */}
            <FadeIn direction="up" delay={0.2}>
              <div className="group cursor-pointer mb-32">
                <div className="relative w-full h-[50vh] min-h-[400px] md:h-[70vh] rounded-[2rem] overflow-hidden mb-10 bg-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
                  <Image 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
                <div className="max-w-4xl">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-slate-900 text-sm font-bold tracking-widest uppercase">
                      {featuredPost.category}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500 text-sm font-medium">{featuredPost.date}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500 text-sm font-medium flex items-center gap-1.5">
                      <Clock className="w-4 h-4" /> {featuredPost.readTime}
                    </span>
                  </div>
                  <h2 className="font-syne text-4xl md:text-6xl font-bold text-black leading-tight mb-6 tracking-tight transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-xl text-slate-600 font-light leading-relaxed mb-8 max-w-3xl">
                    {featuredPost.excerpt}
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* List Layout for Recent Articles */}
            <div className="border-t border-slate-200 pt-16">
              <FadeIn direction="up">
                <div className="flex items-end justify-between mb-12">
                  <h3 className="font-syne text-3xl font-bold text-black tracking-tight">
                    Recent Articles
                  </h3>
                </div>
              </FadeIn>

              <div className="flex flex-col">
                {recentPosts.map((post, index) => (
                  <FadeIn key={post.id} direction="up" delay={0.1 * index}>
                    <article className="group cursor-pointer border-b border-slate-200 py-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 hover:bg-slate-50 transition-colors -mx-4 px-4 md:-mx-8 md:px-8 rounded-2xl">
                      
                      <div className="flex-1 max-w-4xl">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-slate-900 text-xs font-bold tracking-widest uppercase">
                            {post.category}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="text-slate-500 text-xs font-medium">{post.date}</span>
                        </div>
                        <h4 className="font-syne text-2xl md:text-4xl font-bold text-black leading-[1.2] tracking-tight transition-colors mb-4">
                          {post.title}
                        </h4>
                        <p className="text-lg text-slate-500 font-light leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="relative w-full lg:w-[280px] h-[180px] rounded-2xl overflow-hidden bg-slate-100 shrink-0 shadow-lg shadow-black/5">
                        <Image 
                          src={post.image}
                          alt={post.title}
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      
                    </article>
                  </FadeIn>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
      
      {/* Global CTA at the bottom */}
      <div className="bg-white relative z-30">
        <CTA />
      </div>
    </LenisDiv>
  );
}
