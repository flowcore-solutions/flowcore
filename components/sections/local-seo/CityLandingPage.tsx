import Link from "next/link";
import PrecisionReveal from "@/components/ui/PrecisionReveal";
import SectionTag from "@/components/ui/SectionTag";
import FAQSection, { type FAQItem } from "@/components/ui/FAQSection";
import { getPumpById } from "@/lib/pump-data";

type CtaLink = {
  label: string;
  href: string;
};

type LandingCard = {
  title: string;
  description: string;
  href?: string;
};

type LandingStat = {
  value: string;
  label: string;
};

type LandingSection = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

type LandingAlternatingItem = {
  title: string;
  description: string;
};

type LandingTestimonial = {
  quote: string;
  role: string;
  companyType: string;
  location: string;
};

type LandingConfig = {
  featuredPumpId?: string;
  breadcrumbLabel: string;
  hideBreadcrumb?: boolean;
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    theme: "deep" | "slate" | "teal";
    primaryCta: CtaLink;
    secondaryCta: CtaLink;
  };
  trustBar?: {
    stats: LandingStat[];
  };
  intro?: LandingSection & {
    body: string[];
  };
  range?: LandingSection & {
    cards: LandingCard[];
  };
  applications?: LandingSection & {
    items: LandingAlternatingItem[];
  };
  whyFlowCore?: LandingSection & {
    features: string[];
  };
  process?: LandingSection & {
    steps: string[];
  };
  brands?: LandingSection & {
    items: string[];
  };
  testimonials?: LandingSection & {
    items: LandingTestimonial[];
  };
  compliance?: LandingSection & {
    body: string[];
    bullets?: string[];
  };
  projectTypes?: LandingSection & {
    cards: string[];
  };
  dosing?: LandingSection & {
    body: string;
  };
  specs?: LandingSection & {
    columns: string[];
    rows: string[][];
  };
  faqsTitle: string;
  faqs: FAQItem[];
  cta: {
    title: string;
    body: string;
    primaryCta: CtaLink;
    secondaryCta: CtaLink;
  };
};

const heroThemeMap = {
  deep: {
    section: "bg-deep-blue",
    overlay:
      "linear-gradient(120deg, rgba(15,61,145,0.98) 0%, rgba(15,61,145,0.92) 52%, rgba(30,91,184,0.88) 100%)",
    card: "bg-white/10 border-white/12 text-white",
    eyebrowText: "text-light-blue border-light-blue",
    bodyText: "text-white/78",
    secondary:
      "border border-white/20 bg-white/5 text-white hover:border-white/35",
  },
  slate: {
    section: "bg-text-dark",
    overlay:
      "linear-gradient(120deg, rgba(15,23,42,0.98) 0%, rgba(15,23,42,0.94) 52%, rgba(30,91,184,0.78) 100%)",
    card: "bg-white/8 border-white/10 text-white",
    eyebrowText: "text-primary-green border-primary-green",
    bodyText: "text-white/78",
    secondary:
      "border border-white/20 bg-white/5 text-white hover:border-white/35",
  },
  teal: {
    section: "bg-[#0A192F]", // Deep scientific navy
    overlay:
      "radial-gradient(circle at 80% 20%, rgba(6,182,212,0.2) 0%, transparent 50%), linear-gradient(120deg, #0A192F 0%, #1B437C 60%, #0891B2 100%)",
    card: "bg-white/[0.08] border-white/15 text-white backdrop-blur-2xl",
    eyebrowText: "text-[#22D3EE] border-[#22D3EE]", // Vibrant Cyan
    bodyText: "text-white/85",
    secondary:
      "border border-white/20 bg-white/5 text-white hover:border-white/35",
  },
};

function PrimaryLink({ href, label }: CtaLink) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-lg bg-primary-green px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition-all duration-150 hover:scale-[1.03] hover:bg-dark-green hover:[box-shadow:var(--shadow-green)]"
    >
      {label}
    </Link>
  );
}

function SecondaryLink({
  href,
  label,
  className,
}: CtaLink & { className: string }) {
  return (
    <Link
      href={href}
      className={[
        "inline-flex items-center justify-center rounded-lg px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] transition-all duration-150 hover:scale-[1.02]",
        className,
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

function PageBreadcrumb({ label, theme }: { label: string; theme: LandingConfig["hero"]["theme"] }) {
  const isDark = theme === "deep" || theme === "slate" || theme === "teal";
  const homeColor = isDark ? "text-white/70 hover:text-white" : "text-text-light hover:text-primary-blue";
  const slashColor = isDark ? "text-white/30" : "text-border";
  const labelColor = isDark ? "text-white" : "text-deep-blue";

  return (
    <PrecisionReveal variant="fadeSlideLeft">
      <nav className="mb-10 flex items-center gap-2" aria-label="Breadcrumb">
        <Link
          href="/"
          className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${homeColor}`}
        >
          Home
        </Link>
        <span className={`text-[10px] ${slashColor}`}>/</span>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-green" />
          <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${labelColor}`}>
            {label}
          </span>
        </div>
      </nav>
    </PrecisionReveal>
  );
}

function StandardSectionHeader({ eyebrow, title, subtitle }: LandingSection) {
  return (
    <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        {eyebrow ? <SectionTag>{eyebrow}</SectionTag> : null}
        <h2
          className="mt-4 font-black leading-[1.05] tracking-tight text-deep-blue"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
        >
          {title}
        </h2>
      </div>
      {subtitle ? (
        <p className="max-w-xl text-base font-medium leading-relaxed text-text-light">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function CardGrid({ cards }: { cards: LandingCard[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card, index) => (
        <PrecisionReveal key={card.title} variant="riseUp" delay={index * 0.06}>
          <article
            className="group rounded-xl border border-border bg-white p-6 transition-all duration-300 hover:border-primary-blue hover:[box-shadow:var(--shadow-card-hover)]"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-primary-blue/12 bg-primary-blue/5">
              <span className="text-sm font-black uppercase tracking-[0.2em] text-primary-blue">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="text-xl font-bold leading-tight text-deep-blue">
              {card.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-text-light">
              {card.description}
            </p>
            {card.href ? (
              <Link
                href={card.href}
                className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-primary-blue transition-transform duration-150 group-hover:translate-x-1"
              >
                Learn more
                <span aria-hidden="true">&rarr;</span>
              </Link>
            ) : null}
          </article>
        </PrecisionReveal>
      ))}
    </div>
  );
}

function AlternatingRows({ items }: { items: LandingAlternatingItem[] }) {
  return (
    <div className="grid gap-5">
      {items.map((item, index) => (
        <PrecisionReveal
          key={item.title}
          variant={index % 2 === 0 ? "fadeSlideLeft" : "fadeSlideRight"}
          delay={index * 0.05}
        >
          <article
            className="grid gap-5 rounded-2xl border border-border bg-white p-6 lg:grid-cols-[0.34fr_1fr]"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="rounded-xl bg-section-bg p-5">
              <span className="text-[10px] font-black uppercase tracking-[0.22em] text-primary-green">
                Application {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-xl font-bold leading-tight text-deep-blue">
                {item.title}
              </h3>
            </div>
            <p className="text-sm leading-7 text-text-light">{item.description}</p>
          </article>
        </PrecisionReveal>
      ))}
    </div>
  );
}

export default function CityLandingPage({ config }: { config: LandingConfig }) {
  const heroTheme = heroThemeMap[config.hero.theme];
  const featuredPump = config.featuredPumpId
    ? getPumpById(config.featuredPumpId)
    : undefined;

  const hasRightSideContent =
    (config.trustBar && config.trustBar.stats?.length > 0) || featuredPump;

  return (
    <main className="relative bg-section-bg">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #0F172A 0, #0F172A 1px, transparent 1px, transparent 20px)",
          opacity: 0.025,
        }}
      />
      <div className="relative z-10">
      <header className={`hero-underlap relative overflow-hidden ${heroTheme.section}`}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 24px)",
            opacity: 0.35,
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: heroTheme.overlay }}
        />
        <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20">
          {!config.hideBreadcrumb && (
            <PageBreadcrumb label={config.breadcrumbLabel} theme={config.hero.theme} />
          )}
          <div
            className={`grid gap-10 lg:items-center ${
              hasRightSideContent
                ? "lg:grid-cols-[1.1fr_0.9fr]"
                : "max-w-4xl lg:grid-cols-1"
            }`}
          >
            <div className="max-w-3xl">
              <PrecisionReveal variant="fadeSlideLeft" delay={0.08}>
                <span
                  className={[
                    "inline-flex items-center border-l-2 pl-3 text-[10px] font-black uppercase tracking-[0.22em]",
                    heroTheme.eyebrowText,
                  ].join(" ")}
                >
                  {config.hero.eyebrow}
                </span>
              </PrecisionReveal>
              <PrecisionReveal variant="fadeSlideLeft" delay={0.14}>
                <h1
                  className={[
                    "mt-5 font-black leading-[1.02] tracking-tight text-white",
                  ].join(" ")}
                  style={{ fontSize: "clamp(2.4rem, 6vw, 4.8rem)" }}
                >
                  {config.hero.title}
                </h1>
              </PrecisionReveal>
              <PrecisionReveal variant="fadeSlideLeft" delay={0.2}>
                <p className={["mt-6 max-w-2xl text-lg leading-8", heroTheme.bodyText].join(" ")}>
                  {config.hero.body}
                </p>
              </PrecisionReveal>
              <PrecisionReveal variant="riseUp" delay={0.26}>
                <div className="mt-8 flex flex-wrap gap-4">
                  <PrimaryLink {...config.hero.primaryCta} />
                  <SecondaryLink
                    {...config.hero.secondaryCta}
                    className={heroTheme.secondary}
                  />
                </div>
              </PrecisionReveal>
            </div>

            {config.trustBar && config.trustBar.stats?.length > 0 && (
            <PrecisionReveal variant="fadeSlideRight" delay={0.22}>
              <div
                className={[
                  "grid gap-4 rounded-[28px] border p-6 sm:grid-cols-2",
                  heroTheme.card,
                ].join(" ")}
              >
                {(config.trustBar.stats).slice(0, 4).map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-white/10 bg-white/5 p-4"
                    >
                      <div
                        className={[
                          "text-3xl font-black text-white",
                        ].join(" ")}
                      >
                        {stat.value}
                      </div>
                      <div
                        className={[
                          "mt-1 text-[11px] font-black uppercase tracking-[0.18em] text-white/65",
                        ].join(" ")}
                      >
                        {stat.label}
                      </div>
                  </div>
                ))}
              </div>
            </PrecisionReveal>
            )}
          </div>
        </div>
      </header>

      {config.trustBar ? (
        <section className="relative border-b border-border/70 bg-section-bg overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #0F172A 0, #0F172A 1px, transparent 1px, transparent 20px)",
            }}
          />
          <div className="relative z-10 mx-auto grid max-w-6xl gap-4 px-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
            {config.trustBar.stats.map((stat, index) => (
              <PrecisionReveal key={stat.label} variant="riseUp" delay={index * 0.05}>
                <div 
                  className="rounded-xl border border-border bg-white px-5 py-5 text-center transition-all duration-300 hover:border-primary-blue/30 hover:shadow-md"
                  style={{ boxShadow: "var(--shadow-card-sm)" }}
                >
                  <div className="text-2xl font-black text-deep-blue">{stat.value}</div>
                  <div className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-text-light">
                    {stat.label}
                  </div>
                </div>
              </PrecisionReveal>
            ))}
          </div>
        </section>
      ) : null}

      {config.intro ? (
        <section className="relative overflow-hidden py-14 lg:py-20">
          <div className="relative mx-auto max-w-6xl px-6">
            <PrecisionReveal variant="fadeSlideLeft">
              <StandardSectionHeader
                eyebrow={config.intro.eyebrow}
                title={config.intro.title}
                subtitle={config.intro.subtitle}
              />
            </PrecisionReveal>
            <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <PrecisionReveal variant="fadeSlideLeft" delay={0.08}>
                <div
                  className="rounded-[28px] border border-border bg-white p-8"
                  style={{ boxShadow: "var(--shadow-card)" }}
                >
                  <div className="space-y-5 text-base leading-8 text-text-light">
                    {config.intro.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </PrecisionReveal>
              <PrecisionReveal variant="fadeSlideRight" delay={0.14}>
                <div className="rounded-[28px] bg-deep-blue p-8 text-white">
                  <h3 className="text-xl font-bold uppercase tracking-[0.14em] text-light-blue">
                    Bangalore project fit
                  </h3>
                  <p className="mt-5 text-base leading-8 text-white/74">
                    Every FlowCore recommendation is shaped around local duty
                    conditions, response speed, and long-term maintainability
                    across Bangalore and Karnataka project environments.
                  </p>
                </div>
              </PrecisionReveal>
            </div>
          </div>
        </section>
      ) : null}

      {config.range ? (
        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <PrecisionReveal variant="fadeSlideLeft">
              <StandardSectionHeader
                eyebrow={config.range.eyebrow}
                title={config.range.title}
                subtitle={config.range.subtitle}
              />
            </PrecisionReveal>
            <CardGrid cards={config.range.cards} />
          </div>
        </section>
      ) : null}

      {config.applications ? (
        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <PrecisionReveal variant="fadeSlideLeft">
              <StandardSectionHeader
                eyebrow={config.applications.eyebrow}
                title={config.applications.title}
                subtitle={config.applications.subtitle}
              />
            </PrecisionReveal>
            <AlternatingRows items={config.applications.items} />
          </div>
        </section>
      ) : null}

      {config.compliance ? (
        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <PrecisionReveal variant="fadeSlideLeft">
              <StandardSectionHeader
                eyebrow={config.compliance.eyebrow}
                title={config.compliance.title}
                subtitle={config.compliance.subtitle}
              />
            </PrecisionReveal>
            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[28px] bg-deep-blue p-8 text-white">
                <div className="space-y-5 text-base leading-8 text-white/76">
                  {config.compliance.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
              <div
                className="rounded-[28px] border border-border bg-white p-8"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <ul className="space-y-4 text-sm leading-7 text-text-light">
                  {(config.compliance.bullets ?? []).map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary-green" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {config.projectTypes ? (
        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <PrecisionReveal variant="fadeSlideLeft">
              <StandardSectionHeader
                eyebrow={config.projectTypes.eyebrow}
                title={config.projectTypes.title}
                subtitle={config.projectTypes.subtitle}
              />
            </PrecisionReveal>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {config.projectTypes.cards.map((card, index) => (
                <PrecisionReveal key={card} variant="riseUp" delay={index * 0.05}>
                  <div className="rounded-xl border border-border bg-white px-5 py-6 text-sm font-bold uppercase tracking-[0.16em] text-deep-blue">
                    {card}
                  </div>
                </PrecisionReveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {config.whyFlowCore ? (
        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <PrecisionReveal variant="fadeSlideLeft">
              <StandardSectionHeader
                eyebrow={config.whyFlowCore.eyebrow}
                title={config.whyFlowCore.title}
                subtitle={config.whyFlowCore.subtitle}
              />
            </PrecisionReveal>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {config.whyFlowCore.features.map((feature, index) => (
                <PrecisionReveal key={feature} variant="riseUp" delay={index * 0.05}>
                  <div
                    className="rounded-xl border border-border bg-white p-5"
                    style={{ boxShadow: "var(--shadow-card)" }}
                  >
                    <span className="text-[10px] font-black uppercase tracking-[0.18em] text-primary-green">
                      FlowCore edge
                    </span>
                    <p className="mt-3 text-sm font-medium leading-7 text-text-light">
                      {feature}
                    </p>
                  </div>
                </PrecisionReveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {config.process ? (
        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <PrecisionReveal variant="fadeSlideLeft">
              <StandardSectionHeader
                eyebrow={config.process.eyebrow}
                title={config.process.title}
                subtitle={config.process.subtitle}
              />
            </PrecisionReveal>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {config.process.steps.map((step, index) => (
                <PrecisionReveal key={step} variant="riseUp" delay={index * 0.05}>
                  <div className="rounded-xl border border-border bg-white p-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-blue">
                      Step {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 text-lg font-bold text-deep-blue">{step}</h3>
                  </div>
                </PrecisionReveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {config.brands ? (
        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <PrecisionReveal variant="fadeSlideLeft">
              <StandardSectionHeader
                eyebrow={config.brands.eyebrow}
                title={config.brands.title}
                subtitle={config.brands.subtitle}
              />
            </PrecisionReveal>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {config.brands.items.map((brand, index) => (
                <PrecisionReveal key={brand} variant="riseUp" delay={index * 0.05}>
                  <div className="rounded-xl border border-border bg-white px-5 py-6 text-center text-sm font-bold uppercase tracking-[0.14em] text-deep-blue">
                    {brand}
                  </div>
                </PrecisionReveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {config.testimonials ? (
        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <PrecisionReveal variant="fadeSlideLeft">
              <StandardSectionHeader
                eyebrow={config.testimonials.eyebrow}
                title={config.testimonials.title}
                subtitle={config.testimonials.subtitle}
              />
            </PrecisionReveal>
            <div className="grid gap-5 lg:grid-cols-3">
              {config.testimonials.items.map((item, index) => (
                <PrecisionReveal key={item.quote} variant="riseUp" delay={index * 0.05}>
                  <figure
                    className="rounded-[24px] border border-border bg-white p-6"
                    style={{ boxShadow: "var(--shadow-card)" }}
                  >
                    <blockquote className="text-base leading-8 text-text-light">
                      &quot;{item.quote}&quot;
                    </blockquote>
                    <figcaption className="mt-6 border-t border-border pt-4">
                      <div className="text-sm font-bold uppercase tracking-[0.16em] text-deep-blue">
                        {item.role}
                      </div>
                      <div className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-text-light">
                        {item.companyType} - {item.location}
                      </div>
                    </figcaption>
                  </figure>
                </PrecisionReveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {config.dosing ? (
        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <PrecisionReveal variant="fadeSlideLeft">
              <StandardSectionHeader
                eyebrow={config.dosing.eyebrow}
                title={config.dosing.title}
                subtitle={config.dosing.subtitle}
              />
            </PrecisionReveal>
            <div className="rounded-[28px] border border-border bg-white p-8">
              <p className="max-w-4xl text-base leading-8 text-text-light">
                {config.dosing.body}
              </p>
            </div>
          </div>
        </section>
      ) : null}

      {config.specs ? (
        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <PrecisionReveal variant="fadeSlideLeft">
              <StandardSectionHeader
                eyebrow={config.specs.eyebrow}
                title={config.specs.title}
                subtitle={config.specs.subtitle}
              />
            </PrecisionReveal>
            <div className="overflow-hidden rounded-[28px] border border-border bg-white">
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead className="bg-section-bg">
                    <tr>
                      {config.specs.columns.map((column) => (
                        <th
                          key={column}
                          className="border-b border-border px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.18em] text-text-light"
                        >
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {config.specs.rows.map((row, index) => (
                      <tr key={`${row[0]}-${index}`} className="odd:bg-white even:bg-section-bg/60">
                        {row.map((cell) => (
                          <td
                            key={cell}
                            className="border-b border-border px-5 py-4 text-sm leading-7 text-text-light"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <FAQSection faqs={config.faqs} title={config.faqsTitle} tag="Search Questions" />

      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-[32px] bg-deep-blue px-8 py-10 text-white lg:px-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-3xl">
                <SectionTag accent="green">Next Step</SectionTag>
                <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-4xl">
                  {config.cta.title}
                </h2>
                <p className="mt-4 text-base leading-8 text-white/76">
                  {config.cta.body}
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <PrimaryLink {...config.cta.primaryCta} />
                <SecondaryLink
                  {...config.cta.secondaryCta}
                  className="border border-white/20 bg-white/5 text-white hover:border-white/35"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </main>
  );
}

export type { LandingConfig };
