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
