import type { CSSProperties } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import ProfileCard from '../reactbits/ProfileCard'

export default function ContactView() {
  const { t } = useLanguage()
  const githubHandle = t.contact.github.split('/').pop() ?? t.contact.github

  return (
    <section className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-20">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <span className="font-pixel text-xs text-accent">05</span>
        <h2 className="font-display mt-2 text-3xl text-text sm:text-4xl">{t.contact.heading}</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-text-dim">{t.contact.sub}</p>
      </div>

      <div className="mt-10 flex flex-col items-center justify-center gap-10 lg:flex-row lg:items-center">
        <ProfileCard
          name={t.hero.name}
          title={t.hero.role}
          handle={githubHandle}
          status={t.hero.location}
          contactText={t.contact.cta}
          avatarUrl="/profile.png"
          miniAvatarUrl="/profile.png"
          iconUrl="/assets/demo/iconpattern.png"
          showUserInfo
          enableTilt
          innerGradient="linear-gradient(145deg, #1f9e4855 0%, #ffb00044 100%)"
          behindGlowColor="rgba(46,255,111,0.5)"
          onContactClick={() => {
            window.location.href = `mailto:${t.contact.email}`
          }}
        />

        <div className="flex w-full max-w-sm flex-col gap-4">
          <a
            href={t.contact.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="pixel-btn border-border bg-bg-soft px-6 py-3 text-center text-sm font-semibold text-text hover:text-accent"
            style={{ '--pixel-shadow': 'rgba(255,176,0,0.5)' } as CSSProperties}
          >
            LinkedIn · {t.contact.linkedin}
          </a>
          <a
            href={t.contact.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="pixel-btn border-border bg-bg-soft px-6 py-3 text-center text-sm font-semibold text-text hover:text-accent"
            style={{ '--pixel-shadow': 'rgba(46,255,111,0.35)' } as CSSProperties}
          >
            GitHub · {t.contact.github}
          </a>
          <p className="mt-2 text-center font-mono text-xs text-text-dim">{t.contact.email}</p>
        </div>
      </div>
    </section>
  )
}
