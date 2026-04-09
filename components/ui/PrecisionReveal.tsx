"use client";

/**
 * PrecisionReveal — Viewport-triggered animation wrapper.
 *
 * Philosophy: Elements enter like machine parts locking into position.
 * Rigid, directional, purposeful. Easing: [0.25, 0, 0, 1] (precision cubic).
 *
 * Usage:
 *   <PrecisionReveal variant="riseUp" delay={0.14}>
 *     <SomeCard />
 *   </PrecisionReveal>
 */

import { motion, useInView, type Variant } from "framer-motion";
import { useRef } from "react";

// ── Easing ────────────────────────────────────────────────────────────────
// Machine-grade cubic bezier. No bounce, no elasticity.
const PRECISION_EASE = [0.25, 0, 0, 1] as const;

// ── Variant Definitions ───────────────────────────────────────────────────

type VariantMap = { hidden: Variant; visible: Variant };

const VARIANTS: Record<PrecisionVariant, VariantMap> = {
  /** Text blocks — enter from the left */
  fadeSlideLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: PRECISION_EASE },
    },
  },
  /** Cards, grid items — rise from below */
  riseUp: {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: PRECISION_EASE },
    },
  },
  /** Green CTA areas — enter from the right */
  fadeSlideRight: {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: PRECISION_EASE },
    },
  },
  /** Diagram overlays, tooltips — scale in from 96% */
  precisionScale: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: PRECISION_EASE },
    },
  },
};

// ── Types ─────────────────────────────────────────────────────────────────

export type PrecisionVariant =
  | "fadeSlideLeft"
  | "riseUp"
  | "fadeSlideRight"
  | "precisionScale";

export interface PrecisionRevealProps {
  children: React.ReactNode;
  /** Which motion variant to use. Default: "riseUp" */
  variant?: PrecisionVariant;
  /**
   * Stagger delay in seconds. Use multiples of 0.07s per the plan.
   * e.g. first item = 0, second = 0.07, third = 0.14
   */
  delay?: number;
  /** Additional Tailwind classes applied to the motion wrapper div */
  className?: string;
  /**
   * Viewport margin before element is considered "in view".
   * Negative value: trigger before fully visible. Default: "-80px".
   */
  margin?: string;
  /**
   * Whether the animation should only fire once (default: true).
   * Set to false for elements that should re-animate on re-entry.
   */
  once?: boolean;
}

// ── Component ─────────────────────────────────────────────────────────────

export default function PrecisionReveal({
  children,
  variant = "riseUp",
  delay = 0,
  className,
  margin = "-80px",
  once = true,
}: PrecisionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // useInView is viewport-based — not on mount.
  // Amount 0.1 = 10% visible before triggering.
  const isInView = useInView(ref, {
    once,
    margin: margin as `${number}px`,
    amount: 0.1,
  });

  const selected = VARIANTS[variant];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: selected.hidden,
        visible: {
          ...(selected.visible as object),
          transition: {
            ...((selected.visible as { transition?: object }).transition ?? {}),
            delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
