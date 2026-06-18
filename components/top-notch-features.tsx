"use client";

const FEATURES = [
  "Offline Functionality",
  "Voice Command",
  "In-App SOS",
  "Drive Detection",
  "Crash Detection",
];

export function TopNotchFeatures() {
  return (
    <section className="w-full bg-gradient-to-b from-white via-[#f0f6ff] to-[#e8f1fc] py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-[42px] font-bold tracking-tight mb-12 text-gray-800 font-syne">
          Our Top Notch Feature
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          {FEATURES.map((feature) => (
            <span
              key={feature}
              className="px-6 py-3 rounded-full bg-white text-sm md:text-base font-medium text-gray-700 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200 cursor-default"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
