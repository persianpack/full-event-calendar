import { EventClass, SourceEvent } from '@full-event-calendar/shared-ts'
import { roundMinutesToMultipleOf5 } from '@full-event-calendar/utils'

export function useResize(container: any, resizeEndCalllBack: (p: SourceEvent) => void) {
  function onmousedownH(item: EventClass, e: MouseEvent) {
    e.stopPropagation()
    const targetEvent = container.current.querySelector(`#event-${item?.id}`) as HTMLElement

    targetEvent.style.zIndex = '10'
    window.addEventListener('mousemove', mousemove)
    window.addEventListener('mouseup', mouseup)

    let prevX = e.y
    const targetRect = targetEvent.getBoundingClientRect()
    let FirstBottomY = targetRect.bottom
    let endDate: any = null
    let endDateSource: any = null

    const wrapperHeight = container.current.querySelector('.time-range')?.clientHeight || 1
    function mousemove(e: MouseEvent) {
      let newX = prevX - e.y
      const height = targetRect.height - newX
      targetEvent.style.height = height + 'px'

      const delta = targetEvent.getBoundingClientRect().bottom - FirstBottomY

      const newD = (delta * 60) / wrapperHeight
      const finald = new Date(item.end.getTime() + newD * 60000)
      const finaSource = new Date(item.sourceEvent.end.getTime() + newD * 60000)
      finald.setSeconds(0, 0)
      finaSource.setSeconds(0, 0)
      endDate = roundMinutesToMultipleOf5(finald)
      endDateSource = roundMinutesToMultipleOf5(finaSource)
      console.log(finaSource)
      const el = container.current.querySelector(`#event-end-${item?.id}`) as HTMLElement
      el.innerHTML = endDate.toString()
    }

    function mouseup() {
      targetEvent.style.zIndex = '1'
      const sourceE = { ...item } as SourceEvent
      if (endDate) {
        sourceE.end = endDateSource
        sourceE.start = new Date(item.sourceEvent.start)
        resizeEndCalllBack(sourceE)
      }
      window.removeEventListener('mousemove', mousemove)
      window.removeEventListener('mouseup', mouseup)
    }
  }

  return { onmousedownH }
}
