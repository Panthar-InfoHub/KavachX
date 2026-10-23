"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function FadeIn({
  children,
  direction = "up",
  delay = 0,
  className,
  duration = 0.6,
  once = true,
}: any) {
  const getDirectionOffset = () => {
    switch (direction) {
      case "up":
        return { y: 24, x: 0 };
      case "down":
        return { y: -24, x: 0 };
      case "left":
        return { x: 24, y: 0 };
      case "right":
        return { x: -24, y: 0 };
      default:
        return { y: 0, x: 0 };
    }
  };

  const initialOffset = getDirectionOffset();

  return (
    <motion.div
      initial={{ opacity: 0, ...initialOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "0px 0px -20px 0px" }}
      transition={{
        duration,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
