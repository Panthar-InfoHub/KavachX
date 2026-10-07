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
  // MOBILE DETECTION & SCROLL PROGRESS FOR DESKTOP
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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Desktop Scroll Transforms
  const textLeftX = useTransform(
    scrollYProgress,
    [0.05, 0.5],
    ["0vw", "-100vw"]
  );

  const textRightX = useTransform(
    scrollYProgress,
    [0.05, 0.5],
    ["0vw", "100vw"]
  );

  const titleDisplay = useTransform(
    scrollYProgress,
    (pos) => (pos >= 0.35 ? "none" : "block")
  );

  const cardsOpacity = useTransform(
    scrollYProgress,
    [0.08, 0.35],
    [0, 1]
  );

  const cardsScale = useTransform(
    scrollYProgress,
    [0.25, 0.35],
    [0.80, 1]
  );

  const cardsYPopup = useTransform(
    scrollYProgress,
    [0.20, 0.35],
    [30, 0]
  );

  const cardsDisplay = useTransform(
    scrollYProgress,
    (pos) => (pos < 0.08 ? "none" : "block")
  );

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

  const kairosFlip = useTransform(
    scrollYProgress,
    [0.35, 0.65],
    [180, 0]
  );

  return (
    <section className="relative w-full bg-transparent">
      {/* =======================================================
          MOBILE & SMALL SCREEN VIEW (STATIC, NO ANIMATION)
          ======================================================= */}
      <div className="block md:hidden w-full bg-[#fdfdfd] text-black rounded-t-[2.5rem] border-t border-slate-200/60 py-10 px-4">
        {/* HEADING ON TOP */}
        <div className="text-center mb-8 px-2">
          <h2 className="font-syne text-2xl sm:text-3xl font-bold tracking-tight text-black leading-tight max-w-xl mx-auto">
            Explore Smart Safety &amp; Monitoring Solutions
          </h2>
        </div>

        {/* TWO CARDS ONE BELOW ANOTHER */}
        <div className="flex flex-col gap-6 max-w-[360px] sm:max-w-[420px] mx-auto w-full">
          {/* CARD 1 — SURAKSHA KAVACH */}
          <div className="w-full h-[460px] sm:h-[480px] flex flex-col">
            <BentoCard
              title="Suraksha Kavach"
              description="Your Personal Safety Shield. A smart safety app designed for India. Instant SOS alerts, automatic crash detection, real-time location sharing, and voice commands that work even when you're offline. Because safety can't wait for a signal."
              icon={
                <ShieldIcon
                  className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600"
                  animate={false}
                />
              }
              variant="light"
              showOrbital={true}
              noFadeIn={true}
              lineClamp="line-clamp-none"
              iconPosition="top"
              contentPadding="p-6 sm:p-8"
              titleSize="text-xl sm:text-2xl"
              descSize="text-xs sm:text-sm"
              className="h-full"
            >
              <div className="absolute -bottom-20 -right-20 w-[120%] h-[120%] opacity-15 pointer-events-none z-[-1]">
                <SonarRadar />
              </div>

              <div className="flex justify-start mt-6">
                <Link
                  href="/suraksha-kavach"
                  className="
                    inline-flex
                    h-12
                    sm:h-14
                    w-auto
                    items-center
                    justify-between
                    gap-4
                    rounded-full
                    bg-black
                    pl-6
                    sm:pl-8
                    pr-2
                    text-xs
                    sm:text-sm
                    md:text-[15px]
                    font-medium
                    text-white
                  "
                >
                  Explore Kavach
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-white text-black">
                    <ArrowRight className="h-4 w-4 -rotate-45" />
                  </div>
                </Link>
              </div>
            </BentoCard>
          </div>

          {/* CARD 2 — KAIROS */}
          <div className="w-full h-[460px] sm:h-[480px] flex flex-col">
            <BentoCard
              title="KAIROS- AI edge box"
              description="Intelligent Home Security. Monitor your home, family, and spaces from anywhere in the world. The Kavach Kairos brings AI-driven CCTV analytics and real-time intelligence directly to your front door."
              icon={
                <AIIcon
                  className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400"
                  animate={false}
                />
              }
              variant="black"
              nebulaColor="none"
              showOrbital={false}
              noFadeIn={true}
              lineClamp="line-clamp-none"
              iconPosition="top"
              contentPadding="p-6 sm:p-8"
              titleSize="text-xl sm:text-2xl"
              descSize="text-xs sm:text-sm"
              className="h-full"
            >
              <div className="absolute -bottom-10 -right-10 w-full opacity-30 pointer-events-none scale-125 z-[-1]">
                <RiskScannerAsset />
              </div>

              <div className="flex justify-start mt-6">
                <Link
                  href="/kairos"
                  className="
                    inline-flex
                    h-12
                    sm:h-14
                    w-auto
                    items-center
                    justify-between
                    gap-4
                    rounded-full
                    bg-white
                    pl-6
                    sm:pl-8
                    pr-2
                    text-xs
                    sm:text-sm
                    md:text-[15px]
                    font-medium
                    text-black
                  "
                >
                  View KAIROS
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-black text-white">
                    <ArrowRight className="h-4 w-4 -rotate-45" />
                  </div>
                </Link>
              </div>
            </BentoCard>
          </div>
        </div>
      </div>

      {/* =======================================================
          DESKTOP VIEW (STICKY SCROLL-DRIVEN INTERACTIVE ANIMATION)
          ======================================================= */}
      <div
        ref={containerRef}
        className="hidden md:block relative h-[200vh] w-full border-t border-white/10"
      >
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
          {/* HEADING */}
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

          {/* CARD VISIBILITY WRAPPER */}
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
              {/* CARD 1 — SURAKSHA KAVACH */}
              <motion.div
                style={{
                  zIndex: 30,
                  x: card1XDesktop,
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

              {/* CARD 2 — KAIROS */}
              <motion.div
                style={{
                  zIndex: 10,
                  x: card2XDesktop,
                  rotateY: kairosFlip,
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
      </div>
    </section>
  );
}