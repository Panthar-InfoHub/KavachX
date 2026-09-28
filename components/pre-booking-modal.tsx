"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, Loader2, Sparkles, Check } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { submitPreBookingAction, PreBookingFormData } from "@/lib/pre-booking.action";
import { trackEvent } from "@/lib/analytics";

interface PreBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PROPERTY_TYPES = [
  "Retail Store / Shop",
  "Office",
  "Warehouse",
  "Factory / Industrial Facility",
  "School / College",
  "Hospital / Clinic",
  "Residential Society / Apartment",
  "Other",
];

const CAMERA_COUNTS = ["1-4", "5-10", "11-25", "26-50", "50+"];

const DETECTION_OPTIONS = [
  "Intrusion Detection",
  "Fire & Smoke Detection",
  "Footfall / People Counting",
  "All of the above",
];

const INTEREST_OPTIONS = [
  "AI-powered real-time alerts",
  "AI monitoring of existing CCTV cameras",
  "Complete AI surveillance solution",
  "All of the above",
];

const TIMELINE_OPTIONS = [
  "Immediately",
  "Within 1 month",
  "Within 3 months",
  "Just exploring",
];

export default function PreBookingModal({ isOpen, onClose }: PreBookingModalProps) {
  const [formData, setFormData] = useState<PreBookingFormData>({
    fullName: "",
    phone: "",
    email: "",
    propertyType: "",
    cameraCount: "",
    detectionFeatures: [],
    primaryInterest: "",
    deploymentTimeline: "",
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

  const handleInputChange = (field: keyof PreBookingFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleDetectionToggle = (feature: string) => {
    let updated: string[];

    if (feature === "All of the above") {
      if (formData.detectionFeatures.includes("All of the above")) {
        updated = [];
      } else {
        updated = [...DETECTION_OPTIONS];
      }
    } else {
      if (formData.detectionFeatures.includes(feature)) {
        updated = formData.detectionFeatures.filter(
          (f) => f !== feature && f !== "All of the above"
        );
      } else {
        const next = [...formData.detectionFeatures, feature];
        const allIndividualSelected = DETECTION_OPTIONS.filter(
          (o) => o !== "All of the above"
        ).every((o) => next.includes(o));
        if (allIndividualSelected && !next.includes("All of the above")) {
          next.push("All of the above");
        }
        updated = next;
      }
    }

    setFormData((prev) => ({ ...prev, detectionFeatures: updated }));
    if (errors.detectionFeatures) {
      setErrors((prev) => ({ ...prev, detectionFeatures: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.trim().length < 7) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.propertyType) {
      newErrors.propertyType = "Please select property type";
    }
    if (!formData.cameraCount) {
      newErrors.cameraCount = "Please select camera count";
    }
    if (formData.detectionFeatures.length === 0) {
      newErrors.detectionFeatures = "Please select at least one feature";
    }
    if (!formData.primaryInterest) {
      newErrors.primaryInterest = "Please select what interests you most";
    }
    if (!formData.deploymentTimeline) {
      newErrors.deploymentTimeline = "Please select deployment timeline";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fill in all required questions.");
      return;
    }

    setLoading(true);

    try {
      const res = await submitPreBookingAction(formData);

      if (res.success) {
        setIsSubmitted(true);
        toast.success("Pre-booking request submitted successfully!");
        trackEvent({
          name: "pre_booking_submitted",
          params: {
            property_type: formData.propertyType,
            camera_count: formData.cameraCount,
            timeline: formData.deploymentTimeline,
          },
        });
      } else {
        toast.error(res.message || "Failed to submit request.");
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
      fullName: "",
      phone: "",
      email: "",
      propertyType: "",
      cameraCount: "",
      detectionFeatures: [],
      primaryInterest: "",
      deploymentTimeline: "",
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

          {/* White Theme Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-white border border-gray-200 rounded-[2rem] shadow-2xl overflow-hidden z-10 my-auto text-gray-900 flex flex-col max-h-[85vh] sm:max-h-[90vh]"
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
          >
            {/* Header */}
            <div className="relative px-6 sm:px-8 pt-7 pb-5 border-b border-gray-100 bg-gray-50/80 flex justify-between items-start shrink-0">
              <div>
                <div className="mb-5">
                  <Image
                    src="/images/logo.png"
                    alt="KavachX Logo"
                    width={80}
                    height={36}
                    className="h-4 w-auto object-contain invert"
                  />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-syne tracking-tight text-black">
                  Pre-Order Now
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-lg font-jakarta leading-relaxed">
                  Transform your existing CCTV cameras into an AI-surveillance security system —{" "}
                  <span className="text-black font-semibold underline decoration-emerald-500">
                    without replacing your cameras
                  </span>.
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
                    Pre-Booking Request Received!
                  </h3>
                  <p className="text-sm text-gray-600 max-w-md leading-relaxed">
                    Thank you, <span className="font-semibold text-black">{formData.fullName}</span>. 
                    Our team will contact you shortly at <span className="font-mono text-black font-semibold">{formData.phone}</span> / <span className="font-mono text-black font-semibold">{formData.email}</span> to assist you with the next steps.
                  </p>
                  
                  <div className="w-full max-w-md p-5 bg-gray-50 border border-gray-200 rounded-2xl text-left text-xs space-y-2 text-gray-700">
                    <div className="font-bold font-syne text-black uppercase tracking-wider text-[11px] mb-2">Submitted Request Summary</div>
                    <div><strong className="text-black">Property:</strong> {formData.propertyType}</div>
                    <div><strong className="text-black">Cameras:</strong> {formData.cameraCount}</div>
                    <div><strong className="text-black">Timeline:</strong> {formData.deploymentTimeline}</div>
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
                  {/* Q1: YOUR DETAILS */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                      <span className="w-6 h-6 rounded-full bg-black text-white font-syne font-bold text-xs flex items-center justify-center shrink-0">
                        1
                      </span>
                      <h3 className="text-base sm:text-lg font-bold font-syne tracking-wide text-black">
                        Your Details
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div className="sm:col-span-2 space-y-1.5">
                        <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                          className={`w-full px-4 py-3.5 bg-gray-50 border rounded-xl text-sm text-black placeholder:text-gray-400 focus:outline-none focus:bg-white transition-all ${
                            errors.fullName
                              ? "border-rose-500 focus:ring-1 focus:ring-rose-500"
                              : "border-gray-200 focus:border-black focus:ring-1 focus:ring-black"
                          }`}
                        />
                        {errors.fullName && (
                          <p className="text-xs text-rose-500 font-medium">{errors.fullName}</p>
                        )}
                      </div>

                      {/* Phone Number */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Phone Number <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="Enter phone / WhatsApp number"
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

                      {/* Email Address */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="Enter your email address"
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

                  {/* Q2: PROPERTY TYPE */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                      <span className="w-6 h-6 rounded-full bg-black text-white font-syne font-bold text-xs flex items-center justify-center shrink-0">
                        2
                      </span>
                      <h3 className="text-base sm:text-lg font-bold font-syne tracking-wide text-black">
                        What type of business or property do you want to secure? <span className="text-rose-500">*</span>
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {PROPERTY_TYPES.map((type) => {
                        const selected = formData.propertyType === type;
                        return (
                          <button
                            type="button"
                            key={type}
                            onClick={() => handleInputChange("propertyType", type)}
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
                    {errors.propertyType && (
                      <p className="text-xs text-rose-500 font-medium">{errors.propertyType}</p>
                    )}
                  </div>

                  {/* Q3: CCTV COUNT */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                      <span className="w-6 h-6 rounded-full bg-black text-white font-syne font-bold text-xs flex items-center justify-center shrink-0">
                        3
                      </span>
                      <h3 className="text-base sm:text-lg font-bold font-syne tracking-wide text-black">
                        How many CCTV cameras are currently installed? <span className="text-rose-500">*</span>
                      </h3>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 pt-1">
                      {CAMERA_COUNTS.map((count) => {
                        const selected = formData.cameraCount === count;
                        return (
                          <button
                            type="button"
                            key={count}
                            onClick={() => handleInputChange("cameraCount", count)}
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
                    {errors.cameraCount && (
                      <p className="text-xs text-rose-500 font-medium">{errors.cameraCount}</p>
                    )}
                  </div>

                  {/* Q4: AI DETECTION FEATURES */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                      <span className="w-6 h-6 rounded-full bg-black text-white font-syne font-bold text-xs flex items-center justify-center shrink-0">
                        4
                      </span>
                      <h3 className="text-base sm:text-lg font-bold font-syne tracking-wide text-black">
                        What would you like KavachX to detect? <span className="text-rose-500">*</span>
                        <span className="text-xs font-normal text-gray-500 ml-1.5 font-sans">(Select all that apply)</span>
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {DETECTION_OPTIONS.map((feature) => {
                        const selected = formData.detectionFeatures.includes(feature);
                        return (
                          <button
                            type="button"
                            key={feature}
                            onClick={() => handleDetectionToggle(feature)}
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
                            <span>{feature}</span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.detectionFeatures && (
                      <p className="text-xs text-rose-500 font-medium">{errors.detectionFeatures}</p>
                    )}
                  </div>

                  {/* Q5: INTEREST */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                      <span className="w-6 h-6 rounded-full bg-black text-white font-syne font-bold text-xs flex items-center justify-center shrink-0">
                        5
                      </span>
                      <h3 className="text-base sm:text-lg font-bold font-syne tracking-wide text-black">
                        What are you most interested in with KavachX? <span className="text-rose-500">*</span>
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {INTEREST_OPTIONS.map((interest) => {
                        const selected = formData.primaryInterest === interest;
                        return (
                          <button
                            type="button"
                            key={interest}
                            onClick={() => handleInputChange("primaryInterest", interest)}
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
                            <span>{interest}</span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.primaryInterest && (
                      <p className="text-xs text-rose-500 font-medium">{errors.primaryInterest}</p>
                    )}
                  </div>

                  {/* Q6: DEPLOYMENT TIMELINE */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                      <span className="w-6 h-6 rounded-full bg-black text-white font-syne font-bold text-xs flex items-center justify-center shrink-0">
                        6
                      </span>
                      <h3 className="text-base sm:text-lg font-bold font-syne tracking-wide text-black">
                        When are you planning to deploy KavachX? <span className="text-rose-500">*</span>
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                      {TIMELINE_OPTIONS.map((timeline) => {
                        const selected = formData.deploymentTimeline === timeline;
                        return (
                          <button
                            type="button"
                            key={timeline}
                            onClick={() => handleInputChange("deploymentTimeline", timeline)}
                            className={`py-3.5 px-2 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                              selected
                                ? "bg-black text-white border-black shadow-md"
                                : "bg-gray-50/80 border-gray-200 text-gray-800 hover:border-gray-400 hover:bg-gray-100/80"
                            }`}
                          >
                            {timeline}
                          </button>
                        );
                      })}
                    </div>
                    {errors.deploymentTimeline && (
                      <p className="text-xs text-rose-500 font-medium">{errors.deploymentTimeline}</p>
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
                          <span>Processing Request...</span>
                        </>
                      ) : (
                        <span>Submit Pre-Booking Request</span>
                      )}
                    </button>
                    <p className="text-xs text-center text-gray-500 italic">
                      Our team will contact you shortly to understand your requirements and assist you with the next steps.
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
