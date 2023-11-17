import { EventClass } from '@full-event-calendar/shared-ts'
import { areDatesInTheSameDate } from '.'

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
  newDate.setMinutes(roundedMinutes)
  return newDate
}

export function isDateToday(date: Date) {
  return areDatesInTheSameDate(date, new Date())
}

export function isEventRightOrLeftOrNone(event: EventClass, initialDate: Date) {
  if (!event.isAllDay()) return 'month-item-no-allday'

  let flOWR = floorDate(initialDate)
  let Celi = ceilDate(initialDate)
  let isEndOver = !areDatesInTheSameDate(event.end, initialDate)
  let isStartOver = !areDatesInTheSameDate(event.start, initialDate)

  if (event.start < flOWR && event.end > Celi) {
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
    if (!event.isAllDay()) return 'month-item-no-allday'
  }

  let flOWR = floorDate(start)
  let Celi = ceilDate(end)

  let eventflOWR = floorDate(event.start)
  let eventCeli = ceilDate(event.end)

  if (event.start < flOWR && event.end > Celi) {
    return 'month-both-arrow'
  } else if (eventflOWR >= flOWR && eventCeli > Celi) {
    return 'month-right-arrow'
  } else if (eventflOWR <= flOWR && eventCeli < Celi) {
    return 'month-left-arrow'
  }
  return 'month-no-arrow'
}
