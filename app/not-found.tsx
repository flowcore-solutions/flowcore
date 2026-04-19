import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[75vh] w-full bg-white px-6 py-24 text-center overflow-hidden">
      
      {/* ── Background Grid & Gradients and others ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #0f172a 0, #0f172a 1px, transparent 1px, transparent 24px)`
        }}
      />
      <div 
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square rounded-full opacity-[0.03] blur-3xl bg-primary-blue z-0"
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
        
        {/* Warning Icon Box */}
        <div 
          className="w-14 h-14 rounded-2xl border border-border/80 flex items-center justify-center mb-6"
          style={{ backgroundColor: "#f8fafc", boxShadow: "0 4px 20px rgba(15, 61, 145, 0.05)" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e5bb8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>

        {/* Typeform / Tagline */}
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-blue animate-pulse" />
          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] text-primary-blue">
            System Alert • Error 404
          </span>
        </div>

        {/* 404 Hero Number */}
        <h1 
          className="text-[120px] sm:text-[160px] font-black text-deep-blue leading-none tracking-tighter select-none"
          style={{ textShadow: "0 10px 40px rgba(15, 61, 145, 0.08)" }}
        >
          404
        </h1>

        <h2 className="mt-2 text-2xl sm:text-3xl font-black text-text-dark tracking-tight leading-tight">
          Page Not Found
        </h2>

        <p className="mt-5 text-[15px] sm:text-base text-text-light font-medium leading-relaxed max-w-md">
          The industrial pipeline you are looking for has been moved, removed, or is temporarily offline. Let&apos;s redirect your flow back to stable infrastructure.
        </p>

        {/* ── Call to Actions ── */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/"
            className="flex w-full sm:w-auto items-center justify-center rounded-xl px-8 py-3.5 text-[14px] font-bold text-white bg-deep-blue transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue active:scale-[0.98]"
          >
            Return Home
          </Link>
          <Link
            href="/products"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-[14px] font-bold text-text-dark bg-white border border-border transition-all duration-200 hover:-translate-y-1 hover:border-primary-blue hover:text-primary-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue active:scale-[0.98]"
          >
            View Catalogue
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="ml-1">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

      </div>
    </div>
  );
}
