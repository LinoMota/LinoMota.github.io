export function generateDocumentTex(templateSource, lang) {
  const marker = '% {{INPUT_CURRICULO}}'
  if (!templateSource.includes(marker)) {
    throw new Error(`Template is missing the ${marker} marker line.`)
  }
  return templateSource.replace(marker, `\\input{curriculo_${lang}.tex}`)
}
