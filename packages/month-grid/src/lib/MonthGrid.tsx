// Solid.js
import { For, Show, createMemo, createSignal, mergeProps } from 'solid-js'
// Types
import { EventClass, FComponent, SourceEvent } from '@full-event-calendar/shared-ts'
// Styles
import './MonthGrid.scss'
// Components
import { EventModal, openModal } from './MonthModal/MonthModal'
import { MonthHeader } from './MonthHeader/MonthHeader'
import { MonthEvent } from './MonthEvent/MonthEvent'
// Utils
import { ArraySplitIntoChunks, formatNumber, getCalendarMonthDays, getMonthName } from '@full-event-calendar/utils'
import { getMonthRows } from '../utils/EventRows'
import { isDateIncludedInaRange, sortEventByStart } from '@full-event-calendar/utils'
import { useMonthEventDragging } from '../utils/EventDragging'
import { getExtraRows } from '../utils/EventPosition'

export interface MonthGridProps {
  events?: EventClass[]
  initialDate?: Date
  onEventUpdate?: (event: SourceEvent) => void
  locale?: string
  calendar?: string
  timeZone?: string
  rowLimit?: number
  onDateChange?: (d: Date) => void
  onGridChange?: (d: any) => void
  editable?:boolean
}
export interface MonthDateObject {
  date: Date
  year: string | undefined
  month: string | undefined
  day: string | undefined
  isOutCalendarMonth: boolean
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
  locale: 'en-US',
  calendar: 'gregory',
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  rowLimit: 4,
  editable:false
}

export const MonthGrid: FComponent<MonthGridProps> = (props) => {
  const mergedProps = mergeProps(defaultProps, props)
  const [rowLimit, setRowLimit] = createSignal(4)

  const { onDragEnd, onDragStart, onMouseEnter, draggingEventData } = useMonthEventDragging()

  const filteredEvents = createMemo(() => sortEventByStart(mergedProps.events))

  const monthCalendarObject = createMemo(() => getCalendarMonthDays(mergedProps.initialDate, mergedProps.calendar))

  const monthDateRows = createMemo(() => ArraySplitIntoChunks(monthCalendarObject(), 7) as MonthDateObject[][])

  const monthRowGridData = createMemo(() => {
    setRowLimit(monthDateRows().length > 5 ? 3 : 4)
    return getMonthRows(monthDateRows(), filteredEvents()) as MonthGridData[]
  })

  function openModalEvents(monthObject: MonthDateObject, e: MouseEvent) {
    openModal(monthObject, e, filteredEvents())
  }

  function ModalDragStart(draggingOnStartDate: Date, dragendEvent: EventClass) {
    onDragStart(dragendEvent, draggingOnStartDate)
  }

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

  function dragClick(d: Date) {
    mergedProps.onDateChange(d)
    mergedProps.onGridChange('daily')
  }

  function getRowLimit(arr: any) {
    return arr.slice(0, rowLimit())
  }

  return (
    <>
      <MonthHeader
        headerData={monthCalendarObject()}
        locale={mergedProps.locale}
        timeZone={mergedProps.timeZone}
        calendar={mergedProps.calendar}
      ></MonthHeader>
      <div class="month-wrapper" id="month-wrapper-id">
        <EventModal locale={mergedProps.locale} onDragEnd={dragEnd} onDragStart={ModalDragStart} />

        <For each={monthDateRows()}>
          {(monthRowArr, monthRowIndex) => {
            return (
              <div class="month-row">
                <div class="dragging-wrapper">
                  <Show
                    when={
                      !!draggingEventData() &&
                      isDateIncludedInaRange(
                        draggingEventData() as unknown as EventClass,
                        monthRowArr[0].date,
                        monthRowArr[6].date
                      )
                    }
                  >
                    <MonthEvent
                      locale={mergedProps.locale}
                      isFirstRow={monthRowIndex() === 0}
                      onDragEnd={() => {}}
                      ondragstart={() => {}}
                      item={draggingEventData() as unknown as EventClass}
                      endDate={monthRowArr[6].date}
                      startDate={monthRowArr[0].date}
                    />
                  </Show>
                </div>
                <div class="month-row-container" data-test-id-month-row={monthRowIndex()}>
                  <For each={getRowLimit(Object.keys(monthRowGridData()[monthRowIndex()]))}>
                    {(rowItemKey, rowItemIndex) => (
                      <div class="month-row-wrapper" data-test-id-row-wrapper={rowItemIndex()}>
                        <For each={monthRowGridData()[monthRowIndex()][rowItemKey]}>
                          {(dayObject) => (
                            <MonthEvent
                              locale={mergedProps.locale}
                              isFirstRow={monthRowIndex() === 0}
                              onDragEnd={dragEnd}
                              ondragstart={onDragStart}
                              item={dayObject}
                              endDate={monthRowArr[6].date}
                              startDate={monthRowArr[0].date}
                            />
                          )}
                        </For>
                      </div>
                    )}
                  </For>
                </div>
                <div class="month-more-wrapper">
                  <For
                    each={getExtraRows(
                      monthRowGridData()[monthRowIndex()],
                      monthRowArr[0].date,
                      monthRowArr[6].date,
                      rowLimit()
                    )}
                  >
                    {(extraCount, j) => (
                      <div class="month-more-item">
                        <Show when={extraCount > 0}>
                          <div class="month-more-btn" onclick={[openModalEvents, monthRowArr[j()]]}>
                            {formatNumber(mergedProps.locale, extraCount as any)} +
                          </div>
                        </Show>
                      </div>
                    )}
                  </For>
                </div>
                <For each={monthRowArr}>
                  {(date, i) => (
                    <div class="month-container" onmousemove={() => onMouseEnter(date.date)}>
                      <div class={`month-day-wrapper ${isDateOne(date, i(), monthRowIndex(), monthRowArr)}`}>
                        <div onclick={() => dragClick(date.date)}>
                          <span>{formatNumber(mergedProps.locale, date.day as any)}</span>
                          <div class="month-name">
                            {getMonthName(mergedProps.calendar, date.date, mergedProps.locale)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </For>
              </div>
            )
          }}
        </For>
      </div>
    </>
  )
}

function isDateOne(date: MonthDateObject, index: number, monthRowIndex: number, monthRowArr: MonthDateObject[]) {
  if (date.isOutCalendarMonth) {
    if (monthRowIndex === 0) {
      return date.month != monthRowArr[index + 1]?.month ? 'month-day-out' : 'month-day-out-no-name'
    } else if (date.isOutCalendarMonth) {
      return date.month != monthRowArr[index - 1]?.month ? 'month-day-out' : 'month-day-out-no-name'
    }
  }
  return ''
}
