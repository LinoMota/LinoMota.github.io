import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

const sections = ['about', 'experience', 'skills', 'education', 'contact'] as const

export default function Navbar() {
  const { t, locale, toggleLocale } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-bg/80 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-mono text-sm font-semibold tracking-widest text-text">
          <span className="text-accent">&gt;</span> LINO_MOTA
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {sections.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              className="text-sm text-text-dim transition-colors hover:text-accent"
            >
              {t.nav[key]}
            </a>
          ))}
          <button
            onClick={toggleLocale}
            className="pixel-tag border border-border px-3 py-1 font-mono text-xs text-text-dim transition-colors hover:border-accent hover:text-accent"
          >
            {locale === 'pt' ? '🇧🇷 PT' : '🇺🇸 EN'}
          </button>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleLocale}
            className="pixel-tag border border-border px-2.5 py-1 font-mono text-xs text-text-dim"
          >
            {locale === 'pt' ? 'PT' : 'EN'}
          </button>
          <button
            aria-label="menu"
            onClick={() => setOpen((v) => !v)}
            className="pixel-corners flex h-9 w-9 flex-col items-center justify-center gap-1.5 border border-border"
          >
            <span className={`h-px w-4 bg-text transition-transform ${open ? 'translate-y-[3px] rotate-45' : ''}`} />
            <span className={`h-px w-4 bg-text transition-transform ${open ? '-translate-y-[3px] -rotate-45' : ''}`} />
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-bg/95 px-6 py-4 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-4">
            {sections.map((key) => (
              <a
                key={key}
                href={`#${key}`}
                onClick={() => setOpen(false)}
                className="text-sm text-text-dim transition-colors hover:text-accent"
              >
                {t.nav[key]}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
