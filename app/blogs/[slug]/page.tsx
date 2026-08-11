import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { TiptapRenderer } from "@/components/blog/tiptap-renderer";

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
      title: "Article Not Found | Kavach X",
      robots: { index: false, follow: false },
    };
  }

  const title = (blog as any).title;
  const excerpt = (blog as any).excerpt || `${title} — Read the full article on Kavach X.`;
  const coverImage = (blog as any).coverImage || "";
  const publishedAt = (blog as any).publishedAt
    ? new Date((blog as any).publishedAt).toISOString()
    : undefined;
  const updatedAt = (blog as any).updatedAt
    ? new Date((blog as any).updatedAt).toISOString()
    : undefined;

  const canonicalUrl = `${siteUrl}/blogs/${slug}`;

  return {
    title: `${title} | Kavach X Blog`,
    description: excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | Kavach X Blog`,
      description: excerpt,
      url: canonicalUrl,
      type: "article",
      publishedTime: publishedAt,
      modifiedTime: updatedAt,
      siteName: "Kavach X",
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
      title: `${title} | Kavach X`,
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
      "name": "Kavach X Team",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Kavach X",
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}/blogs/${blog.slug}`,
    },
  };

  return (
    <article className="min-h-screen bg-black text-white relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Inject JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background Ambient Glow */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-violet-600/10 blur-[200px]" />
      </div>

      <div className="max-w-4xl mx-auto space-y-10 relative z-10">
        {/* Back Link */}
        <div>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/70 hover:text-white text-xs font-semibold transition-all shadow-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            ← Back to all articles
          </Link>
        </div>

        {/* PROMINENT HERO COVER IMAGE */}
        {blog.coverImage ? (
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-3xl overflow-hidden border border-white/15 bg-black/60 shadow-2xl group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>
        ) : null}

        {/* ARTICLE HEADER / TITLE SECTION */}
        <header className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-violet-600/15 border border-violet-500/30 text-violet-300 text-xs font-mono uppercase tracking-wider font-medium">
              Safety & Technology
            </span>
            <span className="text-xs font-mono text-white/40">Published {formattedDate}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-syne leading-tight tracking-tight">
            {blog.title}
          </h1>

          {blog.excerpt && (
            <p className="text-base sm:text-xl text-white/70 leading-relaxed font-sans border-l-2 border-violet-500/50 pl-4 py-1 font-normal">
              {blog.excerpt}
            </p>
          )}
        </header>

        {/* ARTICLE CONTENT CONTAINER */}
        <main className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-12 shadow-2xl">
          <TiptapRenderer content={blog.content} />
        </main>

        {/* FOOTER NAVIGATION */}
        <div className="pt-8 border-t border-white/10 flex items-center justify-between">
          <Link
            href="/blogs"
            className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors inline-flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Explore more articles
          </Link>
        </div>
      </div>
    </article>
  );
}
