# 02 — Components

All built on shadcn/ui, styled with tokens from `01-foundations`. Add variants by editing the shadcn file with `cva`, not by wrapping.

---

## Button

Base: `inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-colors duration-120 active:translate-y-px focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none [&_svg]:size-4`

| Size | Classes | Use |
|---|---|---|
| `sm` | `h-8 px-3 text-label` | Cards, toolbars, nav links |
| `default` | `h-9 px-4 text-body-sm` | General |
| `lg` | `h-11 px-5 text-body-sm` | Hero, final CTA, mobile primary |
| `icon` / `icon-sm` | `size-9` / `size-8` | Icon-only |

| Variant | Classes |
|---|---|
| `default` | `bg-primary text-primary-foreground shadow-xs hover:bg-primary-hover` |
| `secondary` | `bg-secondary text-secondary-foreground hover:bg-secondary-hover` |
| `outline` | `border border-border-strong bg-card shadow-xs hover:bg-accent` |
| `ghost` | `hover:bg-accent` |
| `destructive` | `bg-destructive text-white hover:bg-destructive/90` |
| `link` | `text-primary-text underline-offset-4 hover:underline h-auto px-0` |
| `inverse` | `bg-inverse-foreground text-inverse hover:bg-inverse-foreground/90` (final CTA only) |
| `inverse-outline` | `border border-inverse-muted/40 text-inverse-foreground hover:bg-inverse-foreground/10` |

- **Loading:** `LoaderCircle animate-spin` replaces leading icon, label stays, `disabled` + `aria-busy`.
- **Disabled with reason:** use `aria-disabled` + Tooltip explaining why.
- No trailing arrows. `ExternalLink` only when leaving the site.

---

## Input

`h-9 rounded-md border border-input bg-card px-3 text-body-sm shadow-xs placeholder:text-placeholder focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/20 aria-invalid:border-destructive disabled:bg-muted disabled:opacity-60`

- Large: `h-12 text-body` (hero, mobile forms).
- Label above (`text-label`, `gap-1.5`). Error below: `text-caption text-destructive` + `CircleAlert`.
- Select / Combobox trigger matches input. Combobox = Popover + Command.

## Search bar (hero)

A real `<form role="search">` → `/jobs?q=&location=`.

```
≥768:  [ 🔍 Job title, skill or company  |  📍 Anywhere ▾  | Search jobs ]
        shell h-14 rounded-lg border-input bg-card p-1, focus-within ring
<768:  stacked: keyword h-12 / location h-12 / button h-12 full width (gap-2)
```

- Location options: Anywhere, Remote, then cities from `siteConfig.cities`.
- Below: "Popular" chips (outline `sm`) that fill and submit.

## Filter chip

shadcn `Toggle`: `h-8 rounded-md border border-border-strong bg-card px-3 text-label hover:bg-accent data-[state=on]:border-primary data-[state=on]:bg-primary-soft data-[state=on]:text-primary-soft-foreground`. Shows `Check` when on. Multi-value chips show count: "Experience (2)". Mobile: single horizontal-scroll row + "Filters" button opening a bottom Sheet.

---

## Badge

Base: `inline-flex items-center gap-1 h-6 rounded-sm px-2 text-caption font-medium [&_svg]:size-3.5`. Not interactive.

| Variant | Classes | Example |
|---|---|---|
| `neutral` | `bg-muted text-muted-foreground` | Full-time, 3–5 yrs, Hybrid |
| `remote` | `bg-primary-soft text-primary-soft-foreground` + `Globe` | Remote |
| `tech` | `border border-border bg-card` | React |
| `tech-matched` | `bg-primary-soft text-primary-soft-foreground` + `Check` | React ✓ |
| `tech-gap` | `border border-dashed border-border-strong text-muted-foreground` + `Minus` | GraphQL |
| `status-*` | `bg-status-{x}-soft text-status-{x}` + icon | Interview |
| `warning` | `bg-warning-soft text-warning` | Deadline passed |
| `closed` | `bg-muted text-muted-foreground` | No longer accepting applications |
| `sample` | `border border-dashed border-border-strong text-muted-foreground` | Sample data |

Max 4 tags per card, then `+n` with Tooltip.

## StatusBadge

One map drives badges and tracker column headers:

```ts
export const STATUS_META = {
  saved:     { label: "Saved",     icon: Bookmark },
  applied:   { label: "Applied",   icon: Send },
  screening: { label: "Screening", icon: ScanSearch },
  interview: { label: "Interview", icon: CalendarClock },
  offer:     { label: "Offer",     icon: BadgeCheck },
  rejected:  { label: "Rejected",  icon: CircleSlash },
} as const;
```

---

## Fit line (signature element)

Shows fit as **requirements met out of total**. Never a percentage.

```
Strong fit                7 of 9 requirements
▆▆ ▆▆ ▆▆ ▆▆ ▆▆ ▆▆ ▆▆ ░░ ░░
```

- Top row: tier `text-label` left, count `text-caption text-muted-foreground tabular-nums` right, `mb-1.5`.
- Bar: `flex gap-0.5 h-1.5`, one `flex-1 rounded-xs` segment per requirement (max 12, scale proportionally beyond).
  - Met `bg-primary` → Partial `bg-primary/40` → Missing `bg-border-strong` (always in this order).
- Tier from `(met + 0.5 × partial) / total`: ≥0.75 "Strong fit", ≥0.5 "Good fit", else "Stretch". Same color for all tiers.
- Sizes: `default` (`max-w-60`), `lg` (full width, `h-2`, label `text-body-sm`).
- `expanded`: adds "You have" (tech-matched badges), "Missing" (tech-gap badges), optional reason line.
- No profile: link "Add your resume to see your fit".
- A11y: `role="img"` + `aria-label="Strong fit: meets 7 of 9 requirements"`.

---

## CompanyMark

Square, never round. `sm` `size-7`; `md` `size-10`; `lg` `size-12`, all `rounded-md`.
Logo: `border bg-card p-1 object-contain`, `alt=""`. Fallback: two initials, `bg-muted text-muted-foreground font-semibold`. No random colors.

---

## Job card

```
┌──────────────────────────────────────────────────────────────┐
│ [QB] Senior Frontend Engineer                          [🔖]  │
│      Quillbase ✓                                             │
│      📍 Bengaluru   🏢 Hybrid   💼 4–6 yrs   🕒 Full-time     │
│      ₹32–42 LPA                            Posted 2 days ago │
│      [React] [TypeScript] [Next.js] [GraphQL] [+1]           │
│ ──────────────────────────────────────────────────────────── │
│ Strong fit   7 of 9                  [ Apply with profile ]  │
│ ▆▆▆▆▆▆▆░░                                                    │
└──────────────────────────────────────────────────────────────┘
```

**Container:** `<article>` `group relative flex flex-col gap-3 rounded-lg border bg-card p-4 sm:p-5 transition-[border-color,box-shadow] duration-180 hover:border-border-strong hover:shadow-card`

**Hierarchy:** title `text-h4 line-clamp-2` → company `text-body-sm font-medium` → salary `text-body-sm font-semibold tabular-nums` → meta `text-label text-muted-foreground` → Fit → tags → posted `text-caption`.

**Layout:** meta/salary/tags indented `sm:pl-13` to align with title. Footer `border-t pt-4 flex items-end justify-between`.

**Mobile (<640):** `p-4`, job type hidden, 2 tags + `+n`, posted as "2d ago", no Apply button (tap card), Fit line full width.

**Interaction**
- Whole card is a link: title `<a>` with `after:absolute after:inset-0`; bookmark/apply `relative z-10`.
- Focus: `has-[a:focus-visible]:ring-2 ring-ring ring-offset-2`.
- Hover: border + shadow + title underline. No lift.

**Bookmark:** ghost `icon-sm` (40px hit area), `aria-pressed`. Saved = `fill-current text-primary-text` + pop animation. Toast "Role saved" with Undo. Error reverts + "Couldn't save this role. Try again." Signed out → sign-up Dialog.

**Apply:**
| `applyMethod` | Card (≥640) | Detail page |
|---|---|---|
| `platform` | outline `sm` "Apply with profile" | primary |
| `external` | ghost `sm` "Apply on company site" + `ExternalLink` | outline |
| closed | none | notice |

**Salary:** `₹32–42 LPA`; `₹50–70k / month`; `$120k–150k / yr`. Undisclosed → "Salary not disclosed" (muted, row kept). Never blurred.

## Job row (compact)

Used in hero results and product preview.
`px-3 py-2.5 rounded-md hover:bg-accent` — mark `md`, title `text-body-sm font-semibold`, company + location `text-caption`, salary right, inline Fit line `max-w-40`. Selected: `bg-primary-soft/50 border-l-2 border-primary`. Rows are `<button aria-pressed>`.

## Tracker card

`rounded-md border bg-card p-3 space-y-2` — mark `sm`, title `text-label font-semibold line-clamp-2`, company `text-caption`, salary badge, footer dates `text-caption` ("Applied 12 Sep", `BellRing` "Follow up Thu"). Offer shows "Respond by 30 Sep" in `text-warning`.

## Panel

Card with app-like header strip: `rounded-xl border bg-card overflow-hidden` + header `h-11 px-4 border-b bg-muted/50 text-label font-medium flex items-center justify-between`. Used for feature fragments and product frames.

---

## States

| State | Visual | Copy |
|---|---|---|
| Loading list | 6 skeleton cards (same size as real, no layout shift), `aria-busy` | — |
| No results | `SearchX` + active filter chips | "No roles match “{query}” in {location}" / "Try removing a filter or searching a nearby city." / Clear filters; Search anywhere |
| No saved jobs | `Bookmark` | "Nothing saved yet" / "Save roles with the bookmark icon. They'll show up here and on your board." / Browse jobs |
| No applications | `SquareKanban` | "No applications yet" / "Roles you apply to here appear automatically. Applied elsewhere? Add it yourself." / Find roles; Add an application |
| Error | `CircleAlert`, `bg-destructive-soft` panel | "Couldn't load jobs" / "Check your connection and try again." / Try again |
| Success | Toast | "Role saved" (Undo), "Application sent to {company}" |
| Expired | `warning` badge "Deadline passed", Apply removed | "See similar roles" |
| Closed | `closed` badge, Apply removed, bookmark kept | "See similar roles" |
| Offline | `warning` Alert banner | "You're offline. Changes will sync when you reconnect." |

**EmptyState:** centered, `py-16`, icon `size-8 text-muted-foreground`, title `text-h4`, body `text-body-sm text-muted-foreground max-w-sm`, actions `mt-3 gap-3`. No illustrations.