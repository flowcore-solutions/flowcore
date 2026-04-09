"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import flowcoreLogo from "@/app/assets/logos/flowcore-logo.png";
import GreenCTAButton from "@/components/ui/GreenCTAButton";

// ── Nav Link Data ─────────────────────────────────────────────────────────

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

// ── Shared UI Components ──────────────────────────────────────────────────

function NavDot({ indicator, isActive }: { indicator: NavIndicator; isActive: boolean }) {
  const color = indicator === "blue" ? "bg-primary-blue ring-primary-blue" : "bg-primary-green ring-primary-green";
  const inactiveColor = indicator === "blue" ? "bg-primary-blue/20" : "bg-primary-green/20";

  return (
    <span
      aria-hidden="true"
      className={[
        "inline-block rounded-full shrink-0 transition-all duration-300",
        isActive ? `w-2 h-2 ${color} ring-4 ring-offset-0 ring-opacity-20` : `w-1.5 h-1.5 ${inactiveColor}`,
      ].join(" ")}
    />
  );
}

function BrandIdentity({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const logoSize = size === "lg" ? 64 : 54;
  return (
    <div className="flex items-center gap-4">
      <Image
        src={flowcoreLogo}
        alt=""
        width={logoSize}
        height={logoSize}
        priority
        className="h-auto w-12 lg:w-14 object-contain"
      />
      <div className="flex flex-col leading-none">
        <span className="text-xl lg:text-2xl font-black tracking-tighter text-deep-blue uppercase">
          Flowcore
        </span>
        <span className="text-[10px] lg:text-[11px] text-center font-medium tracking-[0.3em] text-deep-blue uppercase mt-0.5">
          Solutions
        </span>
      </div>
    </div>
  );
}

// ── Mobile Drawer ─────────────────────────────────────────────────────────

const PRECISION_EASE = [0.25, 0, 0, 1] as const;

function MobileDrawer({ isOpen, onClose, pathname }: { isOpen: boolean; onClose: () => void; pathname: string }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-deep-blue/20 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            key="drawer"
            className="fixed inset-y-4 right-4 z-50 flex h-[calc(100vh-32px)] w-[85%] max-w-sm flex-col rounded-3xl bg-white shadow-2xl overflow-hidden"
            initial={{ x: "110%", rotate: 2 }}
            animate={{ x: 0, rotate: 0 }}
            exit={{ x: "110%", rotate: 2 }}
            transition={{ duration: 0.4, ease: PRECISION_EASE }}
          >
            <div className="flex items-center justify-between p-8 border-b border-border/50">
              <BrandIdentity size="sm" />
              <button onClick={onClose} className="p-2 bg-section-bg rounded-xl text-text-light">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            </div>
            <nav className="flex-1 px-6 py-10">
              <ul className="space-y-4">
                {NAV_LINKS.map((link, i) => {
                  const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                  return (
                    <motion.li key={link.href} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                      <Link href={link.href} onClick={onClose} className={`flex items-center gap-4 p-4 rounded-2xl text-lg font-bold transition-all ${isActive ? "bg-primary-blue/5 text-primary-blue" : "text-text-light"}`}>
                        <NavDot indicator={link.indicator} isActive={isActive} />
                        {link.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>
            <div className="p-8 bg-section-bg/50">
              <Link href="/contact" onClick={onClose}>
                <GreenCTAButton fullWidth size="lg">Get a Quote</GreenCTAButton>
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Main Navbar ───────────────────────────────────────────────────────────

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed left-0 right-0 top-6 z-50 px-6 pointer-events-none">
        <motion.nav
          layout
          className={[
            "mx-auto max-w-7xl rounded-[2.5rem] pointer-events-auto transition-all duration-500",
            scrolled ? "bg-white/80 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(15,61,145,0.15)] py-3" : "bg-white border border-border shadow-xl py-5",
          ].join(" ")}
        >
          <div className="flex items-center justify-between gap-8 px-10">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <BrandIdentity />
            </Link>

            <ul className="hidden md:flex items-center gap-2 bg-section-bg/50 p-1.5 rounded-full border border-border/40">
              {NAV_LINKS.map((link) => {
                const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link href={link.href} className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${isActive ? "bg-white text-deep-blue shadow-sm" : "text-text-light hover:text-deep-blue"}`}>
                      <NavDot indicator={link.indicator} isActive={isActive} />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-4">
              <Link href="/contact" className="hidden lg:block">
                <button className="bg-deep-blue text-white rounded-full px-8 py-3.5 text-sm font-black uppercase tracking-widest hover:bg-primary-blue hover:shadow-lg transition-all active:scale-95">
                  Get a Quote
                </button>
              </Link>
              <button onClick={() => setDrawerOpen(true)} className="md:hidden p-4 bg-section-bg rounded-2xl text-deep-blue hover:bg-border/40 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
              </button>
            </div>
          </div>
        </motion.nav>
      </div>

      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} pathname={pathname} />
    </>
  );
}