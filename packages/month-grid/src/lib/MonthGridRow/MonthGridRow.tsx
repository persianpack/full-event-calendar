import { FComponent } from '@full-event-calendar/shared-ts'
import { MonthEventPreview } from '../..'
import { NewDraggingController } from '@full-event-calendar/utils'
import { MonthDateObject } from '../MonthGrid'
import { MonthEventRows } from './MonthRowEvents/MonthEventRows'
import { MonthRowMoreBtns } from './MonthRowMoreBtns/MonthRowMoreBtns'
import { MonthDateContainer } from './MonthDateContainer/MonthDateContainer'
import './MonthGridRow.scss'
interface MonthGridRowProps {
  locale: string
  monthRowIndex: number // props.monthRowIndex
  monthRowDates: MonthDateObject[] // monthRowArr
  draggingEventData: NewDraggingController // draggingEventData()
  rowLimit: number // props.rowLimit
  calendar: string // props
  monthRowData: any // monthRowData()[monthRowIndex()]
  openModalEvents: any // openModalEvents
  dragClick: any //
  onDragEnd: any //
  onDragStart: any //
  monthDateMouseDown: any //
  onMouseEnter: any //
  eventClick: any //
}

export const MonthGridRow: FComponent<MonthGridRowProps> = (props) => {

  return (
    <div class="month-row">
      <div class="dragging-wrapper">
        {/* for event draging */}
        <MonthEventPreview
          locale={props.locale}
          isFirstRow={props.monthRowIndex === 0}
          onDragEnd={() => {}}
          ondragstart={() => {}}
          item={props.draggingEventData}
          startDate={props.monthRowDates[0].date}
          endDate={props.monthRowDates[6].date}
        />
      </div>
        {/* rows of event , maxed out to row limit */}
        <MonthEventRows
          locale={props.locale}
          monthRowIndex={props.monthRowIndex}
          monthRowDates={props.monthRowDates}
          rowLimit={props.rowLimit}
          monthRowData={props.monthRowData}
          onDragEnd={props.onDragEnd}
          onDragStart={props.onDragStart}
          eventClick={props.eventClick}
        />
        {/* for showing more bts */}
        <MonthRowMoreBtns
          locale={props.locale}
          monthRowDates={props.monthRowDates}
          rowLimit={props.rowLimit} 
          monthRowData={props.monthRowData}
          openModalEvents={props.openModalEvents}
        />
        {/* the data contaner */}
        <MonthDateContainer
          locale={props.locale}
          monthRowIndex={props.monthRowIndex}
          monthRowDates={props.monthRowDates}
          calendar={props.calendar}
          dragClick={props.dragClick}
          monthDateMouseDown={props.monthDateMouseDown}
          onMouseEnter={props.onMouseEnter}
        />

    </div>
  )
}
