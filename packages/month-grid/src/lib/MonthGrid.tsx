// Solid.js
import { For, Show, createMemo, mergeProps } from 'solid-js'
// Types
import { EventClass, FComponent, SourceEvent } from '@full-event-calendar/shared-ts'
// Styles
import './MonthGrid.scss'
// Components
import { EventModal, openModal } from './MonthModal/MonthModal'
import { MonthHeader } from './MonthHeader/MonthHeader'
import { MonthEvent } from './MonthEvent/MonthEvent'
// Utils
import { ArraySplitIntoChunks, getCalendarMonthDays } from '@full-event-calendar/utils'
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
  onEventUpdate: (_: SourceEvent) => {},
  onDateChange: () => {},
  onGridChange: () => {},
  locale: 'en-US',
  calendar: 'gregory',
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  rowLimit: 4
}

export const MonthGrid: FComponent<MonthGridProps> = (props) => {
  const mergedProps = mergeProps(defaultProps, props)

  const { onDragEnd, onDragStart, onMouseEnter, draggingEventData } = useMonthEventDragging()

  const filteredEvents = createMemo(() => sortEventByStart(mergedProps.events))

  const monthCalendarObject = createMemo(() => getCalendarMonthDays(mergedProps.initialDate, mergedProps.calendar))

  const monthDateRows = createMemo(() => ArraySplitIntoChunks(monthCalendarObject(), 7) as MonthDateObject[][])

  const monthRowGridData = createMemo(() => getMonthRows(monthDateRows(), filteredEvents()) as MonthGridData[])

  function openModalEvents(monthObject: MonthDateObject, e: MouseEvent) {
    openModal(monthObject, e, filteredEvents())
  }

  function ModalDragStart(draggingOnStartDate: Date, dragendEvent: EventClass) {
    onDragStart(dragendEvent, draggingOnStartDate)
  }

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

  function darClick(d: Date) {
    mergedProps.onDateChange(d)
    mergedProps.onGridChange('daily')
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
        <EventModal onDragEnd={dragEnd} onDragStart={ModalDragStart} />

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
                      isFirstRow={monthRowIndex() === 0}
                      isLastRow={monthRowIndex() === 4}
                      onDragEnd={() => {}}
                      ondragstart={() => {}}
                      item={draggingEventData() as unknown as EventClass}
                      endDate={monthRowArr[6].date}
                      startDate={monthRowArr[0].date}
                    />
                  </Show>
                </div>
                <div class="month-row-container" data-test-id-month-row={monthRowIndex()}>
                  <For each={Object.keys(monthRowGridData()[monthRowIndex()])}>
                    {(rowItemKey, rowItemIndex) => (
                      <div class="month-row-wrapper" data-test-id-row-wrapper={rowItemIndex()}>
                        <For each={monthRowGridData()[monthRowIndex()][rowItemKey]}>
                          {(dayObject) =>
                            rowItemIndex() + 1 <= mergedProps.rowLimit ? (
                              <MonthEvent
                                isFirstRow={monthRowIndex() === 0}
                                isLastRow={monthRowIndex() === 4}
                                onDragEnd={dragEnd}
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
                      mergedProps.rowLimit
                    )}
                  >
                    {(extraCount, j) => (
                      <div class="month-more-item">
                        <Show when={extraCount > 0}>
                          <div class="month-more-btn" onclick={[openModalEvents, monthRowArr[j()]]}>
                            {extraCount} +
                          </div>
                        </Show>
                      </div>
                    )}
                  </For>
                </div>
                <For each={monthRowArr}>
                  {(date) => (
                    <div class="month-container" onmousemove={() => onMouseEnter(date.date)}>
                      <div class="month-day-wrapper">
                        <span onclick={() => darClick(date.date)}>{date.day}</span>
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
