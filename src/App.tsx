import { lazy, Suspense, useState } from 'react'
import AboutModal from './components/AboutModal'
import DockNav, { type View } from './components/DockNav'
import SiteBackground from './components/SiteBackground'
import TerminalBoot from './components/TerminalBoot'
import LanguageSplash from './components/LanguageSplash'
import { useLanguage } from './i18n/LanguageContext'

const HomeView = lazy(() => import('./components/HomeView'))
const ExperienceStack = lazy(() => import('./components/ExperienceStack'))
const SkillsView = lazy(() => import('./components/SkillsView'))
const ContactView = lazy(() => import('./components/ContactView'))

type IntroStage = 'boot' | 'language' | 'done'

export default function App() {
  const { hasStoredChoice } = useLanguage()
  const [view, setView] = useState<View>('home')
  const [aboutOpen, setAboutOpen] = useState(false)
  const [introStage, setIntroStage] = useState<IntroStage>('boot')
  const introDone = introStage === 'done'

  return (
    <div className="relative min-h-screen bg-bg">
      {introDone && (
        <>
          <SiteBackground />
          <Suspense fallback={null}>
            {view === 'home' && <HomeView />}
            {view === 'experience' && <ExperienceStack />}
            {view === 'skills' && <SkillsView />}
            {view === 'contact' && <ContactView />}
          </Suspense>

          <DockNav view={view} onNavigate={setView} onOpenAbout={() => setAboutOpen(true)} />
          <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
        </>
      )}

      {introStage === 'boot' && (
        <TerminalBoot onDone={() => setIntroStage(hasStoredChoice ? 'done' : 'language')} />
      )}
      {introStage === 'language' && <LanguageSplash onDone={() => setIntroStage('done')} />}
    </div>
  )
}
