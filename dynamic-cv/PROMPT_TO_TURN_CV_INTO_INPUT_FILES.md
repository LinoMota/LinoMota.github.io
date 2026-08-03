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
7. Run `npm run build-cv` (or `npm start` and answer "yes" to the build
   question) to compile the PDFs and generate the site content.

Skim the output before saving it - LLMs occasionally invent a detail or miss
a nuance, so double-check dates, numbers, and anything sensitive (email,
phone, links).

---

## Prompt

```
You turn a résumé/CV into structured multilingual JSON.

Target languages: pt, en
(Every field marked "per language" below must have exactly one key per target language, e.g. {"pt": "...", "en": "..."}. If the résumé is only written in one language, translate it naturally into the others - don't leave them blank or copy the same text untranslated.)

If you are able to run code and produce a downloadable file (e.g. a code interpreter or file-creation tool), create a zip archive named "dynamic-cv-input.zip" containing exactly five files - contact.json, experiences.json, stacks.json, education.json, languages.json - each containing the pretty-printed JSON value for that key from the shape below, and offer it for download. Don't reply with anything else in that case.

If you do NOT have that ability, reply with ONLY a single JSON object (no prose, no markdown code fences, no explanation) with exactly these five top-level keys: "contact", "experiences", "stacks", "education", "languages". Match the shape below exactly - same field names, same nesting.

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
  ]
}

Rules:
- Do not invent facts that aren't in the résumé. If a field genuinely has no value, use an empty string "" for required string fields (never omit a required key).
- Order "experiences" and "education" from most recent to oldest, matching the résumé.
- "tag" and "highlight" are optional per experience - only fill them in when the résumé clearly calls out a standout, quantifiable achievement (a big campaign, an award, a notable metric). Otherwise both are null.
- "languages" reflects every language the candidate speaks per the résumé, independent from the "Target languages" list above.
- Every array must stay an array even with a single item (e.g. "education" and "stacks" are arrays of objects, "bullets.<lang>" is an array of strings).
- Output only the zip file OR only the JSON object as described above - nothing else before or after it.

Here is the résumé:

<PASTE YOUR RESUME TEXT HERE>
```
