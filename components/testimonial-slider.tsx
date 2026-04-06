"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    name: "Aham Gupta",
    role: "Graphic Designer",
    quote: "This product makes me feel very safe and secure!",
    avatar: "/testimonial/user_1.png",
  },
  {
    name: "Priya Sharma",
    role: "Software Engineer",
    quote: "The SOS feature saved my life during an emergency!",
    avatar: "/testimonial/user_1.png",
  },
  {
    name: "Rohan Verma",
    role: "Student",
    quote: "Voice commands make everything so convenient!",
    avatar: "/testimonial/user_1.png",
  },
  {
    name: "Anita Desai",
    role: "Teacher",
    quote: "I feel connected and protected at all times.",
    avatar: "/testimonial/user_1.png",
  },
  {
    name: "Vikram Singh",
    role: "Business Owner",
    quote: "Crash detection is a game changer for road safety!",
    avatar: "/testimonial/user_1.png",
  },
];

function TestimonialCard({ name, role, quote, avatar }: typeof TESTIMONIALS[number]) {
  return (
    <div className="relative flex items-center shrink-0 pl-3 pr-10 py-3 rounded-full border-[1.5px] border-[#7ec4f0] bg-white/20 backdrop-blur-sm w-[540px] h-[130px] gap-5">
      {/* Avatar — large circle */}
      <div className="relative w-[95px] h-[95px] rounded-full overflow-hidden border-[3px] border-[#b8ddf5] shadow-md shrink-0 bg-[#e8d5c4]">
        <Image
          src={avatar}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      {/* Name & Role */}
      <div className="shrink-0 min-w-[100px]">
        <p className="text-[15px] font-bold text-gray-900 leading-tight">{name}</p>
        <p className="text-xs text-gray-500 mt-0.5">{role}</p>
      </div>

      {/* Vertical Divider */}
      <div className="w-[2px] h-12 bg-gray-300/60 shrink-0 rounded-full"></div>

      {/* Quote */}
      <p className="text-sm font-semibold text-gray-800 leading-snug text-center max-w-[200px]">
        &ldquo;{quote}&rdquo;
      </p>
    </div>
  );
}

export function TestimonialSlider() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];
  const totalWidth = doubled.length * (540 + 24); // card width + gap

  return (
    <section className="relative w-full mb-36">
      <div
        className="absolute -inset-40 z-0 pointer-events-none bg-[#0D99FF80] blur-[350px]"
      />
      <div className="relative w-full">
        <motion.div
          className="flex gap-6"
          animate={{ x: [0, -(totalWidth / 2)] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {doubled.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} {...t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
