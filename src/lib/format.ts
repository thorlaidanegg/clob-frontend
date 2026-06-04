/**
 * Formatting helpers. The API sends money as decimal strings and a few config
 * fields as raw integers at a precision — these keep display exact and aligned.
 */

/** Parse a decimal string to a JS number for charts/sorting only (never for money math). */
export function toNum(s: string | number | null | undefined): number {
  if (s === null || s === undefined) return 0
  const n = typeof s === 'number' ? s : Number(s)
  return Number.isFinite(n) ? n : 0
}

/** A raw integer at `precision` → decimal string, e.g. (1, 2) -> "0.01". */
export function rawToDecimal(raw: number, precision: number): string {
  if (precision <= 0) return String(raw)
  const neg = raw < 0
  const digits = Math.abs(raw).toString().padStart(precision + 1, '0')
  const whole = digits.slice(0, digits.length - precision)
  const frac = digits.slice(digits.length - precision)
  return `${neg ? '-' : ''}${whole}.${frac}`
}

/** Format a decimal string to a fixed number of places (display only). */
export function formatDecimal(s: string | number, places: number): string {
  return toNum(s).toLocaleString('en-US', {
    minimumFractionDigits: places,
    maximumFractionDigits: places,
  })
}

/** Compact price for tickers (keeps the market's precision when known). */
export function formatPrice(s: string | number, pricePrecision = 2): string {
  return formatDecimal(s, pricePrecision)
}

/** Signed PnL with a leading +/- and color hint. */
export function formatSigned(s: string | number, places = 2): string {
  const n = toNum(s)
  const sign = n > 0 ? '+' : ''
  return `${sign}${n.toLocaleString('en-US', { minimumFractionDigits: places, maximumFractionDigits: places })}`
}

/** A percentage from a ratio (0.0123 -> "+1.23%"). */
export function formatPct(ratio: number, places = 2): string {
  const sign = ratio > 0 ? '+' : ''
  return `${sign}${(ratio * 100).toFixed(places)}%`
}

/** "up" | "down" | "flat" sign class key for a numeric value. */
export function signOf(s: string | number): 'up' | 'down' | 'flat' {
  const n = toNum(s)
  return n > 0 ? 'up' : n < 0 ? 'down' : 'flat'
}

/** Fee rate raw (precision 4) to a readable percent, e.g. 30 -> "0.30%". */
export function feeRateToPct(raw: number): string {
  return `${(raw / 100).toFixed(2)}%`
}

const KEY_TIME = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' })
export function formatTime(iso: string | null | undefined): string {
  if (!iso) return '—'
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? '—' : KEY_TIME.format(d)
}
