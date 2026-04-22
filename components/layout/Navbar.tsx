import Link from "next/link";
import dynamic from "next/dynamic";
import NavbarBrand from "./NavbarBrand";
import NavbarClientWrapper from "./NavbarClientWrapper";

// This can stay as SSR: true even in a Server Component if needed, 
// but to be safe and consistent with client-islands, we'll keep it as a static import OR dynamic SSR: true
const NavbarDesktopLinks = dynamic(() => import("./NavbarDesktopLinks"), {
  ssr: true,
});

export default function Navbar() {
  return (
    <>
      {/* Client islands moved inside nav to fix flow layout issue */}
      
      <div className="pointer-events-none fixed left-0 right-0 top-3 sm:top-4 z-50 px-4 sm:px-6">
        <nav
          id="main-navbar"
          className="pointer-events-auto relative mx-auto max-w-7xl roundedxl- sm:rounded-4xl bg-white/95 py-3 sm:py-4 shadow-[0_8px_32px_rgba(15,23,42,0.08)] backdrop-blur-md transition-all duration-500"
        >
          {/* Decorative background blobs */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-4xl sm:rounded-4xl">
            <div className="absolute -left-20 top-1/2 h-96 w-[24rem] -translate-y-1/2 rounded-full bg-[#6CC24A]/25 blur-[60px]" />
            <div className="absolute -right-20 top-1/2 h-120 w-120 -translate-y-1/2 rounded-full bg-[#1E5BB8]/15 blur-[70px]" />
          </div>

          <div className="relative z-10 flex items-center justify-between px-5 sm:px-8">
            
            {/* BRANDING: Left aligned on mobile and desktop */}
            <div className="flex shrink-0 justify-start md:flex-1">
              <Link href="/">
                <NavbarBrand />
              </Link>
            </div>

            {/* DESKTOP ONLY: Centered links */}
            <div className="hidden md:flex md:flex-auto md:justify-center">
              <NavbarDesktopLinks />
            </div>

            {/* RIGHT SIDE: Mobile Menu & Desktop CTA */}
            <div className="flex flex-1 justify-end items-center gap-4">
              {/* Desktop CTA */}
              <Link href="/contact" className="hidden lg:block">
                <button className="relative overflow-hidden rounded-full bg-deep-blue px-8 py-3 text-sm font-black uppercase tracking-widest text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_30px_rgba(15,23,42,0.4)]">
                  <span className="relative z-10">Get a Quote</span>
                  <span className="absolute inset-0 bg-primary-blue opacity-0 transition-opacity duration-300 hover:opacity-100" />
                </button>
              </Link>

              {/* Mobile Menu Icon */}
              <div className="flex md:hidden">
                <NavbarClientWrapper />
              </div>
            </div>

          </div>
        </nav>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .nav-scrolled {
          transform: scale(0.98);
          background-color: rgba(255, 255, 255, 0.8) !important;
          padding-top: 0.625rem !important;
          padding-bottom: 0.625rem !important;
          backdrop-filter: blur(20px);
          box-shadow: 0 10px 40px rgba(0,0,0,0.1) !important;
        }
      `}} />
    </>
  );
}
