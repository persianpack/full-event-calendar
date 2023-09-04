import './dailyGrid.scss'
import { For, Show, createEffect, createSignal, getOwner, mergeProps } from 'solid-js'
import { EventImpl } from '../api/EventImpl'

import { JSX } from 'solid-js'

interface ColList {
  [key: number]: EventImpl[]
}

function createLinesOfColome(eventList: EventImpl[]) {
  const eventListCopy = [...eventList]

  eventListCopy.sort(function (a, b) {
    return new Date(a.start).valueOf() - new Date(b.start).valueOf()
  })

  const colList: ColList = {
    1: []
  }

  function findAvalibaleCol(colNumber: number, event: EventImpl): number {
    if (!colList[colNumber]) {
      colList[colNumber] = []
    }

    const colEvents = colList[colNumber]
    let isColAvalibale = true

    for (let i = 0; i < colEvents.length; i++) {
      if (event.checkOverLap(colEvents[i])) {
        isColAvalibale = false
        break
      }
    }

    if (!isColAvalibale) {
      return findAvalibaleCol(colNumber + 1, event)
    }

    return colNumber
  }

  for (let i = 0; i < eventListCopy.length; i++) {
    const num = findAvalibaleCol(1, eventListCopy[i])
    colList[num].push(eventListCopy[i])
  }

  return colList
}

export const DailyGrid: Component<{ events: EventImpl[] }> = (props) => {
  const ColList = () => {
    const finalData = createLinesOfColome(props.events)
    return Object.values(finalData)
  }

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
  }
  const [isDragging, setIsDragging] = createSignal(false)
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
    duration: 0
  }
  const [draggedData, setDraggedData] = createSignal<draggeddData>(initialDragNode)

  const dif = [0, 0]
  const houers = [0, 0]

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
    const target = document.getElementById(`event-${e.id}`) as HTMLElement

    let clonedNode: draggeddData = initialDragNode
    const targetElement = target.getBoundingClientRect()

    dif[0] = d.pageX - targetElement.left
    dif[1] = d.pageY - target.offsetTop

    clonedNode.width = target.clientWidth + 3 + 'px'
    clonedNode.height = target.clientHeight + 2 + 'px'
    clonedNode.item = e

    clonedNode.left = targetElement.left + 0 + 'px'
    clonedNode.top = targetElement.top + 0 + 'px'
    clonedNode.duration = e.duration
    setDraggedData(clonedNode)

    setIsDragging(true)
    // d.dataTransfer.setDragImage(document.createElement('div'), 0, 0);
  }

  document.addEventListener('mouseup', () => {
    if (isDragging()) {
      setIsDragging(false)
      console.log('downlaod ', houers[0], houers[1])
    }
  })

  document.addEventListener('mousemove', (e) => {
    if (!isDragging()) return
    const wrapper = document.querySelector('.fec-daily-grid')?.getBoundingClientRect()
    const download = document.getElementById(`draging-event-${draggedData().item?.id}`)?.getBoundingClientRect()
    if (download && wrapper) {
      let deff = Math.abs(download.top - wrapper.top) / 80
      let deff2 = Math.abs(download.bottom - wrapper.top) / 80

      const min = Math.floor((Math.floor((deff % 1) * 100) * 60) / 100)
      const hour = Math.floor(deff)

      houers[0] = hour
      houers[1] = min
      let dragCopy: draggeddData = { ...draggedData() }
      const { endHour, endMinute } = calculateEndTime(hour, min, dragCopy.duration)
      dragCopy.startMin = houers[1]
      dragCopy.startHour = houers[0]
      dragCopy.endMin = endMinute
      dragCopy.endHour = endHour
      setDraggedData(dragCopy)
    }

    mouseMove(e)
  })

  function mouseMove(d: MouseEvent) {
    const target = { ...draggedData() }
    target.left = d.clientX - dif[0] + 'px'
    target.top = d.clientY - dif[1] + 'px'
    setDraggedData(target)
  }

  function getDragingStyle() {
    return `width : ${draggedData().width};height : ${draggedData().height};left:${draggedData().left} ;top:${
      draggedData().top
    } `
  }

  return (
    <>
      <div class="fec-daily-grid">
        <div class="time-range">
          <For each={ColList()}>
            {(key: EventImpl[]) => {
              return (
                <div class="event-colom">
                  <For each={key}>
                    {(item) => {
                      return (
                        <div
                          onMouseDown={[itemDragstart, item]}
                          id={'event-' + item.id}
                          class={`drag-element ec-event`}
                          style={item.calculatePositionAndHeight()}
                        >
                          <div> id : {item.id}</div>
                          <div>start :{item.start.toString()}</div>
                          <div>end :{item.end.toString()}</div>
                        </div>
                      )
                    }}
                  </For>
                </div>
              )
            }}
          </For>
        </div>

        <div class="time-range">123</div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="wrapper-container">
          <Show when={isDragging()}>
            <div
              id={'draging-event-' + draggedData().item?.id}
              class={`drag-element ec-event`}
              style={draggedData().item?.calculatePositionAndHeight() + getDragingStyle()}
            >
              <div> id : {draggedData().item?.id}</div>
              <div>start :{draggedData().startHour.toString() + ' : ' + draggedData().startMin.toString()}</div>
              <div>end ::{draggedData().endHour.toString() + ' : ' + draggedData().endMin.toString()}</div>
            </div>
          </Show>
        </div>
      </div>
    </>
  )
}
