export function formatWeekDays(date: Date, calendar: string, timeZone: string, locale: string) {
  const D = new Date(date)
  return new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    calendar: calendar,
    timeZone: timeZone
  }).format(D)
}

export const formatDayNumber = (locale: string, calendar: string, timeZone: string, date: Date) => {
  const dateTimeFormat = Intl.DateTimeFormat(locale, {
    calendar: calendar,
    timeZone: timeZone
  })

  const parts = dateTimeFormat.formatToParts(date)
  const partValues = parts.filter((p) => p.type === 'day')
  return partValues[0].value
}
