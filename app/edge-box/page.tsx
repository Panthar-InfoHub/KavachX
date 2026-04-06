import Image from "next/image";
import LenisDiv from "@/components/LenisDiv";
import { Metadata } from "next";
import { SchemaMarkup } from "@/components/seo/schema-markup";

export const metadata: Metadata = {
  title: "AI Edge Box - Empowering Your Security",
  description: "We specialize in offering capabilities such as AI-driven edge computing, real-time data processing, and intelligent analytics to boost your operational efficiency.",
  openGraph: {
    title: "AI Edge Box | Kavach X",
    description: "AI-driven edge computing, real-time data processing, and intelligent analytics to boost your operational efficiency.",
    url: "/edge-box",
  },
};

export default function EdgeBoxPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Kavach AI Edge Box",
    "description": "AI Edge Box for empowering security through AI-driven edge computing, real-time data processing and intelligent analytics.",
    "brand": {
      "@type": "Brand",
      "name": "Kavach X"
    }
  };

  return (
    <LenisDiv>
      <div className="relative min-h-screen bg-white text-black font-sans overflow-hidden flex flex-col items-center pb-0">
        <SchemaMarkup schema={schema} />

        {/* Hero Content */}
        <div className="w-full max-w-4xl mx-auto px-6 pt-40 md:pt-48 pb-6 flex flex-col items-center text-center z-20 relative">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-[1.2] md:leading-[1.15] font-syne">
            AI Edge Box: Empowering<br className="hidden md:block" /> Your Security
          </h1>
          <p className="text-gray-600 max-w-2xl text-sm md:text-base font-medium mb-10 leading-relaxed px-4 md:px-0">
            We specialize in offering capabilities such as AI-driven edge computing, real-time data processing, and intelligent analytics to boost your operational efficiency.
          </p>
          <button className="bg-[#00A3FF] hover:bg-[#008bdd] text-white px-10 py-3 rounded-full text-sm font-semibold transition-colors duration-200 shadow-xl shadow-blue-500/20">
            Stay tune !!
          </button>
        </div>

        {/* Product Image Stage and Background Text */}
        <div className="relative w-full max-w-7xl mx-auto h-[350px] md:h-[600px] flex justify-center items-center mt-0 md:mt-4">

          {/* Faded Background Text */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0 px-4 mt-[-60px] md:mt-[-100px]">
            <span className="text-[15vw] md:text-[14vw] font-semibold text-transparent bg-clip-text bg-linear-to-b from-[#e6e6e6] to-[#ffffff00] leading-none m-0 p-0 text-center select-none tracking-tighter whitespace-nowrap">
              Launching Soon
            </span>
          </div>

          {/* The Edge Box Image */}
          <div className="relative z-10 w-full max-w-md md:max-w-4xl h-[250px] md:h-[400px] flex flex-col items-center justify-center text-center px-8">
            <Image
              src="/images/edgebox.png"
              alt="Kavach AI Edge Box Launching Soon"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
              className="object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)]"
              priority
            />
          </div>
        </div>

      </div>
    </LenisDiv>
  );
}
