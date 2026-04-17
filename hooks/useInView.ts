"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Lightweight useInView hook using IntersectionObserver.
 * Replaces framer-motion's useInView to reduce bundle size.
 */
export function useInView(
  ref: React.RefObject<Element | null>,
  options: IntersectionObserverInit & { once?: boolean } = {}
) {
  const [isInView, setIsInView] = useState(false);
  const { once = true, ...observerOptions } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (once) observer.unobserve(el);
      } else if (!once) {
        setIsInView(false);
      }
    }, observerOptions);

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, once, observerOptions.root, observerOptions.rootMargin, observerOptions.threshold]);

  return isInView;
}
