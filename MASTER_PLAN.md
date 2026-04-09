# FlowCore Solutions — Master Technical Design Plan

> **Status:** Pre-Implementation Design Document  
> **Version:** 1.0  
> **Stack:** Next.js 15 (App Router) · Tailwind CSS v4 · Framer Motion v12  
> **Constraint Hard Rules:** No Shadcn · No Dark Mode · No UI Libraries · Poppins Font · No Inline Styles

---

## 0. Design Direction & Feasibility

### Aesthetic Name
**"Industrial Precision"** — The visual language of precision engineering: clean structures, high-contrast dual-tone palette, machine-like animation timing, and technical diagrams that respect the intelligence of an industrial buyer.

### Tone Blend
**Industrial/Utilitarian** + **Luxury/Refined** (never more than two)

### Design Feasibility & Impact Index (DFII)

| Dimension | Score | Rationale |
|---|---|---|
| Aesthetic Impact | 5 | Dual-brand Blue/Green system is unmistakably distinctive |
| Context Fit | 5 | Industrial pump market expects authority, precision, trust |
| Implementation Feasibility | 4 | 3D-hover + Framer Motion layout transitions are achievable without heavy deps |
| Performance Safety | 4 | next/image + lazy motion ensures performance |
| Consistency Risk | 2 | Dual-brand palette requires strict token discipline |

**DFII = (5 + 5 + 4 + 4) − 2 = 16 → Excellent. Execute fully.**

### Differentiation Anchor
> "If this were screenshotted with the logo removed, you would recognize it by the diagonal blue-to-green split, the rigid 90° machine-entrance animations, and the technical diagram hover states that reveal engineer-grade pump specifications — no competitor does this."

---

## 1. File & Folder Architecture

```
flowcore/
├── app/
│   ├── layout.tsx                    # Root layout — Poppins font, metadata
│   ├── globals.css                   # @theme tokens + @layer base (existing, extends)
│   ├── page.tsx                      # Home page (/)
│   │
│   ├── applications/
│   │   └── page.tsx                  # Applications page (/applications)
│   │
│   ├── about/
│   │   └── page.tsx                  # About Us page (/about)
│   │
│   ├── products/
│   │   └── page.tsx                  # Products Catalog page (/products)
│   │
│   ├── contact/
│   │   └── page.tsx                  # Contact page (/contact)
│   │
│   └── assets/
│       ├── pumps/                    # All pump PNGs (19 files)
│       ├── logos/                    # berlington-logo, flowcore-logo, flowchar-logo
│       └── icons/                   # Reserved for SVG icons
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                # Floating Island Navbar
│   │   └── Footer.tsx
│   │
│   ├── sections/
│   │   ├── home/
│   │   │   ├── HeroSection.tsx       # Split-Precision Hero
│   │   │   ├── FeaturedPumpsGrid.tsx # 3D-hover pump card grid
│   │   │   └── StatsBar.tsx          # Social proof numbers
│   │   │
│   │   ├── applications/
│   │   │   ├── ApplicationDiagram.tsx  # Technical diagram hover system
│   │   │   └── EnvironmentCard.tsx
│   │   │
│   │   ├── about/
│   │   │   ├── SplitScreenPanel.tsx
│   │   │   └── ExpertiseTimeline.tsx
│   │   │
│   │   ├── products/
│   │   │   ├── ProductSidebar.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   └── ProductCard.tsx
│   │   │
│   │   └── contact/
│   │       ├── LocationCards.tsx
│   │       └── InquiryForm.tsx
│   │
│   └── ui/
│       ├── PrecisionReveal.tsx       # Reusable Framer Motion wrapper
│       ├── GreenCTAButton.tsx
│       └── SectionTag.tsx            # "APPLICATIONS" label tag
│
└── lib/
    ├── pump-data.ts                  # Typed pump catalog data
    ├── application-data.ts           # Environment → pump mappings
    └── location-data.ts              # Contact office locations
```

---

## 2. Design Token System (`globals.css` — Extend Existing)

The existing `@theme` block is correct for Tailwind v4. Extend it with spacing, shadow, and motion tokens:

```css
@theme {
  /* === TYPOGRAPHY === */
  --font-sans: var(--font-poppins), ui-sans-serif, system-ui;

  /* === PRIMARY BLUE PALETTE === */
  --color-primary-blue: #1e5bb8;
  --color-deep-blue: #0f3d91;
  --color-light-blue: #4da3ff;

  /* === SECONDARY GREEN PALETTE === */
  --color-primary-green: #6cc24a;
  --color-dark-green: #2fa84f;
  --color-light-green: #a6e46b;

  /* === NEUTRALS === */
  --color-white: #ffffff;
  --color-section-bg: #f8fafc;
  --color-border: #e5e7eb;
  --color-text-dark: #0f172a;
  --color-text-light: #64748b;

  /* === INDUSTRIAL SHADOWS === */
  --shadow-card: 0 4px 24px 0 rgba(15, 61, 145, 0.08);
  --shadow-card-hover: 0 16px 48px 0 rgba(15, 61, 145, 0.18);
  --shadow-green: 0 4px 20px 0 rgba(108, 194, 74, 0.25);

  /* === SPACING RHYTHM (8pt grid) === */
  --spacing-section: 6rem;      /* 96px — between major sections */
  --spacing-component: 3rem;   /* 48px — between components */
}
```

**Typography Scale (Poppins):**
| Role | Size | Weight | Color |
|---|---|---|---|
| Display H1 | 64px / line-height 1.1 | 700 Bold | `--color-deep-blue` |
| Section H2 | 40px / line-height 1.2 | 700 Bold | `--color-deep-blue` |
| Sub-heading H3 | 24px / line-height 1.4 | 600 SemiBold | `--color-text-dark` |
| Body | 16px / line-height 1.7 | 400 Regular | `--color-text-light` |
| Label/Tag | 12px / letter-spacing 0.1em | 600 SemiBold | `--color-primary-green` |
| Technical Spec | 13px / monospace stack | 500 | `--color-primary-blue` |

---

## 3. Motion System — "Precision Reveal"

**Philosophy:** Elements enter like machine parts locking into position. Not floaty. Not elastic. Rigid, directional, purposeful.

**`PrecisionReveal.tsx` — Core Variant Map:**
```typescript
const variants = {
  // Default: slide from LEFT 20px + fade — used for text blocks
  fadeSlideLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 0, 0, 1] } }
  },
  // Structural: slide from BOTTOM 16px — used for cards
  riseUp: {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0, 0, 1] } }
  },
  // Accent: slide from RIGHT 20px — used for green CTA areas
  fadeSlideRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 0, 0, 1] } }
  },
  // Technical: scale from 0.96 — used for diagram overlays
  precisionScale: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.25, 0, 0, 1] } }
  }
}
```

**Stagger Rule:** When multiple elements animate in the same section, use a `0.07s` stagger delay between items. No exceptions.

**Hover Rules:**
- Cards: `translateY(-6px)` + `shadow-card-hover` — duration `200ms ease-out`
- CTA Buttons: `scale(1.03)` + green glow — duration `150ms`
- No combined translate + scale on the same element (choose one)

---

## 4. PAGE: Home (`/`)

### 4.1 Floating Island Navbar

**Concept:** The nav floats above the page as a contained "island" — not spanning full width but constrained with `max-w-6xl mx-auto`. It has a white background with a subtle `border border-border` and `shadow-card`. On scroll past 80px, it gains `backdrop-blur` and slightly reduces its vertical padding (transition animated via Framer Motion layout).

**Structure:**
```
[FlowCore Logo] ————————— [Home] [Products] [Applications] [About] [Contact] ————————— [Get a Quote ▶]
```

**Dual-Tone Status Indicators:**
- Left of each nav link: a `4×4px` dot indicator
- Berlington-related links (Products, Applications): Deep Blue `#0F3D91` dot
- FlowCore/Flowchar links (Contact, About): Primary Green `#6CC24A` dot
- Active route: dot becomes filled + slightly larger (6×6px) with a `ring-2 ring-offset-1` in the appropriate color

**Mobile:** Hamburger → full-screen drawer with the same dual-tone indicators, items animate in with `riseUp` at 0.07s stagger.

**Key Implementation Notes:**
- Use `usePathname()` from `next/navigation` for active route detection
- `position: fixed` + `top: 16px` + `left: 0` + `right: 0` + `z-index: 50`
- Island container: `mx-auto max-w-6xl px-6 py-3 rounded-2xl bg-white border border-border shadow-card`
- Scroll-aware opacity/blur: handled via `useScroll` + `useMotionValue` from Framer Motion

---

### 4.2 Split-Precision Hero

**Concept:** The hero is divided diagonally at approximately 60/40 — left zone is Deep Blue (Berlington/Hardware), right zone is Primary Green (Flowchar/Efficiency). A sharp diagonal border (`clip-path: polygon(...)`) separates the two.

**Left Panel (Deep Blue — Berlington):**
- Background `bg-deep-blue`
- Headline: `"Engineering Water Infrastructure"` — Poppins 700, white, 64px
- Sub: `"Premium pump systems from Berlington for industrial-grade reliability."`
- CTA: White button with blue text → "Explore Pumps"
- Background asset: `Berlington-Pumps-Set.png` as `next/image`, `objectFit: cover`, low opacity watermark at 20% (not decorative — establishes product identity)

**Right Panel (Green — Flowchar):**
- Background `bg-primary-green`
- Headline: `"FlowChar Efficiency"` — Poppins 700, `#0F3D91` (deep blue on green for contrast)
- Sub: `"Water treatment chemicals engineered for system longevity."`
- CTA: Deep Blue button → "Learn More"
- Background: Subtle chemical flow particle effect using pure CSS `@keyframes` (no JS needed)

**Diagonal Separator:**
- Implemented via two overlapping `clip-path` divs, not background-split (allows hover on each side independently)
- `clip-path` for left: `polygon(0 0, 62% 0, 58% 100%, 0 100%)`
- `clip-path` for right: `polygon(58% 0, 100% 0, 100% 100%, 54% 100%)`

**Animation Sequence (Framer Motion, staggered):**
1. Left text: `fadeSlideLeft` after 200ms
2. Right text: `fadeSlideRight` after 350ms
3. CTA buttons: `riseUp` after 500ms each

---

### 4.3 Featured Pumps Section — 3D Hover Grid

**Concept:** A grid of pump product cards that respond to mouse position with a CSS `perspective` + `rotateX/rotateY` effect. This is the memorable design anchor for the home page.

**Available Pump Assets (from `/pumps/`):**
| Filename | Series | Category |
|---|---|---|
| `cdl-cdlf.png` | CDL/CDLF | Vertical Multistage |
| `cdlf-cdh.png` | CDLF/CDH | Vertical Multistage |
| `cdlk-cdlkf.png` | CDLK/CDLKF | Vertical Multistage |
| `chl.png` | CHL | Horizontal Multistage |
| `chlf-chlf-t.png` | CHLF | Horizontal Multistage |
| `chm.png` | CHM | Horizontal Multistage |
| `wq.png` | WQ | Sewage / Submersible |
| `stp.png` | STP | Sewage Treatment |
| `bt.png` | BT | Tank/Booster |
| `hydro.png` | Hydro | Hydro Systems |
| `mini.png` | Mini | Mini Pump |
| `niso.png` | NISO | Industrial |
| `qy-b.png` | QY-B | Submersible |
| `sz.png` | SZ | Self-Priming |
| `zs.png` | ZS | Self-Priming |
| `ld.png` | LD | Pipeline |

**Grid Layout:** `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4` — responsive

**Card Anatomy:**
```
┌─────────────────────────┐
│  [SERIES TAG — GREEN]   │
│                         │
│   [PUMP IMAGE — 200px]  │
│                         │
│  CDL/CDLF               │
│  Vertical Multistage    │
│                         │
│  [→ View Specs]         │
└─────────────────────────┘
```

**3D Hover Effect:**
- `onMouseMove`: calculate `(e.clientX - rect.centerX) / rect.width * 15` for X-axis rotation
- Apply `transform: perspective(800px) rotateY(Xdeg) rotateX(Ydeg)` via React state
- `onMouseLeave`: reset to `rotateX(0) rotateY(0)` with `transition: 150ms ease-out`
- Implemented in a custom hook `use3DCardHover` — encapsulates all mouse math
- Cards also get `translateZ(12px)` on hover to "lift" from the background

**Card Border:** `border border-border` default → `border-primary-green` on hover (color transition 200ms)

**Section Header:**
- Tag: `FEATURED PRODUCTS` in green label style
- H2: `"The Berlington Range"` in deep blue
- Sub: `"Engineered for reliability across all industrial fluid applications."`

---

### 4.4 Stats Bar (Between Hero and Pumps)

**Purpose:** Social proof, builds trust with industrial buyers.

**3 Stats:**
- `16+` Series of Pumps
- `Pan-India` Distribution Network  
- `ISO-Grade` Manufacturing Standards

**Layout:** `flex justify-between` with a `border-t border-border` divider between items. Subtle `bg-section-bg` background. Numbers in Deep Blue, labels in text-light.

---

## 5. PAGE: Applications (`/applications`)

### 5.1 Layout Strategy

**Concept:** A "Technical Diagram" page — styled like an engineering schematic. The page uses a dark blueprint-like aesthetic only for **diagram zones** (contained areas, not the full page — light mode rule is preserved). Instead, diagrams use a `bg-deep-blue/5` (very light blue tint) background with dashed SVG borders.

### 5.2 Environment Sections

Three major application environments, each as a full-width section:

**1. Water Treatment Plant (WTP)**
- Background: `bg-section-bg`
- Layout: `grid grid-cols-1 lg:grid-cols-[1fr_2fr]` (label left, diagram right)
- Recommended Pumps: CDLF series (for pressure boosting), WQ (submersible intake)
- Diagram: SVG-based schematic of a WTP circuit (drawn with SVG `<path>` and `<circle>` in green for pipes, blue for equipment nodes)
- Hover behavior: mousing over an equipment node reveals a tooltip card showing the pump model, flow rate range, and head capacity

**2. HVAC Systems**
- Layout: Reversed — diagram left, label right
- Recommended Pumps: CHL, CHM (horizontal multistage), BT (booster)
- Diagram: Building cross-section with flow paths
- Hover: Same tooltip pattern, green animated flow lines via `stroke-dashoffset` CSS animation

**3. Industrial Processing**
- Full-width section with centered diagram
- Recommended Pumps: NISO (industrial), SZ/ZS (self-priming), LD (pipeline)
- Diagram: More complex multi-node schematic

### 5.3 Hover Tooltip Card Spec

```typescript
interface PumpTooltip {
  model: string;          // e.g. "CDLF 2-14"
  category: string;       // e.g. "Vertical Multistage"
  flowRange: string;      // e.g. "0.5 – 16 m³/h"
  headRange: string;      // e.g. "Up to 320m"
  image: StaticImageData; // from /pumps/
}
```

Tooltip appears with `precisionScale` animation. Positioned absolutely relative to the SVG node. Dismissed on `onMouseLeave`.

### 5.4 Green Flow Lines

CSS animation for pipe/flow indicators:
```css
.flow-line {
  stroke-dasharray: 8 4;
  animation: flowPulse 1.5s linear infinite;
}
@keyframes flowPulse {
  to { stroke-dashoffset: -24; }
}
```
Color: `stroke: #6CC24A` — green signifies active water/fluid flow and system health.

### 5.5 Section Tag Labels

Each environment section begins with:
- A green `SECTION_TAG` component: `"WATER TREATMENT"` / `"HVAC"` / `"INDUSTRIAL"`
- Styled: `text-xs font-semibold tracking-widest text-primary-green uppercase px-3 py-1 border border-primary-green rounded-sm inline-block`

---

## 6. PAGE: About Us (`/about`)

### 6.1 Split-Screen Opening Panel

**Concept:** Full viewport-height split: left = "The Engineering" (Berlington), right = "The Solution" (FlowCore). A vertical `2px solid #E5E7EB` divider runs between them.

**Left Panel — "The Engineering" (Berlington):**
- Background: `bg-section-bg`
- Logo: `berlington-logo.png` via `next/image`, contained at `180px` width
- Headline: `"Built for Industrial Demands"`
- Body: Berlington's manufacturing heritage, ISO standards, product range
- Accent: Deep Blue `#0F3D91`

**Right Panel — "The Solution" (FlowCore):**
- Background: `bg-white`
- Logo: `flowcore-logo.png` via `next/image`
- Headline: `"Your Engineering Partner"`
- Body: FlowCore's distribution, support, Flowchar chemical solutions
- Accent: Primary Green `#6CC24A`

**Animation:** Left panel `fadeSlideLeft`, right panel `fadeSlideRight`, triggered by `useInView` scroll detection.

**Responsive:** On mobile, the split becomes a stacked vertical layout (`flex-col`) with a `2px solid #E5E7EB` horizontal rule between them.

### 6.2 Expertise Timeline

**Concept:** An industrial vertical-line motif — a single `2px solid #1E5BB8` vertical line runs down the left side of the section. Milestone items hang off this line like technical annotations.

**Timeline Item Anatomy:**
```
    |
    ●——— [YEAR TAG]
    |    
    |    Headline
    |    Description text (2–3 lines)
    |    [Optional: pump image or manufacturing photo]
    |
    ●——— [YEAR TAG]
    ...
```

**Dot/Connector style:**
- Circle: `w-4 h-4 rounded-full bg-primary-blue border-4 border-white ring-2 ring-primary-blue`
- Connector line (horizontal `——`): `2px solid #E5E7EB` going from dot to content card
- Content card: `bg-white border border-border rounded-lg p-6 shadow-card ml-8`

**Assets used in timeline:**
- `manufacture-process.png` — manufacturing milestone
- `factory-outlet.png` — distribution milestone
- `Berlington-Pumps-Set.png` — product range milestone

**Timeline Animation:** Items enter with `fadeSlideLeft` and `0.07s` stagger as they enter viewport.

### 6.3 Values Section — "Quality, Durability, Engineering"

**Three-column card grid:**
```
[⚙️ Quality]           [🔩 Durability]        [📐 Engineering]
ISO-grade materials    Built to outlast       Precision-matched
in every component     operational demands    to your requirements
```

Icon: Inline SVG (no icon library) — simple geometric shapes fitting the industrial aesthetic.
Card: `bg-section-bg border border-border rounded-xl p-8`
Hover: `border-primary-green shadow-green` transition 200ms

---

## 7. PAGE: Products (`/products`)

### 7.1 Page Layout

```
┌──────────────────────────────────────────────┐
│  [Section Header + Filter Summary line]       │
├─────────────┬────────────────────────────────┤
│             │                                │
│  SIDEBAR    │  PRODUCT GRID                  │
│  (280px)    │  (fluid width)                 │
│             │                                │
│ Categories: │  [Card] [Card] [Card]          │
│ □ All       │  [Card] [Card] [Card]          │
│ □ CDL/CDLF  │  [Card] [Card] [Card]          │
│ □ CHL/CHM   │                                │
│ □ WQ Sewage │                                │
│ □ STP       │                                │
│ □ Hydro     │                                │
│ □ Specialty │                                │
│             │                                │
└─────────────┴────────────────────────────────┘
```

**Responsive:** Sidebar collapses to a horizontal scrollable filter chip row on mobile (`overflow-x-auto`).

### 7.2 Sidebar Filter Categories

```typescript
type PumpCategory = {
  id: string;
  label: string;
  color: 'blue' | 'green'; // Blue = structural, Green = fluid/treatment
  pumps: string[];          // pump image keys
}

const CATEGORIES: PumpCategory[] = [
  { id: 'all',          label: 'All Products',           color: 'blue',  pumps: [...] },
  { id: 'cdl',          label: 'Vertical Multistage',    color: 'blue',  pumps: ['cdl-cdlf', 'cdlf-cdh', 'cdlk-cdlkf'] },
  { id: 'chl',          label: 'Horizontal Multistage',  color: 'blue',  pumps: ['chl', 'chlf-chlf-t', 'chm'] },
  { id: 'sewage',       label: 'Sewage & Submersible',   color: 'green', pumps: ['wq', 'stp', 'qy-b'] },
  { id: 'hydro',        label: 'Hydro & Booster',        color: 'green', pumps: ['hydro', 'bt'] },
  { id: 'self-priming', label: 'Self-Priming',           color: 'blue',  pumps: ['sz', 'zs'] },
  { id: 'pipeline',     label: 'Pipeline & Industrial',  color: 'blue',  pumps: ['ld', 'niso', 'mini'] },
];
```

**Active filter state:** Selected category chip gets `bg-primary-blue text-white` (for blue categories) or `bg-primary-green text-white` (for green categories).

**Filter interaction:** Client-side only — filter state in `useState`, no URL params needed (this is a catalog display, not a search tool).

### 7.3 Product Card — Technical Spec Sheet Style

**Concept:** Cards look like an abbreviated technical data sheet — not a retail product card. They have a spec table, not a bulleted feature list.

**Card Anatomy:**
```
┌────────────────────────────────┐
│ VERTICAL MULTISTAGE     [CDL] │  ← category tag (green, left) + series code (blue, right)
│                                │
│   [PUMP IMAGE — 220px tall]    │
│   next/image, contain, centered│
│                                │
├────────────────────────────────┤
│ CDL / CDLF Series              │  ← H3, deep blue
│ Vertical Multistage Pump       │  ← subtitle, text-light
│                                │
│ Flow Rate   Head      Power    │  ← spec labels
│ 0.5–16 m³/h Up to 320m 0.37–45kW │ ← spec values (monospace, primary-blue)
│                                │
│ [→ Enquire Now]                │  ← green CTA
└────────────────────────────────┘
```

**Spec Row:** `grid grid-cols-3` with `border-t border-border pt-3 mt-3`

**Image container:** `bg-section-bg rounded-lg overflow-hidden` — isolates pump on light bg

### 7.4 Framer Motion Layout Transitions

When the user switches categories, the product grid uses `AnimatePresence` + `motion.div` with `layout` prop:
```typescript
<AnimatePresence mode="popLayout">
  {filteredPumps.map(pump => (
    <motion.div
      key={pump.id}
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25, ease: [0.25, 0, 0, 1] }}
    >
      <ProductCard pump={pump} />
    </motion.div>
  ))}
</AnimatePresence>
```

**Performance:** `will-change: transform` added only during active animation (Framer handles this).

---

## 8. PAGE: Contact (`/contact`)

### 8.1 Global Presence Layout

**Two-column layout:**
- Left (60%): Location cards
- Right (40%): Industrial Inquiry Form

**Responsive:** Stacks vertically on mobile, form below locations.

### 8.2 Location Cards

**Based on addresses in the FlowCore "Invitation" document:**
```typescript
type OfficeLocation = {
  city: string;
  country: string;
  type: 'headquarters' | 'branch' | 'distribution';
  address: string;
  phone?: string;
  email?: string;
}
```

**Card Grid:** `grid grid-cols-1 sm:grid-cols-2` inside left column

**Card Anatomy:**
```
┌──────────────────────────────┐
│ [●] HEADQUARTERS             │  ← dot indicator (green) + type tag
│                              │
│ Chennai, India               │  ← city (H3, deep blue)
│                              │
│ 123 Industrial Zone,         │
│ Anna Salai, Chennai 600002   │  ← address (text-light)
│                              │
│ 📞 +91 44 0000 0000          │
│ ✉ info@flowcore.in           │
└──────────────────────────────┘
```

**HQ card:** `bg-deep-blue text-white` — visually distinguished from branch cards
**Branch cards:** `bg-section-bg border border-border`
**Hover:** Branch cards get `border-primary-green` + `shadow-green`

**No external map embeds** (no Google Maps — avoids GDPR overhead and external SDK). Instead, use a stylized SVG of India (or world map region) with location dots plotted via absolute positioning.

### 8.3 Industrial Inquiry Form

**Form Fields:**
```
Full Name*                     Company Name*
[___________________________]  [___________________________]

Email Address*                 Phone Number
[___________________________]  [___________________________]

Product / Series of Interest
[Dropdown ▼ — All Pump Series]

Application / Use Case
[_______________________________________________]
[_______________________________________________]

Message
[_______________________________________________]
[_______________________________________________]
[_______________________________________________]

                                    [Submit Inquiry →]  ← Green CTA
```

**Form Validation:** HTML5 + React controlled components. No external validation library.

**CTA Button Spec:**
```tsx
// GreenCTAButton — the only green button component in the system
className="bg-primary-green text-white px-8 py-4 rounded-lg font-semibold text-base
           hover:bg-dark-green hover:shadow-green
           active:scale-[0.98] transition-all duration-150
           focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2"
```

**Form styling:** Inputs use `border border-border rounded-lg px-4 py-3 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none transition-colors`. No shadows on focus — clean, industrial feel.

**Submit behavior:** `action=""` — form post handled by Next.js API route `/api/contact` (to be defined). Shows a success state inline (no full-page redirect): heading changes to `"Inquiry Received"` with a green checkmark SVG.

---

## 9. COMPONENT: Navbar — Implementation Detail

### State Machine
```typescript
type NavState = 'transparent' | 'floated';
// transparent: at top of page (scrollY < 80)
// floated: scrolled (scrollY >= 80) — adds backdrop, shrinks padding
```

### Nav Links Data
```typescript
const NAV_LINKS = [
  { href: '/',              label: 'Home',         indicator: 'blue' },
  { href: '/products',      label: 'Products',     indicator: 'blue' },
  { href: '/applications',  label: 'Applications', indicator: 'blue' },
  { href: '/about',         label: 'About',         indicator: 'green' },
  { href: '/contact',       label: 'Contact',       indicator: 'green' },
] as const;
```

### CTA Button
- Label: `"Get a Quote"`
- Style: `bg-primary-blue text-white px-5 py-2 rounded-lg text-sm font-semibold`
- On hover: `bg-deep-blue` — conservative, not the green CTA pattern (no green in the nav)
- On mobile drawer: becomes `GreenCTAButton` (larger, full-width) — the conversion moment

---

## 10. COMPONENT: Footer

**Layout:** Three-column footer with a top `border-t border-border`

**Column 1 — Brand:**
- `flowcore-logo.png` (120px)
- Tagline: `"Engineering fluid systems for a sustainable future."`
- Social icons (SVG inline): LinkedIn, WhatsApp

**Column 2 — Quick Links:**
- Navigation links (same as Navbar)

**Column 3 — Contact Snippet:**
- Primary location address
- Email and phone

**Bottom bar:** Copyright line, `bg-deep-blue text-white` strip

---

## 11. Data Layer — `lib/` Types

### `pump-data.ts`
```typescript
export type PumpModel = {
  id: string;
  seriesCode: string;       // e.g. "CDL"
  fullName: string;         // e.g. "CDL/CDLF Series"
  category: string;         // e.g. "Vertical Multistage"
  imagePath: string;        // e.g. "/assets/pumps/cdl-cdlf.png"
  flowRate: string;         // e.g. "0.5 – 16 m³/h"
  maxHead: string;          // e.g. "Up to 320m"
  powerRange: string;       // e.g. "0.37 – 45 kW"
  applications: string[];   // e.g. ["WTP", "HVAC", "Irrigation"]
};

export const PUMP_CATALOG: PumpModel[] = [
  // 16 entries from the pump assets
];
```

### `application-data.ts`
```typescript
export type ApplicationEnvironment = {
  id: string;
  name: string;                // e.g. "Water Treatment Plant"
  shortName: string;           // e.g. "WTP"
  description: string;
  recommendedPumps: string[];  // pump IDs
  diagramNodes: DiagramNode[];
};

export type DiagramNode = {
  id: string;
  label: string;               // e.g. "Pressure Boosting Stage"
  x: number;                   // SVG coordinate, 0–100 (%)
  y: number;
  pumpModelId: string;
};
```

---

## 12. Performance Rules

| Concern | Rule |
|---|---|
| Images | All images via `next/image` with explicit `width` and `height`. Use `priority` on above-fold images (hero, navbar logo) |
| Fonts | Poppins loaded via `next/font/google` in `layout.tsx`, subset to `latin`, weights `400,500,600,700` |
| Animations | `useInView` from Framer Motion — elements only animate when entering viewport (not on load) |
| 3D Cards | `will-change: transform` only set via inline style `onMouseEnter`, removed `onMouseLeave` |
| Client Boundary | Only components with `useState`/`useEffect`/mouse handlers are `"use client"`. Everything else is RSC |

---

## 13. Accessibility

- All interactive elements have unique, descriptive `id` attributes for browser testing
- Color contrast: Green `#6CC24A` on white fails WCAG AA for small text — **use green only for large labels, borders, and CTAs on white**. For text on green background, use `#0F3D91` (deep blue) which passes AA
- Focus rings: `focus-visible:ring-2` on all interactive elements — never `outline: none` without replacement
- Pump images: `alt` text must describe the pump model and series (not "pump image")
- Form labels: all form inputs have associated `<label>` elements (not placeholder-only)
- SVG diagrams: wrap in `role="img"` with `aria-label` describing the application environment

---

## 14. Decision Log

| Decision | Alternatives Considered | Rationale |
|---|---|---|
| Diagonal clip-path hero (not CSS background-split) | CSS linear-gradient split, Two separate `<div>` full-width | Clip-path allows independent hover zones, more control |
| SVG diagrams (no third-party map) | Google Maps embed, Leaflet.js | Avoids external SDK, keeps bundle clean, fits the technical schematic aesthetic |
| 3D hover via `onMouseMove` (not CSS perspective transform) | Pure CSS `:hover` 3D, CSS `transform-style: preserve-3d` | React state gives per-card precision; CSS-only won't track mouse position within the card |
| Client-side filter (no URL params) | URL query params for bookmarkability | Product catalog filter is not a primary user journey entry point; simplicity wins |
| No Google Maps embed on Contact | Embedded map iframe | GDPR surface reduction + performance; SVG map is brand-aligned |
| Inline SVG icons (no icon library) | Heroicons, Lucide | Zero bundle cost, full color control, avoids forbidden npm packages |
| `AnimatePresence mode="popLayout"` for product grid | CSS transitions only | Framer's layout animation handles DOM reflow correctly; CSS alone can't animate element removal |

---

## 15. Implementation Order (Recommended)

Execute in this sequence to minimize rework:

```
Phase 1 — Foundation (no visible output yet)
  ├── Extend globals.css with final @theme tokens
  ├── Create lib/pump-data.ts with all 16 pump entries
  ├── Create lib/application-data.ts
  ├── Create lib/location-data.ts
  └── Create app/layout.tsx with Poppins font + metadata

Phase 2 — Shared Components
  ├── components/ui/PrecisionReveal.tsx
  ├── components/ui/GreenCTAButton.tsx
  ├── components/ui/SectionTag.tsx
  ├── components/layout/Navbar.tsx
  └── components/layout/Footer.tsx

Phase 3 — Pages (build independently, highest to lowest priority)
  ├── Home (highest business priority — Hero + 3D Grid)
  ├── Products (primary catalog — Sidebar + Grid + Cards)
  ├── Applications (technical differentiator — Diagrams)
  ├── About (trust building)
  └── Contact (conversion)

Phase 4 — Polish & Verify
  ├── Responsive audit (mobile, tablet, desktop)
  ├── Accessibility audit (contrast, focus, aria)
  ├── Animation performance audit (no layout thrash)
  └── next/image optimization audit (no CLS)
```

---

## 16. Strict Constraint Checklist

- [x] Next.js 15 App Router only
- [x] Tailwind v4 `@theme` block (no tailwind.config.js)
- [x] Framer Motion v12 for animations
- [x] No Shadcn components anywhere
- [x] No dark mode anywhere
- [x] No inline styles (except dynamic `transform` on 3D cards via style prop — unavoidable)
- [x] All images via `next/image`
- [x] Poppins as the sole font family
- [x] Assets from `/app/assets/pumps/` and `/app/assets/logos/` only
- [x] Green = fluid/action/CTA, Blue = structure/hardware always
- [x] No external UI libraries beyond Framer Motion

---

*End of Master Design Plan — Ready for implementation review.*
