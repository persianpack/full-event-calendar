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

export function isDateIncludedInaRange(date: EventClass, rangeStart: Date, rangeEnd: Date) {
  return date.start < rangeEnd && date.end > rangeStart
}

export function daysDiffInRange(date1: Date, date2: Date) {
  const newF = new Date(new Date(date1).setHours(0, 0, 0))
  const secondF = new Date(new Date(date2).setHours(0, 0, 0))
  //@ts-ignore
  return Math.round((secondF - newF) / (1000 * 60 * 60 * 24))
}

// export  function clickOutside(el:any, accessor:any) {
//   const onClick = (e:any) => !el.contains(e.target) && accessor()?.();
//   document.body.addEventListener("click", onClick);

//   onCleanup(() => document.body.removeEventListener("click", onClick));
// }
