import { About } from './components/About.tsx'
import { AskSudara } from './components/AskSudara.tsx'
import { Achievements } from './components/Achievements.tsx'
import { BackToTop } from './components/BackToTop.tsx'
import { Contact } from './components/Contact.tsx'
import { Experience } from './components/Experience.tsx'
import { Footer } from './components/Footer.tsx'
import { Hero } from './components/Hero.tsx'
import { Navbar } from './components/Navbar.tsx'
import { Projects } from './components/Projects.tsx'
import { ScrollProgress } from './components/ScrollProgress.tsx'
import { Skills } from './components/Skills.tsx'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <AskSudara />
    </>
  )
}
