/**
 * PrecisionReveal — Zero-JS Server Component version.
 * 
 * Performance: Renders as a pure HTML tag. Interactivity is handled
 * by a single global observer in the layout.
 */

export type PrecisionVariant =
  | "fadeSlideLeft"
  | "riseUp"
  | "fadeSlideRight"
  | "precisionScale";

export interface PrecisionRevealProps {
  children: React.ReactNode;
  variant?: PrecisionVariant;
  delay?: number;
  className?: string;
  margin?: string;
  once?: boolean;
}

export default function PrecisionReveal({
  children,
  variant = "riseUp",
  delay = 0,
  className = "",
  margin = "-80px",
  once = true,
}: PrecisionRevealProps) {
  return (
    <div
      data-reveal
      data-reveal-variant={variant}
      data-reveal-delay={delay}
      data-reveal-margin={margin}
      data-reveal-once={once ? "true" : "false"}
      className={`${className} reveal-initial`}
    >
      {children}
    </div>
  );
}
