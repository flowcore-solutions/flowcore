"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const REQUIREMENTS = [
  "New Installation",
  "Repair & Overhaul",
  "Pump Replacement",
  "Efficiency Audit",
  "Maintenance",
  "Custom Fabrication"
];

export default function TechnicalServices() {
  const [selectedReqs, setSelectedReqs] = useState<string[]>([]);

  const toggleReq = (req: string) => {
    setSelectedReqs((prev) =>
      prev.includes(req) ? prev.filter((r) => r !== req) : [...prev, req]
    );
  };

  return (
    <section className="relative w-full bg-white py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-24"
        >
          {/* LEFT PANE: Form */}
          <motion.div variants={fadeUp} className="flex flex-col justify-center">
            <div className="mb-8">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-blue mb-3 block">
                Engineering Support
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-4">
                Request a System Audit
              </h2>
              <p className="text-slate-600 text-lg max-w-lg leading-relaxed">
                Connect with our technical team for custom fluid dynamics computations, lifecycle cost optimization, and precise system sizing.
              </p>
            </div>

            <form 
              className="space-y-6" 
              onSubmit={(e) => { e.preventDefault(); alert("Form submitted!"); }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="auth-name" className="text-xs font-bold uppercase tracking-wider text-slate-500">Full Name</label>
                  <input
                    type="text"
                    id="auth-name"
                    required
                    className="w-full border-b border-slate-300 bg-transparent px-0 py-2 text-slate-900 placeholder:text-slate-400 focus:border-primary-blue focus:outline-none focus:ring-0 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="auth-company" className="text-xs font-bold uppercase tracking-wider text-slate-500">Company</label>
                  <input
                    type="text"
                    id="auth-company"
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
                  required
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
                  className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-lg bg-[#6CC24A] px-8 py-4 text-sm font-bold text-white transition-all hover:bg-[#5db33d] hover:-translate-y-px hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#6CC24A] focus:ring-offset-2 active:scale-[0.98]"
                >
                  <span className="relative z-10">Request Consultation</span>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </form>
          </motion.div>

          {/* RIGHT PANE: Trust Panel */}
          <motion.div variants={fadeUp} className="relative w-full h-full">
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
                
                <ul className="space-y-6">
                  {[
                
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
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-4">
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
                  ))}
                </ul>
              </div>
              
              <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
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
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
