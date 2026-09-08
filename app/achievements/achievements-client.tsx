"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, AnimatePresence } from "motion/react";
import { MapPin, Navigation, Compass, Crosshair, Target, ShieldCheck, Zap } from "lucide-react";
import LenisDiv from "@/components/LenisDiv";
import FadeIn from "@/components/FadeIn";
import CTA from "@/components/cta";
import ParticleObject from "@/components/canvasui/ParticleObject";
import { cn } from "@/lib/utils";

const TIMELINE_DATA = [
  {
    id: 1,
    // year: "",
    // coords: "26.5123° N, 80.2329° E",
    title: "Youngest CEO of IT Company",
    description: "His entrepreneurial journey began at a young age, focusing on technology, AI-driven solutions, and public safety innovations, including the development of Suraksha Kawach.",
    src: "/Achivements/news paper 2.png",
    icon: Compass,
  },
  {
    id: 2,
    // year: "Phase II",
    // coords: "Research Sector 7",
    title: "International World of Records",
    description: "Kavach X (Kavach AI) has been honored with the prestigious International World of Records Award for its innovative contributions to safety and technology.",
   src: "/Achivements/world record-1.png",
    icon: Target,
  },
  {
    id: 3,
    // year: "Phase III",
    // coords: "Deployment Alpha",
    title: "Bundelkhand Hackathon Runner-Up",
    description: "Secured the Runner-Up position at the prestigious Bundelkhand Hackathon, showcasing excellence in innovation and technology.",
    src: "/Achivements/runner-up.jpg",
    icon: Zap,
  },
  {
    id: 4,
    // year: "Phase IV",
    // coords: "Industry Accolades",
    title: "Invited by Google",
    description: "Invited By Google India Office for collaboration with suraksha kavach"  ,
    src: "/Achivements/google.webp",
    icon: Navigation,
  },
  {
    id: 5,
    // year: "Phase V",
    // coords: "Scale 100K",
    title: "Visit IIT Kanpur",
    description: "Suraksha Kavach visited IIT Kanpur for collaboration with IIT Kanpur",
    src: "/Achivements/iit.jpeg",
    icon: ShieldCheck,
  },
  {
    id: 6,
    // year: "Phase VI",
    // coords: "Global Expansion",
    title: "Raise a Investment from Russian investors",
    description: "Successfully raised a investment from Russian investors",
    src: "/Achivements/investment.webp",
    icon: MapPin,
  }
];

// Generates the winding SVG path based on number of items
function generateWindingPath(itemCount: number) {
  // viewBox is 0 0 100 100
  let d = "M 50 0 ";
  const step = 100 / itemCount;
  for (let i = 0; i < itemCount; i++) {
    const startY = i * step;
    const endY = (i + 1) * step;
    // Alternate curving left and right
    const curveX = i % 2 === 0 ? 80 : 20;
    d += `C ${curveX} ${startY + step / 4}, ${curveX} ${endY - step / 4}, 50 ${endY} `;
  }
  return d;
}

export default function AchievementsClient() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const logoX = useMotionValue(50);
  const logoY = useMotionValue(0);

  useEffect(() => {
    document.body.classList.add("bg-[#FBFBFD]", "text-slate-900");
    document.body.classList.remove("bg-black", "text-white");
    return () => {
      document.body.classList.remove("bg-[#FBFBFD]", "text-slate-900");
      document.body.classList.add("bg-black", "text-white");
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end 70%"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  // Track the SVG path length to move the logo
  useEffect(() => {
    return pathLength.on("change", (latest) => {
      if (pathRef.current) {
        try {
          const length = pathRef.current.getTotalLength();
          const point = pathRef.current.getPointAtLength(latest * length);
          logoX.set(point.x);
          logoY.set(point.y);
        } catch (e) {
          // Ignore errors in environments where SVG methods might fail initially
        }
      }
    });
  }, [pathLength, logoX, logoY]);

  const svgPathD = generateWindingPath(TIMELINE_DATA.length);
  const logoLeft = useMotionTemplate`${logoX}%`;
  const logoTop = useMotionTemplate`${logoY}%`;

  return (
    <>
    <LenisDiv>
      <div className="bg-[#F0F2F5] min-h-screen font-jakarta selection:bg-slate-900 selection:text-white overflow-hidden relative">

        {/* TOPOGRAPHICAL BACKGROUND */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.15]">
          <div className="absolute inset-0"
            style={{
              backgroundImage: `
                repeating-radial-gradient(circle at 0% 0%, transparent 0, transparent 40px, rgba(15, 23, 42, 0.4) 40px, rgba(15, 23, 42, 0.4) 41px),
                repeating-radial-gradient(circle at 100% 100%, transparent 0, transparent 40px, rgba(15, 23, 42, 0.4) 40px, rgba(15, 23, 42, 0.4) 41px)
              `,
              backgroundSize: '100% 100%'
            }}
          />
        </div>

        <div className="fixed inset-0 pointer-events-none z-0 opacity-20 blog-grid-pattern" />

        {/* Map UI Accents (Corners) */}
        <div className="fixed top-24 left-8 text-[10px] font-mono text-slate-400 opacity-60 z-10 tracking-widest hidden md:block">LAT 26.5123° N <br /> LON 80.2329° E</div>
        <div className="fixed top-24 right-8 opacity-60 z-10 hidden md:block"><Crosshair className="w-6 h-6 text-slate-400 animate-[spin_10s_linear_infinite]" /></div>

        {/* Hero Section */}
        <section className="relative z-10 pt-32 md:pt-40 pb-4 px-4 md:px-[5%] flex flex-col items-center text-center">
          <FadeIn direction="up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 backdrop-blur-md border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-6">
              <Compass className="w-4 h-4 text-slate-900 animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase text-slate-800">Expedition Log</span>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <h1 className="font-syne text-5xl md:text-7xl lg:text-[7rem] font-bold tracking-tighter mb-6 text-slate-900 leading-[0.9]">
              Mapping Our<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-600 to-slate-400">Journey.</span>
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className="max-w-2xl text-lg md:text-xl text-slate-600 font-light mb-8 leading-relaxed">
              Trace the coordinates of our mission. From the incubation labs to global expansion, explore the terrain of KavachX's evolution.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.3}>
            <div className="w-full max-w-xl mx-auto h-[150px] md:h-[200px] relative pointer-events-auto -mt-4">
              <ParticleObject
                className="w-full h-full"
                src="/images/logo.png"
                scale={4.5}
                cameraDistance={4}
                color="#0f172a"
                background=""
              />
            </div>
          </FadeIn>
        </section>

        {/* The Map Timeline */}
        <section className="relative z-10 px-4 md:px-[5%] max-w-7xl mx-auto pt-0 pb-20 -mt-10" ref={containerRef}>

          {/* SVG Winding Route Background */}
          <div className="absolute inset-y-0 left-8 md:left-0 md:right-0 pointer-events-none z-0 flex justify-center w-12 md:w-full">
            <svg
              className="w-full h-full drop-shadow-md"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{ overflow: 'visible' }}
            >
              {/* Dashed background path */}
              <path
                d={svgPathD}
                fill="none"
                stroke="rgba(15, 23, 42, 0.15)"
                strokeWidth="2"
                strokeDasharray="4 4"
                vectorEffect="non-scaling-stroke"
              />
              {/* Glowing animated path */}
              <motion.path
                ref={pathRef}
                d={svgPathD}
                fill="none"
                stroke="url(#mono-grad)"
                strokeWidth="4"
                vectorEffect="non-scaling-stroke"
                style={{ pathLength }}
                className="filter drop-shadow-[0_0_8px_rgba(15,23,42,0.4)]"
              />
              <defs>
                <linearGradient id="mono-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0f172a" />
                  <stop offset="50%" stopColor="#475569" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
              </defs>
            </svg>

            {/* The Moving KavachX Logo */}
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2 z-30 bg-black rounded-full px-4 py-2 shadow-[0_0_20px_rgba(15,23,42,0.6)] border border-slate-700 flex items-center justify-center pointer-events-none transition-opacity duration-300"
              style={{ left: logoLeft, top: logoTop }}
            >
              <img src="/images/logo.png" alt="KavachX" className="h-4 md:h-5 w-auto object-contain" />
            </motion.div>
          </div>

          <div className="flex flex-col gap-24 md:gap-32 relative z-10">
            {TIMELINE_DATA.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <TimelineItem
                  key={item.id}
                  data={item}
                  isEven={isEven}
                  onImageClick={() => setSelectedImage(item.src)}
                />
              );
            })}
          </div>
        </section>

        {/* Call To Action - Floating Card to seamlessly transition to global dark footer */}
        <div className="mt-20 px-4 md:px-8 pb-10 relative z-20">
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 max-w-7xl mx-auto">
            <CTA />
          </div>
        </div>
      </div>
    </LenisDiv>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage}
              className="max-w-[95vw] max-h-[95vh] object-contain rounded-xl shadow-2xl"
              alt="Achievement Full View"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function TimelineItem({ data, isEven, onImageClick }: { data: any, isEven: boolean, onImageClick?: () => void }) {
  const Icon = data.icon;

  return (
    <div className={cn(
      "relative flex items-center justify-between md:justify-normal w-full group",
      isEven ? "md:flex-row-reverse" : "md:flex-row"
    )}>
      <div className="hidden md:block w-[45%]" />

      {/* Glassmorphism Content Card */}
      <div className={cn(
        "w-[calc(100%-4rem)] md:w-[45%] pl-12 md:pl-0 relative mx-auto",
        isEven ? "text-left md:text-right" : "text-left"
      )}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -50 : 50, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-white/60 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] hover:shadow-[0_20px_40px_rgba(15,23,42,0.12)] transition-all duration-500 mt-6"
        >
          {/* Stick Pin (Top Middle of Card) */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 flex items-center justify-center z-30 drop-shadow-md">
            {/* The physical 'pin' head */}
            <div className="absolute top-1 w-6 h-6 rounded-full bg-gradient-to-b from-red-500 to-red-700 border border-red-800 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.3),0_4px_6px_rgba(0,0,0,0.3)] flex items-center justify-center z-10">
              <div className="w-2 h-2 rounded-full bg-white/60 -mt-2 -ml-2" />
            </div>
            {/* The 'needle' going into the paper */}
            <div className="absolute top-6 w-[2px] h-3 bg-slate-600 rounded-b-full shadow-sm z-0" />
          </div>

          {/* Map Coordinate Accent */}
          <div className={cn(
            "flex items-center gap-2 mb-4 mt-2 opacity-60 font-mono text-[10px] tracking-widest text-slate-600 uppercase",
            isEven && "md:justify-end"
          )}>
            <Icon className="w-3 h-3" />
            <span>{data.coords}</span>
          </div>

          <div className={cn(
            "inline-block px-3 py-1 bg-slate-900/5 border border-slate-900/10 rounded-full text-xs font-bold tracking-wider text-slate-900 mb-4",
          )}>
            {data.year}
          </div>

          <h3 className="font-syne text-2xl md:text-3xl font-bold text-slate-900 mb-3">{data.title}</h3>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">{data.description}</p>

          <div 
            className="overflow-hidden rounded-2xl relative border border-white/50 cursor-zoom-in bg-slate-50/50"
            onClick={onImageClick}
          >
            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
            <img
              src={data.src}
              alt={data.title}
              className="w-full h-auto max-h-[400px] object-contain transform group-hover:scale-[1.02] transition-transform duration-1000 ease-out"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80";
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

