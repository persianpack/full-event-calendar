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

import './DailyGrid.scss'
import { DailyTimeRanges } from './DailyTimeRanges/DailyTimeRanges'
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

export const dailyDefaultProps = {
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
  const mergedProps = mergeProps(dailyDefaultProps, props)

  const extractedEvents = createMemo(() => getEventsInDate(mergedProps.events, mergedProps.initialDate))

  const filteredOut = createMemo(() => extractedEvents().filter((item) => !item.isAllDay()))

  return (
    <>
      <div
        id={props.id}
        data-test-id-daily-grid={props.id}
        style="flex:1;height: 100%;display:flex;flex-direction: column; "
      >
        <DailyHeader 
          headerDate={mergedProps.initialDate}
          timeZone={mergedProps.timeZone}
          calendar={mergedProps.calendar}
          onDateChange={mergedProps.onDateChange}
          locale={mergedProps.locale}
        />

        <Show when={mergedProps.showAllDay}>
          <DailyAllDay
            locale={mergedProps.locale}
            events={extractedEvents()}
            initialDate={mergedProps.initialDate}
          ></DailyAllDay>
        </Show>
        <div class="scroll-wrapper " id="scroll-wrapper">
          <div style="position: absolute;width:100%;display:flex;">
            <DailyTimeRanges locale={mergedProps.locale}></DailyTimeRanges>
            <BasicGrid
              gridDate={mergedProps.initialDate}
              events={filteredOut()}
              locale={mergedProps.locale}
              onEventUpdate={mergedProps.onEventUpdate}
              gridHeight={mergedProps.gridHeight}
              container={mergedProps.container}
            />
          </div>
        </div>
      </div>
    </>
  )
}
