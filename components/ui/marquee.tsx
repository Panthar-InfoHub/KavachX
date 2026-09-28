"use client";

import { cn } from "@/lib/utils";
import { useRef, useEffect, useState } from "react";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  [key: string]: any;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstChildRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const scrollLeft = useRef(0);
  const scrollTop = useRef(0);
  const isUserInteracting = useRef(false);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll animation loop using requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      const container = containerRef.current;
      const firstChild = firstChildRef.current;

      if (container && firstChild && !isUserInteracting.current && !(pauseOnHover && isHovered)) {
        const speed = 40; // Pixels per second
        const contentSize = vertical
          ? firstChild.offsetHeight
          : firstChild.offsetWidth;

        if (contentSize > 0) {
          if (!vertical) {
            const step = speed * deltaTime * (reverse ? -1 : 1);
            let nextScroll = container.scrollLeft + step;

            if (!reverse && nextScroll >= contentSize) {
              nextScroll -= contentSize;
            } else if (reverse && nextScroll <= 0) {
              nextScroll += contentSize;
            }
            container.scrollLeft = nextScroll;
          } else {
            const step = speed * deltaTime * (reverse ? -1 : 1);
            let nextScroll = container.scrollTop + step;

            if (!reverse && nextScroll >= contentSize) {
              nextScroll -= contentSize;
            } else if (reverse && nextScroll <= 0) {
              nextScroll += contentSize;
            }
            container.scrollTop = nextScroll;
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [reverse, pauseOnHover, isHovered, vertical]);

  /* ── Drag-to-scroll (mouse) ── */
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    isUserInteracting.current = true;
    if (containerRef.current) {
      startX.current = e.pageX - containerRef.current.offsetLeft;
      startY.current = e.pageY - containerRef.current.offsetTop;
      scrollLeft.current = containerRef.current.scrollLeft;
      scrollTop.current = containerRef.current.scrollTop;
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    e.preventDefault();
    if (!vertical) {
      const x = e.pageX - containerRef.current.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      containerRef.current.scrollLeft = scrollLeft.current - walk;
    } else {
      const y = e.pageY - containerRef.current.offsetTop;
      const walk = (y - startY.current) * 1.5;
      containerRef.current.scrollTop = scrollTop.current - walk;
    }
  };

  const stopDrag = () => {
    isDragging.current = false;
    setTimeout(() => {
      isUserInteracting.current = false;
    }, 1000);
  };

  /* ── Touch-to-scroll ── */
  const onTouchStart = (e: React.TouchEvent) => {
    isUserInteracting.current = true;
    if (containerRef.current) {
      startX.current = e.touches[0].pageX - containerRef.current.offsetLeft;
      startY.current = e.touches[0].pageY - containerRef.current.offsetTop;
      scrollLeft.current = containerRef.current.scrollLeft;
      scrollTop.current = containerRef.current.scrollTop;
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    if (!vertical) {
      const x = e.touches[0].pageX - containerRef.current.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      containerRef.current.scrollLeft = scrollLeft.current - walk;
    } else {
      const y = e.touches[0].pageY - containerRef.current.offsetTop;
      const walk = (y - startY.current) * 1.5;
      containerRef.current.scrollTop = scrollTop.current - walk;
    }
  };

  const onTouchEnd = () => {
    setTimeout(() => {
      isUserInteracting.current = false;
    }, 1000);
  };

  return (
    <div
      ref={containerRef}
      {...props}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={stopDrag}
      onMouseLeave={() => {
        stopDrag();
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className={cn(
        "flex overflow-x-auto scrollbar-hide p-2 [--gap:1rem] [flex-direction:row]",
        "cursor-grab active:cursor-grabbing select-none",
        {
          "[flex-direction:column] overflow-y-auto overflow-x-hidden": vertical,
        },
        className,
      )}
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            ref={i === 0 ? firstChildRef : null}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "flex-row pr-[var(--gap)]": !vertical,
              "flex-col pb-[var(--gap)]": vertical,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
