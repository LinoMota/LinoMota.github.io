import { BookOpen, Brain, Briefcase, Home, Mail } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import Dock, { type DockItemData } from '../reactbits/Dock'

export type View = 'home' | 'experience' | 'skills' | 'contact'

interface DockNavProps {
  view: View
  onNavigate: (view: View) => void
  onOpenAbout: () => void
}

export default function DockNav({ view, onNavigate, onOpenAbout }: DockNavProps) {
  const { t, locale, toggleLocale } = useLanguage()

  const items: DockItemData[] = [
    {
      icon: <Home size={20} className={view === 'home' ? 'text-accent' : 'text-text'} />,
      label: t.nav.home,
      onClick: () => onNavigate('home'),
      active: view === 'home',
    },
    {
      icon: <BookOpen size={20} className="text-text" />,
      label: t.nav.about,
      onClick: onOpenAbout,
    },
    {
      icon: <Briefcase size={20} className={view === 'experience' ? 'text-accent' : 'text-text'} />,
      label: t.nav.experience,
      onClick: () => onNavigate('experience'),
      active: view === 'experience',
    },
    {
      icon: <Brain size={20} className={view === 'skills' ? 'text-accent' : 'text-text'} />,
      label: t.nav.skills,
      onClick: () => onNavigate('skills'),
      active: view === 'skills',
    },
    {
      icon: <Mail size={20} className={view === 'contact' ? 'text-accent' : 'text-text'} />,
      label: t.nav.contact,
      onClick: () => onNavigate('contact'),
      active: view === 'contact',
    },
  ]

  return (
    <>
      <button
        onClick={toggleLocale}
        className="pixel-tag fixed right-4 top-4 z-40 border border-border bg-bg-soft/80 px-3 py-1 font-mono text-xs text-text-dim backdrop-blur-md transition-colors hover:border-accent hover:text-accent"
      >
        {locale === 'pt' ? 'PT' : 'EN'}
      </button>

      <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center pb-2">
        <Dock items={items} />
      </div>
    </>
  )
}
