export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'decisions', label: 'Decisions' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Research' },
  { id: 'lab', label: 'Lab' },
  { id: 'contact', label: 'Contact' },
] as const

export const sectionIds = navItems.map((item) => item.id)

export const moduleLabels: Record<string, string> = {
  about: '01 PROFILE',
  experience: '02 EXPERIENCE',
  projects: '03 PROJECTS',
  decisions: '04 DECISIONS',
  skills: '05 SKILLS',
  achievements: '06 RESEARCH',
  lab: '07 LAB',
  contact: '08 CONTACT',
}
