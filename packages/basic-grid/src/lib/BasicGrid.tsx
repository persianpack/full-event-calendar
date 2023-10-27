import { For, Show, createMemo, mergeProps } from 'solid-js'
import type { FComponent, SourceEvent, EventClass, DraggeddData } from '@full-event-calendar/shared-ts'
import { createLinesOfColome } from '../utils/coleLine'
import { userDrager } from '../hooks/eventDraging'
import { useResize } from '../hooks/eventResize'
import { TimeBar } from './TimeBar/TimeBar'
import { lookworAvalibaleWith } from '../utils/coleLine'
import './basicGrid.scss'

export interface BasicGridProps {
  events?: EventClass[]
  onEventUpdate?: (event: SourceEvent, dragData?: DraggeddData) => void
  gridDate?: Date
}

const defaultProps = {
  events: [],
  onEventUpdate: () => {},
  gridDate: new Date(),
  dummyEvent: null
}

export const BasicGrid: FComponent<BasicGridProps> = (propsC) => {
  let containerRef: any = {
    current: ''
  }
  const props = mergeProps(defaultProps, propsC)

  const { onmousedownH } = useResize(containerRef, resizeCb)
  const { draggedData, isDragging, itemDragstart } = userDrager(containerRef, dragEnd)

  const ColList = createMemo(() => {
    const finalData = createLinesOfColome(props.events)
    return Object.values(finalData)
  })

  function dragEnd(a: DraggeddData) {
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
  return (
    <>
      <div ref={containerRef.current} class="fec-daily-grid">
        {/* <Show when={props.dummyEvent}>
          
        <div class='dummpyEvent' style={`${props.dummyEvent.calculatePositionTop()}`}>
          <div class='dummy-topLine'> </div>
          <div class='dummy-rightLine'> </div>
          <div class='dummy-leftLine'> </div>
          <div class='dummy-bottomLine'> </div>
        </div>
        </Show> */}
        <TimeBar container={containerRef} />
        <div class="time-range">
          0 AM
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
                          )} ${lookworAvalibaleWith(ColList(), rowItem, Ciin() + 1)}`}
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

        <div class="wrapper-container">
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
