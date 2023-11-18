// Types
import { EventClass, FComponent, SourceEvent } from '@full-event-calendar/shared-ts'
// Styles
import './WeeklyAllDayHeader.scss'
// Utils
import { filterEventsByDateRange } from '@full-event-calendar/utils'
import { addEventsToRows, getExtraRows, useMonthEventDragging } from '@full-event-calendar/month-grid'
// Components
import { MonthEvent } from '@full-event-calendar/month-grid'
// solid.js
import { For, Show, createMemo } from 'solid-js'

interface WeeklyAllDayHeaderProps {
  events: EventClass[]
  cols: Date[]
  onEventUpdate: (event: any) => void
}
interface rowList {
  [key: string]: EventClass[]
}

export const WeeklyAllDayHeader: FComponent<WeeklyAllDayHeaderProps> = (props) => {
  //gets events in a week range from SAT to FRI
  const rangedEvents = createMemo(
    () => filterEventsByDateRange(props.events, props.cols[0], props.cols[6]) as EventClass[]
  )
  //Get only All day Events
  const filteredEvents = () =>
    rangedEvents().filter((item) => {
      return item.isAllDay()
    })
  // Get Row list for all day header
  // each row consists of not overlapping events
  const getRowList = createMemo(() => {
    let rowList: rowList = {}
    addEventsToRows(filteredEvents(), rowList)
    return rowList
  })

  // Get overflowing events count for each colum grid
  const extraRowsData = createMemo(() => getExtraRows(getRowList(), props.cols[0], props.cols[6], 2))

  // Use monthly-grid hook for handling dragging logic
  const { onDragEnd, onDragStart, onMouseEnter, draggingEventData } = useMonthEventDragging()

  function dragEnd() {
    if (!!draggingEventData()) {
      const sourceE = { ...draggingEventData()?.source } as SourceEvent
      sourceE.start = draggingEventData()?.start as Date
      sourceE.end = draggingEventData()?.end as Date
      if (sourceE) {
        //@ts-ignore
        props.onEventUpdate(sourceE)
      }
    }
    onDragEnd()
  }

  return (
    <div class="weekly-allDay" id="month-wrapper-id">
      <div class="week-all-day-wrapper">
        {/* this is a dummy event thats show the preview of the dragging event */}
        <Show when={!!draggingEventData()}>
          <MonthEvent
            isFirstRow={true}
            isLastRow={true}
            onDragEnd={() => {}}
            ondragstart={() => {}}
            item={draggingEventData() as unknown as EventClass}
            startDate={props.cols[0]}
            endDate={props.cols[6]}
          />
        </Show>
      </div>
      {/* each colum box has a mouse move for handling drag  */}
      <div class="week-all-day-container" onmousemove={() => onMouseEnter(props.cols[0])}>
        {/* loop on each row list */}
        <For each={Object.keys(getRowList())}>
          {(item) => (
            <div class="week-all-day-container">
              {/* loop on each event in a row list and use monthly grid components for this */}
              <For each={getRowList()[item]}>
                {(item3) => (
                  <MonthEvent
                    isFirstRow={true}
                    isLastRow={true}
                    onDragEnd={dragEnd}
                    ondragstart={onDragStart}
                    item={item3}
                    startDate={props.cols[0]}
                    endDate={props.cols[6]}
                  />
                )}
              </For>
            </div>
          )}
        </For>
      </div>
      <div class="week-all-day-container" onmousemove={() => onMouseEnter(props.cols[1])}></div>
      <div class="week-all-day-container" onmousemove={() => onMouseEnter(props.cols[2])}></div>
      <div class="week-all-day-container" onmousemove={() => onMouseEnter(props.cols[3])}></div>
      <div class="week-all-day-container" onmousemove={() => onMouseEnter(props.cols[4])}></div>
      <div class="week-all-day-container" onmousemove={() => onMouseEnter(props.cols[5])}></div>
      <div class="week-all-day-container" onmousemove={() => onMouseEnter(props.cols[6])}></div>
    </div>
  )
}
