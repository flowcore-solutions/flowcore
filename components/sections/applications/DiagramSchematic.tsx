"use client";

import { useId, type JSX } from "react";
import type { ApplicationEnvironment, DiagramNode, EquipmentType } from "@/lib/application-data";

const PRIMARY_BLUE = "#1e5bb8";
const DEEP_BLUE = "#0f3d91";
const LIGHT_BLUE = "#4da3ff";
const PRIMARY_GREEN = "#6cc24a";
const DARK_GREEN = "#2fa84f";
const AMBER = "#f59e0b";
const SLATE = "#64748b";
const TEAL = "#0d9488";
const ROSE = "#e11d48";
const VIOLET = "#7c3aed";
const CYAN = "#0891b2";
const ORANGE = "#ea580c";

const BG_WHITE = "#ffffff";
const BG_SECTION = "#f8fafc";
const BORDER = "#e5e7eb";
const TEXT_LIGHT = "#64748b";
const TEXT_MID = "#94a3b8";
const PIPE_BASE = "#dde3ec";
const PIPE_SHADOW = "#c8d3de";

const LEFT_ANCHOR_THRESHOLD = 30;
const RIGHT_ANCHOR_THRESHOLD = 70;
const ICON_SCALE = 0.13;
const PUMP_SCALE_FACTOR = 0.1392857143;

const EQUIPMENT_ACCENT: Record<EquipmentType, string> = {
  "pump": PRIMARY_BLUE,
  "tank": LIGHT_BLUE,
  "filter": AMBER,
  "membrane": PRIMARY_GREEN,
  "blower": SLATE,
  "valve": DEEP_BLUE,
  "chiller": CYAN,
  "cooling-tower": TEAL,
  "clarifier": LIGHT_BLUE,
  "screen": SLATE,
  "header-manifold": DEEP_BLUE,
  "sump": LIGHT_BLUE,
  "deaerator": ORANGE,
  "boiler": ROSE,
  "flow-meter": VIOLET,
  "booster-system": PRIMARY_BLUE,
  "wet-well": TEAL,
  "sand-filter": AMBER,
  "media-filter": AMBER,
  "ro-vessel": PRIMARY_GREEN,
  "storage-tank": LIGHT_BLUE,
  "process-tank": CYAN,
};

const EQUIPMENT_LABEL: Record<EquipmentType, string> = {
  "pump": "Pump",
  "tank": "Tank",
  "filter": "Filter",
  "membrane": "Membrane",
  "blower": "Blower",
  "valve": "Valve",
  "chiller": "Chiller",
  "cooling-tower": "Cool Tower",
  "clarifier": "Clarifier",
  "screen": "Screen",
  "header-manifold": "Header",
  "sump": "Sump",
  "deaerator": "Deaerator",
  "boiler": "Boiler",
  "flow-meter": "Flow Meter",
  "booster-system": "Booster",
  "wet-well": "Wet Well",
  "sand-filter": "Sand Filter",
  "media-filter": "Media Filter",
  "ro-vessel": "RO Vessel",
  "storage-tank": "Storage",
  "process-tank": "Process Tank",
};

function IconFrame({
  children,
  sourceSize = 64,
  scale = ICON_SCALE,
}: {
  children: JSX.Element | JSX.Element[];
  sourceSize?: number;
  scale?: number;
}) {
  const offset = -(sourceSize * scale) / 2;

  return (
    <g>
      <g transform={`translate(${offset} ${offset})`}>
        <g transform={`scale(${scale})`}>{children}</g>
      </g>
    </g>
  );
}

function PumpIcon() {
  return (
    <IconFrame sourceSize={512} scale={ICON_SCALE * PUMP_SCALE_FACTOR}>
      <path
        d="M502.013 98.67c5.518-.007 9.987-4.482 9.987-10V47.794c0-5.523-4.477-10-10-10H385.64c-17.826 0-33.163 4.742-44.353 13.714-9.312 7.467-20.411 21.785-20.411 47.594v28.494h-2.501c-5.523 0-10 4.477-10 10v42.64h-18.806v-2.728c0-10.501-8.513-19.014-19.014-19.014h-27.637c-10.501 0-19.014 8.513-19.014 19.014v2.727H198.04v-13.669c0-18.55-15.104-33.642-33.668-33.642h-25.03c-18.565 0-33.669 15.092-33.669 33.642v14.099C46.562 185.712 0 235.43 0 295.827 0 356.21 46.518 405.922 105.588 411.01v43.196H10.343c-5.326 0-9.976 4.019-10.321 9.333-.378 5.824 4.235 10.667 9.978 10.667h491.657c5.326 0 9.977-4.019 10.321-9.334.378-5.824-4.235-10.666-9.978-10.666H190.274v-42.759h33.63v2.728c0 10.501 8.513 19.014 19.014 19.014h27.638c10.501 0 19.014-8.513 19.014-19.014v-2.728h140.063c5.523 0 10-4.477 10-10V359.94H502c5.523 0 10-4.477 10-10V241.741c0-5.523-4.477-10-10-10h-62.367v-41.506c0-5.523-4.477-10-10-10h-31.611v-42.64c0-5.523-4.477-10-10-10h-2.501s-.009-25.628.016-26.234c.052-1.294 1.028-2.526 2.323-2.534 2.583-.015 114.153-.157 114.153-.157zm-376.34 67.896c0-7.522 6.132-13.642 13.669-13.642h25.03c7.537 0 13.668 6.119 13.668 13.642v13.669h-52.367zm44.601 287.64h-44.686v-42.759h44.686zm-54.686-62.759C62.88 391.447 20 348.552 20 295.827c0-52.71 42.881-95.592 95.588-95.592h108.316v191.212zM492 251.741v88.199h-52.367v-88.199zm-72.367 98.199v41.507H289.569V340.7c0-5.522-4.478-10-10-10s-10 4.478-10 10v72.488h-25.665V178.494h25.665v72.403c0 5.522 4.478 10 10 10s10-4.478 10-10v-50.662h130.063V349.94zm-91.258-169.705v-32.64h49.647v32.64zm42.902-95.166c-5.253 5.351-5.866 12.481-5.757 18.77v23.757h-24.645V99.102c0-34.142 24.343-41.308 44.764-41.308H492v20.889l-101.569.129c-6.058 0-13.709.71-19.154 6.257z"
        fill="currentColor"
      />
      <path
        d="M188.607 285.827h-26.305c-5.523 0-10 4.478-10 10s4.477 10 10 10h26.305c5.523 0 10-4.478 10-10s-4.477-10-10-10zM188.607 235.852h-26.305c-5.523 0-10 4.478-10 10s4.477 10 10 10h26.305c5.523 0 10-4.478 10-10s-4.477-10-10-10zM188.607 335.831h-26.305c-5.523 0-10 4.478-10 10s4.477 10 10 10h26.305c5.523 0 10-4.478 10-10s-4.477-10-10-10zM279.569 285.799c-5.522 0-10 4.478-10 10v.028c0 5.522 4.478 9.986 10 9.986s10-4.492 10-10.015-4.477-9.999-10-9.999z"
        fill="currentColor"
      />
    </IconFrame>
  );
}

function TankIcon() {
  return (
    <IconFrame>
      <path d="M16 18 Q16 10 32 10 Q48 10 48 18 L48 48 Q48 54 32 54 Q16 54 16 48 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="miter" fill="none" />
      <ellipse cx="32" cy="18" rx="16" ry="5" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <line x1="32" y1="5" x2="32" y2="10" stroke="currentColor" strokeWidth="2.5" />
      <line x1="28" y1="5" x2="36" y2="5" stroke="currentColor" strokeWidth="2.5" />
      <line x1="32" y1="54" x2="32" y2="59" stroke="currentColor" strokeWidth="2.5" />
      <line x1="28" y1="59" x2="36" y2="59" stroke="currentColor" strokeWidth="2.5" />
      <line x1="18" y1="34" x2="46" y2="34" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
      <line x1="8" y1="62" x2="56" y2="62" stroke="currentColor" strokeWidth="2.5" />
    </IconFrame>
  );
}

function FilterIcon() {
  return (
    <IconFrame>
      <rect x="18" y="12" width="28" height="40" rx="2" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="miter" fill="none" />
      <line x1="32" y1="4" x2="32" y2="12" stroke="currentColor" strokeWidth="2.5" />
      <line x1="26" y1="4" x2="38" y2="4" stroke="currentColor" strokeWidth="2.5" />
      <line x1="32" y1="52" x2="32" y2="60" stroke="currentColor" strokeWidth="2.5" />
      <line x1="26" y1="60" x2="38" y2="60" stroke="currentColor" strokeWidth="2.5" />
      <line x1="22" y1="22" x2="42" y2="22" stroke="currentColor" strokeWidth="2" />
      <line x1="22" y1="28" x2="42" y2="28" stroke="currentColor" strokeWidth="2" />
      <line x1="22" y1="34" x2="42" y2="34" stroke="currentColor" strokeWidth="2" />
      <line x1="22" y1="40" x2="42" y2="40" stroke="currentColor" strokeWidth="2" />
      <line x1="10" y1="62" x2="54" y2="62" stroke="currentColor" strokeWidth="2.5" />
    </IconFrame>
  );
}

function MembraneIcon() {
  return (
    <IconFrame>
      <rect x="10" y="22" width="44" height="20" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="miter" fill="none" />
      <path d="M10 22 Q6 32 10 42" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <path d="M54 22 Q58 32 54 42" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <line x1="2" y1="32" x2="10" y2="32" stroke="currentColor" strokeWidth="2.5" />
      <line x1="2" y1="28" x2="2" y2="36" stroke="currentColor" strokeWidth="2.5" />
      <line x1="54" y1="32" x2="62" y2="32" stroke="currentColor" strokeWidth="2.5" />
      <line x1="62" y1="28" x2="62" y2="36" stroke="currentColor" strokeWidth="2.5" />
      <line x1="48" y1="42" x2="48" y2="52" stroke="currentColor" strokeWidth="2.5" />
      <line x1="44" y1="52" x2="52" y2="52" stroke="currentColor" strokeWidth="2.5" />
      <line x1="20" y1="22" x2="20" y2="42" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
      <line x1="32" y1="22" x2="32" y2="42" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
      <line x1="44" y1="22" x2="44" y2="42" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
      <line x1="4" y1="58" x2="60" y2="58" stroke="currentColor" strokeWidth="2.5" />
      <line x1="16" y1="42" x2="16" y2="58" stroke="currentColor" strokeWidth="2" />
      <line x1="48" y1="52" x2="48" y2="58" stroke="currentColor" strokeWidth="2" />
    </IconFrame>
  );
}

function BlowerIcon() {
  return (
    <IconFrame>
      <circle cx="28" cy="34" r="20" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <path d="M40 20 L40 10 L52 10 L52 6" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="miter" strokeLinecap="square" fill="none" />
      <line x1="46" y1="6" x2="58" y2="6" stroke="currentColor" strokeWidth="2.5" />
      <line x1="4" y1="34" x2="10" y2="34" stroke="currentColor" strokeWidth="2.5" />
      <line x1="4" y1="28" x2="4" y2="40" stroke="currentColor" strokeWidth="2.5" />
      <line x1="28" y1="20" x2="28" y2="26" stroke="currentColor" strokeWidth="2" />
      <line x1="28" y1="42" x2="28" y2="48" stroke="currentColor" strokeWidth="2" />
      <line x1="14" y1="34" x2="20" y2="34" stroke="currentColor" strokeWidth="2" />
      <line x1="36" y1="34" x2="42" y2="34" stroke="currentColor" strokeWidth="2" />
      <circle cx="28" cy="34" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
      <line x1="8" y1="58" x2="50" y2="58" stroke="currentColor" strokeWidth="2.5" />
      <line x1="14" y1="54" x2="14" y2="58" stroke="currentColor" strokeWidth="2" />
      <line x1="42" y1="54" x2="42" y2="58" stroke="currentColor" strokeWidth="2" />
    </IconFrame>
  );
}

function ValveIcon() {
  return (
    <IconFrame>
      <line x1="4" y1="28" x2="20" y2="28" stroke="currentColor" strokeWidth="2.5" />
      <line x1="4" y1="36" x2="20" y2="36" stroke="currentColor" strokeWidth="2.5" />
      <line x1="44" y1="28" x2="60" y2="28" stroke="currentColor" strokeWidth="2.5" />
      <line x1="44" y1="36" x2="60" y2="36" stroke="currentColor" strokeWidth="2.5" />
      <polygon points="20,24 20,40 32,32" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="miter" fill="none" />
      <polygon points="44,24 44,40 32,32" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="miter" fill="none" />
      <line x1="32" y1="16" x2="32" y2="24" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="32" cy="12" r="6" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <line x1="26" y1="12" x2="38" y2="12" stroke="currentColor" strokeWidth="2" />
      <line x1="32" y1="6" x2="32" y2="12" stroke="currentColor" strokeWidth="2" />
      <line x1="4" y1="54" x2="60" y2="54" stroke="currentColor" strokeWidth="2.5" />
    </IconFrame>
  );
}

function ChillerIcon() {
  return (
    <IconFrame>
      <rect x="8" y="14" width="48" height="36" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="miter" fill="none" />
      <circle cx="22" cy="32" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
      <line x1="36" y1="20" x2="50" y2="20" stroke="currentColor" strokeWidth="2" />
      <line x1="36" y1="26" x2="50" y2="26" stroke="currentColor" strokeWidth="2" />
      <line x1="36" y1="32" x2="50" y2="32" stroke="currentColor" strokeWidth="2" />
      <line x1="36" y1="38" x2="50" y2="38" stroke="currentColor" strokeWidth="2" />
      <line x1="36" y1="44" x2="50" y2="44" stroke="currentColor" strokeWidth="2" />
      <line x1="16" y1="50" x2="16" y2="58" stroke="currentColor" strokeWidth="2.5" />
      <line x1="28" y1="50" x2="28" y2="58" stroke="currentColor" strokeWidth="2.5" />
      <line x1="6" y1="60" x2="58" y2="60" stroke="currentColor" strokeWidth="2.5" />
      <text x="22" y="36" textAnchor="middle" fontFamily="Arial" fontSize="9" fontWeight="bold" fill="currentColor">C</text>
    </IconFrame>
  );
}

function CoolingTowerIcon() {
  return (
    <IconFrame>
      <path d="M18 8 L12 52 L52 52 L46 8 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="miter" fill="none" />
      <line x1="24" y1="8" x2="40" y2="8" stroke="currentColor" strokeWidth="2.5" />
      <line x1="32" y1="4" x2="32" y2="12" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="32" cy="8" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
      <line x1="16" y1="24" x2="48" y2="24" stroke="currentColor" strokeWidth="1.5" />
      <line x1="15" y1="32" x2="49" y2="32" stroke="currentColor" strokeWidth="1.5" />
      <line x1="14" y1="40" x2="50" y2="40" stroke="currentColor" strokeWidth="1.5" />
      <rect x="10" y="52" width="44" height="6" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="miter" fill="none" />
      <line x1="18" y1="58" x2="18" y2="62" stroke="currentColor" strokeWidth="2.5" />
      <line x1="46" y1="58" x2="46" y2="62" stroke="currentColor" strokeWidth="2.5" />
      <line x1="6" y1="62" x2="58" y2="62" stroke="currentColor" strokeWidth="2.5" />
    </IconFrame>
  );
}

function ClarifierIcon() {
  return (
    <IconFrame>
      <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <circle cx="32" cy="32" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
      <line x1="32" y1="32" x2="32" y2="10" stroke="currentColor" strokeWidth="2" />
      <line x1="32" y1="32" x2="54" y2="32" stroke="currentColor" strokeWidth="2" />
      <circle cx="32" cy="32" r="16" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
      <line x1="32" y1="54" x2="32" y2="62" stroke="currentColor" strokeWidth="2.5" />
      <line x1="54" y1="32" x2="62" y2="32" stroke="currentColor" strokeWidth="2.5" />
      <line x1="62" y1="28" x2="62" y2="36" stroke="currentColor" strokeWidth="2.5" />
      <line x1="8" y1="62" x2="58" y2="62" stroke="currentColor" strokeWidth="2.5" />
    </IconFrame>
  );
}

function ScreenIcon() {
  return (
    <IconFrame>
      <rect x="22" y="8" width="20" height="48" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="miter" fill="none" />
      <line x1="27" y1="8" x2="27" y2="56" stroke="currentColor" strokeWidth="2" />
      <line x1="32" y1="8" x2="32" y2="56" stroke="currentColor" strokeWidth="2" />
      <line x1="37" y1="8" x2="37" y2="56" stroke="currentColor" strokeWidth="2" />
      <line x1="10" y1="20" x2="22" y2="20" stroke="currentColor" strokeWidth="2.5" />
      <line x1="10" y1="44" x2="22" y2="44" stroke="currentColor" strokeWidth="2.5" />
      <line x1="42" y1="20" x2="54" y2="20" stroke="currentColor" strokeWidth="2.5" />
      <line x1="42" y1="44" x2="54" y2="44" stroke="currentColor" strokeWidth="2.5" />
      <line x1="6" y1="32" x2="14" y2="32" stroke="currentColor" strokeWidth="2" />
      <polyline points="11,28 15,32 11,36" stroke="currentColor" strokeWidth="2" strokeLinejoin="miter" fill="none" />
      <line x1="6" y1="58" x2="58" y2="58" stroke="currentColor" strokeWidth="2.5" />
    </IconFrame>
  );
}

function HeaderManifoldIcon() {
  return (
    <IconFrame>
      <rect x="6" y="26" width="52" height="12" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="miter" fill="none" />
      <line x1="16" y1="38" x2="16" y2="50" stroke="currentColor" strokeWidth="2.5" />
      <line x1="28" y1="38" x2="28" y2="50" stroke="currentColor" strokeWidth="2.5" />
      <line x1="40" y1="38" x2="40" y2="50" stroke="currentColor" strokeWidth="2.5" />
      <line x1="52" y1="38" x2="52" y2="50" stroke="currentColor" strokeWidth="2.5" />
      <line x1="12" y1="50" x2="20" y2="50" stroke="currentColor" strokeWidth="2.5" />
      <line x1="24" y1="50" x2="32" y2="50" stroke="currentColor" strokeWidth="2.5" />
      <line x1="36" y1="50" x2="44" y2="50" stroke="currentColor" strokeWidth="2.5" />
      <line x1="48" y1="50" x2="56" y2="50" stroke="currentColor" strokeWidth="2.5" />
      <line x1="6" y1="22" x2="6" y2="42" stroke="currentColor" strokeWidth="2.5" />
      <line x1="58" y1="22" x2="58" y2="42" stroke="currentColor" strokeWidth="2.5" />
      <line x1="6" y1="58" x2="58" y2="58" stroke="currentColor" strokeWidth="2.5" />
    </IconFrame>
  );
}

function SumpIcon() {
  return (
    <IconFrame>
      <path d="M10 20 L10 54 L54 54 L54 20" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="miter" fill="none" />
      <line x1="4" y1="20" x2="60" y2="20" stroke="currentColor" strokeWidth="2.5" />
      <line x1="12" y1="38" x2="52" y2="38" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />
      <rect x="26" y="42" width="12" height="10" stroke="currentColor" strokeWidth="2" fill="none" />
      <line x1="32" y1="30" x2="32" y2="42" stroke="currentColor" strokeWidth="2" />
      <line x1="38" y1="35" x2="54" y2="35" stroke="currentColor" strokeWidth="2.5" />
      <line x1="54" y1="31" x2="54" y2="39" stroke="currentColor" strokeWidth="2.5" />
      <line x1="10" y1="30" x2="4" y2="30" stroke="currentColor" strokeWidth="2.5" />
      <line x1="4" y1="26" x2="4" y2="34" stroke="currentColor" strokeWidth="2.5" />
      <line x1="4" y1="58" x2="60" y2="58" stroke="currentColor" strokeWidth="2.5" />
    </IconFrame>
  );
}

function DeaeratorIcon() {
  return (
    <IconFrame>
      <path d="M14 20 L50 20 Q58 20 58 30 Q58 42 50 42 L14 42 Q6 42 6 30 Q6 20 14 20 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="miter" fill="none" />
      <line x1="20" y1="20" x2="20" y2="26" stroke="currentColor" strokeWidth="2" />
      <line x1="32" y1="20" x2="32" y2="26" stroke="currentColor" strokeWidth="2" />
      <line x1="44" y1="20" x2="44" y2="26" stroke="currentColor" strokeWidth="2" />
      <line x1="18" y1="28" x2="22" y2="28" stroke="currentColor" strokeWidth="2" />
      <line x1="30" y1="28" x2="34" y2="28" stroke="currentColor" strokeWidth="2" />
      <line x1="42" y1="28" x2="46" y2="28" stroke="currentColor" strokeWidth="2" />
      <line x1="32" y1="12" x2="32" y2="20" stroke="currentColor" strokeWidth="2.5" />
      <line x1="28" y1="12" x2="36" y2="12" stroke="currentColor" strokeWidth="2.5" />
      <line x1="2" y1="31" x2="6" y2="31" stroke="currentColor" strokeWidth="2.5" />
      <line x1="32" y1="42" x2="32" y2="50" stroke="currentColor" strokeWidth="2.5" />
      <line x1="18" y1="42" x2="14" y2="56" stroke="currentColor" strokeWidth="2.5" />
      <line x1="46" y1="42" x2="50" y2="56" stroke="currentColor" strokeWidth="2.5" />
      <line x1="6" y1="58" x2="58" y2="58" stroke="currentColor" strokeWidth="2.5" />
    </IconFrame>
  );
}

function BoilerIcon() {
  return (
    <IconFrame>
      <rect x="12" y="14" width="36" height="36" rx="3" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="miter" fill="none" />
      <path d="M12 14 Q12 8 30 8 Q48 8 48 14" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <line x1="30" y1="4" x2="30" y2="8" stroke="currentColor" strokeWidth="2.5" />
      <line x1="26" y1="4" x2="34" y2="4" stroke="currentColor" strokeWidth="2.5" />
      <line x1="42" y1="8" x2="42" y2="4" stroke="currentColor" strokeWidth="2" />
      <line x1="39" y1="4" x2="45" y2="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="22" cy="34" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="38" cy="34" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="30" cy="24" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
      <line x1="48" y1="22" x2="54" y2="22" stroke="currentColor" strokeWidth="2" />
      <line x1="48" y1="40" x2="54" y2="40" stroke="currentColor" strokeWidth="2" />
      <line x1="54" y1="20" x2="54" y2="42" stroke="currentColor" strokeWidth="2" />
      <line x1="16" y1="50" x2="16" y2="56" stroke="currentColor" strokeWidth="2.5" />
      <line x1="6" y1="60" x2="58" y2="60" stroke="currentColor" strokeWidth="2.5" />
    </IconFrame>
  );
}

function FlowMeterIcon() {
  return (
    <IconFrame>
      <line x1="4" y1="28" x2="18" y2="28" stroke="currentColor" strokeWidth="2.5" />
      <line x1="4" y1="36" x2="18" y2="36" stroke="currentColor" strokeWidth="2.5" />
      <line x1="46" y1="28" x2="60" y2="28" stroke="currentColor" strokeWidth="2.5" />
      <line x1="46" y1="36" x2="60" y2="36" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="14" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <path d="M22 36 A12 12 0 0 1 42 36" stroke="currentColor" strokeWidth="2" fill="none" />
      <line x1="32" y1="32" x2="38" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
      <circle cx="32" cy="32" r="2" fill="currentColor" />
      <line x1="21" y1="30" x2="23" y2="31" stroke="currentColor" strokeWidth="1.5" />
      <line x1="32" y1="20" x2="32" y2="22" stroke="currentColor" strokeWidth="1.5" />
      <line x1="43" y1="30" x2="41" y2="31" stroke="currentColor" strokeWidth="1.5" />
      <line x1="4" y1="58" x2="60" y2="58" stroke="currentColor" strokeWidth="2.5" />
    </IconFrame>
  );
}

function BoosterSystemIcon() {
  return (
    <IconFrame>
      <rect x="6" y="10" width="52" height="8" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="miter" fill="none" />
      <rect x="6" y="46" width="52" height="8" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="miter" fill="none" />
      <rect x="12" y="18" width="12" height="28" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="18" cy="32" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="32" y="18" width="12" height="28" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="38" cy="32" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
      <line x1="2" y1="14" x2="6" y2="14" stroke="currentColor" strokeWidth="2.5" />
      <line x1="58" y1="14" x2="62" y2="14" stroke="currentColor" strokeWidth="2.5" />
      <line x1="62" y1="10" x2="62" y2="22" stroke="currentColor" strokeWidth="2.5" />
      <line x1="4" y1="58" x2="60" y2="58" stroke="currentColor" strokeWidth="2.5" />
    </IconFrame>
  );
}

function WetWellIcon() {
  return (
    <IconFrame>
      <rect x="14" y="22" width="36" height="34" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="miter" fill="none" />
      <line x1="4" y1="22" x2="60" y2="22" stroke="currentColor" strokeWidth="2.5" />
      <rect x="24" y="16" width="16" height="8" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="miter" fill="none" />
      <line x1="16" y1="42" x2="48" y2="42" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />
      <line x1="4" y1="32" x2="14" y2="32" stroke="currentColor" strokeWidth="2.5" />
      <line x1="4" y1="28" x2="4" y2="36" stroke="currentColor" strokeWidth="2.5" />
      <rect x="26" y="46" width="12" height="8" stroke="currentColor" strokeWidth="2" fill="none" />
      <line x1="32" y1="36" x2="32" y2="46" stroke="currentColor" strokeWidth="2" />
      <line x1="50" y1="38" x2="60" y2="38" stroke="currentColor" strokeWidth="2.5" />
      <line x1="60" y1="34" x2="60" y2="42" stroke="currentColor" strokeWidth="2.5" />
      <line x1="4" y1="62" x2="60" y2="62" stroke="currentColor" strokeWidth="2.5" />
    </IconFrame>
  );
}

function SandFilterIcon() {
  return (
    <IconFrame>
      <path d="M16 16 Q16 8 32 8 Q48 8 48 16 L48 50 Q48 56 32 56 Q16 56 16 50 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="miter" fill="none" />
      <ellipse cx="32" cy="16" rx="16" ry="5" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <line x1="32" y1="3" x2="32" y2="8" stroke="currentColor" strokeWidth="2.5" />
      <line x1="28" y1="3" x2="36" y2="3" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="24" cy="30" r="1.5" fill="currentColor" />
      <circle cx="30" cy="28" r="1.5" fill="currentColor" />
      <circle cx="36" cy="30" r="1.5" fill="currentColor" />
      <circle cx="42" cy="28" r="1.5" fill="currentColor" />
      <circle cx="24" cy="36" r="1.5" fill="currentColor" />
      <circle cx="30" cy="38" r="1.5" fill="currentColor" />
      <circle cx="36" cy="36" r="1.5" fill="currentColor" />
      <circle cx="42" cy="36" r="1.5" fill="currentColor" />
      <line x1="18" y1="44" x2="46" y2="44" stroke="currentColor" strokeWidth="2" />
      <line x1="32" y1="56" x2="32" y2="62" stroke="currentColor" strokeWidth="2.5" />
      <line x1="28" y1="62" x2="36" y2="62" stroke="currentColor" strokeWidth="2.5" />
      <line x1="8" y1="62" x2="56" y2="62" stroke="currentColor" strokeWidth="2.5" />
    </IconFrame>
  );
}

function MediaFilterIcon() {
  return (
    <IconFrame>
      <path d="M16 16 Q16 8 32 8 Q48 8 48 16 L48 50 Q48 56 32 56 Q16 56 16 50 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="miter" fill="none" />
      <ellipse cx="32" cy="16" rx="16" ry="5" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <line x1="32" y1="3" x2="32" y2="8" stroke="currentColor" strokeWidth="2.5" />
      <line x1="28" y1="3" x2="36" y2="3" stroke="currentColor" strokeWidth="2.5" />
      <line x1="18" y1="26" x2="46" y2="26" stroke="currentColor" strokeWidth="2.5" />
      <line x1="18" y1="34" x2="46" y2="34" stroke="currentColor" strokeWidth="2.5" />
      <line x1="18" y1="42" x2="46" y2="42" stroke="currentColor" strokeWidth="2.5" />
      <line x1="22" y1="22" x2="26" y2="26" stroke="currentColor" strokeWidth="1.5" />
      <line x1="28" y1="22" x2="32" y2="26" stroke="currentColor" strokeWidth="1.5" />
      <line x1="34" y1="22" x2="38" y2="26" stroke="currentColor" strokeWidth="1.5" />
      <line x1="22" y1="36" x2="26" y2="40" stroke="currentColor" strokeWidth="1.5" />
      <line x1="28" y1="36" x2="32" y2="40" stroke="currentColor" strokeWidth="1.5" />
      <line x1="34" y1="36" x2="38" y2="40" stroke="currentColor" strokeWidth="1.5" />
      <line x1="32" y1="56" x2="32" y2="62" stroke="currentColor" strokeWidth="2.5" />
      <line x1="28" y1="62" x2="36" y2="62" stroke="currentColor" strokeWidth="2.5" />
      <line x1="8" y1="62" x2="56" y2="62" stroke="currentColor" strokeWidth="2.5" />
    </IconFrame>
  );
}

function RoVesselIcon() {
  return (
    <IconFrame>
      <rect x="8" y="22" width="48" height="20" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="miter" fill="none" />
      <path d="M8 22 Q4 32 8 42" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <path d="M56 22 Q60 32 56 42" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <line x1="2" y1="32" x2="8" y2="32" stroke="currentColor" strokeWidth="2.5" />
      <line x1="2" y1="28" x2="2" y2="36" stroke="currentColor" strokeWidth="2.5" />
      <line x1="32" y1="14" x2="32" y2="22" stroke="currentColor" strokeWidth="2.5" />
      <line x1="28" y1="14" x2="36" y2="14" stroke="currentColor" strokeWidth="2.5" />
      <line x1="56" y1="32" x2="62" y2="32" stroke="currentColor" strokeWidth="2.5" />
      <line x1="62" y1="28" x2="62" y2="36" stroke="currentColor" strokeWidth="2.5" />
      <line x1="18" y1="22" x2="18" y2="42" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
      <line x1="28" y1="22" x2="28" y2="42" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
      <line x1="38" y1="22" x2="38" y2="42" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
      <line x1="48" y1="22" x2="48" y2="42" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
      <line x1="16" y1="42" x2="14" y2="54" stroke="currentColor" strokeWidth="2.5" />
      <line x1="48" y1="42" x2="50" y2="54" stroke="currentColor" strokeWidth="2.5" />
      <line x1="6" y1="56" x2="58" y2="56" stroke="currentColor" strokeWidth="2.5" />
    </IconFrame>
  );
}

function StorageTankIcon() {
  return (
    <IconFrame>
      <rect x="10" y="20" width="44" height="36" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="miter" fill="none" />
      <path d="M10 20 L32 8 L54 20" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="miter" fill="none" />
      <line x1="32" y1="4" x2="32" y2="8" stroke="currentColor" strokeWidth="2.5" />
      <line x1="28" y1="4" x2="36" y2="4" stroke="currentColor" strokeWidth="2.5" />
      <line x1="10" y1="32" x2="54" y2="32" stroke="currentColor" strokeWidth="1.5" />
      <line x1="10" y1="44" x2="54" y2="44" stroke="currentColor" strokeWidth="1.5" />
      <line x1="54" y1="26" x2="60" y2="26" stroke="currentColor" strokeWidth="2.5" />
      <line x1="60" y1="22" x2="60" y2="30" stroke="currentColor" strokeWidth="2.5" />
      <line x1="32" y1="56" x2="32" y2="62" stroke="currentColor" strokeWidth="2.5" />
      <line x1="16" y1="56" x2="14" y2="62" stroke="currentColor" strokeWidth="2.5" />
      <line x1="48" y1="56" x2="50" y2="62" stroke="currentColor" strokeWidth="2.5" />
      <line x1="6" y1="62" x2="58" y2="62" stroke="currentColor" strokeWidth="2.5" />
    </IconFrame>
  );
}

function ProcessTankIcon() {
  return (
    <IconFrame>
      <rect x="12" y="14" width="40" height="40" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="miter" fill="none" />
      <line x1="12" y1="14" x2="52" y2="14" stroke="currentColor" strokeWidth="2.5" />
      <rect x="26" y="8" width="12" height="8" stroke="currentColor" strokeWidth="2" fill="none" />
      <line x1="32" y1="14" x2="32" y2="44" stroke="currentColor" strokeWidth="2" />
      <line x1="20" y1="38" x2="44" y2="38" stroke="currentColor" strokeWidth="2.5" />
      <line x1="22" y1="44" x2="42" y2="44" stroke="currentColor" strokeWidth="2" />
      <rect x="28" y="4" width="8" height="6" stroke="currentColor" strokeWidth="2" fill="none" />
      <line x1="6" y1="24" x2="12" y2="24" stroke="currentColor" strokeWidth="2.5" />
      <line x1="6" y1="20" x2="6" y2="28" stroke="currentColor" strokeWidth="2.5" />
      <line x1="52" y1="44" x2="58" y2="44" stroke="currentColor" strokeWidth="2.5" />
      <line x1="58" y1="40" x2="58" y2="48" stroke="currentColor" strokeWidth="2.5" />
      <line x1="16" y1="54" x2="14" y2="62" stroke="currentColor" strokeWidth="2.5" />
      <line x1="48" y1="54" x2="50" y2="62" stroke="currentColor" strokeWidth="2.5" />
      <line x1="6" y1="62" x2="58" y2="62" stroke="currentColor" strokeWidth="2.5" />
    </IconFrame>
  );
}

const ICON_MAP: Record<EquipmentType, () => JSX.Element> = {
  "pump": PumpIcon,
  "tank": TankIcon,
  "filter": FilterIcon,
  "membrane": MembraneIcon,
  "blower": BlowerIcon,
  "valve": ValveIcon,
  "chiller": ChillerIcon,
  "cooling-tower": CoolingTowerIcon,
  "clarifier": ClarifierIcon,
  "screen": ScreenIcon,
  "header-manifold": HeaderManifoldIcon,
  "sump": SumpIcon,
  "deaerator": DeaeratorIcon,
  "boiler": BoilerIcon,
  "flow-meter": FlowMeterIcon,
  "booster-system": BoosterSystemIcon,
  "wet-well": WetWellIcon,
  "sand-filter": SandFilterIcon,
  "media-filter": MediaFilterIcon,
  "ro-vessel": RoVesselIcon,
  "storage-tank": StorageTankIcon,
  "process-tank": ProcessTankIcon,
};

function getLabelAnchor(x: number): { anchor: "start" | "middle" | "end"; textX: number } {
  if (x < LEFT_ANCHOR_THRESHOLD) return { anchor: "start", textX: x - 5.5 };
  if (x > RIGHT_ANCHOR_THRESHOLD) return { anchor: "end", textX: x + 5.5 };
  return { anchor: "middle", textX: x };
}

function isHoverPointer(pt: string) {
  return pt === "mouse";
}

interface DiagramSchematicProps {
  env: ApplicationEnvironment;
  activeNodeId: string | null;
  onNodeEnter: (node: DiagramNode) => void;
  onNodeLeave: () => void;
}

export default function DiagramSchematic({ env, activeNodeId, onNodeEnter, onNodeLeave }: DiagramSchematicProps) {
  const uid = useId();
  const gridId = `${uid}-grid`;
  const glowId = `${uid}-glow`;
  const activeGlowId = `${uid}-active-glow`;
  const flowGradId = `${uid}-flow-grad`;

  const nodes = [...env.diagramNodes];
  const pipes = nodes.slice(0, -1).map((n, i) => {
    const next = nodes[i + 1];
    const midX = (n.x + next.x) / 2;
    return { key: `${n.id}-${next.id}`, d: `M ${n.x} ${n.y} H ${midX} V ${next.y} H ${next.x}`, midX };
  });

  const presentTypes = (Object.keys(EQUIPMENT_ACCENT) as EquipmentType[])
    .filter((type) => env.diagramNodes.some((n) => n.equipmentType === type));

  return (
    <div
      className="w-full overflow-hidden rounded-2xl select-none"
      style={{ background: BG_WHITE, border: `1.5px solid ${BORDER}`, boxShadow: "0 4px 28px 0 rgba(15,61,145,0.07)" }}
    >
      <svg
        viewBox="0 0 100 70"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: "block", width: "100%", aspectRatio: "100 / 70" }}
        role="img"
        aria-label={`${env.name} system schematic`}
        xmlns="http://www.w3.org/2000/svg"
        onPointerDown={onNodeLeave}
      >
        <defs>
          <pattern id={gridId} width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="7" cy="7" r="0.42" fill={BORDER} />
          </pattern>
          <filter id={glowId} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
            <feColorMatrix in="blur" type="matrix" values="0 0.2 0.9 0 0  0 0.2 0.9 0 0  0 0 1 0 0  0 0 0 0.28 0" result="c" />
            <feMerge><feMergeNode in="c" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id={activeGlowId} x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feColorMatrix in="blur" type="matrix" values="0.2 0.8 0.25 0 0  0.2 0.8 0.25 0 0  0 0 0 0 0  0 0 0 0.52 0" result="c" />
            <feMerge><feMergeNode in="c" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id={flowGradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={PRIMARY_GREEN} stopOpacity="0.1" />
            <stop offset="50%" stopColor={PRIMARY_GREEN} stopOpacity="0.9" />
            <stop offset="100%" stopColor={PRIMARY_GREEN} stopOpacity="0.1" />
          </linearGradient>
        </defs>

        <rect width="100" height="70" fill={BG_WHITE} />
        <rect width="100" height="70" fill={`url(#${gridId})`} />

        {pipes.map((p) => (
          <path key={`sh-${p.key}`} d={p.d} fill="none" stroke={PIPE_SHADOW} strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
        ))}
        {pipes.map((p) => (
          <path key={`base-${p.key}`} d={p.d} fill="none" stroke={PIPE_BASE} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        ))}
        {pipes.map((p) => (
          <path key={`flow-${p.key}`} className="flow-line" d={p.d} fill="none" stroke={`url(#${flowGradId})`} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
        ))}
        {pipes.map((p, i) => {
          const n = nodes[i];
          const next = nodes[i + 1];
          return (
            <g key={`elbow-${p.key}`}>
              <circle cx={p.midX} cy={n.y} r="1.1" fill={BG_WHITE} stroke={BORDER} strokeWidth="0.5" />
              <circle cx={p.midX} cy={next.y} r="1.1" fill={BG_WHITE} stroke={BORDER} strokeWidth="0.5" />
            </g>
          );
        })}

        {nodes.map((node, idx) => {
          const type = node.equipmentType;
          const isActive = activeNodeId === node.id;
          const accent = EQUIPMENT_ACCENT[type] ?? PRIMARY_BLUE;
          const ringColor = isActive ? PRIMARY_GREEN : accent;
          const innerFill = isActive ? "#ecfce7" : BG_SECTION;
          const iconColor = isActive ? PRIMARY_GREEN : accent;
          const badgeFill = isActive ? PRIMARY_GREEN : DEEP_BLUE;
          const labelFill = isActive ? DARK_GREEN : TEXT_LIGHT;
          const IconComp = ICON_MAP[type] ?? PumpIcon;
          const { anchor, textX } = getLabelAnchor(node.x);

          return (
            <g
              key={node.id}
              transform={`translate(${node.x}, ${node.y})`}
              style={{ cursor: "pointer", outline: "none", WebkitTapHighlightColor: "transparent" }}
              onPointerDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
                if (isHoverPointer(e.pointerType)) return;
                isActive ? onNodeLeave() : onNodeEnter(node);
              }}
              onPointerEnter={(e) => {
                if (isHoverPointer(e.pointerType)) onNodeEnter(node);
              }}
              onPointerLeave={(e) => {
                if (isHoverPointer(e.pointerType)) onNodeLeave();
              }}
              aria-label={node.label}
              role="button"
              tabIndex={0}
              onFocus={() => onNodeEnter(node)}
              onBlur={onNodeLeave}
              onKeyDown={(e) => {
                if (e.key !== "Enter" && e.key !== " ") return;
                e.preventDefault();
                isActive ? onNodeLeave() : onNodeEnter(node);
              }}
              filter={isActive ? `url(#${activeGlowId})` : `url(#${glowId})`}
            >
              {isActive && (
                <>
                  <circle r="9" fill={`${PRIMARY_GREEN}16`} stroke="none">
                    <animate attributeName="r" values="6;10;6" dur="1.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.35;0;0.35" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                  <circle r="6.5" fill="none" stroke={PRIMARY_GREEN} strokeWidth="0.45" opacity="0.5">
                    <animate attributeName="r" values="5;8;5" dur="1.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0.04;0.6" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                </>
              )}

              <circle r={isActive ? "6.8" : "6"} fill={BG_WHITE} stroke={ringColor} strokeWidth={isActive ? "1.5" : "1.2"} style={{ transition: "all 0.25s ease" }} />
              <circle r={isActive ? "5" : "4.2"} fill={innerFill} style={{ transition: "all 0.25s ease" }} />

              <g color={iconColor} style={{ transition: "color 0.25s ease" }}>
                <IconComp />
              </g>

              <g transform="translate(4.8, -5.4)">
                <circle r="2.05" fill={badgeFill} stroke={BG_WHITE} strokeWidth="0.5" style={{ transition: "fill 0.25s ease" }} />
                <text textAnchor="middle" dominantBaseline="central" fontSize="2.1" fontFamily="var(--font-poppins), ui-sans-serif" fontWeight="700" fill={BG_WHITE} style={{ userSelect: "none" }}>
                  {idx + 1}
                </text>
              </g>

              <text
                x={textX - node.x}
                y="13.4"
                textAnchor={anchor}
                fontSize={isActive ? "3.15" : "2.85"}
                fontFamily="var(--font-poppins), ui-sans-serif"
                fontWeight={isActive ? "700" : "500"}
                fill={labelFill}
                style={{ transition: "all 0.25s ease", userSelect: "none" }}
                letterSpacing="-0.02"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 px-4 py-2.5" style={{ borderTop: `1px solid ${BORDER}` }}>
        <div className="flex items-center gap-2">
          <svg width="22" height="6" aria-hidden="true">
            <line x1="0" y1="3" x2="22" y2="3" stroke={PRIMARY_GREEN} strokeWidth="2" strokeDasharray="5 3" />
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: DARK_GREEN }}>
            Active Flow
          </span>
        </div>
        {presentTypes.map((type) => (
          <div key={type} className="flex items-center gap-1.5">
            <svg width="10" height="10" aria-hidden="true">
              <circle cx="5" cy="5" r="4" fill="none" stroke={EQUIPMENT_ACCENT[type]} strokeWidth="1.4" />
              <circle cx="5" cy="5" r="1.5" fill={EQUIPMENT_ACCENT[type]} />
            </svg>
            <span className="text-[10px] font-medium uppercase tracking-widest" style={{ color: TEXT_LIGHT }}>
              {EQUIPMENT_LABEL[type]}
            </span>
          </div>
        ))}
        <span className="ml-auto text-[9px] font-semibold uppercase tracking-[0.14em]" style={{ color: TEXT_MID }}>
          {env.shortName} - Berlington System
        </span>
      </div>
    </div>
  );
}
