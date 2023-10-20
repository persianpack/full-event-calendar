import './dailyGrid.scss'
import { For, Show, createEffect, createMemo, createSignal, getOwner, mergeProps, onMount } from 'solid-js'
import { EventImpl, SourceEvent } from '../api/EventImpl'
import { createLinesOfColome } from './coleLine'
import { userDrager } from './hooks/eventDraging'
import type { DraggeddData } from './hooks/eventDraging'
import { useResize } from './hooks/eventResize'
import { TimeBar } from './TimeBar/TimeBar'

interface DailyGridProps {
  events: EventImpl[]
  onEventUpdate: (event: SourceEvent) => void
}

export const DailyGrid: Component<DailyGridProps> = (props) => {
  const ColList = createMemo(() => {
    const finalData = createLinesOfColome(props.events)
    return Object.values(finalData)
  })

  let containerRef: any = {
    current: ''
  }

  function dragEnd(a: DraggeddData) {
    const sourceE = { ...a.item } as SourceEvent
    // sourceE.start =
    sourceE.start = a.startDate
    sourceE.end = a.endDate

    if (a.item) {
      props.onEventUpdate(sourceE)
    }
  }

  function resizeCb(a: any) {
    props.onEventUpdate(a)
  }

  const { onmousedownH } = useResize(containerRef, resizeCb)

  const { draggedData, isDragging, itemDragstart } = userDrager(containerRef, dragEnd)

  function getDragingStyle() {
    return `width : ${draggedData().width};height : ${draggedData().height};left:${draggedData().left} ; transition : ${
      draggedData().animation
    } ;top:${draggedData().top};position:fixed `
  }

  return (
    <>
      <div ref={containerRef.current} class="fec-daily-grid">
        <TimeBar container={containerRef} />
        <div class="time-range">
          0 AM
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
                          class={` ec-event`}
                          style={item.calculatePositionAndHeight()}
                        >
                          <div> id : {item.id}</div>
                          <div>start :{item.start.toString()}</div>
                          <div>
                            end :<span id={'event-end-' + item.id}>{item.end.toString()}</span>
                          </div>
                          <div onmousedown={[onmousedownH, item]} class="resizer"></div>
                        </div>
                      )
                    }}
                  </For>
                </div>
              )
            }}
          </For>
        </div>

        <div class="time-range">1 AM</div>
        <div class="time-range">2 AM</div>
        <div class="time-range">3 AM</div>
        <div class="time-range">4 AM</div>
        <div class="time-range">5 AM</div>
        <div class="time-range">6 AM</div>
        <div class="time-range">7 AM</div>
        <div class="time-range">8 AM</div>
        <div class="time-range">9 AM</div>
        <div class="time-range">10 AM</div>
        <div class="time-range">11 AM</div>
        <div class="time-range">12 PM</div>
        <div class="time-range">13 PM</div>
        <div class="time-range">14 PM</div>
        <div class="time-range">15 PM</div>
        <div class="time-range">16 PM</div>
        <div class="time-range">17 PM</div>
        <div class="time-range">18 PM</div>
        <div class="time-range">19 PM</div>
        <div class="time-range">20 PM</div>
        <div class="time-range">21 PM</div>
        <div class="time-range">22 PM</div>
        <div class="time-range">23 PM</div>
        <div class="wrapper-container">
          <Show when={isDragging()}>
            <div
              id={'draging-event-' + draggedData().item?.id}
              class={`drag-element ec-event drag-element-grabbiing`}
              style={getDragingStyle()}
            >
              <div> id : {draggedData().item?.id}</div>
              <div>start :{draggedData().startDate.toString()}</div>
              <div>end :{draggedData().endDate.toString()}</div>
            </div>
          </Show>
        </div>
      </div>
    </>
  )
}
