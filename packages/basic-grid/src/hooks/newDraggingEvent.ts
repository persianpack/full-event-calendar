import { EventClass } from '@full-event-calendar/shared-ts'
import { roundMinutesToMultipleOf5 } from '@full-event-calendar/utils'
import { NewDomController } from './newUiController'
import { DomController } from './DomController'


export interface DraggingController {
    width: string
    height: string
    left: string
    top: string
    item: EventClass,
    duration: number,
    dragedStartDate: Date,
    dragedEndDate: Date,
    animation: string,
    isDragg: boolean,
    mouseX: number,
    eventSourceStart: Date,
    eventSourceEnd: Date
    shiftTime :(miliSeconds: number) =>void
    shiftPoistion :(X: number, Y: number, e: MouseEvent) =>void
    shiftEndTime:(miliSeconds: number) =>void
}


export class NewDraggingController extends NewDomController implements DraggingController {
  width: string
  height: string
  left: string
  top: string
  item: EventClass
  duration: number
  dragedStartDate: Date
  dragedEndDate: Date
  animation: string
  isDragg: boolean
  mouseX: number
  eventSourceStart: Date
  eventSourceEnd: Date
  Xdiff:any
  Ydiff:any
  
constructor(mouseEvent : MouseEvent,event:EventClass){
    super(event)
    // const target = domController.getEventNode(e.id)
    // target.style.opacity = '0'
    const targetElementRect = this.getEelementReact(mouseEvent)
    this.width = targetElementRect.width + 'px'
    this.height = targetElementRect.height + 2 + 'px'
    this.item = event
    this.dragedStartDate = event.start
    this.dragedEndDate = event.end
    this.left = targetElementRect.left + 0 + 'px'
    this.top = targetElementRect.top + 0 + 'px'
    this.duration = event.duration
    this.animation = ''
    this.isDragg = true
    this.mouseX = 0
    this.eventSourceStart = new Date(event.sourceEvent.start)
    this.eventSourceEnd = new Date(event.sourceEvent.end)
    this.Xdiff = mouseEvent.clientX - targetElementRect.left
    this.Ydiff = mouseEvent.clientY - targetElementRect.top

}
    
 public shiftTime(miliSeconds: number) {
    const newStartDate = new Date(this.item.start.getTime() + miliSeconds)
    newStartDate.setSeconds(0, 0)
    this.dragedStartDate = roundMinutesToMultipleOf5(newStartDate)
    const newEndDate = new Date(this.item.end.getTime() + miliSeconds)
    this.dragedEndDate = roundMinutesToMultipleOf5(newEndDate)
    this.shiftSource(miliSeconds)
   
  }
 public shiftEndTime(miliSeconds: number) {
  
    const newEndDate = new Date(this.item.end.getTime() + miliSeconds)
    this.dragedEndDate = roundMinutesToMultipleOf5(newEndDate)
    this.shiftEndSource(miliSeconds)
  }
  private shiftEndSource(miliSeconds: number) {
    //@ts-ignore
    this.eventSourceEnd = roundMinutesToMultipleOf5(new Date(this?.item?.sourceEvent?.end?.getTime() + miliSeconds))
  }
  private shiftSource(miliSeconds: number) {
    //@ts-ignore
    this.eventSourceStart = roundMinutesToMultipleOf5(new Date(this?.item?.sourceEvent?.start?.getTime() + miliSeconds))
    //@ts-ignore
    this.eventSourceEnd = roundMinutesToMultipleOf5(new Date(this?.item?.sourceEvent?.end?.getTime() + miliSeconds))

    // console.log(this.eventSourceEnd,this.eventSourceStart)
  }
//@ts-ignore
 public shiftPoistion( e: MouseEvent) {
    
    this.left = e.clientX - this.Xdiff + 'px'
    this.top = e.clientY - this.Ydiff + 'px'
    this.mouseX = e.pageX
 }
 static setState(draggingEvent: NewDraggingController, target: HTMLElement) {
    const targetElRect = target?.getBoundingClientRect()
    draggingEvent.width = target?.clientWidth + 2 + 'px'
    draggingEvent.height = target?.clientHeight + 2 + 'px'
    draggingEvent.left = targetElRect?.left + 'px'
    draggingEvent.top = targetElRect?.top + 'px'
    draggingEvent.animation = 'all 0.5s;'
  }
}
