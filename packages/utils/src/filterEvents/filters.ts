import { EventClass } from "@full-event-calendar/shared-ts"

export function getEventsInDate(events: EventClass[], targetDate: Date) {
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
  
  export function sortEventByStart(events: EventClass[]) {
    return events.sort(function (a, b) {
      return new Date(a.start).valueOf() - new Date(b.start).valueOf()
    })
  }