import { EventClass, FComponent } from '@full-event-calendar/shared-ts'
import { Dynamic } from 'solid-js/web'

import { createMemo, mapArray, mergeProps } from 'solid-js'
import { GroupGrid } from '@full-event-calendar/group-grid'

const defaultProps = {
  events: [],
  initialDate: new Date(),
  columes: [],
  onEventUpdate: () => {}
}

interface WeeklyGridProps {
  events?: EventClass[]
  initialDate?: Date
  columes?: columeItem[]
  onEventUpdate?: (event: any) => void
}

interface columeItem {
  events: EventClass[]
}

export const WeeklyGrid: FComponent<WeeklyGridProps> = (props) => {
  const mergedPorps = mergeProps(defaultProps, props)

  // const filteredEvents = createMemo(() => getEventForAdate(mergedPorps.events, mergedPorps.initialDate))

  return (
    <>
      <GroupGrid
        columes={[
          { events: [] },
          { events: [] },
          { events: [] },
          { events: [] },
          { events: [] },
          { events: [] },
          { events: [] }
        ]}
        onEventUpdate={mergedPorps.onEventUpdate}
        initialDate={mergedPorps.initialDate}
        events={mergedPorps.events}
      />
    </>
  )
}

function getEventForAdate(events: EventClass[], targetDate: Date) {
  const filteredERvents = events.filter((event) => {
    const conditain1 =
      event.start.getFullYear() === targetDate.getFullYear() &&
      event.start.getMonth() === targetDate.getMonth() &&
      event.start.getDate() === targetDate.getDate()
    const conditain2 =
      event.end.getFullYear() === targetDate.getFullYear() &&
      event.end.getMonth() === targetDate.getMonth() &&
      event.end.getDate() === targetDate.getDate()
    return conditain1 || conditain2
  })
  return filteredERvents
}
