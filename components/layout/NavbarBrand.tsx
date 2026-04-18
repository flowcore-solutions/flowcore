import Image from "next/image";

import flowcoreLogo from "@/app/assets/logos/flowcore-logo.svg";

export default function NavbarBrand() {
  return (
    <div className="flex items-center gap-3">
      <Image
        src={flowcoreLogo}
        alt="FlowCore Solutions logo - Industrial Pump Systems and Water Treatment"
        width={54}
        height={54}
        priority
        className="w-12 drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] lg:w-14"
      />
      <div className="leading-none">
        <div className="text-xl font-black uppercase tracking-tight text-deep-blue lg:text-2xl">
          Flowcore
        </div>
        <div className="text-center text-[10px] uppercase tracking-[0.3em] text-deep-blue">
          Solutions
        </div>
      </div>
    </div>
  );
}
