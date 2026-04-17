"use client";

import Image from "next/image";
import Link from "next/link";
import { type PumpModel } from "@/lib/pump-data";
import { motion, type Variants } from "framer-motion";

// Wait, I can't use generateMetadata if it's a client component.
// So I will make a wrapper for the page, or keep it server-side and only use a client component for the layout.

export default function ProductClientWrapper({ pump }: { pump: PumpModel }) {
  if (!pump) {
    return null;
  }

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: pump.fullName,
    image: `https://flowcore.in${pump.imagePath}`,
    description: `Berlington ${pump.fullName} industrial pump. Flow rate: ${pump.flowRate}, Max head: ${pump.maxHead}. Supplied in Bangalore by FlowCore Solutions.`,
    brand: {
      "@type": "Brand",
      name: "Berlington Pumps",
    },
    category: pump.category,
    offers: {
      "@type": "Offer",
      url: `https://flowcore.in/products/${pump.id}`,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "FlowCore Solutions",
      },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  const stagger: Variants = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <main className="hero-underlap relative flex-1 bg-section-bg pt-8 pb-20 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #0F172A 0, #0F172A 1px, transparent 1px, transparent 20px)`,
            opacity: 0.025,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-sm text-[#64748B] mb-10 flex flex-wrap items-center gap-2"
          >
             <Link href="/" className="hover:text-[#1E5BB8] font-medium transition-colors">Home</Link>
             <span>/</span>
             <Link href="/products" className="hover:text-[#1E5BB8] font-medium transition-colors">Catalogue</Link>
             <span>/</span>
             <span className="font-bold text-[#0F172A]">{pump.fullName}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 pb-16">
            {/* Image Column */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-[2rem] p-8 flex items-center justify-center border border-border h-[400px] lg:h-[650px] relative overflow-hidden group"
            >
               <div className="absolute inset-0 bg-gradient-to-tr from-white to-section-bg" />
               <motion.div
                 whileHover={{ scale: 1.05 }}
                 transition={{ duration: 0.6, ease: "easeOut" }}
                 className="relative w-full h-full"
               >
                 <Image
                   src={pump.imagePath}
                   alt={`${pump.fullName} - Berlington Pump`}
                   fill
                   className="object-contain p-8 drop-shadow-2xl"
                 />
               </motion.div>
               <div className="absolute top-8 left-8 z-10">
                  <span className="bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#1E5BB8] rounded-full border border-[#1E5BB8]/10 shadow-sm">
                    {pump.category}
                  </span>
               </div>
            </motion.div>

            {/* Content Column */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="flex flex-col justify-center"
            >
              <motion.span variants={fadeUp} className="text-[#6CC24A] font-black tracking-[0.2em] uppercase text-xs mb-4">
                Berlington Model
              </motion.span>
              
              <motion.h1 variants={fadeUp} className="text-4xl text-[#0F172A] font-black mb-6 tracking-tight leading-[1.1] md:text-5xl lg:text-6xl">
                {pump.fullName}
              </motion.h1>
              
              <motion.p variants={fadeUp} className="text-lg md:text-xl text-[#475569] mb-10 leading-relaxed font-light">
                As an authorized Berlington Pump supplier in Bangalore, FlowCore Solutions provides the complete <strong className="font-semibold text-[#0F172A]">{pump.seriesCode}</strong> series, designed for absolute reliability and high efficiency in industrial facilities across Karnataka. 
              </motion.p>

              <motion.div variants={fadeUp} className="bg-white rounded-2xl p-8 border border-border mb-10 shadow-sm">
                <h3 className="text-xs font-black text-[#0F172A] uppercase tracking-[0.2em] mb-6 flex items-center gap-4">
                  <span>Technical Specifications</span>
                  <span className="h-px bg-gray-200 flex-1" />
                </h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 text-sm">
                  <div className="border-l-2 border-[#1E5BB8]/20 pl-4">
                    <dt className="text-[#64748B] mb-1 font-medium tracking-wide">Flow Rate</dt>
                    <dd className="font-bold text-[#0F172A] text-base">{pump.flowRate}</dd>
                  </div>
                  <div className="border-l-2 border-[#1E5BB8]/20 pl-4">
                    <dt className="text-[#64748B] mb-1 font-medium tracking-wide">Max Head</dt>
                    <dd className="font-bold text-[#0F172A] text-base">{pump.maxHead}</dd>
                  </div>
                  <div className="border-l-2 border-[#1E5BB8]/20 pl-4">
                    <dt className="text-[#64748B] mb-1 font-medium tracking-wide">Power Range</dt>
                    <dd className="font-bold text-[#0F172A] text-base">{pump.powerRange}</dd>
                  </div>
                   <div className="border-l-2 border-[#1E5BB8]/20 pl-4">
                    <dt className="text-[#64748B] mb-1 font-medium tracking-wide">Temperature</dt>
                    <dd className="font-bold text-[#0F172A] text-base">{pump.temperature}</dd>
                  </div>
                  <div className="border-l-2 border-[#1E5BB8]/20 pl-4">
                    <dt className="text-[#64748B] mb-1 font-medium tracking-wide">Material</dt>
                    <dd className="font-bold text-[#0F172A] text-base">{pump.material}</dd>
                  </div>
                  <div className="border-l-2 border-[#1E5BB8]/20 pl-4">
                    <dt className="text-[#64748B] mb-1 font-medium tracking-wide">Connections</dt>
                    <dd className="font-bold text-[#0F172A] text-base">{pump.connections}</dd>
                  </div>
                </dl>
              </motion.div>

              <motion.div variants={fadeUp} className="mb-12">
                <h3 className="text-xs font-black text-[#0F172A] uppercase tracking-[0.2em] mb-5">Primary Applications</h3>
                <div className="flex flex-wrap gap-2">
                  {pump.applications.map((app: string) => (
                    <span key={app} className="bg-white border text-[#475569] border-gray-200 hover:border-[#1E5BB8] hover:text-[#1E5BB8] transition-colors px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase">
                      {app}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mt-auto">
                <Link href="/contact" className="w-full sm:w-auto">
                  <button className="w-full bg-[#1E5BB8] hover:bg-[#0F3D91] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-[0_10px_20px_-10px_rgba(30,91,184,0.5)] hover:shadow-[0_15px_30px_-15px_rgba(30,91,184,0.6)] hover:-translate-y-1">
                    Request Berlington Quote
                  </button>
                </Link>
                <Link href="/products" className="w-full sm:w-auto">
                  <button className="w-full bg-white border border-gray-200 text-[#0F172A] hover:border-[#1E5BB8] hover:text-[#1E5BB8] px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all">
                    View All Models
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}
