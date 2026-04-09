"use client";

/**
 * Contact Page (/contact)
 *
 * Structure:
 *  Header — Global Presence title
 *  Body   — Two-column: Location cards (60%) + Inquiry Form (40%)
 *
 * Location cards: HQ is visually distinguished (Deep Blue bg).
 * Branch cards hover to green border + green shadow.
 * Distribution nodes shown as a compact list below the main cards.
 *
 * Form: Controlled React state, HTML5 validation, inline success state.
 * No redirect. No external form library. No external map SDK.
 */

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent, type ChangeEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  OFFICE_LOCATIONS,
  getLocationsByType,
  type OfficeLocation,
} from "@/lib/location-data";
import { PUMP_CATALOG } from "@/lib/pump-data";
import SectionTag from "@/components/ui/SectionTag";
import PrecisionReveal from "@/components/ui/PrecisionReveal";
import flowcoreLogo from "@/app/assets/logos/flowcore-logo.png";

const PRECISION_EASE = [0.25, 0, 0, 1] as const;

// ── Location Card ─────────────────────────────────────────────────────────

function LocationCard({ loc }: { loc: OfficeLocation }) {
  const isHQ = loc.type === "headquarters";

  return (
    <article
      id={`location-card-${loc.id}`}
      className={[
        "rounded-xl p-6 flex flex-col gap-4 transition-all duration-200",
        isHQ
          ? "bg-deep-blue text-white"
          : "bg-section-bg border border-border hover:border-primary-green hover:[box-shadow:var(--shadow-green)]",
      ].join(" ")}
    >
      {/* Type badge + dot */}
      <div className="flex items-center gap-2">
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: isHQ ? "#6cc24a" : "#1e5bb860" }}
        />
        <span
          className={[
            "text-[10px] font-bold uppercase tracking-widest",
            isHQ ? "text-primary-green" : "text-text-light",
          ].join(" ")}
        >
          {loc.type === "headquarters"
            ? "Headquarters"
            : loc.type === "branch"
            ? "Regional Branch"
            : "Distribution Centre"}
        </span>
      </div>

      {/* City */}
      <div>
        <h3
          className={[
            "text-lg font-bold leading-tight",
            isHQ ? "text-white" : "text-deep-blue",
          ].join(" ")}
        >
          {loc.city}
        </h3>
        <p
          className={[
            "text-xs mt-0.5",
            isHQ ? "text-white/60" : "text-text-light",
          ].join(" ")}
        >
          {loc.state}, {loc.country}
        </p>
      </div>

      {/* Address */}
      <p
        className={[
          "text-xs leading-relaxed",
          isHQ ? "text-white/70" : "text-text-light",
        ].join(" ")}
      >
        {loc.address}
      </p>

      {/* Contact details */}
      {(loc.phone || loc.email) && (
        <div className="flex flex-col gap-1.5 pt-2 border-t border-white/10">
          {loc.phone && (
            <a
              href={`tel:${loc.phone.replace(/\s/g, "")}`}
              className={[
                "flex items-center gap-2 text-xs font-medium transition-colors",
                isHQ
                  ? "text-white/80 hover:text-white"
                  : "text-text-dark hover:text-primary-blue",
              ].join(" ")}
            >
              {/* Phone icon */}
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 3h4l1.5 3.5-2 1.2c.9 1.8 2.3 3.2 4 4l1.2-2L14 11v4a1 1 0 01-1 1C6 16 0 10 0 3a1 1 0 011-1h1z" fill="currentColor" fillOpacity="0.7" />
              </svg>
              {loc.phone}
            </a>
          )}
          {loc.email && (
            <a
              href={`mailto:${loc.email}`}
              className={[
                "flex items-center gap-2 text-xs font-medium transition-colors",
                isHQ
                  ? "text-white/80 hover:text-white"
                  : "text-text-dark hover:text-primary-blue",
              ].join(" ")}
            >
              {/* Email icon */}
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.2" />
                <path d="M1 5l7 5 7-5" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.2" />
              </svg>
              {loc.email}
            </a>
          )}
        </div>
      )}
    </article>
  );
}

// ── Inquiry Form ──────────────────────────────────────────────────────────

type FormState = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  product: string;
  application: string;
  message: string;
};

const EMPTY_FORM: FormState = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  product: "",
  application: "",
  message: "",
};

function inputClass(hasError = false) {
  return [
    "w-full rounded-lg border px-4 py-3 text-sm text-text-dark bg-white",
    "placeholder:text-text-light",
    "transition-colors duration-150 outline-none",
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-400"
      : "border-border focus:border-primary-blue focus:ring-1 focus:ring-primary-blue",
  ].join(" ");
}

function FieldLabel({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block mb-1.5 text-xs font-semibold text-text-dark uppercase tracking-wide"
    >
      {children}
      {required && <span className="ml-1 text-primary-green" aria-hidden="true">*</span>}
    </label>
  );
}

function InquiryForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function validate(): boolean {
    const errs: Partial<FormState> = {};
    if (!form.fullName.trim()) errs.fullName = "Required";
    if (!form.company.trim()) errs.company = "Required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Valid email required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Simulate network — replace with fetch('/api/contact', ...) in production
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <div className="rounded-2xl border border-border bg-white p-6 lg:p-8" style={{ boxShadow: "var(--shadow-card)" }}>
      <AnimatePresence mode="wait">
        {submitted ? (
          /* ── Success State ── */
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: PRECISION_EASE }}
            className="flex flex-col items-center text-center py-10 gap-5"
          >
            {/* Green checkmark */}
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full"
              style={{ backgroundColor: "#6cc24a18" }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <circle cx="16" cy="16" r="15" stroke="#6cc24a" strokeWidth="1.5" />
                <path d="M9 16l5 5.5 9-9.5" stroke="#6cc24a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-deep-blue mb-2">Inquiry Received</h3>
              <p className="text-sm text-text-light max-w-xs">
                Thank you, <strong className="text-text-dark">{form.fullName}</strong>. Our
                engineering team will contact you within 1 business day.
              </p>
            </div>
            <button
              onClick={() => { setForm(EMPTY_FORM); setSubmitted(false); }}
              className="text-xs text-text-light underline underline-offset-2 hover:text-text-dark transition-colors"
            >
              Submit another inquiry
            </button>
          </motion.div>
        ) : (
          /* ── Form ── */
          <motion.form
            key="form"
            id="inquiry-form"
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: PRECISION_EASE }}
            className="flex flex-col gap-5"
            aria-label="Industrial inquiry form"
          >
            <div>
              <h2 className="text-lg font-bold text-deep-blue">Industrial Inquiry</h2>
              <p className="mt-1 text-xs text-text-light">
                Fields marked <span className="text-primary-green font-semibold">*</span> are required.
              </p>
            </div>

            {/* Name + Company */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <FieldLabel htmlFor="fullName" required>Full Name</FieldLabel>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Rajesh Kumar"
                  className={inputClass(!!errors.fullName)}
                  aria-describedby={errors.fullName ? "fullName-error" : undefined}
                />
                {errors.fullName && (
                  <p id="fullName-error" className="mt-1 text-xs text-red-500">{errors.fullName}</p>
                )}
              </div>
              <div>
                <FieldLabel htmlFor="company" required>Company Name</FieldLabel>
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Infrastructure Pvt. Ltd."
                  className={inputClass(!!errors.company)}
                  aria-describedby={errors.company ? "company-error" : undefined}
                />
                {errors.company && (
                  <p id="company-error" className="mt-1 text-xs text-red-500">{errors.company}</p>
                )}
              </div>
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <FieldLabel htmlFor="email" required>Email Address</FieldLabel>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className={inputClass(!!errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>
              <div>
                <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98000 00000"
                  className={inputClass()}
                />
              </div>
            </div>

            {/* Product interest */}
            <div>
              <FieldLabel htmlFor="product">Product / Series of Interest</FieldLabel>
              <select
                id="product"
                name="product"
                value={form.product}
                onChange={handleChange}
                className={inputClass()}
              >
                <option value="">— Select a pump series —</option>
                {PUMP_CATALOG.map((p) => (
                  <option key={p.id} value={p.fullName}>
                    {p.fullName} ({p.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Application */}
            <div>
              <FieldLabel htmlFor="application">Application / Use Case</FieldLabel>
              <input
                id="application"
                name="application"
                type="text"
                value={form.application}
                onChange={handleChange}
                placeholder="e.g. Municipality WTP, HVAC chilled water loop"
                className={inputClass()}
              />
            </div>

            {/* Message */}
            <div>
              <FieldLabel htmlFor="message">Message</FieldLabel>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="Describe your project requirements, flow rate, head, quantity…"
                className={`${inputClass()} resize-none`}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              id="inquiry-submit"
              className={[
                "flex items-center justify-center gap-2 rounded-lg px-8 py-4 text-base font-semibold text-white transition-all duration-150",
                "bg-primary-green hover:bg-dark-green hover:[box-shadow:var(--shadow-green)]",
                "hover:scale-[1.02] active:scale-[0.98]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2",
                "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100",
              ].join(" ")}
            >
              {submitting ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Sending…
                </>
              ) : (
                <>
                  Submit Inquiry
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const hq = OFFICE_LOCATIONS.find((l) => l.type === "headquarters");
  const branches = getLocationsByType("branch");
  const distribution = getLocationsByType("distribution");

  return (
    <div className="bg-white">
      {/* ── Page Header ── */}
      <header className="bg-section-bg border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <PrecisionReveal variant="fadeSlideLeft">
            <SectionTag>Global Presence</SectionTag>
          </PrecisionReveal>
          <PrecisionReveal variant="fadeSlideLeft" delay={0.07}>
            <h1
              className="mt-4 font-bold text-deep-blue"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Find FlowCore Near You
            </h1>
          </PrecisionReveal>
          <PrecisionReveal variant="fadeSlideLeft" delay={0.14}>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-text-light">
              Our headquarters and regional branches serve the pan-India
              industrial market. Contact us directly or submit an engineering
              inquiry below.
            </p>
          </PrecisionReveal>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[3fr_2fr]">
          {/* LEFT — Location cards */}
          <div className="flex flex-col gap-8">
            {/* HQ */}
            {hq && (
              <PrecisionReveal variant="fadeSlideLeft">
                <LocationCard loc={hq} />
              </PrecisionReveal>
            )}

            {/* Branches */}
            <div>
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-text-light">
                Regional Branches
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {branches.map((loc, i) => (
                  <PrecisionReveal key={loc.id} variant="riseUp" delay={i * 0.07}>
                    <LocationCard loc={loc} />
                  </PrecisionReveal>
                ))}
              </div>
            </div>

            {/* Distribution nodes — compact list */}
            {distribution.length > 0 && (
              <PrecisionReveal variant="fadeSlideLeft" delay={0.14}>
                <div className="rounded-xl border border-border bg-section-bg p-5">
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-text-light">
                    Distribution Centres
                  </p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {distribution.map((loc) => (
                      <div key={loc.id} className="flex flex-col gap-0.5">
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-text-dark">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-primary-blue/40" />
                          {loc.city}
                        </span>
                        <span className="text-[11px] text-text-light pl-3">
                          {loc.state}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </PrecisionReveal>
            )}
          </div>

          {/* RIGHT — Inquiry Form */}
          <PrecisionReveal variant="fadeSlideRight" className="lg:sticky lg:top-28 lg:self-start">
            <InquiryForm />
          </PrecisionReveal>
        </div>
      </div>
    </div>
  );
}
