export type DecisionKind = 'rationale'

export type EngineeringDecision = {
  id: string
  title: string
  kind: DecisionKind
  problem: string
  context: string
  selected: string
  reason: string
}

export type DecisionGroup = {
  projectId: string
  projectName: string
  decisions: EngineeringDecision[]
}

/**
 * Technical rationales only. The portfolio does not document rejected alternatives,
 * so these cards are labeled as rationales rather than personal decision histories.
 */
export const decisionGroups: DecisionGroup[] = [
  {
    projectId: 'ai-resume-assistant',
    projectName: 'AI Resume Assistant',
    decisions: [
      {
        id: 'faiss',
        title: 'Why FAISS?',
        kind: 'rationale',
        problem: 'The assistant needs semantic retrieval over resume and job-description content.',
        context: 'The project lists FAISS vector search and reports a 12% retrieval-time reduction, validated on 10+ resume samples.',
        selected: 'FAISS',
        reason:
          'FAISS supports local vector similarity search for the retrieval step in the LangChain + Groq LLM workflow documented for this project.',
      },
      {
        id: 'langchain',
        title: 'Why LangChain?',
        kind: 'rationale',
        problem: 'Resume scoring, cover letter generation, and mock interviews need a composition layer around retrieval and generation.',
        context: 'The portfolio lists LangChain for the AI Resume Assistant and for reusable modules at Connected Value Health Solutions.',
        selected: 'LangChain',
        reason:
          'LangChain fits the documented RAG-style pipeline: text processing, retrieval, and LLM response generation.',
      },
      {
        id: 'rag',
        title: 'Why RAG?',
        kind: 'rationale',
        problem: 'Answers and generated artifacts need grounded resume/job context instead of free-form generation alone.',
        context: 'RAG appears in JustoHire work, Connected Value Health Solutions, and the AI Resume Assistant retrieval flow.',
        selected: 'RAG',
        reason:
          'Retrieval-augmented generation matches the documented need to pull relevant resume context before LLM output.',
      },
      {
        id: 'groq',
        title: 'Why Groq?',
        kind: 'rationale',
        problem: 'The assistant needs an LLM backend for ATS scoring, cover letters, and mock interviews.',
        context: 'The project technologies explicitly include Groq LLM.',
        selected: 'Groq LLM',
        reason:
          'Groq LLM is the listed generation model in the AI Resume Assistant stack.',
      },
      {
        id: 'streamlit',
        title: 'Why Streamlit?',
        kind: 'rationale',
        problem: 'The assistant needs an interface for interacting with scoring and generation features.',
        context: 'Streamlit is listed in the AI Resume Assistant technologies.',
        selected: 'Streamlit',
        reason:
          'Streamlit is the documented UI layer for presenting the assistant response.',
      },
    ],
  },
  {
    projectId: 'invoice-management',
    projectName: 'Invoice Management System',
    decisions: [
      {
        id: 'react',
        title: 'Why React?',
        kind: 'rationale',
        problem: 'Invoice creation, editing, preview, and status tracking need a component-based interface.',
        context: 'React is listed for the Invoice Management System and JustoHire full-stack work.',
        selected: 'React',
        reason: 'React is the documented UI framework for the invoice workflows.',
      },
      {
        id: 'typescript',
        title: 'Why TypeScript?',
        kind: 'rationale',
        problem: 'Invoice, GSTIN, and tax fields benefit from typed structures across CRUD flows.',
        context: 'TypeScript is listed for the invoice and leave systems.',
        selected: 'TypeScript',
        reason: 'TypeScript is the documented language layer for the full-stack invoice application.',
      },
      {
        id: 'rest',
        title: 'Why REST APIs?',
        kind: 'rationale',
        problem: 'Customer, item, and invoice operations need a clear client/server contract.',
        context: 'REST APIs are listed for the invoice system and related JustoHire work.',
        selected: 'REST APIs',
        reason: 'REST APIs are the documented integration path between the React UI and backend persistence.',
      },
      {
        id: 'supabase',
        title: 'Why Supabase?',
        kind: 'rationale',
        problem: 'Invoice records, customers, items, and historical snapshots need database persistence.',
        context: 'Supabase is listed for the invoice and leave systems and JustoHire deployment stack.',
        selected: 'Supabase',
        reason: 'Supabase is the documented database-backed service for this system.',
      },
      {
        id: 'gst',
        title: 'Why separate GST calculation logic?',
        kind: 'rationale',
        problem: 'Invoices require CGST, SGST, and IGST calculations with validation and preview.',
        context: 'The portfolio explicitly lists CGST/SGST/IGST calculations as part of the invoice system.',
        selected: 'Dedicated GST calculation logic',
        reason:
          'Separating GST math from UI rendering keeps tax rules consistent across preview, export, and status workflows.',
      },
    ],
  },
  {
    projectId: 'emotion-aware-assistant',
    projectName: 'Emotion-Aware Assistant',
    decisions: [
      {
        id: 'whisper',
        title: 'Why Whisper?',
        kind: 'rationale',
        problem: 'Voice emotion analysis needs speech recognition before sentiment/emotion processing.',
        context: 'Whisper ASR is listed in the Emotion-Aware Assistant technical components.',
        selected: 'Whisper',
        reason: 'Whisper provides the documented speech-to-text step for the voice path.',
      },
      {
        id: 'opencv',
        title: 'Why OpenCV?',
        kind: 'rationale',
        problem: 'Facial emotion analysis needs computer-vision processing of face signals.',
        context: 'OpenCV is listed for facial emotion analysis in this project.',
        selected: 'OpenCV',
        reason: 'OpenCV is the documented vision library for the facial path.',
      },
      {
        id: 'mediapipe',
        title: 'Why MediaPipe?',
        kind: 'rationale',
        problem: 'Facial signals need structured landmark/feature handling alongside vision processing.',
        context: 'MediaPipe is listed in the Emotion-Aware Assistant stack.',
        selected: 'MediaPipe',
        reason: 'MediaPipe supports the documented facial analysis pipeline with OpenCV.',
      },
      {
        id: 'tf-pt',
        title: 'Why TensorFlow / PyTorch?',
        kind: 'rationale',
        problem: 'Real-time emotion detection across modalities needs ML inference runtimes.',
        context: 'TensorFlow and PyTorch are both listed in the project technologies.',
        selected: 'TensorFlow and PyTorch',
        reason: 'Both frameworks are documented parts of the multimodal emotion stack.',
      },
      {
        id: 'multimodal',
        title: 'Why multimodal processing?',
        kind: 'rationale',
        problem: 'Emotion signals arrive through voice, text, and facial expressions.',
        context: 'The portfolio states real-time emotion detection across those three channels, with 89% accuracy.',
        selected: 'Multimodal processing',
        reason: 'Combining modalities matches the documented assistant design rather than relying on a single signal.',
      },
    ],
  },
  {
    projectId: 'leave-management',
    projectName: 'Leave Management System',
    decisions: [
      {
        id: 'leave-rest',
        title: 'Why REST APIs?',
        kind: 'rationale',
        problem: 'Leave requests, approvals, and balances need frontend/backend integration.',
        context: 'REST APIs and frontend/backend API integration are listed for this system.',
        selected: 'REST APIs',
        reason: 'REST APIs are the documented contract for leave CRUD and workflow updates.',
      },
      {
        id: 'leave-supabase',
        title: 'Why Supabase?',
        kind: 'rationale',
        problem: 'Leave requests and balances need durable storage.',
        context: 'Supabase and database persistence are listed for the leave system.',
        selected: 'Supabase',
        reason: 'Supabase provides the documented persistence layer.',
      },
      {
        id: 'roles',
        title: 'Why role-based workflows?',
        kind: 'rationale',
        problem: 'Leave approval requires different actions for requesters and approvers.',
        context: 'Role-based workflows and approval workflows are listed as features.',
        selected: 'Role-based workflows',
        reason: 'Role-based flows match the documented request and approval model.',
      },
      {
        id: 'persistence',
        title: 'Why database persistence?',
        kind: 'rationale',
        problem: 'Leave balances and request history must survive beyond a single session.',
        context: 'Database persistence is an explicit feature of the leave system.',
        selected: 'Database persistence',
        reason: 'Persistent storage is required for balances, status tracking, and historical requests.',
      },
    ],
  },
]
