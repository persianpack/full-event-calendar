import { EventClass } from '@full-event-calendar/shared-ts'
import { areDatesInTheSameDate, ceilDate, floorDate } from '@full-event-calendar/utils'

export function isEventRightOrLeftOrNone(event: EventClass, initialDate: Date) {
  let flOWR = floorDate(initialDate)
  let Celi = ceilDate(initialDate)
  let isEndOver = !areDatesInTheSameDate(event.end, initialDate)
  let isStartOver = !areDatesInTheSameDate(event.start, initialDate)

  if (event.start < flOWR && event.end > Celi) {
    return 'both-arrow'
  } else if (isEndOver) {
    return 'right-arrow'
  } else if (isStartOver) {
    return 'left-arrow'
  }
  return ''
}
