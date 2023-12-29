import { For, Show, createMemo, createUniqueId, mergeProps, onMount } from 'solid-js'
import type { FComponent, SourceEvent, EventClass, DraggedData } from '@full-event-calendar/shared-ts'
import { createLinesOfColum } from '../utils/coleLine'
import { userDragger } from '../hooks/eventDragging'
import { useResize } from '../hooks/eventResize'
import { TimeBar } from './TimeBar/TimeBar'
import { lookForAvailableWith } from '../utils/coleLine'
import './basicGrid.scss'
import { EventImpl, getDateTimeRange, isDateToday } from '@full-event-calendar/utils'
import { Accessor, Component, createComputed, createSignal } from 'solid-js'
import { EventItem } from './EventItem/EventItem'
import { TimeRange } from './TimeRange/TimeRange'
export interface BasicGridProps {
  events?: EventClass[]
  onEventUpdate?: (event: SourceEvent, dragData?: DraggedData) => void
  onAddEvent?: (event: SourceEvent) => void
  gridDate?: Date
  gridHeight?: number
  container?: string
  id?: string
  locale?: string
  timeZone?:string
}

const defaultProps = {
  events: [],
  onEventUpdate: () => {},
  onAddEvent: () => {},
  gridDate: new Date(),
  gridHeight: 65 * 24,
  id: '',
  locale: 'en',
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
}

export const BasicGrid: FComponent<BasicGridProps> = (props) => {
  let gridRef: any = {
    current: ''
  }
  let gridContainer: any = { curret: '' }
  const mergedProps = mergeProps(defaultProps, props)


  const { onmousedownH } = useResize('eventResizer', resizeCb)
  const { draggedData, isDragging, itemDragstart } = userDragger(gridRef, dragEnd, gridContainer)

  onMount(() => {
    setTimeout(() => {
      if (mergedProps.container) {
        gridContainer.current = document.getElementById(mergedProps.container)
      } else {
        gridContainer.current = gridRef.current
      }
    }, 0)
  })

  const ColList = createMemo(() => {
    const finalData = createLinesOfColum(mergedProps.events)
    return Object.values(finalData)
  })

  function dragEnd(a: DraggedData) {
    const sourceE = { ...a.item?.sourceEvent }

    sourceE.start = a.eventSourceStart as Date
    sourceE.end = a.eventSourceEnd as Date
    if (a.item) {
      mergedProps.onEventUpdate(sourceE as SourceEvent, a)
    }
  }

  function resizeCb(a: any) {
    mergedProps.onEventUpdate(a)
  }

  function getDragingStyle() {
    return `width : ${draggedData().width};height : ${draggedData().height};left:${draggedData().left} ; transition : ${
      draggedData().animation
    } ;top:${draggedData().top};position:fixed;opacity:0.8;background-color:${draggedData().item.color}`
  }
  
  const timess = [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

  function getWrapperHeight() {
    return `height:${mergedProps.gridHeight / 24}px`
  }

  return (
    <>
      <div ref={gridRef.current} id={mergedProps.id} class="basic-grid">
        <div class="holdcontainer" style={getWrapperHeight()}>
        
          <For each={ColList()}>
            {(eventList, colNumber) => {
              return (
                <div class="event-colom" data-test-col-id={colNumber()}>
                  <For each={eventList}>
                    {(event: EventClass) => {
                      return (
                        <EventItem
                          locale={mergedProps.locale}
                          event={event}
                          gridDate={mergedProps.gridDate}
                          width={lookForAvailableWith(ColList(), event, colNumber() + 1)}
                          onMouseDown={onmousedownH}
                          onDragStart={itemDragstart}
                        ></EventItem>
                      )
                    }}
                  </For>
                </div>
              )
            }}
          </For>
        </div>

        <div class="fec-daily-grid" style={`height: ${mergedProps.gridHeight}px`}>
          {/* <div class="grid-border-left"></div> */}
          <Show when={isDateToday(mergedProps.gridDate)}>
            <TimeBar container={gridRef} />
          </Show>

          <For each={timess}>
            {(_, i) => {
              return (
                  <TimeRange 
                    onAddEvent={mergedProps.onAddEvent}
                    gridDate={mergedProps.gridDate}
                    locale={mergedProps.locale}
                    timeZone={mergedProps.timeZone}
                    houre={i()}
                  ></TimeRange>
              )
            }}
          </For>

          <div class="wrapper-container dragger-wrapper" style={getWrapperHeight()}>
            <Show when={isDragging()}>
              <div
                id={'draging-event-' + draggedData().item?.id}
                class={`drag-element ec-event drag-element-grabbiing`}
                style={getDragingStyle()}
              >
                <div> {draggedData().item?.name}</div>
                <div>{getDateTimeRange(draggedData().dragedStartDate, draggedData().dragedEndDate)}</div>
              </div>
            </Show>
          </div>
        </div>
      </div>
    </>
  )
}
