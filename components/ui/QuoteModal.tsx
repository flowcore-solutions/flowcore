"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import { PUMP_CATALOG, getPumpById, PUMP_CATEGORIES } from "@/lib/pump-data";

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
                className="hover:text-red-500 transition-colors focus:outline-none shrink-0"
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
      
      <div 
        className={`absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-lg shadow-xl z-50 max-h-[280px] overflow-y-auto transition-all duration-200 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
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
      </div>
    </div>
  )
}

export default function QuoteModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const quoteId = searchParams.get('quote');
  const isOpen = !!quoteId;
  
  // Local form states
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  
  // Track last quoteId for manual sync during render (standard React pattern for prop-to-state sync)
  const [prevQuoteId, setPrevQuoteId] = useState<string | null>(null);

  if (quoteId !== prevQuoteId) {
    setPrevQuoteId(quoteId);
    if (quoteId && !selectedIds.includes(quoteId) && getPumpById(quoteId)) {
      setSelectedIds(prev => Array.from(new Set([...prev, quoteId])));
    }
  }
  
  // Reset form on close
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => { setSuccess(false); }, 300); // Wait for exit animation
    }
  }, [isOpen]);

  const closeModal = useCallback(() => {
    // Preserve other search params if any
    const params = new URLSearchParams(searchParams.toString());
    params.delete('quote');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);
  
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeModal]); // Missing closeModal dependency added

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
    <div 
      className={`fixed inset-0 z-50 flex items-end justify-center p-2 sm:items-center sm:p-6 transition-all duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`} 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/45 backdrop-blur-[3px] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeModal}
      />
      
      {/* Modal Container */}
      <div 
        className={`relative z-10 w-full max-w-2xl overflow-hidden rounded-[28px] bg-white shadow-[0_28px_90px_rgba(15,23,42,0.24)] md:rounded-[32px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
          isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
        }`}
        style={{ maxHeight: "calc(100dvh - 16px)" }}
      >
        {/* Close button */}
        <button 
          onClick={closeModal}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white/90 text-slate-500 shadow-sm transition-colors hover:bg-white hover:text-slate-900"
          aria-label="Close modal"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="flex w-full flex-col justify-center overflow-y-auto bg-white p-5 sm:p-7 md:p-10">
          <div className="mx-auto w-full max-w-none">
            <div className="mb-6 sm:mb-8">
              <h2 id="modal-title" className="mb-2 pr-12 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Request a Quote</h2>
              <p className="text-sm leading-relaxed text-slate-500">
                Our engineering team will review your requirements and respond shortly with pricing, availability, and technical documentation.
              </p>
            </div>

            {success ? (
              <div 
                className="rounded-2xl border border-[#d3f4dd] bg-[#f0fcf3] p-6 text-center sm:p-8 animate-reveal-up"
              >
                <div className="w-16 h-16 bg-[#d3f4dd] text-dark-green rounded-full flex items-center justify-center mx-auto mb-5">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Request Received</h3>
                <p className="text-slate-600 text-sm">We&apos;ll be in touch with you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
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
      </div>
    </div>
  );
}
