"use client";

import { motion } from "framer-motion";

export function TestimonialStrip() {
  const testimonials = [
    {
      text: "This product makes me feel very safe and secure\"",
      author: "Aham Gupta",
      title: "Graphic designer",
      avatarBg: "bg-orange-200"
    },
    {
      text: "This product makes me feel very safe and secure\"",
      author: "Aham Gupta",
      title: "Graphic designer",
      avatarBg: "bg-orange-200"
    },
    {
      text: "This product makes me feel very safe and secure\"",
      author: "Aham Gupta",
      title: "Graphic designer",
      avatarBg: "bg-orange-200"
    }
  ];

  return (
    <div className="w-full relative py-8 overflow-hidden flex z-30 font-syne mt-12 mb-8">
      <div className="flex items-center justify-start md:justify-center gap-4 md:gap-6 overflow-x-auto no-scrollbar w-full px-6 flex-nowrap pb-4">
        {testimonials.map((t, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center gap-4 md:gap-6 border border-blue-300/80 bg-linear-to-r from-[#eef6ff] to-[#e4f0ff] pl-3 md:pl-4 pr-6 md:pr-8 py-3 rounded-full min-w-max shadow-md shadow-blue-900/5 whitespace-nowrap"
          >
            {/* Left: Avatar & Info */}
            <div className="flex items-center gap-3 md:gap-4 shrink-0 border-r border-blue-200/80 pr-4 md:pr-6">
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${t.avatarBg} shrink-0 bg-[url('https://i.pravatar.cc/100?img=11')] bg-cover bg-center shadow-sm`}></div>
              <div className="flex flex-col items-start justify-center">
                <span className="text-[15px] font-bold text-black tracking-tight">{t.author}</span>
                <span className="text-[11px] text-gray-500 tracking-wider font-sans">{t.title}</span>
              </div>
            </div>
            {/* Right: Quote */}
            <span className="text-[15px] font-medium text-black tracking-tight shrink-0 font-sans">
              "{t.text}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
