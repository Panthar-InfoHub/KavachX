import type { Metadata } from "next";
import { Syne, Poppins, Geist, Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/navbar";
import ParticleObject from "@/components/canvasui/ParticleObject";

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

const FontInstrument = Instrument_Serif({
  variable: "--font-instrument",
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const FontJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://kavachx.io"),
  title: {
    default: "KavachX | Safety Infrastructure for Organizations & AI Edge Box",
    template: "%s | KavachX",
  },
  description: "Intelligent Home Security and Enterprise Safety Infrastructure. Monitor your home, family, and spaces from anywhere with the KAIROS AI edge box.",
  keywords: [
    "Safety Infrastructure for Organizations",
    "KAIROS AI edge box",
    "Intelligent Home Security",
    "real-time CCTV analytics",
    "AI-driven security",
    "edge computing safety",
    "KavachX",
    "smart surveillance India",
    "enterprise security infrastructure",
    "personal safety app India",
    "SOS alert app",
    "real-time location tracking",
    "crash detection app",
    "AI home security device",
    "smart safety app",
    "emergency alert app India",
    "family safety app",
    "Kairos CCTV",
    "Suraksha Kavach",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "KavachX",
    title: "KavachX | Safety Infrastructure for Organizations & AI Edge Box",
    description: "Intelligent Home Security and Enterprise Safety Infrastructure. Monitor your home, family, and spaces from anywhere with the KAIROS AI edge box.",
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
    description: "Stay safe with Kavach X – India's intelligent safety platform. SOS alerts, real-time location tracking, crash detection & Kairos for home security.",
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
      className={cn("min-h-screen", "antialiased", FontSyne.variable, FontPoppins.variable, FontInstrument.variable, FontJakarta.variable)}
    >
      <body className="min-h-screen flex flex-col font-sans bg-black text-white relative">
        <Navbar />
        <main className="flex-1 w-full relative z-0">
          {children}
        </main>

        <div className="relative z-30 bg-black">
          {/* Global Particle Component placed just above the footer */}
          <div className="w-full max-w-6xl mx-auto h-[400px] md:h-[500px]">
            <ParticleObject
              className="w-full h-full bg-black"
              src="/images/logo.png"
              scale={6}
              cameraDistance={3.5}
            />
          </div>
          <Footer />
        </div>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
