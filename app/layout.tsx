import type { Metadata, Viewport } from "next";
import { Oswald, Plus_Jakarta_Sans } from "next/font/google";
import { absoluteUrl, DEFAULT_DESCRIPTION } from "@/lib/seo/metadata";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-display",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const viewport: Viewport = {
  themeColor: "#070707",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: "Norris Construction | Commercial Construction & Renovations",
    template: "%s | Norris Construction",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: "Norris Construction",
  keywords: [
    "Commercial general contractor South Florida",
    "Commercial renovation contractor Palm Beach County",
    "Commercial construction Broward County",
    "Commercial build-out contractor Jupiter FL",
    "Office renovation contractor West Palm Beach",
    "Restaurant renovation contractor Fort Lauderdale",
    "Commercial tenant improvement contractor",
    "White box commercial construction Florida",
    "Self-storage facility renovation contractor",
    "Warehouse renovation South Florida",
  ],
  authors: [{ name: "Norris Construction" }],
  creator: "Norris Construction",
  publisher: "Norris Construction",
  category: "commercial construction",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: absoluteUrl("/"),
    siteName: "Norris Construction",
    title: "Norris Construction | Commercial Construction & Renovations",
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: absoluteUrl("/images/hero.jpg"),
        width: 1200,
        height: 630,
        alt: "Norris Construction commercial renovation South Florida",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Norris Construction | Commercial Construction & Renovations",
    description: DEFAULT_DESCRIPTION,
    images: [absoluteUrl("/images/hero.jpg")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: absoluteUrl("/"),
    types: {
      "text/plain": [
        { url: "/llms.txt", title: "llms.txt" },
        { url: "/llms-full.txt", title: "llms-full.txt" },
      ],
    },
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${oswald.variable} ${jakarta.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
