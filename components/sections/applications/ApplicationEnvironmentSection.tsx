"use client";

import dynamic from "next/dynamic";
import type { ApplicationEnvironment } from "@/lib/application-data";

// Lazy-load so React Flow only loads client-side (it uses browser APIs)
const ApplicationDiagram = dynamic(() => import("./ApplicationDiagram"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height:     360,
        background: "#f4f7fb",
        border:     "1.5px solid #dde5ef",
        borderRadius: 16,
        display:    "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span style={{ fontSize: 12, color: "#94a8bc", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
        Loading schematic…
      </span>
    </div>
  ),
});

interface ApplicationEnvironmentSectionProps {
  env:   ApplicationEnvironment;
  index: number;
}

export default function ApplicationEnvironmentSection({ env, index }: ApplicationEnvironmentSectionProps) {
  const isEven = index % 2 === 0;

  return (
    <section
      id={`env-${env.id}`}
      aria-labelledby={`env-heading-${env.id}`}
      className="relative"
      style={{ backgroundColor: "#f4f7fb" }}
    >
      {/* Background texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #0f2744 0, #0f2744 1px, transparent 1px, transparent 22px)`,
          opacity: 0.018,
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-10">
        <h2 id={`env-heading-${env.id}`} className="sr-only">
          {env.name}
        </h2>

        <ApplicationDiagram env={env} reversed={!isEven} />
      </div>
    </section>
  );
}