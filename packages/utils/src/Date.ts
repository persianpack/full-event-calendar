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
  newDate.setMinutes(roundedMinutes, 0, 0)
  return newDate
}

export function isDateToday(date: Date) {
  return areDatesInTheSameDate(date, new Date())
}

function addZeroPadd(num: number) {
  return num < 10 ? `0${num}` : num
}

export function getEventTimeRange(event: EventClass) {
  return `${addZeroPadd(event.start.getHours())}:${addZeroPadd(event.start.getMinutes())} - ${addZeroPadd(
    event.end.getHours()
  )}:${addZeroPadd(event.end.getMinutes())}`
}
export function getDateTimeRange(start: Date, end: Date) {
  return `${addZeroPadd(start.getHours())}:${addZeroPadd(start.getMinutes())} - ${addZeroPadd(
    end.getHours()
  )}:${addZeroPadd(end.getMinutes())}`
}
