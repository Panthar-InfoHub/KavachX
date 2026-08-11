import type { Metadata } from "next";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { BlogCard } from "@/components/blog/blog-card";

export const metadata: Metadata = {
  title: "Latest Blogs & AI Safety Insights",
  description:
    "Discover the latest security news, AI home surveillance articles, Kairos updates, and personal safety guides from Kavach X.",
  openGraph: {
    title: "Kavach X Blogs & Insights",
    description:
      "Discover the latest security news, AI home surveillance articles, Kairos updates, and personal safety guides from Kavach X.",
    type: "website",
  },
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function PublicBlogsPage() {
  await connectDB();

  const blogDocs = await Blog.find({
    isDeleted: { $ne: true },
    status: "PUBLISHED",
  })
    .sort({ publishedAt: -1, createdAt: -1 })
    .lean();

  const blogs = blogDocs.map((doc: any) => ({
    id: doc._id.toString(),
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt || "",
    coverImage: doc.coverImage || "",
    publishedAt: doc.publishedAt || doc.createdAt,
  }));

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* Ambient Glow background */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[160px]" />
      </div>

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Page Hero Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-600/10 border border-violet-500/20 text-violet-400 text-xs font-mono uppercase tracking-wider">
            <span>● Official Blog</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-syne tracking-tight">
            Safety, Security & AI Insights
          </h1>
          <p className="text-sm sm:text-base text-white/60 leading-relaxed font-sans">
            Explore articles on smart personal safety, AI CCTV integration, crash detection, and the future of emergency response technology.
          </p>
        </div>

        {/* Blog Grid */}
        {blogs.length === 0 ? (
          <div className="max-w-md mx-auto p-12 text-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-violet-600/20 text-violet-400 mb-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-white font-syne">No Articles Published Yet</h2>
            <p className="text-xs text-white/50">
              Check back soon for new articles, security guides, and technology updates!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                title={blog.title}
                slug={blog.slug}
                excerpt={blog.excerpt}
                coverImage={blog.coverImage}
                publishedAt={blog.publishedAt}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
