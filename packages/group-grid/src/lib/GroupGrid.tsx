import { EventClass, FComponent } from '@full-event-calendar/shared-ts'
import { Dynamic } from 'solid-js/web'

import { createMemo, mapArray, mergeProps } from 'solid-js'
import { DailyGrid } from '@full-event-calendar/daily-grid'

const defaultProps = {
  events: [],
  initialDate: new Date(),
  columes: [],
  onEventUpdate: () => {}
}

interface GroupGridpProps {
  events?: EventClass[]
  initialDate?: Date
  columes?: columeItem[]
  onEventUpdate?: (event: any) => void
}

interface columeItem {
  events: EventClass[]
}

export const GroupGrid: FComponent<GroupGridpProps> = (props) => {
  const mergedPorps = mergeProps(defaultProps, props)

  const filteredEvents = createMemo(() => getEventForAdate(mergedPorps.events, mergedPorps.initialDate))
  //@ts-ignore
  //   const mappedArr = mergedPorps.columes.map((d:any)=>{
  //     return (
  //       <Dynamic component={DailyGrid}
  //            initialDate={mergedPorps.initialDate}
  //            events={filteredEvents()}>
  //       </Dynamic>
  // )
  //   })

  const maopoed = mapArray(
    () => mergedPorps.columes,
    (item) => {
      return (
        <Dynamic
          component={DailyGrid}
          onEventUpdate={mergedPorps.onEventUpdate}
          initialDate={mergedPorps.initialDate}
          events={filteredEvents()}
        ></Dynamic>
      )
    }
  )

  return (
    <>
      <div style="display:flex;">{maopoed()}</div>
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
