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
            Privacidad
          </Link>
        </div>
      </div>
    </footer>
  )
}
