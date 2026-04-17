"use client";

import { useState } from "react";
import type { ApplicationEnvironment, DiagramNode } from "@/lib/application-data";
import DiagramSchematic from "./DiagramSchematic";
import PumpTooltip from "./PumpTooltip";
import EnvironmentInfo from "./EnvironmentInfo";

interface ApplicationDiagramProps {
  env: ApplicationEnvironment;
  /** Reverse layout: diagram on left, text on right */
  reversed?: boolean;
}

export default function ApplicationDiagram({
  env,
  reversed = false,
}: ApplicationDiagramProps) {
  const [activeNode, setActiveNode] = useState<DiagramNode | null>(null);

  const diagramContent = (
    <div className={`relative order-1 ${reversed ? "lg:order-1" : "lg:order-2"}`}>
      <DiagramSchematic
        env={env}
        activeNodeId={activeNode?.id ?? null}
        onNodeEnter={setActiveNode}
        onNodeLeave={() => setActiveNode(null)}
      />

      {/* Hover tooltip */}
      {activeNode && (
        <PumpTooltip
          key={activeNode.id}
          node={activeNode}
          anchorX={activeNode.x}
          anchorY={activeNode.y}
        />
      )}
    </div>
  );

  const infoContent = (
    <div className={`order-2 ${reversed ? "lg:order-2" : "lg:order-1"}`}>
      <EnvironmentInfo env={env} activeNode={activeNode} />
    </div>
  );

  return (
    <div
      className={`grid grid-cols-1 items-stretch gap-8 ${
        reversed ? "lg:grid-cols-[3fr_2fr]" : "lg:grid-cols-[2fr_3fr]"
      }`}
    >
      {diagramContent}
      {infoContent}
    </div>
  );
}
