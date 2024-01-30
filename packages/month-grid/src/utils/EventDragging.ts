import { EventClass } from '@full-event-calendar/shared-ts'
import { NewDraggingController } from '@full-event-calendar/utils'
import { createSignal } from 'solid-js'
import { DraggerTypes, RowDragger } from './RowDragger'

export function useMonthEventDragging(dragEndCb:(event:EventClass,draggerMode:DraggerTypes)=>void,draggerType:DraggerTypes = 'editEventRow') {

  const [draggingEventData, setDraggingEventData] = createSignal<null | NewDraggingController>(null)

  let eventdrager = new RowDragger(draggerType)
  function onDragStart(event: EventClass,mouseEvent:MouseEvent, startDate?: Date) {

    eventdrager.dragger.onDragStart(event,mouseEvent,startDate)
    if (!draggingEventData()) {
      setDraggingEventData(eventdrager.dragger.draggingController)
    }
  }

  function onMouseEnter(date: Date) {
    if (!draggingEventData()) return
    eventdrager.dragger.onMouseEnter(date,()=>{
      setDraggingEventData(null)
      setDraggingEventData(eventdrager.dragger.draggingController)
    })
  }

  function onDragEnd(clearDate:boolean = true) {
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
       dragEndCb(sourceE,eventdrager.draggerMode)
      }
    }

    if(clearDate){
      setDraggingEventData(null)
    }
    
  }

  function changeDraggerType(draggerType:DraggerTypes){
    eventdrager = new RowDragger(draggerType)
  }
  return { onDragEnd, onDragStart, onMouseEnter, draggingEventData ,changeDraggerType ,setDraggingEventData}
}