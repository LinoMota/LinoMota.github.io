import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

function slugify(value: string) {
  const combiningAccents = /[̀-ͯ]/g
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(combiningAccents, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

interface BootStep {
  label: string
  task: () => Promise<unknown>
}

const MIN_STEP_MS = 140
const STEP_TIMEOUT_MS = 4000

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function withTimeout<T>(promise: Promise<T>, ms: number) {
  return Promise.race([promise, delay(ms)])
}

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => resolve()
    img.src = src
    if (img.complete) resolve()
  })
}

const BOOT_STEPS: BootStep[] = [
  { label: 'Preflight checks', task: () => delay(MIN_STEP_MS) },
  {
    label: 'Verifying stack. Found React + Vite + Three.js.',
    task: () => withTimeout(document.fonts.ready, STEP_TIMEOUT_MS),
  },
  { label: 'Loading profile data', task: () => withTimeout(preloadImage('/profile.png'), STEP_TIMEOUT_MS) },
  { label: 'Establishing secure connection', task: () => withTimeout(import('./HomeView'), STEP_TIMEOUT_MS) },
  {
    label: 'Rendering components',
    task: () =>
      withTimeout(
        Promise.all([import('./AboutView'), import('./ExperienceView'), import('./SkillsView'), import('./ContactView')]),
        STEP_TIMEOUT_MS,
      ),
  },
  {
    label: 'Compiling terminal shaders',
    task: () => withTimeout(import('../reactbits/FaultyTerminal'), STEP_TIMEOUT_MS),
  },
]

const SUCCESS_LINES = ['Success! Portfolio initialized.', 'Loading language module...']
const TYPING_SPEED_MS = 22
const END_PAUSE_MS = 400

function TypedText({ text, onDone }: { text: string; onDone: () => void }) {
  const [shown, setShown] = useState('')

  useEffect(() => {
    setShown('')
    let i = 0
    const interval = setInterval(() => {
      i += 1
      setShown(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(interval)
        onDone()
      }
    }, TYPING_SPEED_MS)
    return () => clearInterval(interval)
  }, [text])

  return <>{shown}</>
}

interface TerminalBootProps {
  onDone: () => void
}

export default function TerminalBoot({ onDone }: TerminalBootProps) {
  const { t } = useLanguage()
  const slug = slugify(t.hero.name)
  const typeLine = `> npx ${slug}@latest init`
  const [promptTyped, setPromptTyped] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [stepsDone, setStepsDone] = useState(false)
  const [successVisible, setSuccessVisible] = useState(0)
  const [fading, setFading] = useState(false)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!promptTyped || startedRef.current) return
    startedRef.current = true

    let cancelled = false

    const run = async () => {
      for (const step of BOOT_STEPS) {
        const start = performance.now()
        await step.task().catch(() => {})
        const elapsed = performance.now() - start
        if (elapsed < MIN_STEP_MS) await delay(MIN_STEP_MS - elapsed)
        if (cancelled) return
        setCompletedSteps((prev) => [...prev, step.label])
      }
      if (!cancelled) setStepsDone(true)
    }

    run()
    return () => {
      cancelled = true
    }
  }, [promptTyped])

  useEffect(() => {
    if (!stepsDone) return
    if (successVisible >= SUCCESS_LINES.length) {
      const timer = setTimeout(() => {
        setFading(true)
        setTimeout(onDone, 450)
      }, END_PAUSE_MS)
      return () => clearTimeout(timer)
    }
  }, [stepsDone, successVisible, onDone])

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-bg/95 px-6 backdrop-blur-sm transition-opacity duration-[450ms] ${
        fading ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div
        className="pixel-panel no-scrollbar w-full max-w-xl overflow-auto border-border bg-bg-soft"
        style={{ '--pixel-shadow': 'rgba(46,255,111,0.25)' } as CSSProperties}
      >
        <div className="flex items-center justify-between border-b-2 border-border px-4 py-2">
          <span className="font-mono text-xs text-text-dim">$ {slug}</span>
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 border border-border bg-surface" />
            <span className="h-2.5 w-2.5 border border-border bg-surface" />
            <span className="h-2.5 w-2.5 border border-accent bg-accent/30" />
          </div>
        </div>

        <div className="min-h-[220px] px-5 py-6 font-mono text-sm">
          <p className="mb-1.5 text-text">
            {promptTyped ? typeLine : <TypedText text={typeLine} onDone={() => setPromptTyped(true)} />}
            {!promptTyped && (
              <span className="ml-0.5 inline-block animate-[texttype-blink_0.5s_ease-in-out_infinite] text-accent">|</span>
            )}
          </p>

          {completedSteps.map((label) => (
            <p key={label} className="mb-1.5 text-accent">
              <span className="mr-2">✔</span>
              {label}
            </p>
          ))}

          {stepsDone &&
            SUCCESS_LINES.slice(0, successVisible + 1).map((line, i) => {
              const isCurrent = i === successVisible
              return (
                <p key={line} className="mb-1.5 text-text-dim">
                  {isCurrent ? <TypedText text={line} onDone={() => setSuccessVisible((v) => v + 1)} /> : line}
                </p>
              )
            })}
        </div>
      </div>
    </div>
  )
}
