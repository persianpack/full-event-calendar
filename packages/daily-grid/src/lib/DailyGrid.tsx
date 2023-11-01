// Components
import { BasicGrid } from '@full-event-calendar/basid-grid'
import { DailyHeader } from './DailyHeader/DailyHeader'
import { DailyAllDay } from './DailyAllDay/DailyAllDay'
// Types
import { EventClass, FComponent } from '@full-event-calendar/shared-ts'
import { BasicGridProps } from '@full-event-calendar/basid-grid'
// solid.js
import { createMemo, mergeProps } from 'solid-js'
// utils
import { getEventForAdate } from '@full-event-calendar/utils'
interface DailyGridpProps extends BasicGridProps {
  initialDate?: Date
  onDateChange?: (d: Date) => void
  calendar?: string
  timeZone?: string
  locale?: string
  id?: string
  events: EventClass[]
}

const defaultProps = {
  events: [],
  id: '',
  initialDate: new Date(),
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  calendar: 'gregory',
  locale: 'en-US',
  onDateChange: () => {},
  onEventUpdate: () => {}
}

export const DailyGrid: FComponent<DailyGridpProps> = (props) => {
  const mergedPorps = mergeProps(defaultProps, props)

  console.log('render daily', mergedPorps.initialDate)

  const extractedEvents = createMemo(() => getEventForAdate(mergedPorps.events, mergedPorps.initialDate))

  const filteredEvents2 = createMemo(() => extractedEvents().filter((item) => !item.isAllDay()))

  // const data = getCalendarMonthDays(mergedPorps.initialDate, mergedPorps.calendar)
  // console.log(data)

  return (
    <>
      <div id={props.id} style="flex: 1;">
        <DailyHeader
          headerDate={mergedPorps.initialDate}
          timeZone={mergedPorps.timeZone}
          calendar={mergedPorps.calendar}
          onDateChange={mergedPorps.onDateChange}
          locale={mergedPorps.locale}
        />
        <DailyAllDay events={extractedEvents()} initialDate={mergedPorps.initialDate}></DailyAllDay>
        <BasicGrid
          gridDate={mergedPorps.initialDate}
          events={filteredEvents2()}
          onEventUpdate={mergedPorps.onEventUpdate}
        />
      </div>
    </>
  )
}
