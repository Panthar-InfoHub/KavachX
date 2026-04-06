import HomeClient from "@/components/home-client";
import { SchemaMarkup } from "@/components/seo/schema-markup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Kavach X is the ultimate safety platform featuring AI edge box, voice command SOS activation, AI SOS analysis, and Suraksha Kavach.",
  openGraph: {
    title: "Kavach X | Home",
    description: "Experience the ultimate safety platform with AI root technology, instant SOS alerts, and voice command SOS activation.",
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
    </>
  );
}
