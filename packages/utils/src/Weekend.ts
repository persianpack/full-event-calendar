export function formatWeekDays(date: Date, calendar: string, timeZone: string, locale: string) {
  const D = new Date(date)
  return new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    calendar: calendar,
    timeZone: timeZone
  }).format(D)
}
