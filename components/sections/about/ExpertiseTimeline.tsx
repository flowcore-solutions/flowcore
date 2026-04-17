
/**
 * ExpertiseTimeline — Industrial vertical-line motif.
 *
 * A single 2px Deep Blue vertical line runs down the left.
 * Timeline items "hang" off it via a horizontal connector,
 * like engineering annotations on a schematic.
 *
 * Viewport-triggered: each item fires its PrecisionReveal fadeSlideLeft
 * as it enters the viewport, with a 0.07s stagger between the
 * dot/connector and the card.
 */

import Image from "next/image";
import PrecisionReveal from "@/components/ui/PrecisionReveal";
import manufactureProcess from "@/app/assets/pumps/manufacture-process.png";
import factoryOutlet from "@/app/assets/pumps/factory-outlet.png";

// ── Types ─────────────────────────────────────────────────────────────────

interface TimelineItem {
  year: string;
  heading: string;
  body: string;
  image?: Parameters<typeof Image>[0]["src"];
  imageAlt?: string;
  accent: "blue" | "green";
}

// ── Timeline data — FlowCore/Berlington partnership story ─────────────────

const TIMELINE: readonly TimelineItem[] = [
  {
    year: "Est.",
    heading: "Berlington Manufacturing — Founded on Precision",
    body: "Berlington Industrial Pumps was established with a singular focus: manufacturing vertical multistage and submersible pumps to the highest engineering tolerances. ISO-certified production lines and rigorous QC form the core of every unit that leaves the factory.",
    image: manufactureProcess,
    imageAlt: "Berlington manufacturing facility — pump assembly line",
    accent: "blue",
  },
  {
    year: "Scale",
    heading: "Building a Pan-India Distribution Network",
    body: "FlowCore Solutions partnered with Berlington to establish a direct distribution network spanning major industrial corridors — bringing Berlington pump systems to water treatment plants, commercial HVAC projects, and industrial processing facilities across India with reduced lead times.",
    image: factoryOutlet,
    imageAlt: "FlowCore distribution centre — Berlington pump stock",
    accent: "blue",
  },
  {
    year: "Today",
    heading: "Flowchar — Engineering Water System Health",
    body: "Recognising that pump longevity depends as much on water chemistry as mechanical quality, FlowCore introduced the Flowchar range — ISO-certified scale inhibitors, coagulants, and biocide treatments engineered to protect Berlington systems and extend operational life in WTP and industrial applications.",
    accent: "green",
  },
  {
    year: "Vision",
    heading: "Complete Fluid Infrastructure Partnership",
    body: "FlowCore's mission is to be the single engineering partner for industrial fluid systems — from pump selection and installation support to chemical treatment programmes and after-sales technical service. Quality, durability, and engineering excellence are the three non-negotiables.",
    accent: "green",
  },
];

// ── Sub-component: single timeline entry ─────────────────────────────────

function TimelineEntry({
  item,
  index,
}: {
  item: TimelineItem;
  index: number;
}) {
  const dotColor = item.accent === "blue" ? "#1e5bb8" : "#6cc24a";
  const tagColor = item.accent === "blue" ? "#1e5bb8" : "#2fa84f";
  const tagBg = item.accent === "blue" ? "#1e5bb810" : "#6cc24a12";

  return (
    <div className="relative flex gap-0">
      {/* Left column: dot + connector */}
      <div className="relative flex flex-col items-center">
        {/* Dot — sits on the vertical line */}
        <PrecisionReveal variant="precisionScale" delay={index * 0.07}>
          <div
            className="relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-4 border-white"
            style={{
              backgroundColor: dotColor,
              boxShadow: `0 0 0 2px ${dotColor}`,
            }}
          />
        </PrecisionReveal>

        {/* Horizontal connector line to card */}
        <div
          aria-hidden="true"
          className="absolute top-2.5 left-[18px] h-px w-8"
          style={{ backgroundColor: "#e5e7eb" }}
        />
      </div>

      {/* Card — hangs off the connector */}
      <PrecisionReveal
        variant="fadeSlideLeft"
        delay={index * 0.07 + 0.05}
        className="mb-10 ml-10 flex-1"
      >
        <article
          className="rounded-xl border border-border bg-white p-6"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          {/* Year/phase badge */}
          <span
            className="mb-4 inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest"
            style={{ backgroundColor: tagBg, color: tagColor }}
          >
            {item.year}
          </span>

          <h3
            className="mb-3 font-bold leading-snug"
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
              color: "#0f172a",
            }}
          >
            {item.heading}
          </h3>

          <p
            className="text-sm leading-relaxed"
            style={{ color: "#64748b" }}
          >
            {item.body}
          </p>

          {/* Asset image — only where provided */}
          {item.image && (
            <div
              className="mt-5 overflow-hidden rounded-lg"
              style={{ maxHeight: 200 }}
            >
              <Image
                src={item.image}
                alt={item.imageAlt ?? ""}
                width={560}
                height={200}
                className="w-full object-cover"
                style={{ objectPosition: "center 30%" }}
              />
            </div>
          )}
        </article>
      </PrecisionReveal>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────

export default function ExpertiseTimeline() {
  return (
    <section
      id="expertise-timeline"
      aria-labelledby="timeline-heading"
      className="py-12 lg:py-20 bg-white"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <PrecisionReveal variant="fadeSlideLeft" className="mb-4">
          <span className="inline-flex items-center pl-3 border-l-2 border-primary-green text-[11px] font-semibold uppercase tracking-widest text-primary-green">
            Our Journey
          </span>
        </PrecisionReveal>

        <PrecisionReveal variant="fadeSlideLeft" delay={0.07}>
          <h2
            id="timeline-heading"
            className="mb-14 font-bold text-deep-blue"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
          >
            A Partnership Built
            <br />
            on Engineering
          </h2>
        </PrecisionReveal>

        {/* Timeline body — the 2px blue vertical line */}
        <div className="relative pl-0">
          {/* The vertical line — absolutely positioned behind the dots */}
          <div
            aria-hidden="true"
            className="absolute left-[9px] top-2.5 bottom-10"
            style={{ width: "2px", backgroundColor: "#1e5bb8" }}
          />

          {/* Timeline entries */}
          {TIMELINE.map((item, i) => (
            <TimelineEntry key={item.year + item.heading} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
