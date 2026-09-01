import type { Metadata } from "next";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { BlogCard } from "@/components/blog/blog-card";
import { FeaturedBlogCard } from "@/components/blog/featured-blog-card";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "KavachX Intelligence — AI, ML & Robotics Publication",
  description:
    "Explore authoritative articles, research notes, and engineering insights on Artificial Intelligence, Machine Learning, Autonomous Robotics, Computer Vision, and IoT security from KavachX.",
  openGraph: {
    title: "KavachX Intelligence — AI, ML & Robotics Publication",
    description:
      "Explore authoritative articles, research notes, and engineering insights on Artificial Intelligence, Machine Learning, Autonomous Robotics, Computer Vision, and IoT security from KavachX.",
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
    isFeatured: Boolean(doc.isFeatured),
  }));

  // Only display featured hero section if a published blog is explicitly marked as featured by admin
  const featuredBlog = blogs.find((blog) => blog.isFeatured) || null;
  const regularBlogs = featuredBlog
    ? blogs.filter((blog) => blog.id !== featuredBlog.id)
    : blogs;

  return (
    <div className="w-full bg-linear-to-b from-[#fdfdfd] via-[#f4f7fc] to-[#eef4ff] text-black font-syne min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Header Container (matching SurakshaKavachSection style) */}
        <FadeIn direction="up" delay={0}>
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <span className="inline-block px-4 py-1.5 bg-gray-100/90 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-6 font-sans border border-black/5">
              KavachX Intelligence
            </span>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-black font-syne">
              Ideas shaping intelligent systems
            </h1>

            <p className="text-sm md:text-base text-gray-600 mb-8 max-w-2xl font-medium leading-relaxed font-jakarta">
              Authoritative articles, technical breakdowns, and vision at the intersection of machine learning, computer vision, autonomous systems, and physical security.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono font-medium text-gray-500 uppercase tracking-widest">
              <span>AI</span>
              <span>•</span>
              <span>Machine Learning</span>
              <span>•</span>
              <span>Robotics</span>
              <span>•</span>
              <span>Computer Vision</span>
              <span>•</span>
              <span>IoT</span>
            </div>
          </div>
        </FadeIn>

        {/* Featured Article Bento Hero */}
        {featuredBlog && (
          <FadeIn direction="up" delay={150}>
            <section className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-600 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-black" />
                  Featured Story
                </span>
                <span className="text-xs font-mono text-gray-500">Editor&apos;s Pick</span>
              </div>
              <FeaturedBlogCard
                title={featuredBlog.title}
                slug={featuredBlog.slug}
                excerpt={featuredBlog.excerpt}
                coverImage={featuredBlog.coverImage}
                publishedAt={featuredBlog.publishedAt}
              />
            </section>
          </FadeIn>
        )}

        {/* Bento Grid Publications Section */}
        <section className="space-y-6">
          <FadeIn direction="up" delay={200}>
            <div className="flex items-center justify-between px-2">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-black font-syne tracking-tight">
                  Latest Publications
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 font-jakarta mt-0.5">
                  Deep dives into intelligence systems, robotics engineering, and AI safety
                </p>
              </div>
              <span className="text-xs font-mono text-gray-500 font-medium hidden sm:inline-block">
                Showing {blogs.length} {blogs.length === 1 ? "article" : "articles"}
              </span>
            </div>
          </FadeIn>

          {blogs.length === 0 ? (
            <FadeIn direction="up" delay={250}>
              <div className="max-w-md mx-auto p-12 text-center rounded-[2.5rem] border border-black/5 bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] space-y-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gray-100 border border-black/5 text-black mb-2 shadow-xs">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black font-syne">No Stories Published Yet</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-jakarta">
                  We&apos;re preparing technical research notes, engineering breakdowns, and product updates. Check back soon!
                </p>
              </div>
            </FadeIn>
          ) : (
            <div className="bg-[#f4f4f4] rounded-[2.5rem] p-4 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {regularBlogs.map((blog, idx) => (
                  <FadeIn key={blog.id} direction="up" delay={100 + (idx % 3) * 80}>
                    <BlogCard
                      title={blog.title}
                      slug={blog.slug}
                      excerpt={blog.excerpt}
                      coverImage={blog.coverImage}
                      publishedAt={blog.publishedAt}
                    />
                  </FadeIn>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
