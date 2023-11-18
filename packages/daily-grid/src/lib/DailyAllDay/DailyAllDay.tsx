import { EventClass, FComponent } from '@full-event-calendar/shared-ts'
import { For, createEffect, createMemo } from 'solid-js'
import './DailyAllDay.scss'
import { isEventRightOrLeftOrNone } from '@full-event-calendar/utils/src/Date'

interface DailyAllDayProps {
  events: EventClass[]
  initialDate: Date
}

export const DailyAllDay: FComponent<DailyAllDayProps> = (props) => {
  const filteredEvents = createMemo(() => props.events.filter((item) => item.isAllDay()))

  return (
    <div class="all-day-container">
      <For each={filteredEvents()}>
        {(item) => {
          return (
            <div class={`all-day-wrapper ${isEventRightOrLeftOrNone(item, props.initialDate)}`}>
              {`${item.start.toString()} - ${item.end.toString()} `}
            </div>
          )
        }}
      </For>
    </div>
  )
}
