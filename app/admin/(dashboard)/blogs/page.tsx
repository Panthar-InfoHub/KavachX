"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { toast } from "sonner";

interface BlogItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  status: "DRAFT" | "PUBLISHED";
  authorEmail: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  isFeatured: boolean;
  isDeleted: boolean;
  deletedAt: string | null;
}

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function BlogsManagerPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "DRAFT" | "PUBLISHED" | "DELETED">("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // Modal State for Deletion Confirmation
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    blog: BlogItem | null;
    permanent: boolean;
  }>({
    isOpen: false,
    blog: null,
    permanent: false,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        search,
        status: statusFilter,
      });

      const res = await fetch(`/api/blogs?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        setBlogs(data.data.blogs);
        setPagination(data.data.pagination);
      } else {
        toast.error(data.error?.message || "Failed to fetch blogs");
      }
    } catch {
      toast.error("Network error while fetching blogs");
    } finally {
      setLoading(false);
    }
  }, [currentPage, search, statusFilter]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Handle Status Toggle (Publish / Unpublish)
  const handleTogglePublish = async (blog: BlogItem) => {
    setActionLoadingId(blog.id);
    const endpoint =
      blog.status === "PUBLISHED"
        ? `/api/blogs/${blog.id}/unpublish`
        : `/api/blogs/${blog.id}/publish`;

    try {
      const res = await fetch(endpoint, { method: "POST" });
      const data = await res.json();

      if (data.success) {
        toast.success(
          blog.status === "PUBLISHED"
            ? "Blog moved to draft."
            : "Blog published successfully."
        );
        fetchBlogs();
      } else {
        toast.error(data.error?.message || "Failed to update blog status");
      }
    } catch {
      toast.error("Network error while updating status");
    } finally {
      setActionLoadingId(null);
    }
  };

  // Handle Feature Toggle
  const handleToggleFeature = async (blog: BlogItem) => {
    setActionLoadingId(blog.id);
    try {
      const res = await fetch(`/api/blogs/${blog.id}/feature`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: !blog.isFeatured }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(
          blog.isFeatured
            ? "Blog unfeatured."
            : "Blog marked as featured!"
        );
        fetchBlogs();
      } else {
        toast.error(data.error?.message || "Failed to update feature status");
      }
    } catch {
      toast.error("Network error while updating feature status");
    } finally {
      setActionLoadingId(null);
    }
  };

  // Handle Restore
  const handleRestore = async (blog: BlogItem) => {
    setActionLoadingId(blog.id);
    try {
      const res = await fetch(`/api/blogs/${blog.id}/restore`, { method: "POST" });
      const data = await res.json();

      if (data.success) {
        toast.success("Blog restored successfully.");
        fetchBlogs();
      } else {
        toast.error(data.error?.message || "Failed to restore blog");
      }
    } catch {
      toast.error("Network error while restoring blog");
    } finally {
      setActionLoadingId(null);
    }
  };

  // Execute Delete
  const confirmDelete = async () => {
    if (!deleteModal.blog) return;
    setIsDeleting(true);
    const { id } = deleteModal.blog;
    const url = deleteModal.permanent
      ? `/api/blogs/${id}?permanent=true`
      : `/api/blogs/${id}`;

    try {
      const res = await fetch(url, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        toast.success(
          deleteModal.permanent
            ? "Blog permanently deleted."
            : "Blog moved to trash."
        );
        setDeleteModal({ isOpen: false, blog: null, permanent: false });
        fetchBlogs();
      } else {
        toast.error(data.error?.message || "Failed to delete blog");
      }
    } catch {
      toast.error("Network error while deleting blog");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-bold text-white font-syne">Blogs Manager</h1>
          <p className="text-sm text-white/50 mt-1">
            Create, edit, manage, and publish blog articles across your platform.
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-all shadow-lg shadow-violet-600/20 active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          + Create New Blog
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-xl">
        {/* Search Input */}
        <div className="relative flex-1">
          <svg
            className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by title or slug..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-violet-500/50 transition-all"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-white/50 font-medium">Filter:</span>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as any);
              setCurrentPage(1);
            }}
            className="bg-black/60 border border-white/10 rounded-xl text-xs text-white px-3 py-2 focus:outline-none focus:border-violet-500/50 transition-all cursor-pointer"
          >
            <option value="ALL">All Active Blogs</option>
            <option value="DRAFT">Drafts</option>
            <option value="PUBLISHED">Published</option>
            <option value="DELETED">Trash / Deleted</option>
          </select>
        </div>
      </div>

      {/* Blog Table Section */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden shadow-2xl">
        {loading ? (
          <div className="p-12 text-center space-y-4">
            <div className="inline-block w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-white/50">Loading blogs...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-violet-600/10 border border-violet-500/20 text-violet-400 mb-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white font-syne">No Blogs Found</h3>
            <p className="text-xs text-white/50 max-w-sm mx-auto">
              {search || statusFilter !== "ALL"
                ? "No blog articles match your current search or filter criteria."
                : "No blogs created yet. Click '+ Create New Blog' to get started."}
            </p>
            {!search && statusFilter === "ALL" && (
              <Link
                href="/admin/blogs/new"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-all shadow-lg shadow-violet-600/20"
              >
                + Create First Blog
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-black/40 text-white/40 uppercase tracking-wider text-[10px] font-mono">
                  <th className="py-3.5 px-6 font-semibold">Title</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold">Author</th>
                  <th className="py-3.5 px-4 font-semibold">Updated</th>
                  <th className="py-3.5 px-6 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                {blogs.map((blog) => {
                  const isActionLoading = actionLoadingId === blog.id;
                  const isDeleted = blog.isDeleted;

                  return (
                    <tr
                      key={blog.id}
                      className="hover:bg-white/[0.03] transition-colors group"
                    >
                      {/* Title & Slug */}
                      <td className="py-4 px-6 max-w-xs sm:max-w-md">
                        <span className="font-semibold text-white group-hover:text-violet-300 transition-colors line-clamp-1">
                          {blog.title}
                        </span>
                        <span className="text-[11px] text-white/40 font-mono block mt-0.5 line-clamp-1">
                          /{blog.slug}
                        </span>
                      </td>

                      {/* Status & Featured Badge */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1 items-start">
                          {isDeleted ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                              DELETED
                            </span>
                          ) : blog.status === "PUBLISHED" ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              PUBLISHED
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                              DRAFT
                            </span>
                          )}

                          {blog.isFeatured && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                              ★ FEATURED
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Author Email */}
                      <td className="py-4 px-4 whitespace-nowrap text-white/60 font-mono">
                        {blog.authorEmail}
                      </td>

                      {/* Updated At */}
                      <td className="py-4 px-4 whitespace-nowrap text-white/40 text-[11px]">
                        {new Date(blog.updatedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right whitespace-nowrap space-x-2">
                        {isDeleted ? (
                          <>
                            {/* Restore Action */}
                            <button
                              disabled={isActionLoading}
                              onClick={() => handleRestore(blog)}
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 text-emerald-400 text-xs font-medium transition-all disabled:opacity-50"
                            >
                              {isActionLoading ? "Restoring..." : "Restore"}
                            </button>

                            {/* Delete Permanently Action */}
                            <button
                              disabled={isActionLoading}
                              onClick={() =>
                                setDeleteModal({
                                  isOpen: true,
                                  blog,
                                  permanent: true,
                                })
                              }
                              className="px-2.5 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-rose-400 text-xs font-medium transition-all disabled:opacity-50"
                            >
                              Delete Permanently
                            </button>
                          </>
                        ) : (
                          <>
                            {/* Edit Link */}
                            <Link
                              href={`/admin/blogs/${blog.id}/edit`}
                              className="inline-flex items-center px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 hover:text-white text-xs font-medium transition-all"
                            >
                              Edit
                            </Link>

                            {/* Publish / Unpublish Toggle */}
                            <button
                              disabled={isActionLoading}
                              onClick={() => handleTogglePublish(blog)}
                              className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all disabled:opacity-50 ${
                                blog.status === "PUBLISHED"
                                  ? "bg-amber-500/10 border-amber-500/20 text-amber-300 hover:bg-amber-500/20"
                                  : "bg-emerald-500/10 border-emerald-500/20 text-emerald-300 hover:bg-emerald-500/20"
                              }`}
                            >
                              {isActionLoading
                                ? "Updating..."
                                : blog.status === "PUBLISHED"
                                ? "Unpublish"
                                : "Publish"}
                            </button>

                            {/* Feature / Unfeature Button */}
                            <button
                              disabled={isActionLoading}
                              onClick={() => handleToggleFeature(blog)}
                              className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all disabled:opacity-50 ${
                                blog.isFeatured
                                  ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-200 hover:bg-indigo-500/30"
                                  : "bg-white/5 border-white/10 hover:bg-white/10 text-white/70"
                              }`}
                              title={blog.isFeatured ? "Unfeature blog" : "Make featured blog"}
                            >
                              {blog.isFeatured ? "★ Featured" : "☆ Feature"}
                            </button>

                            {/* Soft Delete Button */}
                            <button
                              disabled={isActionLoading}
                              onClick={() =>
                                setDeleteModal({
                                  isOpen: true,
                                  blog,
                                  permanent: false,
                                })
                              }
                              className="px-2.5 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-rose-400 text-xs font-medium transition-all disabled:opacity-50"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && blogs.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-white/10 bg-black/40 text-xs text-white/50">
            <div>
              Showing <span className="font-semibold text-white">{blogs.length}</span> of{" "}
              <span className="font-semibold text-white">{pagination.total}</span> blogs (Page{" "}
              {pagination.page} of {pagination.totalPages})
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white disabled:opacity-30 disabled:hover:bg-white/5 transition-all"
              >
                ← Previous
              </button>
              <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono">
                {currentPage}
              </span>
              <button
                disabled={currentPage >= pagination.totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(pagination.totalPages, prev + 1))
                }
                className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white disabled:opacity-30 disabled:hover:bg-white/5 transition-all"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && deleteModal.blog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-950 p-6 space-y-6 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-syne">
                  {deleteModal.permanent ? "Delete Blog Permanently?" : "Move Blog to Trash?"}
                </h3>
                <p className="text-xs text-white/50 mt-0.5">
                  {deleteModal.permanent
                    ? "This action cannot be undone. The document will be removed from MongoDB."
                    : "The blog will be soft-deleted. You can restore it later from Trash."}
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
              <span className="text-white/40 block font-mono text-[10px]">TARGET BLOG</span>
              <span className="font-semibold text-white block mt-1 line-clamp-1">
                {deleteModal.blog.title}
              </span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/10">
              <button
                disabled={isDeleting}
                onClick={() =>
                  setDeleteModal({ isOpen: false, blog: null, permanent: false })
                }
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                disabled={isDeleting}
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-all shadow-lg shadow-rose-600/20 disabled:opacity-50 flex items-center gap-2"
              >
                {isDeleting && (
                  <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {deleteModal.permanent ? "Delete Permanently" : "Move to Trash"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
