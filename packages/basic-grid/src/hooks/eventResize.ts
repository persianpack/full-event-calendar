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
      calendarDragger.dragger.mouseMove(e)
      setDraggedData(calendarDragger.dragger.draggingController)
    }

    function mouseup(e:MouseEvent) {
      setDraggedData(null)
      calendarDragger.dragger.dragEnd(e)
      // console.log
      const sourceE = { ...calendarDragger.dragger.draggingController?.item.sourceEvent } as SourceEvent
      sourceE.end = calendarDragger.dragger.draggingController?.eventSourceEnd!
      sourceE.start = calendarDragger.dragger.draggingController?.eventSourceStart!
      resizeEndCalllBack(sourceE)
      
      calendarDragger.dragger.hasMouseMoved
      window.removeEventListener('mousemove', mousemove)
      window.removeEventListener('mouseup', mouseup)
    }
  }

  return { onmousedownH,draggedData }
}
