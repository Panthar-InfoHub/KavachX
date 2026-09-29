"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import ParticleObject from "@/components/canvasui/ParticleObject";

/**
 * Responsive wrapper for the KavachX particle animation.
 *
 * Dynamically computes `scale` and `cameraDistance` props based on
 * the actual rendered width of the container so the particle logo
 * fits comfortably at every viewport size — from 320 px phones up
 * to ultra-wide desktops — without touching the core animation engine.
 */

/* ── Design-baseline constants (desktop @ max-w-6xl = 1152 px) ── */
const DESKTOP_WIDTH = 1152;
const DESKTOP_SCALE = 6;
const DESKTOP_CAM = 3.5;

/* ── Minimum values (≤ 320 px) ── */
const MIN_SCALE = 1.7;
const MIN_CAM = 3.0;

/* ── Particle count thresholds ── */
const MOBILE_PARTICLE_COUNT = 8000;
const DESKTOP_PARTICLE_COUNT = 14000;
const MOBILE_BREAKPOINT = 768;

function computeParams(width: number) {
  const fraction = Math.min(width / DESKTOP_WIDTH, 1);
  return {
    scale: MIN_SCALE + fraction * (DESKTOP_SCALE - MIN_SCALE),
    cameraDistance: MIN_CAM + fraction * (DESKTOP_CAM - MIN_CAM),
    count: width < MOBILE_BREAKPOINT ? MOBILE_PARTICLE_COUNT : DESKTOP_PARTICLE_COUNT,
  };
}

export default function ResponsiveParticleSection() {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  /* Initialise with a sensible SSR-safe default (desktop values). */
  const [params, setParams] = useState(() => computeParams(DESKTOP_WIDTH));

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const handleResize = useCallback(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth;
    setParams(computeParams(width));
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    /* Compute immediately on mount. */
    handleResize();

    const observer = new ResizeObserver(handleResize);
    observer.observe(el);
    return () => observer.disconnect();
  }, [handleResize]);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-6xl mx-auto overflow-hidden"
      style={{
        /* Fluid height: scales smoothly between 250px and 500px */
        height: "clamp(250px, 35vw, 500px)",
      }}
    >
      <ParticleObject
        className="w-full h-full bg-black"
        src="/images/logo.png"
        scale={params.scale}
        cameraDistance={params.cameraDistance}
        count={params.count}
        orbit={false}
      />
    </div>
  );
}
