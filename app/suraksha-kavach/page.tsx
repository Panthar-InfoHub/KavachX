import LenisDiv from "@/components/LenisDiv";
import Image from "next/image";
import { TopNotchFeatures } from "@/components/top-notch-features";
import { FeaturesBentoGrid } from "@/components/features-bento-grid";
import { CtaSteps } from "@/components/cta-steps";
import { TestimonialSlider } from "@/components/testimonial-slider";

export default function SurakshaKavachPage() {
  return (
    <LenisDiv>
      <div className="relative bg-white text-black font-sans overflow-hidden flex flex-col items-center pb-0">
        {/* Hero Content */}
        <div className="w-full max-w-3xl mx-auto px-6 pt-28 md:pt-36 pb-8 flex flex-col items-center text-center z-10 relative">
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
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 mt-10 md:mt-14 overflow-hidden">

          {/* Decorative Light Blue Dome */}
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] md:w-[1000px] md:h-[1100px] bg-[#eef4fb] rounded-full z-0"></div>

          {/* 3 Phones Layout */}
          <div className="relative z-10 w-full flex justify-center items-end gap-4">
            {/* Left Phone */}
            <div className="relative w-[220px] md:w-[280px] h-[400px] md:h-[520px] shrink-0 self-end">
              <Image
                src="/images/mock_1.png"
                alt="Feature preview left"
                fill
                className="object-contain object-bottom drop-shadow-xl"
              />
            </div>

            {/* Center Phone */}
            <div className="relative w-[240px] md:w-[300px] h-[460px] md:h-[600px] shrink-0 self-end z-20">
              <Image
                src="/images/mock_2.png"
                alt="Main App Interface"
                fill
                className="object-contain object-bottom drop-shadow-2xl"
                priority
              />
            </div>

            {/* Right Phone */}
            <div className="relative w-[220px] md:w-[280px] h-[400px] md:h-[520px] shrink-0 self-end">
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
