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
  const { t } = useLanguage()

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
      <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center pb-2">
        <Dock items={items} />
      </div>
    </>
  )
}
