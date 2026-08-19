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
