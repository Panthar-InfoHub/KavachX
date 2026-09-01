"use client";

import { useState, useEffect } from "react";

interface LinkModalProps {
  isOpen: boolean;
  initialUrl?: string;
  onConfirm: (url: string) => void;
  onRemove?: () => void;
  onClose: () => void;
}

export function LinkModal({
  isOpen,
  initialUrl = "",
  onConfirm,
  onRemove,
  onClose,
}: LinkModalProps) {
  const [url, setUrl] = useState(initialUrl);
  const [error, setError] = useState("");

  useEffect(() => {
    setUrl(initialUrl);
    setError("");
  }, [initialUrl, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmed = url.trim();
    if (!trimmed) {
      setError("Please enter a valid URL");
      return;
    }

    // Security check: disallow javascript: and vbscript: protocols
    if (
      trimmed.toLowerCase().startsWith("javascript:") ||
      trimmed.toLowerCase().startsWith("vbscript:")
    ) {
      setError("Invalid protocol in URL");
      return;
    }

    // Auto prepend https:// if missing domain protocol
    let finalUrl = trimmed;
    if (!/^https?:\/\//i.test(finalUrl) && !/^\//.test(finalUrl)) {
      finalUrl = `https://${finalUrl}`;
    }

    onConfirm(finalUrl);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-950 p-6 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white font-syne">
            {initialUrl ? "Edit Link" : "Insert Link"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/50 hover:text-white hover:bg-white/5"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-white/80 mb-2 uppercase tracking-wider font-mono">
              URL Endpoint
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com or /blog/slug"
              className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 font-mono"
              autoFocus
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            {initialUrl && onRemove ? (
              <button
                type="button"
                onClick={() => {
                  onRemove();
                  onClose();
                }}
                className="px-3 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-rose-400 text-xs font-medium transition-all"
              >
                Unlink
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-all shadow-lg shadow-violet-600/20"
              >
                Save Link
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
