import { EventClass, FComponent } from '@full-event-calendar/shared-ts'
import { DailyHeader } from './DailyHeader/DailyHeader'
// import { DailyHeaderProps } from './DailyHeader/DailyHeader'
import { BasicGrid } from '@full-event-calendar/basid-grid'
import { BasicGridProps } from '@full-event-calendar/basid-grid'
import { createMemo, mergeProps } from 'solid-js'
import { convertTZ, getEventForAdate } from '@full-event-calendar/utils'
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

  const filteredEvents = createMemo(() => getEventForAdate(mergedPorps.events, mergedPorps.initialDate))

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
        <BasicGrid
          gridDate={convertTZ(mergedPorps.initialDate, mergedPorps.timeZone)}
          events={filteredEvents()}
          onEventUpdate={mergedPorps.onEventUpdate}
        />
      </div>
    </>
  )
}
