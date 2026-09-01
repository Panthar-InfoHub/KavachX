import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";

export const metadata = {
  title: "Admin Dashboard | Kavach X",
};

export default async function DashboardPage() {
  const authResult = await requireAdmin();

  if (!authResult.authorized) {
    return null;
  }

  const user = authResult.user;

  let totalBlogs = 0;
  let publishedBlogs = 0;
  let dbStatus = "Connected";

  try {
    await connectDB();
    totalBlogs = await Blog.countDocuments();
    publishedBlogs = await Blog.countDocuments({ status: "PUBLISHED" });
  } catch {
    dbStatus = "Standby";
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-600/20 border border-violet-500/30 text-xs font-semibold text-violet-300 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-ping" />
            Admin Overview
          </div>
          <h2 className="text-3xl font-bold text-white font-syne tracking-tight">
            Welcome back, <span className="text-violet-400">{user?.name || "Administrator"}</span>
          </h2>
          <p className="text-sm text-white/50 mt-1 max-w-xl">
            Manage your KavachX security platform blog posts, system stats, and content releases from one central dashboard.
          </p>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Blogs Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-xl relative overflow-hidden group hover:border-violet-500/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium text-white/40 uppercase tracking-wider">Total Blogs</span>
            <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          </div>
          <div className="text-4xl font-extrabold text-white font-syne">{totalBlogs}</div>
          <p className="text-xs text-white/40 mt-2">All created blog articles</p>
        </div>

        {/* Published Blogs Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-xl relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium text-white/40 uppercase tracking-wider">Published</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="text-4xl font-extrabold text-white font-syne">{publishedBlogs}</div>
          <p className="text-xs text-white/40 mt-2">Live on public website</p>
        </div>

        {/* System Status Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-xl relative overflow-hidden group hover:border-blue-500/30 transition-all duration-300 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium text-white/40 uppercase tracking-wider">System Status</span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-lg font-bold text-white font-syne">{dbStatus}</span>
          </div>
          <p className="text-xs text-white/40 mt-2">Better Auth + MongoDB Engine</p>
        </div>
      </div>

      {/* Quick Actions & Empty State Section */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center space-y-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-violet-600/20 border border-violet-500/30 text-violet-400 mb-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white font-syne">Blog Management Ready</h3>
        <p className="text-sm text-white/50 max-w-md mx-auto">
          Your admin panel is fully authenticated and protected. Comprehensive blog post creation, editing, and publishing tools will appear in the next phase.
        </p>
        <div className="pt-2">
          <Link
            href="/admin/blogs"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/10 transition-all"
          >
            View Blogs Manager →
          </Link>
        </div>
      </div>
    </div>
  );
}
