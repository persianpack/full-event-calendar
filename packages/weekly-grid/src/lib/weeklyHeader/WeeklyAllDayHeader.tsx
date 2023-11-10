// Types
import { EventClass, FComponent } from '@full-event-calendar/shared-ts'
// Styles
import './WeeklyAllDayHeader.scss'
// Utils
import { filterEventsByDateRange } from '@full-event-calendar/utils'
import { addEventsToRows, getExtraRows, useMonthEventDragging } from '@full-event-calendar/month-grid'
// Componets
import { MonthEvent } from '@full-event-calendar/month-grid'
// solid.js
import { For, Show, createMemo } from 'solid-js'

interface WeeklyAllDayHeaderProps {
  events: EventClass[]
  columes: Date[]
}
interface rowList {
  [key: string]: EventClass[]
}

export const WeeklyAllDayHeader: FComponent<WeeklyAllDayHeaderProps> = (props) => {
  //geet events in a week range from SAT to FRI
  const rangedEvents = createMemo(
    () => filterEventsByDateRange(props.events, props.columes[0], props.columes[6]) as EventClass[]
  )
  //Get only All day Events
  const filterdEvents = () =>
    rangedEvents().filter((item) => {
      return item.isAllDay()
    })
  // Get Row list for all day header
  // each row consists of not overlaping events
  const getRowList = createMemo(() => {
    let rowList: rowList = {}
    addEventsToRows(filterdEvents(), rowList)
    return rowList
  })

  // Get overflowing evets count for each colume grid
  const extraRowsData = createMemo(() => getExtraRows(getRowList(), props.columes[0], props.columes[6], 2))

  // Use monthly-grid hook for handeling dragging logic
  const { onDragEnd, onDragStart, onMouseEnter, draggingEventData } = useMonthEventDragging()

  return (
    <div class="weekly-allDay" id="month-wrapper-id">
      <div class="week-all-day-wrapper">
        {/* this is a dummy event thats show the preview of the dragging event */}
        <Show when={!!draggingEventData()}>
          <MonthEvent
            onEnd={() => {}}
            ondrag={() => {}}
            item={draggingEventData() as unknown as EventClass}
            dateEnd={props.columes[6]}
            date={props.columes[0]}
          />
        </Show>
      </div>
      {/* each colome box has a mouse move for handeling drag  */}
      <div class="week-allday-container" onmousemove={(e) => onMouseEnter(props.columes[0])}>
        {/* loop on each row list */}
        <For each={Object.keys(getRowList())}>
          {(item) => (
            <div class="alld-con">
              {/* loop on each event in a row list and use monthly grid components for this */}
              <For each={getRowList()[item]}>
                {(item3) => (
                  <MonthEvent
                    onEnd={onDragEnd}
                    ondrag={onDragStart}
                    item={item3}
                    date={props.columes[0]}
                    dateEnd={props.columes[6]}
                  />
                )}
              </For>
            </div>
          )}
        </For>
      </div>
      <div class="week-allday-container" onmousemove={(e) => onMouseEnter(props.columes[1])}></div>
      <div class="week-allday-container" onmousemove={(e) => onMouseEnter(props.columes[2])}></div>
      <div class="week-allday-container" onmousemove={(e) => onMouseEnter(props.columes[3])}></div>
      <div class="week-allday-container" onmousemove={(e) => onMouseEnter(props.columes[4])}></div>
      <div class="week-allday-container" onmousemove={(e) => onMouseEnter(props.columes[5])}></div>
      <div class="week-allday-container" onmousemove={(e) => onMouseEnter(props.columes[6])}></div>
    </div>
  )
}
