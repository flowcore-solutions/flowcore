"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import flowcoreLogo from "@/app/assets/logos/flowcore-logo.png";
import GreenCTAButton from "@/components/ui/GreenCTAButton";

type NavIndicator = "blue" | "green";

interface NavLink {
  href: string;
  label: string;
  indicator: NavIndicator;
}

const NAV_LINKS: readonly NavLink[] = [
  { href: "/", label: "Home", indicator: "blue" },
  { href: "/products", label: "Products", indicator: "blue" },
  { href: "/applications", label: "Applications", indicator: "blue" },
  { href: "/about", label: "About", indicator: "green" },
  { href: "/contact", label: "Contact", indicator: "green" },
] as const;

const PRECISION_EASE = [0.25, 0, 0, 1] as const;

// ── Dot Indicator ──
function NavDot({ indicator, isActive }: { indicator: NavIndicator; isActive: boolean }) {
  const color = indicator === "blue" ? "bg-primary-blue" : "bg-primary-green";
  const inactive = indicator === "blue" ? "bg-primary-blue/20" : "bg-primary-green/20";

  return (
    <span
      className={`inline-block rounded-full transition-all duration-300 ${
        isActive ? `w-2 h-2 ${color}` : `w-1.5 h-1.5 ${inactive}`
      }`}
    />
  );
}

// ── Brand ──
function BrandIdentity() {
  return (
    <div className="flex items-center gap-3">
      <Image
        src={flowcoreLogo}
        alt="Flowcore Logo"
        width={54}
        height={54}
        className="w-12 lg:w-14 drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
      />
      <div className="leading-none">
        <div className="text-xl lg:text-2xl font-black tracking-tight text-deep-blue uppercase">
          Flowcore
        </div>
        <div className="text-[10px] tracking-[0.3em] text-deep-blue uppercase text-center">
          Solutions
        </div>
      </div>
    </div>
  );
}

// ── Mobile Drawer ──
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
          <motion.div
            className="fixed inset-0 z-40 bg-deep-blue/20 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-y-4 right-4 z-50 w-[85%] max-w-sm bg-white rounded-3xl shadow-2xl flex flex-col"
            initial={{ x: "110%" }}
            animate={{ x: 0 }}
            exit={{ x: "110%" }}
            transition={{ duration: 0.4, ease: PRECISION_EASE }}
          >
            <div className="flex justify-between items-center p-6 border-b">
              <BrandIdentity />
              <button onClick={onClose}>✕</button>
            </div>

            <div className="flex-1 p-6 space-y-4">
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
                    className={`flex items-center gap-3 p-3 rounded-xl font-semibold ${
                      isActive
                        ? "bg-primary-blue/10 text-primary-blue"
                        : "text-text-light"
                    }`}
                  >
                    <NavDot indicator={link.indicator} isActive={isActive} />
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="p-6">
              <GreenCTAButton fullWidth>Get a Quote</GreenCTAButton>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── MAIN NAVBAR ──
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
      <div className="fixed top-4 left-0 right-0 z-50 px-6 pointer-events-none">
        <motion.nav
          layout
          className={`relative mx-auto max-w-7xl rounded-[2rem] pointer-events-auto transition-all duration-500 ${
            scrolled
              ? "bg-white/80 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] py-2.5 scale-[0.98]"
              : "bg-white shadow-lg py-4"
          }`}
        >
          {/* Ambient Scroll Blobs (Always Visible) */}
          <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 -translate-y-1/2 -left-20 w-[24rem] h-[24rem] bg-[#6CC24A]/25 blur-[60px] rounded-full" />
            <div className="absolute top-1/2 -translate-y-1/2 -right-20 w-[30rem] h-[30rem] bg-[#1E5BB8]/15 blur-[70px] rounded-full" />
          </div>

          <div className="relative z-10 flex items-center justify-between px-8">
            <Link href="/">
              <BrandIdentity />
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden md:block relative">
              <div className="relative flex items-center gap-2 bg-section-bg/50 p-1.5 rounded-full border border-border/40">
                {NAV_LINKS.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="relative px-6 py-2.5 text-sm font-bold rounded-full transition-all hover:-translate-y-[2px]"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="nav-pill"
                          className="absolute inset-0 bg-white rounded-full shadow-sm"
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

            {/* CTA */}
            <div className="flex items-center gap-4">
              <Link href="/contact" className="hidden lg:block">
                <button className="relative overflow-hidden bg-deep-blue text-white rounded-full px-8 py-3 text-sm font-black uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_30px_rgba(15,61,145,0.4)]">
                  <span className="relative z-10">Get a Quote</span>
                  <span className="absolute inset-0 bg-primary-blue opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                </button>
              </Link>

              <button
                onClick={() => setDrawerOpen(true)}
                className="md:hidden p-3 bg-section-bg rounded-xl"
              >
                ☰
              </button>
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