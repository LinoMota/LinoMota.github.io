import { useEffect } from 'react'
import type { CSSProperties } from 'react'
import { X } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

interface AboutModalProps {
  open: boolean
  onClose: () => void
}

export default function AboutModal({ open, onClose }: AboutModalProps) {
  const { t } = useLanguage()

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="no-scrollbar pixel-panel max-h-[85vh] w-full max-w-2xl overflow-auto border-border bg-bg-soft"
        style={{ '--pixel-shadow': 'rgba(46,255,111,0.25)' } as CSSProperties}
      >
        <div className="flex items-center justify-between border-b-2 border-border px-4 py-2">
          <span className="font-mono text-xs text-text-dim">~/about.sh</span>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="pixel-btn border-border bg-bg-soft p-1 text-text-dim hover:text-accent"
            style={{ '--pixel-shadow': 'rgba(46,255,111,0.4)' } as CSSProperties}
          >
            <X size={14} />
          </button>
        </div>

        <div className="relative px-6 py-8 sm:px-10 sm:py-10">
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
                <div className="text-gradient font-display text-3xl sm:text-4xl">{stat.value}</div>
                <div className="mt-1 text-xs text-text-dim">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
