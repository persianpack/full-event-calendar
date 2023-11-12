import { EventClass } from '@full-event-calendar/shared-ts'
import { areDatesInTheSameDate } from '@full-event-calendar/utils'

export function isEventRightOrLeftOrNone(event: EventClass, initialDate: Date) {
  let flOWR = new Date(initialDate)
  flOWR.setHours(0, 0, 0)
  let Celi = new Date(initialDate)
  Celi.setHours(23, 59, 59)
  let isEndOver = !areDatesInTheSameDate(event.end, initialDate)
  let isStartOver = !areDatesInTheSameDate(event.start, initialDate)
  if (event.id === 30) {
  }
  if (event.start < flOWR && event.end > Celi) {
    return 'both-arrow'
  } else if (isEndOver) {
    return 'right-arrow'
  } else if (isStartOver) {
    return 'left-arrow'
  }
  return ''
}
