// Components
import { BasicGrid } from '@full-event-calendar/basid-grid'
import { DailyHeader } from './DailyHeader/DailyHeader'
import { DailyAllDay } from './DailyAllDay/DailyAllDay'
// Types
import { EventClass, FComponent } from '@full-event-calendar/shared-ts'
import { BasicGridProps } from '@full-event-calendar/basid-grid'
// solid.js
import { Show, createMemo, mergeProps } from 'solid-js'
// utils
import { getEventForAdate } from '@full-event-calendar/utils'
export interface DailyGridpProps extends BasicGridProps {
  initialDate?: Date
  onDateChange?: (d: Date) => void
  calendar?: string
  timeZone?: string
  locale?: string
  id?: string
  showAllDay?: boolean
  events: EventClass[]
}

const defaultProps = {
  events: [],
  id: '',
  initialDate: new Date(),
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  calendar: 'gregory',
  locale: 'en-US',
  showAllDay: true,
  onDateChange: () => {},
  onEventUpdate: () => {}
}

export const DailyGrid: FComponent<DailyGridpProps> = (props) => {
  const mergedPorps = mergeProps(defaultProps, props)

  const extractedEvents = createMemo(() => getEventForAdate(mergedPorps.events, mergedPorps.initialDate))
  const filteredOut = createMemo(() => extractedEvents().filter((item) => !item.isAllDay()))

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

        <Show when={mergedPorps.showAllDay}>
          <DailyAllDay events={extractedEvents()} initialDate={mergedPorps.initialDate}></DailyAllDay>
        </Show>

        <BasicGrid
          gridDate={mergedPorps.initialDate}
          events={filteredOut()}
          onEventUpdate={mergedPorps.onEventUpdate}
        />
      </div>
    </>
  )
}
