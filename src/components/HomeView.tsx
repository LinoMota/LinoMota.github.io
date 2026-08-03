import type { Locale } from '../data/types'
import { useLanguage } from '../i18n/LanguageContext'
import { useMediaQuery } from '../hooks/useMediaQuery'
import TextType from '../reactbits/TextType'
import ASCIIText from '../reactbits/ASCIIText'

export default function HomeView() {
  const { t, locale, setLocale } = useLanguage()
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const nameWords = t.hero.name.split(' ')

  return (
    <section id="home" className="relative flex h-screen flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-10">
      <div className="relative z-10 flex w-full flex-col items-center text-center">
        <div className="flex w-full max-w-3xl flex-col items-center">
          <p className="font-pixel text-[10px] tracking-widest text-accent sm:text-xs">{t.hero.kicker.toUpperCase()}</p>

          <TextType
            key={t.hero.welcome.join('|')}
            as="h1"
            text={t.hero.welcome}
            loop={false}
            typingSpeed={45}
            deletingSpeed={20}
            pauseDuration={1400}
            className="font-display mt-2 min-h-[2.2em] text-3xl leading-snug text-text sm:text-4xl md:text-5xl"
            cursorClassName="text-accent"
          />
        </div>

        {isDesktop ? (
          <div className="relative mt-2 h-[260px] w-full sm:h-[280px] lg:h-[320px] xl:h-[340px]">
            <ASCIIText
              text={t.hero.name}
              asciiFontSize={10}
              textFontSize={140}
              planeBaseHeight={7.5}
              enableWaves={false}
              textColor="#2eff6f"
            />
          </div>
        ) : (
          <div className="mt-4 flex w-full max-w-3xl flex-col">
            {nameWords.map((word) => (
              <div key={word} className="relative h-[130px] w-full sm:h-[160px]">
                <ASCIIText
                  text={word}
                  asciiFontSize={8}
                  textFontSize={140}
                  planeBaseHeight={16}
                  enableWaves={false}
                  textColor="#2eff6f"
                />
              </div>
            ))}
          </div>
        )}

        <div className="flex w-full max-w-3xl flex-col items-center">
          <p className="mt-1 max-w-xl text-sm text-text-dim sm:text-base">{t.hero.tagline}</p>
          <p className="mt-2 font-mono text-xs text-text-dim sm:text-sm">📍 {t.hero.location}</p>

          <div className="mt-3 flex items-center gap-2">
            <span className="font-mono text-[11px] text-text-dim">{t.hero.speaks}:</span>
            {t.education.languages.map((lang) => {
              const langLocale = lang.code as Locale
              const active = locale === langLocale
              return (
                <button
                  key={lang.code}
                  onClick={() => setLocale(langLocale)}
                  className={`pixel-tag border px-2.5 py-1 font-mono text-[11px] transition-colors ${
                    active ? 'border-accent text-accent' : 'border-border text-text-dim hover:text-accent'
                  }`}
                >
                  {lang.name}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
