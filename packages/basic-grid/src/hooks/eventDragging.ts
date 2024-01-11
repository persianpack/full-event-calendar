import { createSignal, batch, onCleanup } from 'solid-js'
import { EventClass } from '@full-event-calendar/shared-ts'
 
import { CalendarDragger } from './newDragging'
import { NewDraggingController } from '@full-event-calendar/utils'
import { DomController } from '@full-event-calendar/utils/src/Drag/DomController'

export function userDragger(gridRef: any, dragEndCallBack: (initialDragNode: any) => void, gridContainer: any,editable:boolean) {

  function getWarpperWidth(){
    return gridRef.current.clientWidth + 'px'
  }
  let domController: DomController
  let calendarDragger:CalendarDragger

  const [isDragging, setIsDragging] = createSignal(false)
  const [draggedData, setDraggedData] = createSignal<any>()

  
  function itemDragstart(e: EventClass, d: any) {
    if(!editable)return
    calendarDragger = new CalendarDragger('DailyDragDrop')
    calendarDragger.dragger.dragStart(d,e)
    
    if (isDragging()) return
    domController = new DomController( gridContainer, mouseMove, handelMouseUp)
    batch(() => {
      setDraggedData(calendarDragger.dragger.draggingController)
    })
  }



  function mouseMove(e: MouseEvent) {
    if(!editable)return

    if (!domController.mouseDown) return
    setDraggedData({ ...calendarDragger.dragger.draggingController,width:getWarpperWidth() })
    calendarDragger.dragger.mouseMove(e)
    setIsDragging(calendarDragger.dragger.isDragging)
   
  }

 function handelMouseUp(e: MouseEvent) {
   if(!editable)return

    // call mouse move in case of scolling not moving
    if (domController.hasScrolled) {
      mouseMove(e)
    } else if (!calendarDragger.dragger.hasMouseMoved) {
      console.log('eventClicked ')
    }

     calendarDragger.dragger.dragEnd(e)
  
    if (isDragging()) {
      if (!domController.isMouseoutsideTheContainer) {
        dragEndCallBack(calendarDragger.dragger.draggingController)
      }
      //basiclly start the transition animation from the base event to the target element
      startSrasnferAnimation(e)
    }

    // hasMoved = false
    domController.removeListenrs()

  }
  let time1: any = 0
  let time2: any = 0

  function cleanUps() {
    clearTimeout(time1)
    clearTimeout(time2)
  }

  function startSrasnferAnimation(e:MouseEvent){
    cleanUps()
    const baseEl = calendarDragger.dragger.draggingController as any as NewDraggingController
   
    calendarDragger.dragger.draggingController?.setEelementOpacity('0')

    time1 = setTimeout(() => {
      let targetEl =  calendarDragger.dragger.draggingController?.getEventNode(e) as HTMLElement
      NewDraggingController.setState(baseEl, targetEl)
      setDraggedData(baseEl)
    
    }, 0)

    time2 = setTimeout(() => {
      batch(() => {
        setDraggedData(null)
        setIsDragging(false)
      })
    calendarDragger.dragger.draggingController?.setEelementOpacity('')

    }, 500)
  }

  onCleanup(() => {
    cleanUps()
  })

  return { draggedData, isDragging, itemDragstart }
}
