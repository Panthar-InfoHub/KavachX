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
            "name": "What does the KAIROS AI Edge Box do?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Kavach Kairos brings AI-driven CCTV analytics and real-time intelligence directly to your front door, providing Intelligent Home Security."
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
