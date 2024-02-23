// Components
import { BasicGrid } from '@full-event-calendar/basic-grid'
// Types
import { EventClass, FComponent, Group, SourceEvent } from '@full-event-calendar/shared-ts'
// solid.js
import { createMemo, mergeProps } from 'solid-js'
// utils
import './DailyGrid.scss'
// Remove the extend
export interface DailyGridProps {
  initialDate?: Date
  onDateChange?: (d: Date) => void
  calendar?: string
  onAddEvent?: (event: SourceEvent, groupId?: Group['id']) => void
  onEventUpdate?: (event: SourceEvent) => void
  onEventClick?: (event: EventClass) => void
  timeZone?: string
  locale?: string
  id?: string
  showAllDay?: boolean
  editable?: boolean
  container?: string
  events: EventClass[]
  group: Group
  avalibalSots: string[]
  slotRenderStore: any
  stopAddEvent: boolean
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
  onEventClick: () => {},
  onAddEvent: () => {},
  gridHeight: 65 * 24,
  group: null,
  editable: true,
  stopAddEvent: true,
  avalibalSots: []
}

export const DailyGrid: FComponent<DailyGridProps> = (props) => {
  const mergedProps = mergeProps(dailyDefaultProps, props)

  const filteredOut = createMemo(() => mergedProps.events.filter((item) => !item.isAllDay()))

  function addEventProxy(event: SourceEvent) {
    if (mergedProps.group) {
      mergedProps.onAddEvent(event, mergedProps.group.id)
    } else {
      mergedProps.onAddEvent(event)
    }
  }

  return (
    <>
      <div
        id={props.id}
        data-test-id-daily-grid={props.id}
        style="flex:1;height: 100%;display:flex;flex-direction: column; "
      >
        <div style=" display:flex;">
          <BasicGrid
            gridDate={mergedProps.initialDate}
            events={filteredOut()}
            locale={mergedProps.locale}
            onEventUpdate={mergedProps.onEventUpdate}
            onAddEvent={addEventProxy}
            onEventClick={mergedProps.onEventClick}
            gridHeight={mergedProps.gridHeight}
            container={mergedProps.container}
            timeZone={mergedProps.timeZone}
            editable={mergedProps.editable}
            avalibalSots={mergedProps.avalibalSots}
            stopAddEvent={mergedProps.stopAddEvent}
          />
        </div>
      </div>
    </>
  )
}
