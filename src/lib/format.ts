export function formatPrice(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatPsf(n: number): string {
  return `${formatPrice(n)}/sqft`;
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}
