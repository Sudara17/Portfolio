export type ProjectCategory = 'AI / ML' | 'Full Stack'

export type ProjectLink = {
  label: string
  href: string
}

export type Project = {
  id: string
  name: string
  category: ProjectCategory
  description: string
  technologies: string[]
  features: string[]
  technicalComponents?: string[]
  metric?: {
    value: string
    detail: string
  }
  links?: ProjectLink[]
}

export const projectFilters = ['All', 'AI / ML', 'Full Stack'] as const
export type ProjectFilter = (typeof projectFilters)[number]

export const projects: Project[] = [
  {
    id: 'invoice-management',
    name: 'Invoice Management System',
    category: 'Full Stack',
    description:
      'Built a full-stack invoice management system with GSTIN, customer/item CRUD, invoice creation, editing, status tracking, and CGST/SGST/IGST tax calculations.',
    technologies: ['React', 'TypeScript', 'REST APIs', 'Supabase'],
    features: [
      'GSTIN management',
      'Customer CRUD',
      'Item CRUD',
      'Invoice creation',
      'Invoice editing',
      'Status tracking',
      'CGST calculation',
      'SGST calculation',
      'IGST calculation',
      'Invoice preview',
      'Printing',
      'PDF export',
      'Word export',
      'GSTIN-based branding',
      'Validation',
      'Historical invoice snapshots',
    ],
    links: [{ label: 'Live demo', href: 'https://invoice-management-system-rho.vercel.app/' }],
  },
  {
    id: 'leave-management',
    name: 'Leave Management System',
    category: 'Full Stack',
    description:
      'Built a full-stack leave management system with employee leave requests, approval workflows, leave balances, and status tracking.',
    technologies: ['React', 'TypeScript', 'REST APIs', 'Supabase'],
    features: [
      'Employee leave requests',
      'Approval workflows',
      'Leave balances',
      'Status tracking',
      'CRUD operations',
      'Role-based workflows',
      'Validation',
      'Database persistence',
      'Frontend/backend API integration',
    ],
  },
  {
    id: 'emotion-aware-assistant',
    name: 'Emotion-Aware Assistant',
    category: 'AI / ML',
    description:
      'Built a multimodal AI assistant achieving 89% accuracy in real-time emotion detection across voice, text, and facial expressions.',
    technologies: ['TensorFlow', 'Flask', 'Whisper', 'OpenCV', 'MediaPipe', 'PyTorch', 'NLTK/VADER'],
    features: [
      'Voice emotion analysis',
      'Text emotion analysis',
      'Facial emotion analysis',
      'Multimodal processing',
      'Real-time detection',
      'Six emotional states',
    ],
    technicalComponents: [
      'TensorFlow',
      'Whisper ASR',
      'Transformer-based sentiment analysis',
      'OpenCV',
      'MediaPipe',
      'PyTorch',
      'NLTK/VADER',
      'Flask',
    ],
    metric: {
      value: '89% accuracy',
      detail: 'Real-time emotion detection across voice, text, and facial expressions.',
    },
  },
  {
    id: 'ai-resume-assistant',
    name: 'AI Resume Assistant',
    category: 'AI / ML',
    description:
      'Built an AI Resume Assistant with LangChain and Groq LLM featuring NLP-based ATS scoring, cover letter generation, and mock interview generation.',
    technologies: ['Python', 'LangChain', 'Groq LLM', 'FAISS', 'Streamlit'],
    features: [
      'NLP-based ATS scoring',
      'Cover letter generation',
      'Mock interview generation',
      'FAISS vector search',
    ],
    metric: {
      value: '12% faster retrieval',
      detail:
        'Implemented FAISS vector search, reducing retrieval time by 12%, validated on 10+ resume samples.',
    },
    links: [{ label: 'Resume Hub', href: 'https://resume-hub-theta.vercel.app/' }],
  },
]
