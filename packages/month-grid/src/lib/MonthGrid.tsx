import { EventClass, FComponent, SourceEvent } from '@full-event-calendar/shared-ts'
import { createMutable } from 'solid-js/store'
import { For, Show, batch, createEffect, createMemo, createSignal, mergeProps, onCleanup } from 'solid-js'
import { GroupGrid } from '@full-event-calendar/group-grid'
import {
  ArraysplitIntoChunks,
  filterEventsByDateRange,
  formatWeekDays,
  getCalendarMonthDays,
  getEventForAdate
} from '@full-event-calendar/utils'
import { MonthEvent, getExtraRows } from './MonthEvent/MonthEvent'
import { getMonthRows } from '../utils/EventRows'

import './MonthGrid.scss'
import { isDateIncludedInaRange } from '@full-event-calendar/utils/src/filterEvents'
import { EventModal, openModal } from './MonthModal/MonthModal'
import { useMonthEventDragging } from '../utils/EventDragging'

const defaultProps = {
  events: [],
  initialDate: new Date(),
  onEventUpdate: () => {},
  locale: 'en-US',
  calendar: 'gregory',
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
}

interface WeeklyGridProps {
  events?: EventClass[]
  initialDate?: Date
  onEventUpdate?: (event: any) => void
  locale?: string
  calendar?: string
  timeZone?: string
}
export interface MonthDateObject {
  date: Date
  year: string | undefined
  month: string | undefined
  day: string | undefined
}
interface monthGridData {
  [key: string]: EventClass[]
}

const rowLimit = 4

export const MonthGrid: FComponent<WeeklyGridProps> = (props) => {
  const mergedPorps = mergeProps(defaultProps, props)

  const filteredEvents3 = createMemo(
    () =>
      mergedPorps.events
        .filter((item) => item.isAllDay())
        .sort(function (a, b) {
          return new Date(a.start).valueOf() - new Date(b.start).valueOf()
        }) as EventClass[]
  )

  const data = getCalendarMonthDays(mergedPorps.initialDate, mergedPorps.calendar)

  const res = ArraysplitIntoChunks(data, 7) as MonthDateObject[][]

  const Mrows = getMonthRows(res, filteredEvents3()) as monthGridData[]

  //move this to utils

  const { onDragEnd, onDragStart, onMouseEnter, draggingEventData } = useMonthEventDragging()

  function openModalH(data: MonthDateObject, e: MouseEvent) {
    openModal(data, e, filteredEvents3())
  }

  function formateWeekDate(date: Date) {
    return formatWeekDays(date, mergedPorps.calendar, mergedPorps.timeZone, mergedPorps.locale)
  }

  function ModalDragStart(draggingOnStartDate: Date, eventDraged: EventClass) {
    onDragStart(eventDraged, draggingOnStartDate)
  }
  return (
    <>
      <div class="month-header">
        <div>{formateWeekDate(data[0].date)}</div>
        <div>{formateWeekDate(data[1].date)}</div>
        <div>{formateWeekDate(data[2].date)}</div>
        <div>{formateWeekDate(data[3].date)}</div>
        <div>{formateWeekDate(data[4].date)}</div>
        <div>{formateWeekDate(data[5].date)}</div>
        <div>{formateWeekDate(data[6].date)}</div>
      </div>
      <div class="month-wrapper" id="month-wrapper-id">
        <EventModal onDragEnd={onDragEnd} onDragStart={ModalDragStart} />

        <For each={res}>
          {(item1, i) => {
            return (
              <div class="month-row">
                <div class="dragging-wrapper">
                  <Show
                    when={
                      !!draggingEventData() &&
                      isDateIncludedInaRange(draggingEventData() as unknown as EventClass, item1[0].date, item1[6].date)
                    }
                  >
                    <MonthEvent
                      onEnd={() => {}}
                      ondrag={() => {}}
                      item={draggingEventData() as unknown as EventClass}
                      dateEnd={item1[6].date}
                      date={item1[0].date}
                    />
                  </Show>
                </div>
                <div class="month-row-container">
                  <For each={Object.keys(Mrows[i()])}>
                    {(item, i3) => (
                      <div class="month-row-wrapper">
                        <For each={Mrows[i()][item]}>
                          {(item) =>
                            i3() + 1 <= rowLimit ? (
                              <MonthEvent
                                onEnd={onDragEnd}
                                ondrag={onDragStart}
                                item={item}
                                dateEnd={item1[6].date}
                                date={item1[0].date}
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
                  <For each={getExtraRows(Mrows[i()], item1[0].date, item1[6].date, 2)}>
                    {(item, j) => (
                      <div class="month-more-item">
                        <Show when={item > 0}>
                          <div class="month-more-btn" onclick={[openModalH, item1[j()]]}>
                            {item} +
                          </div>
                        </Show>
                      </div>
                    )}
                  </For>
                </div>
                <For each={item1}>
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
