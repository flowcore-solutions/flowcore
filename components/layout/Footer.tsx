
import Image from "next/image";
import Link from "next/link";
import flowcoreLogoHorizontal from "@/app/assets/logos/flowcore-logo-horizontal.svg";

const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/applications", label: "Applications" },
  { href: "/about", label: "About Us" },
  { href: "/contact#inquiry-form", label: "Contact" },
];

function BrandIdentity() {
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 inline-flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 relative group overflow-hidden">
      {/* Subtle hover gleam effect inside the white container */}
      <div className="absolute inset-0 bg-linear-to-tr from-[#6CC24A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <Image
        src={flowcoreLogoHorizontal}
        alt="FlowCore Solutions — Industrial Pump Systems & Water Treatment"
        width={220}
        height={70}
        className="w-48 lg:w-56 object-contain relative z-10 transition-transform duration-500 group-hover:scale-[1.02]"
      />
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0F3D91] text-white relative">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Engineering Grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
            backgroundSize: "48px 48px"
          }}
        />
        {/* Radial Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,transparent_0%,#0F3D91_100%)] opacity-80" />
      </div>
      
      {/* MAIN FOOTER */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 pt-24 pb-16">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 justify-between">
          
          {/* ── BRAND COLUMN ── */}
          <div className="flex-1 lg:max-w-xl">
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-8">
              <Link href="/" className="shrink-0 block outline-none focus-visible:ring-4 focus-visible:ring-white rounded-2xl transition-transform hover:-translate-y-1">
                <BrandIdentity />
              </Link>

              <div className="flex flex-col space-y-4 items-center sm:items-start text-center sm:text-left">
                <p className="text-base sm:text-lg font-medium text-white/90 leading-relaxed max-w-[320px]">
                  Authorized Berlington Pumps dealer in Bangalore, Karnataka. Supplying reliable industrial pump systems and comprehensive technical solutions.
                </p>
                <div className="inline-flex items-center justify-center gap-2.5 border border-white/20 bg-white/5 rounded-full px-4 py-1.5 backdrop-blur-sm shadow-inner">
                   <span className="shrink-0 w-2.5 h-2.5 rounded-full bg-[#6CC24A]" />
                   <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#4DA3FF] leading-none pt-px">Engineered For Reliability</span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Separator Line */}
          <div className="hidden lg:block w-px bg-linear-to-b from-white/20 to-transparent self-stretch mx-4" />

          {/* ── RIGHT COLUMNS: Navigation & Contact ── */}
          <div className="flex-1 flex flex-col sm:flex-row gap-16 justify-end lg:pr-8">
            
            {/* ── LINKS COLUMN ── */}
            <div className="min-w-40">
              <h4 className="text-[11px] font-black tracking-[0.25em] text-white/40 mb-8 uppercase flex items-center gap-3">
                <span className="w-8 h-px bg-white/20" /> Navigation
              </h4>

              <ul className="flex flex-wrap gap-3 sm:block sm:space-y-4">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/80 transition-colors hover:text-white hover:bg-[#1E5BB8]/20 hover:border-[#4DA3FF]/40 sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 sm:py-0"
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-[#4DA3FF] group-hover:bg-[#1E5BB8] group-hover:shadow-[0_0_12px_rgba(30,91,184,0.6)] sm:h-7 sm:w-7">
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-0.5 text-white/70 group-hover:text-white">
                          <path d="M5 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── CONTACT COLUMN ── */}
            <div className="min-w-65">
              <h4 className="text-[11px] font-black tracking-[0.25em] text-white/40 mb-8 uppercase flex items-center gap-3">
                <span className="w-8 h-px bg-white/20" /> Headquarters
              </h4>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1 w-9 h-9 rounded-lg bg-[#1E5BB8]/30 border border-[#4DA3FF]/20 flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4DA3FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-white mb-1.5 text-sm uppercase tracking-wider">
                      Bangalore Office
                    </p>
                    <p className="text-xs sm:text-sm leading-relaxed text-white/70">
                      1st Floor, Cheluva Complex <br />
                      Magadi Main Road, Kottingepalya <br />
                      Bangalore, Karnataka 560091 <br />
                      <span className="text-[#6CC24A] font-black mt-2 inline-block tracking-widest uppercase text-[10px]">Serving All Karnataka</span>
                    </p>
                  </div>
                </div>

                <div className="pt-2 space-y-3">
                  <a href="tel:+918618885283" className="group flex items-center gap-4 bg-white/5 hover:bg-[#6CC24A]/10 border border-white/10 hover:border-[#6CC24A]/50 rounded-xl p-3 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-white/10 group-hover:bg-[#6CC24A] flex items-center justify-center transition-colors duration-300">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-black tracking-widest text-[#6CC24A] uppercase mb-0.5 opacity-80 group-hover:opacity-100 transition-opacity">Direct Line</p>
                      <span className="font-bold text-white text-sm tracking-wide">+91 8618885283</span>
                    </div>
                  </a>

                  <a href="mailto:flowcoresolutionsblr@gmail.com" className="group flex items-center gap-4 bg-white/5 hover:bg-[#1E5BB8]/30 border border-white/10 hover:border-[#4DA3FF]/50 rounded-xl p-3 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-white/10 group-hover:bg-[#1E5BB8] flex items-center justify-center transition-colors duration-300">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-black tracking-widest text-[#4DA3FF] uppercase mb-0.5 opacity-80 group-hover:opacity-100 transition-opacity">Email Us</p>
                      <span className="font-semibold text-white/90 group-hover:text-white text-xs truncate block" style={{ wordBreak: 'break-all' }}>flowcoresolutionsblr@gmail.com</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="relative z-10 bg-[#061A40] border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-semibold">
          <p className="text-white/60">
            © {year} FlowCore Solutions. <span className="text-white/20 font-normal ml-1">Fluid Infrastructure Engineering.</span>
          </p>
          <div className="hidden lg:flex items-center flex-wrap justify-center gap-4 text-white/80">
            <span className="bg-white/5 px-4 py-2 rounded-lg border border-white/10 font-black tracking-widest uppercase text-[9px]">Berlington Industrial Pumps</span>
            <div className="w-1.5 h-1.5 rounded-full bg-primary-green"></div>
            <span className="bg-white/5 px-4 py-2 rounded-lg border border-white/10 font-black tracking-widest uppercase text-[9px]">Flowchar WTP Chemicals</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
