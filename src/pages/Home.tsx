import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { buttonStyles } from '@/components/ui/Button'
// import { ProjectCard } from '@/components/projects/ProjectCard'
import { site } from '@/data/site'
// import { projects } from '@/data/projects'
import { skills } from '@/data/skills'

// const featuredProjects = projects.filter((project) => project.featured)

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
          Bienvenido, yo soy {site.name}.
        </h1>
        <p className="mt-4 max-w-xl text-slate-600 dark:text-slate-300">{site.bio}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {/* <Link to="/projects" className={buttonStyles('primary')}>
            Ver Proyectos
          </Link> */}
          <Link to="/contact" className={buttonStyles('secondary')}>
            Ponerse en contacto
          </Link>
        </div>
      </motion.section>

      {/* <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="py-12"
      >
        <SectionHeading eyebrow="" title="Proyectos Destacados" />
        <div className="grid gap-6 sm:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </motion.section> */}

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="py-12"
      >
        <SectionHeading eyebrow="" title="Habilidades" />
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
