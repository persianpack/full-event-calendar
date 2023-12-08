import { For, Show, createMemo, mergeProps, onMount } from 'solid-js'
import type { FComponent, SourceEvent, EventClass, DraggedData } from '@full-event-calendar/shared-ts'
import { createLinesOfColum } from '../utils/coleLine'
import { userDragger } from '../hooks/eventDragging'
import { useResize } from '../hooks/eventResize'
import { TimeBar } from './TimeBar/TimeBar'
import { lookForAvailableWith } from '../utils/coleLine'
import './basicGrid.scss'
import { getDateTimeRange, isDateToday } from '@full-event-calendar/utils'
import { Accessor, Component, createComputed, createSignal } from 'solid-js'
import { EventItem } from './EventItem/EventItem'
export interface BasicGridProps {
  events?: EventClass[]
  onEventUpdate?: (event: SourceEvent, dragData?: DraggedData) => void
  gridDate?: Date
  gridHeight?: number
  container?: string
  id?: string
}

const defaultProps = {
  events: [],
  onEventUpdate: () => {},
  gridDate: new Date(),
  gridHeight: 65 * 24,
  id: ''
}

export const BasicGrid: FComponent<BasicGridProps> = (propsC) => {
  let containerRef: any = {
    current: ''
  }
  let wrapperContainer: any = { curret: '' }
  const props = mergeProps(defaultProps, propsC)

  const { onmousedownH } = useResize(containerRef, resizeCb)
  const { draggedData, isDragging, itemDragstart } = userDragger(containerRef, dragEnd, wrapperContainer)
  onMount(() => {
    setTimeout(() => {
      // containerRef.current = document.getElementById('some-random-shit')
      if (props.container) {
        wrapperContainer.current = document.getElementById(props.container)
      } else {
        wrapperContainer.current = containerRef.current
      }
    }, 0)
  })
  // document.addEventListener('scroll',()=>{
  //   console.log('sdjaoisdj')
  // })
  const ColList = createMemo(() => {
    const finalData = createLinesOfColum(props.events)
    return Object.values(finalData)
  })

  function dragEnd(a: DraggedData) {
    const sourceE = { ...a.item?.sourceEvent }

    sourceE.start = a.eventSourceStart as Date
    sourceE.end = a.eventSourceEnd as Date
    if (a.item) {
      props.onEventUpdate(sourceE as SourceEvent, a)
    }
  }

  function resizeCb(a: any) {
    props.onEventUpdate(a)
  }

  function getDragingStyle() {
    return `width : ${draggedData().width};height : ${draggedData().height};left:${draggedData().left} ; transition : ${
      draggedData().animation
    } ;top:${draggedData().top};position:fixed;opacity:0.7;background-color:${draggedData().item.color}`
  }
  const timess = [
    '1 am',
    '2 am',
    '3 am',
    '4 am',
    '5 am',
    '6 am',
    '7 am',
    '8 am',
    '9 am',
    '10 am',
    '11 am',
    '12 pm',
    '13 pm',
    '14 pm',
    '15 pm',
    '16 pm',
    '17 pm',
    '18 pm',
    '19 pm',
    '20 pm',
    '21 pm',
    '22 pm',
    '23 pm'
  ]

  function getWrapperHeight() {
    return `height:${props.gridHeight / 24}px`
  }
  return (
    <>
      <div ref={containerRef.current} id={propsC.id} class="basic-grid">
        <div class="holdcontainer" style={getWrapperHeight()}>
          <For each={ColList()}>
            {(eventList, colNumber) => {
              return (
                <div class="event-colom" data-test-col-id={colNumber()}>
                  <For each={eventList}>
                    {(event: EventClass) => {
                      return (
                        <EventItem
                          event={event}
                          gridDate={props.gridDate}
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
        <div class="fec-daily-grid" style={`height: ${props.gridHeight}px`}>
          {/* <div class="grid-border-left"></div> */}
          <Show when={isDateToday(props.gridDate)}>
            <TimeBar container={containerRef} />
          </Show>

          <div class="time-range">
            <div class="time-range-time"> </div>
            <div class="some-container">
              <div class="time-rage-up-container"> </div>
              <div class="time-rage-down-container"> </div>
            </div>
          </div>

          <For each={timess}>
            {(_, i) => {
              return (
                <>
                  <div data-test-time-range-id={i() + 1} class="time-range">
                    {/* <div class="time-range-time">{time}</div> */}
                    <div class="some-container">
                      <div class="time-rage-up-container"> </div>
                      <div class="time-rage-down-container"> </div>
                    </div>
                  </div>
                </>
              )
            }}
          </For>

          <div class="wrapper-container" style={getWrapperHeight()}>
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

export function createHello(): [Accessor<string>, (to: string) => void] {
  const [hello, setHello] = createSignal('Hello World!')

  return [hello, (to: string) => setHello(`Hello ${to}!`)]
}

export const Hello: Component<{ to?: string }> = (props) => {
  const [hello, setHello] = createHello()

  // This will only log during development, console is removed in production
  console.log('Hello World!')

  createComputed(() => {
    if (typeof props.to === 'string') setHello(props.to)
  })

  return (
    <>
      <div>{hello()}</div>
    </>
  )
}
