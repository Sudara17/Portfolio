# Sudara T S M — Portfolio

Personal portfolio for Sudara T S M, an AI & Data Science graduate. The site is a single-page React application. All biographical content lives in `src/data/` and comes from the resume.

## Local development

Requires Node.js 22 (or Node.js 20.19+).

```bash
npm install
npm run dev
```

The dev server prints a local URL. Production checks:

```bash
npm run lint
npm run build
npm run preview
```

## Resume

Every resume action opens the same Google Drive file in a new tab. The address lives in `RESUME_URL` inside `src/lib/resume.ts`. The site does not host or proxy the PDF.

## Profile links

GitHub and LinkedIn use the public profile URLs for the handles on the resume:

- GitHub: https://github.com/Sudara17
- LinkedIn: https://www.linkedin.com/in/sudara17
- Email: sudharshinisudara@gmail.com

Change `src/data/profile.ts` if a public URL is different. Live project links that were provided are on the matching cards:

- Invoice Management System: https://invoice-management-system-rho.vercel.app/
- Resume Hub: https://resume-hub-theta.vercel.app/

Other projects do not show a demo button because no URL was provided. A project in `src/data/projects.ts` can include an optional `links` array later:

```ts
links: [{ label: 'GitHub', href: 'https://github.com/...' }]
```

Do not add links that do not exist.

## Contact form

There is no mail backend. The form validates in the browser, then opens the visitor’s email app with a draft to sudharshinisudara@gmail.com. The page says this directly. If the email app does not open, the visitor can copy the draft.

## Editing content

| Area | File |
| --- | --- |
| Name, summary, education, contact | `src/data/profile.ts` |
| Experience | `src/data/experience.ts` |
| Projects | `src/data/projects.ts` |
| Skills | `src/data/skills.ts` |
| Achievements | `src/data/achievements.ts` |
| Navigation labels | `src/data/navigation.ts` |

Colors and type are CSS variables in `src/styles/global.css` under `[data-theme='dark']` and `[data-theme='light']`.

## Deploy

### Vercel

Import the repository. Use the Vite preset:

- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`

Ask Sudara AI calls Groq from the serverless function at `POST /api/chat`. The function reads `process.env.GROQ_API_KEY` on the server. The key is not part of the client bundle.

Production already uses the Vercel environment variable. Local `npm run dev` can read the same name from an uncommitted `.env.local`. Never commit the real key.

GitHub Pages only serves the static site, so the chatbot needs the Vercel function. On a static host the assistant shows its unavailable message.

### GitHub Pages

A user or organization site served from `/` can use the default base.

For a project site, set the base path to the repository name, including leading and trailing slashes:

```bash
BASE_PATH=/repository-name/ npm run build
```

Publish the `dist` directory. `public/.nojekyll` is copied into the build so GitHub Pages serves the assets as-is.

## Stack

React, TypeScript, and Vite. Icons use Lucide, plus the GitHub and LinkedIn marks. Theme preference is stored in `localStorage`.
