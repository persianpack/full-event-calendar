import { EventClass } from "@full-event-calendar/shared-ts"

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
    getEventTimeDetailesNode(e:MouseEvent){
        const node = this.getEventNode(e)
       return node?.querySelector('.event-time-detals')
    }
    private getClosestNode(e: MouseEvent) {
        const nodes = document.querySelectorAll(`#event-${this.event.id}`);
        const mouseX = e.clientX;
        const mouseY = e.clientY;
    
        let closestNode = null;
        let closestDistance = Infinity;
    
        nodes.forEach((node) => {
            const nodeRect = node.getBoundingClientRect();
            const nodeLeft = nodeRect.left;
            const nodeRight = nodeRect.right;
            const nodeTop = nodeRect.top;
            const nodeBottom = nodeRect.bottom;
    
            // Calculate distances from each side of the node
            const distances = [
                Math.abs(mouseX - nodeLeft),
                Math.abs(mouseX - nodeRight),
                Math.abs(mouseY - nodeTop),
                Math.abs(mouseY - nodeBottom)
            ];
    
            // Find the minimum distance
            const minDistance = Math.min(...distances);
    
            if (minDistance < closestDistance) {
                closestDistance = minDistance;
                closestNode = node;
            }
        });
        // console.log(closestNode)
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
   
    static previewAndEventTimeDiff(eventNode: number, previewNode: number) {
   
        const firstTopPosition = eventNode + window.scrollY
        const oneHourInPixelSize = document.querySelector('.time-range')?.clientHeight || 1
        // const eventRect = previewNode.getBoundingClientRect()
      
        return (((previewNode + window.scrollY - firstTopPosition) * 60) / oneHourInPixelSize) * 60000
    }
  
}
