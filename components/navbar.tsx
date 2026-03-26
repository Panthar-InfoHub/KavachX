"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { type Variants } from "motion";
import { NavbarConfig } from "@/types/navbar";
import Image from "next/image";

const NAVBAR_CONFIG: NavbarConfig = {
  logo: <Image src="/images/Logo.svg" alt="Logo" fill />,
  cta: {
    one: { text: "Log in", href: "#", variant: "primary" },
    two: { text: "Sign up", href: "#", variant: "secondary" },
  },
  menu: [
    {
      label: "Suraksha Kavach",
    //   dropdown: [
    //     {
    //       heading: "Account",
    //       links: [
    //         { text: "Profile", href: "#" },
    //         { text: "Security", href: "#" },
    //       ],
    //     },
    //     {
    //       heading: "Product",
    //       links: [
    //         { text: "Dashboard", href: "#" },
    //         { text: "Templates", href: "#" },
    //       ],
    //     },
    //   ],
    },
    {
      label: "AI Edge Box",
    //   dropdown: [
    //     {
    //       heading: "Team",
    //       links: [
    //         { text: "Members", href: "#" },
    //         { text: "Roles", href: "#" },
    //       ],
    //     },
    //   ],
    },
    {
      label: "Resources",
        dropdown: [
        {
          heading: "Company",
          links: [
            { text: "About Us", href: "#" },
            { text: "Contact Us", href: "#" },
          ],
        },
        {
          heading: "Policy",
          links: [
            { text: "Privacy Policy", href: "#" },
            { text: "Terms of Use", href: "#" },
          ],
        },
      ],
    },
  ],
};

/* =========================
   🔥 NAVBAR COMPONENT
========================= */

type AnimationDirection = "right-to-left" | "left-to-right";

export const Navbar: React.FC = () => {
  const config = NAVBAR_CONFIG;

  const [activeMenuItemIndex, setActiveMenuItemIndex] = useState<number | null>(
    null
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [animationDirection, setAnimationDirection] =
    useState<AnimationDirection>("right-to-left");

  const closeTimeoutRef = useRef<number | null>(null);
  const prevActiveMenuItemIndex = useRef<number | null>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileActiveDropdownIndex, setMobileActiveDropdownIndex] =
    useState<number | null>(null);

  useEffect(() => {
    if (
      activeMenuItemIndex !== null &&
      prevActiveMenuItemIndex.current !== null
    ) {
      setAnimationDirection(
        activeMenuItemIndex > prevActiveMenuItemIndex.current
          ? "right-to-left"
          : "left-to-right"
      );
    } else {
      setAnimationDirection("right-to-left");
    }
    prevActiveMenuItemIndex.current = activeMenuItemIndex;
  }, [activeMenuItemIndex]);

  const openDropdown = (index: number) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setActiveMenuItemIndex(index);
    setIsDropdownOpen(true);
  };

  const closeDropdown = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 100) as unknown as number;
  };

  const handleDropdownTransitionEnd = () => {
    if (!isDropdownOpen) {
      setActiveMenuItemIndex(null);
      prevActiveMenuItemIndex.current = null;
    }
  };

  const toggleMobileMenu = () => {
    const next = !isMobileMenuOpen;
    setIsMobileMenuOpen(next);
    if (!next) setMobileActiveDropdownIndex(null);
  };

  const toggleMobileDropdown = (index: number) => {
    setMobileActiveDropdownIndex(
      mobileActiveDropdownIndex === index ? null : index
    );
  };

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
  }, [isMobileMenuOpen]);

  const contentVariants: { [key in AnimationDirection]: Variants } = {
    "right-to-left": {
      initial: { opacity: 0, x: 100 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -100 },
    },
    "left-to-right": {
      initial: { opacity: 0, x: -100 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 100 },
    },
  };

  const containerVariants: Variants = {
    closed: { opacity: 0, pointerEvents: "none" },
    open: { opacity: 1, pointerEvents: "auto" },
  };

  return (
    <motion.nav className="sticky top-0 z-50 backdrop-blur-md bg-black/60 border-b border-white/10 text-white">
      <div className="flex items-center justify-between h-16 max-w-screen-xl mx-auto px-4">
        {/* Logo */}
        <div className="relative max-w-32 h-full w-full flex justify-center items-center">
          {config.logo}
        </div>

        {/* Desktop Menu */}
        <ul
          className="hidden md:flex items-center gap-8 mx-10"
          onMouseLeave={closeDropdown}
        >
          {config.menu.map((item, index) => (
            <li
              key={index}
              className="relative"
              onMouseEnter={() => item.dropdown && openDropdown(index)}
            >
              <a
                href={item.href || "#"}
                className="text-sm text-white/80 hover:text-white transition"
              >
                {item.label}
              </a>

              {activeMenuItemIndex === index && isDropdownOpen && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-[-6px] left-0 right-0 h-[1px] bg-white/80"
                />
              )}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={config.cta.one?.href}
            className={cn("text-sm text-white/70 hover:text-white transition", config.cta.one?.variant === "primary" ? "bg-white text-black px-4 py-1.5 rounded-full font-medium" : "")}
          >
            {config.cta.one?.text}
          </a>
          <a
            href={config.cta.two?.href}
            className={cn("text-sm text-white/70 hover:text-white transition", config.cta.two?.variant === "primary" ? "    t-sm bg-white text-black px-4 py-1.5 rounded-full font-medium")}
        
          >
            {config.cta.two?.text}
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={toggleMobileMenu}>
          ☰
        </button>
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {isDropdownOpen && activeMenuItemIndex !== null && (
          <motion.div
            className="hidden md:block absolute top-16 left-0 right-0 bg-black/95 border-t border-white/10"
            variants={containerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onMouseEnter={() =>
              closeTimeoutRef.current &&
              clearTimeout(closeTimeoutRef.current)
            }
            onMouseLeave={closeDropdown}
            onAnimationComplete={handleDropdownTransitionEnd}
          >
            <AnimatePresence mode="wait">
              {config.menu[activeMenuItemIndex]?.dropdown && (
                <motion.div
                  key={activeMenuItemIndex}
                  variants={contentVariants[animationDirection]}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="max-w-screen-xl mx-auto p-8"
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {config.menu[
                      activeMenuItemIndex
                    ].dropdown?.map((col, i) => (
                      <div key={i}>
                        <h3 className="text-xs uppercase text-white/40 mb-2">
                          {col.heading}
                        </h3>
                        <ul className="space-y-1">
                          {col.links.map((link, j) => (
                            <li key={j}>
                              <a
                                href={link.href}
                                className="text-sm text-white/80 hover:text-white"
                              >
                                {link.text}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};