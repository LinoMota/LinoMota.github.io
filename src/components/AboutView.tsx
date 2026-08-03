import { useLanguage } from '../i18n/LanguageContext'
import SpotlightCard from '../reactbits/SpotlightCard'

export default function AboutView() {
  const { t } = useLanguage()

  return (
    <section className="relative mx-auto min-h-screen w-full max-w-2xl px-6 pb-40 pt-14 sm:pt-28">
      <SpotlightCard
        spotlightColor="rgba(46,255,111,0.15)"
        className="pixel-panel border-border bg-surface/90 p-6 backdrop-blur-sm sm:p-8"
      >
        <span className="font-pixel text-xs text-accent">01</span>
        <h2 className="font-display mt-2 text-3xl text-text sm:text-4xl">{t.about.heading}</h2>

        <div className="mt-6 space-y-4">
          {t.about.paragraphs.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-text-dim sm:text-base">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4 border-t-2 border-border pt-6">
          {t.about.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-4xl text-accent sm:text-5xl">{stat.value}</div>
              <div className="mt-1 text-xs text-text">{stat.label}</div>
            </div>
          ))}
        </div>
      </SpotlightCard>
    </section>
  )
}
