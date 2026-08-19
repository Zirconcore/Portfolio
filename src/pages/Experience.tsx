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
