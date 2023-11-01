import { EventClass } from '@full-event-calendar/shared-ts'

export function getEventForAdate(events: EventClass[], targetDate: Date) {
  const filteredERvents = events.filter((event) => {
    const conditain1 = areDatesInTheSameDate(event.start, targetDate)
    const conditain2 = areDatesInTheSameDate(event.end, targetDate)
    return conditain1 || conditain2
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
