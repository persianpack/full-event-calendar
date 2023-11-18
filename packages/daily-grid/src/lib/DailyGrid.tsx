// Components
import { BasicGrid } from '@full-event-calendar/basic-grid'
import { DailyHeader } from './DailyHeader/DailyHeader'
import { DailyAllDay } from './DailyAllDay/DailyAllDay'
// Types
import { EventClass, FComponent } from '@full-event-calendar/shared-ts'
import { BasicGridProps } from '@full-event-calendar/basic-grid'
// solid.js
import { Show, createMemo, mergeProps } from 'solid-js'
// utils
import { getEventsInDate } from '@full-event-calendar/utils'
// Remove the extend
export interface DailyGridProps extends BasicGridProps {
  initialDate?: Date
  onDateChange?: (d: Date) => void
  calendar?: string
  timeZone?: string
  locale?: string
  id?: string
  showAllDay?: boolean
  container?: string
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
  onEventUpdate: () => {},
  gridHeight: 65 * 24
}

export const DailyGrid: FComponent<DailyGridProps> = (props) => {
  const mergedProps = mergeProps(defaultProps, props)

  const extractedEvents = createMemo(() => getEventsInDate(mergedProps.events, mergedProps.initialDate))

  const filteredOut = createMemo(() => extractedEvents().filter((item) => !item.isAllDay()))

  return (
    <>
      <div id={props.id} style="flex: 1;">
        <DailyHeader
          headerDate={mergedProps.initialDate}
          timeZone={mergedProps.timeZone}
          calendar={mergedProps.calendar}
          onDateChange={mergedProps.onDateChange}
          locale={mergedProps.locale}
        />

        <Show when={mergedProps.showAllDay}>
          <DailyAllDay events={extractedEvents()} initialDate={mergedProps.initialDate}></DailyAllDay>
        </Show>

        <BasicGrid
          gridDate={mergedProps.initialDate}
          events={filteredOut()}
          onEventUpdate={mergedProps.onEventUpdate}
          gridHeight={mergedProps.gridHeight}
          container={mergedProps.container}
        />
      </div>
    </>
  )
}
