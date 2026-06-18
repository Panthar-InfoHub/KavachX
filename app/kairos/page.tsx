import Image from "next/image";
import LenisDiv from "@/components/LenisDiv";
import { Metadata } from "next";
import { SchemaMarkup } from "@/components/seo/schema-markup";

import KairosPageClient from "@/components/kairos-page-client";

export const metadata: Metadata = {
  title: "Kairos | Smart CCTV Security Device by Kavach X",
  description: "Kavach Kairos – AI-driven edge computing, real-time CCTV analytics & intelligent home security. Monitor your home from anywhere. Coming soon.",
  keywords: [
    "Kairos India",
    "smart CCTV device",
    "AI home security India",
    "edge computing security",
    "real-time video analytics",
    "intelligent CCTV",
    "home surveillance AI",
    "Kavach X kairos"
  ],
  openGraph: {
    title: "Kairos | Smart CCTV Security Device by Kavach X",
    description: "Kavach Kairos – AI-driven edge computing, real-time CCTV analytics & intelligent home security. Monitor your home from anywhere. Coming soon.",
    url: "/kairos",
  },
};

export default function KairosPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "name": "Kavach Kairos",
        "description": "Kairos for empowering security through AI-driven edge computing, real-time data processing and intelligent analytics.",
        "brand": {
          "@type": "Brand",
          "name": "Kavach X"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "When does Kairos launch?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Kavach Kairos is launching soon. It will bring AI-driven edge computing and real-time CCTV analytics to your home security setup."
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
