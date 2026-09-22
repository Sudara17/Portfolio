import { portfolioData } from './portfolio.ts'

function lines(items: readonly string[]) {
  return items.map((item) => `- ${item}`).join('\n')
}

export function buildPortfolioContext() {
  const { profile, experience, projects, skills, achievements } = portfolioData
  const experienceText = experience
    .map((item) => {
      const tech = item.technologies?.length ? `\nTechnologies: ${item.technologies.join(', ')}` : ''
      const worked = item.workedOn?.length ? `\nWorked on: ${item.workedOn.join(', ')}` : ''
      return `${item.company}\n${item.role}\n${item.period}\n${lines(item.highlights)}${tech}${worked}`
    })
    .join('\n\n')

  const projectText = projects
    .map((project) => {
      const live = project.links?.length
        ? project.links.map((link) => `${link.label}: ${link.href}`).join('\n')
        : 'No live demo URL is currently available.'
      const metric = project.metric ? `\nMetric: ${project.metric.value}. ${project.metric.detail}` : ''
      return `${project.name}\n${project.technologies.join(', ')}\nProblem: ${project.problem}\n${lines(project.built)}\nResult: ${project.result}${metric}\nContext: ${project.technicalContext}\nExperience: ${project.relatedExperience}\nArchitecture: ${project.architecture.map((node) => node.label).join(' → ')}\n${live}`
    })
    .join('\n\n')

  const skillText = skills
    .map((category) => `${category.label}: ${category.skills.map((skill) => skill.name).join(', ')}`)
    .join('\n')

  const achievementText = achievements
    .map((item) => {
      const extra = [item.kicker, item.event, item.year, item.rank ? `${item.rank} ${item.rankLabel ?? ''}`.trim() : '']
        .filter(Boolean)
        .join(' · ')
      return `${item.title}\n${item.detail}${extra ? `\n${extra}` : ''}`
    })
    .join('\n\n')

  return `Name:
${profile.name}

Professional identity:
AI & Data Science graduate

Summary:
${profile.summary.join('\n')}

EXPERIENCE:

${experienceText}

PROJECTS:

${projectText}

SKILLS:

${skillText}

EDUCATION:

${profile.education.school}
${profile.education.degree}
${profile.education.period}

ACHIEVEMENTS:

${achievementText}

LIVE LINKS:

Invoice Management System:
https://invoice-management-system-rho.vercel.app/

Resume Hub / Resume Parser:
https://resume-hub-theta.vercel.app/

IMPORTANT:
Only mention these URLs when relevant.
Emotion-Aware Assistant and Leave Management System have no live demo URL.`
}
