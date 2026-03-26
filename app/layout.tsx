import type { Metadata } from "next";
import { Syne, Poppins, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";


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
  title: "Kavach X - Intelligent Safety for Everyone",
  description: "Advanced safety solutions including drive detection, in-app SOS, and AI edge box technology.",
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
      <body className="h-full min-h-full flex flex-col font-sans bg-black text-white">
        <SiteHeader />
        <main className="flex-1 w-full relative">
          {children}
        </main>
      </body>
    </html>
  );
}
