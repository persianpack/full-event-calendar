import { DraggeddData, EventClass, FComponent, SourceEvent } from '@full-event-calendar/shared-ts'
import { Dynamic } from 'solid-js/web'
import { createMutable, createStore } from 'solid-js/store'
import { batch, createEffect, createMemo, mapArray, mergeProps, on, onMount } from 'solid-js'
import { GroupGrid } from '@full-event-calendar/group-grid'

const defaultProps = {
  events: [],
  initialDate: new Date(),

  onEventUpdate: () => {}
}

interface WeeklyGridProps {
  events?: EventClass[]
  initialDate?: Date

  onEventUpdate?: (event: any) => void
}

export const WeeklyGrid: FComponent<WeeklyGridProps> = (props) => {
  const mergedPorps = mergeProps(defaultProps, props)

  const data: any = createMutable([
    { events: [], props: {} },
    { events: [], props: {} },
    { events: [], props: {} },
    { events: [], props: {} },
    { events: [], props: {} },
    { events: [], props: {} },
    { events: [], props: {} }
  ])
  // data[0].events = mergedPorps.events

  const generateCols = createMemo(() => {
    console.log('generate week Cols')
    let iniDay = mergedPorps.initialDate
    iniDay.setDate(iniDay.getDate() - iniDay.getDay())
    batch(() => {
      for (let i = 0; i < 7; i++) {
        const dayNumber = iniDay.getDay()
        const evntsInThatDay = () => getEventForAdate(mergedPorps.events, iniDay)
        data[dayNumber].events = evntsInThatDay()
        data[dayNumber].props.initialDate = new Date(iniDay)
        iniDay.setDate(iniDay.getDate() + 1)
      }
    })
  })

  createEffect(generateCols)

  function asjdoiasd(a: SourceEvent, b: number, currCol: number) {
    const conpt = { ...a }

    conpt.start.setDate(conpt.start.getDate() - (currCol - b))
    conpt.end.setDate(conpt.end.getDate() - (currCol - b))

    mergedPorps.onEventUpdate(conpt)
  }

  // const filteredEvents = createMemo(() => getEventForAdate(mergedPorps.events, mergedPorps.initialDate))

  return (
    <>
      <GroupGrid columes={data} onEventUpdate={asjdoiasd} initialDate={mergedPorps.initialDate} />
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
