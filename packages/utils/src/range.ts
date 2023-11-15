import { EventClass } from '@full-event-calendar/shared-ts'
import { ceilDate, floorDate } from '.'

interface Event {
  start: Date
  end: Date
  // Other event properties
}
interface EventsProp extends Event {
  [key: string]: any
}

export const filterEventsByDateRange = (events: EventsProp[], startDate: Date, endDate: Date) => {
  const flooredStartDate = floorDate(startDate)
  const CeildStartDate = ceilDate(endDate)
  return events.filter((event) => {
    const condition =
      (event.start >= flooredStartDate && event.start <= CeildStartDate) ||
      (event.end >= flooredStartDate && event.end <= CeildStartDate) ||
      (event.end >= CeildStartDate && event.start <= flooredStartDate)
    return condition
  })
}

export function isDateIncludedInaRange(date: EventClass, rangeStart: Date, rangeEnd: Date) {
  const flooredStart = floorDate(rangeStart)
  const ceilEnd = ceilDate(rangeEnd)
  return date.start < ceilEnd && date.end > flooredStart
}

export function daysDiffInRange(date1: Date, date2: Date) {
  const newF = floorDate(date1)
  const secondF = floorDate(date2)
  //@ts-ignore
  return Math.round((secondF - newF) / (1000 * 60 * 60 * 24))
}
