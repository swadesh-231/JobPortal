# 04 — Implementation

Stack: React + TypeScript + Tailwind CSS v4 + shadcn/ui + Lucide React. No other UI or animation library. Routing: React Router (`/`, `/login`, `/signup`). Auth: Supabase (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`).

## Setup

```bash
npm i @fontsource-variable/geist @fontsource/instrument-serif lucide-react react-router @supabase/supabase-js
npx shadcn@latest add button input label badge card avatar dropdown-menu navigation-menu \
  dialog sheet select command popover tabs tooltip separator skeleton scroll-area \
  accordion collapsible checkbox radio-group toggle sonner alert
```

```ts
// main.tsx
import "@fontsource-variable/geist";
import "@fontsource/instrument-serif";
```

---

## globals.css

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  --radius: 0.625rem;
  --background: #FAFAF7;  --foreground: #17161A;
  --card: #FFFFFF;        --card-foreground: #17161A;
  --popover: #FFFFFF;     --popover-foreground: #17161A;
  --primary: #5746E0;     --primary-foreground: #FFFFFF;
  --primary-hover: #4838C7;
  --primary-soft: #EFEDFE; --primary-soft-foreground: #3D2FB0;
  --primary-text: #5746E0;
  --secondary: #EFEEE9;   --secondary-foreground: #17161A; --secondary-hover: #E6E4DE;
  --muted: #F1F0EB;       --muted-foreground: #5F5E66;
  --placeholder: #76757D;
  --accent: #F1F0EB;      --accent-foreground: #17161A;
  --destructive: #C42F29; --destructive-soft: #FBEBEA;
  --success: #16683F;     --success-soft: #E5F3EB;
  --warning: #8A5200;     --warning-soft: #FBF0DC;
  --info: #0B627B;        --info-soft: #E2F2F6;
  --border: #E6E4DD;      --border-strong: #D0CEC6;
  --input: #8A8992;       --ring: #5746E0;
  --inverse: #17161A;     --inverse-foreground: #FAFAF7; --inverse-muted: #ACABB3;
  --glow: rgb(87 70 224 / 0.14);

  --status-saved: #4E4D55;     --status-saved-soft: #F1F0EB;
  --status-applied: #3D2FB0;   --status-applied-soft: #EFEDFE;
  --status-screening: #0B627B; --status-screening-soft: #E2F2F6;
  --status-interview: #8A5200; --status-interview-soft: #FBF0DC;
  --status-offer: #16683F;     --status-offer-soft: #E5F3EB;
  --status-rejected: #8E3530;  --status-rejected-soft: #F8EAE8;

  --elevation-xs: 0 1px 2px rgb(23 22 26 / 0.05);
  --elevation-card: 0 1px 2px rgb(23 22 26 / 0.04), 0 8px 20px -8px rgb(23 22 26 / 0.10);
  --elevation-elevated: 0 2px 4px rgb(23 22 26 / 0.04), 0 24px 48px -16px rgb(23 22 26 / 0.16);
  --elevation-modal: 0 24px 64px -16px rgb(23 22 26 / 0.28);
}

.dark {
  --background: #0C0C0F;  --foreground: #EDEDF0;
  --card: #141418;        --card-foreground: #EDEDF0;
  --popover: #18181D;     --popover-foreground: #EDEDF0;
  --primary: #6352EA;     --primary-foreground: #FFFFFF;
  --primary-hover: #7263F0;
  --primary-soft: #221C52; --primary-soft-foreground: #C3BCFF;
  --primary-text: #9D92FF;
  --secondary: #222228;   --secondary-foreground: #EDEDF0; --secondary-hover: #2A2A31;
  --muted: #1C1C21;       --muted-foreground: #9D9CA6;
  --placeholder: #82818B;
  --accent: #212127;      --accent-foreground: #EDEDF0;
  --destructive: #C93A33; --destructive-soft: #2C1716;
  --success: #7FD3A2;     --success-soft: #13261C;
  --warning: #F2C26B;     --warning-soft: #2A2010;
  --info: #7CCDE3;        --info-soft: #0F2530;
  --border: #26262D;      --border-strong: #35353E;
  --input: #71707B;       --ring: #9D92FF;
  --inverse: #1D1848;     --inverse-foreground: #EDEDF0; --inverse-muted: #ACABB3;
  --glow: rgb(99 82 234 / 0.22);

  --status-saved: #ACABB3;     --status-saved-soft: #1C1C21;
  --status-applied: #C3BCFF;   --status-applied-soft: #221C52;
  --status-screening: #7CCDE3; --status-screening-soft: #0F2530;
  --status-interview: #F2C26B; --status-interview-soft: #2A2010;
  --status-offer: #7FD3A2;     --status-offer-soft: #13261C;
  --status-rejected: #F0A29C;  --status-rejected-soft: #2C1716;

  --elevation-xs: 0 1px 2px rgb(0 0 0 / 0.4);
  --elevation-card: 0 1px 2px rgb(0 0 0 / 0.3), 0 8px 20px -8px rgb(0 0 0 / 0.5);
  --elevation-elevated: 0 2px 4px rgb(0 0 0 / 0.3), 0 24px 48px -16px rgb(0 0 0 / 0.6);
  --elevation-modal: 0 24px 64px -16px rgb(0 0 0 / 0.7);
}

@theme inline {
  --font-sans: "Geist Variable", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Instrument Serif", ui-serif, Georgia, serif;

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
  /* display → title are set in the serif display face (font-display), which has one weight */
  --text-display: 4.5rem;   --text-display--line-height: 1;    --text-display--letter-spacing: -0.02em;  --text-display--font-weight: 400;
  --text-h1: 3.5rem;        --text-h1--line-height: 1.04;      --text-h1--letter-spacing: -0.018em;      --text-h1--font-weight: 400;
  --text-h2: 2.625rem;      --text-h2--line-height: 1.1;       --text-h2--letter-spacing: -0.015em;      --text-h2--font-weight: 400;
  --text-title: 2.125rem;   --text-title--line-height: 1.12;   --text-title--letter-spacing: -0.012em;   --text-title--font-weight: 400;
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