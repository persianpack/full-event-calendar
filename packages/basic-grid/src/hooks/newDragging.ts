import { EventClass } from "@full-event-calendar/shared-ts"
import { DraggingEvent } from "./DraggingEvent"
import { NewDraggingController } from "./newDraggingEvent"
import { NewDomController } from "./newUiController"


abstract class DraggerHandeler {
    isDragging: boolean = false
    draggingController: NewDraggingController | null = null
    public createDraggingObject(mouseEvent: MouseEvent, event: EventClass) {
        if (this.isDragging) return
        this.draggingController = new NewDraggingController(mouseEvent, event)
    }
}

interface Dragger {
    hasMouseMoved:boolean
    mouseMove: (e: MouseEvent) => void
    dragStart: (e: MouseEvent, event: EventClass) => void
    dragEnd: () => void
}

class DailyGridDragger extends DraggerHandeler {
    hasMouseMoved = false
    dragStart(e: MouseEvent, event: EventClass) {
        
        this.createDraggingObject(e, event)
        // update dragging on dom
    }
    mouseMove(e: MouseEvent) {
        // if (!domController.mouseDown) return
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
        // draging-event-
    }
}

export class CalendarDragger {
    dragger: DailyGridDragger
    constructor(mode: string) {
        this.dragger = new DailyGridDragger()
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


// width: '',
// height: '',
// left: '',
// top: '',
// item: null,
// duration: 0,
// dragedStartDate: new Date(),
// dragedEndDate: new Date(),
// animation: '',
// isDragg: null,
// mouseX: 0,
// eventSourceStart: new Date(),
// eventSourceEnd: new Date()