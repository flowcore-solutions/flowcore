"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type NavIndicator = "blue" | "green";

interface NavLink {
  href: string;
  label: string;
  indicator: NavIndicator;
}

export const NAV_LINKS: readonly NavLink[] = [
  { href: "/", label: "Home", indicator: "blue" },
  { href: "/about", label: "About", indicator: "green" },
  { href: "/applications", label: "Applications", indicator: "blue" },
  { href: "/products", label: "Products", indicator: "blue" },
  { href: "/contact#inquiry-form", label: "Contact", indicator: "green" },
] as const;

function NavDot({ indicator, isActive }: { indicator: NavIndicator; isActive: boolean }) {
  const color = indicator === "blue" ? "bg-primary-blue" : "bg-primary-green";
  const inactive = indicator === "blue" ? "bg-primary-blue/20" : "bg-primary-green/20";

  return (
    <span
      className={`inline-block rounded-full transition-all duration-300 ${
        isActive ? `h-2 w-2 ${color}` : `h-1.5 w-1.5 ${inactive}`
      }`}
    />
  );
}

export default function NavbarClient() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 40;
      setScrolled(isScrolled);
      // Update a global class or state if needed, but here we just update local state
      // for the animations of the inner parts.
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (drawerOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  return {
    pathname,
    scrolled,
    drawerOpen,
    setDrawerOpen,
    NavDot,
  };
}

// Internal components exported for Navbar.tsx
export function MobileToggleButton({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 active:scale-90 ${
        isOpen ? "bg-white shadow-[0_12px_24px_rgba(15,61,145,0.16)]" : "bg-section-bg"
      }`}
    >
      {isOpen ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M6 6L18 18M18 6L6 18" stroke="#0f3d91" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M4 6H20M4 12H14M4 18H9" stroke="#1e5bb8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}
