import BlogClient from "./blog-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | KavachX Insights & Updates",
  description: "Read the latest engineering deep dives, security updates, and company news from KavachX.",
  keywords: [
    "KavachX Blog",
    "Security Updates",
    "Engineering",
    "Edge Computing",
  ],
  openGraph: {
    title: "Blog | KavachX Insights & Updates",
    description: "Read the latest engineering deep dives, security updates, and company news from KavachX.",
    url: "/blog",
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
