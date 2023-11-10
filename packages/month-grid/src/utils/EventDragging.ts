import { EventClass } from '@full-event-calendar/shared-ts'
import { daysDiffInRange } from '@full-event-calendar/utils'
import { createSignal } from 'solid-js'

interface DraggingEventsDate {
  start: Date
  end: Date
  id: any
  source: EventClass
}

export function useMonthEventDragging() {
  let draggingOnStartDate: Date | null = null
  let curretnDayre: number | null = null
  const [draggingEvent, setDraggingEvent] = createSignal<null | DraggingEventsDate>(null)

  function mousenedter(date: Date) {
    if (!draggingEvent()) return
    if (draggingOnStartDate) {
      let dayssDiff = daysDiffInRange(draggingOnStartDate, date)
      let dragCopy = { ...draggingEvent() } as DraggingEventsDate
      if (curretnDayre != dayssDiff) {
        curretnDayre = dayssDiff
        const startCopy = new Date(dragCopy.source.start)
        const endCopy = new Date(dragCopy.source.end)
        startCopy.setDate(dragCopy.source.start.getDate() + dayssDiff)
        endCopy.setDate(dragCopy.source.end.getDate() + dayssDiff)
        const copp = new MonthDraggingObject(dragCopy.source.id, startCopy, endCopy, dragCopy.source)

        //make obj null first because solid cannot detect Date change !
        setDraggingEvent(null)
        setDraggingEvent(copp)
      }
    } else {
      draggingOnStartDate = date
    }
  }

  function onEventDrag(event: EventClass, hasStartDate?: Date) {
    if (hasStartDate) {
      draggingOnStartDate = hasStartDate
    }
    if (!draggingEvent()) {
      const draggingEventObject = new MonthDraggingObject(event.id, new Date(event.start), new Date(event.end), event)
      setDraggingEvent(draggingEventObject)
    }
  }

  function dragEnd() {
    draggingOnStartDate = null
    setDraggingEvent(null)
  }
  return { dragEnd, onEventDrag, mousenedter, draggingEvent }
}

class MonthDraggingObject {
  id: string
  start: Date
  end: Date
  source: EventClass
  constructor(id: string, start: Date, end: Date, source: EventClass) {
    this.id = id
    this.start = start
    this.end = end
    this.source = source
  }
}
