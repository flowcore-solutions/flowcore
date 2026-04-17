"use client";

import { useEffect } from "react";

export default function NavbarScrollHandler() {
  useEffect(() => {
    const nav = document.getElementById("main-navbar");
    if (!nav) return;

    const handleScroll = () => {
      if (window.scrollY > 40) {
        nav.classList.add("nav-scrolled");
      } else {
        nav.classList.remove("nav-scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
