import { ChevronDown } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { companyLogos } from '../data/logos'
import { clouds, companyClouds } from '../data/clouds'
import ScrollStack, { ScrollStackItem } from '../reactbits/ScrollStack'
import ExperienceLogo from './ExperienceLogo'
import CloudShape from './CloudShape'

export default function ExperienceStack() {
  const { t, locale } = useLanguage()

  return (
    <section className="relative flex h-screen flex-col pt-14">
      <div className="px-6 pb-1 text-center">
        <span className="font-pixel text-xs text-accent">02</span>
        <h2 className="font-display mt-1 text-3xl text-text sm:text-4xl">{t.experience.heading}</h2>
        <p className="mx-auto mt-1 max-w-xl text-sm text-text-dim">{t.experience.sub}</p>
        <ChevronDown size={16} className="mx-auto mt-2 animate-bounce text-text-dim/50" aria-hidden />
      </div>

      <div className="min-h-0 flex-1 pb-32">
        <ScrollStack
          key={locale}
          useWindowScroll={false}
          className="h-full"
          itemDistance={80}
          stackPosition="3%"
          scaleEndPosition="2%"
          baseScale={0.88}
        >
          {t.experience.items.map((job) => (
            <ScrollStackItem
              key={`${job.company}-${job.start}`}
              itemClassName="pixel-panel no-scrollbar max-h-[62vh] overflow-y-auto border-border bg-surface/90 backdrop-blur-sm sm:max-h-[68vh]"
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
                    {job.highlight && (
                      <span className="pixel-tag border border-accent/60 bg-accent/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-accent">
                        {job.highlight}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <ul className="mt-3 space-y-1">
                {job.bullets.map((bullet, bi) => {
                  const isBlackFriday = bullet.includes('Black Friday')
                  return (
                    <li
                      key={bi}
                      className={`flex gap-2 text-[13px] leading-snug ${isBlackFriday ? 'font-medium text-accent' : 'text-text-dim'}`}
                    >
                      <span className={`mt-1.5 h-1 w-1 shrink-0 ${isBlackFriday ? 'bg-accent' : 'bg-border'}`} />
                      {bullet}
                    </li>
                  )
                })}
              </ul>

              {companyClouds[job.company] && (
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  {companyClouds[job.company].map((key, ci) => (
                    <CloudShape key={key} cloud={clouds[key]} delay={ci * 0.4} />
                  ))}
                </div>
              )}

              <div className="mt-3 flex flex-wrap gap-2">
                {job.tech.map((tech) => (
                  <span key={tech} className="pixel-tag border border-border px-3 py-1 font-mono text-xs text-text-dim">
                    {tech}
                  </span>
                ))}
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  )
}
