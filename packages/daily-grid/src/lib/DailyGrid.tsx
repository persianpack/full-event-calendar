import { FComponent } from '@full-event-calendar/shared-ts'
import { DailyHeader } from './DailyHeader/DailyHeader'
// import { DailyHeaderProps } from './DailyHeader/DailyHeader'
import { BasicGrid } from '@full-event-calendar/basid-grid'
import { BasicGridProps } from '@full-event-calendar/basid-grid'
import { mergeProps } from 'solid-js'
interface DailyGridpProps extends BasicGridProps {
  initialDate?: Date
  onDateChange?: (d: Date) => void
  calendar?: string
  timeZone?: string
}

const defaultProps = {
  events: [],
  initialDate: new Date(),
  timeZone: 'asiz/tehran',
  calendar: 'persian',
  onDateChange: () => {},
  onEventUpdate: () => {}
}

// type EventCalendarOptionsss = { [K in keyof DailyGridpProps]-?: DailyGridpProps[K] }

export const DailyGrid: FComponent<DailyGridpProps> = (props) => {
  const mergedPorps = mergeProps(defaultProps, props)

  return (
    <>
      <DailyHeader
        headerDate={new Date(mergedPorps.initialDate)}
        timeZone={mergedPorps.timeZone}
        calendar={mergedPorps.calendar}
        onDateChange={mergedPorps.onDateChange}
      />
      <BasicGrid events={mergedPorps.events} onEventUpdate={mergedPorps.onEventUpdate} />
    </>
  )
}
