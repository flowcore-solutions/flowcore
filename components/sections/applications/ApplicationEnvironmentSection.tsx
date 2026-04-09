"use client";

import type { ApplicationEnvironment } from "@/lib/application-data";
import ApplicationDiagram from "./ApplicationDiagram";
import PrecisionReveal from "@/components/ui/PrecisionReveal";

interface ApplicationEnvironmentSectionProps {
  env: ApplicationEnvironment;
  index: number;
  isLast: boolean;
}

export default function ApplicationEnvironmentSection({
  env,
  index,
  isLast,
}: ApplicationEnvironmentSectionProps) {
  return (
    <section
      id={`env-${env.id}`}
      aria-labelledby={`env-heading-${env.id}`}
      className={index % 2 === 0 ? "bg-white" : "bg-section-bg"}
    >
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 id={`env-heading-${env.id}`} className="sr-only">
          {env.name}
        </h2>

        <PrecisionReveal
          variant={index % 2 === 0 ? "fadeSlideLeft" : "fadeSlideRight"}
        >
          <ApplicationDiagram env={env} reversed={index % 2 !== 0} />
        </PrecisionReveal>
      </div>

      {!isLast && (
        <div className="mx-auto max-w-6xl px-6">
          <div className="border-t border-border" />
        </div>
      )}
    </section>
  );
}
