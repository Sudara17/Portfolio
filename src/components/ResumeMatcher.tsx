import { useMemo, useState } from 'react'
import { projects } from '../data/projects.ts'
import { skillCategories } from '../data/skills.ts'

const hints: { test: RegExp; skills: string[] }[] = [
  { test: /invoice|gstin|\bgst\b/, skills: ['React', 'TypeScript', 'REST APIs', 'Supabase'] },
  { test: /leave management|leave request|leave balance/, skills: ['React', 'TypeScript', 'REST APIs', 'Supabase'] },
  {
    test: /emotion|facial|whisper|opencv|mediapipe/,
    skills: ['Whisper', 'OpenCV', 'MediaPipe', 'TensorFlow', 'PyTorch', 'Flask', 'NLTK/VADER', 'Transformers'],
  },
  {
    test: /resume|ats|faiss|langchain|\brag\b/,
    skills: ['Python', 'LangChain', 'FAISS', 'RAG', 'LLMs', 'Streamlit', 'Groq LLM'],
  },
  {
    test: /flutter|riverpod|gorouter|sivionx|mobile app/,
    skills: ['Flutter', 'Dart', 'Riverpod', 'Dio', 'GoRouter', 'AWS Cognito'],
  },
  { test: /playwright|robot framework|regression test/, skills: ['Playwright', 'Robot Framework'] },
]

const aliases: Record<string, string[]> = {
  LLMs: ['llm', 'llms', 'large language model'],
  'Generative AI': ['generative ai', 'gen ai'],
  'REST APIs': ['rest api', 'rest apis', 'restful'],
  'NLTK/VADER': ['nltk', 'vader'],
  'AWS Cognito': ['cognito'],
  'Groq LLM': ['groq'],
  'Machine Learning': ['machine learning'],
  'Deep Learning': ['deep learning'],
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

function mentioned(text: string, skill: string) {
  const haystack = text.toLowerCase()
  const phrases = [skill.toLowerCase(), ...(aliases[skill] ?? [])]
  return phrases.some((phrase) => haystack.includes(phrase))
}

export function ResumeMatcher() {
  const [description, setDescription] = useState('')
  const result = useMemo(() => {
    const text = description.trim().toLowerCase()
    if (!text) return null
    const matched = skills.filter((skill) => mentioned(text, skill))
    const matchedSet = new Set(matched)
    const relevant = new Set<string>()
    for (const hint of hints) {
      if (!hint.test.test(text)) continue
      for (const skill of hint.skills) {
        if (!matchedSet.has(skill) && skills.includes(skill)) relevant.add(skill)
      }
    }
    const coverage = Math.round((matched.length / skills.length) * 100)
    return { matched, relevant: [...relevant], coverage }
  }, [description])

  return (
    <div className="matcher">
      <p className="demo-label">Interactive frontend demo</p>
      <p className="demo-note">
        This compares the text you paste with skills already listed in the portfolio. It does not call a language model.
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
              <p>No exact portfolio skills were found in this text.</p>
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
              {result.coverage}% · {result.matched.length} of {skills.length} portfolio skills appear in this description
            </span>
          </p>
        </div>
      ) : null}
    </div>
  )
}
