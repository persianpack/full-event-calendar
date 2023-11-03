import { EventClass } from '@full-event-calendar/shared-ts'

export function getEventForAdate(events: EventClass[], targetDate: Date) {
  const filteredERvents = events.filter((event) => {
    return (
      areDatesInTheSameDate(event.start, targetDate) ||
      areDatesInTheSameDate(event.end, targetDate) ||
      (event.start < targetDate && event.end > targetDate)
    )
  })
  return filteredERvents
}

export function areDatesInTheSameDate(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

interface Event {
  start: Date
  end: Date
  // Other event properties
}
interface EventsProp extends Event {
  [key: string]: any
}

export const filterEventsByDateRange = (events: EventsProp[], startDate: Date, endDate: Date) => {
  const flooredStartDate = new Date(startDate.setHours(0, 0, 0))
  const CeildStartDate = new Date(endDate.setHours(23, 59, 59))
  return events.filter((event) => {
    const condition =
      (event.start >= flooredStartDate && event.start <= CeildStartDate) ||
      (event.end >= flooredStartDate && event.end <= CeildStartDate) ||
      (event.end >= CeildStartDate && event.start <= flooredStartDate)
    return condition
  })
}
