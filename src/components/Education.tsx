import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import SectionHeading from './SectionHeading'

export default function Education() {
  const { t } = useLanguage()

  return (
    <section id="education" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="04" heading={t.education.heading} />

      <div className="grid gap-12 md:grid-cols-5">
        <div className="md:col-span-3">
          {t.education.items.map((edu) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
              className="pixel-corners border border-border bg-surface/60 p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-text">{edu.school}</h3>
                <span className="font-mono text-xs text-text-dim">
                  {edu.start} - {edu.end}
                </span>
              </div>
              <p className="mt-1 text-violet">{edu.degree}</p>
              <p className="mt-3 text-sm leading-relaxed text-text-dim">{edu.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="md:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-border bg-surface/60 p-6"
          >
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent">
              {t.education.languagesHeading}
            </h3>
            <div className="mt-4 space-y-3">
              {t.education.languages.map((lang) => (
                <div key={lang.name} className="flex items-center justify-between text-sm">
                  <span className="text-text">{lang.name}</span>
                  <span className="text-text-dim">{lang.level}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
