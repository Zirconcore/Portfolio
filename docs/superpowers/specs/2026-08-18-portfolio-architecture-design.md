# Portfolio Site — Architecture Design

Date: 2026-08-18

## Purpose

Turn the existing untouched Vite + React + TypeScript scaffold in this
repo into a professional personal portfolio site with Projects,
Skills, About/Hero, Experience/Resume, Contact, and legal pages
(Privacy Policy and similar), deployed on Netlify.

## Tech Stack

- **React 19 + TypeScript** — already scaffolded, kept as-is.
- **Vite 8** — already scaffolded (Rolldown-powered `@vitejs/plugin-react`,
  React Compiler already enabled via `babel-plugin-react-compiler`).
- **pnpm** — already the package manager in use (`pnpm-lock.yaml`
  present). All install/build commands use `pnpm`.
- **Tailwind CSS v4** — via `@tailwindcss/vite`, CSS-first config (no
  `tailwind.config.js` needed; v4 auto-detects content).
- **React Router v7** — multi-page routing (`react-router-dom`),
  chosen over a single scrolling page because legal pages (Privacy
  Policy, etc.) need their own real routes/URLs.
- **motion** (formerly Framer Motion) — scroll-entrance animations
  (`whileInView`), used sparingly on section headings/cards.
- **React Context** (`ThemeContext`) — the only global state, for dark
  mode. No Redux/Zustand — a portfolio doesn't need more.
- **Netlify** — hosting, plus Netlify Forms for the contact form.
- No test framework for now (see Testing section below).

## Folder Structure

Hybrid approach: `pages/` for route-level components, shared UI in
top-level `components/`, typed content in `data/`. Page-specific
components that aren't reused stay colocated near their page; shared
ones (like `ProjectCard`, used on both Home and Projects) live in
`components/`.

```
src/
  main.tsx
  App.tsx                  # Router setup + Layout shell
  index.css                # Tailwind import + base styles + dark variant
  pages/
    Home.tsx
    Projects.tsx
    ProjectDetail.tsx
    Skills.tsx              # optional standalone; may stay a Home section
    Experience.tsx
    Contact.tsx
    PrivacyPolicy.tsx
    NotFound.tsx
  components/
    layout/
      Navbar.tsx
      Footer.tsx
      Layout.tsx            # Navbar + <Outlet/> + Footer
    ui/
      Button.tsx
      Card.tsx
      SectionHeading.tsx
      ThemeToggle.tsx
    projects/
      ProjectCard.tsx        # shared: Home (featured) + Projects page
  data/
    projects.ts
    skills.ts
    experience.ts
    site.ts                 # name, tagline, socials, contact email
  hooks/
    useTheme.ts
  context/
    ThemeContext.tsx
  lib/
    types.ts                 # Project, SkillCategory, ExperienceEntry, etc.
  assets/
```

## Routing

Declarative React Router v7 routes, all wrapped in a shared `Layout`
(Navbar + `<Outlet/>` + Footer):

| Path | Page | Content |
|---|---|---|
| `/` | Home | Hero/About, featured projects (3), skills teaser, CTA → Contact |
| `/projects` | Projects | Full grid of all projects |
| `/projects/:slug` | ProjectDetail | Full write-up, stack, links |
| `/experience` | Experience | Timeline + downloadable CV link |
| `/contact` | Contact | Form |
| `/privacy` | PrivacyPolicy | Static legal text |
| `*` | NotFound | 404 |

`Skills` stays a Home section initially; can be split into its own
route later if it grows, without changing anything else.

## Data Layer

Plain typed arrays in `data/*.ts`, imported directly by pages — no
fetching, no route loaders (unnecessary for static local data).

```ts
// lib/types.ts
export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string;
  stack: string[];
  image: string;
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
}
```

`data/projects.ts` exports `projects: Project[]`. `ProjectDetail`
looks up the matching entry by `slug` from the URL param via
`useParams`. `data/skills.ts`, `data/experience.ts`, and `data/site.ts`
(name, tagline, socials, contact email) follow the same pattern with
their own typed interfaces in `lib/types.ts`.

## Theming (Dark Mode)

`ThemeContext` + `useTheme()` hook. Toggles a `dark` class on
`<html>`. Preference persisted to `localStorage`; defaults to the OS
`prefers-color-scheme` on first visit if no stored preference exists.
Tailwind v4 dark variant configured in `index.css`:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

## Animations

`motion` library for scroll-entrance effects (`whileInView`) on
section headings and cards, used sparingly rather than on every
element. Chosen over hand-rolled CSS + `IntersectionObserver` for
lower code overhead and more polish, at the cost of one small
dependency (~50kb).

## Contact Form (Netlify Forms)

Netlify detects forms by crawling static HTML at **build** time, but
the real form lives inside a client-rendered React SPA, so Netlify's
bot won't see it there. Fix: a hidden static duplicate of the form's
HTML (same `name`, `data-netlify="true"`, and field names) is added
directly to `index.html` purely so Netlify's build step registers the
form. The real `Contact.tsx` component posts via `fetch` to `/` with
`application/x-www-form-urlencoded`. A honeypot field
(`data-netlify-honeypot`) is included for spam protection.

## Tooling & Deployment

- **Tailwind v4**: `pnpm add tailwindcss @tailwindcss/vite`, plugin
  added to `vite.config.ts`, single `@import "tailwindcss";` in
  `index.css`.
- **Path aliases**: `@/*` → `src/*` in `tsconfig.app.json` and
  `vite.config.ts`.
- **React Router**: `pnpm add react-router-dom`.
- **motion**: `pnpm add motion`.
- **Netlify config** (`netlify.toml`):

  ```toml
  [build]
    command = "pnpm run build"
    publish = "dist"

  [[redirects]]
    from = "/*"
    to = "/index.html"
    status = 200
  ```

  The redirect rule is required so client-side routes like
  `/projects/foo` don't 404 on a direct load/refresh.

## Testing

No formal test framework for now. TypeScript plus the existing
ESLint config are the safety net; portfolio content is mostly static
markup/data rather than logic worth unit-testing. Vitest can be added
later if the contact form or other interactive pieces grow real logic
(YAGNI — not needed upfront).

## Out of Scope

- Blog/MDX content (not requested).
- Headless CMS integration (content is local, typed data files).
- Automated tests (see Testing above).
- Terms of Service page beyond Privacy Policy — add as another route
  following the same pattern (`PrivacyPolicy.tsx`) if/when needed.
