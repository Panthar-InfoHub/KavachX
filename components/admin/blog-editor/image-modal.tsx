"use client";

import { useState, useRef } from "react";
import { ImageLayout } from "./custom-image-extension";
import { compressImageBeforeUpload } from "@/lib/client-image-compressor";

interface ImageModalProps {
  isOpen: boolean;
  onConfirm: (data: { src: string; alt: string; layout: ImageLayout }) => void;
  onClose: () => void;
}

export function ImageModal({ isOpen, onConfirm, onClose }: ImageModalProps) {
  const [activeTab, setActiveTab] = useState<"upload" | "url">("upload");
  const [src, setSrc] = useState("");
  const [alt, setAlt] = useState("");
  const [layout, setLayout] = useState<ImageLayout>("full");
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = async (file: File) => {
    setError("");
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    setIsUploading(true);
    try {
      const compressedFile = await compressImageBeforeUpload(file);
      const formData = new FormData();
      formData.append("file", compressedFile);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setSrc(data.data.url);
      } else {
        setError(data.error?.message || "Failed to upload image to Cloudinary.");
      }
    } catch {
      setError("Network error while uploading image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError("");

    const trimmedSrc = src.trim();
    if (!trimmedSrc) {
      setError("Please upload an image or provide a valid image URL");
      return;
    }

    if (
      trimmedSrc.toLowerCase().startsWith("javascript:") ||
      trimmedSrc.toLowerCase().startsWith("vbscript:")
    ) {
      setError("Invalid image URL protocol");
      return;
    }

    onConfirm({ src: trimmedSrc, alt: alt.trim(), layout });
    setSrc("");
    setAlt("");
    setLayout("full");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg max-h-[90vh] flex flex-col rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl overflow-hidden">
        {/* Fixed Header */}
        <div className="flex items-center justify-between border-b border-white/10 p-5 shrink-0 bg-zinc-950">
          <h3 className="text-base font-bold text-white font-syne">Insert Inline Image</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 custom-modal-scroll">
          {/* Tab Switcher */}
          <div className="flex items-center gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
            <button
              type="button"
              onClick={() => setActiveTab("upload")}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "upload"
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Upload to Cloudinary
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("url")}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "url"
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Image URL
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === "upload" ? (
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider font-mono">
                  Cloudinary File Upload
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  }}
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-white/20 hover:border-violet-500/50 bg-black/40 rounded-xl p-6 text-center cursor-pointer transition-all space-y-2 group"
                >
                  {isUploading ? (
                    <div className="flex flex-col items-center space-y-2">
                      <span className="w-6 h-6 border-2 border-violet-400 border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs text-violet-300 font-mono">Uploading to Cloudinary...</span>
                    </div>
                  ) : src ? (
                    <div className="text-xs text-emerald-400 font-mono flex items-center justify-center gap-1.5">
                      <span>✓ Uploaded successfully! Click to change image.</span>
                    </div>
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-xl bg-violet-600/20 text-violet-400 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-xs text-white/80 font-medium">
                        Click to choose image or drag file here
                      </p>
                      <p className="text-[11px] text-white/40 font-mono">PNG, JPG, WEBP up to 50MB</p>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-white/80 mb-2 uppercase tracking-wider font-mono">
                  Image URL <span className="text-violet-400">*</span>
                </label>
                <input
                  type="text"
                  value={src}
                  onChange={(e) => setSrc(e.target.value)}
                  placeholder="https://res.cloudinary.com/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 font-mono"
                />
              </div>
            )}

            {/* Alt Text Input */}
            <div>
              <label className="block text-xs font-semibold text-white/80 mb-2 uppercase tracking-wider font-mono">
                Alt Text (Description)
              </label>
              <input
                type="text"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                placeholder="e.g. CNN feature extraction diagram"
                className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50"
              />
            </div>

            {/* Layout Selector */}
            <div>
              <label className="block text-xs font-semibold text-white/80 mb-2 uppercase tracking-wider font-mono">
                Image Layout (Text Wrapping)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(
                  [
                    { id: "left", label: "Left (Wrap)", desc: "Floats left on desktop" },
                    { id: "center", label: "Center", desc: "Centered block" },
                    { id: "right", label: "Right (Wrap)", desc: "Floats right on desktop" },
                    { id: "full", label: "Full Width", desc: "Full width block" },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setLayout(item.id)}
                    className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                      layout === item.id
                        ? "bg-violet-600/20 border-violet-500 text-violet-300 font-bold"
                        : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                    }`}
                  >
                    <span className="text-[11px] font-semibold">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Preview Box */}
            {src.trim() && (
              <div className="space-y-1.5">
                <span className="block text-[11px] text-white/40 font-mono">PREVIEW</span>
                <div className="relative max-h-48 rounded-xl overflow-hidden border border-white/10 bg-black/40 flex items-center justify-center p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src.trim()}
                    alt={alt || "Preview"}
                    className="max-h-40 max-w-full object-contain mx-auto rounded-lg"
                    onError={() => setError("Unable to load image preview")}
                  />
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Pinned Sticky Footer */}
        <div className="flex items-center justify-end gap-2.5 p-4 border-t border-white/10 bg-zinc-950 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => handleSubmit()}
            disabled={isUploading || !src.trim()}
            className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-all shadow-lg shadow-violet-600/20 disabled:opacity-50 cursor-pointer"
          >
            Insert Image
          </button>
        </div>
      </div>
    </div>
  );
}
