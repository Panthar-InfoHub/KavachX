import CTA from "@/components/cta";
import { Metadata } from "next";
import { SchemaMarkup } from "@/components/seo/schema-markup";

export const metadata: Metadata = {
  title: "Contact Us | Kavach X",
  description: "Get in touch with Kavach X. We're here to assist you with any inquiries regarding our smart personal safety app and AI security features.",
};

export default function ContactPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Kavach X Support",
    "description": "Get in touch with Kavach X for inquiries about our smart personal safety app and Kairos AI home security.",
    "url": "https://kavachx.io/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "Kavach X",
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
