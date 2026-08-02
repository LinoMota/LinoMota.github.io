import { Brain } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export default function SkillsView() {
  const { t } = useLanguage()

  return (
    <section className="relative mx-auto min-h-screen w-full max-w-5xl px-6 pb-40 pt-28">
      <div className="text-center">
        <span className="pixel-panel inline-flex items-center justify-center border-border bg-surface p-3 text-amber">
          <Brain size={28} />
        </span>
        <h2 className="font-display mt-4 text-3xl text-text sm:text-4xl">Skills / {t.education.heading}</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-text-dim">{t.skills.sub}</p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {t.skills.groups.map((group) => (
          <div key={group.label} className="pixel-panel border-border bg-surface/90 p-6 backdrop-blur-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-amber">{group.label}</h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span key={item} className="pixel-tag border border-border px-2.5 py-1 font-mono text-xs text-text-dim">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pixel-panel mt-8 border-border bg-surface/90 p-6 backdrop-blur-sm">
        <h3 className="font-display text-2xl text-text">{t.education.heading}</h3>
        <div className="mt-4 space-y-4">
          {t.education.items.map((edu) => (
            <div key={edu.school}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="font-semibold text-text">{edu.school}</h4>
                <span className="font-mono text-xs text-text-dim">
                  {edu.start} - {edu.end}
                </span>
              </div>
              <p className="mt-1 text-sm text-amber">{edu.degree}</p>
              <p className="mt-1 text-sm text-text-dim">{edu.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 border-t border-border pt-4">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-amber">{t.education.languagesHeading}</h4>
          <div className="mt-2 flex flex-wrap gap-4">
            {t.education.languages.map((lang) => (
              <span key={lang.name} className="text-sm text-text-dim">
                <span className="text-text">{lang.name}</span> · {lang.level}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
