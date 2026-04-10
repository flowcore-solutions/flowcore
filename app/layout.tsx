import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import QuoteModalWrapper from "@/components/layout/QuoteModalWrapper";

// ── Font ──────────────────────────────────────────────────────────────────
// Loaded once at the root — CSS variable injected on <body>.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// ── Site Metadata ─────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://flowcore.in"),
  applicationName: "FlowCore Solutions",
  title: {
    default: "FlowCore Solutions — Industrial Pump Systems & Water Treatment India",
    template: "%s | FlowCore Solutions",
  },
  description:
    "FlowCore Solutions is the engineering bridge between Berlington industrial pumps and Flowchar water treatment chemicals. ISO-certified pump selection, MEP specification support, and Total System Health lifecycle servicing across India.",
  keywords: [
    "industrial pumps India",
    "Berlington pumps distributor",
    "Flowchar water treatment chemicals",
    "vertical multistage pumps",
    "AISI 316 stainless steel pumps",
    "WTP engineering solutions",
    "HVAC pump systems",
    "sewage submersible pumps",
    "MEP specification support",
    "pump repair services India",
    "water treatment plant chemicals",
    "industrial fluid infrastructure",
    "centrifugal pump supplier Bengaluru",
    "scale inhibitors biocides coagulants",
  ],
  alternates: {
    canonical: "/",
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
  openGraph: {
    type: "website",
    siteName: "FlowCore Solutions",
    locale: "en_IN",
    url: "https://flowcore.in",
    title: "FlowCore Solutions — Industrial Pump Systems & Water Treatment India",
    description:
      "The engineering bridge between Berlington fluid hardware and Flowchar chemistry. ISO-certified pump systems, MEP support, and 24/7 lifecycle servicing.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FlowCore Solutions — Industrial Fluid Infrastructure & Water Treatment India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FlowCore Solutions — Industrial Pump Systems & Water Treatment India",
    description:
      "ISO-certified Berlington pumps and Flowchar water treatment. MEP support and Total System Health lifecycle servicing.",
    images: ["/og-image.png"],
  },
  appleWebApp: {
    title: "FlowCore",
  },
};

// ── Organization JSON-LD ──────────────────────────────────────────────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://flowcore.in/#organization",
  name: "FlowCore Solutions",
  url: "https://flowcore.in",
  logo: {
    "@type": "ImageObject",
    url: "https://flowcore.in/og-image.png",
    width: 1200,
    height: 630,
  },
  description:
    "FlowCore Solutions is the critical engineering bridge between Berlington industrial pump hardware and Flowchar water treatment chemistry. Specializing in ISO-certified pump selection, MEP specification support, and Total System Health lifecycle servicing across India.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "No. 65/1A, Cheluva Complex, Kottigepalya, Magadi Main Road, Vishwaneedam Post",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560091",
    addressCountry: "IN",
  },
  telephone: "+918618885283",
  email: "flowcoresolutionsblr@gmail.com",
  foundingDate: "2020",
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  knowsAbout: [
    "Industrial Pump Systems",
    "Water Treatment Plants",
    "HVAC Fluid Systems",
    "MEP Engineering",
    "Vertical Multistage Pumps",
    "Submersible Sewage Pumps",
    "Water Treatment Chemicals",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Berlington Pump Catalogue",
    url: "https://flowcore.in/products",
  },
  sameAs: [],
};

// ── Root Layout ───────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className="scroll-smooth">
      <body
        className={`${poppins.variable} font-sans antialiased bg-white text-text-dark`}
      >
        {/* Organization JSON-LD — injected on every page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        {/* Floating Island Navbar — fixed, renders above page content */}
        <Navbar />

        {/*
          Page content offset:
          - Navbar island: top-4 (16px) + py-3.5 ≈ 28px + logo height 36px ≈ 80px total
          - We add pt-24 (96px) to avoid content hiding under the nav.
          - Individual page heroes that intentionally underlap the nav
            can override this with a negative margin-top on their outer wrapper.
        */}
        <main id="main-content" className="pt-24">
          {children}
        </main>

        <Footer />
        <QuoteModalWrapper />
      </body>
    </html>
  );
}
