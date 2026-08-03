# Dynamic CV

CLI that turns resume data into localized LaTeX/PDF résumés and portfolio
site-content (JSON consumed by the parent portfolio's React site).

Language: [English](#english) · [Português](#português)

---

## English

### What it does

1. You provide résumé data as JSON files in `input/` (by hand, from a PDF, or
   pasted from LinkedIn basics).
2. `build-cv` turns that data into a LaTeX `.tex` file per language, compiles
   it to a PDF (if a LaTeX toolchain is installed), and also writes
   `output/site-content/<lang>/*.json` - the same data, resolved to a single
   language per folder, ready to feed a website.
3. `export-to-site` copies that output into the parent portfolio project
   (`../src/data/site-content`, `../public/cv-*.pdf`).

### Requirements

- Node.js 20+ (uses `--env-file-if-exists`, available on Node 20.12+/21.7+)
- A LaTeX toolchain (`pdflatex`, `xelatex`, or `lualatex`) to compile PDFs -
  optional, `build-cv` still writes the `.tex` files without it
- `pdftotext` (from `poppler-utils`) - only needed by `generate-input-for-cv`
- An `ANTHROPIC_API_KEY` - only needed by `generate-input-for-cv`; see
  `.env.sample`

### Install

```sh
./install.sh
```

This runs `npm install` and checks whether `pdflatex`/`pdftotext` are
available, printing install instructions for your OS if not.

### Quick start

```sh
npm start
```

This launches an interactive wizard:

- Asks if you already have a résumé as a PDF to scan. If yes, it asks for
  the file path and target languages, then extracts and infers the
  `input/*.json` files with Claude.
- If not, it asks for just the basics (name, headline, location, email,
  LinkedIn, summary) and writes a starter `input/contact.json` for you to
  build on.
- If `input/` is already fully configured (not just the `.sample.json`
  templates), it skips straight to asking whether to build now.
- Then it offers to run `build-cv` and, after that, `export-to-site`.

No `ANTHROPIC_API_KEY`? See `PROMPT_TO_TURN_CV_INTO_INPUT_FILES.md` - a
copy-paste prompt that works with any LLM chat (ChatGPT, Claude, Gemini...)
to generate the same `input/*.json` files without calling any API.

### Manual commands

```sh
npm run generate-input-for-cv -- /path/to/resume.pdf --languages pt,en
npm run build-cv
npm run export-to-site
```

### `input/` files

| File | Required | Contents |
|---|---|---|
| `contact.json` | yes | Name, contact info, professional summary |
| `experiences.json` | yes | Work history array - each entry supports an optional `tag` (short badge, e.g. "3 Black Fridays") and `highlight` (a standout achievement, rendered as its own callout) |
| `stacks.json` | yes | Skill groups (label + list of items) |
| `education.json` | yes | Education history array |
| `languages.json` | yes | Languages the candidate speaks, with proficiency - drives which document languages get built |
| `homepage.json` | no | Website-only copy (hero text, nav labels, section headings) not used in the PDF |
| `websiteonly.json` | no | Website-only extras: profile card, footer text, company logos/cloud icons per experience |

Every text field that isn't language-agnostic (names, tech lists, URLs) is
written as an object with one key per language, e.g.
`{"pt": "...", "en": "..."}`.

Each file has a matching `<name>.sample.json` - the template `build-cv` falls
back to if the real file doesn't exist yet. Copy a sample to its real name
and edit it, or let the wizard/`generate-input-for-cv` create the real file
for you.

### Templates

`templates/<name>/template.tex` is the shared LaTeX shell (comments mark
where each `input/*.json` file's data lands); `build-cv` generates a
`curriculo_<lang>.tex` per language and compiles the two together. Add a new
folder under `templates/` to offer more than one design - `build-cv` will
prompt you to pick one when more than one exists.

---

## Português

### O que ele faz

1. Você fornece os dados do currículo como arquivos JSON em `input/` (na
   mão, a partir de um PDF, ou preenchendo o básico do LinkedIn).
2. O `build-cv` transforma esses dados em um `.tex` por idioma, compila em
   PDF (se houver uma distribuição LaTeX instalada) e também gera
   `output/site-content/<idioma>/*.json` - os mesmos dados, resolvidos para
   um único idioma por pasta, prontos para alimentar um site.
3. O `export-to-site` copia esse resultado para o projeto do portfólio
   (`../src/data/site-content`, `../public/cv-*.pdf`).

### Requisitos

- Node.js 20+ (usa `--env-file-if-exists`, disponível a partir do Node
  20.12+/21.7+)
- Uma distribuição LaTeX (`pdflatex`, `xelatex` ou `lualatex`) para compilar
  os PDFs - opcional, o `build-cv` gera os `.tex` mesmo sem ela
- `pdftotext` (do pacote `poppler-utils`) - só necessário pro
  `generate-input-for-cv`
- Uma `ANTHROPIC_API_KEY` - só necessária pro `generate-input-for-cv`; veja
  `.env.sample`

### Instalação

```sh
./install.sh
```

Isso roda `npm install` e verifica se `pdflatex`/`pdftotext` estão
disponíveis, imprimindo instruções de instalação para o seu sistema
operacional caso não estejam.

### Começando rápido

```sh
npm start
```

Isso abre um assistente interativo:

- Pergunta se você já tem um currículo pronto em PDF para escanear. Se sim,
  pede o caminho do arquivo e os idiomas-alvo, e então extrai e infere os
  arquivos `input/*.json` usando Claude.
- Se não, pede só o básico (nome, cargo, localização, e-mail, LinkedIn,
  resumo) e cria um `input/contact.json` inicial pra você completar depois.
- Se o `input/` já estiver totalmente configurado (não só os templates
  `.sample.json`), ele pula direto pra pergunta de gerar o output agora.
- Depois oferece rodar o `build-cv` e, em seguida, o `export-to-site`.

Não tem uma `ANTHROPIC_API_KEY`? Veja o `PROMPT_TO_TURN_CV_INTO_INPUT_FILES.md`
- um prompt para copiar e colar que funciona com qualquer chat de LLM
(ChatGPT, Claude, Gemini...) para gerar os mesmos arquivos `input/*.json` sem
chamar nenhuma API.

### Comandos manuais

```sh
npm run generate-input-for-cv -- /caminho/para/curriculo.pdf --languages pt,en
npm run build-cv
npm run export-to-site
```

### Arquivos de `input/`

| Arquivo | Obrigatório | Conteúdo |
|---|---|---|
| `contact.json` | sim | Nome, dados de contato, resumo profissional |
| `experiences.json` | sim | Array do histórico profissional - cada item aceita opcionalmente um `tag` (selo curto, ex: "3 Black Fridays") e um `highlight` (um feito de destaque, exibido como uma seção própria) |
| `stacks.json` | sim | Grupos de skills (label + lista de itens) |
| `education.json` | sim | Array do histórico de formação |
| `languages.json` | sim | Idiomas que o candidato fala, com nível - define em quais idiomas o documento será gerado |
| `homepage.json` | não | Textos exclusivos do site (hero, labels de navegação, títulos de seção) que não entram no PDF |
| `websiteonly.json` | não | Extras exclusivos do site: card de perfil, texto do rodapé, logos de empresas/ícones de cloud por experiência |

Todo campo de texto que não é independente de idioma (nomes, listas de
tecnologia, URLs) é escrito como um objeto com uma chave por idioma, ex.:
`{"pt": "...", "en": "..."}`.

Cada arquivo tem um `<nome>.sample.json` correspondente - o template que o
`build-cv` usa como fallback se o arquivo real ainda não existir. Copie um
sample para o nome real e edite, ou deixe o assistente/`generate-input-for-cv`
criar o arquivo real pra você.

### Templates

`templates/<nome>/template.tex` é o shell LaTeX compartilhado (comentários
indicam onde cada arquivo `input/*.json` entra); o `build-cv` gera um
`curriculo_<idioma>.tex` por idioma e compila os dois juntos. Adicione uma
nova pasta em `templates/` para oferecer mais de um design - o `build-cv` vai
perguntar qual usar quando houver mais de um.
