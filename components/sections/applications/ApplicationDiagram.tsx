"use client";

import { useState, useLayoutEffect } from "react";
import type { ApplicationEnvironment, DiagramNode } from "@/lib/application-data";
import DiagramSchematic from "./DiagramSchematic";
import EnvironmentInfo from "./EnvironmentInfo";

interface ApplicationDiagramProps {
  env:      ApplicationEnvironment;
  reversed?: boolean;
}

export default function ApplicationDiagram({ env, reversed = false }: ApplicationDiagramProps) {
  const [activeNode, setActiveNode] = useState<DiagramNode | null>(null);
  const [isMobile, setIsMobile]     = useState(false);

  useLayoutEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div
        className={`grid grid-cols-1 items-stretch gap-6 lg:gap-8 ${
          reversed ? "lg:grid-cols-[3fr_2fr]" : "lg:grid-cols-[2fr_3fr]"
        }`}
      >
        {/* ── Diagram column ─────────────────────────────────────── */}
        <div
          className={`relative order-2 ${reversed ? "lg:order-1" : "lg:order-2"}`}
          style={{ overflow: "visible" }}
        >
          <DiagramSchematic
            env={env}
            activeNodeId={activeNode?.id ?? null}
            onNodeEnter={setActiveNode}
            onNodeLeave={() => setActiveNode(null)}
            isMobile={isMobile}
          />


        </div>

        {/* ── Info column ────────────────────────────────────────── */}
        <div className={`order-1 ${reversed ? "lg:order-2" : "lg:order-1"}`}>
          <EnvironmentInfo env={env} activeNode={activeNode} />
        </div>
      </div>
    </div>
  );
}