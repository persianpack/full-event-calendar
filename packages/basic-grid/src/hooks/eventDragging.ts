import { createSignal, batch, onCleanup } from 'solid-js'
import { EventClass } from '@full-event-calendar/shared-ts'
import { DomController } from './DomController'
import { CalendarDragger } from './newDragging'
import { NewDraggingController } from './newDraggingEvent'

export function userDragger(containerRef: any, dragEndCallBack: (initialDragNode: any) => void, wrapperContainer: any) {
  // let positionController: PositionController
  // let draggingEvent: DraggingEvent
  function getWarpperWidth(){
    return containerRef.current.clientWidth + 'px'
  }
  let domController: DomController
  let calendarDragger:CalendarDragger 
  const [isDragging, setIsDragging] = createSignal(false)
  const [draggedData, setDraggedData] = createSignal<any>()

  // let hasMoved = false

  function setOpacityForElemetns(opacity: string, id: any) {
    //@ts-ignore
    document.querySelectorAll(`#event-${id}`).forEach((element: HTMLElement) => {
      element.style.opacity = opacity
    })
  }
  
  function itemDragstart(e: EventClass, d: any, shouldDuplica: boolean) {

    calendarDragger = new CalendarDragger('sdsd')
    calendarDragger.dragger.dragStart(d,e)
    if (isDragging()) return
    domController = new DomController(shouldDuplica, wrapperContainer, mouseMove, handelMouseUp)
  
    batch(() => {
      setDraggedData(calendarDragger.dragger.draggingController)
    })
  }

  let time1: any = 0
  let time2: any = 0

  function cleanUps() {
    clearTimeout(time1)
    clearTimeout(time2)
  }

  function mouseMove(e: MouseEvent) {

    if (!domController.mouseDown) return
    setDraggedData({ ...calendarDragger.dragger.draggingController,width:getWarpperWidth() })
    calendarDragger.dragger.mouseMove(e)
    setIsDragging(calendarDragger.dragger.isDragging)
   
  }

  function handelMouseUp(e: MouseEvent) {
    // call mouse move in case of scolling not moving
    if (domController.hasScrolled) {
      mouseMove(e)
    } else if (!calendarDragger.dragger.hasMouseMoved) {
      console.log('eventClicked ')
    }
     calendarDragger.dragger.dragEnd(e)

    if (isDragging()) {
      cleanUps()
    
      if (!domController.isMouseoutsideTheContainer) {
        dragEndCallBack(calendarDragger.dragger.draggingController)
      }
      //basiclly start the transition animation from the base event to the target element
      const baseEl = calendarDragger.dragger.draggingController as NewDraggingController
      // document.getElementById('full-event-calendar-core')?.classList.remove('calendar-draging')
      setOpacityForElemetns('0.0', baseEl.item?.id)

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
         setOpacityForElemetns('', baseEl.item?.id)
      }, 500)
    }

    // hasMoved = false
    domController.removeListenrs()
  }

  onCleanup(() => {
    cleanUps()
  })

  return { draggedData, isDragging, itemDragstart }
}
