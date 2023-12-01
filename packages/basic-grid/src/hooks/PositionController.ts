export class PositionController {
  firstTopPosition: any
  target: any
  Xdiff: any
  Ydiff: any
  // basicly the height og 1H in pixel
  wrapperHeight: any
  constructor(target: any, mouseX: any, mouseY: any, wrapperHeight: any) {
    this.target = target
    this.wrapperHeight = wrapperHeight
    const targetElementRect = target.getBoundingClientRect()
    this.Xdiff = mouseX - targetElementRect.left
    this.Ydiff = mouseY - targetElementRect.top
    this.firstTopPosition = target.getBoundingClientRect().top + window.scrollY
  }
  calimeDiff(newTarget: any) {
    const eventRect = newTarget.getBoundingClientRect()
    return (((eventRect.top + window.scrollY - this.firstTopPosition) * 60) / this.wrapperHeight) * 60000
  }
  // calNewXYDiff(mosuseX,mouseY){
  //   this.Xdiff = mosuseX -
  //   this.Ydiff = mouseY -
  // }
}
