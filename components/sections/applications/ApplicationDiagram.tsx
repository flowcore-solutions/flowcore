"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
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
    <div className="relative">
      <DiagramSchematic
        env={env}
        activeNodeId={activeNode?.id ?? null}
        onNodeEnter={setActiveNode}
        onNodeLeave={() => setActiveNode(null)}
      />

      {/* Hover tooltip */}
      <AnimatePresence>
        {activeNode && (
          <PumpTooltip
            key={activeNode.id}
            node={activeNode}
            anchorX={activeNode.x}
            anchorY={activeNode.y}
          />
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 items-stretch ${
        reversed ? "lg:grid-cols-[3fr_2fr]" : ""
      }`}
    >
      {reversed ? (
        <>
          {diagramContent}
          <EnvironmentInfo env={env} activeNode={activeNode} />
        </>
      ) : (
        <>
          <EnvironmentInfo env={env} activeNode={activeNode} />
          {diagramContent}
        </>
      )}
    </div>
  );
}
