import { For, Show, createMemo, mergeProps, onMount } from 'solid-js'
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
  let containerRef: any = {
    current: ''
  }
  let wrapperContainer: any = { curret: '' }
  const props = mergeProps(defaultProps, propsC)

  const { onmousedownH } = useResize(containerRef, resizeCb)
  const { draggedData, isDragging, itemDragstart } = userDragger(containerRef, dragEnd, wrapperContainer)
  onMount(() => {
    if (props.container) {
      wrapperContainer.current = document.getElementById(props.container)
    } else {
      wrapperContainer.current = containerRef.current
    }
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
                <div class="event-colom">
                  <For each={colume}>
                    {(rowItem: EventClass) => {
                      return (
                        <div
                          onMouseDown={(e: MouseEvent) => {
                            itemDragstart(rowItem, e, !rowItem.doesEventStartOn(props.gridDate))
                          }}
                          id={'event-' + rowItem.id}
                          class={` ec-event`}
                          style={`${
                            rowItem.doesEventStartOn(props.gridDate) ? rowItem.calculatePositionTop() : 'top:0'
                          } ${rowItem.calculateHeight(
                            !rowItem.doesEventStartOn(props.gridDate)
                          )} ${lookForAvailableWith(ColList(), rowItem, Ciin() + 1)}`}
                        >
                          <div> id : {rowItem.id}</div>
                          <div>start :{rowItem.start.toString()}</div>
                          <div>
                            end :<span id={'event-end-' + rowItem.id}>{rowItem.end.toString()}</span>
                          </div>
                          <div onmousedown={[onmousedownH, rowItem]} class="resizer"></div>
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
          {(time) => {
            return (
              <>
                <div class="time-range">
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
