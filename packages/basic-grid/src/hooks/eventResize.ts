import { EventClass, SourceEvent } from '@full-event-calendar/shared-ts'

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

    const wrapperHeight = container.current.querySelector('.time-range')?.clientHeight || 1
    function mousemove(e: MouseEvent) {
      let newX = prevX - e.y
      const height = targetRect.height - newX
      targetEvent.style.height = height + 'px'

      const delta = targetEvent.getBoundingClientRect().bottom - FirstBottomY

      const newD = (delta * 60) / wrapperHeight
      const finald = new Date(item.end.getTime() + newD * 60000)

      endDate = finald
      const el = container.current.querySelector(`#event-end-${item?.id}`) as HTMLElement
      el.innerHTML = finald.toString()
    }

    function mouseup() {
      targetEvent.style.zIndex = '1'
      const sourceE = { ...item } as SourceEvent
      if (endDate) {
        sourceE.end = endDate
        resizeEndCalllBack(sourceE)
      }
      window.removeEventListener('mousemove', mousemove)
      window.removeEventListener('mouseup', mouseup)
    }
  }

  return { onmousedownH }
}
