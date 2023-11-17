import { EventClass } from '@full-event-calendar/shared-ts'
import { areDatesInTheSameDate, ceilDate, floorDate } from '@full-event-calendar/utils'
import { createMemo } from 'solid-js'

export function getLeftPosition(event: EventClass, weekStartDate: Date) {
  const floorWeekStart = floorDate(weekStartDate)
  if (event.start >= floorWeekStart) {
    return event.start.getDay()
  }
  return 0
}

export function getendPosition(event: EventClass, weekendDate: Date, start: number) {
  const floorWeEend = ceilDate(weekendDate)
  if (event.end <= floorWeEend) {
    return event.end.getDay() - start + 1
  }
  return 6 - start + 1
}

export function leftArrowClass(event: EventClass, weekStartDate: Date, leftArrowClass: boolean) {
  const floorWeekStart = floorDate(weekStartDate)
  if (event.start < floorWeekStart) {
    if (leftArrowClass) {
      return 'clip-path: polygon(100% 0, 10px 0, 0px 50%, 10px 100%, 100% 100%);'
    } else {
      return 'border-top-left-radius:0px;border-bottom-left-radius:0px;left:1px'
    }
  } else {
    return ''
  }
}

export function rightArrowClass(event: EventClass, weekendDate: Date) {
  const floorWeEend = ceilDate(weekendDate)
  return event.end > floorWeEend
}

interface eventRows {
  [key: string]: EventClass[]
}

export function getExtraRows(eventRows: eventRows, weekStartDate: Date, weekendDate: Date, rowLimit: number) {
  let rowExtrasCount = [0, 0, 0, 0, 0, 0, 0]
  const arr = Object.keys(eventRows).filter((item, i) => {
    return i + 1 > rowLimit
  })

  for (let index = 0; index < arr.length; index++) {
    const events = eventRows[arr[index]]
    // console.log(events)
    for (let j = 0; j < events.length; j++) {
      const event = events[j]
      const leftP = createMemo(() => getLeftPosition(event, weekStartDate))
      const widthh = getendPosition(event, weekendDate, leftP())
      for (let k = leftP(); k < widthh + leftP(); k++) {
        rowExtrasCount[k] = rowExtrasCount[k] + 1
      }
    }
  }

  return rowExtrasCount
}
