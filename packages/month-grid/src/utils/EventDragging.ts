import { EventClass } from '@full-event-calendar/shared-ts'
import { daysDiffInRange } from '@full-event-calendar/utils'
import { createSignal } from 'solid-js'

interface DraggingEventsDate {
  start: Date
  end: Date
  sourceStart: Date
  sourceEnd: Date
  id: any
  source: EventClass
}

export function useMonthEventDragging() {
  let startingDate: Date | null = null
  let currentDate: number | null = null
  const [draggingEventData, setDraggingEventData] = createSignal<null | DraggingEventsDate>(null)

  function onMouseEnter(date: Date) {
    if (!draggingEventData()) return
    if (startingDate) {
      let dayDifference = daysDiffInRange(startingDate, date)
      let dragCopy = { ...draggingEventData() } as DraggingEventsDate
      if (currentDate != dayDifference) {
        currentDate = dayDifference
        const startCopy = new Date(dragCopy.source.start)
        const endCopy = new Date(dragCopy.source.end)
        startCopy.setDate(dragCopy.source.start.getDate() + dayDifference)
        endCopy.setDate(dragCopy.source.end.getDate() + dayDifference)

        const SstartCopy = new Date(dragCopy.source.sourceEvent.start)
        const SendCopy = new Date(dragCopy.source.sourceEvent.end)
        SstartCopy.setDate(dragCopy.source.sourceEvent.start.getDate() + dayDifference)
        SendCopy.setDate(dragCopy.source.sourceEvent.end.getDate() + dayDifference)

        const monthDraggingDate = new MonthDraggingObject(
          dragCopy.source.id,
          startCopy,
          endCopy,
          SendCopy,
          SstartCopy,
          dragCopy.source
        )

        //make obj null first because solid cannot detect Date change !
        setDraggingEventData(null)
        setDraggingEventData(monthDraggingDate)
      }
    } else {
      startingDate = date
    }
  }

  function onDragStart(event: EventClass, startDate?: Date) {
    if (startDate) {
      startingDate = startDate
    }
    if (!draggingEventData()) {
      const draggingEventObject = new MonthDraggingObject(
        event.id,
        new Date(event.start),
        new Date(event.end),
        event.sourceEvent.end,
        event.sourceEvent.start,
        event
      )

      setDraggingEventData(draggingEventObject)
    }
  }

  function onDragEnd() {
    startingDate = null
    setDraggingEventData(null)
  }
  return { onDragEnd, onDragStart, onMouseEnter, draggingEventData }
}

class MonthDraggingObject {
  id: string
  start: Date
  end: Date
  source: EventClass
  color: string
  sourceStart: Date
  name: string
  sourceEnd: Date
  constructor(id: string, start: Date, end: Date, sourceEnd: Date, sourceStart: Date, source: EventClass) {
    this.id = id
    this.start = start
    this.end = end
    this.source = source
    this.color = source.color
    this.sourceStart = sourceStart
    this.sourceEnd = sourceEnd
    this.name = source.name
  }
}
