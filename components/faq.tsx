"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is Kairos?",
    answer: "Kairos is an AI-powered video intelligence platform that helps you search, understand, and analyze CCTV footage using natural language—making it easier to find specific incidents, people, objects, or activities without manually watching hours of video.",
  },
  {
    question: "How does Kairos work with my existing CCTV cameras?",
    answer: "Kairos is designed to work with your existing CCTV infrastructure. It can connect with your NVR and edge devices to process and analyze video footage while securely storing relevant data for investigation and retrieval.",
  },
  {
    question: "How can I find a specific incident in hours of CCTV footage?",
    answer: "Simply describe what you’re looking for in natural language—for example, “Find the person who entered the warehouse around 2 PM wearing a red shirt.” Kairos analyzes the footage and helps identify the relevant time and video segment, significantly reducing investigation time.",
  },
];

const FaqItemCard = ({ faq, isOpen, onToggle }: { faq: FAQItem; isOpen: boolean; onToggle: () => void }) => {
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? "bg-[#161616] border-white/20 shadow-lg shadow-black/40"
          : "bg-[#111111] border-[#2a2a2a] hover:border-[#444444] hover:bg-[#141414]"
      }`}
    >
      <button
        type="button"
        className="w-full text-left px-6 py-6 flex items-start justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-2xl"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <h3 className="text-base sm:text-lg font-medium text-white transition-colors duration-200 pr-2">
          {faq.question}
        </h3>
        <div className="mt-0.5 shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-white/5 border border-white/10 text-gray-300 transition-colors">
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0 border-t border-white/5">
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed pt-4">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Faq() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section className="w-full bg-black py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl text-center font-medium text-white mb-12 sm:mb-16">
          Frequently Asked Questions
        </h2>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => (
            <FaqItemCard
              key={idx}
              faq={faq}
              isOpen={openId === idx}
              onToggle={() => setOpenId(openId === idx ? null : idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

