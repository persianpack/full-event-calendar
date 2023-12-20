//types
import { EventClass, FComponent, SourceEvent } from '@full-event-calendar/shared-ts'
//solid.js
import { createMutable } from 'solid-js/store'
import { For, batch, createEffect, createMemo, mergeProps } from 'solid-js'

import {
  extractMonthsDays,
  filterEventsByDateRange,
  formatD,
  formatDD,
  formatDDMMYYYY,
  formatDM,
  formatRange,
  formatToShortTime,
  getEventsInDate,
  getWeekDates,
  sortEventByStart
} from '@full-event-calendar/utils'
// Styles
import './List.scss'
import { EventModeFilter } from './lib/example'

export interface ListGridProps {
  events?: EventClass[]
  initialDate?: Date
  onEventUpdate?: (event: any) => void
  onDateChange?: (d: Date) => void
  onGridChange?: (d: any) => void
  locale?: string
  calendar?: string
  timeZone?: string
  gridHeight?: number
  mode: 'day' | 'week'
}

const defaultProps = {
  events: [],
  initialDate: new Date(),
  onEventUpdate: () => {},
  onDateChange: () => {},
  onGridChange: () => {},
  locale: 'en-US',
  calendar: 'gregory',
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  gridHeight: 65 * 24,
  mode: 'day'
}

interface columData {
  events: EventClass[]
  props: any
}

export const List: FComponent<ListGridProps> = (props) => {
  const mergedProps = mergeProps(defaultProps, props)
  // let x = event.getIncludedDays()

  const filerses = new EventModeFilter(mergedProps.mode, mergedProps.initialDate, mergedProps.calendar)
  const ass = filerses.filter(mergedProps.events)

  const generateGroup = createMemo(() => {
    let collection: { [key: string]: EventClass[] } = {}

    sortEventByStart(ass).forEach((event) => {
      event.getIncludedDays().forEach((days) => {
        let foramtedDate = formatDDMMYYYY(days)
        if (!(foramtedDate in collection)) {
          collection[foramtedDate] = []
        }

        collection[foramtedDate].push(event)
      })
    })
    console.log(collection)
    return collection
  })

  let x = extractMonthsDays(mergedProps.initialDate, mergedProps.calendar)
  let y = getWeekDates(mergedProps.initialDate)
  let z = filterEventsByDateRange(mergedProps.events, y[y.length - 1], y[y.length - 1])
  // console.log(z)

  generateGroup()
  return (
    <>
      <div class="event-list">
        <For each={Object.keys(generateGroup())}>
          {(item) => (
            <div class="event-list-item">
              <div class="event-list-item-time">
                <div class="scchedule-date">{formatDD(new Date(item), mergedProps.calendar)}</div>
                <div class="scchedule-dates">{formatDM(new Date(item), mergedProps.calendar)}</div>
              </div>
              <div class="scheachile-event-wrapper">
                <For each={generateGroup()[item]}>
                  {(item) => (
                    <div class="event-list-item-des">
                      <div class="event-date">
                        <div class="event-dot" style={`background-color:${item.color}`}></div>
                        {item.isAllDay() ? 'all day' : formatRange(item.start, item.end, mergedProps.locale)}
                      </div>
                      <div>{item.name}</div>
                    </div>
                  )}
                </For>
              </div>
            </div>
          )}
        </For>
      </div>
    </>
  )
}
