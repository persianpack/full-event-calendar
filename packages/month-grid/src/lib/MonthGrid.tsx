// Solid.js
import { For, Show, createMemo, mergeProps } from 'solid-js'
// Types
import { EventClass, FComponent } from '@full-event-calendar/shared-ts'
// Styles
import './MonthGrid.scss'
// Components
import { EventModal, openModal } from './MonthModal/MonthModal'
// Utils
import { ArraySplitIntoChunks, formatWeekDays, getCalendarMonthDays } from '@full-event-calendar/utils'
import { MonthEvent } from './MonthEvent/MonthEvent'
import { getMonthRows } from '../utils/EventRows'
import { isDateIncludedInaRange, sortEventByStart } from '@full-event-calendar/utils/src/filterEvents'
import { useMonthEventDragging } from '../utils/EventDragging'
import { getExtraRows } from '../utils/EventPosition'

interface WeeklyGridProps {
  events?: EventClass[]
  initialDate?: Date
  onEventUpdate?: (event: any) => void
  locale?: string
  calendar?: string
  timeZone?: string
  rowLimit?: number
}
export interface MonthDateObject {
  date: Date
  year: string | undefined
  month: string | undefined
  day: string | undefined
}
interface MonthGridData {
  [key: string]: EventClass[]
}

const defaultProps = {
  events: [],
  initialDate: new Date(),
  onEventUpdate: () => {},
  locale: 'en-US',
  calendar: 'gregory',
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  rowLimit: 4
}

export const MonthGrid: FComponent<WeeklyGridProps> = (props) => {
  const mergedProps = mergeProps(defaultProps, props)
  const { onDragEnd, onDragStart, onMouseEnter, draggingEventData } = useMonthEventDragging()

  const filteredEventsByMonth = createMemo(() => sortEventByStart(mergedProps.events.filter((item) => item.isAllDay())))
  const monthCalendarObject = createMemo(() => getCalendarMonthDays(mergedProps.initialDate, mergedProps.calendar))
  const monthDateRows = createMemo(() => ArraySplitIntoChunks(monthCalendarObject(), 7) as MonthDateObject[][])
  const monthRowGridData = createMemo(() => getMonthRows(monthDateRows(), filteredEventsByMonth()) as MonthGridData[])

  function openModalH(monthObject: MonthDateObject, e: MouseEvent) {
    openModal(monthObject, e, filteredEventsByMonth())
  }

  function formateWeekDate(date: Date) {
    return formatWeekDays(date, mergedProps.calendar, mergedProps.timeZone, mergedProps.locale)
  }

  function ModalDragStart(draggingOnStartDate: Date, eventDraged: EventClass) {
    onDragStart(eventDraged, draggingOnStartDate)
  }

  return (
    <>
      <div class="month-header">
        <div>{formateWeekDate(monthCalendarObject()[0].date)}</div>
        <div>{formateWeekDate(monthCalendarObject()[1].date)}</div>
        <div>{formateWeekDate(monthCalendarObject()[2].date)}</div>
        <div>{formateWeekDate(monthCalendarObject()[3].date)}</div>
        <div>{formateWeekDate(monthCalendarObject()[4].date)}</div>
        <div>{formateWeekDate(monthCalendarObject()[5].date)}</div>
        <div>{formateWeekDate(monthCalendarObject()[6].date)}</div>
      </div>
      <div class="month-wrapper" id="month-wrapper-id">
        <EventModal onDragEnd={onDragEnd} onDragStart={ModalDragStart} />

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
                      onDragEnd={() => {}}
                      ondragstart={() => {}}
                      item={draggingEventData() as unknown as EventClass}
                      endDate={monthRowArr[6].date}
                      startDate={monthRowArr[0].date}
                    />
                  </Show>
                </div>
                <div class="month-row-container">
                  <For each={Object.keys(monthRowGridData()[monthRowIndex()])}>
                    {(rowItemKey, rowItemIndex) => (
                      <div class="month-row-wrapper">
                        <For each={monthRowGridData()[monthRowIndex()][rowItemKey]}>
                          {(dayObject) =>
                            rowItemIndex() + 1 <= mergedProps.rowLimit ? (
                              <MonthEvent
                                onDragEnd={onDragEnd}
                                ondragstart={onDragStart}
                                item={dayObject}
                                endDate={monthRowArr[6].date}
                                startDate={monthRowArr[0].date}
                              />
                            ) : (
                              <></>
                            )
                          }
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
                      2
                    )}
                  >
                    {(extraCount, j) => (
                      <div class="month-more-item">
                        <Show when={extraCount > 0}>
                          <div class="month-more-btn" onclick={[openModalH, monthRowArr[j()]]}>
                            {extraCount} +
                          </div>
                        </Show>
                      </div>
                    )}
                  </For>
                </div>
                <For each={monthRowArr}>
                  {(date) => (
                    <div class="month-container" onmousemove={(e) => onMouseEnter(date.date)}>
                      {' '}
                      {date.day}
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
