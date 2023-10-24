import { FComponent } from '@full-event-calendar/shared-ts'
import { DailyHeader } from './DailyHeader/DailyHeader'
import { DailyHeaderProps } from './DailyHeader/DailyHeader'
import { BasicGrid } from '@full-event-calendar/basid-grid'
import { BasicGridProps } from '@full-event-calendar/basid-grid'
interface DailyGridpProps extends DailyHeaderProps, BasicGridProps {}

export const DailyGrid: FComponent<DailyGridpProps> = (props) => {
  return (
    <>
      <DailyHeader
        headerDate={new Date(props.headerDate)}
        timeZone={props.timeZone}
        calendar={props.calendar}
        onDateChange={props.onDateChange}
      />
      <BasicGrid events={props.events} onEventUpdate={props.onEventUpdate} />
    </>
  )
}
