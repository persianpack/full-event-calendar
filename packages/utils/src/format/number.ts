export function formatNumber(locale: string, number: number | string) {
  return new Intl.NumberFormat(locale).format(Number(number))
}
