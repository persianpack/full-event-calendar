import { EventClass, FComponent } from '@full-event-calendar/shared-ts'
import { DailyHeader } from './DailyHeader/DailyHeader'
// import { DailyHeaderProps } from './DailyHeader/DailyHeader'
import { BasicGrid } from '@full-event-calendar/basid-grid'
import { BasicGridProps } from '@full-event-calendar/basid-grid'
import { createMemo, mergeProps } from 'solid-js'
interface DailyGridpProps extends BasicGridProps {
  initialDate?: Date
  onDateChange?: (d: Date) => void
  calendar?: string
  timeZone?: string
  ref: any
  id: string
}

const defaultProps = {
  events: [],
  id: '',
  initialDate: new Date(),
  timeZone: 'asiz/tehran',
  calendar: 'persian',
  onDateChange: () => {},
  onEventUpdate: () => {},
  ref: null
}

// type EventCalendarOptionsss = { [K in keyof DailyGridpProps]-?: DailyGridpProps[K] }

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

export const DailyGrid: FComponent<DailyGridpProps> = (props) => {
  const mergedPorps = mergeProps(defaultProps, props)

  console.log('render daily', mergedPorps.initialDate)

  const filteredEvents = createMemo(() => getEventForAdate(mergedPorps.events, mergedPorps.initialDate))

  return (
    <>
      <div id={props.id} style="flex: 1;">
        <DailyHeader
          headerDate={mergedPorps.initialDate}
          timeZone={mergedPorps.timeZone}
          calendar={mergedPorps.calendar}
          onDateChange={mergedPorps.onDateChange}
        />
        <BasicGrid events={filteredEvents()} onEventUpdate={mergedPorps.onEventUpdate} />
      </div>
    </>
  )
}
