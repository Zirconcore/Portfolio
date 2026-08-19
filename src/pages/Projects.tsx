import { motion } from 'motion/react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { projects } from '@/data/projects'

export function Projects() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <SectionHeading
        eyebrow=""
        title="Proyectos"
        description="Una selección de cosas que he construido."
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
