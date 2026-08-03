import fs from 'node:fs'
import path from 'node:path'
import { OUTPUT_DIR, ROOT_DIR } from './paths.js'

// dynamic-cv lives inside the portfolio project (portifolio/dynamic-cv), so
// its parent directory is the site that consumes output/site-content.
const PORTFOLIO_DIR = path.resolve(ROOT_DIR, '..')
const SITE_CONTENT_DEST = path.join(PORTFOLIO_DIR, 'src', 'data', 'site-content')
const PUBLIC_DIR = path.join(PORTFOLIO_DIR, 'public')

export function exportToSite() {
  const siteContentSrc = path.join(OUTPUT_DIR, 'site-content')
  if (!fs.existsSync(siteContentSrc)) {
    throw new Error('No output/site-content found - run build-cv first.')
  }
  if (!fs.existsSync(path.join(PORTFOLIO_DIR, 'package.json'))) {
    throw new Error(`Could not find the portfolio project at ${PORTFOLIO_DIR}`)
  }

  fs.rmSync(SITE_CONTENT_DEST, { recursive: true, force: true })
  fs.cpSync(siteContentSrc, SITE_CONTENT_DEST, { recursive: true })

  const copiedPdfs = []
  for (const entry of fs.readdirSync(OUTPUT_DIR)) {
    if (entry.startsWith('cv-') && entry.endsWith('.pdf')) {
      fs.copyFileSync(path.join(OUTPUT_DIR, entry), path.join(PUBLIC_DIR, entry))
      copiedPdfs.push(entry)
    }
  }

  return {
    siteContentDest: path.relative(PORTFOLIO_DIR, SITE_CONTENT_DEST),
    copiedPdfs,
  }
}
