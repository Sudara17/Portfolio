export type Lesson = {
  id: string
  title: string
  problem: string
  happened: string
  learned: string
}

/**
 * The resume and portfolio do not publish a private incident log.
 * These cards are technical notes derived only from documented systems.
 */
export const lessons: Lesson[] = [
  {
    id: 'multimodal-stack',
    title: 'Multimodal ML stack complexity',
    problem:
      'The Emotion-Aware Assistant combines voice, text, and facial pipelines in one system.',
    happened:
      'The documented stack includes Whisper, OpenCV, MediaPipe, TensorFlow, PyTorch, NLTK/VADER, and Flask together.',
    learned:
      'Multimodal systems need clear stage boundaries so speech, vision, and text paths can be tested and reasoned about independently.',
  },
  {
    id: 'api-testing',
    title: 'API and UI test reliability',
    problem:
      'SivionX work includes REST API testing plus Playwright and Robot Framework coverage for functional and regression checks.',
    happened:
      'Automated tests and API checks sit beside Flutter and authentication workflows in the same delivery loop.',
    learned:
      'Stable locators, explicit API assertions, and shared fixtures matter as much as feature code when mobile and API surfaces move together.',
  },
  {
    id: 'retrieval-validation',
    title: 'Retrieval quality in RAG workflows',
    problem:
      'AI Resume Assistant and Connected Value work rely on embeddings, FAISS/RAG retrieval, and validation on real resume samples.',
    happened:
      'The portfolio reports FAISS retrieval improvements and validation on 10+ resume samples, plus semantic resume parsing modules.',
    learned:
      'Retrieval quality has to be measured on real samples. Vector search alone is not enough without validation around chunking and returned context.',
  },
  {
    id: 'gst-rules',
    title: 'Business-rule correctness in invoicing',
    problem:
      'Invoice Management requires CGST, SGST, and IGST calculations with preview, export, and historical snapshots.',
    happened:
      'Tax logic, validation, and branding rules are part of the documented invoice workflow rather than presentation-only concerns.',
    learned:
      'Domain calculations should stay explicit and testable so preview, persistence, and export cannot drift apart.',
  },
]

export type BugChallenge = {
  id: string
  title: string
  prompt: string
  code?: string
  options: { id: string; label: string }[]
  answer: string
  why: string
  fix?: string
}

export const bugChallenges: BugChallenge[] = [
  {
    id: 'gst-percent',
    title: 'BUG #01 · GST calculation',
    prompt: 'What is wrong with this GST helper?',
    code: `def calculate_total(price, gst):
    return price + gst`,
    options: [
      { id: 'a', label: 'GST is treated as an amount, not a percentage' },
      { id: 'b', label: 'Syntax error' },
      { id: 'c', label: 'Variable naming only' },
      { id: 'd', label: 'Nothing' },
    ],
    answer: 'a',
    why: 'GST is being added as if it were already a currency amount. For percentage-based tax, GST should be derived from price first.',
    fix: `def calculate_total(price, gst_percent):
    gst = price * (gst_percent / 100)
    return price + gst`,
  },
  {
    id: 'rest-status',
    title: 'BUG #02 · REST API handling',
    prompt: 'A client always shows success after createInvoice(). What should you check first?',
    code: `async function createInvoice(payload) {
  const res = await fetch('/api/invoices', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  return { ok: true, data: await res.json() }
}`,
    options: [
      { id: 'a', label: 'Whether res.ok / status was checked' },
      { id: 'b', label: 'CSS class names' },
      { id: 'c', label: 'Font loading' },
      { id: 'd', label: 'Nothing' },
    ],
    answer: 'a',
    why: 'The helper returns ok: true without inspecting the HTTP status, so 4xx/5xx responses can look successful.',
    fix: `async function createInvoice(payload) {
  const res = await fetch('/api/invoices', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await res.json().catch(() => null)
  return { ok: res.ok, status: res.status, data }
}`,
  },
  {
    id: 'rag-top1',
    title: 'BUG #03 · RAG retrieval',
    prompt: 'A RAG demo always answers from the first chunk only. What is the likely issue?',
    code: `docs = retriever.similarity_search(query, k=1)
return llm.invoke(docs[0].page_content)`,
    options: [
      { id: 'a', label: 'k=1 may be too narrow for relevant context' },
      { id: 'b', label: 'Python cannot index lists' },
      { id: 'c', label: 'LLM temperature is missing' },
      { id: 'd', label: 'Nothing' },
    ],
    answer: 'a',
    why: 'Retrieving only one chunk can miss supporting context. Portfolio RAG work emphasizes validation of retrieval quality, not a single untested hit.',
    fix: `docs = retriever.similarity_search(query, k=4)
context = "\\n\\n".join(doc.page_content for doc in docs)
return llm.invoke(context)`,
  },
  {
    id: 'sql-balance',
    title: 'BUG #04 · Leave balance query',
    prompt: 'This query is used to show remaining leave. What is risky?',
    code: "SELECT balance FROM leave_balances WHERE employee = '" + name + "'",
    options: [
      { id: 'a', label: 'String concatenation invites injection and brittle filtering' },
      { id: 'b', label: 'SQL cannot select one column' },
      { id: 'c', label: 'Table names must be uppercase' },
      { id: 'd', label: 'Nothing' },
    ],
    answer: 'a',
    why: 'Interpolating untrusted input into SQL is unsafe. Parameterized queries keep leave-balance reads reliable and safer.',
    fix: `SELECT balance
FROM leave_balances
WHERE employee_id = $1`,
  },
  {
    id: 'playwright-locator',
    title: 'BUG #05 · Playwright selector',
    prompt: 'Which locator is more resilient for an Approve button?',
    code: `// A
page.locator('div > div:nth-child(3) > button')
// B
page.getByRole('button', { name: 'Approve' })`,
    options: [
      { id: 'a', label: 'A — deep CSS paths are more stable' },
      { id: 'b', label: 'B — role and accessible name survive layout changes better' },
      { id: 'c', label: 'Neither can click buttons' },
      { id: 'd', label: 'Nothing matters' },
    ],
    answer: 'b',
    why: 'Role-based locators track user-facing meaning. Fragile CSS trees break when layout shifts, which matters for regression suites like those listed in the SivionX testing work.',
  },
]

export type Challenge = {
  id: string
  title: string
  scenario: string
  options: { id: string; label: string }[]
  answer: string
  approach: string
}

export const challenges: Challenge[] = [
  {
    id: 'rag-irrelevant',
    title: 'CHALLENGE #01',
    scenario: 'Your RAG system is retrieving irrelevant documents. What would you investigate?',
    options: [
      { id: 'chunking', label: 'Chunking' },
      { id: 'retrieval', label: 'Retrieval' },
      { id: 'prompt', label: 'Prompt' },
      { id: 'all', label: 'All of the above' },
    ],
    answer: 'all',
    approach:
      'I would inspect chunk boundaries, embedding/retrieval ranking (including FAISS k and filters), and whether the prompt actually uses the retrieved context. Portfolio RAG work pairs retrieval with validation on real samples.',
  },
  {
    id: 'faiss-slow',
    title: 'CHALLENGE #02',
    scenario: 'Vector search feels slow on a small resume corpus. What is a practical first check?',
    options: [
      { id: 'index', label: 'Index build/query settings and repeated re-indexing' },
      { id: 'css', label: 'Button border radius' },
      { id: 'dns', label: 'DNS TTL only' },
      { id: 'ignore', label: 'Ignore it' },
    ],
    answer: 'index',
    approach:
      'For a local FAISS workflow like the AI Resume Assistant, I would verify whether the index is rebuilt unnecessarily, whether the query path is doing extra work, and measure retrieval time the same way the portfolio reports retrieval improvements.',
  },
  {
    id: 'api-500',
    title: 'CHALLENGE #03',
    scenario: 'A React form posts to a REST API and the UI shows a generic failure. Where do you start?',
    options: [
      { id: 'trace', label: 'Trace status code, payload, and response body' },
      { id: 'fonts', label: 'Change the font stack' },
      { id: 'rewrite', label: 'Rewrite the whole app' },
      { id: 'ignore', label: 'Retry blindly' },
    ],
    answer: 'trace',
    approach:
      'I would inspect the request payload, auth headers, status code, and response body, then confirm validation on both client and server. That matches the API integration and testing emphasis in the JustoHire and SivionX work.',
  },
  {
    id: 'flutter-state',
    title: 'CHALLENGE #04',
    scenario: 'A Flutter screen shows stale data after an API refresh. What is a likely focus area?',
    options: [
      { id: 'state', label: 'State management and provider invalidation (e.g. Riverpod)' },
      { id: 'color', label: 'Accent color tokens' },
      { id: 'pdf', label: 'PDF export only' },
      { id: 'none', label: 'Nothing' },
    ],
    answer: 'state',
    approach:
      'With Riverpod listed in the SivionX Flutter stack, I would check whether providers are invalidated after the Dio response and whether the widget is reading the refreshed state.',
  },
  {
    id: 'auth',
    title: 'CHALLENGE #05',
    scenario: 'Mobile users intermittently lose session after navigation. What would you inspect?',
    options: [
      { id: 'cognito', label: 'Auth session handling (e.g. AWS Cognito) and route guards' },
      { id: 'lorem', label: 'Lorem ipsum copy' },
      { id: 'svg', label: 'SVG stroke width' },
      { id: 'none', label: 'Nothing' },
    ],
    answer: 'cognito',
    approach:
      'Given AWS Cognito and GoRouter in the SivionX stack, I would verify token refresh, secure storage, and whether route guards re-check the session after navigation.',
  },
  {
    id: 'playwright-flake',
    title: 'CHALLENGE #06',
    scenario: 'A Playwright regression is flaky on a dynamic approve button. What helps?',
    options: [
      { id: 'role', label: 'Prefer role/name locators and wait for UI state' },
      { id: 'sleep', label: 'Add fixed sleeps everywhere' },
      { id: 'delete', label: 'Delete the test' },
      { id: 'none', label: 'Nothing' },
    ],
    answer: 'role',
    approach:
      'I would switch brittle CSS paths to role-based locators and wait for the ready state. That aligns with Playwright functional/regression testing listed for SivionX.',
  },
  {
    id: 'persist',
    title: 'CHALLENGE #07',
    scenario: 'Leave balances reset after deploy. What should you verify?',
    options: [
      { id: 'db', label: 'Database persistence and environment configuration' },
      { id: 'emoji', label: 'Emoji rendering' },
      { id: 'shadow', label: 'Box-shadow tokens' },
      { id: 'none', label: 'Nothing' },
    ],
    answer: 'db',
    approach:
      'For a Supabase-backed leave system, I would confirm the production database URL, migrations, and that balances are read/written from persistent storage rather than in-memory state.',
  },
]
