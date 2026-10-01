# 04 — Implementation

Stack: React + TypeScript + Tailwind CSS v4 + shadcn/ui + Lucide React. No other UI or animation library.

## Setup

```bash
npm i @fontsource-variable/instrument-sans lucide-react
npx shadcn@latest add button input label badge card avatar dropdown-menu navigation-menu \
  dialog sheet select command popover tabs tooltip separator skeleton scroll-area \
  accordion collapsible checkbox radio-group toggle sonner alert
```

```ts
// main.tsx (includes weight + width axes)
import "@fontsource-variable/instrument-sans/wdth.css";
// Next.js alternative: Instrument_Sans({ subsets: ["latin"], axes: ["wdth"], variable: "--font-instrument" })
```

---

## globals.css

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  --radius: 0.5rem;
  --background: #F5F6F3;  --foreground: #181B1F;
  --card: #FFFFFF;        --card-foreground: #181B1F;
  --popover: #FFFFFF;     --popover-foreground: #181B1F;
  --primary: #2B3AD8;     --primary-foreground: #FFFFFF;
  --primary-hover: #2430BC;
  --primary-soft: #ECEEFD; --primary-soft-foreground: #1F2BA8;
  --primary-text: #2B3AD8;
  --secondary: #E9EBE7;   --secondary-foreground: #181B1F; --secondary-hover: #DFE2DD;
  --muted: #ECEEEA;       --muted-foreground: #565E66;
  --placeholder: #6C747C;
  --accent: #ECEEEA;      --accent-foreground: #181B1F;
  --destructive: #C42F29; --destructive-soft: #FBEBEA;
  --success: #16683F;     --success-soft: #E5F3EB;
  --warning: #8A5200;     --warning-soft: #FBF0DC;
  --info: #0B627B;        --info-soft: #E2F2F6;
  --border: #DFE2DC;      --border-strong: #C7CBC5;
  --input: #858C93;       --ring: #2B3AD8;
  --inverse: #181B1F;     --inverse-foreground: #F5F6F3; --inverse-muted: #A9B0B7;

  --status-saved: #4A5259;     --status-saved-soft: #ECEEEA;
  --status-applied: #1F2BA8;   --status-applied-soft: #ECEEFD;
  --status-screening: #0B627B; --status-screening-soft: #E2F2F6;
  --status-interview: #8A5200; --status-interview-soft: #FBF0DC;
  --status-offer: #16683F;     --status-offer-soft: #E5F3EB;
  --status-rejected: #8E3530;  --status-rejected-soft: #F8EAE8;

  --elevation-xs: 0 1px 2px rgb(24 27 31 / 0.05);
  --elevation-card: 0 1px 2px rgb(24 27 31 / 0.04), 0 4px 12px -4px rgb(24 27 31 / 0.08);
  --elevation-elevated: 0 2px 4px rgb(24 27 31 / 0.04), 0 12px 32px -8px rgb(24 27 31 / 0.14);
  --elevation-modal: 0 24px 64px -16px rgb(24 27 31 / 0.28);
}

.dark {
  --background: #0F1113;  --foreground: #ECEEEA;
  --card: #16191C;        --card-foreground: #ECEEEA;
  --popover: #1A1D21;     --popover-foreground: #ECEEEA;
  --primary: #4F5EF0;     --primary-foreground: #FFFFFF;
  --primary-hover: #6370F6;
  --primary-soft: #1B2050; --primary-soft-foreground: #B9C0FF;
  --primary-text: #8A95FF;
  --secondary: #23272C;   --secondary-foreground: #ECEEEA; --secondary-hover: #2B3036;
  --muted: #1E2226;       --muted-foreground: #9AA2AA;
  --placeholder: #80888F;
  --accent: #22262B;      --accent-foreground: #ECEEEA;
  --destructive: #C93A33; --destructive-soft: #2C1716;
  --success: #7FD3A2;     --success-soft: #13261C;
  --warning: #F2C26B;     --warning-soft: #2A2010;
  --info: #7CCDE3;        --info-soft: #0F2530;
  --border: #262A2F;      --border-strong: #343A40;
  --input: #6F7882;       --ring: #8A95FF;
  --inverse: #1B2050;     --inverse-foreground: #ECEEEA; --inverse-muted: #A9B0B7;

  --status-saved: #A9B0B7;     --status-saved-soft: #1E2226;
  --status-applied: #B9C0FF;   --status-applied-soft: #1B2050;
  --status-screening: #7CCDE3; --status-screening-soft: #0F2530;
  --status-interview: #F2C26B; --status-interview-soft: #2A2010;
  --status-offer: #7FD3A2;     --status-offer-soft: #13261C;
  --status-rejected: #F0A29C;  --status-rejected-soft: #2C1716;

  --elevation-xs: 0 1px 2px rgb(0 0 0 / 0.4);
  --elevation-card: 0 1px 2px rgb(0 0 0 / 0.3), 0 4px 12px -4px rgb(0 0 0 / 0.5);
  --elevation-elevated: 0 2px 4px rgb(0 0 0 / 0.3), 0 16px 40px -8px rgb(0 0 0 / 0.6);
  --elevation-modal: 0 24px 64px -16px rgb(0 0 0 / 0.7);
}

@theme inline {
  --font-sans: "Instrument Sans Variable", ui-sans-serif, system-ui, sans-serif;

  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary-hover: var(--primary-hover);
  --color-primary-soft: var(--primary-soft);
  --color-primary-soft-foreground: var(--primary-soft-foreground);
  --color-primary-text: var(--primary-text);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary-hover: var(--secondary-hover);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-placeholder: var(--placeholder);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-soft: var(--destructive-soft);
  --color-success: var(--success);
  --color-success-soft: var(--success-soft);
  --color-warning: var(--warning);
  --color-warning-soft: var(--warning-soft);
  --color-info: var(--info);
  --color-info-soft: var(--info-soft);
  --color-border: var(--border);
  --color-border-strong: var(--border-strong);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-inverse: var(--inverse);
  --color-inverse-foreground: var(--inverse-foreground);
  --color-inverse-muted: var(--inverse-muted);
  --color-status-saved: var(--status-saved);
  --color-status-saved-soft: var(--status-saved-soft);
  --color-status-applied: var(--status-applied);
  --color-status-applied-soft: var(--status-applied-soft);
  --color-status-screening: var(--status-screening);
  --color-status-screening-soft: var(--status-screening-soft);
  --color-status-interview: var(--status-interview);
  --color-status-interview-soft: var(--status-interview-soft);
  --color-status-offer: var(--status-offer);
  --color-status-offer-soft: var(--status-offer-soft);
  --color-status-rejected: var(--status-rejected);
  --color-status-rejected-soft: var(--status-rejected-soft);

  --radius-xs: 0.125rem;
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --shadow-xs: var(--elevation-xs);
  --shadow-card: var(--elevation-card);
  --shadow-elevated: var(--elevation-elevated);
  --shadow-modal: var(--elevation-modal);
}

@theme {
  --text-display: 3.5rem;   --text-display--line-height: 1.04; --text-display--letter-spacing: -0.032em; --text-display--font-weight: 600;
  --text-h1: 2.75rem;       --text-h1--line-height: 1.08;      --text-h1--letter-spacing: -0.028em;      --text-h1--font-weight: 600;
  --text-h2: 2rem;          --text-h2--line-height: 1.15;      --text-h2--letter-spacing: -0.022em;      --text-h2--font-weight: 600;
  --text-title: 1.625rem;   --text-title--line-height: 1.2;    --text-title--letter-spacing: -0.018em;   --text-title--font-weight: 600;
  --text-h3: 1.375rem;      --text-h3--line-height: 1.3;       --text-h3--letter-spacing: -0.015em;      --text-h3--font-weight: 600;
  --text-h4: 1.0625rem;     --text-h4--line-height: 1.4;       --text-h4--letter-spacing: -0.01em;       --text-h4--font-weight: 600;
  --text-body-lg: 1.125rem; --text-body-lg--line-height: 1.6;  --text-body-lg--letter-spacing: -0.005em;
  --text-body: 1rem;        --text-body--line-height: 1.6;
  --text-body-sm: 0.875rem; --text-body-sm--line-height: 1.45;
  --text-label: 0.8125rem;  --text-label--line-height: 1.3;    --text-label--letter-spacing: 0.005em;    --text-label--font-weight: 500;
  --text-caption: 0.75rem;  --text-caption--line-height: 1.35; --text-caption--letter-spacing: 0.01em;

  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --animate-bookmark-pop: bookmark-pop 160ms var(--ease-out-quart);
  --animate-fit-fill: fit-fill 520ms var(--ease-out-quart) both;

  @keyframes bookmark-pop { 0% { transform: scale(0.8) } 60% { transform: scale(1.08) } 100% { transform: scale(1) } }
  @keyframes fit-fill { from { transform: scaleX(0) } to { transform: scaleX(1) } }
}

@utility scrollbar-none {
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
}

/* animation-delay-80, animation-delay-160 … */
@utility animation-delay-* {
  animation-delay: calc(--value(integer) * 1ms);
}

@layer base {
  * { @apply border-border outline-ring/50; }
  html { @apply scroll-pt-20; }
  body { @apply bg-background font-sans text-body text-foreground antialiased; }
  h1, h2, h3, h4 { text-wrap: balance; }
  p { text-wrap: pretty; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Folder structure

```
src/
├── app/page.tsx              # composes sections only
├── components/
│   ├── layout/               # Navbar, MobileNav, Footer, Container, Section, SectionHeader, Logo
│   ├── landing/              # Hero, HeroResults, SearchBar, LocationCombobox, SocialProof,
│   │                         # FeaturedJobs, ValueProposition, ProductPreview, PreviewMobile,
│   │                         # HowItWorks, SmartMatching, ApplicationTracker, Testimonials, FinalCta
│   ├── jobs/                 # JobCard, JobCardSkeleton, JobRow, JobDetailPane, JobBadge, JobMeta,
│   │                         # SalaryText, FitLine, BookmarkButton, ApplyButton, CompanyMark
│   ├── tracker/              # TrackerBoard, TrackerColumn, TrackerCard, StatusBadge
│   ├── shared/               # Panel, SampleBadge, EmptyState, ErrorState, ThemeToggle
│   ├── icons/social.tsx      # brand SVGs
│   └── ui/                   # shadcn
├── config/site.ts
├── lib/                      # utils (cn), format, fit, sample-data
├── hooks/useScrolled.ts      # IntersectionObserver for navbar
└── types/job.ts
```

**Rules**
- `page.tsx` only orders sections. Sections never set their own padding or max width.
- `jobs/*` and `tracker/*` are product components — take typed data, reusable on real pages unchanged.
- Fit, status, salary, company mark logic lives in one component each. Never re-implement inline.
- `"use client"` only for: Navbar, MobileNav, SearchBar, LocationCombobox, HeroResults, ProductPreview, PreviewMobile, BookmarkButton, FeaturedJobs, TrackerBoard, ThemeToggle.
- Class merging via `cn()`; variants via `cva`; state via `data-*` / `aria-*` variants.
- Keep files under ~200 lines.

## Tailwind rules

- Semantic tokens only. Never `bg-white`, `text-gray-*`, `bg-blue-*`, or hex in TSX.
- Type tokens (`text-h2`, `text-label`) instead of `text-sm` + leading + tracking.
- Spacing from the 4px scale. No `p-[13px]`. Allowed arbitrary: Radix vars (`w-(--radix-popover-trigger-width)`), `after:content-['']`.
- No inline styles, no `!important`, no `@apply` outside `globals.css`.
- Dark mode via `.dark` on `<html>`; tokens handle it — avoid `dark:` overrides.

---

## Types

```ts
export type WorkMode = "remote" | "hybrid" | "onsite";
export type JobType = "full-time" | "part-time" | "contract" | "internship";
export type ApplicationStatus = "saved" | "applied" | "screening" | "interview" | "offer" | "rejected";

export interface Company { id: string; name: string; logoUrl?: string; industry: string; verified: boolean }
export interface Salary { min: number; max?: number; currency: "INR" | "USD"; period: "year" | "month" }
export interface Fit { met: number; partial: number; total: number; matchedSkills: string[]; missingSkills: string[]; reason?: string }

export interface Job {
  id: string; slug: string; title: string; company: Company;
  location: string; workMode: WorkMode; type: JobType;
  experience: { min: number; max?: number };
  salary: Salary | null;               // null = not disclosed
  tags: string[]; postedAt: string; deadline?: string;
  status: "open" | "closed";
  applyMethod: "platform" | "external";
  category: "engineering" | "design" | "product" | "data";
  fit?: Fit; isSample?: boolean;
}
```

Helpers: `lib/fit.ts` → `getFitTier(fit)`; `lib/format.ts` → `formatSalary`, `formatExperience`, `formatPosted`.

## Sample data

Sample profile: Frontend engineer, 4 yrs, React + TypeScript, Bengaluru or remote, min ₹25 LPA. All companies fictional.

| Title | Company | Location / mode | Exp | Salary | Tags | Fit |
|---|---|---|---|---|---|---|
| Senior Frontend Engineer | Quillbase ✓ | Bengaluru, Hybrid | 4–6 | ₹32–42 LPA | React, TypeScript, Next.js, GraphQL | 7/9 |
| Backend Engineer, Payments | Halden Pay ✓ | Remote (India) | 3–5 | ₹26–34 LPA | Java, Spring Boot, PostgreSQL, Kafka | 3/8 |
| Product Designer | Ferngate Studio | Pune, On-site | 2–4 | ₹14–20 LPA | Figma, Design systems | 2/7 |
| Data Analyst | Tidewater Health | Hyderabad, Hybrid | 1–3 | ₹9–13 LPA | SQL, Python, Looker | 1/6 |
| Platform Engineer | Marlow Logistics | Bengaluru, On-site | 5–8 | not disclosed | Kubernetes, Terraform, AWS | 1/8 |
| ML Intern | Kestrel Analytics | Remote (India) | 0 | ₹50–70k / month | Python, PyTorch | 2/6 |

Hero rows: Quillbase Senior Frontend (7/9), Halden Pay Frontend Engineer, Checkout (6/7), Tidewater UI Engineer (5/8).

## Site config

```ts
export const siteConfig = {
  name: "Shortlist",
  cities: ["Bengaluru", "Hyderabad", "Pune", "Mumbai", "Delhi NCR", "Chennai"],
  popularSearches: ["React developer", "Java backend", "Product designer", "Data analyst", "Remote only"],
  socialProof: { enabled: false, logos: [], stats: [] },   // true only with real data
  testimonials: { enabled: false, items: [] },             // true only with real, consented quotes
} as const;
```

---

## Done when

- [ ] Hero alone explains what the product does.
- [ ] No palette colors / hex in TSX; no gradients; nothing rounder than `rounded-xl`.
- [ ] Only the two product frames carry `shadow-elevated` at rest.
- [ ] Tested at 320, 375, 768, 1024, 1280, 1440 — no horizontal page scroll; mobile layouts are the alternate designs, not shrunk desktop.
- [ ] Keyboard walkthrough works with visible focus; axe shows 0 violations; reduced motion respected.
- [ ] Loading, empty, error, closed, expired, signed-out states implemented; skeletons cause no layout shift.
- [ ] No `[PLACEHOLDER]` visible in production; every `[VERIFY]` confirmed or removed.