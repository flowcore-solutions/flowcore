"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import type { DiagramNode } from "@/lib/application-data";
import { getPumpById } from "@/lib/pump-data";
import type { StaticImageData } from "next/image";

import cdlCdlf from "@/app/assets/pumps/cdl-cdlf.png";
import wq      from "@/app/assets/pumps/wq.png";
import qyB     from "@/app/assets/pumps/qy-b.png";
import hydro   from "@/app/assets/pumps/hydro.png";
import chl     from "@/app/assets/pumps/chl.png";
import chm     from "@/app/assets/pumps/chm.png";
import chlf    from "@/app/assets/pumps/chlf-chlf-t.png";
import bt      from "@/app/assets/pumps/bt.png";
import niso    from "@/app/assets/pumps/niso.png";
import sz      from "@/app/assets/pumps/sz.png";
import ld      from "@/app/assets/pumps/ld.png";
import stp     from "@/app/assets/pumps/stp.png";
import zs      from "@/app/assets/pumps/zs.png";
import cdlfCdh from "@/app/assets/pumps/cdlf-cdh.png";
import cdlkCdlkf from "@/app/assets/pumps/cdlk-cdlkf.png";
import mini    from "@/app/assets/pumps/mini.png";

const PUMP_IMAGES: Record<string, StaticImageData> = {
  "cdl-cdlf": cdlCdlf, wq, "qy-b": qyB, hydro,
  chl, chm, chlf, bt, niso, sz, ld, stp, zs, 
  "cdlf-cdh": cdlfCdh, "cdlk-cdlkf": cdlkCdlkf, mini
};

const GREEN        = "#6cc24a";
const DEEP_BLUE    = "#0f3d91";
const PRIMARY_BLUE = "#1e5bb8";
const BORDER       = "#e5e7eb";
const TEXT_LIGHT   = "#64748b";
const BG_SECTION   = "#f8fafc";

interface PumpTooltipProps {
  node:   DiagramNode;
  style?: CSSProperties;
  /** Mobile variant: full-width, no absolute positioning */
  mobile?: boolean;
}

export default function PumpTooltip({ node, style, mobile }: PumpTooltipProps) {
  const pump  = getPumpById(node.pumpModelId);
  const image = PUMP_IMAGES[node.pumpModelId];

  return (
    <div
      role="tooltip"
      style={{
        boxShadow:     "0 20px 60px 0 rgba(15, 61, 145, 0.22)",
        pointerEvents: "none",
        width:         mobile ? "100%" : "clamp(260px, 70vw, 300px)",
        maxWidth:      "calc(100vw - 48px)",
        ...style,
      }}
      className="rounded-2xl border border-border bg-white overflow-hidden animate-reveal-up"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between gap-2 px-4 py-3"
        style={{
          background:   `linear-gradient(135deg, ${DEEP_BLUE}, #1e5bb8)`,
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <span className="text-[11px] font-bold uppercase tracking-widest text-white">
          {node.label}
        </span>
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
          style={{ backgroundColor: `${GREEN}35`, color: GREEN }}
        >
          Active
        </span>
      </div>

      {/* Body */}
      <div className="p-4 flex gap-4 items-center">
        {image && (
          <div
            className="shrink-0 rounded-xl overflow-hidden flex items-center justify-center"
            style={{
              width:           mobile ? 80 : 72,
              height:          mobile ? 80 : 72,
              backgroundColor: BG_SECTION,
              border:          `1px solid ${BORDER}`,
            }}
          >
            <Image
              src={image}
              alt={pump?.fullName ?? node.pumpModelId}
              width={mobile ? 72 : 64}
              height={mobile ? 72 : 64}
              className="object-contain p-1.5"
            />
          </div>
        )}

        <div className="flex flex-col gap-1.5 min-w-0 justify-center">
          <p
            className="text-sm font-bold leading-tight"
            style={{ color: DEEP_BLUE }}
          >
            {pump?.fullName ?? node.pumpModelId}
          </p>
          <p className="text-xs leading-relaxed" style={{ color: TEXT_LIGHT }}>
            {node.role}
          </p>
        </div>
      </div>

      {/* Stats */}
      {pump && (
        <div
          className="grid grid-cols-2 divide-x"
          style={{ borderTop: `1px solid ${BORDER}` }}
        >
          {[
            ["Flow Rate", pump.flowRate],
            ["Max Head",  pump.maxHead],
          ].map(([label, val]) => (
            <div key={label} className="px-4 py-3 flex flex-col gap-1">
              <span
                className="text-[10px] uppercase tracking-wider font-semibold"
                style={{ color: TEXT_LIGHT }}
              >
                {label}
              </span>
              <span
                className="text-sm font-bold"
                style={{ color: PRIMARY_BLUE, fontVariantNumeric: "tabular-nums" }}
              >
                {val}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}