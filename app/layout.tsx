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
  applicationName: "FlowCore",
  title: {
    default: "FlowCore Solutions — Industrial Pump Systems & Water Treatment",
    template: "%s | FlowCore Solutions",
  },
  description:
    "FlowCore Solutions distributes Berlington industrial pump systems and Flowchar water treatment chemicals across India. Vertical multistage, sewage, hydro, and pipeline pumps for WTP, HVAC, and industrial processing.",
  keywords: [
    "industrial pumps",
    "Berlington pumps",
    "multistage pump",
    "water treatment",
    "Flowchar chemicals",
    "FlowCore Solutions",
    "CDLF pump",
    "sewage pump",
    "HVAC pump India",
  ],
  openGraph: {
    type: "website",
    siteName: "FlowCore Solutions",
    locale: "en_IN",
  },
  appleWebApp: {
    title: "FlowCore",
  },
};

// ── Root Layout ───────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${poppins.variable} font-sans antialiased bg-white text-text-dark`}
      >
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
