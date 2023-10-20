import { createSignal, batch } from 'solid-js'

import { EventImpl } from '../../api/EventImpl'

export interface DraggeddData {
  width: string
  height: string
  left: string
  top: string
  duration: number
  item: EventImpl | null
  animation: string
  startDate: Date
  endDate: Date
}

const initialDragNode: DraggeddData = {
  width: '',
  height: '',
  left: '',
  top: '',
  item: null,
  duration: 0,
  startDate: new Date(),
  endDate: new Date(),
  animation: ''
}
export function userDrager(containerRef: any, dragEndCallBack: (initialDragNode: DraggeddData) => void) {
  const [isDragging, setIsDragging] = createSignal(false)
  const [draggedData, setDraggedData] = createSignal<DraggeddData>(initialDragNode)

  const dif = [0, 0]
  let mouseDown = false

  function itemDragstart(e: EventImpl, d: any) {
    if (isDragging()) return
    mouseDown = true
    const target = containerRef.current.querySelector(`#event-${e.id}`) as HTMLElement
    target.style.opacity = '0'
    const targetElement = target.getBoundingClientRect()

    let clonedNode: DraggeddData = {
      width: target.clientWidth + 3 + 'px',
      height: target.clientHeight + 2 + 'px',
      item: e,
      startDate: e.start,
      endDate: e.end,
      left: targetElement.left + 0 + 'px',
      top: targetElement.top + 0 + 'px',
      duration: e.duration,
      animation: ''
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

  document.addEventListener('mouseup', () => {
    mouseDown = false
    if (isDragging()) {
      cleanUps()
      dragEndCallBack(draggedData())
      const target = { ...draggedData() }
      let y = containerRef.current.querySelector(`#event-${target.item?.id}`) as HTMLElement
      y.style.opacity = '0.0'

      time1 = setTimeout(() => {
        const targets = containerRef.current.querySelector(`#event-${target.item?.id}`)?.getBoundingClientRect()
        let y = containerRef.current.querySelector(`#event-${target.item?.id}`)
        if (y) {
          y.style.opacity = '0.0'
        }
        target.width = y?.clientWidth + 'px'
        target.left = targets?.left + 'px'
        target.top = targets?.top + 'px'
        target.animation = 'all 0.5s;'
        setDraggedData(target)
      }, 0)

      time2 = setTimeout(() => {
        target.animation = ''
        batch(() => {
          setDraggedData(target)
          setIsDragging(false)
        })
        let y = containerRef.current.querySelector(`#event-${target.item?.id}`)
        if (y) {
          y.style.opacity = ''
        }
      }, 500)
    }
  })

  document.addEventListener('mousemove', (e) => {
    if (!mouseDown) return

    const wrapper = containerRef.current?.getBoundingClientRect()
    const download = containerRef.current
      .querySelector(`#draging-event-${draggedData().item?.id}`)
      ?.getBoundingClientRect()
    if (download && wrapper) {
      let deff = Math.abs(download.top - wrapper.top) / 80
      // console.log(deff)
      const min = ((deff % 1) * 100 * 60) / 100
      const hour = deff

      let dragCopy: DraggeddData = { ...draggedData() }

      if (!dragCopy.item) return
      if (!(hour >= 24 && min >= 0)) {
        const statd = dragCopy.item?.start as Date
        statd.setHours(hour)
        statd.setMinutes(min)
        const ENDd = new Date(statd.getTime() + dragCopy.item?.duration * 60000)
        dragCopy.startDate = statd
        dragCopy.endDate = ENDd
      }
      // setDraggedData(dragCopy)
      dragCopy.left = e.clientX - dif[0] + 'px'
      dragCopy.top = e.clientY - dif[1] + 'px'

      setDraggedData(dragCopy)
    }
  })

  return { draggedData, isDragging, itemDragstart }
}
