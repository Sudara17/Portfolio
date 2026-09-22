export type FocusIcon = 'brain' | 'layers' | 'smartphone' | 'braces' | 'checks' | 'network'

export type FocusArea = {
  title: string
  text: string
  icon: FocusIcon
}

export const focusAreas: FocusArea[] = [
  {
    title: 'AI / LLM Applications',
    text: 'AI/LLM applications, evaluation, and integration in working software.',
    icon: 'brain',
  },
  {
    title: 'Full-Stack Development',
    text: 'Full-stack applications with CRUD workflows, search, and database-backed APIs.',
    icon: 'layers',
  },
  {
    title: 'Flutter Development',
    text: 'Flutter features with Dart, Riverpod, Dio, GoRouter, and AWS Cognito.',
    icon: 'smartphone',
  },
  {
    title: 'REST APIs',
    text: 'REST API integration and testing across mobile and web workflows.',
    icon: 'braces',
  },
  {
    title: 'Automated Testing',
    text: 'Playwright and Robot Framework tests for functional and regression testing.',
    icon: 'checks',
  },
  {
    title: 'RAG & Prompt Engineering',
    text: 'RAG workflows, prompt engineering, and reusable LangChain modules.',
    icon: 'network',
  },
]
