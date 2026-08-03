// JSON Schema describing the structured output we ask Claude to produce
// when inferring resume data from an uploaded PDF. Mirrors the shape of
// input/{contact,experiences,stacks,education,languages}.sample.json.
//
// The schema is built per-request from the target language codes (e.g.
// ["pt","en"] or ["pt","en","es"]) so every bilingual/"multilingual" field
// requires exactly those languages - not a hardcoded pt/en pair.

function buildBilingual(languageCodes) {
  return {
    type: 'object',
    additionalProperties: false,
    required: [...languageCodes],
    properties: Object.fromEntries(languageCodes.map((code) => [code, { type: 'string' }])),
  }
}

function buildMultilingualStringArray(languageCodes) {
  return {
    type: 'object',
    additionalProperties: false,
    required: [...languageCodes],
    properties: Object.fromEntries(languageCodes.map((code) => [code, { type: 'array', items: { type: 'string' } }])),
  }
}

export function buildResumeSchema(languageCodes) {
  if (!Array.isArray(languageCodes) || languageCodes.length === 0) {
    throw new Error('buildResumeSchema needs at least one language code')
  }

  return {
    type: 'object',
    additionalProperties: false,
    required: ['contact', 'experiences', 'stacks', 'education', 'languages'],
    $defs: {
      bilingual: buildBilingual(languageCodes),
      bilingualNullable: {
        anyOf: [{ type: 'null' }, { $ref: '#/$defs/bilingual' }],
      },
      bulletsByLanguage: buildMultilingualStringArray(languageCodes),
    },
    properties: {
      contact: {
        type: 'object',
        additionalProperties: false,
        required: [
          'name',
          'jobTitle',
          'location',
          'phone',
          'email',
          'linkedin',
          'linkedinUrl',
          'github',
          'githubUrl',
          'summary',
        ],
        properties: {
          name: { type: 'string' },
          jobTitle: { $ref: '#/$defs/bilingual' },
          location: { $ref: '#/$defs/bilingual' },
          phone: { type: 'string' },
          email: { type: 'string' },
          linkedin: { type: 'string', description: 'LinkedIn handle/slug, e.g. "john-doe"' },
          linkedinUrl: { type: 'string' },
          github: { type: 'string', description: 'GitHub username' },
          githubUrl: { type: 'string' },
          summary: { $ref: '#/$defs/bilingual' },
        },
      },
      experiences: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          required: ['company', 'start', 'end', 'role', 'location', 'bullets', 'tech', 'tag', 'highlight'],
          properties: {
            company: { type: 'string' },
            start: { $ref: '#/$defs/bilingual' },
            end: {
              $ref: '#/$defs/bilingual',
              description: 'Use the equivalent of "Present" (in each language) for the current job.',
            },
            role: { $ref: '#/$defs/bilingual' },
            location: { $ref: '#/$defs/bilingual' },
            bullets: { $ref: '#/$defs/bulletsByLanguage' },
            tech: { type: 'array', items: { type: 'string' } },
            tag: {
              anyOf: [{ type: 'null' }, { type: 'string' }],
              description: 'Optional short highlight tag, e.g. "3 Black Fridays". Null if none applies.',
            },
            highlight: {
              $ref: '#/$defs/bilingualNullable',
              description: 'Optional standout achievement for this role. Null if none applies.',
            },
          },
        },
      },
      stacks: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          required: ['label', 'items'],
          properties: {
            label: { $ref: '#/$defs/bilingual', description: 'Category label, e.g. "Backend" / "Databases"' },
            items: { type: 'array', items: { type: 'string' } },
          },
        },
      },
      education: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          required: ['institution', 'start', 'end', 'degree', 'description'],
          properties: {
            institution: { $ref: '#/$defs/bilingual' },
            start: { $ref: '#/$defs/bilingual' },
            end: { $ref: '#/$defs/bilingual' },
            degree: { $ref: '#/$defs/bilingual' },
            description: { $ref: '#/$defs/bilingual' },
          },
        },
      },
      languages: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          required: ['code', 'label', 'level'],
          properties: {
            code: { type: 'string', description: 'ISO-ish short code, e.g. "pt", "en", "es"' },
            label: { $ref: '#/$defs/bilingual' },
            level: {
              $ref: '#/$defs/bilingual',
              description: 'Proficiency, e.g. "Nativo"/"Native", "Avancado"/"Advanced"',
            },
          },
        },
      },
    },
  }
}
