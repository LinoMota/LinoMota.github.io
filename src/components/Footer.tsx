import { useLanguage } from '../i18n/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center text-xs text-text-dim sm:flex-row sm:text-left">
        <span className="font-mono">© {new Date().getFullYear()} Lino Mota</span>
        <span>{t.footer.text}</span>
      </div>
    </footer>
  )
}
