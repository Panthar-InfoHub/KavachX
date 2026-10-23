"use client";

import Lenis from "lenis";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const LenisDiv = ({ children }: { children: React.ReactNode }) => {
    const lenisRef = useRef<Lenis | null>(null);
    const rafRef = useRef<number | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1.0,
            touchMultiplier: 1.5,
        });

        lenisRef.current = lenis;

        const raf = (time: number) => {
            lenis.raf(time);
            rafRef.current = requestAnimationFrame(raf);
        };

        rafRef.current = requestAnimationFrame(raf);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (!lenisRef.current) return;
        lenisRef.current.scrollTo(0, {
            immediate: true,
            force: true,
        });
    }, [pathname]);

    return <>{children}</>;
};

export default LenisDiv;
