import CTA from "@/components/cta";
import { Metadata } from "next";
import { SchemaMarkup } from "@/components/seo/schema-markup";

export const metadata: Metadata = {
  title: "Contact Us | KavachX",
  description: "Get in touch with KavachX. We're here to assist you with any inquiries regarding our Safety Infrastructure for Organizations and KAIROS AI edge box.",
};

export default function ContactPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact KavachX Support",
    "description": "Get in touch with KavachX for inquiries about our Safety Infrastructure for Organizations and the KAIROS AI edge box.",
    "url": "https://kavachx.io/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "KavachX",
      "url": "https://kavachx.io",
      "logo": "https://kavachx.io/images/logo.png"
    }
  };

  return (
    <main className="min-h-screen pt-24 bg-white">
      <SchemaMarkup schema={schema} />
      <CTA />
    </main>
  );
}
