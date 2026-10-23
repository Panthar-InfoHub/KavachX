"use client";

import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

interface GalleryImage {
  src: string;
  title: string;
  description: string;
  category: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1504198458649-3128b932f49e?auto=format&fit=crop&w=600&q=80",
    title: "Tech Excellence Award",
    description: "Recognized at the National Innovation Summit for breakthrough AI detection capabilities.",
    category: "Award",
  },
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    title: "Rising Star Recognition",
    description: "Honoured as one of India's fastest-growing safety-tech startups.",
    category: "Recognition",
  },
  {
    src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
    title: "Safety Innovation Prize",
    description: "Awarded for the KAIROS edge box's real-time threat detection in under 5 seconds.",
    category: "Innovation",
  },
  {
    src: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80",
    title: "Community Impact Award",
    description: "Protecting over 100,000 households across India with smart security solutions.",
    category: "Milestone",
  },
  {
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
    title: "Best Product Launch",
    description: "Suraksha Kavach named best IoT product launch of the year at TechFest India.",
    category: "Award",
  },
  {
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    title: "Women Safety Champion",
    description: "Recognized for our gesture-based SOS alert system that empowers women's safety.",
    category: "Recognition",
  },
  {
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    title: "Gov-Tech Innovator",
    description: "Top 10 Gov-Tech Innovator for seamless integration with law enforcement systems.",
    category: "Recognition",
  },
  {
    src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
    title: "Enterprise Expansion",
    description: "Successfully expanded KavachX infrastructure to 5 international markets in 2026.",
    category: "Milestone",
  },
  {
    src: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=600&q=80",
    title: "Smart City Partner",
    description: "Selected as the official security infrastructure partner for 3 smart city projects.",
    category: "Partnership",
  },
  {
    src: "https://images.unsplash.com/photo-1550614000-4b95d4ed798a?auto=format&fit=crop&w=600&q=80",
    title: "AI Research Grant",
    description: "Received a prestigious AI research grant to further develop edge-based threat models.",
    category: "Grant",
  },
  {
    src: "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=600&q=80",
    title: "Fastest B2B Growth",
    description: "Ranked #1 in year-over-year B2B growth among security infrastructure providers.",
    category: "Milestone",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    title: "Startup of the Year",
    description: "Named Startup of the Year by RAMP for transforming personal safety with AI.",
    category: "Award",
  },
  {
    src: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80",
    title: "IIT Kanpur Incubation",
    description: "Incubated at IIT Kanpur's premier technology startup accelerator program.",
    category: "Incubation",
  },
  {
    src: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80",
    title: "Media Spotlight",
    description: "Featured in Aaj Tak, News18, and Dainik Jagran for revolutionising home security.",
    category: "Press",
  },
];

const categoryColors: Record<string, string> = {
  Award: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Recognition: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Innovation: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Milestone: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Partnership: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  Grant: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  Incubation: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  Press: "bg-slate-500/20 text-slate-300 border-slate-500/30",
};

interface ImageCardProps {
  image: GalleryImage;
}

const ImageCard = ({ image }: ImageCardProps) => (
  <div className="w-full aspect-[3/4] flex-shrink-0 overflow-hidden rounded-2xl bg-[#111] group cursor-pointer relative">
    {/* Image */}
    <img
      src={image.src}
      alt={image.title}
      loading="lazy"
      className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
    />

    {/* Hover Overlay — slides up from bottom */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out" />

    {/* Content — slides up on hover */}
    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out">
      {/* Category badge */}
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border mb-3 ${
          categoryColors[image.category] ?? "bg-white/10 text-white/70 border-white/20"
        }`}
      >
        {image.category}
      </span>

      {/* Title */}
      <h3 className="text-white font-syne font-bold text-lg leading-snug mb-2 drop-shadow-lg">
        {image.title}
      </h3>

      {/* Description */}
      <p className="text-white/70 text-xs leading-relaxed font-light line-clamp-3">
        {image.description}
      </p>
    </div>

    {/* Subtle top shine on hover */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06)_0%,transparent_60%)]" />
  </div>
);

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const colMedia = useMemo(() => {
    const c1 = GALLERY_IMAGES.filter((_, i) => i % 4 === 0);
    const c2 = GALLERY_IMAGES.filter((_, i) => i % 4 === 1);
    const c3 = GALLERY_IMAGES.filter((_, i) => i % 4 === 2);
    const c4 = GALLERY_IMAGES.filter((_, i) => i % 4 === 3);
    return {
      col1: [...c1, ...c1],
      col2: [...c2, ...c2],
      col3: [...c3, ...c3],
      col4: [...c4, ...c4],
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 20, mass: 0.5 });

  const yCol1 = useTransform(smooth, [0, 1], ["0%", "-25%"]);
  const yCol2 = useTransform(smooth, [0, 1], ["-15%", "15%"]);
  const yCol3 = useTransform(smooth, [0, 1], ["0%", "-25%"]);
  const yCol4 = useTransform(smooth, [0, 1], ["-10%", "20%"]);

  const rotateX = useTransform(smooth, [0, 0.5, 1], [15, 5, 0]);
  const rotateY = useTransform(smooth, [0, 0.5, 1], [-20, -8, 0]);
  const rotateZ = useTransform(smooth, [0, 0.5, 1], [8, 3, 0]);
  const scale = useTransform(smooth, [0, 0.5, 1], [0.75, 0.9, 1]);

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-[70vh] overflow-hidden bg-[#050505] py-16"
    >
      {/* Edge fade vignette */}
      <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_80px_100px_-30px_rgba(5,5,5,1),inset_0_-80px_100px_-30px_rgba(5,5,5,1),inset_120px_0_100px_-30px_rgba(5,5,5,1),inset_-120px_0_100px_-30px_rgba(5,5,5,1)]" />

      {/* 3D perspective wrapper */}
      <div style={{ perspective: "1200px" }} className="w-full h-full">
        <motion.div
          style={{
            rotateX,
            rotateY,
            rotateZ,
            scale,
            transformStyle: "preserve-3d",
          }}
          className="flex gap-4 md:gap-5 w-full px-4 md:px-8 origin-center"
        >
          {/* Column 1 */}
          <motion.div style={{ y: yCol1 }} className="flex flex-col gap-4 md:gap-5 flex-1 min-w-0">
            {colMedia.col1.map((img, i) => (
              <ImageCard key={`c1-${i}`} image={img} />
            ))}
          </motion.div>

          {/* Column 2 */}
          <motion.div style={{ y: yCol2 }} className="flex flex-col gap-4 md:gap-5 flex-1 min-w-0 mt-12">
            {colMedia.col2.map((img, i) => (
              <ImageCard key={`c2-${i}`} image={img} />
            ))}
          </motion.div>

          {/* Column 3 */}
          <motion.div style={{ y: yCol3 }} className="hidden md:flex flex-col gap-4 md:gap-5 flex-1 min-w-0">
            {colMedia.col3.map((img, i) => (
              <ImageCard key={`c3-${i}`} image={img} />
            ))}
          </motion.div>

          {/* Column 4 */}
          <motion.div style={{ y: yCol4 }} className="hidden md:flex flex-col gap-4 md:gap-5 flex-1 min-w-0 mt-16">
            {colMedia.col4.map((img, i) => (
              <ImageCard key={`c4-${i}`} image={img} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
