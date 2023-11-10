import { EventClass, FComponent } from '@full-event-calendar/shared-ts'
import './WeeklyAllDayHeader.scss'
import { For, Show, createEffect, createMemo } from 'solid-js'
import { filterEventsByDateRange } from '@full-event-calendar/utils'

interface WeeklyAllDayHeaderProps {
  events: EventClass[]
  columes: Date[]
}

interface matrix {
  [key: number]: EventClass
}

export const WeeklyAllDayHeader: FComponent<WeeklyAllDayHeaderProps> = (props) => {
  const rangedEvents = filterEventsByDateRange(props.events, props.columes[0], props.columes[6])
  const filterdEvents = rangedEvents.filter((item) => {
    return item.isAllDay()
  })
  // console.log(genterateCols())

  // console.log(getSortedEvents())
  return (
    <div class="weekly-allDay">
     
    </div>
  )
}
