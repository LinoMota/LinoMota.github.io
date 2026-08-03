import fs from 'node:fs'
import path from 'node:path'
import { resolveLocalized } from './resolveLocalized.js'

const FILES = ['contact', 'experiences', 'stacks', 'education', 'languages', 'homepage', 'websiteonly']

export function writeSiteContent(input, langCodes, siteContentDir) {
  const knownCodes = new Set(langCodes)

  for (const lang of langCodes) {
    const dir = path.join(siteContentDir, lang)
    fs.mkdirSync(dir, { recursive: true })

    for (const name of FILES) {
      const data = input[name]
      if (data == null) continue
      const resolved = resolveLocalized(data, lang, knownCodes)
      fs.writeFileSync(path.join(dir, `${name}.json`), `${JSON.stringify(resolved, null, 2)}\n`)
    }
  }
}
