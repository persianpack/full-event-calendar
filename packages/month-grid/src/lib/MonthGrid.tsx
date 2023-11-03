import { EventClass, FComponent, SourceEvent } from '@full-event-calendar/shared-ts'
import { createMutable } from 'solid-js/store'
import { For, batch, createEffect, createMemo, mergeProps } from 'solid-js'
import { GroupGrid } from '@full-event-calendar/group-grid'
import {
  ArraysplitIntoChunks,
  filterEventsByDateRange,
  getCalendarMonthDays,
  getEventForAdate
} from '@full-event-calendar/utils'

import { getMonthRows } from '../utils/EventRows'

import './MonthGrid.scss'

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

export const MonthGrid: FComponent<WeeklyGridProps> = (props) => {
  const mergedPorps = mergeProps(defaultProps, props)

  const filteredEvents3 = createMemo(() => mergedPorps.events.filter((item) => item.isAllDay()))

  const data = getCalendarMonthDays(mergedPorps.initialDate, mergedPorps.calendar)

  const res = ArraysplitIntoChunks(data, 7)

  const x = getMonthRows(res, filteredEvents3())

  function formatWeekDays(date: Date) {
    const D = new Date(date)
    return new Intl.DateTimeFormat(props.locale, {
      weekday: 'short',
      calendar: props.calendar,
      timeZone: props.timeZone
    }).format(D)
  }

  console.log(res)

  return (
    <>
      <div class="month-header">
        <div>{formatWeekDays(data[0].date)}</div>
        <div>{formatWeekDays(data[1].date)}</div>
        <div>{formatWeekDays(data[2].date)}</div>
        <div>{formatWeekDays(data[3].date)}</div>
        <div>{formatWeekDays(data[4].date)}</div>
        <div>{formatWeekDays(data[5].date)}</div>
        <div>{formatWeekDays(data[6].date)}</div>
      </div>
      <div class="month-wrapper">
        <For each={res}>
          {(item) => {
            return (
              <div class="month-row">
                <For each={item}>{(date) => <div class="month-container">{date.day}</div>}</For>
              </div>
            )
          }}
        </For>
      </div>
    </>
  )
}
