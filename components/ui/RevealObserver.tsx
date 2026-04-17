"use client";

import { useEffect } from "react";

const VARIANT_MAP: Record<string, string> = {
  fadeSlideLeft: "animate-reveal-left",
  riseUp: "animate-reveal-up",
  fadeSlideRight: "animate-reveal-right",
  precisionScale: "animate-reveal-scale",
};

export default function RevealObserver() {
  useEffect(() => {
    const observerOptions = {
      root: null,
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const variant = el.getAttribute("data-reveal-variant") || "riseUp";
          const delay = el.getAttribute("data-reveal-delay") || "0";
          const once = el.getAttribute("data-reveal-once") !== "false";
          
          const animationClass = VARIANT_MAP[variant] || "animate-reveal-up";
          
          el.style.animationDelay = `${delay}s`;
          el.classList.remove("reveal-initial");
          el.classList.add(animationClass);
          
          if (once) {
            observer.unobserve(el);
          }
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll("[data-reveal]");
    elements.forEach((el) => observer.observe(el));

    // Handle dynamically added elements if any (optional, but good for SPA feel)
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement && node.hasAttribute("data-reveal")) {
            observer.observe(node);
          } else if (node instanceof HTMLElement) {
            node.querySelectorAll("[data-reveal]").forEach(child => observer.observe(child));
          }
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
