/**
 * Formats a price in cents as a localised NZD currency string.
 *
 * @param cents - Price in cents (e.g. 1099)
 * @returns Formatted currency string (e.g. "NZ$10.99")
 */
export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('en-NZ', {
    style: 'currency',
    currency: 'NZD',
  }).format(cents / 100)
}

/**
 * Adds tax to a price based on the given tax rate.
 *
 * @param cents - Price in cents (e.g. 1099)
 * @param taxRate - Tax rate as a decimal (e.g. 0.15 for 15%)
 * @returns Price including Tax
 */
export function addTax(cents: number, taxRate: number): number {
  return Math.round(cents * (1 + taxRate))
}
