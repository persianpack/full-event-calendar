import { EventClass } from '@full-event-calendar/shared-ts'

interface Event {
  start: Date
  end: Date
  // Other event properties
}
interface EventsProp extends Event {
  [key: string]: any
}

export const filterEventsByDateRange = (events: EventsProp[], startDate: Date, endDate: Date) => {
  const flooredStartDate = new Date(startDate)
  flooredStartDate.setHours(0, 0, 0)
  const CeildStartDate = new Date(endDate)
  CeildStartDate.setHours(23, 59, 59)
  return events.filter((event) => {
    const condition =
      (event.start >= flooredStartDate && event.start <= CeildStartDate) ||
      (event.end >= flooredStartDate && event.end <= CeildStartDate) ||
      (event.end >= CeildStartDate && event.start <= flooredStartDate)
    return condition
  })
}

export function isDateIncludedInaRange(date: EventClass, rangeStart: Date, rangeEnd: Date) {
  const flooredStart = new Date(rangeStart)
  const ceilEnd = new Date(rangeEnd)
  flooredStart.setHours(0, 0, 0)
  ceilEnd.setHours(23, 59, 59)

  return date.start < ceilEnd && date.end > flooredStart
}

export function daysDiffInRange(date1: Date, date2: Date) {
  const newF = new Date(new Date(date1))
  const secondF = new Date(new Date(date2))
  newF.setHours(0, 0, 0)
  secondF.setHours(0, 0, 0)
  //@ts-ignore
  return Math.round((secondF - newF) / (1000 * 60 * 60 * 24))
}
