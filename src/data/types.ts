export type Locale = 'pt' | 'en'

export interface ExperienceEntry {
  company: string
  role: string
  start: string
  end: string
  location: string
  bullets: string[]
  tech: string[]
  highlight?: string
}

export interface SkillGroup {
  label: string
  items: string[]
}

export interface EducationEntry {
  school: string
  degree: string
  start: string
  end: string
  description: string
}

export interface Content {
  meta: {
    title: string
    description: string
  }
  nav: {
    home: string
    about: string
    experience: string
    skills: string
    education: string
    contact: string
  }
  hero: {
    kicker: string
    welcome: string[]
    name: string
    role: string
    tagline: string
    location: string
    speaks: string
    cta1: string
    cta2: string
    resume: string
    resumeFile: string
  }
  about: {
    heading: string
    paragraphs: string[]
    stats: { value: string; label: string }[]
  }
  experience: {
    heading: string
    sub: string
    present: string
    remote: string
    items: ExperienceEntry[]
  }
  skills: {
    heading: string
    sub: string
    groups: SkillGroup[]
  }
  education: {
    heading: string
    items: EducationEntry[]
    languagesHeading: string
    languages: { name: string; level: string }[]
  }
  contact: {
    heading: string
    sub: string
    cta: string
    email: string
    linkedin: string
    linkedinUrl: string
    github: string
    githubUrl: string
  }
  footer: {
    text: string
  }
}
