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
        ← Volver a Proyectos
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
            Ver Proyecto
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className={buttonStyles('secondary')}
          >
            Ver Código Fuente
          </a>
        )}
      </div>
    </div>
  )
}
