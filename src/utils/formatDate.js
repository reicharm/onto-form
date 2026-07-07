export function formatDate(val, lang) {
  if (!val) return ''
  try {
    const d = new Date(val)
    if (isNaN(d.getTime())) return val
    const locale = lang === 'de' ? 'de-AT' : 'en-GB'
    return d.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })
  } catch {
    return val
  }
}
