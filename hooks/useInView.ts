"use client";

import { useEffect, useRef, useState } from "react";

export function useInView(
  ref: React.RefObject<Element | null>,
  options: IntersectionObserverInit & { once?: boolean } = {}
) {
  const [isInView, setIsInView] = useState(false);
  
  // Destructure for stable dependencies
  const once = options.once ?? true;
  const rootMargin = options.rootMargin ?? "0px";
  const threshold = options.threshold ?? 0;
  const root = options.root ?? null;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (once && isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsInView(false);
        }
      },
      { rootMargin, threshold, root }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, once, rootMargin, JSON.stringify(threshold), root]);

  return isInView;
}