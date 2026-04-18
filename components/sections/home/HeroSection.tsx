import Image from "next/image";
import Link from "next/link";
import berlingtonPumpsSet from "@/app/assets/pumps/Berlington-Pumps-Set.png";

const BlueBackground = () => (
  <>
    <Image
      src={berlingtonPumpsSet}
      alt="Berlington industrial pump range — vertical multistage, submersible, and centrifugal pumps for water treatment and HVAC"
      fill
      priority
      fetchPriority="high"
      quality={60}
      sizes="(max-width: 768px) 100vw, 60vw"
      className="object-cover opacity-30"
    />
    <div className="absolute inset-0 bg-deep-blue/85" />
  </>
);

const GreenBackground = () => (
  <>
    <div className="absolute inset-0 bg-linear-to-l from-primary-green via-primary-green/95 to-transparent" />
    <div className="absolute inset-0 opacity-20">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-white/20"
          style={{
            width: `${320 + i * 140}px`,
            height: `${320 + i * 140}px`,
            top: "50%",
            left: "65%",
            transform: "translate(-50%, -50%)",
            animation: `pulse ${6 + i}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  </>
);

export default function HeroSection() {
  return (
    <section className="hero-underlap hero-viewport relative w-full overflow-hidden bg-deep-blue">
      
      {/* ── BACKGROUND LAYERS ── */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-deep-blue [clip-path:polygon(0_0,100%_0,100%_64%,0_52%)] lg:[clip-path:polygon(0_0,60%_0,55%_100%,0_100%)]">
          <BlueBackground />
        </div>
        <div className="absolute inset-0 bg-primary-green [clip-path:polygon(0_52%,100%_64%,100%_100%,0_100%)] lg:[clip-path:polygon(55%_0,100%_0,100%_100%,50%_100%)]">
          <GreenBackground />
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 flex h-full w-full flex-col lg:flex-row">
        
        {/* LEFT / TOP */}
        <div className="flex h-[52%] w-full flex-col justify-center px-8 sm:h-[55%] sm:px-16 lg:h-full lg:w-[55%] lg:justify-start lg:px-24 xl:px-36 lg:pt-6 xl:pt-8">
          <span
            className="animate-reveal-right opacity-0 mb-3 lg:mb-5 border-l-2 border-light-blue pl-3 lg:pl-4 -ml-[14px] lg:-ml-[18px] text-[10px] sm:text-xs lg:text-sm font-bold uppercase tracking-[0.2em] text-light-blue"
          >
            Authorized Berlington Pump Dealer in Karnataka
          </span>

          <h1
            className="animate-reveal-up opacity-0 text-white font-bold uppercase mb-4 lg:mb-6 leading-[1.15] tracking-wide"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", animationDelay: "0.1s" }}
          >
            Berlington <br />
            <span className="text-light-blue">Pumps</span> <br/>
            In Bangalore
          </h1>

          <p
            className="animate-reveal-up opacity-0 hidden sm:block text-white/90 max-w-md mb-6 lg:mb-10 text-sm lg:text-lg leading-relaxed"
            style={{ animationDelay: "0.2s" }}
          >
            High-performance Berlington centrifugal and stainless steel pump systems engineered for reliable pressure, HVAC, WTP, and fire fighting applications in Bangalore, Karnataka.
          </p>

          {/* CTA */}
          <div
            className="animate-reveal-up opacity-0 flex flex-row gap-3 lg:gap-4 mt-2 sm:mt-0"
            style={{ animationDelay: "0.3s" }}
          >
            <Link href="/products" className="w-auto">
              <button className="bg-white text-deep-blue px-6 py-3 lg:px-8 lg:py-4 rounded-xl text-sm lg:text-base font-bold transition-all hover:scale-105 hover:shadow-xl text-center">
                Explore Berlington Models →
              </button>
            </Link>

            <Link href="/applications" className="w-auto hidden sm:block">
              <button className="border border-white/40 text-white px-6 py-3 lg:px-8 lg:py-4 rounded-xl backdrop-blur-sm hover:border-white transition-all text-center text-sm lg:text-base">
                Industrial Applications
              </button>
            </Link>
          </div>

          {/* INDUSTRIAL BADGES */}
          <div
            className="animate-reveal-up opacity-0 hidden sm:flex mt-8 lg:mt-10 items-center flex-wrap gap-y-3 border-t border-white/10 pt-6 text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.2em] text-white/60"
            style={{ animationDelay: "0.5s" }}
          >
            <span className="text-white">16+ Pump Series</span>
            <span className="mx-3 lg:mx-6 text-white/20 font-light">|</span>
            <span className="text-white/80 transition-colors hover:text-white">ISO Certified Systems</span>
          </div>
        </div>

        {/* RIGHT / BOTTOM */}
        <div className="flex flex-1 flex-col justify-center px-8 sm:px-16 lg:flex-1 lg:justify-start lg:px-20 lg:pt-6 xl:pt-8">
          
          <span
            className="animate-reveal-left opacity-0 mb-3 lg:mb-5 border-l-2 border-deep-blue pl-3 lg:pl-4 -ml-[14px] lg:-ml-[18px] text-[10px] sm:text-xs lg:text-sm font-bold uppercase tracking-[0.2em] text-deep-blue"
          >
            Water Treatment Chemicals
          </span>

          <h2
            className="animate-reveal-up opacity-0 font-bold uppercase mb-4 lg:mb-6 leading-[1.15]"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", animationDelay: "0.15s" }}
          >
            Industrial
 <br />
            <span className="text-white">WTP & STP</span> <br />
            Chemicals
          </h2>

          <p
            className="animate-reveal-up opacity-0 hidden sm:block text-white max-w-md mb-6 lg:mb-10 text-sm lg:text-lg leading-relaxed"
            style={{ animationDelay: "0.25s" }}
          >
            Authorised supplier of high-grade chemicals for Water Treatment Plants (WTP), STP, and RO systems in Bangalore, ensuring system longevity and consistent treatment performance.
          </p>

          <div
             className="animate-reveal-up opacity-0 mt-2 sm:mt-0"
             style={{ animationDelay: "0.35s" }}
          >
            <Link href="/water-treatment-chemicals-bangalore" className="w-auto">
              <button className="bg-deep-blue text-white px-6 py-3 lg:px-8 lg:py-4 rounded-xl text-sm lg:text-base font-bold transition-all hover:scale-105 hover:shadow-xl text-center">
                Learn More →
              </button>
            </Link>
          </div>

          <div className="hidden sm:block mt-8 lg:mt-14 border-t border-deep-blue/20 pt-6 lg:pt-8">
            <p className="text-deep-blue/70 text-xs lg:text-sm uppercase tracking-wide italic">
              ISO-certified solutions for water system health
            </p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.08; transform: translate(-50%, -50%) scale(1.05); }
        }
      `}} />
    </section>
  );
}
