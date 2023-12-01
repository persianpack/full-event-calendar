let MMM: any
let MU: any

let c1: any
let c2: any

export class DomController {
  shouldDuplicate = false
  hasScrolled = false
  mouseDown = false
  wrapperContainer: any
  handelMouseUp: any
  handelMouseMove: any
  mouseMoveHandeleler: any
  isMouseoutsideTheContainer: any

  constructor(shouldDuplicate: boolean, wrapperContainer: any, mouseMove: any, handelMouseUp: any) {
    this.mouseDown = true
    this.shouldDuplicate = shouldDuplicate
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
      self.mouseDown = false
      handelMouseUp(e)
    }

    c1 = () => {
      self.isMouseoutsideTheContainer = false
      console.log(false)
    }
    c2 = () => {
      console.log(true)
      self.isMouseoutsideTheContainer = true
    }

    document.addEventListener('mousemove', MMM)
    document.addEventListener('mouseup', MU)

    document.addEventListener('scroll', self.handelScroll)

    this.wrapperContainer?.current?.addEventListener('mouseenter', c1)
    this.wrapperContainer?.current?.addEventListener('mouseleave', c2)
  }

  getEventNode(id: any) {
    const target = document.querySelectorAll(`#event-${id}`)
    const targets = document.querySelector(`#event-${id}`)

    if (target.length > 1) {
      if (this.shouldDuplicate) {
        return target[1] as HTMLElement
      }
      return target[0] as HTMLElement
    }
    return targets as HTMLElement
  }
  setOpacityForElemetns(opacity: string, id: any) {
    //@ts-ignore
    document.querySelectorAll(`#event-${id}`).forEach((element: HTMLElement) => {
      element.style.opacity = opacity
    })
  }
  handelScroll() {
    this.hasScrolled = true
  }
  containerMouseEnter() {
    this.isMouseoutsideTheContainer = false
    console.log(false)
  }
  containerMouseLeave() {
    console.log(true)
    this.isMouseoutsideTheContainer = true
  }
  removeListenrs() {
    this.wrapperContainer?.current?.removeEventListener('mouseenter', c1)
    this.wrapperContainer?.current?.removeEventListener('mouseleave', c2)
    document.removeEventListener('mouseup', MU)
    document.removeEventListener('mousemove', MMM)
    document.removeEventListener('scroll', this.handelScroll)
  }
}
