export type Skill = {
  name: string
  mark: string
  context?: string
}

export type SkillCategory = {
  id: string
  label: string
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'ai',
    label: 'AI/ML & LLMs',
    skills: [
      { name: 'Machine Learning', mark: 'ML' },
      { name: 'Deep Learning', mark: 'DL' },
      {
        name: 'NLP',
        mark: 'NLP',
        context:
          'NLP-based ATS scoring in the AI Resume Assistant, and text emotion analysis in the Emotion-Aware Assistant.',
      },
      {
        name: 'LLMs',
        mark: 'LLM',
        context:
          'LLM applications, evaluation, embeddings, and Groq LLM in the AI Resume Assistant.',
      },
      {
        name: 'Generative AI',
        mark: 'Gen',
        context: 'Cover letter and mock interview generation in the AI Resume Assistant.',
      },
      {
        name: 'RAG',
        mark: 'RAG',
        context: 'RAG workflows at JustoHire and Connected Value Health Solutions.',
      },
      {
        name: 'LangChain',
        mark: 'LC',
        context:
          'Reusable LangChain modules at Connected Value Health Solutions, and the AI Resume Assistant.',
      },
      {
        name: 'FAISS',
        mark: 'FAI',
        context:
          'Implemented FAISS vector search, reducing retrieval time by 12%, validated on 10+ resume samples.',
      },
      {
        name: 'Transformers',
        mark: 'Tr',
        context: 'Transformer-based sentiment analysis in the Emotion-Aware Assistant.',
      },
      {
        name: 'Whisper',
        mark: 'Wh',
        context: 'Whisper ASR for voice emotion analysis in the Emotion-Aware Assistant.',
      },
    ],
  },
  {
    id: 'programming',
    label: 'Programming',
    skills: [
      {
        name: 'Python',
        mark: 'Py',
        context: 'JustoHire full-stack work and the AI Resume Assistant.',
      },
      {
        name: 'Dart',
        mark: 'Da',
        context: 'Flutter mobile features at SivionX Technologies.',
      },
      { name: 'C#', mark: 'C#' },
      {
        name: 'TypeScript',
        mark: 'TS',
        context: 'JustoHire, the Invoice Management System, and the Leave Management System.',
      },
      { name: 'JavaScript', mark: 'JS' },
      { name: 'SQL', mark: 'SQL' },
      { name: 'HTML', mark: 'HTML' },
      { name: 'CSS', mark: 'CSS' },
    ],
  },
  {
    id: 'frameworks',
    label: 'Frameworks & APIs',
    skills: [
      {
        name: 'Flutter',
        mark: 'Fl',
        context: 'Mobile application features at SivionX Technologies.',
      },
      {
        name: 'React',
        mark: 'Re',
        context: 'JustoHire applications, including invoice and leave management.',
      },
      { name: 'Angular', mark: 'Ng' },
      { name: 'ASP.NET Core', mark: '.NET' },
      { name: 'Flask', mark: 'Fk', context: 'Emotion-Aware Assistant.' },
      { name: 'Streamlit', mark: 'St', context: 'AI Resume Assistant.' },
      {
        name: 'REST APIs',
        mark: 'API',
        context:
          'Integration and testing across SivionX, JustoHire, and the invoice and leave systems.',
      },
      {
        name: 'Riverpod',
        mark: 'Rp',
        context: 'Flutter state management at SivionX Technologies.',
      },
      { name: 'Dio', mark: 'Dio', context: 'HTTP client in the SivionX Flutter application.' },
      { name: 'GoRouter', mark: 'Go', context: 'Navigation in the SivionX Flutter application.' },
    ],
  },
  {
    id: 'testing',
    label: 'Testing & Tools',
    skills: [
      {
        name: 'Playwright',
        mark: 'Pw',
        context: 'Functional and regression testing at SivionX Technologies.',
      },
      {
        name: 'Robot Framework',
        mark: 'RF',
        context: 'Functional and regression testing at SivionX Technologies.',
      },
      {
        name: 'OpenSpec',
        mark: 'OS',
        context: 'Spec-driven development at SivionX Technologies.',
      },
      { name: 'Git', mark: 'Git' },
      { name: 'GitHub', mark: 'GH' },
      { name: 'Postman', mark: 'Pm' },
      { name: 'PyMuPDF', mark: 'PDF' },
      { name: 'Tesseract OCR', mark: 'OCR' },
      {
        name: 'OpenCV',
        mark: 'CV',
        context: 'Facial emotion analysis in the Emotion-Aware Assistant.',
      },
      {
        name: 'MediaPipe',
        mark: 'MP',
        context: 'Emotion-Aware Assistant.',
      },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud & Deployment',
    skills: [
      { name: 'AWS', mark: 'AWS' },
      {
        name: 'AWS Cognito',
        mark: 'Cog',
        context: 'Authentication in the SivionX Flutter application.',
      },
      {
        name: 'Supabase',
        mark: 'Sb',
        context: 'JustoHire and the invoice and leave management systems.',
      },
      { name: 'Vercel', mark: 'Ve', context: 'Deployment at JustoHire.' },
      { name: 'Render', mark: 'Rd', context: 'Deployment at JustoHire.' },
    ],
  },
]
