import { EventClass, FComponent } from '@full-event-calendar/shared-ts'
import { For, createMemo } from 'solid-js'
import './DailyAllDay.scss'
import { areDatesInTheSameDate } from '@full-event-calendar/utils'

interface DailyAllDayPorps {
  events: EventClass[]
  initialDate: Date
}

export const DailyAllDay: FComponent<DailyAllDayPorps> = (props) => {
  const filteredEvents = createMemo(() => props.events.filter((item) => item.isAllDay()))

  function isEventRightOrLeftOrNone(event: EventClass) {
    let isEndOver = !areDatesInTheSameDate(event.end, props.initialDate)
    let isStartOver = !areDatesInTheSameDate(event.start, props.initialDate)
    if (isEndOver && isStartOver) {
      return 'both-arrow'
    } else if (isEndOver) {
      return 'right-arrow'
    } else if (isStartOver) {
      console.log(event.start, props.initialDate)
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
