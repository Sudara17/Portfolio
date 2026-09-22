import { achievements } from './achievements.ts'
import { experience } from './experience.ts'
import { projects } from './projects.ts'
import { portfolioData } from './portfolio.ts'

export type SystemId = 'ai' | 'fullstack' | 'mobile' | 'testing'

export type SystemModule = {
  id: SystemId
  label: string
  detail: string
  projectIds: string[]
  skillNames: string[]
  experienceIds: string[]
  href: string
}

export const systemModules: SystemModule[] = [
  {
    id: 'ai',
    label: 'AI / LLM',
    detail: 'RAG, LangChain, FAISS, Whisper, LLM evaluation, and research.',
    projectIds: ['ai-resume-assistant', 'emotion-aware-assistant'],
    skillNames: ['LLMs', 'RAG', 'LangChain', 'FAISS', 'Whisper', 'Generative AI', 'NLP', 'Transformers'],
    experienceIds: ['justohire', 'turing-alignerr', 'connected-value'],
    href: '#projects',
  },
  {
    id: 'fullstack',
    label: 'FULL STACK',
    detail: 'React, TypeScript, REST APIs, and Supabase systems.',
    projectIds: ['invoice-management', 'leave-management'],
    skillNames: ['React', 'TypeScript', 'REST APIs', 'Supabase', 'JavaScript'],
    experienceIds: ['justohire'],
    href: '#projects',
  },
  {
    id: 'mobile',
    label: 'MOBILE',
    detail: 'Flutter mobile features at SivionX.',
    projectIds: [],
    skillNames: ['Flutter', 'Dart', 'Riverpod', 'Dio', 'GoRouter', 'AWS Cognito'],
    experienceIds: ['sivionx'],
    href: '#experience',
  },
  {
    id: 'testing',
    label: 'TESTING',
    detail: 'Playwright, Robot Framework, and REST API testing.',
    projectIds: [],
    skillNames: ['Playwright', 'Robot Framework', 'Postman', 'OpenSpec'],
    experienceIds: ['sivionx'],
    href: '#experience',
  },
]

const aiProjects = projects.filter((project) => project.category === 'AI / ML').length
const publications = achievements.filter((item) => item.id === 'email-summarization').length

export const osStats = {
  projects: projects.length,
  experience: experience.length,
  aiSystems: aiProjects + publications,
  publications,
  identity: portfolioData.profile.identity,
} as const
