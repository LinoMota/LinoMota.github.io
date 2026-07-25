import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import SectionHeading from './SectionHeading'

export default function Skills() {
  const { t } = useLanguage()

  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="03" heading={t.skills.heading} sub={t.skills.sub} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {t.skills.groups.map((group, i) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
            className="pixel-corners border border-border bg-surface/60 p-6 transition-colors hover:border-accent/40"
          >
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent">{group.label}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="pixel-tag bg-bg-soft px-2.5 py-1 text-sm text-text-dim"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
