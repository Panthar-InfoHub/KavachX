"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { AnnouncementBar } from "./announcement-bar";
import { Navbar } from "./navbar";

export function SiteHeader() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);

    const [isAtTop, setIsAtTop] = useState(true);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        
        // Handle hide/show logic
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }

        // Track if we're at the very top to push navbar down
        setIsAtTop(latest < 40);
    });

    return (
        <motion.header
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" }
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 z-100 w-full flex flex-col"
        >
            {/* Announcement Bar - Only show when at the very top */}
            <AnimatePresence>
                {isAtTop && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden bg-black"
                    >
                        <AnnouncementBar />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Navbar - Sits below announcement bar at top, moves to top when scrolled */}
            <div className="bg-black/95 backdrop-blur-md border-b border-white/10 w-full">
                <Navbar />
            </div>
        </motion.header>
    );
}
