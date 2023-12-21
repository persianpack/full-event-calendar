//types
import { EventClass, FComponent } from '@full-event-calendar/shared-ts'
//solid.js
import { For, createMemo, mergeProps } from 'solid-js'

import {
  formatDD,
  formatDDMMYYYY,
  formatDM,
  formatRange,
  sortEventByStart
} from '@full-event-calendar/utils'
// Styles
import './List.scss'
import { EventModeFilter } from './lib/example'
import { GroupEventList } from './lib/EventListCollection'

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
  mode: 'day' | 'week' | 'month'
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
  mode: 'week'
}

export const List: FComponent<ListGridProps> = (props) => {
  const mergedProps = mergeProps(defaultProps, props)

  const eventModeFilter = new EventModeFilter(mergedProps.mode, mergedProps.initialDate, mergedProps.calendar)
  const filteredList = eventModeFilter.filter(mergedProps.events)

  const generateGroup = createMemo(() => {
    let groupEventList = new GroupEventList(mergedProps.mode,mergedProps.initialDate,mergedProps.calendar)
    return groupEventList.group(filteredList)
  })
 
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
