"use client";

import Image from "next/image";
import Link from "next/link";
import { type PumpModel } from "@/lib/pump-data";
import PrecisionReveal from "@/components/ui/PrecisionReveal";
import SectionTag from "@/components/ui/SectionTag";
import Breadcrumb from "@/components/ui/Breadcrumb";

const MONO_FONT = "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace";

export default function ProductClientWrapper({ pump }: { pump: PumpModel }) {
  if (!pump) return null;

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: pump.id.toUpperCase(), active: true },
  ];

  return (
    <>
      <main className="relative min-h-screen bg-section-bg overflow-hidden selection:bg-primary-green selection:text-primary-blue">
        {/* Engineering Underlay — Unified Diagonal Grid */}
        <div className="absolute inset-0 pointer-events-none z-0"
          style={{ 
            backgroundImage: `repeating-linear-gradient(45deg, #0F172A 0, #0F172A 1px, transparent 1px, transparent 20px)`,
            opacity: 0.025 
          }}
        />

        {/* ── Header / Breadcrumb Area ── */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-12">
          <Breadcrumb items={breadcrumbItems} className="mb-8" />
        </div>

        {/* ── Primary Hero Section ── */}
        <section className="relative z-10 mx-auto max-w-7xl px-6 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Image Showcase — Blueprint Aesthetic */}
            <div className="lg:col-span-5">
              <PrecisionReveal variant="precisionScale" delay={0.1}>
                <div className="relative aspect-square lg:aspect-4/5 rounded-4xl border border-border bg-section-bg overflow-hidden group">
                  {/* Grid / Schematic Overlay */}
                  <div className="absolute inset-0 pointer-events-none opacity-5">
                    <div className="w-full h-full border-r border-b border-primary-blue" style={{ backgroundSize: '40px 40px', backgroundImage: 'linear-gradient(to right, #1e5bb8 1px, transparent 1px), linear-gradient(to bottom, #1e5bb8 1px, transparent 1px)' }} />
                  </div>

                  {/* Identification Tag */}
                  <div className="absolute top-6 left-6 z-20">
                    <div className="bg-white/90 backdrop-blur-md border border-border px-4 py-2 rounded-lg shadow-sm">
                      <span className="block text-[8px] font-black text-primary-blue uppercase tracking-widest leading-none mb-1">Catalog_Ref</span>
                      <span className="block text-xs font-black text-deep-blue" style={{ fontFamily: MONO_FONT }}>{pump.seriesCode}</span>
                    </div>
                  </div>

                  {/* Component Visual */}
                  <div className="relative w-full h-full p-12 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
                    <Image
                      src={pump.imagePath}
                      alt={`${pump.fullName} Berlington industrial pump with flow rate ${pump.flowRate} and max head ${pump.maxHead}`}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-contain p-4 drop-shadow-[0_32px_64px_rgba(15,61,145,0.15)]"
                    />
                  </div>

                  {/* Corner Callout (Bottom Right) */}
                  <div className="absolute bottom-6 right-6 z-20">
                    <div className="w-12 h-12 rounded-full border border-primary-blue/20 flex items-center justify-center bg-white/50 backdrop-blur-sm">
                      <div className="w-2 h-2 rounded-full bg-primary-green animate-pulse" />
                    </div>
                  </div>
                </div>
              </PrecisionReveal>
            </div>

            {/* Content / Technical Specs */}
            <div className="lg:col-span-7 py-4">
              <PrecisionReveal variant="riseUp" delay={0.15}>
                <SectionTag accent="blue" className="mb-6">Industrial Component</SectionTag>
                <h1 className="text-5xl md:text-7xl font-black text-deep-blue leading-[0.95] tracking-tighter mb-8 max-w-2xl">
                  {pump.fullName.split('Series')[0]}
                  <span className="block text-primary-blue italic">Series.</span>
                </h1>
              </PrecisionReveal>

              <PrecisionReveal variant="riseUp" delay={0.25}>
                <p className="text-xl text-text-light font-medium leading-relaxed mb-12 max-w-xl">
                  Precision-engineered <strong className="text-deep-blue font-black underline decoration-primary-green decoration-4 underline-offset-4">{pump.id.toUpperCase()}</strong> unit. Optimized for mission-critical hydraulic performance in complex industrial infrastructure.
                </p>
              </PrecisionReveal>

              {/* High-Craft Performance Matrix */}
              <PrecisionReveal variant="riseUp" delay={0.35} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {[
                  { label: "Flow Capacity", value: pump.flowRate },
                  { label: "Dynamic Head", value: pump.maxHead },
                  { label: "Drive System", value: pump.powerRange },
                  { label: "Thermal Range", value: pump.temperature }
                ].map((spec, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute inset-0 bg-primary-blue/5 rounded-2xl transform transition-transform group-hover:scale-105" />
                    <div className="relative p-5 rounded-2xl border border-border bg-white shadow-sm transition-all group-hover:-translate-y-1 group-hover:shadow-card">
                      <span className="block text-[9px] font-black uppercase tracking-widest text-primary-blue mb-2">{spec.label}</span>
                      <span className="block text-sm font-black text-deep-blue" style={{ fontFamily: MONO_FONT }}>{spec.value}</span>
                    </div>
                  </div>
                ))}
              </PrecisionReveal>

              {/* Action Array */}
              <PrecisionReveal variant="riseUp" delay={0.45} className="flex flex-col sm:flex-row gap-4 max-w-xl">
                <Link href={`/contact?quote=${pump.id}#inquiry-form`} className="group flex-1">
                  <button className="relative w-full bg-deep-blue text-white px-8 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-primary-blue transition-all hover:shadow-xl hover:shadow-primary-blue/20 active:scale-95">
                    Technical Enquiry
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover:translate-x-1 transition-transform">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </Link>
                <Link href="/products" className="flex-1">
                  <button className="w-full px-8 py-5 rounded-2xl border-2 border-border font-black uppercase tracking-widest text-xs text-text-light hover:bg-white hover:text-deep-blue hover:border-primary-blue transition-all active:scale-95">
                    Back to Catalog
                  </button>
                </Link>
              </PrecisionReveal>
            </div>
          </div>
        </section>

        {/* ── Engineering Details Section ── */}
        <section className="relative z-10 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <SectionTag accent="green" className="mb-6">Build Integrity</SectionTag>
                <h2 className="text-4xl md:text-5xl font-black text-deep-blue leading-[1.1] tracking-tight mb-8">
                  Configured for <br />
                  <span className="text-primary-green uppercase italic">Total Reliability.</span>
                </h2>
                <div className="space-y-10">
                  {[
                    { title: "Material Spec", desc: `High-grade ${pump.material} components for zero-fail operation in varied environments.`, icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
                    { title: "Grid Integration", desc: `${pump.voltage} compliant driver units, compatible with standard industrial power boards.`, icon: "M13 10V3L4 14h7v7l9-11h-7z" },
                    { title: "Interface Architecture", desc: `Standard ${pump.connections} connections for rapid site assembly and registry compliance.`, icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" }
                  ].map((feat, i) => (
                    <div key={i} className="flex gap-6 group">
                      <div className="shrink-0 w-14 h-14 rounded-2xl bg-white border border-border flex items-center justify-center text-primary-blue shadow-sm group-hover:border-primary-green group-hover:text-primary-green transition-all transform group-hover:scale-110">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d={feat.icon} />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-deep-blue uppercase tracking-widest mb-2 group-hover:text-primary-blue transition-colors">{feat.title}</h4>
                        <p className="text-text-light text-base leading-relaxed max-md">{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Application Registry Terminal */}
              <div className="relative">
                <div className="absolute -inset-10 bg-primary-blue/5 blur-3xl opacity-50 rounded-full" />
                <div className="relative rounded-[2.5rem] border border-border bg-white p-10 md:p-14 shadow-2xl overflow-hidden">
                  {/* Decorative Industrial Line */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-green/5 rounded-bl-[100px]" />
                  
                  <div className="flex items-center gap-3 mb-10 pb-6 border-b border-border/50">
                    <div className="w-3 h-3 rounded-full bg-primary-blue" />
                    <span className="text-[10px] font-black text-text-light uppercase tracking-[0.4em]">Integrated_Applications</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {pump.applications.map((app, i) => (
                      <div key={app} className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-section-bg/30 hover:bg-white hover:border-primary-green hover:shadow-lg transition-all group/tag">
                        <span className="text-[10px] font-black text-primary-blue/30 group-hover/tag:text-primary-green" style={{ fontFamily: MONO_FONT }}>{String(i + 1).padStart(2, '0')}</span>
                        <span className="text-[11px] font-black text-deep-blue uppercase tracking-widest">{app}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 pt-8 border-t border-border flex items-center justify-between opacity-40">
                    <span className="text-[9px] font-bold text-text-light uppercase tracking-widest">Industry_Deployment</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-1 h-3 bg-primary-blue/40" />)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Conversion Footer ── */}
        <section className="relative z-10 py-20 px-6">
          <div className="mx-auto max-w-5xl">
            <div className="relative rounded-[3rem] bg-deep-blue p-12 md:p-20 overflow-hidden text-center">
              {/* Animated Technical Background */}
              <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: `repeating-linear-gradient(90deg, #fff 0, #fff 1px, transparent 1px, transparent 40px)` }}
              />
              <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: `repeating-linear-gradient(0deg, #fff 0, #fff 1px, transparent 1px, transparent 40px)` }}
              />

              <PrecisionReveal variant="riseUp" className="relative z-10 flex flex-col items-center">
                <SectionTag accent="green" className="mb-8">Contact Engineering</SectionTag>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-10 tracking-tighter leading-[1.05]">
                  Start Your <span className="text-primary-green italic">{pump.seriesCode}</span> <br className="hidden md:block" /> Integration Today.
                </h2>
                <div className="flex flex-col sm:flex-row gap-6 items-center">
                  <Link href="/contact#inquiry-form">
                    <button className="bg-primary-green text-deep-blue hover:bg-white transition-all px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary-green/20 scale-110 hover:scale-105 active:scale-95">
                      Get Technical Quote
                    </button>
                  </Link>
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">
                    Authorized Support &middot; Bangalore
                  </p>
                </div>
              </PrecisionReveal>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
