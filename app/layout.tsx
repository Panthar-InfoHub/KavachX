import type { Metadata } from "next";
import { Syne, Poppins, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";


const FontSyne = Syne({
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const FontPoppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Kavach X | Smart Personal Safety App & AI Security",
    template: "%s | Kavach X",
  },
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
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Kavach X",
    title: "Kavach X | Smart Personal Safety App & AI Security",
    description: "Stay safe with Kavach X – India's intelligent safety platform. SOS alerts, real-time location tracking, crash detection & AI Edge Box for home security.",
    images: [
      {
        url: "/images/og-default.png", // Recommended to place a default OG image here in public/images
        width: 1200,
        height: 630,
        alt: "Kavach X Safety Application",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kavach X | Smart Personal Safety App & AI Security",
    description: "Stay safe with Kavach X – India's intelligent safety platform. SOS alerts, real-time location tracking, crash detection & AI Edge Box for home security.",
    images: ["/images/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", FontSyne.variable, FontPoppins.variable)}
    >
      <body className="h-full min-h-full flex flex-col font-sans bg-black text-white relative">
        <SiteHeader />
        <main className="flex-1 w-full relative z-0">
          {children}
        </main>
        <div className="relative z-30">
          <Footer />
        </div>
      </body>
    </html>
  );
}
