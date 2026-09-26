"use client";

import React, { createContext, useContext, useState } from "react";
import VendorRegistrationModal from "./vendor-registration-modal";

interface VendorRegistrationContextType {
  isVendorRegistrationOpen: boolean;
  openVendorRegistration: () => void;
  closeVendorRegistration: () => void;
}

const VendorRegistrationContext = createContext<VendorRegistrationContextType | undefined>(undefined);

export function VendorRegistrationProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openVendorRegistration = () => setIsOpen(true);
  const closeVendorRegistration = () => setIsOpen(false);

  return (
    <VendorRegistrationContext.Provider
      value={{
        isVendorRegistrationOpen: isOpen,
        openVendorRegistration,
        closeVendorRegistration,
      }}
    >
      {children}
      <VendorRegistrationModal isOpen={isOpen} onClose={closeVendorRegistration} />
    </VendorRegistrationContext.Provider>
  );
}

export function useVendorRegistration() {
  const context = useContext(VendorRegistrationContext);
  if (!context) {
    throw new Error("useVendorRegistration must be used within a VendorRegistrationProvider");
  }
  return context;
}
