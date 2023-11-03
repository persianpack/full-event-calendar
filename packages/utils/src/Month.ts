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

    const convertedDate = getDaysOfMonth(dataeCopy2, calendar)
    monthDays.push(convertedDate)
  }

  return monthDays
}

export const ArraysplitIntoChunks = <T extends any[]>(arr: T, chunkSize: number) => {
  let res = []

  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize)
    // do whatever
    res.push(chunk)
  }
  return res
}
