import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import Anthropic from '@anthropic-ai/sdk'
import { INPUT_DIR } from '../lib/paths.js'
import { buildResumeSchema, buildSiteExtrasSchema } from '../lib/resumeSchema.js'

const DEFAULT_LANGUAGES = ['pt', 'en']

function buildResumeSystemPrompt(languageCodes) {
  const languageList = languageCodes.join(', ')
  return `You turn raw resume/CV text (extracted from a PDF, so layout may be imperfect) into structured multilingual JSON.

The target document languages for this run are: ${languageList}. Every "bilingual" field in the schema is actually an object with exactly one key per target language (${languageList}).

Rules:
- Every "bilingual" field must be provided in ALL of these languages: ${languageList}. If the source resume is only in one language, translate it naturally into the others rather than leaving them blank or copying the same text untranslated.
- Do not invent facts that aren't in the resume. If a field genuinely has no value (e.g. no GitHub profile mentioned), use an empty string "" for required string fields.
- "tag" and "highlight" on an experience are optional extras: only fill them in when the resume text clearly calls out a standout achievement (e.g. a big campaign, an award, a notable metric). Otherwise leave them null.
- Order experiences and education from most recent to oldest, matching the resume.
- "languages" (the candidate's spoken languages with proficiency) should reflect every language the candidate actually speaks per the resume - this can include languages beyond ${languageList} (e.g. Spanish, French), and is independent from the ${languageList} document-translation requirement above.
- Keep bullets concise, one accomplishment per bullet, rewritten for clarity rather than copied verbatim with PDF line-break artifacts.
- Respond with JSON only, matching the provided schema exactly.`
}

function buildSiteExtrasSystemPrompt(languageCodes) {
  const languageList = languageCodes.join(', ')
  return `You write bonus website-only content (never used in the PDF, only the site) to go alongside an already-generated résumé JSON. Every "bilingual" field in the schema is an object with exactly one key per target language (${languageList}).

Rules:
- You'll be given the already-inferred résumé JSON (contact, experiences, stacks, education, languages) as context. Keep "homepage" and "websiteonly" consistent with it (same name, same companies), but "aboutParagraphs" and "tagline" can have more personality than the formal résumé summary - a first-person narrative, not a repeat of "contact.summary".
- "websiteonly.profileCard.avatarUrl" and "iconUrl" are always the placeholders described in the schema - there are no real image files to point to yet.
- "websiteonly.companyLogos" and "companyClouds" are always {} - there are no logo assets to reference; the user fills these in by hand later.
- "websiteonly.resumeFiles" gives one relative PDF path per target language, following the pattern "./cv-<lang>.pdf".
- Respond with JSON only, matching the provided schema exactly.`
}

function extractPdfText(pdfPath) {
  const result = spawnSync('pdftotext', ['-layout', pdfPath, '-'], {
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 20,
  })
  if (result.error) {
    throw new Error(`Could not run "pdftotext" (poppler-utils): ${result.error.message}`)
  }
  if (result.status !== 0) {
    throw new Error(`pdftotext failed: ${result.stderr || 'unknown error'}`)
  }
  return result.stdout.trim()
}

function extractJson(response) {
  if (response.stop_reason === 'refusal') {
    throw new Error('Claude declined to process this document.')
  }
  const textBlock = response.content.find((block) => block.type === 'text')
  if (!textBlock) {
    throw new Error('Claude returned no text content.')
  }
  return JSON.parse(textBlock.text)
}

async function inferResumeData(client, resumeText, languageCodes) {
  const response = await client.messages.create({
    model: 'claude-opus-5',
    max_tokens: 8192,
    system: buildResumeSystemPrompt(languageCodes),
    messages: [
      {
        role: 'user',
        content: `Here is the resume text extracted from a PDF:\n\n${resumeText}`,
      },
    ],
    output_config: {
      format: { type: 'json_schema', schema: buildResumeSchema(languageCodes) },
    },
  })

  return extractJson(response)
}

async function inferSiteExtras(client, resumeData, languageCodes) {
  const response = await client.messages.create({
    model: 'claude-opus-5',
    max_tokens: 8192,
    system: buildSiteExtrasSystemPrompt(languageCodes),
    messages: [
      {
        role: 'user',
        content: `Here is the already-inferred résumé JSON:\n\n${JSON.stringify(resumeData, null, 2)}`,
      },
    ],
    output_config: {
      format: { type: 'json_schema', schema: buildSiteExtrasSchema(languageCodes) },
    },
  })

  return extractJson(response)
}

function writeJson(name, data) {
  fs.writeFileSync(path.join(INPUT_DIR, name), `${JSON.stringify(data, null, 2)}\n`)
}

export async function generateInputForCv(pdfPath, languages) {
  if (!pdfPath) {
    throw new Error('Usage: generate-input-for-cv <resume.pdf> [--languages pt,en,es]')
  }

  const languageCodes = languages && languages.length > 0 ? languages : DEFAULT_LANGUAGES

  const resolvedPath = path.resolve(pdfPath)
  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`File not found: ${resolvedPath}`)
  }

  console.log(`Extracting text from ${resolvedPath}...`)
  const resumeText = extractPdfText(resolvedPath)
  if (!resumeText) {
    throw new Error('pdftotext produced no text - is this a scanned/image-only PDF?')
  }

  fs.mkdirSync(INPUT_DIR, { recursive: true })
  fs.writeFileSync(path.join(INPUT_DIR, '_raw-resume-text.txt'), `${resumeText}\n`)

  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('\nANTHROPIC_API_KEY is not set - skipping automatic inference.')
    console.warn('Raw extracted text was saved to input/_raw-resume-text.txt.')
    console.warn('Options:')
    console.warn('  1) Set ANTHROPIC_API_KEY (see .env.sample) and re-run this command.')
    console.warn(
      '  2) Paste input/_raw-resume-text.txt into PROMPT_TO_TURN_CV_INTO_INPUT_FILES.md with any LLM (ChatGPT, Claude, Gemini...) to generate the input/*.json files.',
    )
    console.warn('  3) Copy the input/*.sample.json files to input/*.json and fill them in by hand.')
    return
  }

  const client = new Anthropic()

  console.log(`Asking Claude to infer structured resume data in [${languageCodes.join(', ')}] (this can take a bit)...`)
  const resumeData = await inferResumeData(client, resumeText, languageCodes)

  writeJson('contact.json', resumeData.contact)
  writeJson('experiences.json', resumeData.experiences)
  writeJson('stacks.json', resumeData.stacks)
  writeJson('education.json', resumeData.education)
  writeJson('languages.json', resumeData.languages)

  console.log('Asking Claude to infer bonus website-only content (homepage, websiteonly)...')
  const siteExtras = await inferSiteExtras(client, resumeData, languageCodes)

  writeJson('homepage.json', siteExtras.homepage)
  writeJson('websiteonly.json', siteExtras.websiteonly)

  console.log('\nWrote:')
  console.log('  input/contact.json')
  console.log('  input/experiences.json')
  console.log('  input/stacks.json')
  console.log('  input/education.json')
  console.log('  input/languages.json')
  console.log('  input/homepage.json (bonus: website-only copy)')
  console.log('  input/websiteonly.json (bonus: profile card, footer, company logos/clouds)')
  console.log(
    '\nReview and edit these files (they were inferred automatically and may need fixes - websiteonly.json especially needs real asset paths), then run "npm run build-cv".',
  )
}
