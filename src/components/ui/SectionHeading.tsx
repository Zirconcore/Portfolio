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
