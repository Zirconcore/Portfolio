import type { Project } from '@/lib/types'

export const projects: Project[] = [
  {
    slug: 'Agendia',
    title: 'Agendia',
    summary: 'A short one-line summary of what this project does.',
    description:
      'A longer description of the project: the problem it solves, the approach taken, and the outcome.',
    stack: ['React', 'TypeScript', 'Vite'],
    image: '/projects/project-one.png',
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com/yourusername/project-one',
    featured: true,
  }
]
