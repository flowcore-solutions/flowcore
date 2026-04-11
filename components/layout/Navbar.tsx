"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import flowcoreLogo from "@/app/assets/logos/flowcore-logo.png";

type NavIndicator = "blue" | "green";

interface NavLink {
  href: string;
  label: string;
  indicator: NavIndicator;
}

const NAV_LINKS: readonly NavLink[] = [
  { href: "/", label: "Home", indicator: "blue" },
  { href: "/about", label: "About", indicator: "green" },
  { href: "/applications", label: "Applications", indicator: "blue" },
  { href: "/products", label: "Products", indicator: "blue" },
  { href: "/contact", label: "Contact", indicator: "green" },
] as const;

const PRECISION_EASE = [0.25, 0, 0, 1] as const;

function NavDot({
  indicator,
  isActive,
}: {
  indicator: NavIndicator;
  isActive: boolean;
}) {
  const color = indicator === "blue" ? "bg-primary-blue" : "bg-primary-green";
  const inactive =
    indicator === "blue" ? "bg-primary-blue/20" : "bg-primary-green/20";

  return (
    <span
      className={`inline-block rounded-full transition-all duration-300 ${
        isActive ? `h-2 w-2 ${color}` : `h-1.5 w-1.5 ${inactive}`
      }`}
    />
  );
}

function BrandIdentity() {
  return (
    <div className="flex items-center gap-3">
      <Image
        src={flowcoreLogo}
        alt="FlowCore Solutions logo - Industrial Pump Systems and Water Treatment"
        width={54}
        height={54}
        priority
        className="w-12 drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] lg:w-14"
      />
      <div className="leading-none">
        <div className="text-xl font-black uppercase tracking-tight text-deep-blue lg:text-2xl">
          Flowcore
        </div>
        <div className="text-center text-[10px] uppercase tracking-[0.3em] text-deep-blue">
          Solutions
        </div>
      </div>
    </div>
  );
}

function MobileToggleButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-nav-panel"
      className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 active:scale-90 ${
        isOpen
          ? "bg-white shadow-[0_12px_24px_rgba(15,61,145,0.16)]"
          : "bg-section-bg"
      }`}
    >
      {isOpen ? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 6L18 18M18 6L6 18"
            stroke="#0f3d91"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 6H20M4 12H14M4 18H9"
            stroke="#1e5bb8"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

function MobileDrawer({
  isOpen,
  onClose,
  pathname,
}: {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close mobile menu"
            className="fixed inset-0 z-40 bg-deep-blue/8 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: PRECISION_EASE }}
            onClick={onClose}
          />

          <motion.div
            id="mobile-nav-panel"
            className="fixed inset-x-6 top-[5.8rem] z-50 md:hidden"
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.25, ease: PRECISION_EASE }}
          >
            <div className="rounded-4xl border border-white/70 bg-white/92 p-4 shadow-[0_24px_60px_rgba(15,61,145,0.18)] backdrop-blur-xl">
              <nav className="space-y-1" aria-label="Mobile navigation">
                {NAV_LINKS.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={onClose}
                      className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-semibold transition-all duration-200 ${
                        isActive
                          ? "bg-section-bg text-deep-blue"
                          : "text-text-light hover:bg-section-bg/70 hover:text-deep-blue"
                      }`}
                    >
                      <NavDot indicator={link.indicator} isActive={isActive} />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-4 border-t border-border/70 pt-4">
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="flex items-center justify-center rounded-full bg-deep-blue px-5 py-3 text-sm font-black uppercase tracking-[0.16em] text-white transition-transform duration-200 active:scale-[0.98]"
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed left-0 right-0 top-4 z-50 px-6">
        <motion.nav
          layout
          className={`pointer-events-auto relative mx-auto max-w-7xl rounded-4xl transition-all duration-500 ${
            scrolled
              ? "scale-[0.98] bg-white/80 py-2.5 shadow-[0_10px_40px_rgba(0,0,0,0.1)] backdrop-blur-xl"
              : "bg-white py-4 shadow-lg"
          }`}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-4xl">
            <div className="absolute -left-20 top-1/2 h-96 w-[24rem] -translate-y-1/2 rounded-full bg-[#6CC24A]/25 blur-[60px]" />
            <div className="absolute -right-20 top-1/2 h-120 w-120 -translate-y-1/2 rounded-full bg-[#1E5BB8]/15 blur-[70px]" />
          </div>

          <div className="relative z-10 flex items-center justify-between px-5 sm:px-8">
            <Link href="/">
              <BrandIdentity />
            </Link>

            <div className="relative hidden md:block">
              <div className="relative flex items-center gap-2 rounded-full border border-border/40 bg-section-bg/50 p-1.5">
                {NAV_LINKS.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="relative rounded-full px-6 py-2.5 text-sm font-bold transition-all hover:-translate-y-0.5"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full bg-white shadow-sm"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}

                      <span className="relative z-10 flex items-center gap-2">
                        <NavDot
                          indicator={link.indicator}
                          isActive={isActive}
                        />
                        {link.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/contact" className="hidden lg:block">
                <button className="relative overflow-hidden rounded-full bg-deep-blue px-8 py-3 text-sm font-black uppercase tracking-widest text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_30px_rgba(15,61,145,0.4)]">
                  <span className="relative z-10">Get a Quote</span>
                  <span className="absolute inset-0 bg-primary-blue opacity-0 transition-opacity duration-300 hover:opacity-100" />
                </button>
              </Link>

              <div className="md:hidden">
                <MobileToggleButton
                  isOpen={drawerOpen}
                  onClick={() => setDrawerOpen((open) => !open)}
                />
              </div>
            </div>
          </div>
        </motion.nav>
      </div>

      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        pathname={pathname}
      />
    </>
  );
}
