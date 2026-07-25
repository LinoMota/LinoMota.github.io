import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import SectionHeading from './SectionHeading'

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="01" heading={t.about.heading} />

      <div className="grid gap-12 md:grid-cols-5">
        <div className="md:col-span-3">
          {t.about.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="mb-4 leading-relaxed text-text-dim"
            >
              {p}
            </motion.p>
          ))}
        </div>

        <div className="md:col-span-2">
          <div className="grid grid-cols-3 gap-4 md:grid-cols-1">
            {t.about.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="pixel-corners border border-border bg-surface/60 p-5"
              >
                <div className="font-mono text-3xl font-bold text-accent">{stat.value}</div>
                <div className="mt-1 text-sm text-text-dim">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
