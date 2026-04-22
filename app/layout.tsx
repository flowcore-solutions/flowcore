import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import QuoteModalWrapper from "@/components/layout/QuoteModalWrapper";
import { Analytics } from "@vercel/analytics/react";

// ── Font ──────────────────────────────────────────────────────────────────
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// ── Site Metadata ─────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://flowcoresolutions.in"),
  applicationName: "FlowCore Solutions",

  title: {
    default: "Berlington Pumps Dealer in Bangalore | FlowCore Solutions",
    template: "%s | FlowCore Solutions",
  },

  description:
    "Authorized Berlington Pumps dealer in Bangalore. Industrial pumps, WTP systems & expert service across Karnataka.",

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
  },

  manifest: "/manifest.json",

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

  openGraph: {
    type: "website",
    siteName: "FlowCore Solutions",
    url: "https://flowcoresolutions.in",
    title: "Berlington Pumps Dealer in Bangalore | FlowCore Solutions",
    description:
      "Authorized Berlington Pumps dealer in Bangalore. Industrial pumps, WTP systems & expert service across Karnataka.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FlowCore Solutions",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Berlington Pumps Dealer in Bangalore | FlowCore Solutions",
    description:
      "Authorized Berlington Pumps dealer in Bangalore. Industrial pumps, WTP systems & expert service across Karnataka.",
    images: ["/og-image.png"],
  },
};


// ── Organization Schema ───────────────────────────────────────────────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://flowcoresolutions.in/#organization",
  name: "FlowCore Solutions",
  url: "https://flowcoresolutions.in",
  logo: "https://flowcoresolutions.in/og-image.png",
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: "+91-8618885283",
      areaServed: "IN",
      availableLanguage: ["en"],
    },
  ],
};

// ── WebSite Schema (VERY IMPORTANT FIX) ───────────────────────────────────
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FlowCore Solutions",
  url: "https://flowcoresolutions.in",
};

// ── Root Layout ───────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans`}>
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        {/* WebSite Schema (fixes Google site name) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />

        <Navbar />


        <main className="pt-24">{children}</main>

        <Footer />
        <QuoteModalWrapper />
        <Analytics />
      </body>
    </html>
  );
}
