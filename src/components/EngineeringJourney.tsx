import { useState } from 'react'
import { cx } from '../lib/cx.ts'

type Node = {
  id: string
  label: string
  detail: string
  href?: string
}

const layers: { id: string; title: string; nodes: Node[] }[] = [
  {
    id: 'education',
    title: 'Education',
    nodes: [
      {
        id: 'ai-ds',
        label: 'AI & Data Science',
        detail: 'B.Tech in Artificial Intelligence and Data Science, 2022–2026.',
        href: '#about',
      },
    ],
  },
  {
    id: 'domains',
    title: 'Domains',
    nodes: [
      { id: 'nlp', label: 'NLP', detail: 'ATS scoring, text emotion, and resume parsing contexts.', href: '#skills' },
      { id: 'ml', label: 'ML', detail: 'TensorFlow, PyTorch, and multimodal emotion detection.', href: '#skills' },
      { id: 'web', label: 'Web', detail: 'React, TypeScript, REST APIs, and Supabase systems.', href: '#skills' },
    ],
  },
  {
    id: 'systems',
    title: 'Systems',
    nodes: [
      { id: 'rag', label: 'RAG', detail: 'JustoHire, Connected Value, and AI Resume Assistant retrieval flows.', href: '#projects' },
      { id: 'tf', label: 'TensorFlow', detail: 'Emotion-Aware Assistant stack.', href: '#projects' },
      { id: 'react', label: 'React', detail: 'Invoice and Leave Management Systems.', href: '#projects' },
    ],
  },
  {
    id: 'outputs',
    title: 'Projects & research',
    nodes: [
      { id: 'resume', label: 'Resume', detail: 'AI Resume Assistant / Resume Hub.', href: '#projects' },
      { id: 'emotion', label: 'Emotion', detail: 'Emotion-Aware Assistant.', href: '#projects' },
      { id: 'email', label: 'Email research', detail: 'AI-Powered Email Summarization publication.', href: '#achievements' },
      { id: 'supabase', label: 'Supabase', detail: 'Persistence for invoice and leave systems.', href: '#projects' },
    ],
  },
]

export function EngineeringJourney() {
  const [activeId, setActiveId] = useState('ai-ds')
  const active =
    layers.flatMap((layer) => layer.nodes).find((node) => node.id === activeId) ?? layers[0]?.nodes[0]

  function go(node: Node) {
    setActiveId(node.id)
    if (!node.href) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.querySelector(node.href)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <section id="journey" className="section section-band reveal is-in" aria-labelledby="journey-title">
      <div className="container">
        <header className="section-head">
          <span className="index" aria-hidden="true">
            07
          </span>
          <div>
            <p className="module-label">DATA FLOW</p>
            <h2 id="journey-title">My Engineering Journey</h2>
            <p className="section-intro">
              A relationship graph of education, domains, systems, projects, and research from the portfolio data.
            </p>
          </div>
        </header>
        <div className="journey">
          <div className="journey-layers">
            {layers.map((layer, layerIndex) => (
              <div key={layer.id} className="journey-layer">
                {layerIndex > 0 ? (
                  <p className="journey-arrow" aria-hidden="true">
                    ↓
                  </p>
                ) : null}
                <p className="os-label">{layer.title}</p>
                <div className="journey-nodes">
                  {layer.nodes.map((node) => (
                    <button
                      key={node.id}
                      type="button"
                      className={cx('journey-node', activeId === node.id && 'is-active')}
                      onMouseEnter={() => setActiveId(node.id)}
                      onFocus={() => setActiveId(node.id)}
                      onClick={() => go(node)}
                    >
                      {node.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {active ? (
            <p className="journey-detail" role="status">
              <strong>{active.label}</strong>
              {active.detail}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}
