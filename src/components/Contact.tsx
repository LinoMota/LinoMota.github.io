import { type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

export default function Contact() {
  const { t } = useLanguage()

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="pixel-corners relative overflow-hidden border border-border bg-surface/60 px-8 py-16 text-center sm:px-16"
      >
        <div className="grid-overlay absolute inset-0 opacity-40" />
        <div className="relative">
          <span className="font-pixel text-xs text-accent">05</span>
          <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">{t.contact.heading}</h2>
          <p className="mx-auto mt-4 max-w-xl text-text-dim">{t.contact.sub}</p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${t.contact.email}`}
              style={{ '--pixel-shadow': 'rgba(124,247,208,0.6)' } as CSSProperties}
              className="pixel-btn border-transparent bg-accent px-6 py-3 text-sm font-semibold text-bg"
            >
              {t.contact.cta}
            </a>
            <a
              href={t.contact.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              style={{ '--pixel-shadow': 'rgba(167,139,250,0.5)' } as CSSProperties}
              className="pixel-btn border-border bg-bg-soft px-6 py-3 text-sm font-semibold text-text hover:text-accent"
            >
              LinkedIn
            </a>
            <a
              href={t.contact.githubUrl}
              target="_blank"
              rel="noreferrer"
              style={{ '--pixel-shadow': 'rgba(124,247,208,0.35)' } as CSSProperties}
              className="pixel-btn border-border bg-bg-soft px-6 py-3 text-sm font-semibold text-text hover:text-accent"
            >
              GitHub
            </a>
          </div>

          <p className="mt-8 font-mono text-sm text-text-dim">
            {t.contact.email} · {t.contact.github}
          </p>
        </div>
      </motion.div>
    </section>
  )
}
