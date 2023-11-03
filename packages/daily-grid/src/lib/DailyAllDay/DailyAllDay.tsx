import { EventClass, FComponent } from '@full-event-calendar/shared-ts'
import { For, createEffect, createMemo } from 'solid-js'
import './DailyAllDay.scss'
import { areDatesInTheSameDate } from '@full-event-calendar/utils'

interface DailyAllDayPorps {
  events: EventClass[]
  initialDate: Date
}

export const DailyAllDay: FComponent<DailyAllDayPorps> = (props) => {
  const filteredEvents = createMemo(() => props.events.filter((item) => item.isAllDay()))

  function isEventRightOrLeftOrNone(event: EventClass) {
    let flOWR = new Date(props.initialDate.setHours(0, 0, 0))
    let Celi = new Date(props.initialDate.setHours(23, 59, 59))
    let isEndOver = !areDatesInTheSameDate(event.end, props.initialDate)
    let isStartOver = !areDatesInTheSameDate(event.start, props.initialDate)
    if (event.id === 30) {
    }
    if (event.start < flOWR && event.end > Celi) {
      return 'both-arrow'
    } else if (isEndOver) {
      return 'right-arrow'
    } else if (isStartOver) {
      return 'left-arrow'
    }
    return ''
  }

  return (
    <div class="all-day-container">
      <For each={filteredEvents()}>
        {(item) => {
          return (
            <div class={`all-day-wrapper ${isEventRightOrLeftOrNone(item)}`}>
              {`${item.start.toString()} - ${item.end.toString()} `}
            </div>
          )
        }}
      </For>
    </div>
  )
}
