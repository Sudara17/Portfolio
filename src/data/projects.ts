export type ProjectCategory = 'AI / ML' | 'Full Stack'

export type ProjectLink = {
  label: string
  href: string
}

export type ArchitectureNode = {
  id: string
  label: string
  detail: string
}

export type Project = {
  id: string
  name: string
  category: ProjectCategory
  description: string
  problem: string
  built: string[]
  result: string
  technologies: string[]
  features: string[]
  technicalComponents?: string[]
  technicalContext: string
  relatedExperience: string
  architecture: ArchitectureNode[]
  askPrompts: string[]
  demo?: 'invoice' | 'matcher'
  metric?: {
    value: string
    detail: string
  }
  links?: ProjectLink[]
}

export const projectFilters = ['All', 'AI / ML', 'Full Stack'] as const
export type ProjectFilter = (typeof projectFilters)[number]

const invoiceDemo = 'https://invoice-management-system-rho.vercel.app/'
const resumeHub = 'https://resume-hub-theta.vercel.app/'

export const projects: Project[] = [
  {
    id: 'invoice-management',
    name: 'Invoice Management System',
    category: 'Full Stack',
    description:
      'Built a full-stack invoice management system with GSTIN, customer/item CRUD, invoice creation, editing, status tracking, and CGST/SGST/IGST tax calculations.',
    problem:
      'Invoice work needed GSTIN records, customer and item CRUD, invoice creation and editing, status tracking, and CGST/SGST/IGST calculations.',
    built: [
      'GSTIN management',
      'Customer and item CRUD',
      'Invoice creation and editing',
      'Status tracking',
      'CGST, SGST, and IGST calculations',
      'Invoice preview, printing, and PDF/Word export',
      'GSTIN-based branding, validation, and historical invoice snapshots',
    ],
    result:
      'A full-stack invoice system with preview, printing, PDF and Word export, GSTIN-based branding, validation, and historical invoice snapshots.',
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
    technicalContext:
      'React and TypeScript interface, REST APIs, GST calculation logic, and Supabase-backed persistence.',
    relatedExperience: 'JustoHire · AI/Software Developer Intern. The role included the Invoice Management system.',
    architecture: [
      {
        id: 'ui',
        label: 'React UI',
        detail: 'React and TypeScript interface for invoice creation, editing, preview, printing, and status tracking.',
      },
      {
        id: 'api',
        label: 'REST APIs',
        detail: 'REST APIs connect the interface to customer, item, and invoice operations.',
      },
      {
        id: 'logic',
        label: 'Business Logic',
        detail: 'GSTIN handling, validation, CGST/SGST/IGST calculations, and GSTIN-based branding.',
      },
      {
        id: 'supabase',
        label: 'Supabase',
        detail: 'Supabase is the database-backed service used for this system.',
      },
      {
        id: 'db',
        label: 'Database Persistence',
        detail: 'Stored records include historical invoice snapshots.',
      },
    ],
    askPrompts: [
      'Explain the architecture.',
      'How does GST calculation work?',
      'Why Supabase?',
      'How does invoice creation work?',
    ],
    demo: 'invoice',
    links: [{ label: 'Open Live Demo', href: invoiceDemo }],
  },
  {
    id: 'leave-management',
    name: 'Leave Management System',
    category: 'Full Stack',
    description:
      'Built a full-stack leave management system with employee leave requests, approval workflows, leave balances, and status tracking.',
    problem:
      'The system had to handle employee leave requests, approval workflows, leave balances, and status tracking.',
    built: [
      'Employee leave requests',
      'Approval workflows',
      'Leave balances',
      'Status tracking',
      'CRUD operations and role-based workflows',
      'Validation, database persistence, and frontend/backend API integration',
    ],
    result:
      'A full-stack leave system with request and approval workflows, balances, status tracking, validation, and database persistence.',
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
    technicalContext:
      'React and TypeScript interface with REST APIs and Supabase for database persistence. No live demo URL is listed.',
    relatedExperience: 'JustoHire · AI/Software Developer Intern. The role included the Leave Management system.',
    architecture: [
      {
        id: 'request',
        label: 'Employee Request',
        detail: 'Employees submit leave requests through the React interface.',
      },
      {
        id: 'approval',
        label: 'Approval Workflow',
        detail: 'Role-based approval workflows update request status.',
      },
      {
        id: 'balance',
        label: 'Leave Balance',
        detail: 'Leave balances are tracked with the requests.',
      },
      {
        id: 'api',
        label: 'REST API',
        detail: 'Frontend and backend API integration covers CRUD operations and validation.',
      },
      {
        id: 'supabase',
        label: 'Supabase',
        detail: 'Supabase provides the database persistence for the leave system.',
      },
    ],
    askPrompts: [
      'How does the approval workflow work?',
      'How is leave balance handled?',
      'Why Supabase?',
    ],
  },
  {
    id: 'emotion-aware-assistant',
    name: 'Emotion-Aware Assistant',
    category: 'AI / ML',
    description:
      'Built a multimodal AI assistant achieving 89% accuracy in real-time emotion detection across voice, text, and facial expressions.',
    problem:
      'Detect emotion in real time from voice, text, and facial expressions, across six emotional states.',
    built: [
      'Voice, text, and facial emotion analysis',
      'Multimodal processing',
      'Real-time detection across six emotional states',
      'Whisper ASR, transformer-based sentiment analysis, OpenCV, MediaPipe, PyTorch, and NLTK/VADER',
    ],
    result:
      '89% accuracy stated for real-time emotion detection across voice, text, and facial expressions.',
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
    technicalContext:
      'Flask application using TensorFlow, PyTorch, Whisper, OpenCV, MediaPipe, and NLTK/VADER. No live demo URL is listed.',
    relatedExperience:
      'The portfolio lists this as a project and does not attach it to an employer.',
    metric: {
      value: '89% accuracy',
      detail: 'Real-time emotion detection across voice, text, and facial expressions.',
    },
    architecture: [
      {
        id: 'text',
        label: 'Text',
        detail: 'Text emotion analysis uses transformer-based sentiment analysis and NLTK/VADER.',
      },
      {
        id: 'voice',
        label: 'Voice',
        detail: 'Voice input uses Whisper ASR before emotion analysis.',
      },
      {
        id: 'face',
        label: 'Face',
        detail: 'Facial signals use OpenCV and MediaPipe.',
      },
      {
        id: 'multi',
        label: 'Multimodal Processing',
        detail: 'The assistant processes voice, text, and facial expressions together.',
      },
      {
        id: 'analysis',
        label: 'Emotion Analysis',
        detail: 'Real-time detection across six emotional states. The portfolio states 89% accuracy.',
      },
      {
        id: 'combined',
        label: 'Combined Result',
        detail: 'The analyzed voice, text, and facial signals are combined into one result.',
      },
      {
        id: 'response',
        label: 'Assistant Response',
        detail: 'Flask serves the assistant response.',
      },
    ],
    askPrompts: [
      'How does multimodal emotion detection work?',
      'How does Whisper fit into the system?',
      'How are text, voice and facial signals combined?',
    ],
  },
  {
    id: 'ai-resume-assistant',
    name: 'AI Resume Assistant',
    category: 'AI / ML',
    description:
      'Built an AI Resume Assistant with LangChain and Groq LLM featuring NLP-based ATS scoring, cover letter generation, and mock interview generation.',
    problem:
      'Score resumes for ATS fit, generate cover letters, and generate mock interview questions from resume and job-description text.',
    built: [
      'NLP-based ATS scoring',
      'Cover letter generation',
      'Mock interview generation',
      'FAISS vector search',
    ],
    result:
      'FAISS vector search reduced retrieval time by 12%, validated on 10+ resume samples.',
    technologies: ['Python', 'LangChain', 'Groq LLM', 'FAISS', 'Streamlit'],
    features: [
      'NLP-based ATS scoring',
      'Cover letter generation',
      'Mock interview generation',
      'FAISS vector search',
    ],
    technicalContext:
      'Python assistant using LangChain, Groq LLM, FAISS, and Streamlit. Resume Hub / Resume Parser is a separate live link from the JustoHire work.',
    relatedExperience:
      'Related portfolio experience: JustoHire (Resume Hub/Parser, RAG, prompt engineering) and Connected Value Health Solutions (semantic resume parsing and RAG chatbot workflows).',
    metric: {
      value: '12% faster retrieval',
      detail:
        'Implemented FAISS vector search, reducing retrieval time by 12%, validated on 10+ resume samples.',
    },
    architecture: [
      {
        id: 'input',
        label: 'Resume / Job Description',
        detail: 'Inputs for NLP-based ATS scoring, cover letter generation, and mock interview generation.',
      },
      {
        id: 'text',
        label: 'Text Processing',
        detail: 'NLP processing prepares resume and job-description text.',
      },
      {
        id: 'chunk',
        label: 'Chunking / Processing',
        detail: 'Text is prepared before embeddings and FAISS retrieval. The portfolio does not state a chunk size.',
      },
      {
        id: 'embed',
        label: 'Embeddings',
        detail: 'Embeddings support the FAISS vector search used by the assistant.',
      },
      {
        id: 'faiss',
        label: 'FAISS Vector Search',
        detail: 'FAISS vector search reduced retrieval time by 12%, validated on 10+ resume samples.',
      },
      {
        id: 'retriever',
        label: 'Retriever',
        detail: 'LangChain retrieval returns the matching resume context.',
      },
      {
        id: 'llm',
        label: 'LLM',
        detail: 'Groq LLM generates the ATS, cover letter, and mock interview output.',
      },
      {
        id: 'response',
        label: 'Response',
        detail: 'Streamlit presents the assistant response.',
      },
    ],
    askPrompts: [
      'Explain the architecture.',
      'Why did you use FAISS?',
      'Why LangChain?',
      'How does the RAG pipeline work?',
      'What problem does this solve?',
    ],
    demo: 'matcher',
    links: [{ label: 'Open Live Demo', href: resumeHub }],
  },
]
