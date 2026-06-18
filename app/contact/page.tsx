import CTA from "@/components/cta";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Kavach X",
  description: "Get in touch with Kavach X. We're here to assist you with any inquiries regarding our smart personal safety app and AI security features.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-24 bg-white">
      <CTA />
    </main>
  );
}
