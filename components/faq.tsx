"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { trackEvent } from "@/lib/analytics";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is Suraksha Kavach and how does it keep me safe?",
    answer: "Suraksha Kavach is a smart safety app by Kavach X that protects you in emergencies. With one tap, it alerts your trusted contacts, shares your location, and activates safety features like SOS alerts and crash detection. Your personal safety shield is always on and ready.",
  },
   {
    question: "What is Kairos?",
    answer: "Kairos is an AI-powered video intelligence platform that helps you search, understand, and analyze CCTV footage using natural language—making it easier to find specific incidents, people, objects, or activities without manually watching hours of video.",
  },
  {
    question: "Does Suraksha Kavach work without an internet connection?",
    answer: "Yes. Suraksha Kavach is built with offline functionality so your safety is never dependent on a strong internet signal. Even in low-connectivity or no-network areas, the app can still send alerts and share your location with your emergency contacts — because emergencies don't wait for Wi-Fi.",
  },
  {
    question: "How does Kairos work with my existing CCTV cameras?",
    answer: "Kairos is designed to work with your existing CCTV infrastructure. It can connect with your NVR and edge devices to process and analyze video footage while securely storing relevant data for investigation and retrieval.",
  },
  {
    question: "How does the crash detection feature work?",
    answer: "Suraksha Kavach uses intelligent sensors to automatically detect sudden impact or abnormal movement patterns associated with a road accident. When a crash is detected, the app immediately triggers an SOS alert and shares your real-time location with your pre-set emergency contacts — without you needing to do anything. It acts fast, so help can reach you even if you're unable to respond.",
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
          ? "bg-[#161619] border-white/20 shadow-lg shadow-black/40"
          : "bg-[#121214] border-[#222226] hover:border-[#38383e] hover:bg-[#161619]"
      }`}
    >
      <button
        type="button"
        className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center gap-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-2xl group"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="shrink-0 text-gray-400 group-hover:text-white transition-colors">
          <motion.svg
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </motion.svg>
        </div>

        <h3 className="text-sm sm:text-base font-medium text-white transition-colors duration-200 leading-snug">
          {faq.question}
        </h3>
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
            <div className="px-5 sm:px-6 pb-5 pt-0 border-t border-white/5">
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed pt-3.5">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Faq({ className = "" }: { className?: string }) {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section className={`w-full bg-black py-12 md:py-16 px-4 sm:px-6 md:px-8 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl text-center font-medium text-white mb-10 sm:mb-14">
          Frequently Asked Questions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            {faqs.filter((_, idx) => idx % 2 === 0).map((faq, idx) => {
              const originalIdx = idx * 2;
              return (
                <FaqItemCard
                  key={originalIdx}
                  faq={faq}
                  isOpen={openId === originalIdx}
                  onToggle={() => {
                    const nextOpen = openId === originalIdx ? null : originalIdx;
                    setOpenId(nextOpen);
                    if (nextOpen !== null) {
                      trackEvent({
                        name: "faq_toggle",
                        params: {
                          faq_question: faq.question,
                          faq_section: "homepage_faq",
                        },
                      });
                    }
                  }}
                />
              );
            })}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4">
            {faqs.filter((_, idx) => idx % 2 !== 0).map((faq, idx) => {
              const originalIdx = idx * 2 + 1;
              return (
                <FaqItemCard
                  key={originalIdx}
                  faq={faq}
                  isOpen={openId === originalIdx}
                  onToggle={() => {
                    const nextOpen = openId === originalIdx ? null : originalIdx;
                    setOpenId(nextOpen);
                    if (nextOpen !== null) {
                      trackEvent({
                        name: "faq_toggle",
                        params: {
                          faq_question: faq.question,
                          faq_section: "homepage_faq",
                        },
                      });
                    }
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

