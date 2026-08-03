import { spawnSync } from 'node:child_process'

export function findLatexEngine() {
  for (const engine of ['pdflatex', 'xelatex', 'lualatex']) {
    const check = spawnSync(engine, ['--version'], { stdio: 'ignore' })
    if (!check.error) return engine
  }
  return null
}

export function compileLatex(engine, dir, texFileName) {
  const runOnce = () =>
    spawnSync(engine, ['-interaction=nonstopmode', '-halt-on-error', texFileName], {
      cwd: dir,
      encoding: 'utf8',
    })

  const first = runOnce()
  const second = runOnce()
  const result = second.status === 0 ? second : first

  return {
    ok: result.status === 0,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
  }
}
