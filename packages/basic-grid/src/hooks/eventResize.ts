import { EventClass, SourceEvent } from '@full-event-calendar/shared-ts'
import { CalendarDragger, drageModes } from './newDragging'
import { createSignal } from 'solid-js'

export function useResize(drageMode: drageModes, resizeEndCalllBack: (p: SourceEvent) => void,editable:boolean,onMouseMove?:()=>void) {
 
  const [draggedData, setDraggedData] = createSignal<any>()
 
  function onmousedownH(item: EventClass, e: MouseEvent) {
    if(!editable)return
  const calendarDragger = new CalendarDragger(drageMode)

    e.stopPropagation()
    calendarDragger.dragger.dragStart(e,item)
    window.addEventListener('mousemove', mousemove)
    window.addEventListener('mouseup', mouseup)

   
    function mousemove(e: MouseEvent) {
      calendarDragger.dragger.mouseMove(e)
      if (onMouseMove) onMouseMove()
      setDraggedData(calendarDragger.dragger.draggingController)
    }
    

    function mouseup(e:MouseEvent) {
      setDraggedData(null)
      calendarDragger.dragger.dragEnd(e)
      const sourceE = { ...calendarDragger.dragger.draggingController?.item.sourceEvent } as SourceEvent
      sourceE.end = calendarDragger.dragger.draggingController?.eventSourceEnd!
      sourceE.start = calendarDragger.dragger.draggingController?.eventSourceStart!
      // sourceE.end = calendarDragger.dragger.draggingController?.dragedEndDate!
      // sourceE.start = calendarDragger.dragger.draggingController?.dragedStartDate!
      resizeEndCalllBack(sourceE)
      
      calendarDragger.dragger.hasMouseMoved
      window.removeEventListener('mousemove', mousemove)
      window.removeEventListener('mouseup', mouseup)
    }
  }

  return { onmousedownH,draggedData }
}
