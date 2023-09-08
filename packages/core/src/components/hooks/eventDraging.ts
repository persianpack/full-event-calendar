import { createSignal, batch } from "solid-js"

import { EventImpl } from '../../api/EventImpl'

interface draggeddData {
  width: string
  height: string
  left: string
  top: string
  startMin: string | number
  startHour: string | number
  endMin: string | number
  endHour: string | number
  duration: number
  item: EventImpl | null
  animation: string
}

const initialDragNode: draggeddData = {
  width: '',
  height: '',
  left: '',
  top: '',
  item: null,
  startMin: '',
  startHour: '',
  endMin: '',
  endHour: '',
  duration: 0,
  animation: ""
}
export function userDrager() {


  const [isDragging, setIsDragging] = createSignal(false)
  const [draggedData, setDraggedData] = createSignal<draggeddData>(initialDragNode)


  const dif = [0, 0]
  const houers = [0, 0]
  let mouseDown = false

  function calculateEndTime(StartHour: any, StartMinute: any, duration: any) {
    // Calculate the total minutes from the start time and duration
    const totalMinutes = StartHour * 60 + StartMinute + duration

    // Calculate the end hour and minute
    const endHour = Math.floor(totalMinutes / 60)
    const endMinute = totalMinutes % 60

    // Return the end time as a formatted string
    return { endHour, endMinute }
  }

  function itemDragstart(e: EventImpl, d: any) {
    mouseDown = true
    const target = document.getElementById(`event-${e.id}`) as HTMLElement
    target.style.opacity = "0.7"
    
    let clonedNode: draggeddData = initialDragNode
    const targetElement = target.getBoundingClientRect()

    dif[0] = d.clientX - targetElement.left
    dif[1] = d.clientY - targetElement.top
    console.log(targetElement)
    clonedNode.width = target.clientWidth + 3 + 'px'
    clonedNode.height = target.clientHeight + 2 + 'px'
    clonedNode.item = e
    clonedNode.startHour = e.start.getHours()
    clonedNode.startMin = e.start.getMinutes()
    clonedNode.endHour = e.end.getHours()
    clonedNode.endMin = e.end.getMinutes()
    clonedNode.left = targetElement.left + 0 + 'px'
    clonedNode.top = targetElement.top + 0 + 'px'
    clonedNode.duration = e.duration

    batch(() => {
      setDraggedData(clonedNode)
      setIsDragging(true)
    })

  }


  document.addEventListener('mouseup', () => {
    mouseDown = false
    if (isDragging()) {
      const target = { ...draggedData() }
      const targets = document.getElementById(`event-${target.item?.id}`)?.getBoundingClientRect();
      let y = document.getElementById(`event-${target.item?.id}`)
      if (y) {
        y.style.opacity = "0.7"
      }
      target.left = targets?.left + 'px'
      target.top = targets?.top + 'px'
      target.animation = "all 0.5s;"
      setDraggedData(target)

      setTimeout(() => {
        target.animation = ""
        batch(() => {
          setDraggedData(target)
          setIsDragging(false)
        })
        let y = document.getElementById(`event-${target.item?.id}`)
        if (y) {
          y.style.opacity = "1"
        }
      }, 500);
    }
  })

  document.addEventListener('mousemove', (e) => {
    if (!mouseDown) return
    const wrapper = document.querySelector('.fec-daily-grid')?.getBoundingClientRect()
    const download = document.getElementById(`draging-event-${draggedData().item?.id}`)?.getBoundingClientRect()
    if (download && wrapper) {
      let deff = Math.abs(download.top - wrapper.top) / 80

      const min = Math.round((Math.round((deff % 1) * 100) * 60) / 100)
      const hour = Math.round(deff)

      houers[0] = hour
      houers[1] = min
      let dragCopy: draggeddData = { ...draggedData() }
      const { endHour, endMinute } = calculateEndTime(hour, min, dragCopy.duration)
      dragCopy.startMin = houers[1]
      dragCopy.startHour = houers[0]
      dragCopy.endMin = endMinute
      dragCopy.endHour = endHour
      setDraggedData(dragCopy)
      const target = { ...draggedData() }
      target.left = e.clientX - dif[0] + 'px'
      target.top = e.clientY - dif[1] + 'px'
      setDraggedData(target)
    }

  })

  return { draggedData, isDragging, itemDragstart }
}

