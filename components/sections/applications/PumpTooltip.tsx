"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { DiagramNode } from "@/lib/application-data";
import { getPumpById } from "@/lib/pump-data";
import type { StaticImageData } from "next/image";

import cdlCdlf from "@/app/assets/pumps/cdl-cdlf.png";
import wq from "@/app/assets/pumps/wq.png";
import qyB from "@/app/assets/pumps/qy-b.png";
import hydro from "@/app/assets/pumps/hydro.png";
import chl from "@/app/assets/pumps/chl.png";
import chm from "@/app/assets/pumps/chm.png";
import chlf from "@/app/assets/pumps/chlf-chlf-t.png";
import bt from "@/app/assets/pumps/bt.png";
import niso from "@/app/assets/pumps/niso.png";
import sz from "@/app/assets/pumps/sz.png";
import ld from "@/app/assets/pumps/ld.png";
import stp from "@/app/assets/pumps/stp.png";

const PUMP_IMAGES: Record<string, StaticImageData> = {
  "cdl-cdlf": cdlCdlf,
  wq,
  "qy-b": qyB,
  hydro,
  chl,
  chm,
  chlf,
  bt,
  niso,
  sz,
  ld,
  stp,
};

const PRECISION_EASE = [0.25, 0, 0, 1] as const;
const GREEN = "#6cc24a";
const DEEP_BLUE = "#0f3d91";
const PRIMARY_BLUE = "#1e5bb8";
const BORDER = "#e5e7eb";
const TEXT_LIGHT = "#64748b";

interface PumpTooltipProps {
  node: DiagramNode;
  anchorX: number;
  anchorY: number;
}

export default function PumpTooltip({ node, anchorX, anchorY }: PumpTooltipProps) {
  const pump = getPumpById(node.pumpModelId);
  const image = PUMP_IMAGES[node.pumpModelId];

  const leftPct = Math.min(anchorX + 4, 58);
  const topPct = Math.max(anchorY - 36, 2);

  return (
    <motion.div
      role="tooltip"
      initial={{ opacity: 0, scale: 0.94, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 4 }}
      transition={{ duration: 0.2, ease: PRECISION_EASE }}
      style={{
        position: "absolute",
        left: `${leftPct}%`,
        top: `${topPct}%`,
        zIndex: 20,
        width: "220px",
        boxShadow: "var(--shadow-card-hover)",
      }}
      className="rounded-xl border border-border bg-white overflow-hidden pointer-events-none"
    >
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ backgroundColor: `${GREEN}15`, borderBottom: `1px solid ${BORDER}` }}
      >
        <span
          className="text-[10px] font-bold uppercase tracking-widest"
          style={{ color: "#2fa84f" }}
        >
          {node.label}
        </span>
      </div>

      <div className="p-3 flex gap-3">
        {image ? (
          <div
            className="shrink-0 rounded-lg overflow-hidden flex items-center justify-center"
            style={{ width: 56, height: 56, backgroundColor: "#f8fafc" }}
          >
            <Image
              src={image}
              alt={pump?.fullName ?? node.pumpModelId}
              width={52}
              height={52}
              className="object-contain p-1"
            />
          </div>
        ) : null}

        <div className="flex flex-col gap-1 min-w-0">
          <p
            className="text-xs font-bold leading-tight truncate"
            style={{ color: DEEP_BLUE }}
          >
            {pump?.fullName ?? node.pumpModelId}
          </p>
          <p
            className="text-[11px] leading-snug"
            style={{ color: TEXT_LIGHT }}
          >
            {node.role}
          </p>
        </div>
      </div>

      {pump && (
        <div className="grid grid-cols-2 divide-x border-t border-border">
          {[
            ["Flow", pump.flowRate],
            ["Head", pump.maxHead],
          ].map(([label, val]) => (
            <div key={label} className="px-3 py-2 flex flex-col gap-0.5">
              <span
                className="text-[10px] uppercase tracking-wider font-medium"
                style={{ color: TEXT_LIGHT }}
              >
                {label}
              </span>
              <span
                className="text-[11px] font-semibold"
                style={{ color: PRIMARY_BLUE, fontVariantNumeric: "tabular-nums" }}
              >
                {val}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
