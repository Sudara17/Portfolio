export type Achievement = {
  id: string
  title: string
  detail: string
  year?: string
  featured?: boolean
  rank?: string
  rankLabel?: string
  event?: string
  kicker?: string
}

export const achievements: Achievement[] = [
  {
    id: 'email-summarization',
    featured: true,
    kicker: 'Research publication · Atlantis Press',
    title: 'AI-Powered Email Summarization and Assistant System using LLMs',
    detail: 'Published in Atlantis Press and awarded 3rd place in oral presentation.',
    rank: '3rd',
    rankLabel: 'Place',
    event: 'ICISDIKSA 2026 · Oral presentation',
  },
  {
    id: 'nptel',
    title: 'E-Business Certification',
    detail: 'NPTEL (IIT Kharagpur)',
    year: '2025',
  },
  {
    id: 'ignite',
    title: 'Ignite India Program',
    detail: 'Wadhwani Foundation',
    year: '2025',
  },
]
