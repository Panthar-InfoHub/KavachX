"use client";

interface IconProps {
    className?: string;
    animate?: boolean;
}

export function MonitoringIcon({ className = "w-12 h-12", animate = false }: IconProps) {
    return (
        <svg
            viewBox="0 0 64 64"
            fill="none"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.3" />
            <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="1.5" />
            
            {/* Orbital node */}
            <g className={animate ? "animate-[orbit-rotate_4s_linear_infinite]" : ""} style={{ transformOrigin: '32px 32px' }}>
                <circle cx="32" cy="12" r="3" fill="currentColor">
                    <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
                </circle>
            </g>
            
            {/* Center glow */}
            <circle cx="32" cy="32" r="2" fill="currentColor" />
        </svg>
    );
}

export function AutomationIcon({ className = "w-12 h-12", animate = false }: IconProps) {
    return (
        <svg
            viewBox="0 0 64 64"
            fill="none"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M12 32C12 20.9543 20.9543 12 32 12C43.0457 12 52 20.9543 52 32" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
            <path d="M12 32C12 43.0457 20.9543 52 32 52C43.0457 52 52 43.0457 52 32" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeDasharray="4 4" opacity="0.2" />
            
            {/* Core nodes */}
            <circle cx="32" cy="32" r="6" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="32" cy="32" r="2" fill="currentColor" />
            
            {/* Floating particles */}
            <circle cx="20" cy="20" r="1.5" fill="currentColor" className={animate ? "animate-pulse" : ""} />
            <circle cx="44" cy="44" r="1.5" fill="currentColor" className={animate ? "animate-pulse" : ""} style={{ animationDelay: '0.5s' }} />
        </svg>
    );
}

export function AIIcon({ className = "w-12 h-12", animate = false }: IconProps) {
    return (
        <svg
            viewBox="0 0 64 64"
            fill="none"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect x="20" y="20" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            <circle cx="32" cy="32" r="10" stroke="currentColor" strokeWidth="1" />
            
            {/* Crosshair elements */}
            <line x1="32" y1="12" x2="32" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.6" />
            <line x1="32" y1="44" x2="32" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.6" />
            <line x1="12" y1="32" x2="20" y2="32" stroke="currentColor" strokeWidth="1" opacity="0.6" />
            <line x1="44" y1="32" x2="52" y2="32" stroke="currentColor" strokeWidth="1" opacity="0.6" />
            
            {/* Central pulse */}
            <circle cx="32" cy="32" r="3" fill="currentColor" className={animate ? "animate-pulse" : ""} />
        </svg>
    );
}

export function ScaleIcon({ className = "w-12 h-12", animate = false }: IconProps) {
    return (
        <svg
            viewBox="0 0 64 64"
            fill="none"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
            <circle cx="32" cy="32" r="16" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
            
            {/* Expanding nodes */}
            <g className={animate ? "animate-[float-up_3s_ease-in-out_infinite]" : ""}>
                <circle cx="32" cy="32" r="4" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="32" cy="32" r="1" fill="currentColor" />
            </g>
            
            <circle cx="48" cy="16" r="2" fill="currentColor" opacity="0.6" />
            <circle cx="16" cy="48" r="2" fill="currentColor" opacity="0.6" />
        </svg>
    );
}

export function ShieldIcon({ className = "w-12 h-12", animate = false }: IconProps) {
    return (
        <svg
            viewBox="0 0 64 64"
            fill="none"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M32 10L50 18V32C50 44 32 54 32 54C32 54 14 44 14 32V18L32 10Z" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            <path d="M32 18L42 22V32C42 38 32 44 32 44C32 44 22 38 22 32V22L32 18Z" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="32" cy="31" r="2" fill="currentColor" className={animate ? "animate-pulse" : ""} />
        </svg>
    );
}

export function SpeedIcon({ className = "w-12 h-12", animate = false }: IconProps) {
    return (
        <svg
            viewBox="0 0 64 64"
            fill="none"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M16 44C13.5 40 12 36.5 12 32C12 20.9543 20.9543 12 32 12C43.0457 12 52 20.9543 52 32C52 36.5 50.5 40 48 44" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
            
            {/* Needle line */}
            <g className={animate ? "animate-[orbit-rotate_2s_ease-in-out_infinite]" : ""} style={{ transformOrigin: '32px 32px' }}>
                <line x1="32" y1="32" x2="32" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </g>
            
            <circle cx="32" cy="32" r="3" fill="currentColor" />
        </svg>
    );
}
