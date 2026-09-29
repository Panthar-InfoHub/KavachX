"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, Loader2, Sparkles, Check } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { submitVendorRegistrationAction, VendorFormData } from "@/lib/vendor-registration.action";
import { trackEvent } from "@/lib/analytics";

interface VendorRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BUSINESS_DESCRIPTIONS = [
  "CCTV Dealer / Reseller",
  "Security System Integrator",
  "IT / Hardware Distributor",
  "Security Solution Provider",
  "Installation & Service Provider",
  "Other",
];

const PRODUCTS_SOLD_OPTIONS = [
  "CCTV & Surveillance",
  "DVR / NVR",
  "Access Control",
  "Networking / IT Hardware",
  "Other",
];

const CUSTOMER_SEGMENTS = [
  "Retail / Shops",
  "Offices",
  "Warehouses",
  "Factories / Industries",
  "Institutions",
  "Residential / Societies",
  "Other",
];

const MONTHLY_CUSTOMERS_OPTIONS = ["1–10", "11–25", "26–50", "50+"];

const PARTNERSHIP_TYPES = [
  "Distributor",
  "Dealer / Reseller",
  "System Integrator",
  "Installation & Service Partner",
  "Regional Channel Partner",
];

const KAVACHX_SOLUTIONS_OPTIONS = [
  "AI Surveillance",
  "Intrusion Detection",
  "Fire & Smoke Detection",
  "Footfall / People Counting",
  "Complete KavachX Solution",
];

export default function VendorRegistrationModal({ isOpen, onClose }: VendorRegistrationModalProps) {
  const [formData, setFormData] = useState<VendorFormData>({
    contactPersonName: "",
    designation: "",
    companyName: "",
    phone: "",
    email: "",
    businessType: "",
    city: "",
    state: "",
    districts: "",
    productsDistributed: [],
    primaryCustomers: [],
    monthlyCustomers: "",
    partnershipType: "",
    interestedSolutions: [],
    businessOverview: "",
  });

  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleInputChange = (field: keyof VendorFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleMultiSelectToggle = (field: "productsDistributed" | "primaryCustomers" | "interestedSolutions", option: string) => {
    let current = [...formData[field]];
    if (current.includes(option)) {
      current = current.filter((item) => item !== option);
    } else {
      current.push(option);
    }
    setFormData((prev) => ({ ...prev, [field]: current }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.contactPersonName.trim()) newErrors.contactPersonName = "Contact person name is required";
    if (!formData.designation.trim()) newErrors.designation = "Designation is required";
    if (!formData.companyName.trim()) newErrors.companyName = "Company/business name is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.trim().length !=10) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.businessType) newErrors.businessType = "Please select your business description";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (formData.productsDistributed.length === 0) newErrors.productsDistributed = "Select at least one product line";
    if (formData.primaryCustomers.length === 0) newErrors.primaryCustomers = "Select at least one customer segment";
    if (!formData.monthlyCustomers) newErrors.monthlyCustomers = "Please select monthly customer count";
    if (!formData.partnershipType) newErrors.partnershipType = "Please select partnership type";
    if (formData.interestedSolutions.length === 0) newErrors.interestedSolutions = "Select at least one KavachX solution";
    if (!formData.businessOverview.trim()) newErrors.businessOverview = "Please tell us briefly about your business";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please answer all required questions before submitting.");
      return;
    }

    setLoading(true);

    try {
      const res = await submitVendorRegistrationAction(formData);

      if (res.success) {
        setIsSubmitted(true);
        toast.success("Vendor registration submitted successfully!");
        trackEvent({
          name: "cta_click",
          params: {
            cta_name: "vendor_registration_submitted",
            cta_location: "vendor_modal",
          },
        });
      } else {
        toast.error(res.message || "Failed to submit vendor registration.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      contactPersonName: "",
      designation: "",
      companyName: "",
      phone: "",
      email: "",
      businessType: "",
      city: "",
      state: "",
      districts: "",
      productsDistributed: [],
      primaryCustomers: [],
      monthlyCustomers: "",
      partnershipType: "",
      interestedSolutions: [],
      businessOverview: "",
    });
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* White Theme Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl bg-white border border-gray-200 rounded-[2rem] shadow-2xl overflow-hidden z-10 my-auto text-gray-900 flex flex-col max-h-[85vh] sm:max-h-[90vh]"
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
          >
            {/* Header */}
            <div className="relative px-6 sm:px-8 pt-7 pb-5 border-b border-gray-100 bg-gray-50/80 flex justify-between items-start shrink-0">
              <div>
                <div className="mb-4">
                  <Image
                    src="/images/logo.png"
                    alt="KavachX Logo"
                    width={80}
                    height={36}
                    className="h-4 w-auto object-contain invert"
                  />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-syne tracking-tight text-black">
                  Vendor Partner Registration
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl font-jakarta leading-relaxed">
                  Join the <span className="font-semibold text-black">KavachX Distribution Network</span> — Partner with KavachX to bring AI-powered surveillance to businesses through your existing network.
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-gray-200/70 hover:bg-gray-300 text-gray-700 hover:text-black transition flex items-center justify-center shrink-0 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div
              className="p-6 sm:p-8 overflow-y-auto space-y-8 font-jakarta flex-1 custom-scrollbar min-h-0 bg-white"
              data-lenis-prevent="true"
              data-lenis-prevent-wheel="true"
              data-lenis-prevent-touch="true"
              onWheel={(e) => e.stopPropagation()}
            >
              {isSubmitted ? (
                /* Success Screen */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 px-4 text-center flex flex-col items-center justify-center space-y-5"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-2">
                    <CheckCircle2 className="w-10 h-10 animate-bounce" />
                  </div>
                  <h3 className="text-2xl font-bold font-syne text-black">
                    Partner Registration Received!
                  </h3>
                  <p className="text-sm text-gray-600 max-w-md leading-relaxed">
                    Thank you, <span className="font-semibold text-black">{formData.contactPersonName}</span>. 
                    Our team will review details for <span className="font-semibold text-black">{formData.companyName}</span> and contact you at <span className="font-mono text-black font-semibold">{formData.phone}</span> / <span className="font-mono text-black font-semibold">{formData.email}</span> regarding partnership opportunities.
                  </p>
                  
                  <div className="w-full max-w-md p-5 bg-gray-50 border border-gray-200 rounded-2xl text-left text-xs space-y-2 text-gray-700">
                    <div className="font-bold font-syne text-black uppercase tracking-wider text-[11px] mb-2">Submitted Registration Summary</div>
                    <div><strong className="text-black">Company:</strong> {formData.companyName}</div>
                    <div><strong className="text-black">Location:</strong> {formData.city}, {formData.state}</div>
                    <div><strong className="text-black">Partnership:</strong> {formData.partnershipType}</div>
                  </div>

                  <button
                    onClick={handleReset}
                    className="mt-6 px-10 py-3.5 bg-black text-white hover:bg-gray-800 font-syne font-bold rounded-full text-sm transition tracking-widest uppercase cursor-pointer shadow-lg"
                  >
                    Done
                  </button>
                </motion.div>
              ) : (
                /* Form Questions */
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Q1: CONTACT PERSON */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                      <span className="w-6 h-6 rounded-full bg-black text-white font-syne font-bold text-xs flex items-center justify-center shrink-0">
                        1
                      </span>
                      <h3 className="text-base sm:text-lg font-bold font-syne tracking-wide text-black">
                        Contact Person & Designation
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.contactPersonName}
                          onChange={(e) => handleInputChange("contactPersonName", e.target.value)}
                          className={`w-full px-4 py-3.5 bg-gray-50 border rounded-xl text-sm text-black placeholder:text-gray-400 focus:outline-none focus:bg-white transition-all ${
                            errors.contactPersonName
                              ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                              : "border-gray-200 focus:border-black focus:ring-1 focus:ring-black"
                          }`}
                        />
                        {errors.contactPersonName && (
                          <p className="text-xs text-rose-500 font-medium">{errors.contactPersonName}</p>
                        )}
                      </div>

                      {/* Designation */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Designation <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Owner, Managing Director"
                          value={formData.designation}
                          onChange={(e) => handleInputChange("designation", e.target.value)}
                          className={`w-full px-4 py-3.5 bg-gray-50 border rounded-xl text-sm text-black placeholder:text-gray-400 focus:outline-none focus:bg-white transition-all ${
                            errors.designation
                              ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                              : "border-gray-200 focus:border-black focus:ring-1 focus:ring-black"
                          }`}
                        />
                        {errors.designation && (
                          <p className="text-xs text-rose-500 font-medium">{errors.designation}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Q2: COMPANY NAME */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                      <span className="w-6 h-6 rounded-full bg-black text-white font-syne font-bold text-xs flex items-center justify-center shrink-0">
                        2
                      </span>
                      <h3 className="text-base sm:text-lg font-bold font-syne tracking-wide text-black">
                        Company / Business Name
                      </h3>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Company Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter company / business name"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange("companyName", e.target.value)}
                        className={`w-full px-4 py-3.5 bg-gray-50 border rounded-xl text-sm text-black placeholder:text-gray-400 focus:outline-none focus:bg-white transition-all ${
                          errors.companyName
                            ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                            : "border-gray-200 focus:border-black focus:ring-1 focus:ring-black"
                        }`}
                      />
                      {errors.companyName && (
                        <p className="text-xs text-rose-500 font-medium">{errors.companyName}</p>
                      )}
                    </div>
                  </div>

                  {/* Q3 & Q4: CONTACT NUMBER & BUSINESS EMAIL */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                      <span className="w-6 h-6 rounded-full bg-black text-white font-syne font-bold text-xs flex items-center justify-center shrink-0">
                        3
                      </span>
                      <h3 className="text-base sm:text-lg font-bold font-syne tracking-wide text-black">
                        Contact Details
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Contact Number <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="Enter contact number"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className={`w-full px-4 py-3.5 bg-gray-50 border rounded-xl text-sm text-black placeholder:text-gray-400 focus:outline-none focus:bg-white transition-all ${
                            errors.phone
                              ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                              : "border-gray-200 focus:border-black focus:ring-1 focus:ring-black"
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-xs text-rose-500 font-medium">{errors.phone}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Business Email <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="Enter business email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={`w-full px-4 py-3.5 bg-gray-50 border rounded-xl text-sm text-black placeholder:text-gray-400 focus:outline-none focus:bg-white transition-all ${
                            errors.email
                              ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                              : "border-gray-200 focus:border-black focus:ring-1 focus:ring-black"
                          }`}
                        />
                        {errors.email && (
                          <p className="text-xs text-rose-500 font-medium">{errors.email}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Q5: BUSINESS DESCRIPTION */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                      <span className="w-6 h-6 rounded-full bg-black text-white font-syne font-bold text-xs flex items-center justify-center shrink-0">
                        4
                      </span>
                      <h3 className="text-base sm:text-lg font-bold font-syne tracking-wide text-black">
                        What best describes your business? <span className="text-rose-500">*</span>
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {BUSINESS_DESCRIPTIONS.map((type) => {
                        const selected = formData.businessType === type;
                        return (
                          <button
                            type="button"
                            key={type}
                            onClick={() => handleInputChange("businessType", type)}
                            className={`flex items-center gap-3 p-3.5 rounded-xl border text-left text-sm transition-all cursor-pointer ${
                              selected
                                ? "bg-black text-white border-black font-semibold shadow-md"
                                : "bg-gray-50/80 border-gray-200 text-gray-800 hover:border-gray-400 hover:bg-gray-100/80"
                            }`}
                          >
                            <span
                              className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                                selected
                                  ? "border-white bg-white"
                                  : "border-gray-400 bg-white"
                              }`}
                            >
                              {selected && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                            </span>
                            <span>{type}</span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.businessType && (
                      <p className="text-xs text-rose-500 font-medium">{errors.businessType}</p>
                    )}
                  </div>

                  {/* Q6: OPERATING LOCATION */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                      <span className="w-6 h-6 rounded-full bg-black text-white font-syne font-bold text-xs flex items-center justify-center shrink-0">
                        5
                      </span>
                      <h3 className="text-base sm:text-lg font-bold font-syne tracking-wide text-black">
                        Where do you currently operate?
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* City */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          City <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="City name"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          className={`w-full px-4 py-3.5 bg-gray-50 border rounded-xl text-sm text-black placeholder:text-gray-400 focus:outline-none focus:bg-white transition-all ${
                            errors.city
                              ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                              : "border-gray-200 focus:border-black focus:ring-1 focus:ring-black"
                          }`}
                        />
                        {errors.city && <p className="text-xs text-rose-500 font-medium">{errors.city}</p>}
                      </div>

                      {/* State */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          State <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="State name"
                          value={formData.state}
                          onChange={(e) => handleInputChange("state", e.target.value)}
                          className={`w-full px-4 py-3.5 bg-gray-50 border rounded-xl text-sm text-black placeholder:text-gray-400 focus:outline-none focus:bg-white transition-all ${
                            errors.state
                              ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                              : "border-gray-200 focus:border-black focus:ring-1 focus:ring-black"
                          }`}
                        />
                        {errors.state && <p className="text-xs text-rose-500 font-medium">{errors.state}</p>}
                      </div>

                      {/* Districts */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Districts <span className="text-gray-400 font-normal">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Coverage districts"
                          value={formData.districts}
                          onChange={(e) => handleInputChange("districts", e.target.value)}
                          className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black focus:bg-white focus:ring-1 focus:ring-black transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Q7: PRODUCTS DISTRIBUTED */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                      <span className="w-6 h-6 rounded-full bg-black text-white font-syne font-bold text-xs flex items-center justify-center shrink-0">
                        6
                      </span>
                      <h3 className="text-base sm:text-lg font-bold font-syne tracking-wide text-black">
                        What products do you currently sell or distribute? <span className="text-rose-500">*</span>
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {PRODUCTS_SOLD_OPTIONS.map((prod) => {
                        const selected = formData.productsDistributed.includes(prod);
                        return (
                          <button
                            type="button"
                            key={prod}
                            onClick={() => handleMultiSelectToggle("productsDistributed", prod)}
                            className={`flex items-center gap-3 p-3.5 rounded-xl border text-left text-sm transition-all cursor-pointer ${
                              selected
                                ? "bg-black text-white border-black font-semibold shadow-md"
                                : "bg-gray-50/80 border-gray-200 text-gray-800 hover:border-gray-400 hover:bg-gray-100/80"
                            }`}
                          >
                            <span
                              className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${
                                selected
                                  ? "border-white bg-white text-black"
                                  : "border-gray-400 bg-white"
                              }`}
                            >
                              {selected && <Check className="w-3 h-3 stroke-[3]" />}
                            </span>
                            <span>{prod}</span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.productsDistributed && (
                      <p className="text-xs text-rose-500 font-medium">{errors.productsDistributed}</p>
                    )}
                  </div>

                  {/* Q8: PRIMARY CUSTOMERS */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                      <span className="w-6 h-6 rounded-full bg-black text-white font-syne font-bold text-xs flex items-center justify-center shrink-0">
                        7
                      </span>
                      <h3 className="text-base sm:text-lg font-bold font-syne tracking-wide text-black">
                        Who are your primary customers? <span className="text-rose-500">*</span>
                        <span className="text-xs font-normal text-gray-500 ml-1.5 font-sans">(Select all)</span>
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {CUSTOMER_SEGMENTS.map((cust) => {
                        const selected = formData.primaryCustomers.includes(cust);
                        return (
                          <button
                            type="button"
                            key={cust}
                            onClick={() => handleMultiSelectToggle("primaryCustomers", cust)}
                            className={`flex items-center gap-3 p-3.5 rounded-xl border text-left text-sm transition-all cursor-pointer ${
                              selected
                                ? "bg-black text-white border-black font-semibold shadow-md"
                                : "bg-gray-50/80 border-gray-200 text-gray-800 hover:border-gray-400 hover:bg-gray-100/80"
                            }`}
                          >
                            <span
                              className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${
                                selected
                                  ? "border-white bg-white text-black"
                                  : "border-gray-400 bg-white"
                              }`}
                            >
                              {selected && <Check className="w-3 h-3 stroke-[3]" />}
                            </span>
                            <span>{cust}</span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.primaryCustomers && (
                      <p className="text-xs text-rose-500 font-medium">{errors.primaryCustomers}</p>
                    )}
                  </div>

                  {/* Q9: MONTHLY CUSTOMERS */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                      <span className="w-6 h-6 rounded-full bg-black text-white font-syne font-bold text-xs flex items-center justify-center shrink-0">
                        8
                      </span>
                      <h3 className="text-base sm:text-lg font-bold font-syne tracking-wide text-black">
                        Approximately how many new customers do you serve per month? <span className="text-rose-500">*</span>
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                      {MONTHLY_CUSTOMERS_OPTIONS.map((count) => {
                        const selected = formData.monthlyCustomers === count;
                        return (
                          <button
                            type="button"
                            key={count}
                            onClick={() => handleInputChange("monthlyCustomers", count)}
                            className={`py-3.5 px-2 rounded-xl border text-center font-mono text-sm font-bold transition-all cursor-pointer ${
                              selected
                                ? "bg-black text-white border-black shadow-md"
                                : "bg-gray-50/80 border-gray-200 text-gray-800 hover:border-gray-400 hover:bg-gray-100/80"
                            }`}
                          >
                            {count}
                          </button>
                        );
                      })}
                    </div>
                    {errors.monthlyCustomers && (
                      <p className="text-xs text-rose-500 font-medium">{errors.monthlyCustomers}</p>
                    )}
                  </div>

                  {/* Q10: PARTNERSHIP TYPE */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                      <span className="w-6 h-6 rounded-full bg-black text-white font-syne font-bold text-xs flex items-center justify-center shrink-0">
                        9
                      </span>
                      <h3 className="text-base sm:text-lg font-bold font-syne tracking-wide text-black">
                        What type of KavachX partnership are you interested in? <span className="text-rose-500">*</span>
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {PARTNERSHIP_TYPES.map((part) => {
                        const selected = formData.partnershipType === part;
                        return (
                          <button
                            type="button"
                            key={part}
                            onClick={() => handleInputChange("partnershipType", part)}
                            className={`flex items-center gap-3 p-3.5 rounded-xl border text-left text-sm transition-all cursor-pointer ${
                              selected
                                ? "bg-black text-white border-black font-semibold shadow-md"
                                : "bg-gray-50/80 border-gray-200 text-gray-800 hover:border-gray-400 hover:bg-gray-100/80"
                            }`}
                          >
                            <span
                              className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                                selected
                                  ? "border-white bg-white"
                                  : "border-gray-400 bg-white"
                              }`}
                            >
                              {selected && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                            </span>
                            <span>{part}</span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.partnershipType && (
                      <p className="text-xs text-rose-500 font-medium">{errors.partnershipType}</p>
                    )}
                  </div>

                  {/* Q11: KAVACHX SOLUTIONS */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                      <span className="w-6 h-6 rounded-full bg-black text-white font-syne font-bold text-xs flex items-center justify-center shrink-0">
                        10
                      </span>
                      <h3 className="text-base sm:text-lg font-bold font-syne tracking-wide text-black">
                        Which KavachX solutions are you interested in? <span className="text-rose-500">*</span>
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {KAVACHX_SOLUTIONS_OPTIONS.map((sol) => {
                        const selected = formData.interestedSolutions.includes(sol);
                        return (
                          <button
                            type="button"
                            key={sol}
                            onClick={() => handleMultiSelectToggle("interestedSolutions", sol)}
                            className={`flex items-center gap-3 p-3.5 rounded-xl border text-left text-sm transition-all cursor-pointer ${
                              selected
                                ? "bg-black text-white border-black font-semibold shadow-md"
                                : "bg-gray-50/80 border-gray-200 text-gray-800 hover:border-gray-400 hover:bg-gray-100/80"
                            }`}
                          >
                            <span
                              className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${
                                selected
                                  ? "border-white bg-white text-black"
                                  : "border-gray-400 bg-white"
                              }`}
                            >
                              {selected && <Check className="w-3 h-3 stroke-[3]" />}
                            </span>
                            <span>{sol}</span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.interestedSolutions && (
                      <p className="text-xs text-rose-500 font-medium">{errors.interestedSolutions}</p>
                    )}
                  </div>

                  {/* Q12: BUSINESS OVERVIEW */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                      <span className="w-6 h-6 rounded-full bg-black text-white font-syne font-bold text-xs flex items-center justify-center shrink-0">
                        11
                      </span>
                      <h3 className="text-base sm:text-lg font-bold font-syne tracking-wide text-black">
                        Tell us briefly about your business and your interest in KavachX. <span className="text-rose-500">*</span>
                      </h3>
                    </div>

                    <textarea
                      rows={4}
                      placeholder="Describe your business, distribution experience, and interest in partnering..."
                      value={formData.businessOverview}
                      onChange={(e) => handleInputChange("businessOverview", e.target.value)}
                      className={`w-full px-4 py-3.5 bg-gray-50 border rounded-xl text-sm text-black placeholder:text-gray-400 focus:outline-none focus:bg-white transition-all ${
                        errors.businessOverview
                          ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                          : "border-gray-200 focus:border-black focus:ring-1 focus:ring-black"
                      }`}
                    />
                    {errors.businessOverview && (
                      <p className="text-xs text-rose-500 font-medium">{errors.businessOverview}</p>
                    )}
                  </div>

                  {/* Submit Button & Disclaimer */}
                  <div className="pt-4 border-t border-gray-100 space-y-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-black text-white hover:bg-gray-800 font-syne font-bold rounded-full text-sm uppercase tracking-widest transition-all shadow-lg active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Processing Registration...</span>
                        </>
                      ) : (
                        <span>REGISTER AS A KAVACHX PARTNER</span>
                      )}
                    </button>
                    <p className="text-xs text-center text-gray-500 italic">
                      Our team will review your details and contact you regarding partnership opportunities.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
