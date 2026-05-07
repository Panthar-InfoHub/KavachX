"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqsLeft: FAQItem[] = [
  {
    question: "What is Suraksha Kavach and how does it keep me safe?",
    answer: "Suraksha Kavach is a smart safety app by Kavach X that protects you in emergencies. With one tap, it alerts your trusted contacts, shares your location, and activates safety features like SOS alerts and crash detection. Your personal safety shield is always on and ready.",
  },
  {
    question: "Does Suraksha Kavach work without an internet connection?",
    answer: "Yes. Suraksha Kavach is built with offline functionality so your safety is never dependent on a strong internet signal. Even in low-connectivity or no-network areas, the app can still send alerts and share your location with your emergency contacts — because emergencies don't wait for Wi-Fi.",
  },
  {
    question: "When will the AI Edge Box be available and how can I stay updated?",
    answer: "The Kavach AI Edge Box is currently in its final stages and will be launching soon. It's an intelligent home security device powered by AI-driven edge computing, real-time CCTV analytics, and smart surveillance — designed to keep your home and loved ones safe from anywhere in the world. To be among the first to know when it launches, click 'Stay Tuned' on our AI Edge Box page and we'll notify you the moment it's live.",
  }
];

const faqsRight: FAQItem[] = [
  {
    question: "How does the crash detection feature work?",
    answer: "Suraksha Kavach uses intelligent sensors to automatically detect sudden impact or abnormal movement patterns associated with a road accident. When a crash is detected, the app immediately triggers an SOS alert and shares your real-time location with your pre-set emergency contacts — without you needing to do anything. It acts fast, so help can reach you even if you're unable to respond.",
  },
  {
    question: "Who receives my SOS alert and what information is shared with them?",
    answer: "You are fully in control. Before using the app, you set up your own list of trusted emergency contacts — family members, friends, or anyone you choose. When an SOS is triggered, only those contacts receive an alert along with your real-time location. No data is shared with strangers or third parties without your consent. Your safety, your circle, your control.",
  },
  {
    question: "Is my location and personal data private and secure with Kavach X?",
    answer: "Absolutely. Kavach X is built on a foundation of strong security and user privacy. Your location data is only shared with the trusted contacts you personally configure — never sold, never exposed. We follow strict data protection practices to ensure your personal information stays private at all times. Your trust is the most important feature we protect.",
  }
];

const FaqItemCard = ({ faq, isOpen, onToggle }: { faq: FAQItem, isOpen: boolean, onToggle: () => void }) => {
  return (
    <div className="bg-[#111111] rounded-[16px] overflow-hidden border border-[#333333] transition-all duration-300 cursor-pointer">
      <button
        className="w-full text-left px-6 py-6 flex items-start gap-5 focus:outline-none"
        onClick={onToggle}
      >
        <div className="mt-0.5 shrink-0">
          {isOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#888]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
          ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#888]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
            </svg>
          )}
        </div>
        <div className="flex-1">
          <h3 className={`text-base md:text-lg font-medium transition-colors duration-200 text-white`}>
            {faq.question}
          </h3>
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="text-gray-500 text-sm md:text-base leading-relaxed pr-4">
                  {faq.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </button>
    </div>
  );
};

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="w-full bg-black py-24 px-4 md:px-8"> 
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl text-center font-medium text-white mb-16">
          Frequently Asked Questions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div className="flex flex-col gap-4">
            {faqsLeft.map((faq, idx) => {
              const id = `left-${idx}`;
              return (
                <FaqItemCard 
                  key={id} 
                  faq={faq} 
                  isOpen={openId === id} 
                  onToggle={() => setOpenId(openId === id ? null : id)} 
                />
              );
            })}
          </div>

          <div className="flex flex-col gap-4">
            {faqsRight.map((faq, idx) => {
              const id = `right-${idx}`;
              return (
                <FaqItemCard 
                  key={id} 
                  faq={faq} 
                  isOpen={openId === id} 
                  onToggle={() => setOpenId(openId === id ? null : id)} 
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
