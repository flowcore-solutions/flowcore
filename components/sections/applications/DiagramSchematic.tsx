"use client";

import { useCallback, useMemo, type JSX } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  type Node,
  type Edge,
  type NodeProps,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { ApplicationEnvironment, DiagramNode, EquipmentType } from "@/lib/application-data";
import PumpTooltip from "./PumpTooltip";

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  navy:        "#0f2744",
  blue:        "#1a4b8c",
  blueMid:     "#2461b5",
  blueLight:   "#3a7bd5",
  steelGray:   "#4a6080",
  midGray:     "#7a8ea8",
  lightGray:   "#b8c8d8",
  border:      "#dde5ef",
  bgSheet:     "#f4f7fb",
  bgWhite:     "#ffffff",
  bgNode:      "#f8fafd",
  amber:       "#c87c10",
  amberLight:  "#f5a623",
  green:       "#2d7a4f",
  greenLight:  "#3da868",
  teal:        "#147a7a",
  rose:        "#b02840",
  violet:      "#5b35a0",
  orange:      "#b05515",
  cyan:        "#0e6e8c",
  text:        "#1a2a3a",
  textMid:     "#3a5070",
  textLight:   "#6a7f98",
  textMuted:   "#94a8bc",
  pipeMain:    "#8aa5c8",
  pipeReturn:  "#a0b8d0",
  pipeBranch:  "#b0c5d8",
  pipeBypass:  "#d4921a",
} as const;

// ─── Equipment accent colors ──────────────────────────────────────────────────
const ACCENT: Record<EquipmentType, string> = {
  pump:               T.blueMid,
  tank:               T.cyan,
  filter:             T.amber,
  membrane:           T.green,
  blower:             T.steelGray,
  valve:              T.navy,
  chiller:            T.teal,
  "cooling-tower":    T.teal,
  clarifier:          T.cyan,
  screen:             T.steelGray,
  "header-manifold":  T.navy,
  sump:               T.cyan,
  deaerator:          T.orange,
  boiler:             T.rose,
  "flow-meter":       T.violet,
  "booster-system":   T.blueMid,
  "wet-well":         T.teal,
  "sand-filter":      T.amber,
  "media-filter":     T.amber,
  "ro-vessel":        T.green,
  "storage-tank":     T.cyan,
  "process-tank":     T.teal,
};

const EQUIPMENT_LABEL: Record<EquipmentType, string> = {
  pump:               "Pump",
  tank:               "Tank",
  filter:             "Filter",
  membrane:           "Membrane",
  blower:             "Blower",
  valve:              "Valve",
  chiller:            "Chiller",
  "cooling-tower":    "Cool Tower",
  clarifier:          "Clarifier",
  screen:             "Screen",
  "header-manifold":  "Manifold",
  sump:               "Sump",
  deaerator:          "Deaerator",
  boiler:             "Boiler",
  "flow-meter":       "Flow Meter",
  "booster-system":   "Booster",
  "wet-well":         "Wet Well",
  "sand-filter":      "Sand Filter",
  "media-filter":     "Media Filter",
  "ro-vessel":        "RO Vessel",
  "storage-tank":     "Storage",
  "process-tank":     "Process Tank",
};

// ─── SVG icon helpers ─────────────────────────────────────────────────────────
const ICON_SCALE = 0.88;
const PUMP_EXTRA = 0.11;

function IconWrap({ size = 64, scale = ICON_SCALE, children }: { size?: number; scale?: number; children: JSX.Element | JSX.Element[] }) {
  const off = 32 - (size * scale) / 2;
  return (
    <g transform={`translate(${off},${off}) scale(${scale})`}>
      {children}
    </g>
  );
}

function PumpSVG() {
  return (
    <IconWrap size={512} scale={ICON_SCALE * PUMP_EXTRA}>
      <path d="M502.013 98.67c5.518-.007 9.987-4.482 9.987-10V47.794c0-5.523-4.477-10-10-10H385.64c-17.826 0-33.163 4.742-44.353 13.714-9.312 7.467-20.411 21.785-20.411 47.594v28.494h-2.501c-5.523 0-10 4.477-10 10v42.64h-18.806v-2.728c0-10.501-8.513-19.014-19.014-19.014h-27.637c-10.501 0-19.014 8.513-19.014 19.014v2.727H198.04v-13.669c0-18.55-15.104-33.642-33.668-33.642h-25.03c-18.565 0-33.669 15.092-33.669 33.642v14.099C46.562 185.712 0 235.43 0 295.827 0 356.21 46.518 405.922 105.588 411.01v43.196H10.343c-5.326 0-9.976 4.019-10.321 9.333-.378 5.824 4.235 10.667 9.978 10.667h491.657c5.326 0 9.977-4.019 10.321-9.334.378-5.824-4.235-10.666-9.978-10.666H190.274v-42.759h33.63v2.728c0 10.501 8.513 19.014 19.014 19.014h27.638c10.501 0 19.014-8.513 19.014-19.014v-2.728h140.063c5.523 0 10-4.477 10-10V359.94H502c5.523 0 10-4.477 10-10V241.741c0-5.523-4.477-10-10-10h-62.367v-41.506c0-5.523-4.477-10-10-10h-31.611v-42.64c0-5.523-4.477-10-10-10h-2.501s-.009-25.628.016-26.234c.052-1.294 1.028-2.526 2.323-2.534 2.583-.015 114.153-.157 114.153-.157z" fill="currentColor"/>
      <path d="M188.607 285.827h-26.305c-5.523 0-10 4.478-10 10s4.477 10 10 10h26.305c5.523 0 10-4.478 10-10s-4.477-10-10-10zM188.607 235.852h-26.305c-5.523 0-10 4.478-10 10s4.477 10 10 10h26.305c5.523 0 10-4.478 10-10s-4.477-10-10-10zM188.607 335.831h-26.305c-5.523 0-10 4.478-10 10s4.477 10 10 10h26.305c5.523 0 10-4.478 10-10s-4.477-10-10-10z" fill="currentColor"/>
    </IconWrap>
  );
}

function TankSVG() {
  return (
    <IconWrap>
      <path d="M16 18 Q16 10 32 10 Q48 10 48 18 L48 48 Q48 54 32 54 Q16 54 16 48 Z" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <ellipse cx="32" cy="18" rx="16" ry="5" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <line x1="32" y1="5" x2="32" y2="10" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="28" y1="5" x2="36" y2="5" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="32" y1="54" x2="32" y2="59" stroke="currentColor" strokeWidth="2.5"/>
    </IconWrap>
  );
}

function FilterSVG() {
  return (
    <IconWrap>
      <rect x="18" y="12" width="28" height="40" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <line x1="32" y1="4" x2="32" y2="12" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="26" y1="4" x2="38" y2="4" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="32" y1="52" x2="32" y2="60" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="22" y1="22" x2="42" y2="22" stroke="currentColor" strokeWidth="2"/>
      <line x1="22" y1="28" x2="42" y2="28" stroke="currentColor" strokeWidth="2"/>
      <line x1="22" y1="34" x2="42" y2="34" stroke="currentColor" strokeWidth="2"/>
      <line x1="22" y1="40" x2="42" y2="40" stroke="currentColor" strokeWidth="2"/>
    </IconWrap>
  );
}

function MembraneSVG() {
  return (
    <IconWrap>
      <rect x="10" y="22" width="44" height="20" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M10 22 Q6 32 10 42" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M54 22 Q58 32 54 42" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <line x1="2" y1="32" x2="10" y2="32" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="54" y1="32" x2="62" y2="32" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="20" y1="22" x2="20" y2="42" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2"/>
      <line x1="32" y1="22" x2="32" y2="42" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2"/>
      <line x1="44" y1="22" x2="44" y2="42" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2"/>
    </IconWrap>
  );
}

function BlowerSVG() {
  return (
    <IconWrap>
      <circle cx="28" cy="34" r="20" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M40 20 L40 10 L52 10 L52 6" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <line x1="46" y1="6" x2="58" y2="6" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="4" y1="34" x2="10" y2="34" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="4" y1="28" x2="4" y2="40" stroke="currentColor" strokeWidth="2.5"/>
      <circle cx="28" cy="34" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
    </IconWrap>
  );
}

function ValveSVG() {
  return (
    <IconWrap>
      <line x1="4" y1="28" x2="20" y2="28" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="4" y1="36" x2="20" y2="36" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="44" y1="28" x2="60" y2="28" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="44" y1="36" x2="60" y2="36" stroke="currentColor" strokeWidth="2.5"/>
      <polygon points="20,24 20,40 32,32" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <polygon points="44,24 44,40 32,32" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <line x1="32" y1="16" x2="32" y2="24" stroke="currentColor" strokeWidth="2.5"/>
      <circle cx="32" cy="12" r="6" stroke="currentColor" strokeWidth="2.5" fill="none"/>
    </IconWrap>
  );
}

function ChillerSVG() {
  return (
    <IconWrap>
      <rect x="8" y="14" width="48" height="36" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <circle cx="22" cy="32" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
      <line x1="36" y1="20" x2="50" y2="20" stroke="currentColor" strokeWidth="2"/>
      <line x1="36" y1="26" x2="50" y2="26" stroke="currentColor" strokeWidth="2"/>
      <line x1="36" y1="32" x2="50" y2="32" stroke="currentColor" strokeWidth="2"/>
      <line x1="36" y1="38" x2="50" y2="38" stroke="currentColor" strokeWidth="2"/>
      <line x1="36" y1="44" x2="50" y2="44" stroke="currentColor" strokeWidth="2"/>
    </IconWrap>
  );
}

function CoolingTowerSVG() {
  return (
    <IconWrap>
      <path d="M18 8 L12 52 L52 52 L46 8 Z" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <line x1="24" y1="8" x2="40" y2="8" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="16" y1="24" x2="48" y2="24" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="15" y1="32" x2="49" y2="32" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="14" y1="40" x2="50" y2="40" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="10" y="52" width="44" height="6" stroke="currentColor" strokeWidth="2.5" fill="none"/>
    </IconWrap>
  );
}

function ClarifierSVG() {
  return (
    <IconWrap>
      <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <circle cx="32" cy="32" r="7" stroke="currentColor" strokeWidth="2" fill="none"/>
      <line x1="32" y1="32" x2="32" y2="10" stroke="currentColor" strokeWidth="2"/>
      <line x1="32" y1="32" x2="54" y2="32" stroke="currentColor" strokeWidth="2"/>
      <circle cx="32" cy="32" r="16" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" fill="none"/>
    </IconWrap>
  );
}

function ScreenSVG() {
  return (
    <IconWrap>
      <rect x="22" y="8" width="20" height="48" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <line x1="27" y1="8" x2="27" y2="56" stroke="currentColor" strokeWidth="2"/>
      <line x1="32" y1="8" x2="32" y2="56" stroke="currentColor" strokeWidth="2"/>
      <line x1="37" y1="8" x2="37" y2="56" stroke="currentColor" strokeWidth="2"/>
      <line x1="10" y1="20" x2="22" y2="20" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="42" y1="20" x2="54" y2="20" stroke="currentColor" strokeWidth="2.5"/>
    </IconWrap>
  );
}

function HeaderManifoldSVG() {
  return (
    <IconWrap>
      <rect x="6" y="26" width="52" height="12" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <line x1="16" y1="38" x2="16" y2="50" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="28" y1="38" x2="28" y2="50" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="40" y1="38" x2="40" y2="50" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="52" y1="38" x2="52" y2="50" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="6" y1="22" x2="6" y2="42" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="58" y1="22" x2="58" y2="42" stroke="currentColor" strokeWidth="2.5"/>
    </IconWrap>
  );
}

function SumpSVG() {
  return (
    <IconWrap>
      <path d="M10 20 L10 54 L54 54 L54 20" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <line x1="4" y1="20" x2="60" y2="20" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="12" y1="38" x2="52" y2="38" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2"/>
      <rect x="26" y="42" width="12" height="10" stroke="currentColor" strokeWidth="2" fill="none"/>
    </IconWrap>
  );
}

function DeaeratorSVG() {
  return (
    <IconWrap>
      <path d="M14 20 L50 20 Q58 20 58 30 Q58 42 50 42 L14 42 Q6 42 6 30 Q6 20 14 20 Z" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <line x1="20" y1="20" x2="20" y2="26" stroke="currentColor" strokeWidth="2"/>
      <line x1="32" y1="20" x2="32" y2="26" stroke="currentColor" strokeWidth="2"/>
      <line x1="44" y1="20" x2="44" y2="26" stroke="currentColor" strokeWidth="2"/>
      <line x1="32" y1="12" x2="32" y2="20" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="28" y1="12" x2="36" y2="12" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="2" y1="31" x2="6" y2="31" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="32" y1="42" x2="32" y2="50" stroke="currentColor" strokeWidth="2.5"/>
    </IconWrap>
  );
}

function BoilerSVG() {
  return (
    <IconWrap>
      <rect x="12" y="14" width="36" height="36" rx="3" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M12 14 Q12 8 30 8 Q48 8 48 14" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <line x1="30" y1="4" x2="30" y2="8" stroke="currentColor" strokeWidth="2.5"/>
      <circle cx="22" cy="34" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="38" cy="34" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="30" cy="24" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
      <line x1="16" y1="50" x2="16" y2="56" stroke="currentColor" strokeWidth="2.5"/>
    </IconWrap>
  );
}

function FlowMeterSVG() {
  return (
    <IconWrap>
      <line x1="4" y1="28" x2="18" y2="28" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="4" y1="36" x2="18" y2="36" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="46" y1="28" x2="60" y2="28" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="46" y1="36" x2="60" y2="36" stroke="currentColor" strokeWidth="2.5"/>
      <circle cx="32" cy="32" r="14" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M22 36 A12 12 0 0 1 42 36" stroke="currentColor" strokeWidth="2" fill="none"/>
      <line x1="32" y1="32" x2="38" y2="24" stroke="currentColor" strokeWidth="2"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
    </IconWrap>
  );
}

function BoosterSVG() {
  return (
    <IconWrap>
      <rect x="6" y="10" width="52" height="8" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <rect x="6" y="46" width="52" height="8" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <rect x="12" y="18" width="12" height="28" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="18" cy="32" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
      <rect x="32" y="18" width="12" height="28" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="38" cy="32" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
      <line x1="2" y1="14" x2="6" y2="14" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="58" y1="14" x2="62" y2="14" stroke="currentColor" strokeWidth="2.5"/>
    </IconWrap>
  );
}

function WetWellSVG() {
  return (
    <IconWrap>
      <rect x="14" y="22" width="36" height="34" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <line x1="4" y1="22" x2="60" y2="22" stroke="currentColor" strokeWidth="2.5"/>
      <rect x="24" y="16" width="16" height="8" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <line x1="16" y1="42" x2="48" y2="42" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2"/>
      <line x1="4" y1="32" x2="14" y2="32" stroke="currentColor" strokeWidth="2.5"/>
    </IconWrap>
  );
}

function SandFilterSVG() {
  return (
    <IconWrap>
      <path d="M16 16 Q16 8 32 8 Q48 8 48 16 L48 50 Q48 56 32 56 Q16 56 16 50 Z" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <ellipse cx="32" cy="16" rx="16" ry="5" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <circle cx="24" cy="30" r="1.5" fill="currentColor"/>
      <circle cx="30" cy="28" r="1.5" fill="currentColor"/>
      <circle cx="36" cy="30" r="1.5" fill="currentColor"/>
      <circle cx="42" cy="28" r="1.5" fill="currentColor"/>
      <circle cx="24" cy="36" r="1.5" fill="currentColor"/>
      <circle cx="30" cy="38" r="1.5" fill="currentColor"/>
      <circle cx="36" cy="36" r="1.5" fill="currentColor"/>
      <line x1="18" y1="44" x2="46" y2="44" stroke="currentColor" strokeWidth="2"/>
    </IconWrap>
  );
}

function MediaFilterSVG() {
  return (
    <IconWrap>
      <path d="M16 16 Q16 8 32 8 Q48 8 48 16 L48 50 Q48 56 32 56 Q16 56 16 50 Z" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <ellipse cx="32" cy="16" rx="16" ry="5" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <line x1="18" y1="26" x2="46" y2="26" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="18" y1="34" x2="46" y2="34" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="18" y1="42" x2="46" y2="42" stroke="currentColor" strokeWidth="2.5"/>
    </IconWrap>
  );
}

function RoVesselSVG() {
  return (
    <IconWrap>
      <rect x="8" y="22" width="48" height="20" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M8 22 Q4 32 8 42" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M56 22 Q60 32 56 42" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <line x1="2" y1="32" x2="8" y2="32" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="56" y1="32" x2="62" y2="32" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="18" y1="22" x2="18" y2="42" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2"/>
      <line x1="28" y1="22" x2="28" y2="42" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2"/>
      <line x1="38" y1="22" x2="38" y2="42" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2"/>
      <line x1="48" y1="22" x2="48" y2="42" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2"/>
    </IconWrap>
  );
}

function StorageTankSVG() {
  return (
    <IconWrap>
      <rect x="10" y="20" width="44" height="36" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M10 20 L32 8 L54 20" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <line x1="10" y1="32" x2="54" y2="32" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="10" y1="44" x2="54" y2="44" stroke="currentColor" strokeWidth="1.5"/>
    </IconWrap>
  );
}

function ProcessTankSVG() {
  return (
    <IconWrap>
      <rect x="12" y="14" width="40" height="40" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <line x1="12" y1="14" x2="52" y2="14" stroke="currentColor" strokeWidth="2.5"/>
      <rect x="26" y="8" width="12" height="8" stroke="currentColor" strokeWidth="2" fill="none"/>
      <line x1="32" y1="14" x2="32" y2="44" stroke="currentColor" strokeWidth="2"/>
      <line x1="20" y1="38" x2="44" y2="38" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="6" y1="24" x2="12" y2="24" stroke="currentColor" strokeWidth="2.5"/>
      <line x1="52" y1="44" x2="58" y2="44" stroke="currentColor" strokeWidth="2.5"/>
    </IconWrap>
  );
}

const ICON_MAP: Record<EquipmentType, () => JSX.Element> = {
  pump:               PumpSVG,
  tank:               TankSVG,
  filter:             FilterSVG,
  membrane:           MembraneSVG,
  blower:             BlowerSVG,
  valve:              ValveSVG,
  chiller:            ChillerSVG,
  "cooling-tower":    CoolingTowerSVG,
  clarifier:          ClarifierSVG,
  screen:             ScreenSVG,
  "header-manifold":  HeaderManifoldSVG,
  sump:               SumpSVG,
  deaerator:          DeaeratorSVG,
  boiler:             BoilerSVG,
  "flow-meter":       FlowMeterSVG,
  "booster-system":   BoosterSVG,
  "wet-well":         WetWellSVG,
  "sand-filter":      SandFilterSVG,
  "media-filter":     MediaFilterSVG,
  "ro-vessel":        RoVesselSVG,
  "storage-tank":     StorageTankSVG,
  "process-tank":     ProcessTankSVG,
};

// ─── Node sizing ──────────────────────────────────────────────────────────────
function getNodeDims(node: DiagramNode): { w: number; h: number } {
  const scale = node.customScale ?? 1;
  let base;
  if (node.isBranchNode) base = { w: 82, h: 82 };
  else if (node.equipmentType === "pump" || node.equipmentType === "booster-system") base = { w: 118, h: 118 };
  else base = { w: 104, h: 104 };
  
  return { w: base.w * scale, h: base.h * scale };
}

// ─── React Flow custom node ───────────────────────────────────────────────────
interface EquipmentNodeData {
  diagramNode: DiagramNode;
  isActive: boolean;
  index: number;
}

function EquipmentNode({ data }: NodeProps) {
  const { diagramNode, isActive, index } = data as unknown as EquipmentNodeData;
  const { equipmentType, label, isBranchNode } = diagramNode;
  const accent = ACCENT[equipmentType] ?? T.blueMid;
  const { w, h } = getNodeDims(diagramNode);
  const IconComp = ICON_MAP[equipmentType] ?? PumpSVG;

  const outerR = isBranchNode ? 12 : 16;
  const badgeSize = isBranchNode ? 18 : 22;

  return (
    <div
      style={{
        width:         w,
        height:        h,
        position:      "relative",
        display:       "flex",
        flexDirection: "column",
        alignItems:    "center",
        userSelect:    "none",
      }}
    >
      {/* Handles for React Flow edges */}
      <Handle type="target" position={Position.Left}  style={{ opacity: 0, pointerEvents: "none" }} />
      <Handle type="source" position={Position.Right} style={{ opacity: 0, pointerEvents: "none" }} />
      <Handle type="target" position={Position.Top}   style={{ opacity: 0, pointerEvents: "none" }} />
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0, pointerEvents: "none" }} />

      {/* Card circle */}
      <div
        style={{
          width:          w,
          height:         w,
          borderRadius:   outerR,
          background:     isActive ? `${accent}14` : T.bgNode,
          border:         `${isActive ? 2 : 1.5}px solid ${isActive ? accent : `${accent}55`}`,
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "center",
          justifyContent: "center",
          transition:     "all 0.2s ease",
          position:       "relative",
          cursor:         "pointer",
          boxSizing:      "border-box",
        }}
      >
        {/* Inner ring for pump/booster */}
        {(equipmentType === "pump" || equipmentType === "booster-system") && (
          <div
            style={{
              position:    "absolute",
              inset:       6,
              borderRadius: outerR - 4,
              border:      `1px solid ${accent}28`,
              pointerEvents: "none",
            }}
          />
        )}

        {/* Icon */}
        <svg
          width={isBranchNode ? 42 : 58}
          height={isBranchNode ? 42 : 58}
          viewBox="0 0 64 64"
          style={{ color: isActive ? accent : `${accent}cc`, transition: "color 0.2s ease" }}
          aria-hidden="true"
        >
          <IconComp />
        </svg>

        {/* Type label inside (small, only for primary nodes) */}
        {!isBranchNode && (
          <span
            style={{
              fontSize:      9,
              fontWeight:    750,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color:         isActive ? accent : `${accent}99`,
              marginTop:     4,
              transition:    "color 0.2s ease",
              lineHeight:    1,
            }}
          >
            {EQUIPMENT_LABEL[equipmentType]}
          </span>
        )}

        {/* Sequential badge */}
        <div
          style={{
            position:       "absolute",
            top:            -badgeSize / 2 + 2,
            right:          -badgeSize / 2 + 2,
            width:          badgeSize,
            height:         badgeSize,
            borderRadius:   "50%",
            background:     isActive ? accent : T.navy,
            border:         `2px solid ${T.bgWhite}`,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            transition:     "background 0.2s ease",
          }}
        >
          <span
            style={{
              fontSize:  isBranchNode ? 8 : 10,
              fontWeight: 800,
              color:     T.bgWhite,
              lineHeight: 1,
            }}
          >
            {index + 1}
          </span>
        </div>
      </div>

      {/* Label below card */}
      <div
        style={{
          marginTop:      8,
          fontSize:       isBranchNode ? 11 : 13,
          fontWeight:     isActive ? 700 : 600,
          color:          isActive ? accent : T.textMid,
          textAlign:      "center",
          letterSpacing:  "-0.01em",
          lineHeight:     1.2,
          maxWidth:       isBranchNode ? 80 : 110,
          transition:     "all 0.2s ease",
          wordBreak:      "break-word",
        }}
      >
        {label}
      </div>
    </div>
  );
}

const NODE_TYPES = { equipment: EquipmentNode };

// ─── Edge styles ──────────────────────────────────────────────────────────────
const EDGE_DEFAULTS = {
  main:   { stroke: T.pipeMain,   strokeWidth: 3.2,  strokeDasharray: undefined, animated: true,  opacity: 1.0 },
  trunk:  { stroke: T.pipeMain,   strokeWidth: 4.2,  strokeDasharray: undefined, animated: true,  opacity: 1.0 },
  return: { stroke: T.pipeReturn, strokeWidth: 2.0,  strokeDasharray: "6 4",     animated: false, opacity: 0.6 },
  branch: { stroke: T.pipeBranch, strokeWidth: 2.0,  strokeDasharray: undefined, animated: false, opacity: 0.8 },
  bypass: { stroke: T.pipeBypass, strokeWidth: 2.0,  strokeDasharray: "5 3",     animated: false, opacity: 0.8 },
};

// ─── Main component ───────────────────────────────────────────────────────────
interface DiagramSchematicProps {
  env: ApplicationEnvironment;
  activeNodeId: string | null;
  onNodeEnter: (node: DiagramNode) => void;
  onNodeLeave: () => void;
  isMobile?: boolean;
}

export default function DiagramSchematic({
  env,
  activeNodeId,
  onNodeEnter,
  onNodeLeave,
  isMobile = false
}: DiagramSchematicProps) {

  // Build React Flow nodes from DiagramNode[]
  // The existing x/y are in a 0..100 / 0..70 viewBox space.
  // We scale to a pixel canvas: x*9, y*9.8 → roughly 900×686 canvas for fitView.
  const rfNodes: Node[] = useMemo(() =>
    env.diagramNodes.map((dn, idx) => {
      const { w, h } = getNodeDims(dn);
      return {
        id:   dn.id,
        type: "equipment",
        position: {
          x: dn.x * 9 - w / 2,
          y: dn.y * 9.5 - h / 2,
        },
        initialWidth: w,
        initialHeight: h,
        data: {
          diagramNode: dn,
          isActive:    activeNodeId === dn.id,
          index:       idx,
        } satisfies EquipmentNodeData,
        selectable: true,
        draggable:  false,
      } satisfies Node;
    }),
    [env.diagramNodes, activeNodeId]
  );

  // Build React Flow edges from PipeRoute[]
  const rfEdges: Edge[] = useMemo(() =>
    env.pipes.map((p) => {
      const style = EDGE_DEFAULTS[p.style ?? "main"];
      return {
        id:             p.id,
        source:         p.from,
        target:         p.to,
        type:           "smoothstep",
        animated:       style.animated,
        markerEnd:      p.hasArrow ? {
          type:   "arrowclosed" as const,
          color:  style.stroke,
          width:  14,
          height: 14,
        } : undefined,
        style: {
          stroke:          style.stroke,
          strokeWidth:     style.strokeWidth,
          strokeDasharray: style.strokeDasharray,
          opacity:         style.opacity,
        },
      } satisfies Edge;
    }),
    [env.pipes]
  );

  const handleNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      const dn = (node.data as unknown as EquipmentNodeData).diagramNode;
      if (activeNodeId === dn.id) {
        onNodeLeave();
      } else {
        onNodeEnter(dn);
      }
    },
    [activeNodeId, onNodeEnter, onNodeLeave]
  );

  const handlePaneClick = useCallback(() => {
    onNodeLeave();
  }, [onNodeLeave]);

  // Collect legend types
  const IGNORED_LEGEND_TYPES = new Set<EquipmentType>(["valve", "header-manifold", "sump", "wet-well"]);
  const presentTypes = (Object.keys(ACCENT) as EquipmentType[]).filter(
    (t) => t !== "pump" && !IGNORED_LEGEND_TYPES.has(t) && env.diagramNodes.some((n) => n.equipmentType === t)
  );

  const activeNode = useMemo(() =>
    env.diagramNodes.find((dn) => dn.id === activeNodeId) || null,
    [env.diagramNodes, activeNodeId]
  );

  return (
    <div
      style={{
        background:   T.bgWhite,
        border:       `1.5px solid ${T.border}`,
        borderRadius: 16,
        overflow:     "hidden",
        boxShadow:    "0 2px 20px rgba(15,39,68,0.07)",
      }}
    >
      {/* ── React Flow canvas ─────────────────────────────────────── */}
      <div 
        className="w-full relative h-[340px] md:h-[420px] lg:h-[620px]"
        style={{ position: "relative" }}
      >
        {/* Custom dotted grid overlay (behind RF) */}
        <div
          aria-hidden="true"
          style={{
            position:           "absolute",
            inset:              0,
            backgroundImage:    `radial-gradient(circle, ${T.border} 1px, transparent 1px)`,
            backgroundSize:     "20px 20px",
            pointerEvents:      "none",
            zIndex:             0,
          }}
        />

        {isMobile && (
          <div
            style={{
              position: "absolute",
              top: 8,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
              pointerEvents: "none",
              background: "rgba(15,39,68,0.7)",
              color: "#fff",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.08em",
              padding: "3px 10px",
              borderRadius: 20,
              backdropFilter: "blur(4px)",
            }}
          >
            Pinch to zoom · Drag to pan
          </div>
        )}

        <ReactFlow
          key={`${env.shortName}-${isMobile ? "mobile" : "desktop"}`}
          nodes={rfNodes}
          edges={rfEdges}
          nodeTypes={NODE_TYPES}
          fitView
          fitViewOptions={{ padding: 0.08, maxZoom: 1.2 }}
          onInit={(instance) => {
            setTimeout(() => instance.fitView({ padding: 0.08, maxZoom: 1.2 }), 50);
          }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={true}
          zoomOnScroll={false}
          zoomOnPinch={true}
          panOnScroll={false}
          panOnDrag={true}
          preventScrolling={false}
          minZoom={0.3}
          maxZoom={2.0}
          onNodeMouseEnter={handleNodeClick}
          onNodeMouseLeave={handlePaneClick}
          onNodeClick={handleNodeClick}
          onPaneClick={handlePaneClick}
          proOptions={{ hideAttribution: true }}
          style={{ background: "transparent" }}
          aria-label={`${env.name} system schematic`}
        >
          {/* Subtle inner grid via RF Background */}
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            color={`${T.border}80`}
            style={{ background: "transparent" }}
          />
        </ReactFlow>

        {/* Floating tooltip overlay inside canvas container */}
        {activeNode && (
          <div
            className="block"
            style={{
              position:      "absolute",
              zIndex:        40,
              pointerEvents: "none",
              left:          isMobile ? 12 : `${activeNode.x}%`,
              right:         isMobile ? 12 : undefined,
              bottom:        isMobile ? 12 : undefined,
              top:           isMobile ? undefined : `${(activeNode.y / 70) * 100}%`,
              transform:     isMobile
                ? "none"
                : `translate(${activeNode.x > 52 ? "calc(-100% - 14px)" : "14px"}, -40%)`,
            }}
          >
            <PumpTooltip node={activeNode} mobile={isMobile} />
          </div>
        )}

        {/* System label watermark */}
        <div
          aria-hidden="true"
          style={{
            position:      "absolute",
            bottom:        10,
            right:         14,
            fontSize:      9,
            fontWeight:    700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color:         T.textMuted,
            pointerEvents: "none",
            zIndex:        10,
          }}
        >
          {env.shortName} — Schematic View
        </div>
      </div>

      {/* ── Legend strip ──────────────────────────────────────────── */}
      <div
        style={{
          borderTop:  `1px solid ${T.border}`,
          padding:    "8px 16px",
          display:    "flex",
          flexWrap:   "wrap",
          gap:        "8px 14px",
          alignItems: "center",
          background: T.bgSheet,
        }}
      >
        {/* Pipe legend items */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="24" height="6" aria-hidden="true">
            <line x1="0" y1="3" x2="24" y2="3" stroke={T.pipeMain} strokeWidth="3.2" />
          </svg>
          <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: T.blueLight }}>
            Main Flow
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="24" height="6" aria-hidden="true">
            <line x1="0" y1="3" x2="24" y2="3" stroke={T.pipeReturn} strokeWidth="2.2" strokeDasharray="5 3" />
          </svg>
          <span style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: T.textLight }}>
            Return
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="24" height="6" aria-hidden="true">
            <line x1="0" y1="3" x2="24" y2="3" stroke={T.pipeBypass} strokeWidth="2.0" strokeDasharray="4 3" />
          </svg>
          <span style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: T.amber }}>
            Bypass
          </span>
        </div>

        {/* Equipment type dots */}
        {presentTypes.slice(0, 5).map((type) => (
          <div key={type} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <svg width="12" height="12" aria-hidden="true">
              <rect x="1" y="1" width="10" height="10" rx="2" fill="none" stroke={ACCENT[type]} strokeWidth="1.8" />
              <rect x="3" y="3" width="6" height="6" rx="1" fill={ACCENT[type]} />
            </svg>
            <span style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: T.textLight }}>
              {EQUIPMENT_LABEL[type]}
            </span>
          </div>
        ))}
      </div>

      {/* ── Inline styles for RF animated edges ─────────────────── */}
      <style>{`
        .react-flow__edge-path {
          transition: stroke 0.2s ease, opacity 0.2s ease;
        }
        .react-flow__node:focus { outline: none; }
        .react-flow__node:focus-visible .react-flow__node-equipment > div:first-child {
          outline: 2px solid ${T.blueLight};
          outline-offset: 2px;
        }
        /* animated main flow dashes */
        @keyframes rfFlowDash {
          from { stroke-dashoffset: 24; }
          to   { stroke-dashoffset: 0; }
        }
        .react-flow__edge.animated .react-flow__edge-path {
          stroke-dasharray: 8 4;
          animation: rfFlowDash 1.2s linear infinite;
        }
      `}</style>
    </div>
  );
}