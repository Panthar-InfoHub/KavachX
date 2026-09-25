import { CtaSteps } from "@/components/cta-steps";
import { FeaturesBentoGrid } from "@/components/features-bento-grid";
import LenisDiv from "@/components/LenisDiv";
import { TopNotchFeatures } from "@/components/top-notch-features";
import Image from "next/image";

import { SchemaMarkup } from "@/components/seo/schema-markup";
import { Metadata } from "next";
import { Testimonials } from "@/components/testimonial";
import { SurakshaHeroButton } from "@/components/suraksha-hero-button";
import Faq from "@/components/faq";

export const metadata: Metadata = {
  title: "Suraksha Kavach | Safety App with SOS, Crash & Voice Alerts",
  description: "Suraksha Kavach by KavachX – India's smartest safety app with offline SOS, crash detection, voice commands & live location sharing. Download now.",
  keywords: [
    "suraksha kavach app",
    "SOS safety app India",
    "crash detection app",
    "offline safety app",
    "voice command SOS",
    "drive detection app",
    "emergency location sharing",
    "women safety app India"
  ],
  openGraph: {
    title: "Suraksha Kavach | Safety App with SOS, Crash & Voice Alerts",
    description: "Suraksha Kavach by KavachX – India's smartest safety app with offline SOS, crash detection, voice commands & live location sharing. Download now.",
    url: "https://kavachx.io/suraksha-kavach",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Suraksha Kavach | Safety App with SOS, Crash & Voice Alerts",
    description: "Suraksha Kavach by KavachX – India's smartest safety app with offline SOS, crash detection, voice commands & live location sharing. Download now.",
  },
  alternates: {
    canonical: "https://kavachx.io/suraksha-kavach",
  },
};

export default function SurakshaKavachPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Suraksha Kavach",
        "applicationCategory": "SafetyApplication",
        "operatingSystem": "iOS, Android",
        "description": "An intelligent safety application providing drive and crash detection, in-app SOS, and AI edge capabilities for personal protection.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Suraksha Kavach and how does it keep me safe?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Suraksha Kavach is a smart safety app by Kavach X that protects you in emergencies. With one tap, it alerts your trusted contacts, shares your location, and activates safety features like SOS alerts and crash detection. Your personal safety shield is always on and ready."
            }
          },
          {
            "@type": "Question",
            "name": "Does Suraksha Kavach work without an internet connection?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Suraksha Kavach is built with offline functionality so your safety is never dependent on a strong internet signal. Even in low-connectivity or no-network areas, the app can still send alerts and share your location with your emergency contacts — because emergencies don't wait for Wi-Fi."
            }
          },
          {
            "@type": "Question",
            "name": "How does the crash detection feature work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Suraksha Kavach uses intelligent sensors to automatically detect sudden impact or abnormal movement patterns associated with a road accident. When a crash is detected, the app immediately triggers an SOS alert and shares your real-time location with your pre-set emergency contacts — without you needing to do anything. It acts fast, so help can reach you even if you're unable to respond."
            }
          }
        ]
      }
    ]
  };

  return (
    <LenisDiv>
      <div className="relative bg-white text-black font-sans overflow-hidden flex flex-col items-center pb-0">
        <SchemaMarkup schema={schema} />
        {/* Hero Content */}
        <div className="w-full max-w-3xl mx-auto px-6 pt-48 md:pt-36 pb-8 flex flex-col items-center text-center z-10 relative">
          <h1 className="text-4xl md:text-[52px] font-bold tracking-tight mb-5 leading-[1.15] font-syne">
            Suraksha Kavach: <br />
            Shielding Your Safety
          </h1>
          <p className="text-gray-600 max-w-lg text-sm md:text-[15px] mb-8 leading-relaxed">
            We focus on providing features like drive and crash detection, in-app SOS, and voice commands to enhance your safety.
          </p>
          <SurakshaHeroButton />
        </div>

        {/* Phone Showcase */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-6 mt-8 md:mt-14 overflow-hidden">

          {/* Decorative Light Blue Dome */}
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-125 h-125 sm:w-175 sm:h-175 md:w-[1000px] md:h-[1100px] bg-[#eef4fb] rounded-full z-0"></div>

          {/* 3 Phones Layout */}
          <div className="relative z-10 w-full flex justify-center items-end gap-1 sm:gap-3 md:gap-4">
            {/* Left Phone */}
            <div className="relative w-24 sm:w-40 md:w-[280px] h-44 sm:h-80 md:h-[520px] shrink-0 self-end">
              <Image
                src="/images/mock_1.png"
                alt="Feature preview left"
                fill
                sizes="(max-width: 640px) 96px, (max-width: 768px) 160px, 280px"
                className="object-contain object-bottom drop-shadow-xl"
              />
            </div>

            {/* Center Phone */}
            <div className="relative w-40 sm:w-50 md:w-75 h-72 sm:h-95 md:h-150 shrink-0 self-end z-20">
              <Image
                src="/images/mock_2.svg"
                alt="Suraksha Kavach SOS alert app screen"
                fill
                className="object-contain object-bottom drop-shadow-2xl"
                priority
              />
            </div>

            {/* Right Phone */}
            <div className="relative w-24 sm:w-40 md:w-[280px] h-44 sm:h-80 md:h-[520px] shrink-0 self-end">
              <Image
                src="/images/mock_3.png"
                alt="Feature preview right"
                fill
                sizes="(max-width: 640px) 96px, (max-width: 768px) 160px, 280px"
                className="object-contain object-bottom drop-shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Bottom white fade */}
        <div className="relative w-full h-24 bg-linear-to-t blur-md from-white to-white z-30 -mt-16 pointer-events-none"></div>

        {/* Feature Sections */}
        <TopNotchFeatures />
        <FeaturesBentoGrid />
        <CtaSteps />
        <Testimonials />
        <Faq />
      </div>
    </LenisDiv>
  );
}
