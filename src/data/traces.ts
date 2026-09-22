export type TraceStep = {
  label: string
  href?: string
}

export type SkillTrace = {
  skill: string
  steps: TraceStep[]
}

export const skillTraces: SkillTrace[] = [
  {
    skill: 'RAG',
    steps: [
      { label: 'RAG' },
      { label: 'AI Resume Assistant', href: '#projects' },
      { label: 'Connected Value Health Solutions internship', href: '#experience' },
      { label: 'Email Summarization research', href: '#achievements' },
    ],
  },
  {
    skill: 'Flutter',
    steps: [
      { label: 'Flutter' },
      { label: 'SivionX', href: '#experience' },
      { label: 'Mobile Application' },
      { label: 'Dart' },
      { label: 'Riverpod' },
      { label: 'Dio' },
      { label: 'GoRouter' },
    ],
  },
  {
    skill: 'React',
    steps: [
      { label: 'React' },
      { label: 'Invoice Management System', href: '#projects' },
      { label: 'Leave Management System', href: '#projects' },
      { label: 'JustoHire', href: '#experience' },
    ],
  },
  {
    skill: 'FAISS',
    steps: [
      { label: 'FAISS' },
      { label: 'AI Resume Assistant', href: '#projects' },
    ],
  },
  {
    skill: 'Whisper',
    steps: [
      { label: 'Whisper' },
      { label: 'Emotion-Aware Assistant', href: '#projects' },
    ],
  },
  {
    skill: 'Playwright',
    steps: [
      { label: 'Playwright' },
      { label: 'SivionX', href: '#experience' },
    ],
  },
  {
    skill: 'Supabase',
    steps: [
      { label: 'Supabase' },
      { label: 'Invoice Management System', href: '#projects' },
      { label: 'Leave Management System', href: '#projects' },
      { label: 'JustoHire', href: '#experience' },
    ],
  },
]

export function traceFor(skill: string) {
  return skillTraces.find((item) => item.skill === skill)
}
