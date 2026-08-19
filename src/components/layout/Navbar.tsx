import { NavLink } from 'react-router-dom'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { site } from '@/data/site'

const links = [
  { to: '/', label: 'Inicio' },
  // { to: '/projects', label: 'Proyectos' },
  // { to: '/experience', label: 'Experiencia' },
  { to: '/contact', label: 'Contacto' },
]

export function Navbar() {
  return (
    <header className="border-b border-slate-200 dark:border-slate-800">
      <nav className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-6 py-4">
        <NavLink to="/" className="text-lg font-semibold text-slate-900 dark:text-white">
          {site.name}
        </NavLink>
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
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
