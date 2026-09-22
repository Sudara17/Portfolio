import { SiteProvider } from './context/SiteInteractions.tsx'
import { About } from './components/About.tsx'
import { AskSudara } from './components/AskSudara.tsx'
import { Achievements } from './components/Achievements.tsx'
import { BackToTop } from './components/BackToTop.tsx'
import { Contact } from './components/Contact.tsx'
import { EngineeringDecisions } from './components/EngineeringDecisions.tsx'
import { EngineeringJourney } from './components/EngineeringJourney.tsx'
import { Experience } from './components/Experience.tsx'
import { FailuresLessons } from './components/FailuresLessons.tsx'
import { Footer } from './components/Footer.tsx'
import { Hero } from './components/Hero.tsx'
import { Lab } from './components/Lab.tsx'
import { Navbar } from './components/Navbar.tsx'
import { Projects } from './components/Projects.tsx'
import { ScrollProgress } from './components/ScrollProgress.tsx'
import { Skills } from './components/Skills.tsx'
import { SudaraOsDashboard } from './components/SudaraOsDashboard.tsx'

export default function App() {
  return (
    <SiteProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <SudaraOsDashboard />
        <About />
        <Experience />
        <Projects />
        <EngineeringDecisions />
        <Skills />
        <Achievements />
        <EngineeringJourney />
        <FailuresLessons />
        <Lab />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <AskSudara />
    </SiteProvider>
  )
}
