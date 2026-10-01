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

  const [isMobile, setIsMobile] = useState(false);

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
    [0.05, 0.35],
    ["0vw", "-100vw"]
  );

  const textRightX = useTransform(
    scrollYProgress,
    [0.05, 0.35],
    ["0vw", "100vw"]
  );

  const textOpacity = useTransform(
    scrollYProgress,
    (pos) => (pos >= 0.35 ? 0 : 1)
  );

  const titleDisplay = useTransform(
    scrollYProgress,
    (pos) => (pos >= 0.35 ? "none" : "block")
  );

  // =========================================================
  // CARD POP-UP (INSTANT 100% SOLID OPACITY)
  // =========================================================

  const cardsOpacity = useTransform(
    scrollYProgress,
    (pos) => (pos >= 0.08 ? 1 : 0)
  );

  const cardsScale = useTransform(
    scrollYProgress,
    [0.05, 0.35],
    [0.90, 1]
  );

  const cardsYPopup = useTransform(
    scrollYProgress,
    [0.05, 0.35],
    [30, 0]
  );

  // Keep cards mounted after they appear.
  const cardsDisplay = useTransform(
    scrollYProgress,
    (pos) => (pos < 0.08 ? "none" : "block")
  );

  // =========================================================
  // CARD SPLIT & 3D FLIP
  // 0.35 → 0.65
  // =========================================================

  const card1XDesktop = useTransform(
    scrollYProgress,
    [0.35, 0.65],
    ["0%", "-53%"]
  );

  const card2XDesktop = useTransform(
    scrollYProgress,
    [0.35, 0.65],
    ["0%", "53%"]
  );

  const card1YMobile = useTransform(
    scrollYProgress,
    [0.35, 0.65],
    ["0%", "-52%"]
  );

  const card2YMobile = useTransform(
    scrollYProgress,
    [0.35, 0.65],
    ["0%", "52%"]
  );

  const cardMobileScale = useTransform(
    scrollYProgress,
    [0.35, 0.65],
    [1, 1]
  );

  const kairosFlip = useTransform(
    scrollYProgress,
    [0.35, 0.65],
    [-180, 0]
  );

  const kairosFlipMobile = useTransform(
    scrollYProgress,
    [0.35, 0.65],
    [-90, 0]
  );

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh] w-full bg-transparent border-t border-white/10"
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
              color: "#000000",
            }}
            className="
              font-syne
              text-[22px]
              sm:text-3xl
              md:text-5xl
              lg:text-6xl
              font-bold
              tracking-tight
              text-[#000000]
              flex
              flex-col
              sm:flex-row
              justify-center
              items-center
              text-center
              leading-tight
              max-w-5xl
              mx-auto
              gap-y-2
              gap-x-4
              px-4
            "
          >
            {/* LEFT SIDE OF HEADING */}

            <motion.span
              style={{
                x: textLeftX,
                color: "#000000",
              }}
              className="
                inline-block
                text-[#000000]
                whitespace-nowrap
              "
            >
              Explore Smart Safety
            </motion.span>

            {/* RIGHT SIDE OF HEADING */}

            <motion.span
              style={{
                x: textRightX,
                color: "#000000",
              }}
              className="
                inline-block
                text-[#000000]
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
            mx-auto
            relative
            z-20
            flex
            justify-center
            px-4
            sm:px-0
          "
        >
          {/* =================================================
              CARD POP ANIMATION
              =================================================

              Cards pop up stacked directly on top of each other in full opacity.
              Card 2 stays 100% behind Card 1.
          */}

          <motion.div
            style={{
              opacity: cardsOpacity,
              scale: cardsScale,
              y: cardsYPopup,
              perspective: 1200,
            }}
            className="
              w-full
              max-w-none
              sm:max-w-[420px]
              md:max-w-[360px]
              lg:max-w-[440px]
              xl:max-w-[450px]
              mx-auto
              relative
              h-[210px]
              sm:h-[240px]
              md:h-[480px]
              lg:h-[560px]
              xl:h-[590px]
            "
          >
            {/* =================================================
                CARD 1 — SURAKSHA KAVACH (FRONT, MOVES LEFT ON SPLIT)
                ================================================= */}

            <motion.div
              style={{
                zIndex: 30,
                x: isMobile ? 0 : card1XDesktop,
                y: isMobile ? card1YMobile : 0,
                scale: isMobile ? cardMobileScale : 1,
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
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-600"
                    animate
                  />
                }
                variant="light"
                showOrbital={true}
                noFadeIn={true}
                className="h-full"
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

                <div className="flex justify-start mt-2 sm:mt-6 md:mt-8">
                  <Link
                    href="/suraksha-kavach"
                    className="
                      inline-flex
                      h-9
                      sm:h-11
                      md:h-14
                      w-auto
                      items-center
                      justify-between
                      gap-3
                      md:gap-4
                      rounded-full
                      bg-black
                      pl-4
                      sm:pl-6
                      md:pl-8
                      pr-1.5
                      md:pr-2
                      text-xs
                      sm:text-sm
                      md:text-[15px]
                      font-medium
                      text-white
                    "
                  >
                    Explore Kavach

                    <div
                      className="
                        flex
                        h-6.5
                        w-6.5
                        sm:h-8
                        sm:w-8
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
                      <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 -rotate-45" />
                    </div>
                  </Link>
                </div>
              </BentoCard>
            </motion.div>

            {/* =================================================
                CARD 2 — KAIROS (FLIPS OUT FROM BEHIND TO RIGHT)
                ================================================= */}

            <motion.div
              style={{
                zIndex: 10,
                x: isMobile ? 0 : card2XDesktop,
                y: isMobile ? card2YMobile : 0,
                scale: isMobile ? cardMobileScale : 1,
                rotateY: isMobile ? 0 : kairosFlip,
                rotateX: isMobile ? kairosFlipMobile : 0,
                transformStyle: "preserve-3d",
              }}
              className="
                w-full
                h-full
                absolute
                inset-0
              "
            >
              <BentoCard
                title="KAIROS- AI edge box"
                description="Intelligent Home Security. Monitor your home, family, and spaces from anywhere in the world. The Kavach Kairos brings AI-driven CCTV analytics and real-time intelligence directly to your front door."
                icon={
                  <AIIcon
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-cyan-400"
                    animate
                  />
                }
                variant="black"
                nebulaColor="none"
                showOrbital={false}
                noFadeIn={true}
                className="h-full"
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

                <div className="flex justify-start mt-2 sm:mt-6 md:mt-8">
                  <Link
                    href="/kairos"
                    className="
                      inline-flex
                      h-9
                      sm:h-11
                      md:h-14
                      w-auto
                      items-center
                      justify-between
                      gap-3
                      md:gap-4
                      rounded-full
                      bg-white
                      pl-4
                      sm:pl-6
                      md:pl-8
                      pr-1.5
                      md:pr-2
                      text-xs
                      sm:text-sm
                      md:text-[15px]
                      font-medium
                      text-black
                    "
                  >
                    View KAIROS

                    <div
                      className="
                        flex
                        h-6.5
                        w-6.5
                        sm:h-8
                        sm:w-8
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
                      <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 -rotate-45" />
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