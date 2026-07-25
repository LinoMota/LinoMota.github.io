import { Suspense, lazy, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import { useWebGLSupport } from '../hooks/useWebGLSupport'
import SceneErrorBoundary from './SceneErrorBoundary'
import StaticFallbackBackground from './StaticFallbackBackground'

const NetworkScene = lazy(() => import('./NetworkScene'))

export default function Hero() {
  const { t } = useLanguage()
  const webglSupported = useWebGLSupport()

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
      <div className="grid-overlay noise-fade absolute inset-0" />
      <div className="absolute inset-0">
        {webglSupported === false ? (
          <StaticFallbackBackground />
        ) : (
          <SceneErrorBoundary fallback={<StaticFallbackBackground />}>
            <Suspense fallback={null}>
              <NetworkScene />
            </Suspense>
          </SceneErrorBoundary>
        )}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-24">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-pixel text-[10px] tracking-widest text-accent sm:text-xs"
        >
          {t.hero.kicker.toUpperCase()}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 text-5xl font-semibold leading-[1.05] sm:text-6xl md:text-7xl"
        >
          {t.hero.name}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-gradient mt-2 text-2xl font-medium sm:text-3xl"
        >
          {t.hero.role}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 max-w-xl text-lg text-text-dim"
        >
          {t.hero.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-3 font-mono text-sm text-text-dim"
        >
          📍 {t.hero.location}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#experience"
            style={{ '--pixel-shadow': 'rgba(124,247,208,0.6)' } as CSSProperties}
            className="pixel-btn border-transparent bg-accent px-6 py-3 text-sm font-semibold text-bg"
          >
            {t.hero.cta1}
          </a>
          <a
            href="#contact"
            style={{ '--pixel-shadow': 'rgba(167,139,250,0.5)' } as CSSProperties}
            className="pixel-btn border-border bg-bg-soft px-6 py-3 text-sm font-semibold text-text hover:text-accent"
          >
            {t.hero.cta2}
          </a>
          <a
            href={t.hero.resumeFile}
            download
            className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-text-dim transition-colors hover:text-accent"
          >
            {t.hero.resume} ↓
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-9 w-6 items-start justify-center rounded-full border border-border p-1.5">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="h-1.5 w-1.5 rounded-full bg-accent"
          />
        </div>
      </motion.div>
    </section>
  )
}
