import { EventClass } from '@full-event-calendar/shared-ts'
import { NewDraggingController, useCalenderContainerState } from '@full-event-calendar/utils'
import { createSignal } from 'solid-js'
import { DraggerTypes, RowDragger } from './RowDragger'

export function useMonthEventDragging(
  dragEndCb: (event: EventClass, draggerMode: DraggerTypes) => void,
  editable = true,
  draggerType: DraggerTypes = 'editEventRow'
) {
  const [draggingEventData, setDraggingEventData] = createSignal<null | NewDraggingController>(null)
  // console.log('row dragger 1 ',useCalenderContainerState())
  let eventdrager = new RowDragger(draggerType, useCalenderContainerState()!)
  function onDragStart(event: EventClass, mouseEvent: MouseEvent, startDate?: Date) {
    if (!editable) return
    eventdrager.dragger.onDragStart(event, mouseEvent, startDate)
    if (!draggingEventData()) {
      setDraggingEventData(eventdrager.dragger.draggingController)
    }
  }

  function onMouseEnter(date: Date) {
    if (!editable) return
    if (!draggingEventData()) return
    eventdrager.dragger.onMouseEnter(date, () => {
      setDraggingEventData(null)
      setDraggingEventData(eventdrager.dragger.draggingController)
    })
  }

  function onDragEnd(clearDate: boolean = true) {
    eventdrager.dragger.onDragEnd()

    if (!!draggingEventData()) {
      const sourceE = { ...draggingEventData()?.item.sourceEvent }
      // sourceE.start = draggingEventData()?.dragedStartDate as Date
      // sourceE.end = draggingEventData()?.dragedEndDate as Date
      // console.log(draggingEventData())
      sourceE.start = draggingEventData()?.eventSourceStart as Date
      sourceE.end = draggingEventData()?.eventSourceEnd as Date

      if (sourceE) {
        //@ts-ignore
        //  props.onEventUpdate(sourceE)
        dragEndCb(sourceE, eventdrager.draggerMode)
      }
    }
 
    if (clearDate) {
      setDraggingEventData(null)
    }
  }
  const container = useCalenderContainerState()
  function changeDraggerType(draggerType: DraggerTypes) {
    eventdrager = new RowDragger(draggerType, container!)
  }
  return { onDragEnd, onDragStart, onMouseEnter, draggingEventData, changeDraggerType, setDraggingEventData }
}
