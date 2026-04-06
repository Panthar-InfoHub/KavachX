"use client";

import Image from "next/image";

export function FeaturesBentoGrid() {
  return (
    <section className="w-full bg-[#fafafa] py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <span className="inline-block px-5 py-2 rounded-full bg-gray-100 text-sm font-medium text-gray-800 mb-6">
              Our Feature
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] font-syne">
              <span className="underline decoration-2 underline-offset-4">Smart Safety</span><br />
              <span className="underline decoration-2 underline-offset-4">Innovations Tomorrow</span>
            </h2>
          </div>
          <p className="text-gray-600 max-w-sm text-[15px] leading-relaxed md:pb-2">
            We focus on providing features like drive and crash detection, in-app SOS, and voice commands to enhance your safety.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-auto">

          {/* In-App SOS Alert — tall left card */}
          <div className="md:col-span-4 md:row-span-2 bg-white rounded-3xl p-7 flex flex-col justify-between border border-gray-100 shadow-sm min-h-[450px] overflow-hidden">
            <div>
              <h3 className="text-xl font-bold mb-2 tracking-tight">
                In-App <span className="text-red-500">SOS</span> Alert
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                One-tap or automated real alerts with real time location sharing.
              </p>
            </div>
            <div className="relative w-[90%] mx-auto h-full mt-4">
              <Image
                src="/images/mock_2.png"
                alt="In-App SOS Alert"
                fill
                className="object-cover object-top h-full w-full"
              />
            </div>
          </div>

          {/* Voice Command — wide dark card, top right */}
          <div className="md:col-span-8 bg-black rounded-3xl p-7 flex flex-col justify-between border border-gray-800 shadow-sm min-h-[220px] overflow-hidden relative">
            <div className="z-10">
              <h3 className="text-xl font-bold mb-2 tracking-tight text-white">
                Voice Command
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
                Just say the command to get instant alerts and share your location in real-time!
              </p>
            </div>
            {/* Aryan notification badge */}
            <div className="absolute top-6 right-6 flex items-center gap-3 z-10 bg-white/90 backdrop-blur-sm rounded-full pl-1 pr-4 py-1 shadow-md">
              <div className="w-9 h-9 rounded-full overflow-hidden relative shrink-0">
                <Image
                  src="/feature/aryan_avatar.png"
                  alt="Aryan avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-xs">
                <p className="font-semibold text-gray-900 leading-tight">Aryan</p>
                <p className="text-gray-500 text-[11px]">Your location is being shared</p>
              </div>
            </div>
            {/* Voice wave visualization */}
            <div className="absolute bottom-0 right-0 w-[65%] h-[55%] overflow-hidden">
              <Image
                src="/wave.png"
                alt="Voice wave visualization"
                fill
                className="object-cover object-center opacity-70"
              />
            </div>
          </div>

          {/* Offline Functionality — bottom-left of the right side */}
          <div className="md:col-span-4 bg-black rounded-3xl p-7 flex flex-col shadow-sm min-h-[240px] overflow-hidden">
            <div>
              <h3 className="text-xl font-bold mb-2 tracking-tight text-white">
                Offline Functionality
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Receive alerts and share your location even when offline.
              </p>
            </div>
            {/* Spacer pushes icons to the bottom */}
            <div className="flex-1" />
            <div className="flex items-center justify-center gap-6 mt-auto">
              {/* Wifi-off icon */}
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0" />
                <line x1="3" y1="3" x2="21" y2="21" strokeLinecap="round" strokeWidth={2} />
              </svg>
              <span className="text-white/40 tracking-[0.35em] text-sm select-none">••••••••••••</span>
              {/* Device icon */}
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
              </svg>
            </div>
          </div>

          {/* Drive & Crash Detection — bottom-right */}
          <div className="md:col-span-4 bg-white rounded-3xl p-7 flex flex-col justify-between border border-gray-100 shadow-sm min-h-[240px] overflow-hidden">
            <div>
              <h3 className="text-xl font-bold mb-2 tracking-tight text-gray-900">
                Drive & Crash Detection
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Receive timely alerts for driving and accidents.
              </p>
            </div>
            <div className="flex flex-row items-center gap-6" >
              <div className="relative w-full h-[120px] mt-4">
                <Image
                  src="/feature/Maps.png"
                  alt="Drive & Crash Detection"
                  fill
                  className="object-contain object-bottom"
                />
              </div>
              <div className="relative w-full h-[120px] mt-4">
                <Image
                  src="/feature/feat_drive.png"
                  alt="Drive & Crash Detection"
                  fill
                  className="object-contain object-bottom"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
