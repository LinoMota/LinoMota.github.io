import { useState, type CSSProperties } from 'react'
import type { Locale } from '../data/types'
import { useLanguage } from '../i18n/LanguageContext'
import DecryptedText from '../reactbits/DecryptedText'

interface LanguageSplashProps {
  onDone: () => void
}

export default function LanguageSplash({ onDone }: LanguageSplashProps) {
  const { setLocale } = useLanguage()
  const [fading, setFading] = useState(false)

  const choose = (locale: Locale) => {
    setLocale(locale)
    setFading(true)
    setTimeout(onDone, 550)
  }

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg/95 px-6 backdrop-blur-sm transition-opacity duration-500 ${
        fading ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <span className="font-pixel text-[10px] tracking-widest text-accent">{'>_ INIT'}</span>

      <DecryptedText
        text="Choose your language"
        animateOn="view"
        sequential
        revealDirection="start"
        speed={35}
        className="text-text"
        encryptedClassName="text-text-dim/40"
        parentClassName="font-display mt-3 text-3xl sm:text-4xl"
      />

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => choose('pt')}
          className="pixel-btn border-border bg-bg-soft px-6 py-3 text-sm font-semibold text-text hover:text-accent"
          style={{ '--pixel-shadow': 'rgba(46,255,111,0.5)' } as CSSProperties}
        >
          🇧🇷 Português
        </button>
        <button
          onClick={() => choose('en')}
          className="pixel-btn border-border bg-bg-soft px-6 py-3 text-sm font-semibold text-text hover:text-accent"
          style={{ '--pixel-shadow': 'rgba(255,176,0,0.5)' } as CSSProperties}
        >
          🇺🇸 English
        </button>
      </div>
    </div>
  )
}
