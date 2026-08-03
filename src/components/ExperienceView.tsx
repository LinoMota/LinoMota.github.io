import { useLanguage } from '../i18n/LanguageContext'
import { companyLogos } from '../data/logos'
import { clouds, companyClouds } from '../data/clouds'
import SpotlightCard from '../reactbits/SpotlightCard'
import ExperienceLogo from './ExperienceLogo'
import CloudShape from './CloudShape'

export default function ExperienceView() {
  const { t } = useLanguage()

  return (
    <section className="relative mx-auto min-h-screen w-full max-w-4xl px-6 pb-40 pt-14 sm:pt-28">
      <div className="text-center">
        <span className="font-pixel text-xs text-accent">02</span>
        <h2 className="font-display mt-2 text-3xl text-text sm:text-4xl">{t.experience.heading}</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-text-dim">{t.experience.sub}</p>
      </div>

      <div className="mt-12 space-y-6">
        {t.experience.items.map((job) => (
          <SpotlightCard
            key={`${job.company}-${job.start}`}
            spotlightColor="rgba(46,255,111,0.15)"
            className="pixel-panel border-border bg-surface/90 p-6 backdrop-blur-sm"
          >
            <div className="flex items-start gap-5">
              {companyLogos[job.company] && <ExperienceLogo src={companyLogos[job.company]} alt={job.company} />}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-2xl text-text">{job.company}</h3>
                  <span className="font-mono text-xs text-text-dim">
                    {job.start} -{' '}
                    {job.end === 'Presente' || job.end === 'Present' ? (
                      <span className="text-accent">{job.end}</span>
                    ) : (
                      job.end
                    )}
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-text-dim">
                  <span className="text-amber">{job.role}</span>
                  <span className="opacity-40">·</span>
                  <span>{job.location}</span>
                  {job.tag && (
                    <span className="pixel-tag border border-accent/60 bg-accent/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-accent">
                      {job.tag}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <ul className="mt-4 space-y-1.5">
              {job.bullets.map((bullet, bi) => (
                <li key={bi} className="flex gap-2 text-sm leading-relaxed text-text-dim">
                  <span className="mt-2 h-1 w-1 shrink-0 bg-border" />
                  {bullet}
                </li>
              ))}
            </ul>

            {job.highlight && (
              <div className="mt-3 border-l-2 border-accent bg-accent/5 px-3 py-2">
                <p className="text-sm font-medium text-accent">{job.highlight}</p>
              </div>
            )}

            {companyClouds[job.company] && (
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {companyClouds[job.company].map((key, ci) => (
                  <CloudShape key={key} cloud={clouds[key]} delay={ci * 0.4} />
                ))}
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              {job.tech.map((tech) => (
                <span key={tech} className="pixel-tag border border-border px-3 py-1 font-mono text-xs text-text-dim">
                  {tech}
                </span>
              ))}
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  )
}
