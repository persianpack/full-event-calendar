import { FComponent } from '@full-event-calendar/shared-ts'
import { For } from 'solid-js'
import { MonthEvent } from '../../..'
import { MonthDateObject } from '../../MonthGrid'
import './MonthRowEvents.scss'
interface MonthEventRowsProps {
  locale: string
  monthRowIndex: number // props.monthRowIndex
  monthRowDates: MonthDateObject[] // monthRowArr
  // draggingEventData: NewDraggingController // draggingEventData()
  rowLimit: number // props.rowLimit
  // calendar: string // props
  monthRowData: any // monthRowData()[monthRowIndex()]
  // openModalEvents: any // openModalEvents
  // dragClick: any //
  onDragEnd: any //
  onDragStart: any //
  eventClick: any //
  // monthDateMouseDown: any //
  // onMouseEnter: any //
}

export const MonthEventRows: FComponent<MonthEventRowsProps> = (props) => {
  function getRowLimit(arr: any) {
    return arr.slice(0, props.rowLimit)
  }

  return (
    <>
      <div class="fec-month-row-container" data-test-id-fec-month-row={props.monthRowIndex}>
        <For each={getRowLimit(Object.keys(props.monthRowData))}>
          {(rowItemKey, rowItemIndex) => (
            <div class="fec-month-row-wrapper" data-test-id-row-wrapper={rowItemIndex()}>
              <For each={props.monthRowData[rowItemKey]}>
                {(dayObject) => (
                  <MonthEvent
                    locale={props.locale}
                    isFirstRow={props.monthRowIndex === 0}
                    onDragEnd={props.onDragEnd}
                    ondragstart={props.onDragStart}
                    onClick={props.eventClick}
                    item={dayObject}
                    endDate={props.monthRowDates[6].date}
                    startDate={props.monthRowDates[0].date}
                  />
                )}
              </For>
            </div>
          )}
        </For>
      </div>
    </>
  )
}
