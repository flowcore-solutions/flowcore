"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "./nav-config";

export default function NavbarMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Defer to avoid synchronous setState ESLint warning (cascading renders)
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  return (
    <>
      <div className="md:hidden">
        <button
          type="button"
          onClick={toggle}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 active:scale-90 ${
            isOpen ? "bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)]" : "bg-section-bg"
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
      </div>

      {mounted && createPortal(
        <>
          {/* Backdrop (z-40) - stays under the z-50 Navbar */}
          <div
            className={`fixed inset-0 z-40 bg-deep-blue/20 transition-opacity duration-300 pointer-events-none md:hidden ${
              isOpen ? "opacity-100 pointer-events-auto" : "opacity-0"
            }`}
            onClick={close}
          />

          {/* Modal (z-[60]) - stays above the z-50 Navbar */}
          <div
            className={`fixed inset-x-6 top-[5.5rem] z-[60] md:hidden transition-all duration-300 transform ${
              isOpen ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
            }`}
          >
            <div className="rounded-[2rem] bg-white p-5 shadow-[0_20px_40px_rgba(15,23,42,0.15)]">
              <nav className="space-y-1">
                {NAV_LINKS.map((link) => {
                  const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={close}
                      className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-semibold transition-all duration-200 ${
                        isActive ? "bg-section-bg text-deep-blue" : "text-text-light hover:bg-section-bg/70 hover:text-deep-blue"
                      }`}
                    >
                      <span className={`h-2 w-2 rounded-full ${isActive ? (link.indicator === "blue" ? "bg-primary-blue" : "bg-primary-green") : "bg-gray-200"}`} />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </nav>
              <div className="mt-4 border-t border-border/70 pt-4">
                <Link href="/contact#inquiry-form" onClick={close} className="flex items-center justify-center rounded-full bg-deep-blue px-5 py-3 text-sm font-bold uppercase tracking-widest text-white transition-all active:scale-95">
                  Get a Quote
                </Link>
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
}
