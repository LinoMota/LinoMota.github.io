const ESCAPE_MAP = {
  '\\': '\\textbackslash{}',
  '&': '\\&',
  '%': '\\%',
  $: '\\$',
  '#': '\\#',
  _: '\\_',
  '{': '\\{',
  '}': '\\}',
  '~': '\\textasciitilde{}',
  '^': '\\textasciicircum{}',
}

const ESCAPE_RE = /[\\&%$#_{}~^]/g

export function escapeLatex(value) {
  if (value == null) return ''
  return String(value).replace(ESCAPE_RE, (ch) => ESCAPE_MAP[ch])
}
