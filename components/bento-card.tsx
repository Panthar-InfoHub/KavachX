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
}: BentoCardProps) {
    return (
        <FadeIn direction="up" delay={delay} className={gridSpan}>
            <div
                className={`
          relative h-full rounded-[2rem] overflow-hidden transition-all duration-500 
          hover:shadow-2xl hover:shadow-white/5 group
          bg-white/[0.03] backdrop-blur-3xl border border-white/10
          ${className}
        `.trim()}
            >
                {/* 🌌 Nebula Glow */}
                {nebulaColor !== "none" && (
                    <div 
                        className={`nebula-glow nebula-${nebulaColor} w-[150%] h-[150%] -top-[25%] -left-[25%] opacity-20 group-hover:opacity-40 transition-opacity duration-700`} 
                    />
                )}

                {/* ✨ Stars/Noise */}
                <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_1%)] bg-[length:24px_24px]" />
                </div>

                {/* 🪐 Orbital Elements */}
                {showOrbital && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none overflow-hidden opacity-30">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full animate-[orbit-rotate_20s_linear_infinite]" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-white/10 rounded-full animate-[orbit-rotate_15s_linear_infinite_reverse]" />
                        <div className="absolute top-[10%] right-[10%] w-2 h-2 bg-white/40 rounded-full blur-[1px] animate-pulse-soft" />
                        <div className="absolute bottom-[20%] left-[15%] w-1 h-1 bg-white/20 rounded-full blur-[0.5px] animate-pulse-soft" style={{ animationDelay: '1s' }} />
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
                                className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700"
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
                <div className="relative z-10 flex flex-col h-full p-6 md:p-8">
                    <div className="mb-auto">
                        {icon && (
                            <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500 origin-left">
                                {icon}
                            </div>
                        )}
                        
                        <h3 className="font-sans text-xl md:text-2xl font-medium text-white tracking-tight leading-tight mb-2">
                            {title}
                        </h3>
                        
                        {description && (
                            <p className="text-sm md:text-base text-white/60 leading-relaxed font-light max-w-[95%] drop-shadow-sm">
                                {description}
                            </p>
                        )}
                    </div>

                    {children && (
                        <div className="mt-6 relative">
                            {children}
                        </div>
                    )}
                </div>
            </div>
        </FadeIn>
    );
}
