export interface Project {
  slug: string
  title: string
  summary: string
  description: string
  stack: string[]
  image: string
  liveUrl?: string
  repoUrl?: string
  featured?: boolean
}

export interface SkillCategory {
  category: string
  items: string[]
}

export interface ExperienceEntry {
  role: string
  organization: string
  startDate: string
  endDate: string | 'Present'
  description: string
  highlights?: string[]
}

export interface SiteInfo {
  company: string
  name: string
  tagline: string
  bio: string
  email: string
  socials: { label: string; url: string }[]
  resumeUrl: string
}
