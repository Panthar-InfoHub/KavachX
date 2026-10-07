"use client";

import { ReactNode } from "react";
import FadeIn from "./FadeIn";

interface BentoCardProps {
    title: string;
    description?: string;
    icon?: ReactNode;
    children?: ReactNode;
    gridSpan?: string;
    delay?: number;
    nebulaColor?: "blue" | "cyan" | "white" | "none";
    backgroundContent?: string | ReactNode;
    showOrbital?: boolean;
    className?: string;
    noFadeIn?: boolean;
    variant?: "default" | "light" | "black";
    lineClamp?: string;
    contentPadding?: string;
    iconPosition?: "top" | "inline";
    titleSize?: string;
    descSize?: string;
}

export default function BentoCard({
    title,
    description,
    icon,
    children,
    gridSpan = "",
    delay = 0,
    nebulaColor = "none",
    backgroundContent,
    showOrbital = false,
    className = "",
    noFadeIn = false,
    variant = "default",
    lineClamp = "line-clamp-2 md:line-clamp-none",
    contentPadding,
    iconPosition = "inline",
    titleSize,
    descSize,
}: BentoCardProps) {
    const isLight = variant === "light";
    const isBlack = variant === "black";

    const bgClass = isLight
        ? "bg-white border-1 border-slate-600/20 shadow-none"
        : isBlack
            ? "bg-black border border-white/10 shadow-none"
            : "bg-gradient-to-b from-[#0c1736]/30 via-[#070e24]/30 to-[#030716]/30 border border-blue-500/15 backdrop-blur-xl shadow-none";
    const titleClass = isLight
        ? "text-slate-900 font-syne font-bold"
        : "text-white font-syne font-bold drop-shadow-md";

    const descClass = isLight
        ? "text-slate-600 font-medium"
        : isBlack
            ? "text-gray-300 font-normal"
            : "text-blue-100/90 font-normal drop-shadow";

    const cardContent = (
        <div
            className={`
      relative h-full rounded-[2.5rem] overflow-hidden 
      ${bgClass}
      ${className}
    `.trim()}
        >
            {/* 🌌 Nebula Glow */}
            {nebulaColor !== "none" && (
                <div
                    className={`nebula-glow nebula-${nebulaColor} w-[150%] h-[150%] -top-[25%] -left-[25%] ${isLight ? 'opacity-20' : isBlack ? 'opacity-5' : 'opacity-50'} transition-opacity duration-700`}
                />
            )}

            {/* ✨ Stars/Noise */}
            <div className={`absolute inset-0 ${isLight ? 'opacity-10' : isBlack ? 'opacity-0' : 'opacity-30'} pointer-events-none mix-blend-overlay`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2)_0%,transparent_1%)] bg-[length:24px_24px]" />
            </div>

            {/* 🪐 Orbital Elements */}
            {showOrbital && (
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none overflow-hidden ${isLight ? 'opacity-30' : 'opacity-50'}`}>
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] ${isLight ? 'border-blue-500/20' : 'border-blue-400/15'} rounded-full animate-[orbit-rotate_20s_linear_infinite]`} />
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] ${isLight ? 'border-blue-500/25' : 'border-blue-400/20'} rounded-full animate-[orbit-rotate_15s_linear_infinite_reverse]`} />
                    <div className="absolute top-[10%] right-[10%] w-2 h-2 bg-blue-300 rounded-full blur-[1px] animate-pulse-soft" />
                    <div className="absolute bottom-[20%] left-[15%] w-1.5 h-1.5 bg-cyan-300 rounded-full blur-[0.5px] animate-pulse-soft" style={{ animationDelay: '1s' }} />
                </div>
            )}

            {/* Background media */}
            {backgroundContent && (
                <div className="absolute inset-0 z-0">
                    {typeof backgroundContent === "string" ? (
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover opacity-40 transition-opacity duration-700"
                        >
                            <source src={backgroundContent} type="video/mp4" />
                        </video>
                    ) : (
                        backgroundContent
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </div>
            )}

            {/* 📝 Content */}
            <div className={`relative z-10 flex flex-col justify-between h-full ${contentPadding || "p-3.5 sm:p-5 md:p-8 xl:p-10"}`}>
                <div>
                    <div className={iconPosition === "top" ? "block mb-3 md:mb-5" : "flex items-center gap-2.5 md:block mb-2 md:mb-5"}>
                        {icon && (
                            <div className={iconPosition === "top" ? "shrink-0 mb-3 md:mb-4 origin-left" : "shrink-0 mb-0 md:mb-4 origin-left"}>
                                {icon}
                            </div>
                        )}

                        <h3 className={`${titleSize || "text-sm sm:text-base md:text-xl xl:text-2xl"} tracking-tight leading-tight mb-1 md:mb-3 ${titleClass}`}>
                            {title}
                        </h3>
                    </div>

                    {description && (
                        <p className={`${descSize || "text-[11px] sm:text-xs md:text-sm xl:text-base"} leading-snug md:leading-relaxed ${lineClamp} max-w-full md:max-w-[95%] ${descClass}`}>
                            {description}
                        </p>
                    )}
                </div>

                {children && (
                    <div className="mt-2 md:mt-6 relative">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );

    if (noFadeIn) {
        return <div className={`h-full ${gridSpan}`}>{cardContent}</div>;
    }

    return (
        <FadeIn direction="up" delay={delay} className={gridSpan}>
            {cardContent}
        </FadeIn>
    );
}