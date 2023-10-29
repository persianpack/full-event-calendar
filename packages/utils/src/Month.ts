function getDaysOfMonth(date: Date, calendar: string) {
  const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    calendar
  })
  let parts = dateTimeFormat.formatToParts(date)
  return { ...extractYMD(parts), date: new Date(date) }
}

function extractYMD(parts: Intl.DateTimeFormatPart[]) {
  let yaer
  let month
  let day

  for (let i = 0; i < parts.length; i++) {
    if (parts[i].type === 'year') {
      yaer = parts[i].value
    } else if (parts[i].type === 'month') {
      month = parts[i].value
    } else if (parts[i].type === 'day') {
      day = parts[i].value
    }
  }

  return { yaer, month, day }
}

function extractMonthsDays(date: Date, calendar: string) {
  let selectedDate = date
  const convertedDate = getDaysOfMonth(selectedDate, calendar)
  const monthDays = [convertedDate]

  let Month = Number(convertedDate.month)

  const dataeCopy0 = new Date(selectedDate)
  for (let i = 40; i > 0; i--) {
    dataeCopy0.setDate(dataeCopy0.getDate() - 1)
    const convertedDate = getDaysOfMonth(dataeCopy0, calendar)
    const MonthNumber = Number(convertedDate.month)
    if (Month === MonthNumber) {
      monthDays.unshift(convertedDate)
    } else {
      break
    }
  }

  const dataeCopy = new Date(selectedDate)

  for (let i = 0; i < 40; i++) {
    dataeCopy.setDate(dataeCopy.getDate() + 1)
    const convertedDate = getDaysOfMonth(dataeCopy, calendar)
    const MonthNumber = Number(convertedDate.month)
    if (Month === MonthNumber) {
      monthDays.push(convertedDate)
    } else {
      break
    }
  }
  return monthDays
}

export function getCalendarMonthDays(date: Date, calendar: string) {
  const monthDays = extractMonthsDays(date, calendar)
  const WeekDay = monthDays[0].date.getDay()
  const dataeCopy = new Date(monthDays[0].date)

  for (let i = WeekDay; i > 0; i--) {
    dataeCopy.setDate(dataeCopy.getDate() - 1)
    const convertedDate = getDaysOfMonth(dataeCopy, calendar)
    monthDays.unshift(convertedDate)
  }
  const dataeCopy2 = new Date(monthDays[monthDays.length - 1].date)
  const weeek2 = dataeCopy2.getDay()
  for (let i = 0; i < 6 - weeek2; i++) {
    dataeCopy2.setDate(dataeCopy2.getDate() + 1)
    console.log()
    const convertedDate = getDaysOfMonth(dataeCopy2, calendar)
    monthDays.push(convertedDate)
  }

  return monthDays
}
