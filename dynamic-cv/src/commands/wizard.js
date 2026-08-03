import fs from 'node:fs'
import path from 'node:path'
import prompts from 'prompts'
import { INPUT_DIR } from '../lib/paths.js'
import { checkInputStatus } from '../lib/loadInput.js'
import { exportToSite } from '../lib/exportToSite.js'
import { generateInputForCv } from './generateInputForCv.js'
import { buildCv } from './buildCv.js'

function writeBasicContact({ name, jobTitle, location, email, linkedinUrl, summary }) {
  const bilingual = (value) => ({ pt: value, en: value })
  const linkedinHandle = linkedinUrl
    .replace(/\/+$/, '')
    .split('/')
    .filter(Boolean)
    .pop()

  const contact = {
    name,
    jobTitle: bilingual(jobTitle),
    location: bilingual(location),
    phone: '',
    email,
    linkedin: linkedinHandle ? `linkedin.com/in/${linkedinHandle}` : '',
    linkedinUrl,
    github: '',
    githubUrl: '',
    summary: bilingual(summary),
  }

  fs.mkdirSync(INPUT_DIR, { recursive: true })
  fs.writeFileSync(path.join(INPUT_DIR, 'contact.json'), `${JSON.stringify(contact, null, 2)}\n`)
}

export async function runWizard() {
  console.log('Dynamic CV\n')

  const status = checkInputStatus()
  const hasRealInput = status.valid && status.usingSample.length === 0

  if (hasRealInput) {
    console.log('Já encontrei um input/ configurado (não são só os *.sample.json).\n')
  } else {
    const { hasPdf } = await prompts({
      type: 'confirm',
      name: 'hasPdf',
      message: 'Você tem um currículo pronto em PDF para escanear?',
      initial: true,
    })
    if (hasPdf === undefined) return

    if (hasPdf) {
      const { pdfPath } = await prompts({
        type: 'text',
        name: 'pdfPath',
        message: 'Qual o caminho do arquivo PDF?',
        validate: (value) => (fs.existsSync(path.resolve(value.trim())) ? true : 'Arquivo não encontrado'),
      })
      if (!pdfPath) return

      const { languages } = await prompts({
        type: 'text',
        name: 'languages',
        message: 'Em quais idiomas o currículo deve ser gerado? (códigos separados por vírgula)',
        initial: 'pt,en',
      })
      if (!languages) return

      await generateInputForCv(
        pdfPath.trim(),
        languages
          .split(',')
          .map((code) => code.trim())
          .filter(Boolean),
      )
    } else {
      console.log('\nSem problemas - vamos preencher pelo menos o básico a partir do seu LinkedIn.\n')

      const basics = await prompts([
        { type: 'text', name: 'name', message: 'Nome completo' },
        { type: 'text', name: 'jobTitle', message: 'Cargo / headline (ex: Senior Back-End Developer)' },
        { type: 'text', name: 'location', message: 'Localização (cidade, estado, país)' },
        { type: 'text', name: 'email', message: 'E-mail' },
        { type: 'text', name: 'linkedinUrl', message: 'URL do seu LinkedIn' },
        { type: 'text', name: 'summary', message: 'Resumo profissional (2-3 frases)' },
      ])
      if (!basics.name) return

      writeBasicContact(basics)
      console.log(
        '\nCriei input/contact.json com o básico (mesmo texto em pt/en - ajuste as traduções). Copie os outros input/*.sample.json para *.json e complete o restante (experiências, skills, formação, idiomas).',
      )
      console.log(
        'Dica: se preferir, use PROMPT_TO_TURN_CV_INTO_INPUT_FILES.md com qualquer LLM (ChatGPT, Claude, Gemini...) pra gerar os arquivos completos a partir do texto do seu currículo.',
      )
    }
  }

  const { shouldBuild } = await prompts({
    type: 'confirm',
    name: 'shouldBuild',
    message: hasRealInput
      ? 'Transformar o input atual em output agora (compilar PDFs e gerar o conteúdo do site)?'
      : 'Rodar build-cv agora (compilar PDFs e gerar o conteúdo do site)?',
    initial: true,
  })
  if (!shouldBuild) return

  await buildCv()

  const { shouldExport } = await prompts({
    type: 'confirm',
    name: 'shouldExport',
    message: 'Exportar o resultado para o site do portfólio agora?',
    initial: true,
  })
  if (!shouldExport) return

  const result = exportToSite()
  console.log(`\nExportado para ${result.siteContentDest}`)
  for (const pdf of result.copiedPdfs) {
    console.log(`  + public/${pdf}`)
  }
}
