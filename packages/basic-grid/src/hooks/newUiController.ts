import { EventClass } from "@full-event-calendar/shared-ts"

let MMM: any
let MU: any

let c1: any
let c2: any
let handelScroll: any


export interface DomController {
    event: EventClass
    getEventNode: (e?:MouseEvent) => void
    getEelementReact: (e?:MouseEvent) => void
    setEelementOpacity: (opacity: number) => void
}

export class NewDomController implements DomController {

    event: EventClass
    oneHourInPixelSize: number
    constructor(event: EventClass) {
        this.event = event
        this.oneHourInPixelSize = document.querySelector('.time-range')?.clientHeight || 1
    }
    getEventNode(e?:MouseEvent) {
        if(e){
            return this.getClosestNode(e)
        }else{
            return document.getElementById(`event-${this.event.id}`)
        }
    }
    private getClosestNode(e: MouseEvent) {
        const nodes = document.querySelectorAll(`#event-${this.event.id}`);
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        let closestNode = null;
        let closestDistance = Infinity;
    
        nodes.forEach((node) => {
            const nodeRect = node.getBoundingClientRect();
            const nodeX = nodeRect.left + nodeRect.width / 2;
            const nodeY = nodeRect.top + nodeRect.height / 2;
    
            const distance = Math.sqrt((mouseX - nodeX) ** 2 + (mouseY - nodeY) ** 2);
    
            if (distance < closestDistance) {
                closestDistance = distance;
                closestNode = node;
            }
        });
    
        return closestNode;
    }
    getEelementReact(e?:MouseEvent) {
        const el = this.getEventNode(e) as HTMLElement
        return el?.getBoundingClientRect()
    }
    setEelementOpacity(opacity: number | string) {
        let nodes = document.querySelectorAll(`#event-${this.event.id}`)
        nodes.forEach(node => {
            //@ts-ignore
            node.style.opacity = String(opacity)
        })
    }
   
    static previewAndEventTimeDiff(eventNode: HTMLElement, previewNode: HTMLElement) {
   
        const firstTopPosition = eventNode.getBoundingClientRect().top + window.scrollY
        const oneHourInPixelSize = document.querySelector('.time-range')?.clientHeight || 1

        const eventRect = previewNode.getBoundingClientRect()
        return (((eventRect.top + window.scrollY - firstTopPosition) * 60) / oneHourInPixelSize) * 60000
    }
  
}
