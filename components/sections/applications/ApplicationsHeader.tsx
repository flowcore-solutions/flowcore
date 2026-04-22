import Link from "next/link";
import PrecisionReveal from "@/components/ui/PrecisionReveal";

const PAGE_HEADER = {
  sub: (
    <>
      Hover the diagram nodes to discover the exact{" "}
      <Link href="/products" className="text-primary-blue hover:underline">
        Berlington pump series
      </Link>{" "}
      engineered for each stage, from raw water intake to high-rise pressure
      supply. Need help sizing?{" "}
      <Link href="/contact#inquiry-form" className="text-primary-green hover:underline">
        Contact our engineering team
      </Link>
      .
    </>
  ),
} as const;

export default function ApplicationsHeader() {
  return (
    <header className="hero-underlap relative bg-section-bg overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #0F172A 0, #0F172A 1px, transparent 1px, transparent 20px)",
          opacity: 0.025,
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <PrecisionReveal variant="fadeSlideLeft">
          <nav className="mb-8 flex items-center gap-2" aria-label="Breadcrumb">
            <Link
              href="/"
              className="text-[10px] font-black uppercase tracking-[0.2em] text-text-light transition-colors hover:text-primary-blue"
            >
              Home
            </Link>
            <span className="text-[10px] text-border">/</span>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-green" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-deep-blue">
                Applications
              </span>
            </div>
          </nav>
        </PrecisionReveal>

        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <PrecisionReveal variant="fadeSlideLeft" delay={0.14}>
              <h1
                className="font-black leading-[1.05] tracking-tight text-deep-blue"
                style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
              >
                Industrial Pump <br />
                <span className="text-primary-green">Applications</span>
              </h1>
            </PrecisionReveal>

            <PrecisionReveal variant="fadeSlideLeft" delay={0.21}>
              <p className="mt-8 max-w-xl text-base font-medium leading-relaxed text-text-light sm:text-lg">
                {PAGE_HEADER.sub}
              </p>
            </PrecisionReveal>
          </div>

          <PrecisionReveal variant="fadeSlideRight" delay={0.28}>
            <div className="relative text-selection-green group lg:mb-2">
              <div className="absolute -inset-2 rounded-2xl bg-primary-green/5 blur-xl transition-all duration-500 group-hover:bg-primary-green/10" />
              <div className="relative flex items-center gap-4 rounded-xl border border-border/60 bg-white p-5 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border/40 bg-section-bg">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="animate-float-cursor"
                  >
                    <path d="M4 2l8 6-4 1-2 4-2-11z" fill="#6cc24a" />
                  </svg>
                </div>

                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary-green">
                    Interactive Guide
                  </span>
                  <p className="max-w-[180px] text-xs font-bold leading-tight text-deep-blue">
                    Hover over diagram nodes to reveal pump specifications
                  </p>
                </div>
              </div>
            </div>
          </PrecisionReveal>
        </div>
      </div>
    </header>
  );
}
