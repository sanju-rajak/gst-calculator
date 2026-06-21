/**
 * gstCalculations.js
 * ------------------------------------------------------------------
 * Pure, framework-free GST math. Kept separate from components so the
 * calculation logic can be unit tested and reused (e.g. in a future
 * API route or CLI) without touching any React code.
 * ------------------------------------------------------------------
 */

export const GST_RATES = [5, 12, 18, 28]
export const DEFAULT_RATE = 18

export const CALCULATION_MODES = {
  EXCLUSIVE: 'exclusive', // amount entered = base price -> add GST on top
  INCLUSIVE: 'inclusive', // amount entered = total price -> GST already inside, reverse it out
}

/**
 * Rounds a value to 2 decimal places while avoiding common
 * floating point artefacts (e.g. 1.005 -> 1.0049999...).
 */
export function roundCurrency(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100
}

/**
 * Validates a raw amount string/number coming from the input field.
 * Returns a human-readable error message, or null when the value is valid.
 */
export function validateAmount(rawValue) {
  if (rawValue === '' || rawValue === null || rawValue === undefined) {
    return 'Enter an amount to calculate GST.'
  }

  const value = Number(rawValue)

  if (Number.isNaN(value)) {
    return 'Amount must be a valid number.'
  }
  if (value <= 0) {
    return 'Amount must be greater than zero.'
  }
  if (value > 999_999_999) {
    return 'Amount is too large. Enter a value under 1,00,00,00,000.'
  }
  return null
}

/**
 * Validates the selected GST rate.
 */
export function validateRate(rate) {
  if (!GST_RATES.includes(Number(rate))) {
    return 'Select a valid GST rate.'
  }
  return null
}

/**
 * Core calculation.
 *
 * EXCLUSIVE (Add GST):
 *   baseAmount  = amount entered
 *   gstAmount   = baseAmount * rate / 100
 *   totalAmount = baseAmount + gstAmount
 *
 * INCLUSIVE (Remove / Reverse GST):
 *   totalAmount = amount entered (GST already included)
 *   baseAmount  = totalAmount * 100 / (100 + rate)
 *   gstAmount   = totalAmount - baseAmount
 *
 * CGST / SGST: for an intra-state supply, GST is split equally between
 * Central GST and State GST. (For an inter-state supply the full amount
 * is charged as IGST instead — shown alongside the split for reference.)
 */
export function calculateGST(amount, rate, mode = CALCULATION_MODES.EXCLUSIVE) {
  const amountError = validateAmount(amount)
  const rateError = validateRate(rate)
  if (amountError || rateError) {
    throw new Error(amountError || rateError)
  }

  const numericAmount = Number(amount)
  const numericRate = Number(rate)

  let baseAmount
  let totalAmount

  if (mode === CALCULATION_MODES.INCLUSIVE) {
    baseAmount = (numericAmount * 100) / (100 + numericRate)
    totalAmount = numericAmount
  } else {
    baseAmount = numericAmount
    totalAmount = numericAmount + (numericAmount * numericRate) / 100
  }

  const gstAmount = totalAmount - baseAmount
  const cgst = gstAmount / 2
  const sgst = gstAmount / 2

  return {
    rate: numericRate,
    mode,
    baseAmount: roundCurrency(baseAmount),
    gstAmount: roundCurrency(gstAmount),
    totalAmount: roundCurrency(totalAmount),
    cgst: roundCurrency(cgst),
    sgst: roundCurrency(sgst),
    igst: roundCurrency(gstAmount),
  }
}
