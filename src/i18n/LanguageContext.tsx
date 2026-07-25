import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { content } from '../data/content'
import type { Locale } from '../data/types'

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
  t: (typeof content)['pt']
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function detectInitialLocale(): Locale {
  const stored = window.localStorage.getItem('locale')
  if (stored === 'pt' || stored === 'en') return stored
  return navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(detectInitialLocale)

  useEffect(() => {
    window.localStorage.setItem('locale', locale)
    document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en'
    document.title = content[locale].meta.title
  }, [locale])

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
      toggleLocale: () => setLocale((prev) => (prev === 'pt' ? 'en' : 'pt')),
      t: content[locale],
    }),
    [locale],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
