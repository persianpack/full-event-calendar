import { FComponent } from '@full-event-calendar/shared-ts'
import { DailyHeader } from './DailyHeader/DailyHeader'
// import { DailyHeaderProps } from './DailyHeader/DailyHeader'
import { BasicGrid } from '@full-event-calendar/basid-grid'
import { BasicGridProps } from '@full-event-calendar/basid-grid'
import { createMemo, mergeProps } from 'solid-js'
import { getEventForAdate } from '@full-event-calendar/utils'
interface DailyGridpProps extends BasicGridProps {
  initialDate?: Date
  onDateChange?: (d: Date) => void
  calendar?: string
  timeZone?: string
  id: string
}

const defaultProps = {
  events: [],
  id: '',
  initialDate: new Date(),
  timeZone: 'asiz/tehran',
  calendar: 'persian',
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
        />
        <BasicGrid
          gridDate={mergedPorps.initialDate}
          events={filteredEvents()}
          onEventUpdate={mergedPorps.onEventUpdate}
        />
      </div>
    </>
  )
}
