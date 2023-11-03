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
  const genterateCols = createMemo(() => {
    const rangedEvents = filterEventsByDateRange(props.events, props.columes[0], props.columes[6])
    const filterdEvents = rangedEvents.filter((item) => {
      return item.isAllDay()
    })
    const sortedEvents = filterdEvents.sort(function (a, b) {
      return new Date(a.start).valueOf() - new Date(b.start).valueOf()
    }) as EventClass[]

    let matrix: any = [[null, null, null, null, null, null, null]]

    const endDate = props.columes[6]
    const startDate = props.columes[0]
    for (let i = 0; i < sortedEvents.length; i++) {
      const event = sortedEvents[i]
      if (event.end >= endDate && event.start <= startDate) {
        markRange(0, 6, event)
      } else if (event.start >= startDate && event.start <= endDate) {
        const weekStart = event.start.getDay()
        // const weekEnd = event.end.getDay() < weekStart ? 6 : weekStart
        //  const weekEnd = event.countDays() + weekStart + 1 > 7 ? 6 :  Math.floor(event.countDays()) + weekStart
        const weekEnd = event.countDays() + weekStart + 1 > 7 ? 6 : event.end.getDay()

        markRange(weekStart, weekEnd, event)
      } else if (event.end >= startDate && event.end <= endDate) {
        markRange(0, event.end.getDay(), event)
      }
    }

    function markRange(start: number, end: number, event: EventClass) {
      let hasFound = false

      for (let i = 0; i < matrix.length; i++) {
        const row = matrix[i]
        const col = row[start]
        if (col === null) {
          hasFound = true
          setRange(start, end, event, i)
          break
        }
      }
      if (!hasFound) {
        matrix.push([null, null, null, null, null, null, null])
        setRange(start, end, event, matrix.length - 1)
      }

      // for(let i = start;i<=end; i++){

      // }
    }

    function setRange(colStart: number, colEnd: number, event: EventClass, row: number) {
      for (let i = colStart; i <= colEnd; i++) {
        matrix[row][i] = event
      }
    }
    return matrix
  })

  console.log(genterateCols())

  // console.log(getSortedEvents())
  return (
    <div class="weekly-allDay">
      <For each={props.columes}>
        {(day, i) => (
          <div class="week-all-col">
            <For each={genterateCols()}>
              {(eventList) => (
                <Show when={eventList[i()]} fallback={<div class="week-all-day"></div>}>
                  <div
                    class="week-all-day"
                    style={eventList[i()].isIncludedInAday(day) ? 'background:red' : 'background:blue'}
                  >
                    {eventList[i()].id}
                  </div>
                </Show>
              )}
            </For>
          </div>
        )}
      </For>
    </div>
  )
}
