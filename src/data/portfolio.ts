import { achievements } from './achievements.ts'
import { experience } from './experience.ts'
import { profile } from './profile.ts'
import { projects } from './projects.ts'
import { skillCategories } from './skills.ts'
import { skillTraces } from './traces.ts'
import { RESUME_URL } from '../lib/resume.ts'

export const portfolioData = {
  profile,
  education: profile.education,
  experience,
  projects,
  skills: skillCategories,
  achievements,
  research: achievements.filter((item) => item.id === 'email-summarization'),
  traces: skillTraces,
  resumeUrl: RESUME_URL,
} as const

export const assistantPrompts = [
  'What did Sudara do at SivionX?',
  'What did Sudara build at JustoHire?',
  'Explain the AI Resume Assistant.',
  'Why did she use FAISS?',
  'Which projects use RAG?',
  'Tell me about the Emotion-Aware Assistant.',
  'What Flutter experience does Sudara have?',
  'What is her research publication?',
] as const

export const assistantOpening =
  "Hi! I'm Sudara AI.\nAsk me about Sudara's projects, experience, skills, research, or technical decisions."

export const assistantUnavailable =
  "Sorry, I couldn't reach the AI assistant right now. You can still explore my projects below."
