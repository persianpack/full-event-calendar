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
interface dateObjects {
  date: Date
  year: string | undefined
  month: string | undefined
  day: string | undefined
}
interface splittted {
  [key: string]: EventClass[]
}
export const MonthGrid: FComponent<WeeklyGridProps> = (props) => {
  const mergedPorps = mergeProps(defaultProps, props)

  const filteredEvents3 = createMemo(() => mergedPorps.events.filter((item) => item.isAllDay()))

  const data = getCalendarMonthDays(mergedPorps.initialDate, mergedPorps.calendar)

  const res = ArraysplitIntoChunks(data, 7) as dateObjects[][]

  const Mrows = getMonthRows(res, filteredEvents3()) as splittted[]

  function formatWeekDays(date: Date) {
    const D = new Date(date)
    return new Intl.DateTimeFormat(props.locale, {
      weekday: 'short',
      calendar: props.calendar,
      timeZone: props.timeZone
    }).format(D)
  }

  console.log(Mrows[0])

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
          {(item1, i) => {
            return (
              <div class="month-row">
                <div class="month-row-container">
                  <For each={Object.keys(Mrows[i()])}>
                    {(item) => (
                      <div class="month-row-wrapper">
                        <For each={Mrows[i()][item]}>
                          {(item) => (
                            // <div class='month-item' style={`left:${getLeftPosition(item,item1[0].date)}00%`}>{item.id}</div>
                            <MonthRow item={item} dateEnd={item1[6].date} date={item1[0].date} />
                          )}
                        </For>
                      </div>
                    )}
                  </For>

                  {/* <div class='month-row-wrapper'>
                    <div class='month-item'></div>
                  </div> */}
                </div>
                <For each={item1}>{(date) => <div class="month-container"> {date.day}</div>}</For>
              </div>
            )
          }}
        </For>
      </div>
    </>
  )
}

function MonthRow(props: any) {
  const leftP = createMemo(() => getLeftPosition(props.item, props.date))
  const widthh = getendPosition(props.item, props.dateEnd, leftP())
  const isRighted = rightArrowClass(props.item, props.dateEnd)
    ? 'border-top-right-radius:0px;border-bottom-right-radius:0px'
    : ''
  return (
    <div
      class="month-item"
      style={`left:calc(${leftP()}00% + 5px);width:calc(${widthh}00% ${
        rightArrowClass(props.item, props.dateEnd) ? '- 6px' : '- 16px'
      });${leftArrowClass(props.item, props.date)};${isRighted}`}
    >
      {props.item.id}
    </div>
  )
}

function getLeftPosition(event: EventClass, weekStartDate: Date) {
  const floorWeekStart = new Date(weekStartDate.setHours(0, 0, 0))
  if (event.start >= floorWeekStart) {
    return event.start.getDay()
  }
  return 0
}

function getendPosition(event: EventClass, weekendDate: Date, start: number) {
  const floorWeEend = new Date(weekendDate.setHours(23, 59, 59))
  if (event.end <= floorWeEend) {
    return event.end.getDay() - start + 1
  }
  return 6 - start + 1
}

function leftArrowClass(event: EventClass, weekStartDate: Date) {
  const floorWeekStart = new Date(weekStartDate.setHours(0, 0, 0))
  if (event.start < floorWeekStart) {
    return 'border-top-left-radius:0px;border-bottom-left-radius:0px;left:1px'
  } else {
    return ''
  }
}
function rightArrowClass(event: EventClass, weekendDate: Date) {
  const floorWeEend = new Date(weekendDate.setHours(23, 59, 59))

  if (event.end > floorWeEend) {
    return true
  } else {
    return false
  }
}
