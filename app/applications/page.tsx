/**
 * Applications Page (/applications)
 *
 * Refactored to use modular components for better maintainability.
 */

import type { Metadata } from "next";
import { APPLICATION_ENVIRONMENTS } from "@/lib/application-data";
import ApplicationsHeader from "@/components/sections/applications/ApplicationsHeader";
import ApplicationEnvironmentSection from "@/components/sections/applications/ApplicationEnvironmentSection";
import ApplicationsCTA from "@/components/sections/applications/ApplicationsCTA";

export const metadata: Metadata = {
  title: "Applications — Industrial Pump System Solutions",
  description:
    "See how Berlington pump systems are engineered into Water Treatment Plants, HVAC systems, agricultural irrigation, and industrial processing circuits. Interactive technical diagrams with pump specifications.",
};

export default function ApplicationsPage() {
  return (
    <div className="bg-white">
      <ApplicationsHeader />

      <main id="main-environments">
        {APPLICATION_ENVIRONMENTS.map((env, i) => (
          <ApplicationEnvironmentSection
            key={env.id}
            env={env}
            index={i}
            isLast={i === APPLICATION_ENVIRONMENTS.length - 1}
          />
        ))}
      </main>

      <ApplicationsCTA />
    </div>
  );
}
