import { EventClass } from '@full-event-calendar/shared-ts'
import { areDatesInTheSameDate } from '.'
import { textChangeRangeIsUnchanged } from 'typescript'

export function floorDate(date: Date) {
  const newDate = new Date(date)
  newDate.setHours(0, 0, 0)
  return newDate
}

export function ceilDate(date: Date) {
  const newDate = new Date(date)
  newDate.setHours(23, 59, 59)
  return newDate
}

export function roundMinutesToMultipleOf5(date: Date) {
  const roundedMinutes = Math.round(date.getMinutes() / 5) * 5
  const newDate = new Date(date)
  newDate.setMinutes(roundedMinutes, 0, 0)
  return newDate
}

export function isDateToday(date: Date) {
  return areDatesInTheSameDate(date, new Date())
}

export function isEventRightOrLeftOrNone(event: EventClass, initialDate: Date) {
  /// in case the event is a dragging object
  if (!event.isAllDay()) return 'month-item-no-all-day'

  let flOWR = floorDate(initialDate)
  let Ceil = ceilDate(initialDate)
  let isEndOver = !areDatesInTheSameDate(event.end, initialDate)
  let isStartOver = !areDatesInTheSameDate(event.start, initialDate)

  if (event.start < flOWR && event.end > Ceil) {
    return 'month-both-arrow'
  } else if (isEndOver) {
    return 'month-right-arrow'
  } else if (isStartOver) {
    return 'month-left-arrow'
  }
  return 'month-no-arrow'
}

export function isEventRightOrLeftOrNoneRange(event: EventClass, start: Date, end: Date) {
  if (event.isAllDay) {
    if (!event.isAllDay()) return 'month-item-no-all-day'
  }

  let flOWR = floorDate(start)
  let Ceil = ceilDate(end)

  // let floweredEvent = floorDate(event.start)
  // let eventCeil = ceilDate(event.end)
  let floweredEvent = event.start
  let eventCeil = event.end
  if (event.start < flOWR && event.end > Ceil) {
    return 'month-both-arrow'
  } else if (floweredEvent >= flOWR && eventCeil > Ceil) {
    return 'month-right-arrow'
  } else if (floweredEvent <= flOWR && eventCeil < Ceil) {
    return 'month-left-arrow'
  }
  return 'month-no-arrow'
}

function addZeroPadd(num: number) {
  return num < 10 ? `0${num}` : num
}

export function getEventTimeRange(event: EventClass) {
  return `${addZeroPadd(event.start.getHours())}:${addZeroPadd(event.start.getMinutes())} - ${addZeroPadd(
    event.end.getHours()
  )}:${addZeroPadd(event.end.getMinutes())}`
}
