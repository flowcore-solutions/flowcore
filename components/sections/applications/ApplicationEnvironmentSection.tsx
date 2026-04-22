import dynamic from "next/dynamic";
import type { ApplicationEnvironment } from "@/lib/application-data";
const ApplicationDiagram = dynamic(() => import("./ApplicationDiagram"), {
  ssr: true,
});
import PrecisionReveal from "@/components/ui/PrecisionReveal";

interface ApplicationEnvironmentSectionProps {
  env: ApplicationEnvironment;
  index: number;
}

export default function ApplicationEnvironmentSection({
  env,
  index,
}: ApplicationEnvironmentSectionProps) {
  const isEven = index % 2 === 0;

  return (
    <section
      id={`env-${env.id}`}
      aria-labelledby={`env-heading-${env.id}`}
      className="relative"
      // KEY FIX: removed overflow-hidden from the section.
      // It was clipping the desktop tooltip whenever it extended beyond the
      // section boundary. The bg pattern div below handles its own overflow.
      style={{ backgroundColor: "#f8fafc" }}
    >
      {/* Background pattern — contained in its own div so it doesn't affect tooltip overflow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #0F172A 0, #0F172A 1px, transparent 1px, transparent 20px)`,
          opacity: 0.025,
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-10">
        <h2 id={`env-heading-${env.id}`} className="sr-only">
          {env.name}
        </h2>

        <PrecisionReveal variant={isEven ? "fadeSlideLeft" : "fadeSlideRight"}>
          <ApplicationDiagram env={env} reversed={!isEven} />
        </PrecisionReveal>
      </div>
    </section>
  );
}