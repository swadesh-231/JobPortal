# 01 — Foundations

Visual system for **Shortlist** (working name) — a job-search workspace that ranks roles by fit, explains each match, and tracks every application.

Read order: `01-foundations` → `02-components` → `03-landing-page` → `04-implementation`.

---

## 1. Product message

**One line:** Shortlist ranks open roles by how well they fit your profile, shows exactly why, and tracks every application from saved to offer.

Every section of the page proves one of three things:

| Pillar | Meaning |
|---|---|
| Discover | Search + feed ranked by fit, not by date |
| Decide | Each role shows requirements you meet and miss |
| Track | Every saved/applied role on one board |

**Copy rules**
- Sentence case everywhere. Plain, specific verbs. CTA says what happens ("Create free account", "Save role").
- No invented numbers. No "%" match scores — fit is "7 of 9 requirements".
- "AI" used at most twice on the page.
- Never: all-caps labels, eyebrow labels above headings, one highlighted word in a headline, `·`-joined meta strings, `→` on buttons, "unlock / supercharge / seamless / dream job".

**Visual rules**
- No gradients, glassmorphism (except navbar blur), illustrations, stock photos, or fake browser dots.
- Cards use borders, not shadows. Color only means "you / selected / your action".
- All visuals are real product UI built from components with sample data.

---

## 2. Color

### Semantic tokens

| Token | Light | Dark | Use |
|---|---|---|---|
| `background` | `#F5F6F3` | `#0F1113` | Page |
| `foreground` | `#181B1F` | `#ECEEEA` | Text |
| `card` | `#FFFFFF` | `#16191C` | Cards, inputs, frames |
| `popover` | `#FFFFFF` | `#1A1D21` | Menus, dialogs |
| `primary` | `#2B3AD8` | `#4F5EF0` | Primary button, Fit line, focus |
| `primary-foreground` | `#FFFFFF` | `#FFFFFF` | |
| `primary-hover` | `#2430BC` | `#6370F6` | |
| `primary-soft` | `#ECEEFD` | `#1B2050` | Selected rows, Remote badge, matched skills |
| `primary-soft-foreground` | `#1F2BA8` | `#B9C0FF` | |
| `primary-text` | `#2B3AD8` | `#8A95FF` | Links |
| `secondary` | `#E9EBE7` | `#23272C` | Secondary button |
| `muted` | `#ECEEEA` | `#1E2226` | Neutral badges, skeletons, wells |
| `muted-foreground` | `#565E66` | `#9AA2AA` | Secondary text |
| `placeholder` | `#6C747C` | `#80888F` | Input placeholder |
| `accent` | `#ECEEEA` | `#22262B` | Hover bg (ghost, menu items) |
| `border` | `#DFE2DC` | `#262A2F` | Cards, dividers |
| `border-strong` | `#C7CBC5` | `#343A40` | Hover borders, outline buttons |
| `input` | `#858C93` | `#6F7882` | Form control borders (≥3:1) |
| `ring` | `#2B3AD8` | `#8A95FF` | Focus ring |
| `destructive` | `#C42F29` | `#C93A33` | Errors |
| `success` / `-soft` | `#16683F` / `#E5F3EB` | `#7FD3A2` / `#13261C` | |
| `warning` / `-soft` | `#8A5200` / `#FBF0DC` | `#F2C26B` / `#2A2010` | |
| `info` / `-soft` | `#0B627B` / `#E2F2F6` | `#7CCDE3` / `#0F2530` | |
| `inverse` | `#181B1F` | `#1B2050` | Final CTA band |
| `inverse-foreground` | `#F5F6F3` | `#ECEEEA` | |
| `inverse-muted` | `#A9B0B7` | `#A9B0B7` | |

All text pairs meet WCAG AA (checked). Slate on white 6.6:1, white on primary 7.8:1.

### Application status

| Status | Text (L / D) | Bg (L / D) | Icon |
|---|---|---|---|
| Saved | `#4A5259` / `#A9B0B7` | `#ECEEEA` / `#1E2226` | `Bookmark` |
| Applied | `#1F2BA8` / `#B9C0FF` | `#ECEEFD` / `#1B2050` | `Send` |
| Screening | `#0B627B` / `#7CCDE3` | `#E2F2F6` / `#0F2530` | `ScanSearch` |
| Interview | `#8A5200` / `#F2C26B` | `#FBF0DC` / `#2A2010` | `CalendarClock` |
| Offer | `#16683F` / `#7FD3A2` | `#E5F3EB` / `#13261C` | `BadgeCheck` |
| Rejected | `#8E3530` / `#F0A29C` | `#F8EAE8` / `#2C1716` | `CircleSlash` |

### Rules
- One filled primary button per screen region.
- Section backgrounds: only `background` or `card`. Exception: `inverse` final CTA.
- Hierarchy via `text-muted-foreground`, never `text-foreground/60`.
- Status/fit/error always text + icon, never color alone.

---

## 3. Typography

**Font:** Instrument Sans (variable, weight 400–700, width 75–100). One family only. No monospace.

- Headlines (display → title) use `font-stretch-semi-condensed` (87.5%) — compact and technical.
- Everything else normal width.
- Weights: 400 body, 500 UI/labels/buttons, 600 headings/titles/salary. Never 700+.
- Numbers (salary, counts, dates): `tabular-nums`.

| Class | Size / line-height | Tracking | Weight | Use |
|---|---|---|---|---|
| `text-display` | 56 / 1.04 | -0.032em | 600 | Hero (lg+) |
| `text-h1` | 44 / 1.08 | -0.028em | 600 | Hero (sm–md), final CTA |
| `text-h2` | 32 / 1.15 | -0.022em | 600 | Section titles, hero (mobile) |
| `text-title` | 26 / 1.2 | -0.018em | 600 | Section titles (mobile) |
| `text-h3` | 22 / 1.3 | -0.015em | 600 | Panel titles |
| `text-h4` | 17 / 1.4 | -0.01em | 600 | Job titles, step titles |
| `text-body-lg` | 18 / 1.6 | -0.005em | 400 | Hero + section intros |
| `text-body` | 16 / 1.6 | 0 | 400 | Paragraphs |
| `text-body-sm` | 14 / 1.45 | 0 | 400 | Product UI, buttons, inputs |
| `text-label` | 13 / 1.3 | 0.005em | 500 | Labels, nav, chips, meta |
| `text-caption` | 12 / 1.35 | 0.01em | 400 | Badges, timestamps |

**Responsive:** hero `text-h2 sm:text-h1 lg:text-display`; section title `text-title md:text-h2`; intros `text-body md:text-body-lg`.

**Rules:** headings `text-balance`, paragraphs `text-pretty`, body max `max-w-xl`, intros `max-w-2xl`. Left-aligned except final CTA (centered). Ranges use en dash: `₹28–36 LPA`.

---

## 4. Spacing & layout

4px base, Tailwind scale only. No arbitrary px values.

| Purpose | Mobile | Tablet | Desktop |
|---|---|---|---|
| Page padding | `px-4` | `px-6` | `px-8` |
| Section padding | `py-16` | `py-20` | `py-24` |
| Section header → content | `mb-8` | `mb-10` | `mb-12` |
| Card grid gap | `gap-4` | `gap-5` | `gap-6` |
| Text/UI two-column gap | `gap-10` | `gap-10` | `gap-16` |

Inside components: icon↔text `gap-1.5`, meta row `gap-x-4 gap-y-1.5`, button group `gap-3`, form fields `gap-4`, card blocks `gap-3`.

**Container:** `mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8` (1280 outer).

**Breakpoints (Tailwind defaults):** mobile 320–639; tablet `sm` 640 / `md` 768; desktop `lg` 1024; large `xl` 1280.

**Grid:** 12 columns on desktop (splits 7/5, 5/7, 4/8), 1–2 columns on tablet, 1 on mobile.
- Grid → card grids, section splits, preview panes, tracker.
- Flex → navbar, button groups, meta rows, card headers.
- Stack → all mobile layouts.

**Header:** `h-14`, sticky. `html` gets `scroll-pt-20`.

---

## 5. Radius, borders, shadows

| Radius | Value | Use |
|---|---|---|
| `rounded-xs` | 2px | Fit line segments |
| `rounded-sm` | 4px | Badges, tags |
| `rounded-md` | 6px | Buttons, inputs, chips, company mark, tracker cards |
| `rounded-lg` | 8px | Job cards, popovers, search bar |
| `rounded-xl` | 12px | Panels, product frames, dialogs |

Nested elements get smaller radius than their parent. Nothing above `xl`. `rounded-full` only for avatars.

**Borders:** all 1px. `border-border` default, `border-border-strong` on hover, `border-input` on controls, `border-dashed` for skill gaps / empty slots.

| Shadow | Use |
|---|---|
| `shadow-xs` | Buttons, inputs, search bar |
| `shadow-card` | Job card on hover only |
| `shadow-elevated` | Popovers + the two product frames (hero results, product preview) |
| `shadow-modal` | Dialog, Sheet |

Cards at rest: no shadow.

---

## 6. Icons

Lucide React only (brand icons in footer: inline SVG, since Lucide's are deprecated).

| Size | Class | Use |
|---|---|---|
| 14 | `size-3.5` | Badges, meta rows |
| 16 | `size-4` | Buttons, inputs, menus |
| 18 | `size-4.5` | Nav, bookmark |
| 20 | `size-5` | Feature captions |
| 32 | `size-8` | Empty states |

Icons inherit `currentColor` (`text-muted-foreground` in meta). Decorative → `aria-hidden`. No icons in tinted circles.

Mapping: Search `Search`; Location `MapPin`; Work mode `Building2` / `Globe`; Experience `BriefcaseBusiness`; Job type `Clock`; Save `Bookmark`; External `ExternalLink`; Met `Check`; Missing `Minus`; Partial `CircleDashed`; Filters `SlidersHorizontal`; Resume `FileText`; Tracker `SquareKanban`; Error `CircleAlert`; Loading `LoaderCircle`.

---

## 7. Motion

CSS only. No Framer Motion / GSAP / scroll libraries.

| Interaction | What | Duration |
|---|---|---|
| Button hover | bg/border color; active `translate-y-px` | 120ms |
| Card hover | border + `shadow-card` (no lift) | 180ms |
| Navbar scroll | bg + border appear | 200ms |
| Input focus | border + ring | 120ms |
| Bookmark save | icon pop 0.8 → 1.08 → 1 | 160ms |
| Overlays | shadcn / tw-animate defaults | 150–250ms |
| Skeleton | `animate-pulse` | — |

**One load animation only:** hero Fit lines sweep in from left (520ms, 80ms stagger per row).
**Not used:** scroll reveals, text fades, parallax, marquees.
**Reduced motion:** everything off, Fit lines render filled.

Easing: `cubic-bezier(0.25, 1, 0.5, 1)` (`ease-out-quart`).

---

## 8. Accessibility (WCAG 2.2 AA)

- Landmarks: `header > nav`, `main#main`, `footer`; each section `aria-labelledby`. One `h1`.
- Skip link "Skip to content" as first focusable element.
- Visible focus everywhere: `ring-2 ring-ring ring-offset-2`.
- Icon-only buttons: `aria-label` with action + object ("Save Senior Frontend Engineer at Quillbase").
- `aria-pressed` on toggles, `aria-expanded` on menus, `aria-current="page"` on nav.
- Inputs always labelled; errors linked via `aria-describedby` + `aria-invalid`.
- Product demos are `<figure>` with caption noting sample data; non-interactive parts `inert`.
- Touch targets ≥ 40px. No content hidden behind hover.