import { EventClass } from '@full-event-calendar/shared-ts'

import { NewDomController, NewDraggingController, getDateTimeRange,useCalenderContainerState } from '@full-event-calendar/utils'
abstract class DraggerHandeler {
  isDragging: boolean = false
  draggingController: NewDraggingController | null = null
  container:HTMLElement;
  constructor(container:HTMLElement){
    this.container = container
  }
  public createDraggingObject(mouseEvent: MouseEvent, event: EventClass) {
 
    if (this.isDragging) return
    this.draggingController = new NewDraggingController(mouseEvent, event,this.container)
  }
}

interface Dragger extends DraggerHandeler {
  mouseMove: (e: MouseEvent) => void
  dragStart: (e: MouseEvent, event: EventClass) => void
  dragEnd: (e: MouseEvent) => void
  hasMouseMoved: boolean
  hasScrolled: boolean
}

class DailyGridDragger extends DraggerHandeler implements Dragger {
  hasMouseMoved = false
  hasScrolled = false
  firstTopPosition = 0 
  firstScrollTop = 0
  private sceollHande:any;
  dragStart(e: MouseEvent, event: EventClass,) {
    this.createDraggingObject(e, event)
    const el = this.draggingController?.getEventNode(e) as HTMLElement
    this.firstTopPosition = el.getBoundingClientRect().top
    this.firstScrollTop = this.container.querySelector('#fec-scroll-wrapper')?.scrollTop!
    const self = this
    this.sceollHande = ()=>{
      self.hasScrolled = true
    }
   this.container.querySelector('#fec-scroll-wrapper')?.addEventListener('scroll',self.sceollHande)
  }
  mouseMove(e: MouseEvent) {
    const scrollDiff = this.container.querySelector('#fec-scroll-wrapper')?.scrollTop! - this.firstScrollTop
    if(scrollDiff != 0 ){
      this.hasScrolled = true
    }
    this.hasMouseMoved = true
    if (!this.draggingController) return
    if (!this.isDragging) {
      this.isDragging = true
      this.container.querySelector('#full-event-calendar-core')?.classList.add('fec-calendar-draging')
      this.draggingController.setEelementOpacity('0.3')
    }
    const previewieNode = this.getPreviewNode()
    if (previewieNode) { 
      const mouseDiff = e.clientY - previewieNode.getBoundingClientRect().top
      //@ts-ignore
      const oneHoureInPixel = this.container.querySelector('.fec-time-range')?.offsetHeight 
      const diffInSeconds = NewDomController.previewAndEventTimeDiff(this.firstTopPosition - scrollDiff, e.clientY - mouseDiff,oneHoureInPixel)
      // console.log(diffInSeconds/1000/60)
      this.draggingController.shiftTime(diffInSeconds)
    }
    this.draggingController.shiftPoistion(e)
  }
  dragEnd(e: MouseEvent) {
    const self = this
   this.container.querySelector('#fec-scroll-wrapper')?.removeEventListener('scroll',self.sceollHande)

    this.isDragging = false
    if (!this.draggingController) return
    this.container.querySelector('#full-event-calendar-core')?.classList.remove('fec-calendar-draging')
  }
  getPreviewNode() {
    return this.container.querySelector(`#draging-event-${this.draggingController?.item.id}`) as HTMLElement
  }
}

class EventResize extends DraggerHandeler implements Dragger {
  hasMouseMoved = false
  hasScrolled = false
  prevX = 0
  FirstBottomY = 0
  rect = null as any
  dragStart(e: MouseEvent, event: EventClass) {
    this.createDraggingObject(e, event)
    this.prevX = e.y
    this.FirstBottomY = this.draggingController?.getEelementReact(e).bottom!
    this.rect = this.draggingController?.getEelementReact(e)!
  }
  mouseMove(e: MouseEvent) {
    this.hasMouseMoved = true
    const targetRect = this.rect
    const targetEvent = this.draggingController?.getEventNode(e)!
    targetEvent.style.zIndex = '50'
    let newX = this.prevX - e.y
    const height = targetRect.height - newX
    targetEvent.style.height = height + 'px'
    const delta = targetEvent.getBoundingClientRect().bottom - this.FirstBottomY
    const newD = (delta * 60) / this.draggingController?.oneHourInPixelSize!
    this.draggingController?.shiftEndTime(newD * 60000)
    const endTimeNode = this.draggingController?.getEventTimeDetailesNode(e)
    if (endTimeNode)
      endTimeNode.innerHTML = getDateTimeRange(
        this.draggingController?.dragedStartDate!,
        this.draggingController?.dragedEndDate!,
        'en-US'
      )
  }
  dragEnd(e: MouseEvent) {
    const targetEvent = this.draggingController?.getEventNode()!
    if (targetEvent) {
      targetEvent.style.zIndex = '1'
    }
  }
  getPreviewNode() {}
}

class AddEventWithResize extends DraggerHandeler implements Dragger {
  hasMouseMoved = false
  hasScrolled = false
  resizer: EventResize | null = null
  private event: EventClass | null = null
  dragStart(e: MouseEvent, event: EventClass) {
   
    this.resizer = new EventResize(this.container)
    this.event = event
  }
  mouseMove(e: MouseEvent) {
    if (!this.hasMouseMoved) {
      this.resizer?.dragStart.call(this, e, this.event!)
      this.hasMouseMoved = true
    } else {
      this.resizer?.mouseMove.call(this, e)
    }
  }
  dragEnd(e: MouseEvent) {
    this.resizer?.dragEnd.call(this, e)
    if (!this.hasMouseMoved) {
      this.resizer?.dragStart.call(this, e, this.event!)
    }
  }
  getPreviewNode() {}
}

export type drageModes = 'DailyDragDrop' | 'eventResizer' | 'addEventWithResize'
export class CalendarDragger {
  dragger: Dragger
  constructor(mode: drageModes,container:HTMLElement) {
    switch (mode) {
      case 'DailyDragDrop':
        this.dragger = new DailyGridDragger(container)
        break
      case 'eventResizer':
        this.dragger = new EventResize(container)
        break
      case 'addEventWithResize':
        this.dragger = new AddEventWithResize(container)
        break
      default:
        this.dragger = new DailyGridDragger(container)
        break
    }
  }
}
