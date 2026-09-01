import HomeClient from "@/components/home-client";
import HomeComponent from "@/components/HomePage";
import { SchemaMarkup } from "@/components/seo/schema-markup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "KavachX | Safety Infrastructure for Organizations",
  description: "Intelligent Home Security. Monitor your home, family, and spaces from anywhere in the world. The Kavach Kairos brings AI-driven CCTV analytics directly to your front door.",
  keywords: [
    "Safety Infrastructure for Organizations",
    "KAIROS AI edge box",
    "Intelligent Home Security",
    "real-time CCTV analytics",
    "KavachX",
  ],
  openGraph: {
    title: "KavachX | Safety Infrastructure for Organizations",
    description: "Intelligent Home Security and Enterprise Safety Infrastructure with the KAIROS AI edge box.",
    url: "/",
  },
};

export default function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "KavachX",
    "url": "https://kavachx.io",
    "logo": "https://kavachx.io/images/logo.png",
    "description": "KavachX provides Safety Infrastructure for Organizations and Intelligent Home Security through the KAIROS AI edge box.",
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
