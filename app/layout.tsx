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
    default: "Kavach X | The Ultimate Safety Application",
    template: "%s | Kavach X",
  },
  description: "Kavach X is the ultimate safety platform featuring AI edge box, voice command SOS activation, AI SOS analysis, and Suraksha Kavach. Experience intelligent personal safety.",
  keywords: [
    "Kavach X",
    "AI safety",
    "safety application",
    "suraksha kavach",
    "safety platform",
    "The Ultimate Safety Application",
    "sos alert",
    "ai edge box",
    "voice command sos activation",
    "ai sos analysis",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Kavach X",
    title: "Kavach X | The Ultimate Safety Application",
    description: "Kavach X is the ultimate safety platform featuring AI edge box, voice command SOS activation, AI SOS analysis, and Suraksha Kavach.",
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
    title: "Kavach X | The Ultimate Safety Application",
    description: "Empowering your personal safety through intuitive AI technology and strong security features.",
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
