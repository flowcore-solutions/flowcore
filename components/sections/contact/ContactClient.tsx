"use client";

/**
 * ContactClient — all interactive form and contact panel logic extracted
 * from app/contact/page.tsx so the page file can remain a Server Component
 * and export `metadata`.
 */

import Link from "next/link";
import { useState, type FormEvent, type ChangeEvent } from "react";
import {
  OFFICE_LOCATIONS,
  type OfficeLocation,
} from "@/lib/location-data";
import { PUMP_CATALOG } from "@/lib/pump-data";
import SectionTag from "@/components/ui/SectionTag";
import PrecisionReveal from "@/components/ui/PrecisionReveal";

// ── Contact Info Panel ────────────────────────────────────────────────────

function ContactPanel({ loc }: { loc: OfficeLocation }) {
  return (
    <div className="flex flex-col h-full">
      {/* Top: location identity block */}
      <div
        className="rounded-2xl p-8 flex flex-col gap-6 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0f3d91 0%, #1e5bb8 60%, #0f3d91 100%)",
          boxShadow: "0 8px 32px rgba(15,61,145,0.25)",
        }}
      >
        {/* Blueprint grid overlay inside card */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 18px)`,
            opacity: 0.04,
          }}
        />

        {/* Green pulse indicator */}
        <div className="flex items-center gap-2.5 relative">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-green opacity-60" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-green" />
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-primary-green">
            Office — Bengaluru
          </span>
        </div>

        {/* City heading */}
        <div className="relative">
          <h2 className="text-3xl font-black text-white leading-tight">{loc.city}</h2>
          <p className="text-sm text-white/60 mt-1 font-medium">{loc.state}, {loc.country}</p>
        </div>

        {/* Address */}
        <div className="relative border-t border-white/10 pt-5 flex gap-3">
          <svg className="shrink-0 mt-0.5 opacity-50" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 1C5.24 1 3 3.24 3 6c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5zm0 6.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" fill="white"/>
          </svg>
          <p className="text-sm text-white/75 leading-relaxed">{loc.address}</p>
        </div>
      </div>

      {/* Bottom: direct contact actions */}
      <div className="mt-4 grid grid-cols-1 gap-3 flex-1">
        {loc.phone && (
          <a
            href={`tel:${loc.phone.replace(/\s/g, "")}`}
            className="group flex items-center gap-4 rounded-xl border border-border bg-white px-5 py-4 transition-all duration-150 hover:border-primary-blue hover:shadow-md"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors group-hover:bg-primary-blue"
              style={{ backgroundColor: "#1e5bb812" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 3h4l1.5 3.5-2 1.2c.9 1.8 2.3 3.2 4 4l1.2-2L14 11v4a1 1 0 01-1 1C6 16 0 10 0 3a1 1 0 011-1h1z" fill="#1e5bb8" className="group-hover:fill-white transition-colors" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-text-light mb-0.5">Mobile</p>
              <p className="text-sm font-bold text-deep-blue">{loc.phone}</p>
            </div>
            <svg className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity shrink-0" width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="#1e5bb8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}

        {loc.email && (
          <a
            href={`mailto:${loc.email}`}
            className="group flex items-center gap-4 rounded-xl border border-border bg-white px-5 py-4 transition-all duration-150 hover:border-primary-blue hover:shadow-md"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors group-hover:bg-primary-blue"
              style={{ backgroundColor: "#1e5bb812" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="1" y="3" width="14" height="10" rx="1.5" fill="#1e5bb8" fillOpacity="0.12" stroke="#1e5bb8" strokeWidth="1.2" className="group-hover:fill-white group-hover:stroke-white group-hover:fill-opacity-30 transition-all" />
                <path d="M1 5l7 5 7-5" stroke="#1e5bb8" strokeWidth="1.2" className="group-hover:stroke-white transition-colors" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-widest text-text-light mb-0.5">Email</p>
              <p className="text-sm font-bold text-deep-blue truncate">{loc.email}</p>
            </div>
            <svg className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity shrink-0" width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="#1e5bb8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}

      </div>
    </div>
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
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState<Partial<FormState>>({});

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
    setSubmitError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "inquiry",
          name: form.fullName,
          company: form.company,
          email: form.email,
          phone: form.phone,
          product: form.product,
          message: form.message,
        }),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? "Submission failed. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div id="inquiry-form" className="scroll-mt-32 rounded-2xl border border-border bg-white p-6 lg:p-8" style={{ boxShadow: "var(--shadow-card)" }}>
        {submitted ? (
          /* ── Success State ── */
          <div
            key="success"
            className="flex flex-col items-center text-center py-10 gap-5 animate-reveal-up"
          >
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
          </div>
        ) : (
          /* ── Form ── */
          <form
            key="form"
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5 animate-reveal-up"
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
                  placeholder="e.g. Arjun Singh"
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

            {/* Submit error */}
            {submitError && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0" aria-hidden="true">
                  <circle cx="8" cy="8" r="7" stroke="#ef4444" strokeWidth="1.5"/>
                  <path d="M8 4.5v4M8 10.5v1" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <p className="text-sm font-medium text-red-700">{submitError}</p>
              </div>
            )}

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
          </form>
        )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function ContactClient() {
  const hq = OFFICE_LOCATIONS.find((l) => l.type === "headquarters");

  return (
    <div
      className="hero-underlap relative min-h-screen"
      style={{ backgroundColor: "#f8fafc" }}
    >
      {/* Global blueprint grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #0F172A 0, #0F172A 1px, transparent 1px, transparent 20px)`,
          opacity: 0.025,
        }}
      />

      {/* ── Page Header ── */}
      <header className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">

          {/* Breadcrumb */}
          <PrecisionReveal variant="fadeSlideLeft">
            <nav className="flex items-center gap-2 mb-10" aria-label="Breadcrumb">
              <Link
                href="/"
                className="text-[10px] font-black uppercase tracking-[0.2em] text-text-light hover:text-primary-blue transition-colors"
              >
                Home
              </Link>
              <span className="text-[10px] text-border">/</span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-green" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-deep-blue">
                  Contact
                </span>
              </div>
            </nav>
          </PrecisionReveal>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="max-w-2xl">
              <PrecisionReveal variant="fadeSlideLeft" delay={0.07}>
                <SectionTag>Contact Us</SectionTag>
              </PrecisionReveal>

              <PrecisionReveal variant="fadeSlideLeft" delay={0.14}>
                <h1
                  className="mt-4 font-black text-deep-blue leading-[1.05] tracking-tight"
                  style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
                >
                  Contact FlowCore <br />
                  <span className="text-primary-blue">Engineering Team</span>
                </h1>
              </PrecisionReveal>

              <PrecisionReveal variant="fadeSlideLeft" delay={0.21}>
                <p className="mt-6 text-base leading-relaxed text-text-light font-medium max-w-lg">
                  Reach out to our Bengaluru office for pan-India industrial
                  solutions. Explore our <Link href="/products" className="text-primary-blue hover:underline drop-shadow-sm">pump catalogue</Link> or view our <Link href="/applications" className="text-primary-green hover:underline drop-shadow-sm">system applications</Link> before submitting an engineering inquiry below.
                </p>
              </PrecisionReveal>
            </div>
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">

          {/* LEFT — Rich contact panel */}
          {hq && (
            <PrecisionReveal variant="fadeSlideLeft">
              <ContactPanel loc={hq} />
            </PrecisionReveal>
          )}

          {/* RIGHT — Inquiry Form (sticky) */}
          <PrecisionReveal variant="fadeSlideRight" className="lg:sticky lg:top-28">
            <InquiryForm />
          </PrecisionReveal>
        </div>
      </div>
    </div>
  );
}
