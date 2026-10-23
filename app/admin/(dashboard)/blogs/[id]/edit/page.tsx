"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BlogEditor } from "@/components/admin/blog-editor/blog-editor";
import { compressImageBeforeUpload } from "@/lib/client-image-compressor";

export default function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">("DRAFT");
  const [authorEmail, setAuthorEmail] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [saveState, setSaveState] = useState<"saved" | "unsaved" | "saving">("saved");
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    async function loadBlog() {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        const data = await res.json();

        if (data.success) {
          const blog = data.data;
          setTitle(blog.title);
          setSlug(blog.slug);
          setExcerpt(blog.excerpt || "");
          setContent(blog.content || "");
          setCoverImage(blog.coverImage || "");
          setStatus(blog.status);
          setAuthorEmail(blog.authorEmail);
          setIsFeatured(Boolean(blog.isFeatured));
          setSaveState("saved");
        } else {
          setFetchError(data.error?.message || "Failed to load blog");
        }
      } catch {
        setFetchError("Network error while loading blog");
      } finally {
        setLoading(false);
      }
    }

    loadBlog();
  }, [id]);

  // Unsaved changes browser prompt
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (saveState === "unsaved") {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [saveState]);

  const handleSubmit = async (targetStatus?: "DRAFT" | "PUBLISHED") => {
    setErrorMessage("");

    if (!title.trim()) {
      setErrorMessage("Title is required.");
      toast.error("Title is required.");
      return;
    }
    if (!slug.trim()) {
      setErrorMessage("Slug is required.");
      toast.error("Slug is required.");
      return;
    }
    if (!content || !content.trim()) {
      setErrorMessage("Content is required.");
      toast.error("Content is required.");
      return;
    }

    setIsSubmitting(true);
    setSaveState("saving");

    const finalStatus = targetStatus || status;

    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          content,
          coverImage,
          status: finalStatus,
          isFeatured,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus(finalStatus);
        setSaveState("saved");
        toast.success("Blog updated successfully!");
      } else {
        const msg = data.error?.message || "Failed to update blog.";
        setErrorMessage(msg);
        toast.error(msg);
        setSaveState("unsaved");
      }
    } catch {
      setErrorMessage("Network error while updating blog.");
      toast.error("Network error while updating blog.");
      setSaveState("unsaved");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-12 text-center space-y-4">
        <div className="inline-block w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-white/50">Loading blog details & editor...</p>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="max-w-xl mx-auto p-8 rounded-2xl border border-rose-500/20 bg-rose-500/5 text-center space-y-4 mt-8">
        <h3 className="text-lg font-bold text-white font-syne">Error Loading Blog</h3>
        <p className="text-sm text-white/50">{fetchError}</p>
        <Link
          href="/admin/blogs"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-all"
        >
          ← Back to Blogs Manager
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/blogs"
            className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/70 hover:text-white transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white font-syne">Edit Blog</h1>
              {status === "PUBLISHED" ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  ● PUBLISHED
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  ● DRAFT
                </span>
              )}
              {saveState === "unsaved" && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-mono">
                  Unsaved changes
                </span>
              )}
              {saveState === "saved" && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono">
                  ✓ Saved
                </span>
              )}
            </div>
            <p className="text-xs text-white/40 font-mono mt-0.5">
              ID: {id} • Author: {authorEmail}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {status === "PUBLISHED" ? (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSubmit("DRAFT")}
              className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold transition-all disabled:opacity-50"
            >
              Unpublish to Draft
            </button>
          ) : (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSubmit("PUBLISHED")}
              className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 text-emerald-300 text-xs font-semibold transition-all disabled:opacity-50"
            >
              Publish Now
            </button>
          )}

          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmit()}
            className="px-6 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-all shadow-lg shadow-violet-600/20 disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting && (
              <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            Save Changes
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-3">
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Form Fields */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 space-y-6 shadow-2xl">
        {/* Title Input */}
        <div>
          <label className="block text-xs font-semibold text-white/80 mb-2 uppercase tracking-wider font-mono">
            Title <span className="text-violet-400">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setSaveState("unsaved");
            }}
            placeholder="Article title..."
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 transition-all font-syne font-bold text-lg"
          />
        </div>

        {/* Slug Input */}
        <div>
          <label className="block text-xs font-semibold text-white/80 mb-2 uppercase tracking-wider font-mono">
            Slug <span className="text-violet-400">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-white/30 font-mono">
              /
            </span>
            <input
              type="text"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setSaveState("unsaved");
              }}
              placeholder="article-slug"
              className="w-full pl-8 pr-4 py-3 rounded-xl bg-black/50 border border-white/10 text-xs text-white font-mono placeholder-white/30 focus:outline-none focus:border-violet-500/50 transition-all"
            />
          </div>
        </div>

        {/* Is Featured Toggle */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/10">
          <div>
            <label htmlFor="isFeaturedToggle" className="text-xs font-semibold text-white uppercase tracking-wider font-mono cursor-pointer">
              ★ Mark as Featured Blog
            </label>
            <p className="text-[11px] text-white/50 mt-0.5">
              If enabled, this article will be highlighted as the Featured Insight on the main blogs page.
            </p>
          </div>
          <input
            id="isFeaturedToggle"
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => {
              setIsFeatured(e.target.checked);
              setSaveState("unsaved");
            }}
            className="w-5 h-5 rounded border-white/20 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0 bg-black/50 cursor-pointer accent-indigo-600"
          />
        </div>

        {/* Excerpt Input with character counter */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider font-mono">
              Excerpt (Summary)
            </label>
            <span
              className={`text-[11px] font-mono ${
                excerpt.length > 300 ? "text-rose-400" : "text-white/40"
              }`}
            >
              {excerpt.length} / 300
            </span>
          </div>
          <textarea
            rows={2}
            value={excerpt}
            onChange={(e) => {
              setExcerpt(e.target.value);
              setSaveState("unsaved");
            }}
            placeholder="Brief summary..."
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 transition-all resize-none"
          />
        </div>

        {/* Cover Image URL & Cloudinary Upload */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider font-mono">
              Cover Image (Hero Image)
            </label>
            <label className="cursor-pointer px-3 py-1 rounded-xl bg-violet-600/20 border border-violet-500/30 hover:bg-violet-600/30 text-violet-300 text-xs font-semibold transition-all inline-flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Upload to Cloudinary</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  try {
                    toast.loading("Optimizing & uploading cover image...", { id: "cover-upload" });
                    const compressedFile = await compressImageBeforeUpload(file);
                    const formData = new FormData();
                    formData.append("file", compressedFile);
                    const res = await fetch("/api/upload", { method: "POST", body: formData });
                    const data = await res.json();
                    if (data.success) {
                      setCoverImage(data.data.url);
                      setImageError(false);
                      setSaveState("unsaved");
                      toast.success("Cover image uploaded successfully!", { id: "cover-upload" });
                    } else {
                      toast.error(data.error?.message || "Failed to upload image.", { id: "cover-upload" });
                    }
                  } catch {
                    toast.error("Network error while uploading cover image.", { id: "cover-upload" });
                  }
                }}
              />
            </label>
          </div>

          <input
            type="url"
            value={coverImage}
            onChange={(e) => {
              setCoverImage(e.target.value);
              setImageError(false);
              setSaveState("unsaved");
            }}
            placeholder="https://res.cloudinary.com/... or paste image URL"
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-xs text-white font-mono placeholder-white/30 focus:outline-none focus:border-violet-500/50 transition-all"
          />

          {/* Image Preview Box */}
          {coverImage.trim() && (
            <div className="mt-3 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-white/40">
                <span>PREVIEW</span>
                <button
                  type="button"
                  onClick={() => {
                    setCoverImage("");
                    setSaveState("unsaved");
                  }}
                  className="text-rose-400 hover:underline"
                >
                  Remove Cover Image
                </button>
              </div>
              <div className="relative h-48 rounded-xl overflow-hidden border border-white/10 bg-black/40 flex items-center justify-center">
                {!imageError ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={coverImage.trim()}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <span className="text-xs text-rose-400">Unable to load cover image preview.</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Tiptap Content Editor */}
        <div>
          <label className="block text-xs font-semibold text-white/80 mb-2 uppercase tracking-wider font-mono">
            Content <span className="text-violet-400">*</span>
          </label>
          <BlogEditor
            content={content}
            onChange={(jsonStr) => {
              setContent(jsonStr);
              setSaveState("unsaved");
            }}
          />
        </div>
      </div>

      {/* Bottom Footer Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
        <Link
          href="/admin/blogs"
          className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-semibold transition-all"
        >
          Back to Blogs
        </Link>
        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => handleSubmit()}
          className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-all shadow-lg shadow-violet-600/20 disabled:opacity-50"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
