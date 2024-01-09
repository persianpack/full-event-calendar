// Solid.js
import { For, Show, createMemo, createSignal, createUniqueId, mergeProps } from 'solid-js'
// Types
import { EventClass, FComponent, Group, SourceEvent } from '@full-event-calendar/shared-ts'
// Styles
import './MonthGrid.scss'
// Components
import { EventModal, openModal } from './MonthModal/MonthModal'
import { MonthHeader } from './MonthHeader/MonthHeader'
import { MonthEvent } from './MonthGridRow/MonthRowEvents/MonthEvent/MonthEvent'
// Utils
import { ArraySplitIntoChunks, EventImpl, formatNumber, getCalendarMonthDays, getMonthName } from '@full-event-calendar/utils'
import { getMonthRows } from '../utils/EventRows'
import { sortEventByStart } from '@full-event-calendar/utils'
import { useMonthEventDragging } from '../utils/EventDragging'
import { getExtraRowsCount } from '../utils/EventPosition'
import { MonthEventPreview } from './MonthGridRow/MonthEventPreview/MonthEventPreview'
import { DraggerTypes } from '../utils/RowDragger'
import { MonthGridRow } from './MonthGridRow/MonthGridRow'

export interface MonthGridProps {
  events?: EventClass[]
  initialDate?: Date
  onEventUpdate?: (event: SourceEvent) => void
  locale?: string
  calendar?: string
  timeZone?: string
  rowLimit?: number
  onDateChange?: (d: Date) => void
  onAddEvent?:(event: SourceEvent,groupId?:Group['id']) =>void
  onGridChange?: (d: any) => void
  editable?:boolean
}

export interface MonthDateObject {
  date: Date
  year: string | undefined
  month: string | undefined
  day: string | undefined
  isDateInsideMonth: boolean
}
interface MonthGridData {
  [key: string]: EventClass[]
}

const defaultProps = {
  events: [],
  initialDate: new Date(),
  onEventUpdate: (_: SourceEvent) => {},
  onDateChange: () => {},
  onGridChange: () => {},
  onAddEvent: () => {},
  locale: 'en-US',
  calendar: 'gregory',
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  rowLimit: 4,
  editable:false
}

export const MonthGrid: FComponent<MonthGridProps> = (props) => {
  const mergedProps = mergeProps(defaultProps, props)
  const [rowLimit, setRowLimit] = createSignal(4)

  const { onDragEnd, onDragStart, onMouseEnter, draggingEventData,changeDraggerType } = useMonthEventDragging(dragEnd)

  const sortedEvents = createMemo(() => sortEventByStart(mergedProps.events))

// [
  // {
  //   date: Date;
  //   isDateInsideMonth: boolean; is data inside selected month
  //   year: string;
  //   month: string;
  //   day: string;
  // },
  // ... 30 more
// ]
// return array of the monty dates is the format above
  const monthCalendarDates = createMemo(() => getCalendarMonthDays(mergedProps.initialDate, mergedProps.calendar))

  //split monthCalendarDates to 7 arrays for month grid 
  //row 1 --- monthCalendarDates[]
  //row 2 --- monthCalendarDates[]
  //row 3 --- monthCalendarDates[]
  //row 4 --- monthCalendarDates[]
  //row 5 --- monthCalendarDates[]
  const monthDatesRows = createMemo(() => ArraySplitIntoChunks(monthCalendarDates(), 7) as MonthDateObject[][])


  //filter and handel overlapping events
  // row 1 -- eventlist[]
  // row n -- eventlist[]
  const monthRowsData = createMemo(() => {
    setRowLimit(monthDatesRows().length > 5 ? 3 : 4)
    return getMonthRows(monthDatesRows(), sortedEvents()) as MonthGridData[]
  })

  function openModalEvents(monthObject: MonthDateObject, e: MouseEvent) {
    openModal(monthObject, e, sortedEvents())
  }

  function ModalDragStart(draggingOnStartDate: Date,e:MouseEvent, dragendEvent: EventClass) {
    onDragStart(dragendEvent,e, draggingOnStartDate)
  }

  function dragEnd(event:EventClass,draggerMode:DraggerTypes) {
    if(draggerMode === 'editEventRow'){
      mergedProps.onEventUpdate(event)
    }else{
      mergedProps.onAddEvent(event)
    }
  }

  function dragClick(e:MouseEvent,d: Date) {
    e.stopPropagation()
    e.preventDefault()
 
    mergedProps.onDateChange(d)
    mergedProps.onGridChange('daily')
  }

  function monthDateMouseDown(date:Date,e:MouseEvent){
    e.stopPropagation()
    e.preventDefault()

    const basdate = new Date(date)
    const endDate = new Date(date)
    basdate.setHours(0, 0)
    endDate.setHours(23,59,59)

    const x = new EventImpl({ start: basdate, end: endDate, name: '(no title)', id: createUniqueId() })
    changeDraggerType('addEventRow')
    onDragStart(x,e)
    const handeler = ()=>{
      onDragEnd()
      changeDraggerType('editEventRow')
      document.removeEventListener('mouseup',handeler)
    }
    document.addEventListener('mouseup',handeler)
  }


  return (
    <>
      <MonthHeader
        headerData={monthCalendarDates()}
        locale={mergedProps.locale}
        timeZone={mergedProps.timeZone}
        calendar={mergedProps.calendar}
      ></MonthHeader>
      <div class="month-wrapper" id="month-wrapper-id">
        <EventModal locale={mergedProps.locale} onDragEnd={onDragEnd} onDragStart={ModalDragStart} />
        <For each={monthDatesRows()}>
          {(monthRowDates, monthRowIndex)=>(
            <MonthGridRow
               locale={props.locale!}
               monthRowIndex={monthRowIndex()}
               monthRowDates={monthRowDates}
               draggingEventData={draggingEventData()!}
               rowLimit={rowLimit()}
               calendar={props.calendar!}
               monthRowData={monthRowsData()[monthRowIndex()]}
               openModalEvents={openModalEvents}
               dragClick={dragClick}
               onDragEnd={onDragEnd}
               onDragStart={onDragStart}
               monthDateMouseDown={monthDateMouseDown}
               onMouseEnter={onMouseEnter}
            ></MonthGridRow>
          )}
        </For>
      </div>
    </>
  )
}