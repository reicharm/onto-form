/**
 * Named validator functions, referenced via "validate": "<name>" in UI config fields.
 *
 * Signature: (value, lang) => string[]
 * Return an empty array for valid, or localised error strings for invalid.
 *
 * Add new validators here and reference them by name in any UI config.
 * The same validator can be used across standards, or each standard can
 * use a different one for the same semantic field.
 */

export const fieldValidators = {

  isURI: (value, lang) => {
    if (!value) return []
    try { new URL(value); return [] }
    catch { return [lang === 'de' ? 'Ungültige URL.' : 'Invalid URL.'] }
  },

  isURIList: (value, lang) => {
    if (!Array.isArray(value)) return []
    const errors = []
    value.forEach((item, i) => {
      if (!item) return
      try { new URL(item) }
      catch {
        const label = lang === 'de' ? `Eintrag ${i + 1}` : `Entry ${i + 1}`
        errors.push(`${label}: ${lang === 'de' ? 'Ungültige URL' : 'Invalid URL'}`)
      }
    })
    return errors
  },

  isEmail: (value, lang) => {
    if (!value) return []
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ? []
      : [lang === 'de' ? 'Ungültige E-Mail-Adresse.' : 'Invalid email address.']
  },

  isDate: (value, lang) => {
    if (!value) return []
    return /^\d{4}-\d{2}-\d{2}$/.test(value)
      ? []
      : [lang === 'de' ? 'Ungültiges Datum (JJJJ-MM-TT).' : 'Invalid date (YYYY-MM-DD).']
  },

  isWKTorGeoJSON: (value, lang) => {
    if (!value) return []
    const trimmed = value.trim()
    const isWKT = /^(POINT|LINESTRING|POLYGON|MULTIPOINT|MULTILINESTRING|MULTIPOLYGON|GEOMETRYCOLLECTION)/i.test(trimmed)
    const isGeoJSON = trimmed.startsWith('{') && trimmed.includes('"type"')
    return isWKT || isGeoJSON
      ? []
      : [lang === 'de' ? 'Bitte WKT- oder GeoJSON-Geometrie eingeben.' : 'Please enter a WKT or GeoJSON geometry.']
  },

}
