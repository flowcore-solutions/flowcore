
import Link from "next/link";
import SectionTag from "@/components/ui/SectionTag";
import PrecisionReveal from "@/components/ui/PrecisionReveal";

// Core Vertical Data - Limited to top 4 for a perfect 2x2 grid
const VERTICALS = [
  {
    id: "wtp",
    title: "Water Treatment",
    tag: "WTP / RO",
    desc: "High-pressure multistage pumps for desalination, filtration, and reverse osmosis.",
    accent: "blue",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M12 21.5C17.2467 21.5 21.5 17.2467 21.5 12C21.5 8 12 2 12 2C12 2 2.5 8 2.5 12C2.5 17.2467 6.75329 21.5 12 21.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
         <path d="M12 11V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "hvac",
    title: "HVAC Systems",
    tag: "Climate Control",
    desc: "Reliable circulation for commercial cooling towers and district heating networks.",
    accent: "green",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M12 22V2M2 12H22M4.929 4.929l14.142 14.142M4.929 19.071L19.071 4.929" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
         <circle cx="12" cy="12" r="4" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: "sewage",
    title: "Sewage Handling",
    tag: "Municipal",
    desc: "Heavy-duty submersible solutions for wastewater and flood control infrastructure.",
    accent: "blue",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M4 14V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V14" stroke="currentColor" strokeWidth="1.5"/>
         <path d="M12 16V4M12 4L8 8M12 4L16 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "industrial",
    title: "Process Industry",
    tag: "Chemical Focus",
    desc: "Stainless steel hardware designed for corrosive fluid movement in processing.",
    accent: "green",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <rect x="3" y="10" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
         <path d="M7 10V6C7 4.89543 7.89543 4 9 4H15C16.1046 4 17 4.89543 17 6V10" stroke="currentColor" strokeWidth="1.5"/>
         <path d="M12 14V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
] as const;

export default function ApplicationShowcase() {
  return (
    <section className="relative py-12 lg:py-20 bg-section-bg overflow-hidden">
      {/* Subtle background industrial diagonal lines matching PartnerSynergy */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{ 
          backgroundImage: `repeating-linear-gradient(45deg, #0F172A 0, #0F172A 1px, transparent 1px, transparent 20px)`,
          backgroundAttachment: "fixed"
        }} 
      />

      <div className="relative mx-auto max-w-7xl px-8 z-10">
        
        {/* HEADER */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          
          <PrecisionReveal variant="fadeSlideLeft">
            <SectionTag>System Applications</SectionTag>

            <h2 
              className="mt-4 text-deep-blue font-black leading-tight uppercase tracking-tight"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
            >
              Engineered For <br className="hidden md:block"/> Real-World Environments
            </h2>
          </PrecisionReveal>
          
          <PrecisionReveal variant="fadeSlideRight" delay={0.1}>
            <p className="max-w-sm text-sm text-text-light md:text-right leading-relaxed font-medium">
              FlowCore hardware integrates into demanding industrial systems with precision and durability, ensuring continuous peak performance.
            </p>
          </PrecisionReveal>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VERTICALS.map((vertical, i) => {
            // Compute styling dynamically based on card accent color
            const isBlue = vertical.accent === "blue";
            const bgClass = isBlue ? "bg-deep-blue text-white" : "bg-primary-green text-deep-blue";
            const gridColor = isBlue ? "#ffffff" : "#0F3D91";
            const tagBg = isBlue ? "bg-white/10 text-white border-white/20" : "bg-deep-blue/10 text-deep-blue border-deep-blue/20";
            const numberColor = isBlue ? "text-white/50" : "text-deep-blue/50";
            const titleColor = isBlue ? "text-white" : "text-deep-blue";
            const descColor = isBlue ? "text-white/80" : "text-deep-blue/80";
            const ctaColorPrimary = isBlue ? "text-white/80" : "text-deep-blue/80";
            const ctaColorHover = isBlue ? "group-hover:text-white" : "group-hover:text-deep-blue";
            const underlineColor = isBlue ? "bg-white/40 group-hover:bg-white" : "bg-deep-blue/40 group-hover:bg-deep-blue";

            return (
              <PrecisionReveal key={vertical.id} variant="riseUp" delay={i * 0.08}>
                
                <Link href="/applications" className="group block h-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-green rounded-2xl">
                  
                  {/* 🔥 SOLID COLOR CARD WITH TECHNICAL GRID */}
                  {/* Removed background hover changes as per user request */}
                  <div
                    className={`relative h-full flex flex-col rounded-2xl p-8 transition-all duration-500 overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(15,61,145,0.25)] ${bgClass}`}
                  >
                    {/* Subtle Tech Grid overlay matching PartnerSynergy Core */}
                    <div 
                      className="absolute inset-0 pointer-events-none transition-opacity duration-700 group-hover:opacity-[0.12]" 
                      style={{
                        opacity: isBlue ? 0.06 : 0.08,
                        backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
                        backgroundSize: "20px 20px"
                      }} 
                    />

                    {/* Watermark Icon */}
                    <div className="absolute -right-8 top-16 w-48 h-48 opacity-[0.06] group-hover:scale-110 group-hover:opacity-[0.12] transition-all duration-700 pointer-events-none">
                       {vertical.icon}
                    </div>

                    {/* HEADER */}
                    <div className="relative z-10 flex items-center justify-between mb-10">
                      <span className={`text-xs font-black tracking-widest ${numberColor}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <span className={`text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full backdrop-blur-md border ${tagBg}`}>
                        {vertical.tag}
                      </span>
                    </div>

                    {/* TITLE */}
                    <h3 className={`relative z-10 text-xl font-bold mb-4 uppercase tracking-tight leading-tight group-hover:pl-2 transition-all duration-500 ${titleColor}`}>
                      {vertical.title}
                    </h3>

                    {/* DESC */}
                    <p className={`relative z-10 text-sm leading-relaxed mb-12 flex-1 font-medium ${descColor}`}>
                      {vertical.desc}
                    </p>

                    {/* CTA */}
                    <div className="relative z-10 flex flex-col mt-auto">
                      <div className={`flex items-center text-[11px] font-bold transition-colors uppercase tracking-[0.15em] mb-2 ${ctaColorPrimary} ${ctaColorHover}`}>
                        Explore
                        <svg 
                          className="ml-3 transition-transform duration-500 group-hover:translate-x-2"
                          width="14" height="14" viewBox="0 0 16 16" fill="none"
                        >
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      {/* Architectural underline that fills out on hover */}
                      <div className={`w-8 h-[2px] transition-all duration-500 ease-out group-hover:w-full ${underlineColor}`} />
                    </div>

                  </div>

                </Link>
              </PrecisionReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}