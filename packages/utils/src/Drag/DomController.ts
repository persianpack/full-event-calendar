let MMM: any
let MU: any

let c1: any
let c2: any

export class DomController {
  mouseDown = false
  wrapperContainer: any
  handelMouseUp: any
  handelMouseMove: any
  mouseMoveHandeleler: any
  isMouseoutsideTheContainer: any

  constructor( wrapperContainer: any, mouseMove: any, handelMouseUp: any) {
    this.mouseDown = true
    this.wrapperContainer = wrapperContainer

    this.registerListners(mouseMove, handelMouseUp)
  }
  registerListners(handelMouseMove: any, handelMouseUp: any) {
    let self = this
    MMM = (e: any) => {
      self.mouseDown = true
      handelMouseMove(e)
    }
    MU = (e: any) => {
      handelMouseUp(e)
      self.mouseDown = false
    }

    c1 = () => {
      self.isMouseoutsideTheContainer = false
    }
    c2 = () => {
      self.isMouseoutsideTheContainer = true
    }
 
    document.addEventListener('mousemove', MMM)
    document.addEventListener('mouseup', MU)

    this.wrapperContainer?.current?.addEventListener('mouseenter', c1)
    this.wrapperContainer?.current?.addEventListener('mouseleave', c2)
  }
 
  containerMouseEnter() {
    this.isMouseoutsideTheContainer = false
  }
  containerMouseLeave() {
    this.isMouseoutsideTheContainer = true
  }
  removeListenrs() {
    this.wrapperContainer?.current?.removeEventListener('mouseenter', c1)
    this.wrapperContainer?.current?.removeEventListener('mouseleave', c2)
    document.removeEventListener('mouseup', MU)
    document.removeEventListener('mousemove', MMM)
  }
}


export function detectLeftButton(evt: MouseEvent) {
  evt = evt || window.event
  if ('buttons' in evt) {
    return evt.buttons == 1
  }
  //@ts-ignore
  var button = evt.which || evt.button
  return button == 1
}