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
  gridDate: new Date()
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
    } ;top:${draggedData().top};position:fixed `
  }

  return (
    <>
      <div ref={containerRef.current} class="fec-daily-grid">
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
                          onMouseDown={[itemDragstart, rowItem]}
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
              <div>start :{draggedData().dragedStartDate.toString()}</div>
              <div>end :{draggedData().dragedEndDate.toString()}</div>
            </div>
          </Show>
        </div>
      </div>
    </>
  )
}
