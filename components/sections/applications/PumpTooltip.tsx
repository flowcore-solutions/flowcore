"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import type { DiagramNode, EquipmentType } from "@/lib/application-data";
import { getPumpById } from "@/lib/pump-data";
import { PUMP_IMAGES } from "@/components/ui/PumpCard";

const GREEN = "#6cc24a";
const DEEP_BLUE = "#0f3d91";
const PRIMARY_BLUE = "#1e5bb8";
const BORDER = "#e5e7eb";
const TEXT_LIGHT = "#64748b";
const BG_SECTION = "#f8fafc";

const EQUIPMENT_LABELS: Record<EquipmentType, string> = {
  pump: "Pump",
  tank: "Tank",
  filter: "Filter",
  membrane: "Membrane",
  blower: "Blower",
  valve: "Valve",
  "chiller": "Chiller",
  "cooling-tower": "Cooling Tower",
  "clarifier": "Clarifier",
  "screen": "Screen",
  "header-manifold": "Header Manifold",
  "sump": "Sump",
  "deaerator": "Deaerator",
  "boiler": "Boiler",
  "flow-meter": "Flow Meter",
  "booster-system": "Booster System",
  "wet-well": "Wet Well",
  "sand-filter": "Sand Filter",
  "media-filter": "Media Filter",
  "ro-vessel": "RO Vessel",
  "storage-tank": "Storage Tank",
  "process-tank": "Process Tank",
};

interface PumpTooltipProps {
  node: DiagramNode;
  style?: CSSProperties;
  mobile?: boolean;
}

export default function PumpTooltip({ node, style, mobile }: PumpTooltipProps) {
  const pump = node.pumpModelId ? getPumpById(node.pumpModelId) : undefined;
  const image = node.pumpModelId ? PUMP_IMAGES[node.pumpModelId] : undefined;
  const title = pump?.fullName ?? `${node.label} ${EQUIPMENT_LABELS[node.equipmentType]}`;

  return (
    <div
      role="tooltip"
      style={{
        boxShadow: "0 20px 60px 0 rgba(15, 61, 145, 0.22)",
        pointerEvents: "none",
        width: mobile ? "100%" : "clamp(260px, 70vw, 300px)",
        maxWidth: "calc(100vw - 48px)",
        ...style,
      }}
      className="overflow-hidden rounded-2xl border border-border bg-white animate-reveal-up"
    >
      <div
        className="flex items-center justify-between gap-2 px-4 py-3"
        style={{
          background: `linear-gradient(135deg, ${DEEP_BLUE}, #1e5bb8)`,
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <span className="text-[11px] font-bold uppercase tracking-widest text-white">
          {node.label}
        </span>
        <span
          className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold"
          style={{ backgroundColor: `${GREEN}35`, color: GREEN }}
        >
          Active
        </span>
      </div>

      <div className="flex items-center gap-4 p-4">
        {image && (
          <div
            className="flex shrink-0 items-center justify-center overflow-hidden rounded-xl"
            style={{
              width: mobile ? 80 : 72,
              height: mobile ? 80 : 72,
              backgroundColor: BG_SECTION,
              border: `1px solid ${BORDER}`,
            }}
          >
            <Image
              src={image}
              alt={pump ? `${pump.fullName} pump used in ${node.label}` : `${node.label} diagram reference`}
              width={mobile ? 72 : 64}
              height={mobile ? 72 : 64}
              sizes={mobile ? "72px" : "64px"}
              className="object-contain p-1.5"
            />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold leading-tight" style={{ color: DEEP_BLUE }}>
            {title}
          </p>
          <p className="mt-1 text-xs leading-relaxed" style={{ color: TEXT_LIGHT }}>
            {node.role}
          </p>
        </div>
      </div>

      <div
        className={`grid ${pump ? "grid-cols-2" : "grid-cols-1"} divide-x`}
        style={{ borderTop: `1px solid ${BORDER}` }}
      >
        {pump ? (
          <>
            {[
              ["Flow Rate", pump.flowRate],
              ["Max Head", pump.maxHead],
            ].map(([label, value]) => (
              <div key={label} className="flex flex-col gap-1 px-4 py-3">
                <span
                  className="text-[10px] font-semibold uppercase tracking-wider"
                  style={{ color: TEXT_LIGHT }}
                >
                  {label}
                </span>
                <span
                  className="text-sm font-bold"
                  style={{ color: PRIMARY_BLUE, fontVariantNumeric: "tabular-nums" }}
                >
                  {value}
                </span>
              </div>
            ))}
          </>
        ) : (
          <div className="flex flex-col gap-1 px-4 py-3">
            <span
              className="text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: TEXT_LIGHT }}
            >
              Equipment Type
            </span>
            <span className="text-sm font-bold capitalize" style={{ color: PRIMARY_BLUE }}>
              {EQUIPMENT_LABELS[node.equipmentType]}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
