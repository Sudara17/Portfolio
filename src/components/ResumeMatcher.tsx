import { useMemo, useState } from 'react'
import { projects } from '../data/projects.ts'
import { skillCategories } from '../data/skills.ts'

type PhraseMap = {
  test: RegExp
  matched: string[]
  relevant?: string[]
}

/** Conservative role/synonym maps. Only portfolio skills are used. Years of experience are ignored. */
const phraseMaps: PhraseMap[] = [
  {
    test: /\bai[\s/-]*developer\b|\bai[\s/-]*engineer\b|\bmachine learning engineer\b|\bml engineer\b|\bai\/ml\b|\baiml\b/,
    matched: ['Machine Learning', 'Generative AI', 'Python'],
    relevant: ['LLMs', 'RAG', 'LangChain', 'FAISS'],
  },
  {
    test: /\bgen(?:erative)?\s*ai\b|\bgenai\b/,
    matched: ['Generative AI', 'LLMs'],
    relevant: ['RAG', 'LangChain', 'FAISS', 'Python'],
  },
  {
    test: /\bfrontend developer\b|\bfront[\s-]*end\b|\bui developer\b|\breact developer\b/,
    matched: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    test: /\bbackend developer\b|\bback[\s-]*end\b|\bapi developer\b/,
    matched: ['Python', 'REST APIs', 'Flask', 'ASP.NET Core'],
    relevant: ['Supabase', 'TypeScript'],
  },
  {
    test: /\bfull[\s-]*stack\b/,
    matched: ['React', 'TypeScript', 'Python', 'REST APIs'],
    relevant: ['Supabase', 'Flask', 'JavaScript'],
  },
  {
    test: /\bmobile developer\b|\bflutter developer\b/,
    matched: ['Flutter', 'Dart', 'Riverpod', 'Dio', 'GoRouter'],
    relevant: ['AWS Cognito', 'REST APIs'],
  },
  {
    test: /\bllms?\b|\blarge language models?\b|\blangchain\b|\bfaiss\b|\brag\b|\bprompt engineering\b/,
    matched: ['LLMs', 'RAG', 'LangChain', 'FAISS'],
    relevant: ['Generative AI', 'Python'],
  },
  {
    test: /\bsoftware testing\b|\bqa engineer\b|\btest automation\b|\bautomation testing\b/,
    matched: ['Playwright', 'Robot Framework', 'Postman'],
  },
  {
    test: /\binvoice|gstin|\bgst\b/,
    matched: ['React', 'TypeScript', 'REST APIs', 'Supabase'],
  },
  {
    test: /\bleave management|leave request|leave balance/,
    matched: ['React', 'TypeScript', 'REST APIs', 'Supabase'],
  },
  {
    test: /\bemotion|facial|whisper|opencv|mediapipe/,
    matched: ['Whisper', 'OpenCV', 'MediaPipe', 'TensorFlow', 'PyTorch', 'Flask'],
    relevant: ['NLTK/VADER', 'Transformers'],
  },
  {
    test: /\bresume|ats scoring|cover letter|mock interview/,
    matched: ['Python', 'LangChain', 'FAISS', 'RAG', 'LLMs', 'Streamlit'],
    relevant: ['Groq LLM'],
  },
]

const aliases: Record<string, string[]> = {
  LLMs: ['llm', 'llms', 'large language model', 'large language models'],
  'Generative AI': ['generative ai', 'gen ai', 'genai'],
  'Machine Learning': ['machine learning'],
  'Deep Learning': ['deep learning'],
  'REST APIs': ['rest api', 'rest apis', 'restful'],
  'NLTK/VADER': ['nltk', 'vader'],
  'AWS Cognito': ['cognito', 'aws cognito'],
  'Groq LLM': ['groq'],
  React: ['react.js', 'reactjs'],
  TypeScript: ['typescript'],
  JavaScript: ['javascript'],
  Python: ['python'],
  Flutter: ['flutter'],
  Dart: ['dart'],
  LangChain: ['langchain'],
  FAISS: ['faiss'],
  RAG: ['retrieval augmented', 'retrieval-augmented'],
  Playwright: ['playwright'],
  'Robot Framework': ['robot framework'],
  Supabase: ['supabase'],
  Whisper: ['whisper'],
}

function catalog() {
  const names = new Set<string>()
  for (const category of skillCategories) {
    for (const skill of category.skills) names.add(skill.name)
  }
  for (const project of projects) {
    for (const technology of project.technologies) names.add(technology)
  }
  return [...names]
}

const skills = catalog()

function known(skill: string) {
  return skills.includes(skill)
}

function mentioned(text: string, skill: string) {
  const haystack = text.toLowerCase()
  const phrases = [skill.toLowerCase(), ...(aliases[skill] ?? [])]
  return phrases.some((phrase) => haystack.includes(phrase.toLowerCase()))
}

export function ResumeMatcher() {
  const [description, setDescription] = useState('')
  const result = useMemo(() => {
    const text = description.trim().toLowerCase()
    if (!text) return null

    const matched = new Set(skills.filter((skill) => mentioned(text, skill)))
    const relevant = new Set<string>()

    for (const map of phraseMaps) {
      if (!map.test.test(text)) continue
      for (const skill of map.matched) {
        if (known(skill)) matched.add(skill)
      }
      for (const skill of map.relevant ?? []) {
        if (known(skill) && !matched.has(skill)) relevant.add(skill)
      }
    }

    const matchedList = [...matched]
    const coverage = Math.round((matchedList.length / skills.length) * 100)
    return { matched: matchedList, relevant: [...relevant], coverage }
  }, [description])

  return (
    <div className="matcher">
      <p className="demo-label">Interactive frontend demo — no LLM is used.</p>
      <p className="demo-note">
        This compares the text you paste with skills already listed in the portfolio. Role phrases such as “AI developer”
        map to related portfolio skills. Years of experience are ignored.
      </p>
      <label>
        Job description
        <textarea
          rows={5}
          maxLength={4000}
          value={description}
          placeholder="Paste a job description"
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>
      {result ? (
        <div className="matcher-results" aria-live="polite">
          <section>
            <h4>Matched Skills</h4>
            {result.matched.length > 0 ? (
              <ul className="badges">
                {result.matched.map((skill) => (
                  <li key={skill} className="badge">
                    {skill}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No portfolio skills were matched in this text.</p>
            )}
          </section>
          <section>
            <h4>Potentially Relevant Skills</h4>
            {result.relevant.length > 0 ? (
              <ul className="badges">
                {result.relevant.map((skill) => (
                  <li key={skill} className="badge">
                    {skill}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No additional related skills for this text.</p>
            )}
          </section>
          <p className="coverage">
            <strong>Match Coverage</strong>
            <span>
              {result.coverage}% · {result.matched.length} of {skills.length} portfolio skills
            </span>
          </p>
        </div>
      ) : null}
    </div>
  )
}
