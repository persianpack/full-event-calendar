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
  const [draggingEventData, setDraggingEventData] = createSignal<null | DraggingEventsDate>(null)

  function onMouseEnter(date: Date) {
    if (!draggingEventData()) return
    if (draggingOnStartDate) {
      let dayssDiff = daysDiffInRange(draggingOnStartDate, date)
      let dragCopy = { ...draggingEventData() } as DraggingEventsDate
      if (curretnDayre != dayssDiff) {
        curretnDayre = dayssDiff
        const startCopy = new Date(dragCopy.source.start)
        const endCopy = new Date(dragCopy.source.end)
        startCopy.setDate(dragCopy.source.start.getDate() + dayssDiff)
        endCopy.setDate(dragCopy.source.end.getDate() + dayssDiff)
        const copp = new MonthDraggingObject(dragCopy.source.id, startCopy, endCopy, dragCopy.source)

        //make obj null first because solid cannot detect Date change !
        setDraggingEventData(null)
        setDraggingEventData(copp)
      }
    } else {
      draggingOnStartDate = date
    }
  }

  function onDragStart(event: EventClass, hasStartDate?: Date) {
    if (hasStartDate) {
      draggingOnStartDate = hasStartDate
    }
    if (!draggingEventData()) {
      const draggingEventObject = new MonthDraggingObject(event.id, new Date(event.start), new Date(event.end), event)
      setDraggingEventData(draggingEventObject)
    }
  }

  function onDragEnd() {
    draggingOnStartDate = null
    setDraggingEventData(null)
  }
  return { onDragEnd, onDragStart, onMouseEnter, draggingEventData }
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
