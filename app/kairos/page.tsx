import Image from "next/image";
import LenisDiv from "@/components/LenisDiv";
import { Metadata } from "next";
import { SchemaMarkup } from "@/components/seo/schema-markup";

import KairosPageClient from "@/components/kairos-page-client";

export const metadata: Metadata = {
  title: "KAIROS AI Edge Box | Intelligent Home Security by KavachX",
  description: "Monitor your home, family, and spaces from anywhere in the world. The Kavach Kairos brings AI-driven CCTV analytics and real-time intelligence directly to your front door.",
  keywords: [
    "KAIROS AI edge box",
    "Intelligent Home Security",
    "AI-driven CCTV analytics",
    "real-time intelligence",
    "edge computing security",
    "KavachX kairos"
  ],
  openGraph: {
    title: "KAIROS AI Edge Box | Intelligent Home Security by KavachX",
    description: "Monitor your home, family, and spaces from anywhere in the world. The Kavach Kairos brings AI-driven CCTV analytics and real-time intelligence directly to your front door.",
    url: "https://kavachx.io/kairos",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KAIROS AI Edge Box | Intelligent Home Security",
    description: "The Kavach Kairos brings AI-driven CCTV analytics directly to your front door.",
  },
  alternates: {
    canonical: "https://kavachx.io/kairos",
  },
};

export default function KairosPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "name": "Kavach KAIROS AI Edge Box",
        "description": "Intelligent Home Security. Monitor your home, family, and spaces from anywhere in the world. The Kavach Kairos brings AI-driven CCTV analytics and real-time intelligence directly to your front door.",
        "brand": {
          "@type": "Brand",
          "name": "KavachX"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Kairos?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Kairos is an AI-powered video intelligence platform that helps you search, understand, and analyze CCTV footage using natural language—making it easier to find specific incidents, people, objects, or activities without manually watching hours of video."
            }
          },
          {
            "@type": "Question",
            "name": "How does Kairos work with my existing CCTV cameras?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Kairos is designed to work with your existing CCTV infrastructure. It can connect with your NVR and edge devices to process and analyze video footage while securely storing relevant data for investigation and retrieval."
            }
          },
          {
            "@type": "Question",
            "name": "How can I find a specific incident in hours of CCTV footage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Simply describe what you’re looking for in natural language—for example, “Find the person who entered the warehouse around 2 PM wearing a red shirt.” Kairos analyzes the footage and helps identify the relevant time and video segment, significantly reducing investigation time."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <SchemaMarkup schema={schema} />
      <KairosPageClient />
    </>
  );
}
