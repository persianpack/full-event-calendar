import { EventClass } from '@full-event-calendar/shared-ts'
import { areDatesInTheSameDate, formatNumber } from '.'

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

function addZeroPadd(locale:string,num: number) {
  return num < 10 ? formatNumber(locale,'0') + `${formatNumber(locale,num)}` : formatNumber(locale,num)
}

export function getEventTimeRange(event: EventClass,locale:string) {
  return `${addZeroPadd(locale,event.start.getHours())}:${addZeroPadd(locale,event.start.getMinutes())} - ${addZeroPadd(locale,
    event.end.getHours()
  )}:${addZeroPadd(locale,event.end.getMinutes())}`
}
export function getDateTimeRange(start: Date, end: Date,locale:string) {
  return `${addZeroPadd(locale,start.getHours())}:${addZeroPadd(locale,start.getMinutes())} - ${addZeroPadd(locale,
    end.getHours()
  )}:${addZeroPadd(locale,end.getMinutes())}`
}
