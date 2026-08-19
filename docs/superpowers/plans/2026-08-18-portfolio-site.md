# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the untouched Vite + React + TypeScript scaffold into a professional multi-page portfolio site (Home, Projects, Project detail, Experience, Contact, Privacy Policy) with dark mode and scroll animations, deployable to Netlify.

**Architecture:** React Router v7 drives client-side routing inside a shared `Layout` (Navbar/Footer). Content lives in typed local data files (`src/data/*.ts`), not a CMS. A `ThemeContext` toggles a `dark` class on `<html>` for Tailwind v4 dark-mode styling. The contact form posts to Netlify Forms via `fetch`, with a hidden static duplicate in `index.html` so Netlify's build bot registers the form.

**Tech Stack:** React 19, TypeScript, Vite 8, Tailwind CSS v4 (`@tailwindcss/vite`), React Router v7 (`react-router-dom`), `motion` for animations, pnpm.

**Spec:** `docs/superpowers/specs/2026-08-18-portfolio-architecture-design.md`

## Global Constraints

- Package manager is **pnpm** — every install/run command uses `pnpm`, never `npm`/`yarn`.
- Do not touch the existing React 19 / TypeScript / Vite 8 scaffolding choices (already in `package.json`); only add to them.
- Tailwind CSS v4 is configured CSS-first via `@tailwindcss/vite` — no `tailwind.config.js` file.
- Routing uses React Router v7 (`react-router-dom`) — multi-page, not a single scrolling page, because legal pages need real routes.
- Animations use the `motion` package, applied sparingly (section headings/cards on scroll), not on every element.
- Path alias `@/*` resolves to `src/*` in both `vite.config.ts` and `tsconfig.app.json`.
- No test framework is added. TypeScript (`tsc -b`) and the existing ESLint config (`pnpm run lint`) are the verification tools for every task.
- Deployment target is Netlify; a `netlify.toml` SPA redirect is required so client-side routes don't 404.
- `verbatimModuleSyntax` is enabled in tsconfig — always use `import type { ... }` for type-only imports.

---

### Task 1: Initialize git and install dependencies

**Files:**
- Create: `.git/` (via `git init` — this directory is not yet a git repo)
- Modify: `package.json`, `pnpm-lock.yaml`

**Interfaces:**
- Produces: `react-router-dom`, `motion`, `tailwindcss`, `@tailwindcss/vite` available as dependencies for all later tasks.

- [ ] **Step 1: Initialize git**

Run: `git init`

- [ ] **Step 2: Commit the existing scaffold as a baseline**

```bash
git add -A
git commit -m "chore: initial Vite + React + TS scaffold"
```

- [ ] **Step 3: Install runtime dependencies**

Run: `pnpm add react-router-dom motion`

- [ ] **Step 4: Install dev dependencies**

Run: `pnpm add -D tailwindcss @tailwindcss/vite`

- [ ] **Step 5: Verify install**

Run: `pnpm install`
Expected: exits 0, no errors. Confirm `package.json` now lists `react-router-dom`, `motion` under `dependencies` and `tailwindcss`, `@tailwindcss/vite` under `devDependencies`.

- [ ] **Step 6: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: add react-router-dom, motion, tailwindcss"
```

---

### Task 2: Tailwind v4 + path alias configuration

**Files:**
- Modify: `vite.config.ts`
- Modify: `tsconfig.app.json`
- Modify: `src/index.css`

**Interfaces:**
- Produces: `@` import alias resolving to `src/`; Tailwind utility classes and the `dark:` variant available in every component from this point on.

- [ ] **Step 1: Add the Tailwind plugin and `@` alias to `vite.config.ts`**

Replace the full file contents:

```ts
import path from 'node:path'
import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
```

- [ ] **Step 2: Add `baseUrl`/`paths` to `tsconfig.app.json`**

In the `compilerOptions` block, add `baseUrl` and `paths` right after `"moduleResolution": "bundler",`:

```json
    "moduleResolution": "bundler",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
```

- [ ] **Step 3: Replace `src/index.css` with the Tailwind entry point**

Replace the full file contents (removes the default scaffold's custom CSS vars, which are no longer used once `App.tsx` is rewritten in Task 8):

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@layer base {
  body {
    margin: 0;
    font-family: system-ui, "Segoe UI", Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
```

- [ ] **Step 4: Verify type-check**

Run: `pnpm exec tsc -b`
Expected: exits 0 (App.tsx/App.css still reference the old scaffold at this point, which is fine — they're rewritten in Task 8).

- [ ] **Step 5: Verify Tailwind is wired up**

Run: `pnpm run dev`, open `http://localhost:5173/` in a browser. The default scaffold page still renders (unchanged until Task 8), but no build/console errors should appear. Stop the dev server.

- [ ] **Step 6: Commit**

```bash
git add vite.config.ts tsconfig.app.json src/index.css
git commit -m "feat: configure tailwind v4 and @ path alias"
```

---

### Task 3: Shared TypeScript types

**Files:**
- Create: `src/lib/types.ts`

**Interfaces:**
- Produces: `Project`, `SkillCategory`, `ExperienceEntry`, `SiteInfo` types, imported by every data file and most components from here on.

- [ ] **Step 1: Create `src/lib/types.ts`**

```ts
export interface Project {
  slug: string
  title: string
  summary: string
  description: string
  stack: string[]
  image: string
  liveUrl?: string
  repoUrl?: string
  featured?: boolean
}

export interface SkillCategory {
  category: string
  items: string[]
}

export interface ExperienceEntry {
  role: string
  organization: string
  startDate: string
  endDate: string | 'Present'
  description: string
  highlights?: string[]
}

export interface SiteInfo {
  name: string
  tagline: string
  bio: string
  email: string
  socials: { label: string; url: string }[]
  resumeUrl: string
}
```

- [ ] **Step 2: Verify type-check**

Run: `pnpm exec tsc -b`
Expected: exits 0 (file isn't imported anywhere yet, so this just confirms it parses cleanly).

- [ ] **Step 3: Commit**

```bash
git add src/lib/types.ts
git commit -m "feat: add shared content types"
```

---

### Task 4: Content data files

**Files:**
- Create: `src/data/site.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/skills.ts`
- Create: `src/data/experience.ts`

**Interfaces:**
- Consumes: `Project`, `SkillCategory`, `ExperienceEntry`, `SiteInfo` from `@/lib/types` (Task 3).
- Produces: `site: SiteInfo`, `projects: Project[]`, `skills: SkillCategory[]`, `experience: ExperienceEntry[]`, imported by pages and layout components in later tasks. Contains realistic placeholder content the site owner replaces with real info.

- [ ] **Step 1: Create `src/data/site.ts`**

```ts
import type { SiteInfo } from '@/lib/types'

export const site: SiteInfo = {
  name: 'Your Name',
  tagline: 'Software Engineer building thoughtful, reliable products.',
  bio: 'I design and build web applications end to end, from architecture to polished UI. I care about clean interfaces, both in code and on screen.',
  email: 'you@example.com',
  socials: [
    { label: 'GitHub', url: 'https://github.com/yourusername' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/yourusername' },
  ],
  resumeUrl: '/resume.pdf',
}
```

Note: `resumeUrl` points at `public/resume.pdf`, which doesn't exist yet — the site owner must drop their actual resume PDF at `public/resume.pdf` before deploying (the Experience page's download link in Task 12 will 404 until then).

- [ ] **Step 2: Create `src/data/projects.ts`**

```ts
import type { Project } from '@/lib/types'

export const projects: Project[] = [
  {
    slug: 'project-one',
    title: 'Project One',
    summary: 'A short one-line summary of what this project does.',
    description:
      'A longer description of the project: the problem it solves, the approach taken, and the outcome.',
    stack: ['React', 'TypeScript', 'Vite'],
    image: '/projects/project-one.png',
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com/yourusername/project-one',
    featured: true,
  },
  {
    slug: 'project-two',
    title: 'Project Two',
    summary: 'A short one-line summary of what this project does.',
    description:
      'A longer description of the project: the problem it solves, the approach taken, and the outcome.',
    stack: ['Node.js', 'PostgreSQL'],
    image: '/projects/project-two.png',
    repoUrl: 'https://github.com/yourusername/project-two',
    featured: true,
  },
  {
    slug: 'project-three',
    title: 'Project Three',
    summary: 'A short one-line summary of what this project does.',
    description:
      'A longer description of the project: the problem it solves, the approach taken, and the outcome.',
    stack: ['Python', 'FastAPI'],
    image: '/projects/project-three.png',
    featured: true,
  },
]
```

- [ ] **Step 3: Create `src/data/skills.ts`**

```ts
import type { SkillCategory } from '@/lib/types'

export const skills: SkillCategory[] = [
  { category: 'Languages', items: ['TypeScript', 'JavaScript', 'Python'] },
  { category: 'Frontend', items: ['React', 'Vite', 'Tailwind CSS'] },
  { category: 'Backend', items: ['Node.js', 'PostgreSQL', 'REST APIs'] },
  { category: 'Tools', items: ['Git', 'Docker', 'Netlify'] },
]
```

- [ ] **Step 4: Create `src/data/experience.ts`**

```ts
import type { ExperienceEntry } from '@/lib/types'

export const experience: ExperienceEntry[] = [
  {
    role: 'Software Engineer',
    organization: 'Company Name',
    startDate: '2023',
    endDate: 'Present',
    description: 'Describe your role and impact at this position.',
    highlights: [
      'A specific measurable achievement.',
      'Another specific measurable achievement.',
    ],
  },
  {
    role: 'Junior Developer',
    organization: 'Previous Company',
    startDate: '2021',
    endDate: '2023',
    description: 'Describe your role and impact at this position.',
  },
]
```

- [ ] **Step 5: Verify type-check**

Run: `pnpm exec tsc -b`
Expected: exits 0.

- [ ] **Step 6: Commit**

```bash
git add src/data
git commit -m "feat: add placeholder content data files"
```

---

### Task 5: Theme context and hook

**Files:**
- Create: `src/context/ThemeContext.tsx`
- Create: `src/hooks/useTheme.ts`

**Interfaces:**
- Produces: `ThemeProvider` (wraps the app in Task 8), `useTheme(): { theme: 'light' | 'dark', toggleTheme: () => void }` (used by `ThemeToggle` in Task 6).

- [ ] **Step 1: Create `src/context/ThemeContext.tsx`**

```tsx
import { createContext, useEffect, useState, type ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

function getInitialTheme(): Theme {
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

- [ ] **Step 2: Create `src/hooks/useTheme.ts`**

```ts
import { useContext } from 'react'
import { ThemeContext } from '@/context/ThemeContext'

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
```

- [ ] **Step 3: Verify type-check**

Run: `pnpm exec tsc -b`
Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
git add src/context src/hooks
git commit -m "feat: add theme context and useTheme hook"
```

---

### Task 6: UI primitives

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Card.tsx`
- Create: `src/components/ui/SectionHeading.tsx`
- Create: `src/components/ui/ThemeToggle.tsx`

**Interfaces:**
- Consumes: `useTheme` from `@/hooks/useTheme` (Task 5).
- Produces: `Button`, `ButtonLink`, `buttonStyles(variant?, className?)`, `Card`, `SectionHeading`, `ThemeToggle` — used throughout `pages/` and `components/layout/` in later tasks.

- [ ] **Step 1: Create `src/components/ui/Button.tsx`**

```tsx
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

export type ButtonVariant = 'primary' | 'secondary'

export function buttonStyles(variant: ButtonVariant = 'primary', className = ''): string {
  const base =
    'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-slate-900 text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200',
    secondary:
      'border border-slate-300 text-slate-900 hover:bg-slate-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800',
  }
  return `${base} ${variants[variant]} ${className}`
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

export function Button({ variant = 'primary', className = '', ...rest }: ButtonProps) {
  return <button className={buttonStyles(variant, className)} {...rest} />
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant
}

export function ButtonLink({ variant = 'primary', className = '', ...rest }: ButtonLinkProps) {
  return <a className={buttonStyles(variant, className)} {...rest} />
}
```

- [ ] **Step 2: Create `src/components/ui/Card.tsx`**

```tsx
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 ${className}`}
    >
      {children}
    </div>
  )
}
```

- [ ] **Step 3: Create `src/components/ui/SectionHeading.tsx`**

```tsx
interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-8 max-w-2xl">
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{title}</h2>
      {description && (
        <p className="mt-3 text-slate-600 dark:text-slate-300">{description}</p>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Create `src/components/ui/ThemeToggle.tsx`**

```tsx
import { useTheme } from '@/hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
```

- [ ] **Step 5: Verify type-check and lint**

Run: `pnpm exec tsc -b && pnpm run lint`
Expected: both exit 0 (none of these are imported yet, so this just confirms they compile and lint cleanly).

- [ ] **Step 6: Commit**

```bash
git add src/components/ui
git commit -m "feat: add Button, Card, SectionHeading, ThemeToggle primitives"
```

---

### Task 7: Layout — Navbar, Footer, Layout

**Files:**
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/layout/Layout.tsx`

**Interfaces:**
- Consumes: `ThemeToggle` from `@/components/ui/ThemeToggle` (Task 6), `site` from `@/data/site` (Task 4), `NavLink`/`Link`/`Outlet` from `react-router-dom`.
- Produces: `Layout` — the route-wrapping shell used in `App.tsx` (Task 8).

- [ ] **Step 1: Create `src/components/layout/Navbar.tsx`**

```tsx
import { NavLink } from 'react-router-dom'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { site } from '@/data/site'

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/contact', label: 'Contact' },
]

export function Navbar() {
  return (
    <header className="border-b border-slate-200 dark:border-slate-800">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="text-lg font-semibold text-slate-900 dark:text-white">
          {site.name}
        </NavLink>
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-slate-900 dark:text-white'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
```

- [ ] **Step 2: Create `src/components/layout/Footer.tsx`**

```tsx
import { Link } from 'react-router-dom'
import { site } from '@/data/site'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 py-8 text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:justify-between">
        <p>
          © {year} {site.name}
        </p>
        <div className="flex items-center gap-4">
          {site.socials.map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-900 dark:hover:text-white"
            >
              {social.label}
            </a>
          ))}
          <Link to="/privacy" className="hover:text-slate-900 dark:hover:text-white">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Create `src/components/layout/Layout.tsx`**

```tsx
import { Outlet } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 4: Verify type-check and lint**

Run: `pnpm exec tsc -b && pnpm run lint`
Expected: both exit 0.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout
git commit -m "feat: add Navbar, Footer, Layout"
```

---

### Task 8: Router scaffold and scaffold cleanup

**Files:**
- Modify: `src/App.tsx` (full rewrite)
- Modify: `index.html` (title only)
- Create: `src/pages/NotFound.tsx`
- Create: `src/pages/Home.tsx` (placeholder, fleshed out in Task 10)
- Create: `src/pages/Projects.tsx` (placeholder, fleshed out in Task 9)
- Create: `src/pages/ProjectDetail.tsx` (placeholder, fleshed out in Task 11)
- Create: `src/pages/Experience.tsx` (placeholder, fleshed out in Task 12)
- Create: `src/pages/Contact.tsx` (placeholder, fleshed out in Task 13)
- Create: `src/pages/PrivacyPolicy.tsx` (placeholder, fleshed out in Task 14)
- Delete: `src/App.css`, `src/assets/react.svg`, `src/assets/vite.svg`, `src/assets/hero.png`, `public/icons.svg`

**Interfaces:**
- Consumes: `ThemeProvider` (Task 5), `Layout` (Task 7).
- Produces: working route table at `/`, `/projects`, `/projects/:slug`, `/experience`, `/contact`, `/privacy`, `*` — every later page task modifies one of the placeholder files created here instead of creating a new file.

- [ ] **Step 1: Delete unused default-scaffold files**

```bash
rm src/App.css src/assets/react.svg src/assets/vite.svg src/assets/hero.png public/icons.svg
```

- [ ] **Step 2: Create placeholder page components**

Create each of the following six files with this pattern (substitute the component name and heading text per file):

`src/pages/Home.tsx`:
```tsx
export function Home() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Home</h1>
    </div>
  )
}
```

`src/pages/Projects.tsx`:
```tsx
export function Projects() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Projects</h1>
    </div>
  )
}
```

`src/pages/ProjectDetail.tsx`:
```tsx
export function ProjectDetail() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Project Detail</h1>
    </div>
  )
}
```

`src/pages/Experience.tsx`:
```tsx
export function Experience() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Experience</h1>
    </div>
  )
}
```

`src/pages/Contact.tsx`:
```tsx
export function Contact() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Contact</h1>
    </div>
  )
}
```

`src/pages/PrivacyPolicy.tsx`:
```tsx
export function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Privacy Policy</h1>
    </div>
  )
}
```

- [ ] **Step 3: Create `src/pages/NotFound.tsx` (final version, not a placeholder)**

```tsx
import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 py-24 text-center">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white">404</h1>
      <p className="text-slate-600 dark:text-slate-300">This page doesn't exist.</p>
      <Link to="/" className="text-sm font-medium text-slate-900 underline dark:text-white">
        Back home
      </Link>
    </div>
  )
}
```

- [ ] **Step 4: Rewrite `src/App.tsx`**

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/context/ThemeContext'
import { Layout } from '@/components/layout/Layout'
import { Home } from '@/pages/Home'
import { Projects } from '@/pages/Projects'
import { ProjectDetail } from '@/pages/ProjectDetail'
import { Experience } from '@/pages/Experience'
import { Contact } from '@/pages/Contact'
import { PrivacyPolicy } from '@/pages/PrivacyPolicy'
import { NotFound } from '@/pages/NotFound'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:slug" element={<ProjectDetail />} />
            <Route path="experience" element={<Experience />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
```

- [ ] **Step 5: Update the page title in `index.html`**

Change line 7 from `<title>portfolio</title>` to `<title>Your Name — Portfolio</title>` (keep in sync with `site.name` in `src/data/site.ts`).

- [ ] **Step 6: Verify type-check and lint**

Run: `pnpm exec tsc -b && pnpm run lint`
Expected: both exit 0.

- [ ] **Step 7: Verify routing manually**

Run: `pnpm run dev`, then visit `http://localhost:5173/`, `/projects`, `/projects/anything`, `/experience`, `/contact`, `/privacy`, and `/nonexistent`. Confirm the Navbar/Footer render on every route, the placeholder heading matches the route, and `/nonexistent` shows the 404 page. Stop the dev server.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: wire up router, layout, and page scaffolding"
```

---

### Task 9: ProjectCard component and Projects page

**Files:**
- Create: `src/components/projects/ProjectCard.tsx`
- Modify: `src/pages/Projects.tsx` (replace placeholder)

**Interfaces:**
- Consumes: `Card` (Task 6), `Project` type (Task 3), `projects` data (Task 4).
- Produces: `ProjectCard({ project: Project })` — reused by `Home.tsx` in Task 10.

- [ ] **Step 1: Create `src/components/projects/ProjectCard.tsx`**

```tsx
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import type { Project } from '@/lib/types'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link to={`/projects/${project.slug}`} className="block">
      <Card className="h-full overflow-hidden !p-0 transition-shadow hover:shadow-md">
        <img
          src={project.image}
          alt=""
          className="aspect-video w-full object-cover"
          loading="lazy"
        />
        <div className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{project.summary}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </Link>
  )
}
```

- [ ] **Step 2: Replace `src/pages/Projects.tsx`**

```tsx
import { motion } from 'motion/react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { projects } from '@/data/projects'

export function Projects() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <SectionHeading
        eyebrow="Work"
        title="Projects"
        description="A selection of things I've built."
      />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-6 sm:grid-cols-2"
      >
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </motion.div>
    </div>
  )
}
```

- [ ] **Step 3: Verify type-check and lint**

Run: `pnpm exec tsc -b && pnpm run lint`
Expected: both exit 0.

- [ ] **Step 4: Verify manually**

Run: `pnpm run dev`, visit `/projects`. Confirm the three placeholder projects render as cards with fade-in-up animation on load, and clicking a card navigates to `/projects/<slug>` (still the placeholder detail page for now). The card images will show as broken — that's expected until real files exist at `public/projects/*.png` (see Task 15 Step 6). Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add src/components/projects src/pages/Projects.tsx
git commit -m "feat: build ProjectCard and Projects page"
```

---

### Task 10: Home page

**Files:**
- Modify: `src/pages/Home.tsx` (replace placeholder)

**Interfaces:**
- Consumes: `ProjectCard` (Task 9), `buttonStyles` (Task 6), `SectionHeading` (Task 6), `site`/`projects`/`skills` data (Task 4).

- [ ] **Step 1: Replace `src/pages/Home.tsx`**

```tsx
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { buttonStyles } from '@/components/ui/Button'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { site } from '@/data/site'
import { projects } from '@/data/projects'
import { skills } from '@/data/skills'

const featuredProjects = projects.filter((project) => project.featured)

export function Home() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-12"
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {site.tagline}
        </p>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white sm:text-5xl">
          Hi, I'm {site.name}.
        </h1>
        <p className="mt-4 max-w-xl text-slate-600 dark:text-slate-300">{site.bio}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/projects" className={buttonStyles('primary')}>
            View Projects
          </Link>
          <Link to="/contact" className={buttonStyles('secondary')}>
            Get in Touch
          </Link>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="py-12"
      >
        <SectionHeading eyebrow="Work" title="Featured Projects" />
        <div className="grid gap-6 sm:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="py-12"
      >
        <SectionHeading eyebrow="Toolbox" title="Skills" />
        <div className="grid gap-4 sm:grid-cols-2">
          {skills.map((group) => (
            <div key={group.category}>
              <h3 className="mb-2 text-sm font-semibold text-slate-900 dark:text-white">
                {group.category}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {group.items.join(', ')}
              </p>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  )
}
```

- [ ] **Step 2: Verify type-check and lint**

Run: `pnpm exec tsc -b && pnpm run lint`
Expected: both exit 0.

- [ ] **Step 3: Verify manually**

Run: `pnpm run dev`, visit `/`. Confirm hero text/CTA render, the two featured projects appear as cards, skills groups list correctly, and scrolling down triggers the fade-in-up animation on the Featured Projects and Skills sections. Toggle dark mode via the Navbar's `ThemeToggle` (from Task 6/7) and confirm colors invert correctly. Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Home.tsx
git commit -m "feat: build Home page"
```

---

### Task 11: Project detail page

**Files:**
- Modify: `src/pages/ProjectDetail.tsx` (replace placeholder)

**Interfaces:**
- Consumes: `buttonStyles` (Task 6), `projects` data (Task 4), `useParams`/`Navigate` from `react-router-dom`.

- [ ] **Step 1: Replace `src/pages/ProjectDetail.tsx`**

```tsx
import { Link, Navigate, useParams } from 'react-router-dom'
import { buttonStyles } from '@/components/ui/Button'
import { projects } from '@/data/projects'

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    return <Navigate to="/projects" replace />
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link
        to="/projects"
        className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
      >
        ← Back to Projects
      </Link>
      <img
        src={project.image}
        alt=""
        className="mt-4 aspect-video w-full rounded-lg object-cover"
        loading="lazy"
      />
      <h1 className="mt-6 text-3xl font-bold text-slate-900 dark:text-white">{project.title}</h1>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            {tech}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-slate-600 dark:text-slate-300">{project.description}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className={buttonStyles('primary')}
          >
            View Live
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className={buttonStyles('secondary')}
          >
            View Code
          </a>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify type-check and lint**

Run: `pnpm exec tsc -b && pnpm run lint`
Expected: both exit 0.

- [ ] **Step 3: Verify manually**

Run: `pnpm run dev`, visit `/projects/project-one` (full detail with Live + Code links), `/projects/project-two` (only Code link, no Live), and `/projects/does-not-exist` (should redirect to `/projects`). Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add src/pages/ProjectDetail.tsx
git commit -m "feat: build ProjectDetail page"
```

---

### Task 12: Experience page

**Files:**
- Modify: `src/pages/Experience.tsx` (replace placeholder)

**Interfaces:**
- Consumes: `SectionHeading`, `buttonStyles` (Task 6), `experience` data (Task 4), `site.resumeUrl` (Task 4).

- [ ] **Step 1: Replace `src/pages/Experience.tsx`**

```tsx
import { SectionHeading } from '@/components/ui/SectionHeading'
import { buttonStyles } from '@/components/ui/Button'
import { experience } from '@/data/experience'
import { site } from '@/data/site'

export function Experience() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <SectionHeading eyebrow="Career" title="Experience" />
      <a href={site.resumeUrl} download className={buttonStyles('secondary')}>
        Download Resume
      </a>
      <ol className="mt-8 space-y-8 border-l border-slate-200 pl-6 dark:border-slate-800">
        {experience.map((entry) => (
          <li key={`${entry.organization}-${entry.role}`} className="relative">
            <span className="absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full bg-slate-900 dark:bg-white" />
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {entry.startDate} – {entry.endDate}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
              {entry.role} · {entry.organization}
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-300">{entry.description}</p>
            {entry.highlights && (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-300">
                {entry.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
```

- [ ] **Step 2: Verify type-check and lint**

Run: `pnpm exec tsc -b && pnpm run lint`
Expected: both exit 0.

- [ ] **Step 3: Verify manually**

Run: `pnpm run dev`, visit `/experience`. Confirm both timeline entries render with dates, role/organization, description, and the first entry's highlight bullets. The "Download Resume" link is expected to 404 until `public/resume.pdf` is added (see Task 4 note) — that's expected at this point. Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Experience.tsx
git commit -m "feat: build Experience page"
```

---

### Task 13: Contact page and Netlify Forms wiring

**Files:**
- Modify: `src/pages/Contact.tsx` (replace placeholder)
- Modify: `index.html` (add hidden static form for Netlify's build-time form detection)

**Interfaces:**
- Consumes: `SectionHeading`, `Button` (Task 6), `site.email` (Task 4).

- [ ] **Step 1: Add the hidden static form to `index.html`**

Insert this immediately after `<body>` (line 9), before `<div id="root"></div>`. This exists purely so Netlify's build bot detects the form's shape at deploy time — it is never shown to visitors; the real form in `Contact.tsx` is what they interact with, and both must share the same `name` and field names.

```html
    <form name="contact" data-netlify="true" netlify-honeypot="bot-field" hidden>
      <input type="text" name="name" />
      <input type="email" name="email" />
      <textarea name="message"></textarea>
      <input type="text" name="bot-field" />
    </form>
```

- [ ] **Step 2: Replace `src/pages/Contact.tsx`**

```tsx
import { useState, type FormEvent } from 'react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { site } from '@/data/site'

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

function encode(data: Record<string, string>): string {
  return Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')
}

export function Contact() {
  const [status, setStatus] = useState<SubmitStatus>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')

    const form = event.currentTarget
    const formData = new FormData(form)
    const payload: Record<string, string> = { 'form-name': 'contact' }
    formData.forEach((value, key) => {
      payload[key] = value.toString()
    })

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(payload),
      })
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <SectionHeading
        eyebrow="Say hello"
        title="Contact"
        description={`Have a project in mind or just want to connect? Reach out at ${site.email}.`}
      />

      {status === 'success' ? (
        <p className="rounded-md border border-slate-200 bg-slate-50 p-4 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          Thanks for reaching out — I'll get back to you soon.
        </p>
      ) : (
        <form name="contact" onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="form-name" value="contact" />
          <p className="hidden">
            <label>
              Don't fill this out: <input name="bot-field" />
            </label>
          </p>

          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-slate-900 dark:text-white"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-slate-900 dark:text-white"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-1 block text-sm font-medium text-slate-900 dark:text-white"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </div>

          {status === 'error' && (
            <p className="text-sm text-red-600 dark:text-red-400">
              Something went wrong sending your message. Please try again or email {site.email}{' '}
              directly.
            </p>
          )}

          <Button type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending…' : 'Send Message'}
          </Button>
        </form>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Verify type-check and lint**

Run: `pnpm exec tsc -b && pnpm run lint`
Expected: both exit 0.

- [ ] **Step 4: Verify manually**

Run: `pnpm run dev`, visit `/contact`. Fill in and submit the form. Expected in local dev: the `fetch` to `/` will not actually register with Netlify (form handling only works on a real Netlify deploy), so submitting locally is expected to either fail (fetch to `/` returns the dev-server's `index.html`, `response.ok` is `true`, so the UI will show the success state) — confirm the success message renders and the form resets. Full form-submission delivery is only verifiable after deploying to Netlify (Task 15). Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Contact.tsx index.html
git commit -m "feat: build Contact page with Netlify Forms wiring"
```

---

### Task 14: Privacy Policy page

**Files:**
- Modify: `src/pages/PrivacyPolicy.tsx` (replace placeholder)

**Interfaces:**
- Consumes: `SectionHeading` (Task 6), `site` data (Task 4).

- [ ] **Step 1: Replace `src/pages/PrivacyPolicy.tsx`**

```tsx
import { SectionHeading } from '@/components/ui/SectionHeading'
import { site } from '@/data/site'

export function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <SectionHeading eyebrow="Legal" title="Privacy Policy" />
      <div className="space-y-4 text-slate-600 dark:text-slate-300">
        <p>
          This site does not use analytics or advertising cookies. The contact form on this
          site submits your name, email address, and message directly to {site.name} via
          Netlify Forms, solely to respond to your inquiry. Submitted data is not sold, shared,
          or used for any other purpose.
        </p>
        <p>
          If you have questions about this policy, contact {site.name} at {site.email}.
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify type-check and lint**

Run: `pnpm exec tsc -b && pnpm run lint`
Expected: both exit 0.

- [ ] **Step 3: Verify manually**

Run: `pnpm run dev`, visit `/privacy`. Confirm the policy text renders and the Footer's "Privacy" link (Task 7) navigates here correctly. Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add src/pages/PrivacyPolicy.tsx
git commit -m "feat: build Privacy Policy page"
```

---

### Task 15: Netlify deployment config and final build verification

**Files:**
- Create: `netlify.toml`

**Interfaces:**
- Produces: deployable static build with correct SPA routing on Netlify.

- [ ] **Step 1: Create `netlify.toml`**

```toml
[build]
  command = "pnpm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

- [ ] **Step 2: Run the full production build**

Run: `pnpm run build`
Expected: exits 0, produces a `dist/` directory. `tsc -b` runs as part of this (see `package.json`'s `build` script), so this also re-verifies the whole codebase type-checks with no errors.

- [ ] **Step 3: Run lint one final time across the whole project**

Run: `pnpm run lint`
Expected: exits 0.

- [ ] **Step 4: Smoke-test the production build locally**

Run: `pnpm run preview`, visit the printed local URL, and re-check `/`, `/projects`, `/projects/project-one`, `/experience`, `/contact`, `/privacy`, and a client-side route via full page refresh (e.g. reload directly on `/projects`) to confirm no 404 (the Netlify redirect isn't active locally via `vite preview`, but the direct-load-then-client-nav flow should still work correctly). Stop the preview server.

- [ ] **Step 5: Commit**

```bash
git add netlify.toml
git commit -m "chore: add netlify deployment config"
```

- [ ] **Step 6: Note remaining manual steps for the site owner**

These are outside the scope of this plan and require the user's own content/account, not further code changes:
- Replace placeholder content in `src/data/site.ts`, `src/data/projects.ts`, `src/data/skills.ts`, `src/data/experience.ts` with real information.
- Add project screenshot images referenced by `data/projects.ts` (`/projects/*.png`) to `public/projects/`.
- Add the real resume PDF at `public/resume.pdf`.
- Connect the repository to a new Netlify site (or run `netlify deploy`) to verify the Contact form actually delivers submissions — this only works on a live Netlify deploy, not local dev.
