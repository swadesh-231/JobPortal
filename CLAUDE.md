# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Shortlist** — a job-search product that ranks roles by fit, explains each match, and tracks applications. Currently a Vite + React 19 SPA with a marketing landing page and Supabase email/password auth (`/login`, `/signup`). There is no backend yet: job, tracker and matching data come from `src/lib/sample-data`.

## Commands

```bash
npm run dev       # Vite dev server
npm run build     # tsc -b (type-check) then vite build
npm run lint      # eslint .
npm run preview   # serve the production build
npx shadcn@latest add <component>   # add a shadcn/ui primitive into src/components/ui
```

- There is no test runner. `npm run build` and `npm run lint` are the only automated checks.
- Both `package-lock.json` and `bun.lock` are committed; keep them in sync when dependencies change.
- Auth needs `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in `.env` (gitignored). Without them `supabase` is `null` and the app still renders; auth forms show `AUTH_UNAVAILABLE`. Any new Supabase call must handle the `null` client.

## Design docs are the spec

`docs/01-foundation.md` → `02-components.md` → `03-landingpage.md` → `04-implimentation.md` define the visual system, component specs, page layout and code rules. Read the relevant doc before changing UI, and update the doc when a change alters a token, component spec or rule (the docs are kept in step with the code). `README.md` is the unmodified Vite template and carries no project information.

## Architecture

- **Routing** — `src/App.tsx` mounts React Router (`react-router` v8, `BrowserRouter`). `/login` and `/signup` have pages; every other path renders the landing page. Route paths and all nav/footer links live in `siteConfig` (`src/config/site.ts`) — reference `siteConfig.routes.*`, don't hard-code paths. Most nav targets (`/jobs`, `/companies`, …) have no page yet.
- **Pages** — `src/app/**/page.tsx` (Next-style naming, but this is a plain SPA; no server components and no `"use client"`). `src/app/page.tsx` only orders landing sections; sections never set their own padding or max width — that comes from `layout/Section` and `layout/Container`.
- **Component layers** (`src/components/`)
  - `ui/` — shadcn/ui (`radix-nova` style, `radix-ui` package). Add variants by editing the shadcn file with `cva`, not by wrapping it.
  - `jobs/`, `tracker/` — product components that take typed data (`src/types/job.ts`) and are meant to be reused unchanged on real pages.
  - `landing/` — marketing sections that compose the product components with sample data.
  - `layout/`, `shared/`, `auth/` — chrome, cross-cutting pieces, and the auth form shell.
- **Single source of truth per concept** — never re-implement these inline: fit tier/segments in `lib/fit.ts` + `jobs/FitLine`; application status label/icon in `lib/status.ts` (`STATUS_META`) + `tracker/StatusBadge`; salary/experience/date formatting in `lib/format.ts` + `jobs/SalaryText`; company logo/initials in `jobs/CompanyMark`.
- **Data** — `lib/api.ts` is the seam for the future backend: functions are already async and currently return sample data; hooks such as `useFeaturedJobs` consume them with a `loading | error | ready` state union. Swap the implementation in `lib/api.ts`, not the callers. Sample records carry `isSample` and are labelled with `shared/SampleBadge`; all sample companies are fictional.
- **Auth** — `lib/supabase.ts` exports the nullable client; `hooks/useSession` subscribes to `onAuthStateChange` (returns `null` both while loading and when signed out). Auth pages redirect via `<Navigate>` once a session appears. Validation helpers live in `lib/auth.ts`.
- **Theme** — `lib/theme.ts` is a small external store (localStorage `theme` key, `.dark` class on `<html>`) read through `hooks/useTheme` (`useSyncExternalStore`). An inline script in `index.html` applies the theme before first paint; keep its logic consistent with `lib/theme.ts`.
- **Styling** — Tailwind CSS v4 with no config file; all tokens (colors, type scale, radii, shadows, animations) are defined in `src/index.css` under `:root` / `.dark` / `@theme inline`. `@/` aliases `src/`.

## Code rules (from the docs)

- Semantic tokens only: never `bg-white`, `text-gray-*`, palette colors or hex values in TSX. Avoid `dark:` overrides — the tokens switch themselves.
- Use the type tokens (`text-h2`, `text-body-sm`, `text-label`, …) instead of `text-sm` + leading/tracking. Headlines use `font-display` (Instrument Serif, weight 400 only); everything else is Geist, never above weight 600.
- Spacing from the 4px Tailwind scale; no arbitrary px values, inline styles, `!important`, or `@apply` outside `index.css`.
- Merge classes with `cn()`; variants via `cva`; state via `data-*` / `aria-*` variants.
- Lucide icons only (brand icons are inline SVG in `components/icons/social.tsx`). CSS-only motion — no Framer Motion/GSAP, no scroll reveals.
- Cards use borders, not shadows at rest; nothing rounder than `rounded-xl`; the only gradient is `bg-glow` (hero and auth pages).
- Fit is always "N of M requirements", never a percentage. Status, fit and errors are conveyed with text + icon, never color alone.
- Copy: sentence case, no invented numbers, no eyebrow labels, no `→` on buttons. `siteConfig.socialProof` and `siteConfig.testimonials` stay `enabled: false` until there is real, consented data.
- Accessibility target is WCAG 2.2 AA: labelled inputs with `aria-describedby`/`aria-invalid` errors, `aria-label` on icon-only buttons, visible focus rings, touch targets ≥ 40px.
- Keep files under ~200 lines.

## Commit messages

- After every set of changes to the code, end the reply with a suggested one-line commit message for those changes.
- Keep it to a single line, imperative mood, no trailing period (e.g. `Add AccountMenu to the navbar`), matching the style of the existing git history.
- Only suggest the message — do not run `git commit` unless asked.
