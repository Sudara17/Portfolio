export type ExperienceItem = {
  id: string
  company: string
  role: string
  period: string
  highlights: string[]
  technologies?: string[]
}

export const experience: ExperienceItem[] = [
  {
    id: 'sivionx',
    company: 'SivionX Technologies',
    role: 'Software Developer',
    period: 'Jul 2026 – Present',
    highlights: [
      'Developed Flutter mobile application features using Dart, Riverpod, Dio, GoRouter, and AWS Cognito, integrating with REST APIs.',
      'Performed REST API testing and developed automated Playwright and Robot Framework tests for functional and regression testing.',
      'Adopted OpenSpec-based spec-driven development and contributed across web, API integration, authentication, and mobile application workflows.',
    ],
    technologies: [
      'Flutter',
      'Dart',
      'Riverpod',
      'Dio',
      'GoRouter',
      'AWS Cognito',
      'REST APIs',
      'Playwright',
      'Robot Framework',
      'OpenSpec',
    ],
  },
  {
    id: 'justohire',
    company: 'JustoHire',
    role: 'AI/Software Developer Intern',
    period: 'Aug 2026 – Present',
    highlights: [
      'Developed full-stack applications including Leave Management, Invoice Management, and Resume Hub/Parser systems.',
      'Implemented CRUD operations, workflows, GST calculations, document processing, resume parsing, search/filtering, and database-backed APIs.',
      'Contributed to AI/LLM integration, prompt engineering, RAG, API integration, testing, and deployment using Python, React, TypeScript, Vercel, Render, and Supabase.',
    ],
    technologies: [
      'Python',
      'React',
      'TypeScript',
      'Vercel',
      'Render',
      'Supabase',
      'RAG',
      'LLM',
      'REST APIs',
    ],
  },
  {
    id: 'turing-alignerr',
    company: 'Turing & Alignerr',
    role: 'Freelance AI Evaluator',
    period: 'Jan 2026 – Jun 2026',
    highlights: [
      'Evaluated real-time AI agents on complex tool-calling tasks, scoring task completion and factual correctness.',
      'Validated data metrics and code execution integrity, identifying edge cases and factual inconsistencies to improve model reliability.',
    ],
  },
  {
    id: 'connected-value',
    company: 'Connected Value Health Solutions Pvt. Ltd., Coimbatore',
    role: 'Gen AI Intern',
    period: 'Jun 2025 – Jul 2025',
    highlights: [
      'Built semantic resume parsing modules using LLM embeddings, validated on 10+ real-world samples.',
      'Designed RAG-powered chatbot workflows and reusable LangChain modules for contextual resume guidance.',
    ],
    technologies: ['LLM embeddings', 'RAG', 'LangChain'],
  },
]
