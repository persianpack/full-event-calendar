import { EventClass } from '@full-event-calendar/shared-ts'
import { NewDraggingController, daysDiffInRange } from '@full-event-calendar/utils'
import { createSignal } from 'solid-js'

export function useMonthEventDragging() {

  let startingDate: Date | null = null
  let currentDate: number | null = null

  const [draggingEventData, setDraggingEventData] = createSignal<null | NewDraggingController>(null)

  let draggingController:NewDraggingController|null = null
  
  function onDragStart(event: EventClass,mouseEvent:MouseEvent, startDate?: Date) {

    draggingController = new NewDraggingController(mouseEvent, event)

    if (startDate) {
      startingDate = startDate
    }

    if (!draggingEventData()) {
      setDraggingEventData(draggingController)
    }
    
  }

  function onMouseEnter(date: Date) {
    if (!draggingEventData()) return
    if (startingDate) {
      let dayDifference = daysDiffInRange(startingDate, date)
      if (currentDate != dayDifference) {
        currentDate = dayDifference

        draggingController?.shiftTimeByDay(dayDifference)

        setDraggingEventData(null)
        setDraggingEventData(draggingController)
      }
    } else {
      startingDate = date
    }
  }

  function onDragEnd() {
    startingDate = null
    setDraggingEventData(null)
  }
  return { onDragEnd, onDragStart, onMouseEnter, draggingEventData }
}

