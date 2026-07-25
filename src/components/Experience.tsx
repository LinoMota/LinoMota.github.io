import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import { companyLogos } from '../data/logos'
import SectionHeading from './SectionHeading'
import ExperienceLogo from './ExperienceLogo'

export default function Experience() {
  const { t } = useLanguage()

  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="02" heading={t.experience.heading} sub={t.experience.sub} />

      <div className="relative border-l border-border pl-8 sm:pl-10">
        {t.experience.items.map((job, i) => (
          <motion.div
            key={`${job.company}-${job.start}`}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.3) }}
            className="relative mb-14 last:mb-0"
          >
            <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_0_4px_rgba(124,247,208,0.15)] sm:-left-[calc(2.5rem+5px)]" />

            <div className="flex items-start gap-6 sm:gap-7">
              {companyLogos[job.company] && (
                <ExperienceLogo src={companyLogos[job.company]} alt={job.company} />
              )}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-semibold text-text">{job.company}</h3>
                  <span className="font-mono text-xs text-text-dim">
                    {job.start} - {job.end === 'Presente' || job.end === 'Present' ? (
                      <span className="text-accent">{job.end}</span>
                    ) : (
                      job.end
                    )}
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-text-dim">
                  <span className="text-violet">{job.role}</span>
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

            <ul className="mt-4 space-y-2">
              {job.bullets.map((bullet, bi) => {
                const isBlackFriday = bullet.includes('Black Friday')
                return (
                  <li
                    key={bi}
                    className={`flex gap-2 text-sm leading-relaxed ${
                      isBlackFriday ? 'font-medium text-accent' : 'text-text-dim'
                    }`}
                  >
                    <span
                      className={`mt-2 h-1 w-1 shrink-0 rounded-full ${
                        isBlackFriday ? 'bg-accent' : 'bg-border'
                      }`}
                    />
                    {bullet}
                  </li>
                )
              })}
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              {job.tech.map((tech) => (
                <span
                  key={tech}
                  className="pixel-tag border border-border px-3 py-1 font-mono text-xs text-text-dim"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
