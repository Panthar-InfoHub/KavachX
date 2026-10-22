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
  speed?: number;
  [key: string]: any;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 5,
  speed = 40,
  ...props
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstChildRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const isUserInteracting = useRef(false);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
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
        const contentSize = vertical
          ? firstChild.offsetHeight
          : firstChild.offsetWidth;

        if (contentSize > 0) {
          if (!vertical) {
            const step = speed * deltaTime * (reverse ? -1 : 1);
            let nextScroll = container.scrollLeft + step;

            while (nextScroll < contentSize) {
              nextScroll += contentSize;
            }
            while (nextScroll >= 2 * contentSize) {
              nextScroll -= contentSize;
            }
            container.scrollLeft = nextScroll;
          } else {
            const step = speed * deltaTime * (reverse ? -1 : 1);
            let nextScroll = container.scrollTop + step;

            while (nextScroll < contentSize) {
              nextScroll += contentSize;
            }
            while (nextScroll >= 2 * contentSize) {
              nextScroll -= contentSize;
            }
            container.scrollTop = nextScroll;
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [reverse, pauseOnHover, isHovered, vertical, speed]);

  // Global mousemove and mouseup listeners to allow drag even if mouse leaves container
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !containerRef.current || !firstChildRef.current) return;
      e.preventDefault();

      const contentSize = vertical
        ? firstChildRef.current.offsetHeight
        : firstChildRef.current.offsetWidth;
      if (contentSize <= 0) return;

      if (!vertical) {
        const deltaX = (e.pageX - lastX.current) * 1.5;
        lastX.current = e.pageX;
        let nextScroll = containerRef.current.scrollLeft - deltaX;

        while (nextScroll < contentSize) {
          nextScroll += contentSize;
        }
        while (nextScroll >= 2 * contentSize) {
          nextScroll -= contentSize;
        }
        containerRef.current.scrollLeft = nextScroll;
      } else {
        const deltaY = (e.pageY - lastY.current) * 1.5;
        lastY.current = e.pageY;
        let nextScroll = containerRef.current.scrollTop - deltaY;

        while (nextScroll < contentSize) {
          nextScroll += contentSize;
        }
        while (nextScroll >= 2 * contentSize) {
          nextScroll -= contentSize;
        }
        containerRef.current.scrollTop = nextScroll;
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
        if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
        resumeTimeoutRef.current = setTimeout(() => {
          isUserInteracting.current = false;
        }, 1000);
      }
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    window.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, [vertical]);

  /* ── Drag-to-scroll (mouse) ── */
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    isUserInteracting.current = true;
    lastX.current = e.pageX;
    lastY.current = e.pageY;
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
  };

  /* ── Touch-to-scroll ── */
  const onTouchStart = (e: React.TouchEvent) => {
    isUserInteracting.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    if (e.touches.length > 0) {
      lastX.current = e.touches[0].pageX;
      lastY.current = e.touches[0].pageY;
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current || !firstChildRef.current || e.touches.length === 0) return;
    const contentSize = vertical
      ? firstChildRef.current.offsetHeight
      : firstChildRef.current.offsetWidth;
    if (contentSize <= 0) return;

    if (!vertical) {
      const currentX = e.touches[0].pageX;
      const deltaX = (currentX - lastX.current) * 1.2;
      lastX.current = currentX;
      let nextScroll = containerRef.current.scrollLeft - deltaX;

      while (nextScroll < contentSize) {
        nextScroll += contentSize;
      }
      while (nextScroll >= 2 * contentSize) {
        nextScroll -= contentSize;
      }
      containerRef.current.scrollLeft = nextScroll;
    } else {
      const currentY = e.touches[0].pageY;
      const deltaY = (currentY - lastY.current) * 1.2;
      lastY.current = currentY;
      let nextScroll = containerRef.current.scrollTop - deltaY;

      while (nextScroll < contentSize) {
        nextScroll += contentSize;
      }
      while (nextScroll >= 2 * contentSize) {
        nextScroll -= contentSize;
      }
      containerRef.current.scrollTop = nextScroll;
    }
  };

  const onTouchEnd = () => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isUserInteracting.current = false;
    }, 1000);
  };

  /* ── Native trackpad / wheel scroll wrap ── */
  const onScroll = () => {
    if (isDragging.current) return;
    const container = containerRef.current;
    const firstChild = firstChildRef.current;
    if (!container || !firstChild) return;

    const contentSize = vertical
      ? firstChild.offsetHeight
      : firstChild.offsetWidth;
    if (contentSize <= 0) return;

    if (!vertical) {
      if (container.scrollLeft < contentSize * 0.5) {
        container.scrollLeft += contentSize;
      } else if (container.scrollLeft >= contentSize * 2.5) {
        container.scrollLeft -= contentSize;
      }
    } else {
      if (container.scrollTop < contentSize * 0.5) {
        container.scrollTop += contentSize;
      } else if (container.scrollTop >= contentSize * 2.5) {
        container.scrollTop -= contentSize;
      }
    }
  };

  return (
    <div
      ref={containerRef}
      {...props}
      onMouseDown={onMouseDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onScroll={onScroll}
      onDragStart={(e) => e.preventDefault()}
      className={cn(
        "flex overflow-hidden scrollbar-hide p-2 [--gap:1rem]",
        "cursor-grab active:cursor-grabbing select-none",
        vertical ? "flex-col" : "flex-row",
        className,
      )}
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        ...props.style,
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
