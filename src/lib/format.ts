export function formatPrice(n: number): string {
  // minimumFractionDigits must be set explicitly: older ICU (e.g. the
  // Chromium react-snap prerenders with) defaults it to 2 for currency,
  // and min > max throws RangeError — blanking every prerendered page
  // that touches a price.
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatPsf(n: number): string {
  return `${formatPrice(n)}/sqft`;
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}
