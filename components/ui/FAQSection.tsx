"use client";

import { useState } from "react";
import PrecisionReveal from "@/components/ui/PrecisionReveal";
import SectionTag from "@/components/ui/SectionTag";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
  tag?: string;
}

function FAQAccordion({ faq, isOpen, onToggle }: { faq: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div 
      className={`group rounded-xl overflow-hidden border transition-all duration-300 mb-4 ${
        isOpen 
          ? "bg-white shadow-[0_12px_24px_-10px_rgba(15,61,145,0.08)] border-deep-blue/20" 
          : "bg-transparent border-border hover:bg-white/50 hover:border-deep-blue/15"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left px-6 py-5 md:px-8 md:py-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-inset"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-4 md:gap-5 pr-4">
          <div className="mt-1.5 md:mt-2 shrink-0">
            <div className={`w-2 h-2 transition-all duration-300 ${
              isOpen ? "bg-primary-green scale-110 shadow-[0_0_8px_rgba(108,194,74,0.6)]" : "bg-deep-blue/20 group-hover:bg-deep-blue/40"
            }`} />
          </div>
          <h3 className={`text-sm md:text-base font-bold uppercase tracking-wide leading-snug transition-colors duration-300 ${
            isOpen ? "text-primary-blue" : "text-deep-blue group-hover:text-primary-blue"
          }`}>
            {faq.question}
          </h3>
        </div>
        <div className={`shrink-0 w-8 h-8 flex items-center justify-center transition-all duration-300 ${
          isOpen ? "text-primary-green rotate-45" : "text-text-light group-hover:text-deep-blue"
        }`}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2V14M2 8H14" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
          </svg>
        </div>
      </button>
      
      <div 
        className={`grid transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-6 md:pb-8 px-6 md:px-8 pl-[44px] md:pl-[52px]">
            <div className="w-8 h-px bg-border mb-4" />
            <p className="text-sm md:text-base text-text-light leading-relaxed font-medium max-w-3xl">
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection({ 
  faqs, 
  title = "Frequently Asked Questions", 
  tag = "Knowledge Base" 
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="relative py-12 lg:py-20 bg-section-bg overflow-hidden" aria-labelledby="faq-heading">
      {/* Subtle background industrial diagonal lines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{ 
          backgroundImage: `repeating-linear-gradient(45deg, #0F172A 0, #0F172A 1px, transparent 1px, transparent 20px)`,
          backgroundAttachment: "fixed"
        }} 
      />

      <div className="relative mx-auto max-w-4xl px-6 sm:px-8 z-10 w-full">
        <div className="mb-12 flex flex-col items-center text-center">
          <PrecisionReveal variant="riseUp">
            <SectionTag>{tag}</SectionTag>
            <h2 
              id="faq-heading" 
              className="mt-4 text-deep-blue font-black leading-tight uppercase tracking-tight"
              style={{ fontSize: "clamp(2rem, 3vw, 2.5rem)" }}
            >
              {title}
            </h2>
          </PrecisionReveal>
        </div>
        
        <div className="w-full">
          {faqs.map((faq, idx) => (
            <PrecisionReveal key={idx} variant="riseUp" delay={idx * 0.08}>
              <FAQAccordion 
                faq={faq} 
                isOpen={openIndex === idx} 
                onToggle={() => setOpenIndex(openIndex === idx ? null : idx)} 
              />
            </PrecisionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
