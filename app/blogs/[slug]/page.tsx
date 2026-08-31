import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { TiptapRenderer } from "@/components/blog/tiptap-renderer";
import { ReadingProgressBar } from "@/components/blog/reading-progress-bar";
import { BlogCard } from "@/components/blog/blog-card";
import FadeIn from "@/components/FadeIn";
import { ArrowRight } from "lucide-react";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // DRAFT PROTECTION: Only return published, non-deleted metadata
  const blog = await Blog.findOne({
    slug,
    isDeleted: { $ne: true },
    status: "PUBLISHED",
  }).lean();

  if (!blog) {
    return {
      title: "Article Not Found | KavachX Intelligence",
      robots: { index: false, follow: false },
    };
  }

  const title = (blog as any).title;
  const excerpt = (blog as any).excerpt || `${title} — Read the full article on KavachX Intelligence.`;
  const coverImage = (blog as any).coverImage || "";
  const publishedAt = (blog as any).publishedAt
    ? new Date((blog as any).publishedAt).toISOString()
    : undefined;
  const updatedAt = (blog as any).updatedAt
    ? new Date((blog as any).updatedAt).toISOString()
    : undefined;

  const canonicalUrl = `${siteUrl}/blogs/${slug}`;

  return {
    title: `${title} | KavachX Intelligence`,
    description: excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | KavachX Intelligence`,
      description: excerpt,
      url: canonicalUrl,
      type: "article",
      publishedTime: publishedAt,
      modifiedTime: updatedAt,
      siteName: "KavachX Intelligence",
      images: coverImage
        ? [
            {
              url: coverImage,
              alt: title,
              width: 1200,
              height: 630,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | KavachX`,
      description: excerpt,
      images: coverImage ? [coverImage] : [],
    },
  };
}

export default async function PublicBlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;
  await connectDB();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // CRITICAL DRAFT PROTECTION: Only fetch if status = PUBLISHED and not deleted
  const blogDoc = await Blog.findOne({
    slug,
    isDeleted: { $ne: true },
    status: "PUBLISHED",
  }).lean();

  if (!blogDoc) {
    notFound();
  }

  const blog = {
    id: (blogDoc as any)._id.toString(),
    title: (blogDoc as any).title,
    slug: (blogDoc as any).slug,
    excerpt: (blogDoc as any).excerpt || "",
    content: (blogDoc as any).content || "",
    coverImage: (blogDoc as any).coverImage || "",
    publishedAt: (blogDoc as any).publishedAt || (blogDoc as any).createdAt,
    updatedAt: (blogDoc as any).updatedAt || (blogDoc as any).createdAt,
  };

  // Fetch 3 related published articles
  const relatedDocs = await Blog.find({
    slug: { $ne: slug },
    isDeleted: { $ne: true },
    status: "PUBLISHED",
  })
    .sort({ publishedAt: -1 })
    .limit(3)
    .lean();

  const relatedBlogs = relatedDocs.map((doc: any) => ({
    id: doc._id.toString(),
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt || "",
    coverImage: doc.coverImage || "",
    publishedAt: doc.publishedAt || doc.createdAt,
  }));

  const formattedDate = new Date(blog.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // JSON-LD Structured Data Schema for Search Engines (Article / BlogPosting)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.excerpt,
    "image": blog.coverImage ? [blog.coverImage] : [],
    "datePublished": new Date(blog.publishedAt).toISOString(),
    "dateModified": new Date(blog.updatedAt).toISOString(),
    "author": {
      "@type": "Organization",
      "name": "KavachX Team",
    },
    "publisher": {
      "@type": "Organization",
      "name": "KavachX",
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}/blogs/${blog.slug}`,
    },
  };

  return (
    <article className="w-full bg-linear-to-b from-[#fdfdfd] via-[#f4f7fc] to-[#eef4ff] text-black font-syne min-h-screen py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      {/* Top Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Inject JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto space-y-10 relative z-10">
        {/* Signature KavachX Back Button */}
        <FadeIn direction="down" delay={0}>
          <div>
            <Link
              href="/blogs"
              className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-black/10 text-black text-xs font-semibold hover:bg-slate-50 transition-all shadow-xs"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white group-hover:-translate-x-0.5 transition-transform">
                <ArrowRight className="h-3.5 w-3.5 rotate-180" />
              </div>
              <span>Back to all articles</span>
            </Link>
          </div>
        </FadeIn>

        {/* ARTICLE HEADER / TITLE SECTION */}
        <header className="space-y-6 max-w-4xl">
          <FadeIn direction="up" delay={50}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-block px-3.5 py-1 bg-gray-100/90 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-600 font-sans border border-black/5">
                AI & ROBOTICS
              </span>
              <span className="text-xs font-mono text-gray-500 font-medium">Published {formattedDate}</span>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={100}>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-black font-syne leading-[1.15] tracking-tight">
              {blog.title}
            </h1>
          </FadeIn>

          {blog.excerpt && (
            <FadeIn direction="up" delay={150}>
              <div className="bg-[#f4f4f4] rounded-3xl p-6 md:p-8 border border-black/5 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
                <p className="text-base sm:text-xl text-gray-800 leading-relaxed font-jakarta font-medium">
                  {blog.excerpt}
                </p>
              </div>
            </FadeIn>
          )}
        </header>

        {/* PROMINENT HERO COVER IMAGE */}
        {blog.coverImage ? (
          <FadeIn direction="up" delay={200}>
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full max-h-[520px] rounded-[2.5rem] overflow-hidden border border-black/5 shadow-[0_10px_30px_rgb(0,0,0,0.05)] bg-white group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
            </div>
          </FadeIn>
        ) : null}

        {/* ARTICLE CONTENT CONTAINER */}
        <FadeIn direction="up" delay={250}>
          <main className="max-w-4xl mx-auto rounded-[2.5rem] bg-white p-6 sm:p-12 lg:p-14 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-black/5">
            <div className="max-w-3xl mx-auto">
              <TiptapRenderer content={blog.content} />
            </div>
          </main>
        </FadeIn>

        {/* FOOTER NAVIGATION & RELATED ARTICLES */}
        {relatedBlogs.length > 0 && (
          <FadeIn direction="up" delay={300}>
            <section className="pt-12 border-t border-black/10 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl md:text-2xl font-bold text-black font-syne tracking-tight">
                  More from KavachX Intelligence
                </h3>
                <Link
                  href="/blogs"
                  className="text-xs font-semibold text-black hover:text-gray-700 transition-colors inline-flex items-center gap-1 font-jakarta"
                >
                  View all
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="bg-[#f4f4f4] rounded-[2.5rem] p-4 md:p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {relatedBlogs.map((relBlog) => (
                    <BlogCard
                      key={relBlog.id}
                      title={relBlog.title}
                      slug={relBlog.slug}
                      excerpt={relBlog.excerpt}
                      coverImage={relBlog.coverImage}
                      publishedAt={relBlog.publishedAt}
                    />
                  ))}
                </div>
              </div>
            </section>
          </FadeIn>
        )}
      </div>
    </article>
  );
}
