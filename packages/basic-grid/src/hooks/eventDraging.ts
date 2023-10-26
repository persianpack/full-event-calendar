import { createSignal, batch, onCleanup } from 'solid-js'

import { DraggeddData, EventClass } from '@full-event-calendar/shared-ts'

const initialDragNode: DraggeddData = {
  width: '',
  height: '',
  left: '',
  top: '',
  item: null,
  duration: 0,
  dragedStartDate: new Date(),
  dragedEndDate: new Date(),
  animation: '',
  itemRect: null,
  mouseX: 0
}
export function userDrager(containerRef: any, dragEndCallBack: (initialDragNode: DraggeddData) => void) {
  const [isDragging, setIsDragging] = createSignal(false)
  const [draggedData, setDraggedData] = createSignal<DraggeddData>(initialDragNode)

  const dif = [0, 0]
  let mouseDown = false

  function itemDragstart(e: EventClass, d: any) {
    if (isDragging()) return
    mouseDown = true
    const target = document.querySelector(`#event-${e.id}`) as HTMLElement
    target.style.opacity = '0'
    const targetElement = target.getBoundingClientRect()
    const fullC = containerRef.current.clientWidth || 0

    let clonedNode: DraggeddData = {
      width: fullC + 'px',
      height: target.clientHeight + 2 + 'px',
      item: e,
      dragedStartDate: e.start,
      dragedEndDate: e.end,
      left: targetElement.left + 0 + 'px',
      top: targetElement.top + 0 + 'px',
      duration: e.duration,
      animation: '',
      itemRect: null,
      mouseX: 0
    }

    dif[0] = d.clientX - targetElement.left
    dif[1] = d.clientY - targetElement.top

    batch(() => {
      setDraggedData(clonedNode)
      setIsDragging(true)
    })
  }

  let time1: number = 0
  let time2: number = 0

  function cleanUps() {
    clearTimeout(time1)
    clearTimeout(time2)
  }

  function handelMouseUp() {
    mouseDown = false
    if (isDragging()) {
      cleanUps()
      dragEndCallBack(draggedData())
      const baseEl = { ...draggedData() }
      let y = document.querySelector(`#event-${baseEl.item?.id}`) as HTMLElement
      y.style.opacity = '0.0'

      time1 = setTimeout(() => {
        let targetEl = document.querySelector(`#event-${baseEl.item?.id}`) as HTMLElement
        const targetElRect = targetEl?.getBoundingClientRect()
        if (targetEl) {
          targetEl.style.opacity = '0.0'
        }
        baseEl.width = targetEl?.clientWidth + 2 + 'px'
        baseEl.left = targetElRect?.left + 'px'
        baseEl.top = targetElRect?.top + 'px'
        baseEl.animation = 'all 0.5s;'
        setDraggedData(baseEl)
      }, 0)

      time2 = setTimeout(() => {
        baseEl.animation = ''
        batch(() => {
          setDraggedData(baseEl)
          setIsDragging(false)
        })
        let y = document.querySelector(`#event-${baseEl.item?.id}`) as HTMLElement
        if (y) {
          y.style.opacity = ''
        }
      }, 500)
    }
  }

  function mouseMove(e: MouseEvent) {
    if (!mouseDown) return

    const containerRect = containerRef.current?.getBoundingClientRect()
    const eventRect = containerRef.current
      .querySelector(`#draging-event-${draggedData().item?.id}`)
      ?.getBoundingClientRect()
    if (eventRect && containerRect) {
      let deff = Math.abs(eventRect.top - containerRect.top) / 80
      // console.log(deff)
      const min = ((deff % 1) * 100 * 60) / 100
      const hour = deff

      let dragCopy: DraggeddData = { ...draggedData() }
      dragCopy.itemRect = eventRect
      if (!dragCopy.item) return
      if (!(hour >= 24 && min >= 0)) {
        const statd = dragCopy.item?.start as Date
        statd.setHours(hour)
        statd.setMinutes(min)
        const ENDd = new Date(statd.getTime() + dragCopy.item?.duration * 60000)
        dragCopy.dragedStartDate = statd
        dragCopy.dragedEndDate = ENDd
      }
      // setDraggedData(dragCopy)
      dragCopy.left = e.clientX - dif[0] + 'px'
      dragCopy.top = e.clientY - dif[1] + 'px'
      dragCopy.mouseX = e.pageX

      setDraggedData(dragCopy)
    }
  }

  document.addEventListener('mouseup', handelMouseUp)

  document.addEventListener('mousemove', mouseMove)

  onCleanup(() => {
    document.removeEventListener('mouseup', handelMouseUp)
    document.removeEventListener('mousemove', mouseMove)
    cleanUps()
  })

  return { draggedData, isDragging, itemDragstart }
}
