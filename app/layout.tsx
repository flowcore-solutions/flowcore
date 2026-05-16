import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import QuoteModalWrapper from "@/components/layout/QuoteModalWrapper";
import { Analytics } from "@vercel/analytics/react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flowcoresolutions.in"),
  applicationName: "FlowCore Solutions",

  title: {
    default: "Industrial Pumps for RO, HVAC and STP in Bengaluru",
    template: "%s | FlowCore Solutions",
  },

  description:
    "Industrial pumps, water treatment systems, installation support, AMC, and breakdown service in Bengaluru for factories, hospitals, hotels, apartments, and commercial buildings.",

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
    title: "Industrial Pumps for RO, HVAC and STP in Bengaluru",
    description:
      "Industrial pumps, water treatment systems, installation support, AMC, and breakdown service in Bengaluru.",
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
    title: "Industrial Pumps for RO, HVAC and STP in Bengaluru",
    description:
      "Industrial pumps, water treatment systems, installation support, AMC, and breakdown service in Bengaluru.",
    images: ["/og-image.png"],
  },
};

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

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FlowCore Solutions",
  url: "https://flowcoresolutions.in",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

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
