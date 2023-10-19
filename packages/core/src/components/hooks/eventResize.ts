import { EventImpl, SourceEvent } from '../../api/EventImpl'

export function useResize(container: any, resizeEndCalllBack: (p: SourceEvent) => void) {
  function onmousedownH(item: EventImpl, e: MouseEvent) {
    e.stopPropagation()
    const targetEvent = container.current.querySelector(`#event-${item?.id}`) as HTMLElement

    targetEvent.style.zIndex = '10'
    window.addEventListener('mousemove', mousemove)
    window.addEventListener('mouseup', mouseup)

    let prevX = e.y
    const targetRect = targetEvent.getBoundingClientRect()
    let endDate: any = null

    function mousemove(e: MouseEvent) {
      let newX = prevX - e.y
      const height = targetRect.height - newX
      targetEvent.style.height = height + 'px'
      let duraction = (height * 60) / 80
      endDate = new Date(item.start.getTime() + duraction * 60000)
      const el = container.current.querySelector(`#event-end-${item?.id}`) as HTMLElement
      el.innerHTML = endDate.toString()
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
