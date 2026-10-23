"use client";

import React, { useRef } from "react";

export function InteractiveParticleWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const forwardEvent = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const canvases = containerRef.current.querySelectorAll("canvas");
    canvases.forEach((canvas) => {
      const rect = canvas.getBoundingClientRect();
      const clone = new PointerEvent(e.type, {
        bubbles: true,
        cancelable: true,
        clientX: e.clientX,
        clientY: e.clientY,
        screenX: e.screenX,
        screenY: e.screenY,
        pointerId: e.pointerId,
        pointerType: e.pointerType,
        isPrimary: e.isPrimary,
        pressure: e.pressure,
      });
      canvas.dispatchEvent(clone);
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-6xl mx-auto h-[400px] md:h-[500px]"
      onPointerMove={forwardEvent}
      onPointerDown={forwardEvent}
      onPointerUp={forwardEvent}
      onPointerLeave={forwardEvent}
    >
      {children}
    </div>
  );
}
