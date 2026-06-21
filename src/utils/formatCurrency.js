/**
 * Formats a number as Indian Rupee currency, e.g. 123456.7 -> "₹1,23,456.70"
 */
export function formatCurrency(value) {
  const number = Number(value) || 0
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number)
}

/**
 * Formats a plain number using Indian digit grouping, no currency symbol.
 */
export function formatNumber(value) {
  const number = Number(value) || 0
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number)
}
