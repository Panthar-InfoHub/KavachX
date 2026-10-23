"use client";

import React, { createContext, useContext, useState } from "react";
import PreBookingModal from "./pre-booking-modal";

interface PreBookingContextType {
  isPreBookingOpen: boolean;
  openPreBooking: () => void;
  closePreBooking: () => void;
}

const PreBookingContext = createContext<PreBookingContextType | undefined>(undefined);

export function PreBookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openPreBooking = () => setIsOpen(true);
  const closePreBooking = () => setIsOpen(false);

  return (
    <PreBookingContext.Provider
      value={{
        isPreBookingOpen: isOpen,
        openPreBooking,
        closePreBooking,
      }}
    >
      {children}
      <PreBookingModal isOpen={isOpen} onClose={closePreBooking} />
    </PreBookingContext.Provider>
  );
}

export function usePreBooking() {
  const context = useContext(PreBookingContext);
  if (!context) {
    throw new Error("usePreBooking must be used within a PreBookingProvider");
  }
  return context;
}
