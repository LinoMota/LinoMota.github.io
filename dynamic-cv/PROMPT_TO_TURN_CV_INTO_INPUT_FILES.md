# Prompt: Turn a résumé into dynamic-cv's `input/*.json` files

This is a copy-paste prompt for turning a résumé/CV into the JSON files that
`dynamic-cv` consumes from `input/`. It's meant for when you **don't** want to
use `npm run generate-input-for-cv` (which calls the Claude API directly) -
instead you paste this prompt plus your résumé text into **any** LLM chat
(ChatGPT, Claude, Gemini, etc.) and copy the JSON it gives back.

## How to use it (with any LLM)

1. Open a chat with any LLM that can handle a long prompt (ChatGPT, Claude,
   Gemini, Copilot Chat, etc.).
2. Copy the whole "Prompt" section below.
3. At the bottom, where it says `<PASTE YOUR RESUME TEXT HERE>`, paste the
   text of your résumé. If your résumé is a PDF, open it and copy/paste the
   text (or upload the PDF directly if the chat supports file uploads and
   attach it instead of pasting text - either works).
4. If you want document languages other than Portuguese/English, edit the
   `Target languages` line before sending.
5. Send it. If the model can run code / create downloadable files (e.g.
   ChatGPT's Code Interpreter, Claude with code execution), it will offer a
   `dynamic-cv-input.zip` to download - grab it and unzip its contents
   directly into `dynamic-cv/input/`, done. Otherwise it will just reply with
   a single JSON object in the chat - see step 6.
6. If you got a JSON object instead of a zip: copy each top-level key's value
   into its own file under `dynamic-cv/input/`:
   - `contact` → `input/contact.json`
   - `experiences` → `input/experiences.json`
   - `stacks` → `input/stacks.json`
   - `education` → `input/education.json`
   - `languages` → `input/languages.json`
   - `homepage` → `input/homepage.json`
   - `websiteonly` → `input/websiteonly.json`
7. Run `npm run build-cv` (or `npm start` and answer "yes" to the build
   question) to compile the PDFs and generate the site content.

Skim the output before saving it - LLMs occasionally invent a detail or miss
a nuance, so double-check dates, numbers, and anything sensitive (email,
phone, links). `homepage`/`websiteonly` are website-only (they don't affect
the PDF) - expect to touch these up a bit, especially `websiteonly`'s asset
paths (see the rules below).

---

## Prompt

```
You turn a résumé/CV into structured multilingual JSON.

Target languages: pt, en
(Every field marked "per language" below must have exactly one key per target language, e.g. {"pt": "...", "en": "..."}. If the résumé is only written in one language, translate it naturally into the others - don't leave them blank or copy the same text untranslated.)

If you are able to run code and produce a downloadable file (e.g. a code interpreter or file-creation tool), create a zip archive named "dynamic-cv-input.zip" containing exactly seven files - contact.json, experiences.json, stacks.json, education.json, languages.json, homepage.json, websiteonly.json - each containing the pretty-printed JSON value for that key from the shape below, and offer it for download. Don't reply with anything else in that case.

If you do NOT have that ability, reply with ONLY a single JSON object (no prose, no markdown code fences, no explanation) with exactly these seven top-level keys: "contact", "experiences", "stacks", "education", "languages", "homepage", "websiteonly". Match the shape below exactly - same field names, same nesting.

{
  "contact": {
    "name": "string, the person's full name (not per language)",
    "jobTitle": "per language - current role/headline, e.g. Senior Backend Engineer",
    "location": "per language - city, state/region, country",
    "phone": "string, phone number or empty string if not present",
    "email": "string",
    "linkedin": "string, display form e.g. linkedin.com/in/username",
    "linkedinUrl": "string, full https URL",
    "github": "string, display form e.g. github.com/username (empty string if none)",
    "githubUrl": "string, full https URL (empty string if none)",
    "summary": "per language - a 2-4 sentence professional summary"
  },
  "experiences": [
    {
      "company": "string, company name (not per language)",
      "start": "per language - e.g. {\"pt\": \"Out 2025\", \"en\": \"Oct 2025\"}",
      "end": "per language - use the local word for \"Present\" for the current job, e.g. {\"pt\": \"Presente\", \"en\": \"Present\"}",
      "role": "per language - job title held at this company",
      "location": "per language - e.g. Remote/Remoto, or city/state/country",
      "bullets": "per language - each an ARRAY of strings, one accomplishment per bullet, rewritten for clarity (not copy-pasted PDF line breaks)",
      "tech": ["array of strings, technology/tool names used, NOT per language"],
      "tag": "string or null - OPTIONAL short badge only when the résumé calls out a standout achievement, e.g. \"3 Black Fridays\". null if nothing applies.",
      "highlight": "per language, or null - OPTIONAL one-sentence standout achievement for this role (rendered as its own highlighted callout). null if nothing applies."
    }
  ],
  "stacks": [
    {
      "label": "per language - category name, e.g. Languages/Linguagens, Frameworks, Databases, Cloud & DevOps",
      "items": ["array of strings, NOT per language, e.g. Java, TypeScript, AWS"]
    }
  ],
  "education": [
    {
      "institution": "per language - school/university name",
      "start": "per language - e.g. Jan 2018",
      "end": "per language - e.g. Dec 2023",
      "degree": "per language - degree name",
      "description": "per language - 1-2 sentences about the program's focus"
    }
  ],
  "languages": [
    {
      "code": "short code for a language the candidate SPEAKS, e.g. pt, en, es - this can include languages beyond the target document languages above",
      "label": "per language - the language's name, e.g. {\"pt\": \"Português\", \"en\": \"Portuguese\"}",
      "level": "per language - proficiency, e.g. {\"pt\": \"Nativo\", \"en\": \"Native\"}"
    }
  ],
  "homepage": {
    "meta": {
      "title": "per language - browser tab title, e.g. \"<Name> | Software Engineer\"",
      "description": "per language - one sentence, for search engines/link previews, summarizing who this is and what they do"
    },
    "nav": {
      "home": "per language - nav label, e.g. Home/Início",
      "about": "per language - e.g. Story/História",
      "experience": "per language - e.g. Experience/Experiência",
      "skills": "per language - e.g. Skills",
      "education": "per language - e.g. Education/Formação",
      "contact": "per language - e.g. Contact/Contato"
    },
    "kicker": "per language - short line above the hero heading, usually the job title again",
    "welcome": "per language - each an ARRAY of 1-2 short strings, typed out on the homepage, e.g. [\"Welcome!\", \"This is my portfolio site.\"]",
    "tagline": "per language - 1-2 sentence hero pitch (can reuse/shorten contact.summary)",
    "speaks": "per language - short label before the spoken-languages list, e.g. \"I speak\"/\"Eu falo\"",
    "cta1": "per language - primary button label, e.g. \"View experience\"",
    "cta2": "per language - secondary button label, e.g. \"Get in touch\"",
    "resumeLabel": "per language - label for the résumé download button, e.g. \"Download résumé (PDF)\"",
    "aboutHeading": "per language - e.g. \"About me\"/\"Sobre mim\"",
    "aboutParagraphs": "per language - each an ARRAY of 2-3 first-person narrative paragraphs about the candidate's background (expand on contact.summary, don't just repeat it verbatim)",
    "aboutStats": [
      { "value": "string, NOT per language, e.g. \"8+\", \"7\", \"20+\"", "label": "per language - what the number counts, e.g. \"years of experience\", \"companies\", \"technologies\"" }
    ],
    "experienceHeading": "per language - e.g. \"Experience\"",
    "experienceSub": "per language - one sentence under the experience heading",
    "skillsHeading": "per language - e.g. \"Technical skills\"",
    "skillsSub": "per language - one sentence under the skills heading",
    "languagesHeading": "per language - e.g. \"Languages\"",
    "contactHeading": "per language - e.g. \"Let's talk\"",
    "contactSub": "per language - one sentence inviting contact",
    "contactCta": "per language - contact button label, e.g. \"Send an email\""
  },
  "websiteonly": {
    "profileCard": {
      "avatarUrl": "string, NOT per language - leave as \"/profile.png\" as a placeholder; the user will add their own photo at that path",
      "handle": "string, NOT per language - a short handle, e.g. GitHub username",
      "iconUrl": "string, NOT per language - leave as \"/assets/demo/iconpattern.png\" as a placeholder"
    },
    "resumeFiles": "per language - e.g. {\"pt\": \"./cv-pt.pdf\", \"en\": \"./cv-en.pdf\"} (match the target languages)",
    "footer": "per language - short footer line, e.g. \"Built with React, Three.js and a lot of coffee.\"",
    "companyLogos": "object, NOT per language - leave as {} (empty). It would map each \"experiences[].company\" value to a logo image path, but you don't have logo files to point to - the user fills this in by hand.",
    "companyClouds": "object, NOT per language - leave as {} (empty) unless the résumé text explicitly names a cloud provider (aws/gcp/azure/kubernetes) for a given company, in which case map that \"experiences[].company\" value to an array of provider keys, e.g. {\"Acme Corp\": [\"aws\"]}"
  }
}

Rules:
- Do not invent facts that aren't in the résumé. If a field genuinely has no value, use an empty string "" for required string fields (never omit a required key).
- Order "experiences" and "education" from most recent to oldest, matching the résumé.
- "tag" and "highlight" are optional per experience - only fill them in when the résumé clearly calls out a standout, quantifiable achievement (a big campaign, an award, a notable metric). Otherwise both are null.
- "languages" reflects every language the candidate speaks per the résumé, independent from the "Target languages" list above.
- "homepage" and "websiteonly" are website-only content - they are never used to generate the PDF, only the site. Keep them consistent with "contact"/"experiences" (same name, same companies) but feel free to write "aboutParagraphs" and "tagline" with more personality than the formal résumé summary.
- "websiteonly.companyLogos" and "websiteonly.profileCard" reference image files that don't exist yet - use the placeholders described above rather than guessing a path, and leave a mental note that the user needs to add those asset files themselves.
- Every array must stay an array even with a single item (e.g. "education" and "stacks" are arrays of objects, "bullets.<lang>" is an array of strings, "homepage.welcome"/"homepage.aboutParagraphs" are arrays of strings per language).
- Output only the zip file OR only the JSON object as described above - nothing else before or after it.

Here is the résumé:

<PASTE YOUR RESUME TEXT HERE>
```
