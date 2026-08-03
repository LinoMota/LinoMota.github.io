function isLocalizedMap(node, knownCodes) {
  if (node == null || typeof node !== 'object' || Array.isArray(node)) return false
  const keys = Object.keys(node)
  if (keys.length === 0) return false
  // A localized map has ONLY language-code keys (e.g. {pt: ..., en: ...}).
  // Values can be strings OR arrays (e.g. bullets: {pt: [...], en: [...]}),
  // so don't restrict by value type here - just by the key set.
  return keys.every((k) => knownCodes.has(k))
}

export function resolveLocalized(node, lang, knownCodes) {
  if (Array.isArray(node)) {
    return node.map((item) => resolveLocalized(item, lang, knownCodes))
  }

  if (node != null && typeof node === 'object') {
    if (isLocalizedMap(node, knownCodes)) {
      if (node[lang] != null) return node[lang]
      const fallback = knownCodes.values().next().value
      return node[fallback] ?? Object.values(node)[0] ?? null
    }

    const out = {}
    for (const [key, value] of Object.entries(node)) {
      out[key] = resolveLocalized(value, lang, knownCodes)
    }
    return out
  }

  return node
}
