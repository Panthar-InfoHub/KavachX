"use client";

import { motion } from "motion/react";

interface GradientOrbProps {
    size?: "sm" | "md" | "lg" | "xl";
    color?: "pink" | "purple" | "blue" | "cyan";
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
    blur?: boolean;
}

const sizeMap = {
    sm: "w-32 h-32",
    md: "w-48 h-48",
    lg: "w-64 h-64",
    xl: "w-96 h-96",
};

const colorMap = {
    pink: "from-pink-500 to-rose-500",
    purple: "from-purple-500 to-pink-500",
    blue: "from-blue-500 to-cyan-500",
    cyan: "from-cyan-400 to-blue-500",
};

const positionMap = {
    "top-left": "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
    "top-right": "top-0 right-0 translate-x-1/2 -translate-y-1/2",
    "bottom-left": "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
    "bottom-right": "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
};

export default function GradientOrb({
    size = "md",
    color = "pink",
    position = "center",
    blur = true,
}: GradientOrbProps) {
    return (
        <motion.div
            className={`absolute ${sizeMap[size]} ${positionMap[position]} pointer-events-none`}
            animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
            }}
            transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            }}
        >
            <div
                className={`w-full h-full rounded-full bg-gradient-to-br ${colorMap[color]} opacity-60 ${blur ? "blur-3xl" : ""
                    }`}
            />
        </motion.div>
    );
}
