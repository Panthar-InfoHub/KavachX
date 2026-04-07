import LenisDiv from "@/components/LenisDiv";
import Image from "next/image";
import { TopNotchFeatures } from "@/components/top-notch-features";
import { FeaturesBentoGrid } from "@/components/features-bento-grid";
import { CtaSteps } from "@/components/cta-steps";
import dynamic from "next/dynamic";

const TestimonialSlider = dynamic(() => import("@/components/testimonial-slider").then(mod => mod.TestimonialSlider), {
  loading: () => <div className="py-20 w-full animate-pulse bg-gray-50 flex items-center justify-center text-gray-400">Loading Testimonials...</div>,
});
import { Metadata } from "next";
import { SchemaMarkup } from "@/components/seo/schema-markup";

export const metadata: Metadata = {
  title: "Suraksha Kavach | Safety App with SOS, Crash & Voice Alerts",
  description: "Suraksha Kavach by Kavach X – India's smartest safety app with offline SOS, crash detection, voice commands & live location sharing. Download now.",
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
    description: "Suraksha Kavach by Kavach X – India's smartest safety app with offline SOS, crash detection, voice commands & live location sharing. Download now.",
    url: "/suraksha-kavach",
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
            "name": "What is Suraksha Kavach?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Suraksha Kavach is India's smartest safety app by Kavach X, offering comprehensive protection with SOS alerts, crash detection, and real-time location tracking."
            }
          },
          {
            "@type": "Question",
            "name": "Does it work offline?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Suraksha Kavach includes offline SOS capabilities to ensure your safety even without an internet connection."
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
          <button className="bg-[#00A3FF] hover:bg-[#008bdd] text-white px-8 py-3 rounded-full text-sm font-semibold transition-colors duration-200 shadow-md">
            Try Kavach for Free
          </button>
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
                className="object-contain object-bottom drop-shadow-xl"
              />
            </div>

            {/* Center Phone */}
            <div className="relative w-40 sm:w-50 md:w-75 h-72 sm:h-95 md:h-150 shrink-0 self-end z-20">
              <Image
                src="/images/mock_2.png"
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
        <TestimonialSlider />
      </div>
    </LenisDiv>
  );
}
