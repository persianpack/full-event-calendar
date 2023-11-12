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

export function sortEventByStart(events: EventClass[]) {
  return events.sort(function (a, b) {
    return new Date(a.start).valueOf() - new Date(b.start).valueOf()
  })
}

// export  function clickOutside(el:any, accessor:any) {
//   const onClick = (e:any) => !el.contains(e.target) && accessor()?.();
//   document.body.addEventListener("click", onClick);

//   onCleanup(() => document.body.removeEventListener("click", onClick));
// }
