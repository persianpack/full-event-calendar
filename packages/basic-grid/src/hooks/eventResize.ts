import { EventClass, SourceEvent } from '@full-event-calendar/shared-ts'
import { getDateTimeRange, roundMinutesToMultipleOf5 } from '@full-event-calendar/utils'
import { CalendarDragger, drageModes } from './newDragging'
import { createSignal } from 'solid-js'
import EventCollection from '../../../core/src/api/Collection'

export function useResize(drageMode: drageModes, resizeEndCalllBack: (p: SourceEvent) => void,clickCalllBack?: (p: SourceEvent) => void) {
 
  const [draggedData, setDraggedData] = createSignal<any>()
 
  function onmousedownH(item: EventClass, e: MouseEvent) {
  const calendarDragger = new CalendarDragger(drageMode)

    e.stopPropagation()
    calendarDragger.dragger.dragStart(e,item)
    window.addEventListener('mousemove', mousemove)
    window.addEventListener('mouseup', mouseup)

   
    function mousemove(e: MouseEvent) {
      calendarDragger.dragger.mouseMove(e,item)
      setDraggedData(calendarDragger.dragger.draggingController)
    }

    function mouseup(e:MouseEvent) {
      setDraggedData(null)
      calendarDragger.dragger.dragEnd(e,item)
      // console.log
      const sourceE = { ...calendarDragger.dragger.draggingController?.item.sourceEvent } as SourceEvent
      sourceE.end = calendarDragger.dragger.draggingController?.eventSourceEnd
      sourceE.start = calendarDragger.dragger.draggingController?.eventSourceStart
      resizeEndCalllBack(sourceE)
      
      if (calendarDragger.dragger.hasMouseMoved) {
      }else{
        // sourceE.start = new Date(item.sourceEvent.start)
        // sourceE.end = new Date(item.sourceEvent.start)
        // sourceE.end.setMinutes( sourceE.start.getMinutes() + 15)
        // resizeEndCalllBack(sourceE)
      }
      
      calendarDragger.dragger.hasMouseMoved
      window.removeEventListener('mousemove', mousemove)
      window.removeEventListener('mouseup', mouseup)
    }
  }

  return { onmousedownH,draggedData }
}

class EditEventWithResize implements ResizeHandle{
  calendarDragger:CalendarDragger
  event:EventClass
  constructor(item: EventClass, e: MouseEvent){
    this.calendarDragger = new CalendarDragger('eventResizer' )
    this.calendarDragger.dragger.dragStart(e,item)
    this.event = item
  }
  onmousedown( e: MouseEvent){
    this.calendarDragger.dragger.dragStart(e,this.event)
  }
  mousemove(e: MouseEvent) {
    this.calendarDragger.dragger.mouseMove(e,this.event)
  }
  mouseup(e: MouseEvent) {
    this.calendarDragger.dragger.dragEnd(e,this.event)
    
  }
}
interface ResizeHandle {
  onmousedown:(e:MouseEvent)=>void
  mousemove:(e:MouseEvent)=>void
  mouseup:(e:MouseEvent)=>void
}

type resizeType = 'addEventWithClick' |'addEventWithResize' | 'editEventWithResize'

class basicGridEvenrEsize {


  constructor(resizeType:resizeType){

  }
}
