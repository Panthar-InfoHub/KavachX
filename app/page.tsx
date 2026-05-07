import HomeClient from "@/components/home-client";
import HomeComponent from "@/components/HomePage";
import { SchemaMarkup } from "@/components/seo/schema-markup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kavach X | Smart Personal Safety App & AI Security",
  description: "Stay safe with Kavach X – India's intelligent safety platform. SOS alerts, real-time location tracking, crash detection & AI Edge Box for home security.",
  keywords: [
    "personal safety app India",
    "SOS alert app",
    "real-time location tracking",
    "crash detection app",
    "AI home security device",
    "smart safety app",
    "emergency alert app India",
    "family safety app",
    "AI edge box CCTV",
    "Suraksha Kavach",
  ],
  openGraph: {
    title: "Kavach X | Smart Personal Safety App & AI Security",
    description: "Stay safe with Kavach X – India's intelligent safety platform. SOS alerts, real-time location tracking, crash detection & AI Edge Box for home security.",
    url: "/",
  },
};

export default function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Kavach X",
    "url": "https://kavachx.com",
    "logo": "https://kavachx.com/logo.png",
    "description": "The Ultimate Safety Application providing AI safety features, SOS alerts, and the Suraksha Kavach platform.",
    "sameAs": []
  };

  return (
    <>
      <SchemaMarkup schema={schema} />
      <HomeClient />
      <HomeComponent />
    </>
  );
}
