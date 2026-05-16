import Image from "next/image";
import PrecisionReveal from "@/components/ui/PrecisionReveal";
import SectionTag from "@/components/ui/SectionTag";

const BERLINGTON_CAPABILITIES = [
  "Centrifugal, multistage, submersible, booster, and fire pump supply",
  "Pump selection by flow, head, liquid, and duty condition",
  "RO feed, HVAC circulation, pressure boosting, and utility water applications",
  "STP, ETP, drainage, and wastewater transfer support",
  "Installation planning, spare parts, and service follow-up",
];

const FLOWCHAR_CAPABILITIES = [
  "RO plant and water treatment support",
  "STP and ETP process-side support",
  "Chemical dosing application input",
  "Site review for running treatment systems",
  "AMC and breakdown coordination",
];

function CapabilitiesList({
  items,
  accent,
}: {
  items: readonly string[];
  accent: "blue" | "green";
}) {
  const dotColor = accent === "blue" ? "#4da3ff" : "#6cc24a";
  const itemTextClass = accent === "blue" ? "text-white/82" : "text-text-light";
  return (
    <ul className="space-y-3" role="list">
      {items.map((item) => (
        <li
          key={item}
          className={`flex items-start gap-3 text-sm leading-snug ${itemTextClass}`}
        >
          <span
            className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
            style={{
              backgroundColor:
                accent === "blue" ? "rgba(77, 163, 255, 0.22)" : `${dotColor}18`,
              boxShadow:
                accent === "blue" ? "0 0 0 1px rgba(77, 163, 255, 0.14)" : "none",
            }}
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
              <path
                d="M1.5 4l2 2 3-3"
                stroke={dotColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function SynergyBridge() {
  return (
    <section
      id="about-synergy"
      aria-labelledby="synergy-heading"
      className="relative bg-section-bg py-12 lg:py-20 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #0F172A 0, #0F172A 1px, transparent 1px, transparent 20px)`,
          opacity: 0.025,
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <PrecisionReveal variant="fadeSlideLeft" className="mb-3">
          <SectionTag>What We Supply</SectionTag>
        </PrecisionReveal>

        <PrecisionReveal variant="fadeSlideLeft" delay={0.07}>
          <h2
            id="synergy-heading"
            className="mb-4 font-black text-deep-blue leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)" }}
          >
            One Supplier,
            <br />
            <span className="text-primary-blue">Two Working Areas</span>
          </h2>
        </PrecisionReveal>

        <PrecisionReveal variant="fadeSlideLeft" delay={0.14}>
          <p className="mb-14 max-w-xl text-base leading-relaxed text-text-light font-medium">
            FlowCore Solutions handles two linked needs on site: pump supply and water treatment support. The work starts with the application, not with a sales pitch.
          </p>
        </PrecisionReveal>

        <PrecisionReveal variant="riseUp" delay={0.21}>
          <div className="group relative flex flex-col gap-0 overflow-hidden rounded-2xl shadow-[0_20px_80px_-15px_rgba(15,61,145,0.15)] ring-1 ring-deep-blue/10 lg:flex-row">
            <div
              className="relative flex-1 p-8 lg:p-10 flex flex-col"
              style={{ backgroundColor: "#0F3D91" }}
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
                  backgroundSize: "40px 40px",
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-7 h-7 rounded-full bg-primary-blue flex items-center justify-center text-white font-bold text-[10px]">
                    01
                  </span>
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase text-light-blue">
                    Industrial Pump Partner
                  </span>
                </div>

                <div className="relative h-20 w-64 lg:h-24 lg:w-72 mb-8 brightness-0 invert">
                  <Image
                    src="/assets/logos/berlington-logo.svg"
                    alt="Berlington Industrial Pumps"
                    fill
                    sizes="(max-width: 1024px) 256px, 288px"
                    className="object-contain object-left"
                  />
                </div>

                <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tight">
                  Pump Supply
                </h3>
                <p className="mb-8 max-w-xs text-sm leading-relaxed text-white/78">
                  Pump supply for RO plants, HVAC circulation, pressure boosting, fire duty, sewage transfer, and general utility water.
                </p>

                <CapabilitiesList items={BERLINGTON_CAPABILITIES} accent="blue" />

                <div className="grid grid-cols-2 gap-4 mt-8 border-t border-white/10 pt-6">
                  <div>
                    <div className="text-3xl font-black text-white">RO</div>
                    <div className="text-[10px] uppercase tracking-widest text-light-blue font-bold mt-1">
                      Feed duty
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-white">AMC</div>
                    <div className="text-[10px] uppercase tracking-widest text-light-blue font-bold mt-1">
                      Support
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex shrink-0 flex-col items-center justify-center bg-white px-6 py-10 lg:w-48 lg:py-0 ">
              <div className="relative mb-8 h-24 w-44 lg:w-36 xl:w-48">
                <Image
                  src="/assets/logos/flowcore-logo-horizontal.svg"
                  alt="FlowCore Solutions"
                  fill
                  sizes="(max-width: 1024px) 176px, 192px"
                  className="object-contain"
                />
              </div>

              <div className="relative w-16 h-16 bg-section-bg rounded-full flex items-center justify-center border border-border group-hover:rotate-180 transition-transform duration-1000 ease-in-out">
                <div className="absolute inset-2 rounded-full border-[2.5px] border-deep-blue border-r-primary-green border-b-primary-green" />
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0F3D91"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="rotate-45"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>

              <p className="mt-5 text-center text-[10px] font-black uppercase leading-relaxed tracking-[0.2em] text-deep-blue/75">
                Pump and
                <br />
                service link
              </p>

              <div className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3">
                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-10 border-r-border" />
              </div>
              <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3">
                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-10 border-l-border" />
              </div>
            </div>

            <div className="relative flex-1 p-8 lg:p-10 flex flex-col bg-section-bg">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-7 h-7 rounded-full bg-primary-green flex items-center justify-center text-white font-bold text-[10px]">
                    02
                  </span>
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase text-primary-green">
                    Water Treatment Support
                  </span>
                </div>

                <div className="relative h-20 w-48 lg:h-24 lg:w-56 mb-8">
                  <Image
                    src="/assets/logos/flowchar-logo.svg"
                    alt="Flowchar Water Treatment"
                    fill
                    sizes="(max-width: 1024px) 192px, 224px"
                    className="object-contain object-left"
                  />
                </div>

                <h3 className="text-xl font-black text-deep-blue mb-3 uppercase tracking-tight">
                  Water Treatment Support
                </h3>
                <p className="text-text-light text-sm leading-relaxed mb-8 max-w-xs">
                  Support for RO, STP, and ETP work, plus dosing-related applications and service planning for operating systems.
                </p>

                <CapabilitiesList items={FLOWCHAR_CAPABILITIES} accent="green" />

                <div className="grid grid-cols-2 gap-4 mt-8 border-t border-border pt-6">
                  <div>
                    <div className="text-3xl font-black text-primary-green">STP</div>
                    <div className="text-[10px] uppercase tracking-widest text-text-light font-bold mt-1">
                      Transfer duty
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-primary-green">AMC</div>
                    <div className="text-[10px] uppercase tracking-widest text-text-light font-bold mt-1">
                      Service plan
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PrecisionReveal>
      </div>
    </section>
  );
}
