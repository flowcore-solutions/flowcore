/**
 * Footer — 3-column industrial layout.
 *
 * Column 1: Brand — FlowCore logo + tagline + social SVGs
 * Column 2: Quick links — mirrors Navbar
 * Column 3: Contact snippet — HQ address, phone, email
 * Bottom bar: Copyright in Deep Blue (#0F3D91)
 *
 * Server Component — no interactivity.
 * Imported and rendered in app/layout.tsx below <main>.
 */

import Image from "next/image";
import Link from "next/link";
import { getHeadquarters } from "@/lib/location-data";
import flowcoreLogo from "@/app/assets/logos/flowcore-logo.png";

// ── Nav links (matches Navbar.tsx) ────────────────────────────────────────

const FOOTER_LINKS = [
  { href: "/",             label: "Home" },
  { href: "/products",     label: "Products" },
  { href: "/applications", label: "Applications" },
  { href: "/about",        label: "About Us" },
  { href: "/contact",      label: "Contact" },
] as const;

// ── Inline SVG Social Icons ───────────────────────────────────────────────

function LinkedInIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 10v7M7 7v.01" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M11 17v-4a2 2 0 014 0v4M11 13v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20.5 3.5A12 12 0 003.5 20.5L2 22l1.5-5.5A12 12 0 1020.5 3.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9 10.5c.5 1 1.5 2.5 3 3.5 0 0 1.5-.5 2-.5s1 .5 1 1-.5 2-2 2-5-2.5-6.5-7c0 0 .5-1.5 1.5-1.5s.5 0 1 1.5z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Component ─────────────────────────────────────────────────────────────

export default function Footer() {
  const hq = getHeadquarters();
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" aria-label="FlowCore Solutions footer">
      {/* ── Main footer body ── */}
      <div className="border-t border-border bg-section-bg">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {/* ── Column 1: Brand ── */}
            <div className="flex flex-col gap-5">
              <Link
                href="/"
                id="footer-logo"
                aria-label="FlowCore Solutions — Home"
                className="block w-fit rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue"
              >
                <Image
                  src={flowcoreLogo}
                  alt="FlowCore Solutions"
                  width={130}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
              </Link>

              <p className="text-sm leading-relaxed text-text-light max-w-xs">
                Engineering fluid systems for a sustainable future — authorised
                distributor of Berlington pump systems and Flowchar water
                treatment chemicals across India.
              </p>

              {/* Social links */}
              <div className="flex items-center gap-3">
                <a
                  href="https://linkedin.com"
                  id="footer-social-linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="FlowCore Solutions on LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-light transition-colors hover:border-primary-blue hover:text-primary-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue"
                >
                  <LinkedInIcon />
                </a>
                <a
                  href={`https://wa.me/${hq.phone?.replace(/\D/g, "") ?? ""}`}
                  id="footer-social-whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact FlowCore on WhatsApp"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-light transition-colors hover:border-primary-green hover:text-primary-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-green"
                >
                  <WhatsAppIcon />
                </a>
              </div>
            </div>

            {/* ── Column 2: Quick Links ── */}
            <nav aria-label="Footer navigation">
              <p className="mb-5 text-[11px] font-bold uppercase tracking-widest text-text-light">
                Quick Links
              </p>
              <ul className="flex flex-col gap-3" role="list">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      id={`footer-link-${link.href.replace("/", "") || "home"}`}
                      className="flex items-center gap-2 text-sm text-text-light transition-colors hover:text-text-dark focus-visible:outline-none focus-visible:underline"
                    >
                      <span
                        className="w-1 h-1 rounded-full shrink-0"
                        style={{ backgroundColor: "#1e5bb840" }}
                        aria-hidden="true"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ── Column 3: Contact Snippet ── */}
            <address className="not-italic flex flex-col gap-5">
              <p className="text-[11px] font-bold uppercase tracking-widest text-text-light">
                Headquarters
              </p>

              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-text-dark">
                  {hq.city}, {hq.state}
                </p>
                <p className="text-xs leading-relaxed text-text-light">
                  {hq.address}
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                {hq.phone && (
                  <a
                    href={`tel:${hq.phone.replace(/\s/g, "")}`}
                    id="footer-phone"
                    className="flex items-center gap-2.5 text-xs text-text-light transition-colors hover:text-text-dark"
                  >
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M2 3h4l1.5 3.5-2 1.2c.9 1.8 2.3 3.2 4 4l1.2-2L14 11v4a1 1 0 01-1 1C6 16 0 10 0 3a1 1 0 011-1h1z" fill="currentColor" fillOpacity="0.5" />
                    </svg>
                    {hq.phone}
                  </a>
                )}

                {hq.email && (
                  <a
                    href={`mailto:${hq.email}`}
                    id="footer-email"
                    className="flex items-center gap-2.5 text-xs text-text-light transition-colors hover:text-text-dark"
                  >
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2" />
                      <path d="M1 5l7 5 7-5" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2" />
                    </svg>
                    {hq.email}
                  </a>
                )}

                <Link
                  href="/contact"
                  id="footer-contact-cta"
                  className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-primary-green hover:text-dark-green transition-colors"
                >
                  Submit an Inquiry
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </address>
          </div>
        </div>
      </div>

      {/* ── Bottom copyright bar ── */}
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{ backgroundColor: "#0f3d91" }}
      >
        <div className="mx-auto max-w-6xl w-full flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/60">
            © {year} FlowCore Solutions. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Authorised distributor of Berlington Industrial Pumps · Flowchar Water Treatment
          </p>
        </div>
      </div>
    </footer>
  );
}
