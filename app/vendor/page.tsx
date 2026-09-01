import { Metadata } from "next";
import { SchemaMarkup } from "@/components/seo/schema-markup";
import VendorPageClient from "@/components/vendor-page-client";

export const metadata: Metadata = {
  title: "Vendor Partner Program | KavachX",
  description: "Join the KavachX Vendor Partner Network. Distribute state-of-the-art AI security solutions, build a recurring revenue opportunity with KAIROS.",
  keywords: [
    "Kavach X vendor program",
    "CCTV distributor program India",
    "AI security partner",
    "sell smart CCTV",
    "security camera dealer program",
    "B2B security partner",
    "smart home security vendor",
    "recurring revenue security business"
  ],
  openGraph: {
    title: "Vendor Partner Program | KavachX",
    description: "Join the KavachX Vendor Partner Network. Distribute state-of-the-art AI security solutions, build a recurring revenue opportunity with KAIROS.",
    url: "https://kavachx.io/vendor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vendor Partner Program | KavachX",
    description: "Join the KavachX Vendor Partner Network. Distribute state-of-the-art AI security solutions, build a recurring revenue opportunity with KAIROS.",
  },
  alternates: {
    canonical: "https://kavachx.io/vendor",
  },
};

export default function VendorProgramPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "name": "Vendor Partner Program | Kavach X",
        "description": "Join the Kavach X Vendor Partner Network. Distribute state-of-the-art AI security solutions, build a recurring revenue opportunity with KAIROS.",
        "url": "https://kavachx.com/vendor",
        "publisher": {
          "@type": "Organization",
          "name": "Kavach X"
        }
      }
    ]
  };

  return (
    <>
      <SchemaMarkup schema={schema} />
      <VendorPageClient />
    </>
  );
}
