import { createSignal, batch, onCleanup } from 'solid-js'
import { roundMinutesToMultipleOf5 } from '@full-event-calendar/utils'
import { DraggedData, EventClass } from '@full-event-calendar/shared-ts'
import { DraggingEvent } from './DraggingEvent'
import { DomController } from './position'
import { PositionController } from './position2'

const initialDragNode: any = {
  width: '',
  height: '',
  left: '',
  top: '',
  item: null,
  duration: 0,
  dragedStartDate: new Date(),
  dragedEndDate: new Date(),
  animation: '',
  isDragg: null,
  mouseX: 0,
  eventSourceStart: new Date(),
  eventSourceEnd: new Date()
}

export function userDragger(containerRef: any, dragEndCallBack: (initialDragNode: any) => void, wrapperContainer: any) {
  let positionController: PositionController
  let draggingEvent: DraggingEvent
  let domController: DomController

  const [isDragging, setIsDragging] = createSignal(false)
  const [draggedData, setDraggedData] = createSignal<any>(initialDragNode)

  let hasMoved = false

  function resetValueToDefalt() {
    hasMoved = false
  }

  function setOpacityForElemetns(opacity: string, id: any) {
    //@ts-ignore
    document.querySelectorAll(`#event-${id}`).forEach((element: HTMLElement) => {
      element.style.opacity = opacity
    })
  }

  function itemDragstart(e: EventClass, d: any, shouldDuplica: boolean) {
    if (isDragging()) return
    domController = new DomController(shouldDuplica, wrapperContainer, mouseMove, handelMouseUp)
    const target = domController.getEventNode(e.id)
    // target.style.opacity = '0'
    const targetElementRect = target.getBoundingClientRect()
    const wrapperHeight = containerRef.current.querySelector('.time-range')?.clientHeight || 1
    positionController = new PositionController(target, d.clientX, d.clientY, wrapperHeight)
    draggingEvent = new DraggingEvent(
      containerRef.current.clientWidth,
      target.clientHeight,
      e,
      targetElementRect.left,
      targetElementRect.top
    )
    batch(() => {
      setDraggedData(draggingEvent)
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
    hasMoved = true
    if (!isDragging()) {
      setIsDragging(true)
      document.getElementById('full-event-calendar-core')?.classList.add('calendar-draging')

      setOpacityForElemetns('0.3', draggedData().item?.id)
    }
    const targetEl = containerRef.current.querySelector(`#draging-event-${draggedData().item?.id}`)
    const newDelta = positionController.calimeDiff(targetEl)
    draggingEvent.shiftTime(newDelta)
    draggingEvent.shiftPoistion(positionController.Xdiff, positionController.Ydiff, e)

    setDraggedData({
      top: draggingEvent.top,
      left: draggingEvent.left,
      dragedStartDate: draggingEvent.dragedStartDate,
      dragedEndDate: draggingEvent.dragedEndDate,
      height: draggingEvent.height,
      width: draggingEvent.width,
      animation: draggingEvent.animation
    })
  }

  function handelMouseUp(e: MouseEvent) {
    // call mouse move in case of scolling not moving
    // mouseMove(e)
    if (domController.hasScrolled) {
      mouseMove(e)
    } else if (!hasMoved) {
      console.log('eventClicked ')
    }

    if (isDragging()) {
      cleanUps()
      if (!domController.isMouseoutsideTheContainer) {
        console.log('send back', draggingEvent)
        dragEndCallBack(draggingEvent)
      }
      //basiclly start the transition animation from the base event to the target element
      const baseEl = draggingEvent

      setOpacityForElemetns('0.0', baseEl.item?.id)

      document.getElementById('full-event-calendar-core')?.classList.remove('calendar-draging')
      time1 = setTimeout(() => {
        let targetEl = domController.getEventNode(baseEl.item?.id)
        const targetElRect = targetEl?.getBoundingClientRect()
        setOpacityForElemetns('0.0', baseEl.item?.id)
        baseEl.width = targetEl?.clientWidth + 2 + 'px'
        baseEl.height = targetEl?.clientHeight + 2 + 'px'
        baseEl.left = targetElRect?.left + 'px'
        baseEl.top = targetElRect?.top + 'px'
        baseEl.animation = 'all 0.5s;'
        setDraggedData(baseEl)
      }, 0)

      time2 = setTimeout(() => {
        baseEl.animation = ''
        batch(() => {
          setDraggedData(baseEl)
          setIsDragging(false)
        })
        // let y = document.querySelector(`#event-${baseEl.item?.id}`) as HTMLElement
        setOpacityForElemetns('', baseEl.item?.id)
      }, 500)
    }
    resetValueToDefalt()
    domController.removeListenrs()
  }

  onCleanup(() => {
    cleanUps()
  })

  return { draggedData, isDragging, itemDragstart }
}
