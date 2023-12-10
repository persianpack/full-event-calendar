// Types
import { EventClass, FComponent, SourceEvent } from '@full-event-calendar/shared-ts'
// Styles
import './WeeklyAllDayHeader.scss'
// Utils
import { filterEventsByDateRange, formatNumber } from '@full-event-calendar/utils'
import { addEventsToRows, getExtraRows, useMonthEventDragging } from '@full-event-calendar/month-grid'
// Components
import { MonthEvent } from '@full-event-calendar/month-grid'
// solid.js
import { For, Show, createMemo, createSignal, onMount } from 'solid-js'

interface WeeklyAllDayHeaderProps {
  events: EventClass[]
  cols: Date[]
  onEventUpdate: (event: any) => void
  locale: string
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
  const filteredEvents = createMemo(() =>
    rangedEvents().filter((item) => {
      return item.isAllDay()
    })
  )
  // Get Row list for all day header
  // each row consists of not overlapping events
  const getRowList = createMemo(() => {
    let rowList: rowList = {}
    addEventsToRows(filteredEvents(), rowList)
    return rowList
  })
  // Get overflowing events count for each colum grid
  const extraRowsData = createMemo(() => getExtraRows(getRowList(), props.cols[0], props.cols[6], 3))

  // Use monthly-grid hook for handling dragging logic
  const { onDragEnd, onDragStart, onMouseEnter, draggingEventData } = useMonthEventDragging()

  function dragEnd() {
    if (!!draggingEventData()) {
      const sourceE = { ...draggingEventData()?.source.sourceEvent }
      sourceE.start = draggingEventData()?.sourceStart as Date
      sourceE.end = draggingEventData()?.sourceEnd as Date
      if (sourceE) {
        //@ts-ignore
        props.onEventUpdate(sourceE)
      }
    }
    onDragEnd()
  }

  let allDRef: any
  const [isOpen, setIsOpen] = createSignal(false)
  function openAllD() {
    const el = allDRef as HTMLElement
    if (!isOpen()) {
      el.style.height = el.clientHeight + 0 + 'px'
      el.style.maxHeight = 'initial'
      setTimeout(() => {
        el.style.height = el.scrollHeight + 5 + 'px'
      }, 0)
      setTimeout(() => {
        el.style.height = 'fit-content'
      }, 500)
      setIsOpen(true)
    } else {
      el.style.height = el.clientHeight + 'px'
      setTimeout(() => {
        el.style.height = 55.6 * (filteredEvents().length > 2 ? 2 : filteredEvents().length) + 'px'
      }, 0)
      setTimeout(() => {
        el.style.maxHeight = '111px'
      }, 500)
      setIsOpen(false)
    }
  }
  onMount(() => {
    const el = allDRef as HTMLElement
    el.style.height = 55.6 * (filteredEvents().length > 2 ? 2 : filteredEvents().length) + 'px'
  })

  return (
    <div class={`${isOpen() ? 'weekly-allDay-open' : ''}`} style="display: flex;">
      <div class="mor-btn-container">
        <Show when={filteredEvents().length > 3}>
          <div class="all-collapser" onclick={openAllD}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M13.28 10.0333L8.93333 5.68667C8.42 5.17333 7.58 5.17333 7.06667 5.68667L2.72 10.0333"
                stroke="#7E7E7F"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </Show>
      </div>

      <div class="weekly-allDay" id="month-wrapper-id" ref={allDRef}>
        <div class="weeklymores">
          <For each={extraRowsData()}>
            {(item, i) => (
              <div onclick={openAllD} style={item === 0 ? 'opacity:0;pointer-events: none;' : ''}>
                {formatNumber(props.locale, item)} +
              </div>
            )}
          </For>
        </div>
        <div class="week-all-day-wrapper">
          {/* this is a dummy event thats show the preview of the dragging event */}
          <Show when={!!draggingEventData()}>
            <MonthEvent
              locale={props.locale}
              isFirstRow={true}
              onDragEnd={() => {}}
              ondragstart={() => {}}
              item={draggingEventData() as unknown as EventClass}
              startDate={props.cols[0]}
              endDate={props.cols[6]}
            />
          </Show>
        </div>
        {/* each colum box has a mouse move for handling drag  */}
        <div class="week-all-day-container123" data-test-id-all-w-c="1" onmousemove={() => onMouseEnter(props.cols[0])}>
          {/* loop on each row list */}
          <For each={Object.keys(getRowList())}>
            {(item) => (
              <div class="week-all-day-container">
                {/* loop on each event in a row list and use monthly grid components for this */}
                <For each={getRowList()[item]}>
                  {(item3) => (
                    <MonthEvent
                      locale={props.locale}
                      isFirstRow={true}
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
        <div
          class="week-all-day-container123"
          data-test-id-all-w-c="2"
          onmousemove={() => onMouseEnter(props.cols[1])}
        ></div>
        <div
          class="week-all-day-container123"
          data-test-id-all-w-c="3"
          onmousemove={() => onMouseEnter(props.cols[2])}
        ></div>
        <div
          class="week-all-day-container123"
          data-test-id-all-w-c="4"
          onmousemove={() => onMouseEnter(props.cols[3])}
        ></div>
        <div
          class="week-all-day-container123"
          data-test-id-all-w-c="5"
          onmousemove={() => onMouseEnter(props.cols[4])}
        ></div>
        <div
          class="week-all-day-container123"
          data-test-id-all-w-c="6"
          onmousemove={() => onMouseEnter(props.cols[5])}
        ></div>
        <div
          class="week-all-day-container123"
          data-test-id-all-w-c="7"
          onmousemove={() => onMouseEnter(props.cols[6])}
        ></div>
      </div>
    </div>
  )
}
