"use client";

import { useState, type FormEvent } from "react";
import PrecisionReveal from "@/components/ui/PrecisionReveal";

type AuditFormState = {
  name: string;
  company: string;
  email: string;
};

const EMPTY_AUDIT: AuditFormState = { name: "", company: "", email: "" };

type SubmitStatus = "idle" | "loading" | "success" | "error";

const REQUIREMENTS = [
  "New Installation",
  "Repair & Overhaul",
  "Pump Replacement",
  "Efficiency Audit",
  "Maintenance",
  "Custom Fabrication"
];

const TRUST_ITEMS = [
  {
    title: "Repair & Overhaul",
    desc: "Comprehensive pump repair and maintenance services to maximize operational lifespan."
  },
  {
    title: "Energy Optimization",
    desc: "Reduce operational lifecycle costs through highly efficient pump curve matching."
  },
  {
    title: "Complete System Integration",
    desc: "Deep compatibility with industrial process controls, VFDs, and sensors."
  }
];

export default function TechnicalServices() {
  const [form, setForm] = useState<AuditFormState>(EMPTY_AUDIT);
  const [selectedReqs, setSelectedReqs] = useState<string[]>([]);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const toggleReq = (req: string) => {
    setSelectedReqs((prev) =>
      prev.includes(req) ? prev.filter((r) => r !== req) : [...prev, req]
    );
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "audit",
          name: form.name,
          company: form.company,
          email: form.email,
          requirements: selectedReqs,
        }),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? "Submission failed. Please try again.");
      }

      setStatus("success");
      setForm(EMPTY_AUDIT);
      setSelectedReqs([]);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  return (
    <section className="relative w-full py-12 lg:py-20 overflow-hidden" style={{ backgroundColor: "#f8fafc" }}>
      {/* Subtle background industrial lines — fixed to viewport for perfect continuity */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{ 
          backgroundImage: `repeating-linear-gradient(45deg, #0F172A 0, #0F172A 1px, transparent 1px, transparent 20px)`,
          backgroundAttachment: "fixed" 
        }} 
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-24">
          
          {/* LEFT PANE: Form */}
          <div className="flex flex-col justify-center">
            <div className="mb-8">
              <PrecisionReveal variant="fadeSlideLeft">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-blue mb-3 block">
                  Engineering Support
                </span>
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-deep-blue mb-4">
                  Request a System Audit
                </h2>
              </PrecisionReveal>
              <PrecisionReveal variant="fadeSlideLeft" delay={0.1}>
                <p className="text-slate-600 text-lg max-w-lg leading-relaxed">
                  Connect with our technical team for custom fluid dynamics computations, lifecycle cost optimization, and precise system sizing.
                </p>
              </PrecisionReveal>
            </div>

            <PrecisionReveal variant="riseUp" delay={0.2}>
              <form
                className="space-y-6"
                onSubmit={handleSubmit}
                aria-label="System audit request form"
              >
                {/* Success banner */}
                {status === "success" && (
                  <div
                    role="alert"
                    className="flex items-center gap-3 rounded-lg border border-[#d3f4dd] bg-[#f0fcf3] px-4 py-3"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                      <circle cx="9" cy="9" r="8.25" stroke="#2fa84f" strokeWidth="1.5"/>
                      <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="#2fa84f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-sm font-semibold text-dark-green">
                      Request sent! Our team will respond within 4 hours.
                    </p>
                  </div>
                )}
                {/* Error banner */}
                {status === "error" && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0" aria-hidden="true">
                      <circle cx="8" cy="8" r="7" stroke="#ef4444" strokeWidth="1.5"/>
                      <path d="M8 4.5v4M8 10.5v1" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <p className="text-sm font-medium text-red-700">{errorMsg}</p>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="auth-name" className="text-xs font-bold uppercase tracking-wider text-slate-500">Full Name</label>
                    <input
                      type="text"
                      id="auth-name"
                      name="name"
                      required
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      className="w-full border-b border-slate-300 bg-transparent px-0 py-2 text-slate-900 placeholder:text-slate-400 focus:border-primary-blue focus:outline-none focus:ring-0 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="auth-company" className="text-xs font-bold uppercase tracking-wider text-slate-500">Company</label>
                    <input
                      type="text"
                      id="auth-company"
                      name="company"
                      value={form.company}
                      onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
                      className="w-full border-b border-slate-300 bg-transparent px-0 py-2 text-slate-900 placeholder:text-slate-400 focus:border-primary-blue focus:outline-none focus:ring-0 transition-colors"
                      placeholder="FlowCore Ind."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="auth-email" className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</label>
                  <input
                    type="email"
                    id="auth-email"
                    name="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    className="w-full border-b border-slate-300 bg-transparent px-0 py-2 text-slate-900 placeholder:text-slate-400 focus:border-primary-blue focus:outline-none focus:ring-0 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-3 pt-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Primary Requirements</label>
                  <div className="flex flex-wrap gap-2">
                    {REQUIREMENTS.map((req) => {
                      const isSelected = selectedReqs.includes(req);
                      return (
                        <button
                          key={req}
                          type="button"
                          onClick={() => toggleReq(req)}
                          className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 border ${
                            isSelected
                              ? "bg-primary-blue text-white border-primary-blue shadow-sm"
                              : "bg-white text-slate-600 border-slate-200 hover:border-primary-blue/30 hover:bg-slate-50"
                          }`}
                        >
                          {req}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    id="audit-submit"
                    disabled={status === "loading"}
                    className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-lg bg-[#6CC24A] px-8 py-4 text-sm font-bold text-white transition-all hover:bg-[#5db33d] hover:-translate-y-px hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#6CC24A] focus:ring-offset-2 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {status === "loading" ? (
                      <>
                        <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                          <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                        <span className="relative z-10">Sending…</span>
                      </>
                    ) : (
                      <>
                        <span className="relative z-10">Request Consultation</span>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </PrecisionReveal>
          </div>

          {/* RIGHT PANE: Trust Panel */}
          <div className="relative w-full h-full">
            {/* Background decorative square */}
            <div className="absolute -inset-4 bg-slate-50 rounded-3xl -z-10 hidden sm:block"></div>
            <div className="h-full w-full rounded-2xl bg-[#0F3D91] p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl flex flex-col justify-between">
              {/* Engineering Grid Background */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
                  backgroundSize: "24px 24px"
                }}
              />
              
              <div className="relative z-10">
                <PrecisionReveal variant="fadeSlideRight">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-8 backdrop-blur-sm border border-white/20">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#4DA3FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M19.4 15A1.65 1.65 0 0 0 21 16.65V18.58a1.42 1.42 0 0 1-1.42 1.42H4.42A1.42 1.42 0 0 1 3 18.58V16.65A1.65 1.65 0 0 0 4.6 15H19.4Z" stroke="#4DA3FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M19.4 9A1.65 1.65 0 0 1 21 7.35V5.42A1.42 1.42 0 0 0 19.58 4H4.42A1.42 1.42 0 0 0 3 5.42V7.35A1.65 1.65 0 0 1 4.6 9H19.4Z" stroke="#4DA3FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-6 tracking-tight text-[#4DA3FF]">
                    Why partner with FlowCore?
                  </h3>
                </PrecisionReveal>
                
                <ul className="space-y-6">
                  {TRUST_ITEMS.map((item, idx) => (
                    <PrecisionReveal key={idx} variant="fadeSlideRight" delay={0.1 + idx * 0.08}>
                      <li className="flex gap-4">
                        <div className="mt-1 shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-white/10 border border-white/20">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M10 3L4.5 8.5L2 6" stroke="#4DA3FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                          <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                      </li>
                    </PrecisionReveal>
                  ))}
                </ul>
              </div>
              
              <PrecisionReveal variant="riseUp" delay={0.4} className="relative z-10 mt-12 pt-8 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-[1.5px] border-white/20 shadow-sm">
                    <div className="w-full h-full flex items-center justify-center bg-[#1E5BB8] text-white font-bold text-sm">
                      AE
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white tracking-wide">Application Engineering Desk</h5>
                    <p className="text-xs text-[#4DA3FF] mt-0.5 opacity-90">Response within 4 hours</p>
                  </div>
                </div>
              </PrecisionReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
