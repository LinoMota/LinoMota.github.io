import fs from 'node:fs'
import path from 'node:path'
import { INPUT_DIR } from './paths.js'

const REQUIRED_FILES = ['contact', 'experiences', 'stacks', 'education', 'languages']
const OPTIONAL_FILES = ['homepage', 'websiteonly']

function resolveInputFile(name) {
  const real = path.join(INPUT_DIR, `${name}.json`)
  const sample = path.join(INPUT_DIR, `${name}.sample.json`)
  if (fs.existsSync(real)) return { path: real, isSample: false }
  if (fs.existsSync(sample)) return { path: sample, isSample: true }
  return null
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

export function checkInputStatus() {
  const missing = []
  const usingSample = []

  for (const name of REQUIRED_FILES) {
    const resolved = resolveInputFile(name)
    if (!resolved) missing.push(name)
    else if (resolved.isSample) usingSample.push(name)
  }

  return { valid: missing.length === 0, missing, usingSample }
}

export function cleanRealInputFiles() {
  const removed = []
  for (const name of [...REQUIRED_FILES, ...OPTIONAL_FILES]) {
    const real = path.join(INPUT_DIR, `${name}.json`)
    if (fs.existsSync(real)) {
      fs.rmSync(real)
      removed.push(`${name}.json`)
    }
  }
  return removed
}

export function loadAllInput() {
  const data = {}

  for (const name of REQUIRED_FILES) {
    const resolved = resolveInputFile(name)
    if (!resolved) {
      throw new Error(`Missing input/${name}.json (and no input/${name}.sample.json fallback either).`)
    }
    data[name] = readJson(resolved.path)
  }

  for (const name of OPTIONAL_FILES) {
    const resolved = resolveInputFile(name)
    data[name] = resolved ? readJson(resolved.path) : null
  }

  return data
}
