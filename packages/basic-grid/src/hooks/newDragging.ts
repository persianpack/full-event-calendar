import { EventClass } from "@full-event-calendar/shared-ts"
import { DraggingEvent } from "./DraggingEvent"
import { NewDraggingController } from "./newDraggingEvent"
import { NewDomController } from "./newUiController"
import { Switch } from "solid-js"
import { getDateTimeRange } from "@full-event-calendar/utils"


abstract class DraggerHandeler {
    isDragging: boolean = false
    draggingController: NewDraggingController | null = null
    public createDraggingObject(mouseEvent: MouseEvent, event: EventClass) {
        if (this.isDragging) return
        this.draggingController = new NewDraggingController(mouseEvent, event)
    }
}

interface Dragger extends DraggerHandeler{
    mouseMove: (e: MouseEvent) => void
    dragStart: (e: MouseEvent, event: EventClass) => void
    dragEnd: (e: MouseEvent) => void
    hasMouseMoved:boolean
}

class DailyGridDragger extends DraggerHandeler implements Dragger {
     hasMouseMoved = false

    dragStart(e: MouseEvent, event: EventClass) {
        this.createDraggingObject(e, event)
    }
    mouseMove(e: MouseEvent) {
        this.hasMouseMoved = true
        if (!this.draggingController) return
        if (!this.isDragging) {
            this.isDragging = true
            document.getElementById('full-event-calendar-core')?.classList.add('calendar-draging')
            this.draggingController.setEelementOpacity('0.3')
        }
        const previewieNode = this.getPreviewNode()
        if(previewieNode){
            const diffInSeconds = NewDomController.previewAndEventTimeDiff(this.draggingController.getEventNode(e) as HTMLElement
            , previewieNode)
       
            this.draggingController.shiftTime(diffInSeconds)
        }
        this.draggingController.shiftPoistion(e)
    }
    dragEnd(e: MouseEvent) {
        this.isDragging = false
        if (!this.draggingController) return
        document.getElementById('full-event-calendar-core')?.classList.remove('calendar-draging')
    }
    getPreviewNode() {
        return document.getElementById(`draging-event-${this.draggingController?.item.id}`) as HTMLElement
    }
}



class EventResize extends DraggerHandeler implements Dragger {
    hasMouseMoved = false
    prevX = 0
    FirstBottomY = 0
    rect=null as any
    dragStart(e: MouseEvent, event: EventClass) { 
        this.createDraggingObject(e, event)
        this.prevX =e.y
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
        this.draggingController?.shiftEndTime(newD* 60000)
        targetEvent.innerHTML = getDateTimeRange(this.draggingController?.dragedStartDate!,this.draggingController?.dragedEndDate!)

    }
    dragEnd(e: MouseEvent) {
        const targetEvent = this.draggingController?.getEventNode()!
        if(targetEvent){
            targetEvent.style.zIndex = '1'
        }
      
    }
    getPreviewNode(){}
}

class AddEventWithResize extends DraggerHandeler implements Dragger{
    hasMouseMoved =false
    resizer:EventResize | null= null
    private event:EventClass | null =null
    dragStart(e: MouseEvent, event: EventClass) {
        this.resizer = new EventResize()
        this.event = event
    }
    mouseMove(e: MouseEvent) {
        if(!this.hasMouseMoved){
            this.resizer?.dragStart.call(this,e,this.event!)
            this.hasMouseMoved = true
        }else{
            this.resizer?.mouseMove.call(this,e)
        }
    }
    dragEnd(e: MouseEvent) {
      this.resizer?.dragEnd.call(this,e)
      if(!this.hasMouseMoved){
        this.resizer?.dragStart.call(this,e,this.event!)
      }
    }
    getPreviewNode(){}
}

export type drageModes = 'DailyDragDrop' | 'eventResizer' | 'addEventWithResize'
export class CalendarDragger {
    dragger: Dragger
    constructor(mode: drageModes) {
        switch (mode) {
            case 'DailyDragDrop':
                this.dragger = new DailyGridDragger()
                break;
            case 'eventResizer':
                this.dragger = new EventResize()
                break
            case 'addEventWithResize':
                this.dragger = new AddEventWithResize()
                break
            default:
                this.dragger = new DailyGridDragger()
                break;
        }
    }
}



interface DraggingData {
    width: string
    height: string
    left: string
    top: string
    item: EventClass,
    duration: 0,
    dragedStartDate: Date,
    dragedEndDate: Date,
    animation: string,
    isDragg: boolean,
    mouseX: number,
    eventSourceStart: Date,
    eventSourceEnd: Date
}
