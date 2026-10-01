"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import BentoCard from "./bento-card";
import { ShieldIcon, AIIcon } from "./icons";
import { SonarRadar, RiskScannerAsset } from "./bento-assets";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function EcosystemSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // =========================================================
  // MOBILE DETECTION
  // =========================================================

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }

    return false;
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // =========================================================
  // SCROLL PROGRESS
  // =========================================================

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // =========================================================
  // STEP 1
  // 0.00 → 0.20
  //
  // Heading stays centered.
  // Cards are hidden.
  // =========================================================

  // =========================================================
  // STEP 2
  // 0.20 → 0.45
  //
  // Heading splits.
  // Cards pop up.
  // =========================================================

  const textLeftX = useTransform(
    scrollYProgress,
    [0.20, 0.45],
    ["0vw", "-100vw"]
  );

  const textRightX = useTransform(
    scrollYProgress,
    [0.20, 0.45],
    ["0vw", "100vw"]
  );

  const textOpacity = useTransform(
    scrollYProgress,
    [0.20, 0.45],
    [1, 0]
  );

  const titleDisplay = useTransform(
    scrollYProgress,
    (pos) => (pos >= 0.45 ? "none" : "block")
  );

  // =========================================================
  // CARD POP-UP
  //
  // 0.20 → 0.45
  //
  // Cards fade in + scale up + pop up from behind as text splits.
  //
  // After 0.45:
  // opacity = 1
  // scale = 1
  // y = 0
  //
  // They NEVER fade or change opacity during the subsequent split.
  // =========================================================

  const cardsOpacity = useTransform(
    scrollYProgress,
    [0.30, 0.45],
    [0, 1]
  );

  const cardsScale = useTransform(
    scrollYProgress,
    [0.20, 0.45],
    [0.85, 1]
  );

  const cardsYPopup = useTransform(
    scrollYProgress,
    [0.20, 0.45],
    [40, 0]
  );

  // Keep cards mounted after they appear.
  const cardsDisplay = useTransform(
    scrollYProgress,
    (pos) => (pos < 0.20 ? "none" : "grid")
  );

  // =========================================================
  // STEP 3
  // 0.45 → 0.75
  //
  // Cards split apart.
  //
  // IMPORTANT:
  // There is NO opacity here.
  // Cards stay 100% visible during the entire split.
  // =========================================================

  const card1XDesktop = useTransform(
    scrollYProgress,
    [0.45, 0.75],
    ["calc(50% + 1.25rem)", "0%"]
  );

  const card2XDesktop = useTransform(
    scrollYProgress,
    [0.45, 0.75],
    ["calc(-50% - 1.25rem)", "0%"]
  );

  // =========================================================
  // MOBILE SPLIT
  // =========================================================

  const card1YMobile = useTransform(
    scrollYProgress,
    [0.45, 0.75],
    ["52%", "0%"]
  );

  const card2YMobile = useTransform(
    scrollYProgress,
    [0.45, 0.75],
    ["-52%", "0%"]
  );

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <section
      ref={containerRef}
      className="relative h-[550vh] w-full bg-transparent border-t border-white/10"
    >
      {/* =====================================================
          STICKY VIEWPORT
          ===================================================== */}

      <div
        className="
          sticky
          top-0
          h-screen
          w-full
          flex
          flex-col
          justify-center
          items-center
          px-4
          md:px-[5%]
          overflow-hidden
          z-10
          bg-[#fdfdfd]
          rounded-t-[3rem]
          border-t
          border-slate-200/60
        "
      >
        {/* ===================================================
            HEADING
            =================================================== */}

        <div
          className="
            absolute
            inset-0
            flex
            flex-col
            items-center
            justify-center
            px-4
            z-30
            pointer-events-none
            text-center
          "
        >
          <motion.h2
            style={{
              display: titleDisplay,
              opacity: textOpacity,
            }}
            className="
              font-syne
              text-2xl
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              font-medium
              tracking-tight
              text-slate-900
              flex
              flex-row
              flex-wrap
              justify-center
              items-center
              text-center
              leading-tight
              max-w-5xl
              mx-auto
              gap-x-4
              px-4
            "
          >
            {/* LEFT SIDE OF HEADING */}

            <motion.span
              style={{
                x: textLeftX,
              }}
              className="
                inline-block
                text-slate-900
                whitespace-nowrap
              "
            >
              Explore Smart Safety
            </motion.span>

            {/* RIGHT SIDE OF HEADING */}

            <motion.span
              style={{
                x: textRightX,
              }}
              className="
                inline-block
                text-slate-900
                whitespace-nowrap
              "
            >
              &amp; Monitoring Solutions
            </motion.span>
          </motion.h2>
        </div>

        {/* ===================================================
            CARD VISIBILITY WRAPPER
            ===================================================

            This wrapper only controls whether the cards
            exist in the layout.

            NO opacity here.
        */}

        <motion.div
          style={{
            display: cardsDisplay,
          }}
          className="
            w-full
            max-w-4xl
            lg:max-w-5xl
            mx-auto
            relative
            z-20
          "
        >
          {/* =================================================
              CARD POP ANIMATION
              =================================================

              opacity + scale + y popup happen ONLY during:

              0.20 → 0.45

              After 0.45:
              opacity = 1
              scale = 1
              y = 0

              These values stay 100% visible and NEVER change during the split.
          */}

          <motion.div
            style={{
              opacity: cardsOpacity,
              scale: cardsScale,
              y: cardsYPopup,
            }}
            className="
              w-full
              grid
              grid-cols-1
              md:grid-cols-2
              gap-6
              lg:gap-10
              items-stretch
              min-h-[480px]
              md:min-h-[540px]
            "
          >
            {/* =================================================
                CARD 1 — SURAKSHA KAVACH
                ================================================= */}

            <motion.div
              style={{
                x: isMobile ? 0 : card1XDesktop,
                y: isMobile ? card1YMobile : 0,
                zIndex: 20,
              }}
              className="
                w-full
                h-full
                relative
              "
            >
              <BentoCard
                title="Suraksha Kavach"
                description="Your Personal Safety Shield. A smart safety app designed for India. Instant SOS alerts, automatic crash detection, real-time location sharing, and voice commands that work even when you're offline. Because safety can't wait for a signal."
                icon={
                  <ShieldIcon
                    className="w-10 h-10 md:w-12 md:h-12 text-blue-600"
                    animate
                  />
                }
                variant="light"
                showOrbital={true}
                noFadeIn={true}
                className=""
              >
                {/* =============================================
                    SURAKSHA BACKGROUND ASSET
                    ============================================= */}

                <div
                  className="
                    absolute
                    -bottom-20
                    -right-20
                    w-[120%]
                    h-[120%]
                    opacity-15
                    pointer-events-none
                    z-[-1]
                  "
                >
                  <SonarRadar />
                </div>

                {/* =============================================
                    SURAKSHA BUTTON
                    ============================================= */}

                <div className="flex justify-start mt-6 md:mt-8">
                  <Link
                    href="/suraksha-kavach"
                    className="
                      inline-flex
                      h-12
                      md:h-14
                      w-full
                      sm:w-auto
                      items-center
                      justify-between
                      gap-4
                      rounded-full
                      bg-black
                      pl-6
                      md:pl-8
                      pr-2
                      text-sm
                      md:text-[15px]
                      font-medium
                      text-white
                    "
                  >
                    Explore Kavach

                    <div
                      className="
                        flex
                        h-9
                        w-9
                        md:h-10
                        md:w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        text-black
                      "
                    >
                      <ArrowRight className="h-4 w-4 -rotate-45" />
                    </div>
                  </Link>
                </div>
              </BentoCard>
            </motion.div>

            {/* =================================================
                CARD 2 — KAIROS
                ================================================= */}

            <motion.div
              style={{
                x: isMobile ? 0 : card2XDesktop,
                y: isMobile ? card2YMobile : 0,
                zIndex: 20,
              }}
              className="
                w-full
                h-full
                relative
              "
            >
              <BentoCard
                title="KAIROS- AI edge box"
                description="Intelligent Home Security. Monitor your home, family, and spaces from anywhere in the world. The Kavach Kairos brings AI-driven CCTV analytics and real-time intelligence directly to your front door."
                icon={
                  <AIIcon
                    className="w-10 h-10 md:w-12 md:h-12 text-cyan-400"
                    animate
                  />
                }
                variant="black"
                nebulaColor="none"
                showOrbital={false}
                noFadeIn={true}
                className=""
              >
                {/* =============================================
                    KAIROS BACKGROUND ASSET
                    ============================================= */}

                <div
                  className="
                    absolute
                    -bottom-10
                    -right-10
                    w-full
                    opacity-30
                    pointer-events-none
                    scale-125
                    z-[-1]
                  "
                >
                  <RiskScannerAsset />
                </div>

                {/* =============================================
                    KAIROS BUTTON
                    ============================================= */}

                <div className="flex justify-start mt-6 md:mt-8">
                  <Link
                    href="/kairos"
                    className="
                      inline-flex
                      h-12
                      md:h-14
                      w-full
                      sm:w-auto
                      items-center
                      justify-between
                      gap-4
                      rounded-full
                      bg-white
                      pl-6
                      md:pl-8
                      pr-2
                      text-sm
                      md:text-[15px]
                      font-medium
                      text-black
                    "
                  >
                    View KAIROS

                    <div
                      className="
                        flex
                        h-9
                        w-9
                        md:h-10
                        md:w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-black
                        text-white
                      "
                    >
                      <ArrowRight className="h-4 w-4 -rotate-45" />
                    </div>
                  </Link>
                </div>
              </BentoCard>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}