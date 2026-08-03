// JSON Schemas describing the structured output we ask Claude to produce
// when inferring resume data from an uploaded PDF. Mirrors the shape of
// input/{contact,experiences,stacks,education,languages,homepage,websiteonly}.sample.json.
//
// Split into two schemas (and therefore two API calls) because a single
// schema covering all seven files makes the compiled structured-output
// grammar too large ("Simplify your tool schemas..." 400 error).
//
// Both schemas are built per-request from the target language codes (e.g.
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

// contact / experiences / stacks / education / languages - the actual résumé content.
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
      multilingualStringArray: buildMultilingualStringArray(languageCodes),
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
            bullets: { $ref: '#/$defs/multilingualStringArray' },
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

// homepage / websiteonly - bonus website-only content, inferred in a second,
// smaller call (using the already-inferred resume data as context) so the
// combined schema doesn't get too large for structured outputs.
export function buildSiteExtrasSchema(languageCodes) {
  if (!Array.isArray(languageCodes) || languageCodes.length === 0) {
    throw new Error('buildSiteExtrasSchema needs at least one language code')
  }

  return {
    type: 'object',
    additionalProperties: false,
    required: ['homepage', 'websiteonly'],
    $defs: {
      bilingual: buildBilingual(languageCodes),
      multilingualStringArray: buildMultilingualStringArray(languageCodes),
    },
    properties: {
      homepage: {
        type: 'object',
        additionalProperties: false,
        required: [
          'meta',
          'nav',
          'kicker',
          'welcome',
          'tagline',
          'speaks',
          'cta1',
          'cta2',
          'resumeLabel',
          'aboutHeading',
          'aboutParagraphs',
          'aboutStats',
          'experienceHeading',
          'experienceSub',
          'skillsHeading',
          'skillsSub',
          'languagesHeading',
          'contactHeading',
          'contactSub',
          'contactCta',
        ],
        properties: {
          meta: {
            type: 'object',
            additionalProperties: false,
            required: ['title', 'description'],
            properties: {
              title: { $ref: '#/$defs/bilingual', description: 'Browser tab title, e.g. "<Name> | Software Engineer"' },
              description: { $ref: '#/$defs/bilingual', description: 'One sentence for search engines/link previews' },
            },
          },
          nav: {
            type: 'object',
            additionalProperties: false,
            required: ['home', 'about', 'experience', 'skills', 'education', 'contact'],
            properties: {
              home: { $ref: '#/$defs/bilingual' },
              about: { $ref: '#/$defs/bilingual' },
              experience: { $ref: '#/$defs/bilingual' },
              skills: { $ref: '#/$defs/bilingual' },
              education: { $ref: '#/$defs/bilingual' },
              contact: { $ref: '#/$defs/bilingual' },
            },
          },
          kicker: { $ref: '#/$defs/bilingual' },
          welcome: { $ref: '#/$defs/multilingualStringArray', description: '1-2 short lines typed out on the homepage' },
          tagline: { $ref: '#/$defs/bilingual' },
          speaks: { $ref: '#/$defs/bilingual' },
          cta1: { $ref: '#/$defs/bilingual' },
          cta2: { $ref: '#/$defs/bilingual' },
          resumeLabel: { $ref: '#/$defs/bilingual' },
          aboutHeading: { $ref: '#/$defs/bilingual' },
          aboutParagraphs: {
            $ref: '#/$defs/multilingualStringArray',
            description: '2-3 first-person narrative paragraphs, more personality than the résumé summary',
          },
          aboutStats: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: false,
              required: ['value', 'label'],
              properties: {
                value: { type: 'string', description: 'e.g. "8+", "7", "20+" - not per language' },
                label: { $ref: '#/$defs/bilingual' },
              },
            },
          },
          experienceHeading: { $ref: '#/$defs/bilingual' },
          experienceSub: { $ref: '#/$defs/bilingual' },
          skillsHeading: { $ref: '#/$defs/bilingual' },
          skillsSub: { $ref: '#/$defs/bilingual' },
          languagesHeading: { $ref: '#/$defs/bilingual' },
          contactHeading: { $ref: '#/$defs/bilingual' },
          contactSub: { $ref: '#/$defs/bilingual' },
          contactCta: { $ref: '#/$defs/bilingual' },
        },
      },
      websiteonly: {
        type: 'object',
        additionalProperties: false,
        required: ['profileCard', 'resumeFiles', 'footer', 'companyLogos', 'companyClouds'],
        properties: {
          profileCard: {
            type: 'object',
            additionalProperties: false,
            required: ['avatarUrl', 'handle', 'iconUrl'],
            properties: {
              avatarUrl: { type: 'string', description: 'Always the placeholder "/profile.png"' },
              handle: { type: 'string' },
              iconUrl: { type: 'string', description: 'Always the placeholder "/assets/demo/iconpattern.png"' },
            },
          },
          resumeFiles: { $ref: '#/$defs/bilingual', description: 'e.g. {"pt": "./cv-pt.pdf", "en": "./cv-en.pdf"}' },
          footer: { $ref: '#/$defs/bilingual' },
          companyLogos: {
            type: 'object',
            additionalProperties: false,
            description: 'Always {} - no logo assets exist yet; the user fills this in by hand.',
          },
          companyClouds: {
            type: 'object',
            additionalProperties: false,
            description: 'Always {} - the user fills this in by hand if they want cloud-provider icons.',
          },
        },
      },
    },
  }
}
