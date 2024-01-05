// Types
import { EventClass, FComponent, Group, SourceEvent } from '@full-event-calendar/shared-ts'
// Styles
import './WeeklyAllDayHeader.scss'
// Utils
import { filterEventsByDateRange, sortEventByStart } from '@full-event-calendar/utils'
import {
  MonthEventPreview,
  addEventsToRows,
} from '@full-event-calendar/month-grid'
// solid.js
import { createMemo, createSignal, onMount } from 'solid-js'
import { OpenAllDayBtn } from './OpenAllDayBtn/OpenAllDayBtn'
import { DateCol } from './DateCol/DateCol'
import { ShowMoreBtns } from './ShowMoreBtns/ShowMoreBtns'
import { useContainerAnimtion } from '../openWithAnimtion'

interface WeeklyAllDayHeaderProps {
  events : EventClass[]
  headerDates : Date[]
  onEventUpdate: (event: any) => void
  onAddEvent: (event: SourceEvent, groupId?: Group['id']) => void
  locale: string
}
export interface rowList {
  [key: string]: EventClass[]
}

export const WeeklyAllDayHeader: FComponent<WeeklyAllDayHeaderProps> = (props) => {
  //gets events in a week range from SAT to FRI
  const rangedEvents = createMemo(() =>
    sortEventByStart(filterEventsByDateRange(props.events, props.headerDates[0], props.headerDates[6]) as EventClass[])
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

  // Use monthly-grid hook for handling dragging logic
  // const { onDragEnd, onDragStart, onMouseEnter, draggingEventData,changeDraggerType} = useMonthEventDragging(dragEnd)
  const [draggingEventData, setdraggingEventData] = createSignal(null)

  let allDRef: any={
    value:null
  }

  const {isOpen,openAllD} = useContainerAnimtion(allDRef)

  onMount(() => {
    const el = allDRef.value as HTMLElement
    el.style.height = 'fit-content'
  })

  function getRowListArr() {
    return Object.keys(getRowList())
  }

  return (
    <div
      class={`${isOpen() ? 'weekly-allDay-open' : ''} ${draggingEventData() ? 'month-is-dragging' : ''}`}
      style="display: flex;"
    >
      <OpenAllDayBtn onClick={openAllD} show={getRowListArr().length > 3} />

      <div class="weekly-allDay" id="month-wrapper-id" ref={allDRef.value}>
        <ShowMoreBtns
          show={getRowListArr().length > 3}
          rowList={getRowList()}
          headerDates={props.headerDates}
          locale={props.locale}
          openAllDayContainer={openAllD}
          onClick={openAllD}
        />
        <div class="week-all-day-wrapper">
          {/* this is a dummy event thats show the preview of the dragging event */}
          <MonthEventPreview
            locale={props.locale}
            isFirstRow={true}
            onDragEnd={() => {}}
            ondragstart={() => {}}
            item={draggingEventData()!}
            startDate={props.headerDates[0]}
            endDate={props.headerDates[6]}
            dontCheackRange={true}
          ></MonthEventPreview>
        </div>
        <DateCol
          filteredEvents={filteredEvents()}
          onEventUpdate={props.onEventUpdate}
          onAddEvent={props.onAddEvent}
          headerDates={props.headerDates}
          locale={props.locale}
          setDraggingDate={setdraggingEventData}
        ></DateCol>
      </div>
    </div>
  )
}
