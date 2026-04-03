"use client";

import Image from "next/image";

const TESTIMONIALS = [
  {
    name: "Aham Gupta",
    role: "Graphic Designer",
    quote: "This product makes me feel very safe and secure!",
    avatar: "/images/testimonial-avatar.png",
  },
  {
    name: "Priya Sharma",
    role: "Software Engineer",
    quote: "The SOS feature saved my life during an emergency!",
    avatar: "/images/testimonial-avatar.png",
  },
  {
    name: "Rohan Verma",
    role: "Student",
    quote: "Voice commands make everything so convenient!",
    avatar: "/images/testimonial-avatar.png",
  },
  {
    name: "Anita Desai",
    role: "Teacher",
    quote: "I feel connected and protected at all times.",
    avatar: "/images/testimonial-avatar.png",
  },
  {
    name: "Vikram Singh",
    role: "Business Owner",
    quote: "Crash detection is a game changer for road safety!",
    avatar: "/images/testimonial-avatar.png",
  },
];

function TestimonialCard({ name, role, quote, avatar }: typeof TESTIMONIALS[number]) {
  return (
    <div className="flex items-center gap-4 bg-white/70 backdrop-blur-md border border-white/50 rounded-full px-6 py-4 shadow-sm shrink-0 min-w-[400px]">
      <p className="text-sm text-gray-700 font-medium leading-snug flex-1 text-center">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="w-px h-10 bg-gray-200 shrink-0"></div>
      <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md shrink-0">
        <Image
          src={avatar}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="shrink-0">
        <p className="text-sm font-bold text-gray-900">{name}</p>
        <p className="text-xs text-gray-500">{role}</p>
      </div>
    </div>
  );
}

export function TestimonialSlider() {
  // Double the array for seamless infinite scroll
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="w-full bg-linear-to-b from-[#e8f1fc] to-[#dbe9f9] py-16 md:py-20 overflow-hidden">
      <div className="relative w-full">
        {/* Scrolling track */}
        <div className="flex gap-6 animate-marquee">
          {doubled.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} {...t} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          width: max-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
