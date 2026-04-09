"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PUMP_CATALOG, getPumpById, PUMP_CATEGORIES } from "@/lib/pump-data";
import { PUMP_IMAGES } from "@/components/ui/PumpCard"; 

// Custom Multi-select for pumps
function MultiSelect({ 
  selectedIds, 
  onChange 
}: { 
  selectedIds: string[], 
  onChange: (ids: string[]) => void 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const togglePump = (id: string) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter(v => v !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  const removePump = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onChange(selectedIds.filter(v => v !== id));
  }

  return (
    <div className="relative" ref={containerRef}>
      <div 
        className="min-h-[46px] w-full border border-slate-300 rounded-lg bg-white px-3 py-2 cursor-pointer hover:border-primary-blue focus-within:ring-2 focus-within:ring-primary-blue focus-within:border-primary-blue transition-colors flex flex-wrap gap-2 items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedIds.length === 0 && (
          <span className="text-slate-400 text-sm">Select pump models...</span>
        )}
        {selectedIds.map(id => {
          const pump = getPumpById(id);
          if (!pump) return null;
          return (
            <span key={id} className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 text-xs font-semibold px-2 py-1 rounded border border-slate-200">
              {pump.seriesCode}
              <button 
                type="button"
                onClick={(e) => removePump(e, id)}
                className="hover:text-red-500 transition-colors focus:outline-none flex-shrink-0"
                aria-label={`Remove ${pump.seriesCode}`}
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </span>
          );
        })}
        
        <div className="ml-auto pointer-events-none text-slate-400">
           <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
             <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
           </svg>
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-lg shadow-xl z-50 max-h-[280px] overflow-y-auto"
          >
            {PUMP_CATEGORIES.map(category => {
              const categoryPumps = PUMP_CATALOG.filter(p => p.category === category);
              if (categoryPumps.length === 0) return null;
              
              return (
                <div key={category}>
                  <div className="px-3 py-1.5 bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider sticky top-0 border-b border-b-slate-100 z-10">
                    {category}
                  </div>
                  {categoryPumps.map(pump => {
                    const isSelected = selectedIds.includes(pump.id);
                    return (
                      <div 
                        key={pump.id}
                        className={`px-3 py-2.5 flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition-colors ${isSelected ? 'bg-blue-50/50' : ''}`}
                        onClick={() => togglePump(pump.id)}
                      >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'bg-primary-blue border-primary-blue' : 'border-slate-300 bg-white'}`}>
                          {isSelected && (
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                              <path d="M2.5 6L5.5 9L10.5 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-semibold text-slate-800">{pump.seriesCode}</span>
                          <span className="text-xs text-slate-500 truncate w-full">{pump.fullName}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function QuoteModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const quoteId = searchParams.get('quote');
  const isOpen = !!quoteId;
  const primaryPump = quoteId ? getPumpById(quoteId) : undefined;
  
  // Local form states
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  
  // Sync URL parameter to state when opened
  useEffect(() => {
    if (quoteId && !selectedIds.includes(quoteId) && getPumpById(quoteId)) {
      setSelectedIds(prev => Array.from(new Set([...prev, quoteId])));
    }
  }, [quoteId, selectedIds]); // Include 'selectedIds' to satisfy deps while minimizing extra runs
  
  // Reset form on close
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => { setSuccess(false); }, 300); // Wait for exit animation
    }
  }, [isOpen]);

  const closeModal = () => {
    // Preserve other search params if any
    const params = new URLSearchParams(searchParams.toString());
    params.delete('quote');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]); // Only react to isOpen changes if needed, actually closeModal handles the current router state

  // Prevent background scroll when modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy submit for design purpose
    setSuccess(true);
    setTimeout(() => {
      closeModal();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-title">
           {/* Backdrop */}
           <motion.div 
             initial={{ opacity: 0 }} 
             animate={{ opacity: 1 }} 
             exit={{ opacity: 0 }} 
             transition={{ duration: 0.2 }}
             className="absolute inset-0 bg-[#0F172A]/70 backdrop-blur-sm"
             onClick={closeModal}
           />
           
           {/* Modal Container */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.95, y: 15 }} 
             animate={{ opacity: 1, scale: 1, y: 0 }} 
             exit={{ opacity: 0, scale: 0.95, y: 15 }} 
             transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
             className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10"
             style={{ maxHeight: "calc(100vh - 40px)" }}
           >
             {/* Close button */}
             <button 
               onClick={closeModal}
               className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center bg-white/60 hover:bg-white backdrop-blur rounded-full text-slate-500 hover:text-slate-900 transition-colors shadow-sm"
               aria-label="Close modal"
             >
               <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                 <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
               </svg>
             </button>

             {/* LEFT PANE - Form */}
             <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto flex flex-col justify-center bg-white order-2 md:order-1 relative">
               <div className="max-w-md w-full mx-auto md:mx-0">
                 <div className="mb-8">
                   <h2 id="modal-title" className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Request a Quote</h2>
                   <p className="text-slate-500 text-sm leading-relaxed">
                     Our engineering team will review your requirements and respond shortly with pricing, availability, and technical documentation.
                   </p>
                 </div>

                 {success ? (
                   <motion.div 
                     initial={{ opacity: 0, y: 10 }} 
                     animate={{ opacity: 1, y: 0 }} 
                     className="bg-[#f0fcf3] border border-[#d3f4dd] rounded-xl p-8 text-center"
                   >
                     <div className="w-16 h-16 bg-[#d3f4dd] text-[#2fa84f] rounded-full flex items-center justify-center mx-auto mb-5">
                       <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                         <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                       </svg>
                     </div>
                     <h3 className="text-xl font-bold text-slate-900 mb-2">Request Received</h3>
                     <p className="text-slate-600 text-sm">We'll be in touch with you shortly.</p>
                   </motion.div>
                 ) : (
                   <form onSubmit={handleSubmit} className="space-y-6">
                     <div>
                       <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2 tracking-wide">NAME / COMPANY NAME</label>
                       <input 
                         type="text" 
                         id="name" 
                         required
                         className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E5BB8] focus:border-[#1E5BB8] transition-colors"
                         placeholder="e.g. John Doe / Apex Industries"
                       />
                     </div>
                     
                     <div>
                       <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2 tracking-wide">EMAIL ADDRESS</label>
                       <input 
                         type="email" 
                         id="email" 
                         required
                         className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E5BB8] focus:border-[#1E5BB8] transition-colors"
                         placeholder="john@example.com"
                       />
                     </div>

                     <div>
                       <label className="block text-sm font-semibold text-slate-700 mb-2 tracking-wide">PUMP MODELS OF INTEREST</label>
                       <MultiSelect selectedIds={selectedIds} onChange={setSelectedIds} />
                     </div>

                     <div>
                       <label htmlFor="notes" className="block text-sm font-semibold text-slate-700 mb-2 tracking-wide">OPERATING CONDITIONS <span className="text-slate-400 font-medium">(OPTIONAL)</span></label>
                       <textarea 
                         id="notes" 
                         rows={2}
                         className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E5BB8] focus:border-[#1E5BB8] transition-colors resize-none"
                         placeholder="Flow rate required, head, fluid type, etc."
                       />
                     </div>

                     <button 
                       type="submit"
                       className="w-full mt-4 bg-[#6CC24A] hover:brightness-110 text-white font-bold tracking-wide py-3.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md hover:-translate-y-px active:scale-[0.98]"
                     >
                       Submit Request
                       <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                         <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                       </svg>
                     </button>
                     <p className="text-center text-[11px] text-slate-400 mt-4 font-semibold uppercase tracking-wider">No commitment required. 100% confidential.</p>
                   </form>
                 )}
               </div>
             </div>

             {/* RIGHT PANE - Showcase */}
             {primaryPump ? (
               <div className="w-full md:w-2/5 bg-[#F8FAFC] border-b md:border-b-0 md:border-l border-slate-200 relative order-1 md:order-2 flex flex-col justify-center min-h-[220px] md:min-h-0 shrink-0">
                 {/* Engineered Grid Background */}
                 <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.2]"
                    style={{
                      backgroundImage: `
                        linear-gradient(#0F3D91 1px, transparent 1px),
                        linear-gradient(90deg, #0F3D91 1px, transparent 1px)
                      `,
                      backgroundSize: "20px 20px",
                    }}
                  />
                 <div className="relative z-10 px-8 py-10 flex flex-col items-center text-center h-full justify-center">
                    <div className="mb-4">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#1E5BB8] bg-[#f0f4f9] px-3 py-1.5 rounded-full border border-[#d6e2f5]">
                        {primaryPump.category}
                      </span>
                    </div>
                    
                    <div className="relative w-44 h-44 md:w-64 md:h-64 mb-6">
                      {PUMP_IMAGES[primaryPump.id] ? (
                        <Image 
                          src={PUMP_IMAGES[primaryPump.id]} 
                          alt={primaryPump.fullName}
                          fill
                          className="object-contain drop-shadow-2xl"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-300 text-4xl font-black">
                          {primaryPump.seriesCode}
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
                       {primaryPump.fullName}
                    </h3>
                    <div className="flex gap-4 justify-center mt-2 border-t border-slate-200/60 pt-5 w-full max-w-[260px]">
                      <div className="text-center flex-1">
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Flow Rate</div>
                        <div className="text-sm text-slate-800 font-semibold tabular-nums">{primaryPump.flowRate}</div>
                      </div>
                      <div className="w-px bg-slate-200"></div>
                      <div className="text-center flex-1">
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Max Head</div>
                        <div className="text-sm text-slate-800 font-semibold tabular-nums">{primaryPump.maxHead}</div>
                      </div>
                    </div>
                 </div>
               </div>
             ) : (
               <div className="w-full md:w-2/5 bg-[#F8FAFC] border-b md:border-b-0 md:border-l border-slate-200 relative order-1 md:order-2 flex flex-col justify-center items-center p-8 min-h-[200px] shrink-0">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.2]"
                    style={{
                      backgroundImage: `
                        linear-gradient(#0F3D91 1px, transparent 1px),
                        linear-gradient(90deg, #0F3D91 1px, transparent 1px)
                      `,
                      backgroundSize: "20px 20px",
                    }}
                  />
                  <div className="relative z-10 w-24 h-24 mb-6 opacity-20 text-[#0F3D91]">
                     <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                       <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                       <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 relative z-10 mb-2">Build Your Solution</h3>
                  <p className="text-sm text-slate-500 text-center relative z-10 max-w-xs">Select pump models on the left to include them in your quote request.</p>
               </div>
             )}
           </motion.div>
         </div>
      )}
    </AnimatePresence>
  );
}
