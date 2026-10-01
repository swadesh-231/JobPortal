# 03 — Landing page

Copy in **bold quotes** is final. `[VERIFY]` = product claim to confirm before launch. Sample product UI always shows a "Sample data" badge.

## Section order

| # | Section | Background | Id | Pillar |
|---|---|---|---|---|
| 1 | Navbar | transparent → blurred | — | — |
| 2 | Hero | `background` | `top` | Discover + Decide |
| 3 | Social proof | `background`, `border-y` | — | only if real data |
| 4 | Featured jobs | `background` | `jobs` | Discover |
| 5 | Value proposition | `card`, `border-y` | `why` | All |
| 6 | Product preview | `background` | `product` | Discover |
| 7 | How it works | `background`, `border-t` | `how-it-works` | All |
| 8 | Smart matching | `card`, `border-y` | `matching` | Decide |
| 9 | Application tracker | `background` | `tracker` | Track |
| 10 | Testimonials | `background`, `border-t` | — | only if real |
| 11 | Final CTA | `inverse` | `get-started` | — |
| 12 | Footer | `background` | — | — |

Every section: `<Section>` → `<Container>` → `<SectionHeader>` (h2 + intro) → content.

---

## 1. Navbar

```
Desktop: [Logo]  Jobs  Companies  Resources ▾  Pricing          Log in  [Create account]
Tablet:  [Logo]                                    Log in  [Create account]  [☰]
Mobile:  [Logo]                                                             [☰]
```

- `sticky top-0 z-40 h-14`. After 8px scroll: `bg-background/85 backdrop-blur-md border-b`. Use IntersectionObserver, not scroll listener.
- Links: ghost `sm`, muted → foreground on hover; active `aria-current`.
- Resources: NavigationMenu → Career guide, Blog, Interview prep (title + one-line description).
- Mobile menu: right Sheet, links as `h-12` rows, Resources in Accordion, bottom: "Create account" (primary) + "Log in" (outline), full width.
- Logo: 3 stacked bars of decreasing length (top bar `primary`) + "Shortlist" wordmark (`text-h4 font-semibold font-stretch-semi-condensed`).

---

## 2. Hero

The headline says what it is; the search bar and results frame directly below prove it.

```
┌──────────────────────────────────────────────────────────────────┐
│ Find work that                              ✓ Free for job seekers│
│ actually fits you.                          ✓ Private until you   │
│ Shortlist ranks open roles by how well…       apply               │
│ [Create free account] [Browse jobs]         ✓ PDF or DOCX resume  │
│                                                                   │
│ [ 🔍 Job title, skill or company | 📍 Anywhere ▾ | Search jobs ]  │
│ Popular: [React developer] [Java backend] [Product designer] …    │
│                                                                   │
│ ┌ Ranked for: Frontend engineer, 4 yrs, React + TS  [Sample data]┐│
│ │ ▌Senior Frontend Engineer   │ Senior Frontend Engineer          ││
│ │  Quillbase   7/9            │ Quillbase  Bengaluru  Hybrid      ││
│ │  Frontend Eng, Checkout     │ ₹32–42 LPA                        ││
│ │  Halden Pay  6/7            │ Fit line (lg, expanded)           ││
│ │  UI Engineer                │ Why it ranks first: …             ││
│ │  Tidewater   5/8            │ [Save role] [Apply with profile]  ││
│ └─────────────────────────────┴───────────────────────────────────┘│
└──────────────────────────────────────────────────────────────────┘
```

- Copy `lg:col-span-7`, trust list `lg:col-span-4 lg:col-start-9 self-end`.
- Search `mt-10`, chips `mt-3`, results frame `mt-6`: `rounded-xl border bg-card shadow-elevated`, body `md:grid-cols-12` (list 5 / detail 7).
- Clicking a row swaps the detail pane (client state). Actions inside frame → sign-up.
- Fit lines here play the page's only load animation.

**Copy**
- H1: **"Find work that actually fits you."**
- Sub: **"Shortlist ranks open roles by how well they match your skills and experience, shows you exactly why, and tracks every application from saved to offer."**
- CTAs: **"Create free account"** (primary `lg`), **"Browse jobs"** (outline `lg`)
- Trust: **"Free for job seekers"**, **"Your profile is private until you apply"**, **"Import a PDF or DOCX resume"** `[VERIFY]`
- Reason (row 1): **"Why it ranks first: matches your stack and seniority, in your preferred city, and pays above your minimum."**

**Responsive**
- Tablet: copy full width, trust list as inline row; frame two panes from 768, stacked below.
- Mobile: order = headline → copy → search → CTAs (stacked) → trust → results. Results show list only; selected row expands in place. Use `order-*`, don't duplicate markup.

---

## 3. Social proof

Render only if `siteConfig.socialProof.enabled` and data is real. Otherwise omit the section in production.

- One row `py-10`: "Hiring teams on Shortlist" (`text-label text-muted-foreground`) + max 6 monochrome logos (`h-6 text-muted-foreground`) + up to 3 stats (`text-h3 tabular-nums` + caption, `divide-x`).
- Mobile: logos 3×2 grid, stats 3 small columns.
- Dev placeholder: dashed boxes labelled "Logo", stats "[PLACEHOLDER]".

---

## 4. Featured jobs

```
Recently posted roles                                  [View all jobs]
Fresh listings across engineering, design, product and data.
[All] [Engineering] [Design] [Product] [Data]
[JobCard] [JobCard]
[JobCard] [JobCard]
[JobCard] [JobCard]
```

- Underline Tabs: trigger `-mb-px border-b-2 border-transparent data-[state=active]:border-primary`.
- Grid: `lg:grid-cols-2`, single column below `lg`. 6 cards from `GET /api/jobs/featured` (sample data + "Sample listings" badge until API exists).
- Signed-out cards show "Add your resume to see your fit" in the Fit slot.
- Mobile: "View all jobs" moves below grid, full width outline.

**Copy:** H2 **"Recently posted roles"**; Intro **"Fresh listings across engineering, design, product and data. Save any role to start tracking it."**

---

## 5. Value proposition

A comparison table, not an icon grid.

```
Left (4 cols): H2 + intro + links: Discover / Decide / Track
Right (8 cols):
                     Most job sites                     Shortlist
Finding roles        Keyword matches, newest first      Ranked by how well each role fits you
Deciding             Read every description to guess    See requirements you meet and miss   [fit]
Applying             Re-type your details each time     One profile, right resume per role    [Resume v2 ▾]
Following up         A spreadsheet you forget           A board that updates when you apply   [Applied][Interview]
Promoted listings    Mixed into results                 Always labelled "Promoted" [VERIFY]
```

- Real `<table>` with `sr-only` caption and `th scope="row"`. "Most job sites" cells muted; Shortlist cells foreground with small real UI fragment right-aligned.
- Mobile: same data as `dl` list — row title, "Usually: …", "On Shortlist: …".

**Copy:** H2 **"Most job sites stop at the listing."**; Intro **"Shortlist covers the whole search: finding roles that fit, deciding which ones are worth your time, and keeping track of where every application stands."**

---

## 6. Product preview

```
┌───────────────────────────────────────────────────────────────────────┐
│ [≡] Shortlist  🔍 frontend engineer  📍 Bengaluru     [Sample data] (SR)│
├─────────┬──────────────┬─────────────────┬────────────────────────────┤
│Discover │ Work mode    │ 24 roles  Fit ▾ │ Senior Frontend Engineer   │
│Saved  6 │ Experience   │ ▌JobRow         │ Quillbase  ₹32–42 LPA      │
│Applied 9│ Salary min   │  JobRow [Applied]│ [Saved] [Apply w/ profile]│
│Profile  │ Job type     │  JobRow         │ Fit line (expanded)        │
│Resumes 2│ Posted       │  JobRow         │ About the role…            │
└─────────┴──────────────┴─────────────────┴────────────────────────────┘
 w-48        w-56           w-80               flex-1
```

- Frame: `rounded-xl border bg-card shadow-elevated overflow-hidden h-160`. Result rows switch the detail pane; everything else `inert`.
- `xl`: all 4 panes; `lg`: no filters pane (chips above results); tablet: results + detail, `h-140`; mobile: phone-width frame with Tabs "Results / Role / Tracker", no fixed height.
- Below frame, 3 captions (`md:grid-cols-3`, icon + title + line):
  - `SlidersHorizontal` **"Filters that stick"** — **"Your work mode, salary floor and experience range carry across every search."**
  - `ListChecks` **"Fit on every role"** — **"Requirements you meet and miss, right next to the description."**
  - `SquareKanban` **"Status everywhere"** — **"See which roles you've saved, applied to, or heard back from."**

**Copy:** H2 **"Your whole search on one screen."**; Intro **"Search, filter, compare and apply without a dozen open tabs."**

---

## 7. How it works

A real sequence, so numbered markers are correct here.

```
01 ───────────── 02 ───────────── 03 ───────────── 04
Build profile    Discover roles   Apply            Track everything
[resume.pdf ✓]   [Fit 7/9]        [Resume v2 ▾]    [Applied][Interview]
```

- `<ol>`, desktop `grid-cols-4` with 1px connector line; tablet 2×2 no line; mobile vertical timeline (marker left, line down).
- Marker: `size-8 rounded-md border bg-card text-label font-semibold`. Title `text-h4`, body `text-body-sm text-muted-foreground`, small UI artifact in `rounded-md border p-3`.

**Copy:** H2 **"From resume to offer in four steps."**
1. **"Build your profile"** — **"Upload your resume or start from scratch. Shortlist pulls out your skills and experience, and you review every field."**
2. **"Discover roles that fit"** — **"Search as usual or open your ranked feed. Every role shows how many requirements you meet."**
3. **"Apply with your profile"** — **"Pick a resume version. Your details carry over, so you only answer what's specific to the role."** `[VERIFY]`
4. **"Track everything"** — **"Saved and applied roles land on your board. Move them forward and set follow-up reminders."**

---

## 8. Smart matching

```
Left (7): Panel "Requirements for Senior Frontend Engineer"   [Sample data]
          ✓ React             From your role at Larkfield Software
          ✓ TypeScript        …
          ◌ GraphQL (partial)
          – Web performance
          Fit line (lg): Strong fit, 7 of 9
Right (5): Panel "Close the gap"  — 2 suggestions with small buttons
           Panel "How roles are ranked" — 4 plain factors
```

- Checklist rows `py-2.5 border-b`: icon + requirement + evidence (`text-caption text-muted-foreground`).
- "Close the gap": **"Your GraphQL work is in your profile but not in Resume v2."** [Add to resume]; **"Web performance appears in 3 of your saved roles."** [Add a skill]
- Ranking factors: skills match, experience vs range, location & work mode, salary vs your minimum. Caption: **"Change any preference and the ranking updates."**
- Footer line with `ShieldCheck`: **"Matching uses AI to read job descriptions and your profile. It never applies or messages anyone on your behalf."** `[VERIFY]`
- Mobile: panels stacked, checklist shows 5 rows + "Show all 9 requirements" (Collapsible).

**Copy:** H2 **"Matching you can check."**; Intro **"Every recommendation shows its reasoning: what you meet, what you don't, and what would close the gap. No hidden scores."**

---

## 9. Application tracker

```
┌ Applications  13 roles                                     [Sample data] ┐
│ Saved 3 │ Applied 3 │ Screening 2 │ Interview 2 │ Offer 1 │ Rejected 2  │
│ [card]  │ [card]    │ [card]      │ [card]      │ [card]  │ [card]      │
│ [card]  │ [card]    │ [card]      │ [card]      │         │ [card]      │
└─────────────────────────────────────────────────────────────────────────┘
```

- Frame `rounded-xl border bg-card` (flat, no shadow). Board `grid-cols-6 divide-x`, column header = StatusBadge + count, body `p-2 space-y-2 bg-muted/30`.
- Header counts = cards rendered. Cards not draggable; board is a `<figure>` with `sr-only` caption.
- `lg`: 6 columns, horizontal ScrollArea if tight; tablet: scroll + snap, columns `w-60`; mobile: status Tabs (default "Interview"), cards stacked.

**Copy:** H2 **"Every application, one board."**; Intro **"Roles you apply to here move to Applied on their own. Add anything you applied to elsewhere in one click, and set reminders so nothing goes quiet."** `[VERIFY]`
List: **"Follow-up reminders"**, **"Interview dates and notes"**, **"See which resume you sent"**.

---

## 10. Testimonials

Render only if `siteConfig.testimonials.enabled` with real, consented quotes.

- Desktop: featured quote `lg:col-span-7` (`text-h3 font-medium`) + two smaller `lg:col-span-5` stacked with `divide-y`. Avatar + name + "Role at Company". No cards, no stars.
- Mobile: stacked, featured quote `text-body-lg`.

**Copy:** H2 **"From people who used Shortlist in their search"**. Content `[PLACEHOLDER]` until real.

---

## 11. Final CTA

Full-bleed `bg-inverse text-inverse-foreground py-20 lg:py-24`, centered `max-w-3xl`.

- Logo mark (inverse) → H2 **"Your search, ranked and tracked."** (`text-title sm:text-h1`)
- Body **"Create a free profile, add your resume, and get a shortlist of roles that match it."** (`text-inverse-muted`)
- Buttons: **"Create free account"** (`inverse lg`) + **"Browse jobs first"** (`inverse-outline lg`), stacked on mobile.
- Microcopy: **"No credit card. Takes about two minutes."** `[VERIFY]`

---

## 12. Footer

- Brand block (4 cols): logo, **"Job search that ranks roles by fit and tracks every application."**, social icon buttons with labels.
- Links (8 cols, 3 columns): **Product** — Jobs, Companies, Applications, Resume; **Resources** — Career guide, Blog, Interview prep; **Company** — About, Contact, Privacy, Terms.
- Bottom row `border-t`: "© {year} Shortlist" + theme toggle (Light / Dark / System).
- Mobile: brand block, links `grid-cols-2`, bottom row stacked.