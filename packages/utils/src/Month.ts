function getDaysOfMonth(date: Date, calendar: string) {
  const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    calendar
  })
  let parts = dateTimeFormat.formatToParts(date)
  return { ...extractYMD(parts), date: new Date(date), isOutCalendarMonth: false }
}

export function extractYMD(parts: Intl.DateTimeFormatPart[]) {
  let year
  let month
  let day
  for (let i = 0; i < parts.length; i++) {
    //@ts-ignore
    if (parts[i].type === 'year' || parts[i].type === 'relatedYear') {
      year = parts[i].value
    } else if (parts[i].type === 'month') {
      month = parts[i].value
    } else if (parts[i].type === 'day') {
      day = parts[i].value
    }
  }

  return { year, month, day }
}

function extractMonthsDays(date: Date, calendar: string) {
  let selectedDate = date
  const convertedDate = getDaysOfMonth(selectedDate, calendar)
  const monthDays = [convertedDate]

  let Month = Number(convertedDate.month)

  const dataCopy = new Date(selectedDate)
  for (let i = 40; i > 0; i--) {
    dataCopy.setDate(dataCopy.getDate() - 1)
    const convertedDate = getDaysOfMonth(dataCopy, calendar)
    const MonthNumber = Number(convertedDate.month)
    if (Month === MonthNumber) {
      monthDays.unshift(convertedDate)
    } else {
      break
    }
  }

  const selectedDataCopy = new Date(selectedDate)

  for (let i = 0; i < 40; i++) {
    selectedDataCopy.setDate(selectedDataCopy.getDate() + 1)
    const convertedDate = getDaysOfMonth(selectedDataCopy, calendar)
    const MonthNumber = Number(convertedDate.month)
    if (Month === MonthNumber) {
      monthDays.push(convertedDate)
    } else {
      break
    }
  }
  return monthDays
}

export function getCalendarMonthDays(date: Date, calendar: string = 'gregory') {
  const monthDays = extractMonthsDays(date, calendar)
  const WeekDay = monthDays[0].date.getDay()
  const selectedDataCopy = new Date(monthDays[0].date)

  for (let i = WeekDay; i > 0; i--) {
    selectedDataCopy.setDate(selectedDataCopy.getDate() - 1)
    const convertedDate = getDaysOfMonth(selectedDataCopy, calendar)
    monthDays.unshift({ ...convertedDate, isOutCalendarMonth: true })
  }
  const dataCopy2 = new Date(monthDays[monthDays.length - 1].date)
  const weekend = dataCopy2.getDay()
  for (let i = 0; i < 6 - weekend; i++) {
    dataCopy2.setDate(dataCopy2.getDate() + 1)

    const convertedDate = getDaysOfMonth(dataCopy2, calendar)
    monthDays.push({ ...convertedDate, isOutCalendarMonth: true })
  }

  return monthDays
}

export function getMonthName(calendar: string, date: Date, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    calendar: calendar
  }).format(date)
}
