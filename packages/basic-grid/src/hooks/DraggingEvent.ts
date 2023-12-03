import { roundMinutesToMultipleOf5 } from '@full-event-calendar/utils'

export class DraggingEvent {
  width: any
  height: any
  item: any
  dragedStartDate: any
  dragedEndDate: any
  left: any
  top: any
  duration: any
  animation: any
  isDragg: any
  mouseX: any
  eventSourceStart: any
  eventSourceEnd: any

  constructor(width: any, height: any, e: any, left: any, top: any) {
    ;(this.width = width + 'px'),
      (this.height = height + 2 + 'px'),
      (this.item = e),
      (this.dragedStartDate = e.start),
      (this.dragedEndDate = e.end),
      (this.left = left + 0 + 'px'),
      (this.top = top + 0 + 'px'),
      (this.duration = e.duration),
      (this.animation = ''),
      (this.isDragg = true),
      (this.mouseX = 0),
      (this.eventSourceStart = new Date(e.sourceEvent.start)),
      (this.eventSourceEnd = new Date(e.sourceEvent.end))
  }

  shiftTime(delta: any) {
    const newS = new Date(this.item.start.getTime() + delta)
    newS.setSeconds(0, 0)
    this.dragedStartDate = roundMinutesToMultipleOf5(newS)
    const newE = new Date(this.item.end.getTime() + delta)
    this.dragedEndDate = roundMinutesToMultipleOf5(newE)
    this.shiftSource(delta)
  }
  shiftSource(delta: any) {
    //@ts-ignore
    this.eventSourceStart = roundMinutesToMultipleOf5(new Date(this?.item?.sourceEvent?.start?.getTime() + delta))
    //@ts-ignore
    this.eventSourceEnd = roundMinutesToMultipleOf5(new Date(this?.item?.sourceEvent?.end?.getTime() + delta))
  }

  shiftPoistion(X: any, Y: any, e: any) {
    this.left = e.clientX - X + 'px'
    this.top = e.clientY - Y + 'px'
    this.mouseX = e.pageX
  }
  static setState(draggingEvent: DraggingEvent, target: HTMLElement) {
    const targetElRect = target?.getBoundingClientRect()
    draggingEvent.width = target?.clientWidth + 2 + 'px'
    draggingEvent.height = target?.clientHeight + 2 + 'px'
    draggingEvent.left = targetElRect?.left + 'px'
    draggingEvent.top = targetElRect?.top + 'px'
    draggingEvent.animation = 'all 0.5s;'
  }
}
