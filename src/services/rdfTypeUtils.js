// Shared value-shape sniffing used by both RDFImporter and RDFExporter so
// import/export round-trips agree on what counts as a URI/date/WKT literal.

export function isURI(v) {
  if (typeof v !== 'string' || !v) return false
  try { return Boolean(new URL(v)) } catch { return false }
}

export function isDate(v) {
  return typeof v === 'string' && /^\d{4}-\d{2}-\d{2}/.test(v)
}

export function isWKT(v) {
  return typeof v === 'string' && /^(POLYGON|POINT|LINESTRING|MULTIPOLYGON|MULTIPOINT|MULTILINESTRING|GEOMETRYCOLLECTION)\s*\(/i.test(v.trim())
}
