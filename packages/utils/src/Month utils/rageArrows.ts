import { EventClass } from "@full-event-calendar/shared-ts"
import { areDatesInTheSameDate, ceilDate, floorDate } from ".."

export function rightOrLeftInDate(event: EventClass, initialDate: Date) {
    /// in case the event is a dragging object
    if (!event.isAllDay()) return 'fec-month-item-no-all-day'
  
    let flOWR = floorDate(initialDate)
    let Ceil = ceilDate(initialDate)
    let isEndOver = !areDatesInTheSameDate(event.end, initialDate)
    let isStartOver = !areDatesInTheSameDate(event.start, initialDate)
  
    if (event.start < flOWR && event.end > Ceil) {
      return 'fec-month-both-arrow'
    } else if (isEndOver) {
      return 'fec-month-right-arrow'
    } else if (isStartOver) {
      return 'fec-month-left-arrow'
    }
    return 'month-no-arrow'
  }
  
  export function rightOrLeftInDateInRange(event: EventClass, start: Date, end: Date) {
    if (event.isAllDay) {
      if (!event.isAllDay()) return 'fec-month-item-no-all-day'
    }
  
    let flOWR = floorDate(start)
    let Ceil = ceilDate(end)
  
    // let floweredEvent = floorDate(event.start)
    // let eventCeil = ceilDate(event.end)
    let floweredEvent = event.start
    let eventCeil = event.end
    if (event.start < flOWR && event.end > Ceil) {
      return 'fec-month-both-arrow'
    } else if (floweredEvent >= flOWR && eventCeil > Ceil) {
      return 'fec-month-right-arrow'
    } else if (floweredEvent < flOWR && eventCeil < Ceil) {
      return 'fec-month-left-arrow'
    }
    return 'month-no-arrow'
  }