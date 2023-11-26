import { For, Show, createEffect, createMemo, mergeProps, onMount } from 'solid-js'
import type { FComponent, SourceEvent, EventClass, DraggedData } from '@full-event-calendar/shared-ts'
import { createLinesOfColum } from '../utils/coleLine'
import { userDragger } from '../hooks/eventDragging'
import { useResize } from '../hooks/eventResize'
import { TimeBar } from './TimeBar/TimeBar'
import { lookForAvailableWith } from '../utils/coleLine'
import './basicGrid.scss'
import { isDateToday } from '@full-event-calendar/utils'
import { Accessor, Component, createComputed, createSignal } from 'solid-js'
export interface BasicGridProps {
  events?: EventClass[]
  onEventUpdate?: (event: SourceEvent, dragData?: DraggedData) => void
  gridDate?: Date
  gridHeight?: number
  container?: string
}

const defaultProps = {
  events: [],
  onEventUpdate: () => {},
  gridDate: new Date(),
  gridHeight: 65 * 24
}

export const BasicGrid: FComponent<BasicGridProps> = (propsC) => {
  createEffect(() => {
    console.log(propsC.events)
  })
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
      console.log(wrapperContainer, props.container, containerRef.current)
      if (props.container) {
        wrapperContainer.current = document.getElementById(props.container)
      } else {
        wrapperContainer.current = containerRef.current
      }
    }, 0)
  })

  const ColList = createMemo(() => {
    const finalData = createLinesOfColum(props.events)
    return Object.values(finalData)
  })

  function dragEnd(a: DraggedData) {
    const sourceE = { ...a.item } as SourceEvent

    sourceE.start = a.dragedStartDate
    sourceE.end = a.dragedEndDate
    if (a.item) {
      props.onEventUpdate(sourceE, a)
    }
  }

  function resizeCb(a: any) {
    props.onEventUpdate(a)
  }

  function getDragingStyle() {
    return `width : ${draggedData().width};height : ${draggedData().height};left:${draggedData().left} ; transition : ${
      draggedData().animation
    } ;top:${draggedData().top};position:fixed;opacity:0.7`
  }
  const timess = [
    '1 AM',
    '2 am',
    '3 AM',
    '4 am',
    '5 AM',
    '6 am',
    '7 AM',
    '8 am',
    '9 AM',
    '10 am',
    '11 AM',
    '12 pm',
    '13 AM',
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
      <div ref={containerRef.current} class="fec-daily-grid" style={`height: ${props.gridHeight}px`}>
        <Show when={isDateToday(props.gridDate)}>
          <TimeBar container={containerRef} />
        </Show>
        <div class="holdcontainer" style={getWrapperHeight()}>
          <For each={ColList()}>
            {(colume, Ciin) => {
              return (
                <div class="event-colom" data-test-col-id={Ciin()}>
                  <For each={colume}>
                    {(event: EventClass) => {
                      return (
                        <div
                          onMouseDown={(e: MouseEvent) => {
                            itemDragstart(event, e, !event.doesEventStartOn(props.gridDate))
                          }}
                          id={'event-' + event.id}
                          class="ec-event"
                          data-test-event-id={event.id}
                          style={`${
                            event.doesEventStartOn(props.gridDate) ? event.calculatePositionTop() : 'top:0'
                          } ${event.calculateHeight(!event.doesEventStartOn(props.gridDate))} ${lookForAvailableWith(
                            ColList(),
                            event,
                            Ciin() + 1
                          )}`}
                        >
                          <div> id : {event.id}</div>
                          <div>start :{event.start.toString()}</div>
                          <div>
                            end :<span id={'event-end-' + event.id}>{event.end.toString()}</span>
                          </div>
                          <div onmousedown={[onmousedownH, event]} class="resizer"></div>
                        </div>
                      )
                    }}
                  </For>
                </div>
              )
            }}
          </For>
        </div>

        <div class="time-range">
          <div class="time-range-time">{timess[0]}</div>
          <div class="some-container">
            <div class="time-rage-up-container"> </div>
            <div class="time-rage-down-container"> </div>
          </div>
        </div>

        <For each={timess}>
          {(time, i) => {
            return (
              <>
                <div data-test-time-range-id={i() + 1} class="time-range">
                  <div class="time-range-time">{time}</div>
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
              <div> id : {draggedData().item?.id}</div>
              <div>start :{draggedData().dragedStartDate.toString()}</div>
              <div>end :{draggedData().dragedEndDate.toString()}</div>
            </div>
          </Show>
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
