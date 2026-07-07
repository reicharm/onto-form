export function resolveLangValue(val, lang) {
  if (!val) return ''
  if (typeof val === 'string') return val
  if (Array.isArray(val)) {
    const match = val.find(v => v.lang === lang)
    return (match || val[0])?.value || ''
  }
  if (typeof val === 'object') {
    return val[lang] || val.de || val.en || Object.values(val)[0] || ''
  }
  return String(val)
}
