"use client";

import { cn } from '@/lib/utils';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function FadeIn({
    children,
    direction = 'up',
    delay = 0,
    className,
    duration = 0.9,
    once = true,
    amount = 0.2
}: any) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, amount });

    const getDirectionOffset = () => {
        switch (direction) {
            case 'up': return { y: 40, x: 0 };
            case 'down': return { y: -40, x: 0 };
            case 'left': return { x: 40, y: 0 }; // Coming from right to left
            case 'right': return { x: -40, y: 0 }; // Coming from left to right
            default: return { y: 0, x: 0 };
        }
    };

    const initialOffset = getDirectionOffset();

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, ...initialOffset }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...initialOffset }}
            transition={{
                duration,
                delay: delay / 1000,
                ease: [0.16, 1, 0.3, 1] // Matches cubic-bezier(0.16, 1, 0.3, 1) from original CSS
            }}
            className={cn("will-change-[opacity,transform]", className)}
        >
            {children}
        </motion.div>
    );
}
