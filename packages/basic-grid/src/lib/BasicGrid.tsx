import { For, Show, createMemo, mergeProps, onMount } from 'solid-js'
import type { FComponent, SourceEvent, EventClass, DraggedData } from '@full-event-calendar/shared-ts'
import { createLinesOfColum } from '../utils/coleLine'
import { userDragger } from '../hooks/eventDragging'
import { useResize } from '../hooks/eventResize'
import { TimeBar } from './TimeBar/TimeBar'
import { lookForAvailableWith } from '../utils/coleLine'
import './basicGrid.scss'
import { getDateTimeRange, isDateToday } from '@full-event-calendar/utils'
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
    sourceE.start = a.dragedStartDate as Date
    sourceE.end = a.dragedEndDate as Date
    
    if (a.item) {
      // console.log(sourceE)
      mergedProps.onEventUpdate(sourceE as SourceEvent, a)
    }
  }

  function resizeCb(a: any) {
    mergedProps.onEventUpdate(a)
  }

  function getDragingStyle() {
    
    return `width : ${draggedData().width};height : ${draggedData().height};left:${draggedData().left} ; transition : ${
      draggedData().animation
    };${draggedData().animation ? 'box-shadow: none;opacity:0.9':''} ;top:${draggedData().top};position:fixed;background-color:${draggedData().item.color}`
  }

  const timess = [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

  function oneHoureInPixel(){
    return mergedProps.gridHeight / 24
  }
  
  function getWrapperHeight() {
    return `height:${oneHoureInPixel()}px`
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
                          oneHoureInPixel={oneHoureInPixel()}
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
