//types
import { EventClass, FComponent, SourceEvent } from '@full-event-calendar/shared-ts'
//solid.js
import { createMutable } from 'solid-js/store'
import { For, batch, createEffect, createMemo, mergeProps } from 'solid-js'

import { getEventsInDate, sortEventByStart } from '@full-event-calendar/utils'
// Styles
import './List.scss'

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
  gridHeight: 65 * 24
}

interface columData {
  events: EventClass[]
  props: any
}

export const List: FComponent<ListGridProps> = (props) => {
  const mergedProps = mergeProps(defaultProps, props)

  return (
    <>
      <div class="event-list">
        <div class="event-list-item">
          <div class="event-list-item-time">16 jun</div>
          <div class="event-list-item-des">
            <div>1039 -120-2</div>
            <div>title event</div>
          </div>
        </div>

        <div class="event-list-item">
          <div class="event-list-item-time">ssssssssssssssssssss jun</div>
          <div class="event-list-item-des">
            <div>1039 -120-2</div>
            <div>title event</div>
          </div>
        </div>
      </div>
    </>
  )
}
