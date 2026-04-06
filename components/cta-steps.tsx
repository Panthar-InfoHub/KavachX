"use client";

import Image from "next/image";

const STEPS = [
  {
    step: 1,
    title: "Log in to the App first",
    description: "Quick access to your account with seamless login features.",
    image: "/steps/step_1.png",
  },
  {
    step: 2,
    title: "Allow Permissions",
    description: "Enable all app permissions for seamless access to your account.",
    image: "/steps/step_2.png",
  },
  {
    step: 3,
    title: "All set for an emergency!",
    description: "Ready for anything that comes our way!",
    image: "/images/mock_2.png",
  },
];

export function CtaSteps() {
  return (
    <section className="w-full bg-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">

        {/* Heading */}
        <h2 className="text-4xl md:text-[52px] font-bold tracking-tight text-center mb-4 leading-[1.15] font-syne">
          Create a safer,<br />
          smarter tomorrow.
        </h2>
        <p className="text-gray-500 text-sm md:text-base text-center mb-16 max-w-lg">
          Follow these steps: activate alerts, configure account, use voice.
        </p>

        {/* Steps Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-16">

          {/* Step 1 — Left */}
          <div className="flex flex-col-reverse md:flex-col items-center md:items-start">
            <div className="relative w-full aspect-3/4 max-w-[320px] bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden mb-6">
              <span className="text-[72px] py-4 flex justify-center font-semibold text-gray-200/70 leading-none select-none z-0">
                Step 1
              </span>
              <div className="flex flex-1 h-full items-end justify-center p-4">
                <div className="relative w-full h-full">
                  <Image
                    src={STEPS[0].image}
                    alt={STEPS[0].title}
                    fill
                    className="object-contain object-bottom"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold tracking-tight mb-1">{STEPS[0].title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-[260px]">{STEPS[0].description}</p>
            </div>
          </div>

          {/* Step 2 — Center (offset up) */}
          <div className="flex flex-col items-center">
            <div className="text-left w-full max-w-[280px] mb-4">
              <h3 className="text-lg font-semibold tracking-tight mb-1">{STEPS[1].title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{STEPS[1].description}</p>
            </div>
            <div className="relative w-full aspect-3/4 max-w-[320px] bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden mb-6">
              <div className="flex flex-col h-full items-end justify-center p-4">
                <div className="relative w-full h-full">
                  <Image
                    src={STEPS[1].image}
                    alt={STEPS[1].title}
                    fill
                    className="object-contain object-center"
                  />

                  {/* Bottom white fade */}
                  <div className="absolute w-full h-14 bg-linear-to-t blur-lg from-white to-white z-30 -mb-0 pointer-events-none"></div>
                </div>

                <span className="text-[72px] py-4 flex justify-center w-full font-semibold text-gray-200/70 leading-none select-none z-0 text-right">
                  Step 2
                </span>
              </div>
            </div>
          </div>

          {/* Step 3 — Right */}
          <div className="flex flex-col-reverse md:flex-col items-center md:items-start">
            <div className="relative w-full aspect-3/4 max-w-[320px] bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden mb-6">
              <span className="text-[72px] py-4 flex justify-center font-semibold text-gray-200/70 leading-none select-none z-0 text-right">
                Step 3
              </span>
              <div className="flex flex-1 h-full items-end justify-center p-4">
                <div className="relative w-full h-full">
                  <Image
                    src={STEPS[2].image}
                    alt={STEPS[2].title}
                    fill
                    className="object-contain object-bottom"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold tracking-tight mb-1">{STEPS[2].title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-[260px]">{STEPS[2].description}</p>
            </div>
          </div>

        </div>

        {/* Google Play Button */}
        <a
          href="#"
          className="inline-flex items-center gap-3 bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-xl transition-colors duration-200 shadow-md"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3.609 1.814L13.792 12 3.61 22.186a2.372 2.372 0 01-.61-1.604V3.418c0-.612.222-1.17.609-1.604zm.892-.69l11.252 6.508L13.1 10.28 4.501 1.124zM16.73 8.11l2.904 1.68c.801.463 1.166 1.063 1.166 1.71s-.365 1.247-1.166 1.71l-2.902 1.68-2.91-2.89 2.908-2.89zm-.976 6.27l-2.653 2.645-10.247 5.926L13.1 13.72l2.654 2.66z" />
          </svg>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider leading-none opacity-70">GET IT ON</span>
            <span className="text-sm font-semibold leading-tight">Google Play</span>
          </div>
        </a>

      </div>
    </section>
  );
}
