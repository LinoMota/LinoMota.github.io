import fs from 'node:fs'
import path from 'node:path'
import prompts from 'prompts'
import { checkInputStatus, loadAllInput } from '../lib/loadInput.js'
import { generateCurriculoTex } from '../lib/generateCurriculo.js'
import { generateDocumentTex } from '../lib/generateDocument.js'
import { compileLatex, findLatexEngine } from '../lib/compileLatex.js'
import { writeSiteContent } from '../lib/writeSiteContent.js'
import { TEMPLATES_DIR, OUTPUT_DIR } from '../lib/paths.js'

function listTemplates() {
  return fs
    .readdirSync(TEMPLATES_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
}

// The document/site languages to build are NOT the same thing as the
// candidate's spoken languages in input/languages.json (someone can be a
// native Portuguese speaker and still want a bilingual pt/en site+CV, and
// vice-versa). Detect them from a bilingual field that's always present and
// always translated into every target language - contact.jobTitle first,
// falling back to summary/location, and only falling back to
// languages.json's codes for legacy/malformed input.
function detectTargetLanguages(input) {
  for (const field of [input.contact?.jobTitle, input.contact?.summary, input.contact?.location]) {
    if (field && typeof field === 'object' && !Array.isArray(field)) {
      const codes = Object.keys(field)
      if (codes.length > 0) return codes
    }
  }
  return input.languages.map((l) => l.code)
}

async function pickTemplate() {
  const templates = listTemplates()
  if (templates.length === 0) {
    throw new Error(`No templates found in ${TEMPLATES_DIR}`)
  }
  if (templates.length === 1) {
    console.log(`Using template: ${templates[0]} (only one available)`)
    return templates[0]
  }

  const { template } = await prompts({
    type: 'select',
    name: 'template',
    message: 'Pick a resume template',
    choices: templates.map((t) => ({ title: t, value: t })),
  })

  if (!template) {
    throw new Error('No template selected.')
  }
  return template
}

export async function buildCv() {
  const status = checkInputStatus()
  if (!status.valid) {
    console.error('Missing required input files:')
    for (const name of status.missing) {
      console.error(`  - input/${name}.json (or input/${name}.sample.json)`)
    }
    console.error('\nRun "npm run generate-input-for-cv -- <resume.pdf>" first, or create these files by hand.')
    process.exitCode = 1
    return
  }

  if (status.usingSample.length > 0) {
    console.warn(`Using .sample.json fallback for: ${status.usingSample.join(', ')} (copy to <name>.json to customize)\n`)
  }

  const input = loadAllInput()
  const langCodes = detectTargetLanguages(input)
  if (langCodes.length === 0) {
    throw new Error('Could not detect target languages from input/contact.json (jobTitle/summary/location) or input/languages.json.')
  }

  const templateName = await pickTemplate()
  const templateDir = path.join(TEMPLATES_DIR, templateName)
  const templateTexPath = path.join(templateDir, 'template.tex')
  if (!fs.existsSync(templateTexPath)) {
    throw new Error(`Template "${templateName}" is missing template.tex`)
  }
  const templateSource = fs.readFileSync(templateTexPath, 'utf8')
  const templateFiles = fs.readdirSync(templateDir).filter((f) => f !== 'template.tex')

  const engine = findLatexEngine()
  if (!engine) {
    console.warn('No LaTeX engine (pdflatex/xelatex/lualatex) found - .tex files will be generated but not compiled.\n')
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  const texDir = path.join(OUTPUT_DIR, 'tex')
  fs.mkdirSync(texDir, { recursive: true })

  const results = []

  for (const lang of langCodes) {
    const buildDir = path.join(texDir, lang)
    fs.mkdirSync(buildDir, { recursive: true })

    for (const file of templateFiles) {
      fs.copyFileSync(path.join(templateDir, file), path.join(buildDir, file))
    }

    const curriculoTex = generateCurriculoTex(input, lang)
    fs.writeFileSync(path.join(buildDir, `curriculo_${lang}.tex`), curriculoTex)

    const documentTex = generateDocumentTex(templateSource, lang)
    fs.writeFileSync(path.join(buildDir, 'document.tex'), documentTex)

    if (!engine) {
      results.push({ lang, ok: false, reason: 'no LaTeX engine available' })
      continue
    }

    const compiled = compileLatex(engine, buildDir, 'document.tex')
    if (!compiled.ok) {
      results.push({ lang, ok: false, reason: 'LaTeX compilation failed', log: compiled.stdout.slice(-2000) })
      continue
    }

    const pdfSrc = path.join(buildDir, 'document.pdf')
    const pdfDest = path.join(OUTPUT_DIR, `cv-${lang}.pdf`)
    fs.copyFileSync(pdfSrc, pdfDest)
    results.push({ lang, ok: true, pdf: pdfDest })
  }

  const siteContentDir = path.join(OUTPUT_DIR, 'site-content')
  writeSiteContent(input, langCodes, siteContentDir)

  console.log('\nBuild summary:')
  for (const r of results) {
    if (r.ok) {
      console.log(`  [ok]   ${r.lang} -> ${path.relative(OUTPUT_DIR, r.pdf)}`)
    } else {
      console.log(`  [FAIL] ${r.lang}: ${r.reason}`)
      if (r.log) console.log(r.log)
    }
  }
  console.log(`  site-content -> ${path.relative(OUTPUT_DIR, siteContentDir)}/{${langCodes.join(',')}}`)
}
