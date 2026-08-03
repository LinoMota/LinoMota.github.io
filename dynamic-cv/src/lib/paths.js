import { fileURLToPath } from 'node:url'
import path from 'node:path'

const here = path.dirname(fileURLToPath(import.meta.url))

export const ROOT_DIR = path.resolve(here, '..', '..')
export const INPUT_DIR = path.join(ROOT_DIR, 'input')
export const TEMPLATES_DIR = path.join(ROOT_DIR, 'templates')
export const OUTPUT_DIR = path.join(ROOT_DIR, 'output')
