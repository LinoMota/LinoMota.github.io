#!/usr/bin/env node
import { Command } from 'commander'
import { buildCv } from '../src/commands/buildCv.js'
import { generateInputForCv } from '../src/commands/generateInputForCv.js'
import { runWizard } from '../src/commands/wizard.js'
import { exportToSite } from '../src/lib/exportToSite.js'

const program = new Command()

program
  .name('dynamic-cv')
  .description('Turn JSON resume data into localized LaTeX/PDF resumes and portfolio site-content')
  .addHelpText(
    'after',
    '\nNo ANTHROPIC_API_KEY handy? Use PROMPT_TO_TURN_CV_INTO_INPUT_FILES.md with any LLM (ChatGPT, Claude, Gemini...) to generate input/*.json instead of "generate-input-for-cv".',
  )
  .action(async () => {
    try {
      await runWizard()
    } catch (err) {
      console.error(`\nError: ${err.message}`)
      process.exitCode = 1
    }
  })

program
  .command('build-cv')
  .description('Validate input/, pick a template, compile PDFs and generate site-content/')
  .action(async () => {
    try {
      await buildCv()
    } catch (err) {
      console.error(`\nError: ${err.message}`)
      process.exitCode = 1
    }
  })

program
  .command('generate-input-for-cv')
  .argument('<pdf>', 'Path to a resume PDF to read')
  .option('-l, --languages <codes>', 'comma-separated target document languages, e.g. "pt,en,es"', 'pt,en')
  .description('Extract text from a resume PDF and infer input/*.json files')
  .action(async (pdf, options) => {
    try {
      const languages = options.languages
        .split(',')
        .map((code) => code.trim())
        .filter(Boolean)
      await generateInputForCv(pdf, languages)
    } catch (err) {
      console.error(`\nError: ${err.message}`)
      process.exitCode = 1
    }
  })

program
  .command('export-to-site')
  .description('Copy output/site-content and cv-*.pdf into the portfolio (../src/data/site-content, ../public)')
  .action(() => {
    try {
      const result = exportToSite()
      console.log(`Exported site-content -> ${result.siteContentDest}`)
      for (const pdf of result.copiedPdfs) {
        console.log(`Copied ${pdf} -> public/${pdf}`)
      }
    } catch (err) {
      console.error(`\nError: ${err.message}`)
      process.exitCode = 1
    }
  })

program.parseAsync(process.argv)
