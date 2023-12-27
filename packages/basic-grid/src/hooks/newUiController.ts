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
    wrapperHeight: number
    constructor(event: EventClass) {
        this.event = event
        this.wrapperHeight = document.querySelector('.time-range')?.clientHeight || 1
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
        const wrapperHeight = document.querySelector('.time-range')?.clientHeight || 1

        const eventRect = previewNode.getBoundingClientRect()
        return (((eventRect.top + window.scrollY - firstTopPosition) * 60) / wrapperHeight) * 60000
    }
   
    //   shouldDuplicate = false
    //   hasScrolled = false
    //   mouseDown = false
    //   wrapperContainer: any
    //   handelMouseUp: any
    //   handelMouseMove: any
    //   mouseMoveHandeleler: any
    //   isMouseoutsideTheContainer: any

    //   constructor(shouldDuplicate: boolean, wrapperContainer: any, mouseMove: any, handelMouseUp: any) {
    //     this.mouseDown = true
    //     this.shouldDuplicate = shouldDuplicate
    //     this.wrapperContainer = wrapperContainer

    //     this.registerListners(mouseMove, handelMouseUp)
    //   }
    //   registerListners(handelMouseMove: any, handelMouseUp: any) {
    //     let self = this
    //     MMM = (e: any) => {
    //       self.mouseDown = true
    //       handelMouseMove(e)
    //     }
    //     MU = (e: any) => {
    //       handelMouseUp(e)
    //       self.mouseDown = false
    //     }

    //     c1 = () => {
    //       self.isMouseoutsideTheContainer = false
    //     }
    //     c2 = () => {
    //       self.isMouseoutsideTheContainer = true
    //     }
    //     handelScroll = () => {
    //       self.hasScrolled = true
    //     }

    //     document.addEventListener('mousemove', MMM)
    //     document.addEventListener('mouseup', MU)
    //     document.getElementById('scroll-wrapper')?.addEventListener('scroll', handelScroll)
    //     // document.getElementById('scroll-wrapper')?.addEventListener('scrollend',  MMM)

    //     this.wrapperContainer?.current?.addEventListener('mouseenter', c1)
    //     this.wrapperContainer?.current?.addEventListener('mouseleave', c2)
    //   }

    //   getEventNode(id: any) {
    //     const target = document.querySelectorAll(`#event-${id}`)
    //     const targets = document.querySelector(`#event-${id}`)

    //     if (target.length > 1) {
    //       if (this.shouldDuplicate) {
    //         return target[1] as HTMLElement
    //       }
    //       return target[0] as HTMLElement
    //     }
    //     return targets as HTMLElement
    //   }
    //   setOpacityForElemetns(opacity: string, id: any) {
    //     //@ts-ignore
    //     document.querySelectorAll(`#event-${id}`).forEach((element: HTMLElement) => {
    //       element.style.opacity = opacity
    //     })
    //   }

    //   containerMouseEnter() {
    //     this.isMouseoutsideTheContainer = false
    //   }
    //   containerMouseLeave() {
    //     this.isMouseoutsideTheContainer = true
    //   }
    //   removeListenrs() {
    //     this.wrapperContainer?.current?.removeEventListener('mouseenter', c1)
    //     this.wrapperContainer?.current?.removeEventListener('mouseleave', c2)
    //     document.removeEventListener('mouseup', MU)
    //     document.removeEventListener('mousemove', MMM)
    //     document.getElementById('scroll-wrapper')?.removeEventListener('scroll', handelScroll)
    //     // document.getElementById('scroll-wrapper')?.removeEventListener('scrollend', MMM)
    //   }
}
